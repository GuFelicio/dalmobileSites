"use client";

/**
 * VideoEmLoop — o vídeo em loop da home.
 *
 * O que é: faixa de vídeo decorativo, largura total, sem som e sem controle.
 *
 * Onde é usado: app/page.tsx, logo abaixo da capa, no lugar da antiga seção
 * "01 — Como projetamos".
 *
 * Props:
 *   webm    fonte principal (VP9, mais leve)
 *   mp4     fallback H.264, para o Safari antigo
 *   poster  primeiro quadro; é o que aparece antes de tocar e com
 *           prefers-reduced-motion
 *
 * QUANDO TOCA: só quando a faixa entra na tela, e pausa quando sai. Por isso
 * NÃO tem o atributo `autoplay`: com ele, o vídeo começaria a rodar no
 * carregamento, antes de a pessoa chegar até ele. Quem dá o play é o
 * IntersectionObserver abaixo. Sem JavaScript, fica o poster.
 *
 * Com prefers-reduced-motion: reduce, nunca toca — fica só o poster.
 */
import { useEffect, useRef } from "react";

import estilos from "./VideoEmLoop.module.css";

type Props = {
  webm: string;
  mp4: string;
  poster: string;
};

export default function VideoEmLoop({ webm, mp4, poster }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    // O React não escreve `muted` no HTML do servidor; sem isto o navegador
    // trata o vídeo como tendo som e recusa o play() sem gesto do usuário.
    video.muted = true;

    const movimentoReduzido = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (movimentoReduzido.matches) return;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          // play() devolve promessa que rejeita se o navegador bloquear (modo
          // de economia de bateria, por exemplo). Aí fica o poster, e está bem.
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      // 25% visível já conta como "chegou": a faixa é alta, e esperar ela
      // entrar inteira faria o vídeo começar tarde no celular.
      { threshold: 0.25 },
    );
    observador.observe(video);

    // Se a pessoa ligar o "reduzir movimento" com a página aberta, para.
    const aoMudarPreferencia = () => {
      if (movimentoReduzido.matches) {
        observador.disconnect();
        video.pause();
      }
    };
    movimentoReduzido.addEventListener("change", aoMudarPreferencia);

    return () => {
      observador.disconnect();
      movimentoReduzido.removeEventListener("change", aoMudarPreferencia);
    };
  }, []);

  return (
    <div className={estilos.faixa}>
      <video
        ref={ref}
        className={estilos.video}
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
    </div>
  );
}
