"use client";

/**
 * VideoEmLoop — o vídeo de fundo da capa da home.
 *
 * O que é: vídeo decorativo em loop, sem som e sem controle, que preenche a
 * área que o contém. Não tem estilo próprio: o enquadramento (posição,
 * tamanho, object-fit) vem de `className`, de quem o usa.
 *
 * Onde é usado: app/page.tsx, no fundo da `.synthesis-hero`, no lugar da foto
 * de abertura.
 *
 * Props:
 *   webm       fonte principal (VP9, mais leve)
 *   mp4        fallback H.264, para o Safari antigo
 *   poster     primeiro quadro; é o que aparece antes de tocar e com
 *              prefers-reduced-motion
 *   className  classe de enquadramento
 *
 * QUANDO TOCA: `autoplay`, porque é o primeiro conteúdo da página — começa
 * antes mesmo de o JavaScript carregar. Pausa quando a capa sai da tela e
 * volta quando ela reaparece, para não gastar bateria rodando fora de vista.
 *
 * Com prefers-reduced-motion: reduce, para e volta ao poster.
 */
import { useEffect, useRef } from "react";

type Props = {
  webm: string;
  mp4: string;
  poster: string;
  className?: string;
};

export default function VideoEmLoop({ webm, mp4, poster, className }: Props) {
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
      // O `autoplay` do HTML pode ter começado antes da hidratação. load()
      // devolve o vídeo ao estado inicial, que exibe o poster.
      video.pause();
      video.removeAttribute("autoplay");
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
      if (movimentoReduzido.matches) mostrarSoOPoster();
      else tocar();
    };
    movimentoReduzido.addEventListener("change", aoMudarPreferencia);

    return () => {
      observador.disconnect();
      movimentoReduzido.removeEventListener("change", aoMudarPreferencia);
    };
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={poster}
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src={webm} type="video/webm" />
      <source src={mp4} type="video/mp4" />
    </video>
  );
}
