"use client";

/**
 * SliderDeFotos — a vitrine que passa para o lado.
 *
 * O que é: a galeria horizontal da home. Mostra todas as fotos do acervo
 * daquela unidade, com rótulo do ambiente e título de impacto sob cada uma.
 *
 * Onde é usado: app/page.tsx, na seção "Projetos que permanecem".
 *
 * Props:
 *   fotos   as fotos a exibir, já filtradas pela unidade do build
 *   idRotulo  id do <h2> que nomeia a região, para leitor de tela
 *
 * COMO ROLA, E POR QUÊ ASSIM: a rolagem é nativa, com `overflow-x: auto` e
 * `scroll-snap`. Não é biblioteca de carrossel — o CLAUDE.md proíbe instalar
 * uma — e não é JavaScript reimplementando arrastar. Com isso:
 *
 *   · funciona SEM JavaScript, com o dedo no celular e com a roda do mouse
 *   · o teclado navega de foto em foto, porque cada uma tem link focável
 *   · rola dentro do contêiner, nunca no body — regra dura do CLAUDE.md
 *
 * Os botões só acrescentam conforto no desktop, onde não há dedo. Eles são o
 * único motivo de este componente ser "use client".
 *
 * NÃO passa sozinho. Carrossel automático é proibido pelo CLAUDE.md, e com
 * razão: rouba a leitura de quem está olhando uma foto.
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

export default function SliderDeFotos({
  fotos,
  idRotulo,
}: {
  fotos: FotoDoSlider[];
  idRotulo: string;
}) {
  const trilho = useRef<HTMLUListElement>(null);
  const [noComeco, setNoComeco] = useState(true);
  const [noFim, setNoFim] = useState(false);

  // Desabilita a seta que não tem para onde ir, em vez de deixá-la clicável
  // sem efeito. Uma margem de 2px absorve o arredondamento do navegador.
  const conferirLimites = useCallback(() => {
    const el = trilho.current;
    if (!el) return;
    setNoComeco(el.scrollLeft <= 2);
    setNoFim(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    conferirLimites();
    const el = trilho.current;
    if (!el) return;
    el.addEventListener("scroll", conferirLimites, { passive: true });
    window.addEventListener("resize", conferirLimites);
    return () => {
      el.removeEventListener("scroll", conferirLimites);
      window.removeEventListener("resize", conferirLimites);
    };
  }, [conferirLimites]);

  const passar = (direcao: 1 | -1) => {
    const el = trilho.current;
    if (!el) return;
    // Anda uma foto por clique: a largura do primeiro item mais a calha.
    const item = el.querySelector("li");
    const passo = item ? item.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    const suave = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: passo * direcao, behavior: suave ? "smooth" : "auto" });
  };

  return (
    <div className={estilos.moldura}>
      <ul
        className={estilos.trilho}
        ref={trilho}
        // A região é rolável e recebe foco, para quem navega por teclado
        // conseguir rolá-la sem passar por todos os links.
        tabIndex={0}
        role="region"
        aria-labelledby={idRotulo}
      >
        {fotos.map((foto, i) => (
          <li key={foto.src} className={estilos.item}>
            <Link href={`/ambientes/${foto.ambienteSlug}`} className={estilos.link}>
              <Foto
                src={foto.src}
                alt={foto.alt}
                /* No celular a foto ocupa quase a largura toda, com uma fresta
                   da próxima aparecendo — é o que avisa que dá para arrastar.
                   No desktop cabem três. */
                sizes="(max-width: 600px) 86vw, (max-width: 1024px) 46vw, 32vw"
                prioridade={i < 2}
                className={estilos.foto}
              />
              <span className={estilos.rotulo}>{foto.ambienteNome}</span>
              <span className={estilos.titulo}>{foto.titulo}</span>
              {foto.edificio || foto.arquiteto ? (
                <span className={estilos.credito}>
                  {[foto.edificio, foto.arquiteto].filter(Boolean).join(" · ")}
                </span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>

      <div className={estilos.controles}>
        <button
          type="button"
          className={estilos.botao}
          onClick={() => passar(-1)}
          disabled={noComeco}
          aria-label="Ver as fotos anteriores"
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          type="button"
          className={estilos.botao}
          onClick={() => passar(1)}
          disabled={noFim}
          aria-label="Ver as próximas fotos"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
