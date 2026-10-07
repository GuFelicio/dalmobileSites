"use client";

/**
 * VideoEmLoop — o vídeo de fundo da capa da home.
 *
 * O que é: vídeo decorativo em loop, sem som e sem controle, que preenche a
 * área que o contém, em duas versões (07/10/2026): vertical no celular,
 * horizontal acima. O enquadramento da caixa (posição e tamanho) vem de
 * `className`, de quem o usa; as camadas internas, de VideoEmLoop.module.css.
 *
 * Onde é usado: app/page.tsx, na abertura da home (#topo).
 *
 * Props:
 *   desktop    { webm?, mp4, poster } — a versão horizontal
 *   mobile     { webm?, mp4, poster } — a versão vertical (opcional)
 *   media      a media query que escolhe a versão mobile
 *   className  classe de enquadramento da caixa
 *
 * COMO ESCOLHE A VERSÃO, SEM BAIXAR AS DUAS:
 *   - Vídeo: `<source media>`, com as fontes mobile PRIMEIRO. O navegador usa
 *     a primeira fonte cuja media bate e cujo formato ele toca. A escolha é
 *     feita no carregamento: girar o aparelho não troca o vídeo, e está bem.
 *   - Poster: um `<picture>` atrás do vídeo, e NÃO o atributo `poster`, que
 *     aceita uma imagem só e faria o celular baixar o poster horizontal. O
 *     vídeo é transparente até ter o primeiro quadro, então o que aparece
 *     antes de tocar é o `<picture>`, já na versão certa — sem JavaScript.
 *
 * QUANDO TOCA: `autoplay`, porque é o primeiro conteúdo da página — começa
 * antes mesmo de o JavaScript carregar. Pausa quando a capa sai da tela e
 * volta quando ela reaparece, para não gastar bateria rodando fora de vista.
 *
 * Com prefers-reduced-motion: reduce, o vídeo para, deixa de baixar e some;
 * fica só o poster do `<picture>`.
 */
import { useEffect, useRef } from "react";

import estilos from "./VideoEmLoop.module.css";

/** Uma versão do vídeo. webm é opcional: a versão mobile só tem mp4. */
type Versao = { webm?: string; mp4: string; poster: string };

type Props = {
  desktop: Versao;
  mobile?: Versao;
  media?: string;
  className?: string;
};

export default function VideoEmLoop({ desktop, mobile, media, className }: Props) {
  const temMobile = Boolean(mobile && media);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    // Garante o mudo também pela propriedade: sem ele o navegador trata o
    // vídeo como tendo som e recusa o autoplay.
    video.muted = true;

    const movimentoReduzido = window.matchMedia("(prefers-reduced-motion: reduce)");
    let naTela = true;

    const tocar = () => {
      // play() rejeita se o navegador bloquear (economia de bateria, por
      // exemplo). Aí fica o poster, e está bem.
      if (naTela && !movimentoReduzido.matches) video.play().catch(() => {});
    };

    const mostrarSoOPoster = () => {
      // O `autoplay` do HTML pode ter começado antes da hidratação. Sem
      // autoplay e com preload="none", load() interrompe o download; o CSS
      // esconde o vídeo e o <picture> de trás aparece.
      video.pause();
      video.removeAttribute("autoplay");
      video.preload = "none";
      video.load();
    };

    if (movimentoReduzido.matches) mostrarSoOPoster();

    const observador = new IntersectionObserver(([entrada]) => {
      naTela = entrada.isIntersecting;
      if (naTela) tocar();
      else video.pause();
    });
    observador.observe(video);

    // A pessoa pode mudar o "reduzir movimento" com a página aberta.
    const aoMudarPreferencia = () => {
      if (movimentoReduzido.matches) {
        mostrarSoOPoster();
      } else {
        video.preload = "auto";
        tocar();
      }
    };
    movimentoReduzido.addEventListener("change", aoMudarPreferencia);

    return () => {
      observador.disconnect();
      movimentoReduzido.removeEventListener("change", aoMudarPreferencia);
    };
  }, []);

  return (
    <div className={`${estilos.camadas} ${className ?? ""}`} aria-hidden="true">
      {/* O poster, na versão certa para a tela. alt vazio: é decorativo. */}
      <picture>
        {temMobile ? <source media={media} srcSet={mobile!.poster} /> : null}
        <img className={estilos.poster} src={desktop.poster} alt="" fetchPriority="high" />
      </picture>
      <video
        ref={ref}
        className={estilos.video}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        tabIndex={-1}
      >
        {/* Mobile primeiro: vale a primeira fonte que bate. */}
        {temMobile && mobile!.webm ? <source media={media} src={mobile!.webm} type="video/webm" /> : null}
        {temMobile ? <source media={media} src={mobile!.mp4} type="video/mp4" /> : null}
        {desktop.webm ? <source src={desktop.webm} type="video/webm" /> : null}
        <source src={desktop.mp4} type="video/mp4" />
      </video>
    </div>
  );
}
