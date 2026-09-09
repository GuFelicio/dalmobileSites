"use client";

/**
 * SliderDeFotos — a vitrine da home.
 *
 * O que é: a composição do estudo — uma foto grande com o título por cima e um
 * par de fotos menores abaixo — repetindo para o lado. Cada passo do slider é
 * um conjunto novo, na mesma forma.
 *
 * Onde é usado: app/page.tsx, na seção "Projetos que permanecem".
 *
 * Props:
 *   fotos     as fotos do acervo daquela unidade, já filtradas e ordenadas
 *   idRotulo  id do <h2> que nomeia a região, para leitor de tela
 *
 * A APARÊNCIA VEM DAS CLASSES DO ESTUDO (`synthesis-project*`, em
 * globals.css), de propósito: é o desenho que o cliente aprovou. Este
 * componente só as agrupa de três em três e faz o conjunto rolar.
 *
 * COMO ROLA: `overflow-x` com `scroll-snap` nativo, um conjunto por vez. Não é
 * biblioteca de carrossel — o CLAUDE.md proíbe instalar uma. Funciona sem
 * JavaScript, aceita o dedo no celular e rola dentro do contêiner, nunca no
 * body. NÃO passa sozinho: carrossel automático é proibido, e rouba a leitura
 * de quem está olhando uma foto.
 */
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import Foto from "./Foto";
import estilos from "./SliderDeFotos.module.css";

export type FotoDoSlider = {
  src: string;
  titulo: string;
  alt: string;
  ambienteNome: string;
  ambienteSlug: string;
  edificio: string | null;
  arquiteto: string | null;
};

/** Uma foto grande e duas menores: a composição original do estudo. */
const POR_CONJUNTO = 3;

function agrupar(fotos: FotoDoSlider[]): FotoDoSlider[][] {
  const conjuntos: FotoDoSlider[][] = [];
  for (let i = 0; i < fotos.length; i += POR_CONJUNTO) {
    const conjunto = fotos.slice(i, i + POR_CONJUNTO);
    // Um conjunto com menos de três fica torto na composição: a última sobra
    // volta para o conjunto anterior em vez de virar um passo capenga.
    if (conjunto.length < POR_CONJUNTO && conjuntos.length > 0) {
      conjuntos[conjuntos.length - 1].push(...conjunto);
    } else {
      conjuntos.push(conjunto);
    }
  }
  return conjuntos;
}

function Cartao({
  foto,
  numero,
  destaque,
}: {
  foto: FotoDoSlider;
  numero: number;
  destaque: boolean;
}) {
  const rotulo = `${String(numero).padStart(2, "0")} / ${foto.ambienteNome.toUpperCase()}`;
  return (
    <article className={`synthesis-project ${destaque ? "synthesis-project-featured" : ""}`}>
      <Foto
        src={foto.src}
        alt={foto.alt}
        /* A grande ocupa a largura toda; as do par, metade a partir do
           tablet — é o que a composição do estudo já fazia. */
        sizes={destaque ? "100vw" : "(max-width: 700px) 100vw, 50vw"}
        prioridade={numero <= 3}
      />
      <div>
        <span>{rotulo}</span>
        <h3>{foto.titulo}</h3>
        <Link href={`/ambientes/${foto.ambienteSlug}`}>
          Ver {foto.ambienteNome.toLowerCase()} <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}

export default function SliderDeFotos({
  fotos,
  idRotulo,
}: {
  fotos: FotoDoSlider[];
  idRotulo: string;
}) {
  const conjuntos = agrupar(fotos);
  const trilho = useRef<HTMLUListElement>(null);
  const [atual, setAtual] = useState(0);
  const [noComeco, setNoComeco] = useState(true);
  const [noFim, setNoFim] = useState(conjuntos.length <= 1);

  const conferir = useCallback(() => {
    const el = trilho.current;
    if (!el) return;
    setNoComeco(el.scrollLeft <= 2);
    setNoFim(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
    setAtual(Math.round(el.scrollLeft / Math.max(1, el.clientWidth)));
  }, []);

  useEffect(() => {
    conferir();
    const el = trilho.current;
    if (!el) return;
    el.addEventListener("scroll", conferir, { passive: true });
    window.addEventListener("resize", conferir);
    return () => {
      el.removeEventListener("scroll", conferir);
      window.removeEventListener("resize", conferir);
    };
  }, [conferir]);

  const passar = (direcao: 1 | -1) => {
    const el = trilho.current;
    if (!el) return;
    const suave = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: el.clientWidth * direcao, behavior: suave ? "smooth" : "auto" });
  };

  if (conjuntos.length === 0) return null;

  return (
    <div className={estilos.moldura}>
      <ul className={estilos.trilho} ref={trilho} tabIndex={0} role="region" aria-labelledby={idRotulo}>
        {conjuntos.map((conjunto, iConjunto) => {
          const [grande, ...par] = conjunto;
          const base = iConjunto * POR_CONJUNTO;
          return (
            <li key={grande.src} className={estilos.conjunto}>
              <Cartao foto={grande} numero={base + 1} destaque />
              {par.length > 0 ? (
                <div className="synthesis-project-pair">
                  {par.map((foto, i) => (
                    <Cartao key={foto.src} foto={foto} numero={base + i + 2} destaque={false} />
                  ))}
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>

      <div className={estilos.controles}>
        <div className={estilos.botoes}>
          <button
            type="button"
            className={estilos.botao}
            onClick={() => passar(-1)}
            disabled={noComeco}
            aria-label="Ver o conjunto anterior"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            className={estilos.botao}
            onClick={() => passar(1)}
            disabled={noFim}
            aria-label="Ver o próximo conjunto"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
        {/* Diz onde a pessoa está sem inventar bolinhas: com doze conjuntos,
            um indicador por ponto viraria ruído. */}
        <p className={estilos.contagem} aria-live="polite">
          {Math.min(atual + 1, conjuntos.length)} de {conjuntos.length}
        </p>
      </div>
    </div>
  );
}
