"use client";

/**
 * CenaMateriais — estudo de cena 3D, PROTÓTIPO.
 *
 * O que é: chapas, uma lâmina curva e uma fita de borda que se organizam
 * conforme a página rola. Geometria 100% procedural: nenhum modelo externo,
 * nenhuma textura na v1. Os acabamentos vivem em `./materiais.ts`.
 *
 * Onde é usado: SÓ em app/laboratorio/, que é rota de desenvolvimento e
 * responde 404 no build de produção. Nada disto está no site publicado.
 *
 * Props:
 *   alvo   o elemento cuja rolagem controla a cena. Sem ele, a cena usa o
 *          próprio contêiner.
 *
 * POR QUE three.js PURO, E NÃO REACT THREE FIBER: o R3F traz a árvore do
 * Expo/React Native como peer e pesa 2,1 MB, e esta cena não tem estado de
 * React nenhum — é um loop de rAF. Sem R3F, o tree-shaking do Vite consegue
 * deixar fora metade do three.
 *
 * ORÇAMENTO DE PESO: o three sozinho é ~128 KB gzip, contra os 92 KB de JS
 * que o site inteiro baixa hoje. Por isso ele é importado DINAMICAMENTE, e
 * só quando a seção chega perto da tela: quem nunca rola até aqui não paga.
 *
 * O QUE ESTA CENA NÃO FAZ, de propósito:
 *   · não sequestra o scroll — a página rola normalmente
 *   · não roda sozinha — sem rolagem, nada se move
 *   · não tem sombra nem pós-processamento — custo alto, ganho baixo
 */
import { useEffect, useRef, useState } from "react";

import { ACABAMENTOS, FITA, LAMINA, LUZ } from "./materiais";
import estilos from "./CenaMateriais.module.css";

type Estado = "esperando" | "carregando" | "rodando" | "sem-webgl";

/** O navegador consegue rodar WebGL? Barato, e o resultado não muda. */
function temWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function CenaMateriais() {
  const moldura = useRef<HTMLDivElement>(null);
  const [estado, setEstado] = useState<Estado>("esperando");

  useEffect(() => {
    const elemento = moldura.current;
    if (!elemento) return;

    // Carregamento progressivo: o three só é baixado quando a seção está a
    // uma tela de distância. Numa página em que ninguém rola até aqui, o
    // chunk nunca é pedido.
    //
    // A checagem de WebGL mora AQUI DENTRO, e não no corpo do efeito, por
    // dois motivos: o callback do observador é assíncrono (mudar estado no
    // corpo do efeito dispara renderização em cascata, e o lint barra), e não
    // há razão para criar um canvas de teste antes de a seção chegar perto.
    let cancelado = false;
    let desmontar: (() => void) | undefined;

    const observador = new IntersectionObserver(
      (entradas) => {
        if (!entradas[0].isIntersecting) return;
        observador.disconnect();

        if (!temWebGL()) {
          setEstado("sem-webgl");
          return;
        }

        setEstado("carregando");

        montarCena(elemento).then((limpar) => {
          if (cancelado) {
            limpar?.();
            return;
          }
          desmontar = limpar;
          setEstado("rodando");
        });
      },
      { rootMargin: "100% 0px" },
    );

    observador.observe(elemento);

    return () => {
      cancelado = true;
      observador.disconnect();
      desmontar?.();
    };
  }, []);

  return (
    <div className={estilos.moldura} ref={moldura} data-estado={estado}>
      {/* Fallback visual: o que se vê antes de a cena existir, e o que fica
          para sempre em navegador sem WebGL ou com movimento reduzido. */}
      <div className={estilos.fallback} aria-hidden={estado === "rodando"}>
        <span className={estilos.rotulo}>
          {estado === "sem-webgl" ? "Estudo de materiais" : "Chapas, lâminas e fitas de borda"}
        </span>
      </div>
      <p className={estilos.legenda}>
        Estudo procedural · {ACABAMENTOS.length} acabamentos, lâmina curva e fita de borda
      </p>
    </div>
  );
}

/**
 * Monta a cena e devolve a função que a desmonta.
 *
 * Fica fora do componente de propósito: assim o `import()` do three é o
 * primeiro statement da função, e o bundler o isola num chunk próprio.
 */
async function montarCena(container: HTMLElement): Promise<() => void> {
  const THREE = await import("three");

  const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const larguraTela = window.innerWidth;
  const mobile = larguraTela <= 600;

  const cena = new THREE.Scene();
  cena.background = new THREE.Color(LUZ.fundo);

  const camera = new THREE.PerspectiveCamera(
    mobile ? 42 : 34,
    container.clientWidth / container.clientHeight,
    0.1,
    100,
  );
  camera.position.set(0, 0, 9);

  const renderer = new THREE.WebGLRenderer({
    // No celular o antialias custa caro e some no pixel denso.
    antialias: !mobile,
    powerPreference: "low-power",
    alpha: false,
  });
  // dpr travado: em tela 3x o custo triplica e a diferença não aparece.
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);
  renderer.domElement.className = estilos.tela;

  // ---- Luz. Duas fontes, sem sombra: sombra é o custo mais alto da cena e
  // aqui não acrescenta nada, porque as peças flutuam sem chão.
  cena.add(new THREE.AmbientLight(LUZ.ambiente, LUZ.ambienteIntensidade));
  const principal = new THREE.DirectionalLight(LUZ.principal, LUZ.principalIntensidade);
  principal.position.set(4, 6, 8);
  cena.add(principal);
  const contraluz = new THREE.DirectionalLight(LUZ.ambiente, 0.6);
  contraluz.position.set(-6, -2, -4);
  cena.add(contraluz);

  // Tudo que precisa ser descartado no fim, num lugar só.
  const descartaveis: { dispose(): void }[] = [];
  const registrar = <T extends { dispose(): void }>(x: T): T => {
    descartaveis.push(x);
    return x;
  };

  const grupo = new THREE.Group();
  cena.add(grupo);

  // ---- 1. As chapas. Cada uma com a espessura real do acabamento, em escala:
  // 18mm vira 0.18 na cena, então a proporção entre uma chapa de 15 e uma de
  // 25 é a de verdade.
  type Peca = {
    malha: InstanceType<typeof THREE.Mesh>;
    entrada: number; // em que ponto do scroll ela entra (0 a 1)
    destinoX: number;
    destinoY: number;
    destinoZ: number;
    giro: number;
  };

  const pecas: Peca[] = ACABAMENTOS.map((acabamento, i) => {
    const largura = 2.6 - i * 0.18;
    const altura = 1.5 + (i % 3) * 0.35;
    const geometria = registrar(
      new THREE.BoxGeometry(largura, altura, acabamento.espessuraMm / 100),
    );
    const material = registrar(
      new THREE.MeshStandardMaterial({
        color: acabamento.cor,
        roughness: acabamento.rugosidade,
        metalness: 0.02,
      }),
    );
    const malha = new THREE.Mesh(geometria, material);
    grupo.add(malha);

    // Posição final: as chapas se abrem em leque, cada uma num plano de
    // profundidade diferente. Nada aleatório — o mesmo desenho a cada visita.
    const lado = i % 2 === 0 ? 1 : -1;
    return {
      malha,
      entrada: i * 0.075,
      destinoX: lado * (0.55 + i * 0.34),
      destinoY: (i % 3) * 0.42 - 0.5,
      destinoZ: -i * 0.6,
      giro: lado * (0.18 + i * 0.05),
    };
  });

  // ---- 2. A lâmina que assume a curva. Um plano com os vértices deslocados
  // em arco: é o que uma lâmina de 6mm faz quando é curvada num gabarito.
  const RAIO = 3.4;
  const ARCO = Math.PI * 0.55;

  const laminaGeo = registrar(new THREE.PlaneGeometry(4.6, 2.2, 96, 1));
  const posicoes = laminaGeo.attributes.position;
  for (let i = 0; i < posicoes.count; i++) {
    const x = posicoes.getX(i);
    const t = x / 2.3; // −1 a 1 ao longo da largura
    const angulo = t * ARCO * 0.5;
    posicoes.setX(i, Math.sin(angulo) * RAIO);
    posicoes.setZ(i, (Math.cos(angulo) - 1) * RAIO);
  }
  laminaGeo.computeVertexNormals();

  const laminaMat = registrar(
    new THREE.MeshStandardMaterial({
      color: LAMINA.cor,
      roughness: LAMINA.rugosidade,
      metalness: 0.02,
      side: THREE.DoubleSide,
    }),
  );
  const lamina = new THREE.Mesh(laminaGeo, laminaMat);
  grupo.add(lamina);

  // ---- 3. A fita de borda, seguindo exatamente a mesma curva da lâmina.
  // É uma fita de 2mm: o que ela faz é esconder o miolo do MDF na borda.
  const pontosDaCurva: InstanceType<typeof THREE.Vector3>[] = [];
  for (let i = 0; i <= 96; i++) {
    const t = (i / 96) * 2 - 1;
    const angulo = t * ARCO * 0.5;
    pontosDaCurva.push(
      new THREE.Vector3(Math.sin(angulo) * RAIO, 1.1, (Math.cos(angulo) - 1) * RAIO),
    );
  }
  const curva = new THREE.CatmullRomCurve3(pontosDaCurva);
  const fitaGeo = registrar(
    new THREE.TubeGeometry(curva, 96, FITA.espessuraMm / 100, 4, false),
  );
  const fitaMat = registrar(
    new THREE.MeshStandardMaterial({
      color: FITA.cor,
      roughness: FITA.rugosidade,
      metalness: 0.05,
    }),
  );
  const fita = new THREE.Mesh(fitaGeo, fitaMat);
  grupo.add(fita);

  // ---- Estado de animação
  let progresso = 0;
  let mouseX = 0;
  let mouseY = 0;
  let quadro = 0;

  /** Onde a seção está na tela: 0 ao entrar por baixo, 1 ao sair por cima. */
  function lerProgresso() {
    const caixa = container.getBoundingClientRect();
    const total = window.innerHeight + caixa.height;
    const andado = window.innerHeight - caixa.top;
    return Math.min(1, Math.max(0, andado / total));
  }

  /** Suavização: 0→1 com aceleração e desaceleração, sem salto nas pontas. */
  const suave = (t: number) => t * t * (3 - 2 * t);

  function aplicar(p: number) {
    // As chapas entram uma a uma e caminham para a posição final.
    for (const peca of pecas) {
      const local = suave(Math.min(1, Math.max(0, (p - peca.entrada) / 0.45)));
      peca.malha.position.set(
        peca.destinoX * local,
        peca.destinoY * local + (1 - local) * 3.2,
        peca.destinoZ * local,
      );
      peca.malha.rotation.set(0, peca.giro * local, peca.giro * 0.4 * local);
      (peca.malha.material as InstanceType<typeof THREE.MeshStandardMaterial>).opacity = local;
      peca.malha.visible = local > 0.01;
    }

    // A lâmina e a fita chegam depois, e giram juntas: é a mesma peça.
    const chegadaLamina = suave(Math.min(1, Math.max(0, (p - 0.3) / 0.5)));
    const giro = chegadaLamina * Math.PI * 0.18;
    lamina.position.set(0, -0.2, 1.2 - (1 - chegadaLamina) * 4);
    lamina.rotation.set(-0.22 * chegadaLamina, giro, 0);
    lamina.visible = chegadaLamina > 0.01;
    fita.position.copy(lamina.position);
    fita.rotation.copy(lamina.rotation);
    fita.visible = lamina.visible;

    // O conjunto inteiro fecha em composição: aproxima e assenta.
    grupo.rotation.y = (p - 0.5) * 0.5 + mouseX * 0.06;
    grupo.rotation.x = mouseY * 0.04;
    camera.position.z = 9 - suave(p) * 1.6;
  }

  function desenhar() {
    quadro = requestAnimationFrame(desenhar);
    const alvo = lerProgresso();
    // Interpolação: o scroll pode saltar, a cena não.
    progresso += (alvo - progresso) * 0.08;
    aplicar(progresso);
    renderer.render(cena, camera);
  }

  function aoMoverMouse(evento: MouseEvent) {
    // Parallax MUITO sutil: 6% de um radiano no eixo Y, nada no resto.
    mouseX = (evento.clientX / window.innerWidth) * 2 - 1;
    mouseY = (evento.clientY / window.innerHeight) * 2 - 1;
  }

  function aoRedimensionar() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }

  window.addEventListener("resize", aoRedimensionar);

  if (reduzido) {
    // Movimento reduzido: um quadro só, com a composição montada. A pessoa vê
    // o resultado; nada se mexe, e o rAF nunca começa.
    aplicar(1);
    renderer.render(cena, camera);
  } else {
    // Sem parallax de mouse no celular: não há mouse, e o listener custaria.
    if (!mobile) window.addEventListener("mousemove", aoMoverMouse, { passive: true });
    progresso = lerProgresso();
    desenhar();
  }

  // ---- Descarte. Sem isto, sair da página deixa o contexto WebGL vivo e a
  // GPU segurando a memória das geometrias.
  return () => {
    cancelAnimationFrame(quadro);
    window.removeEventListener("resize", aoRedimensionar);
    window.removeEventListener("mousemove", aoMoverMouse);
    for (const d of descartaveis) d.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
  };
}
