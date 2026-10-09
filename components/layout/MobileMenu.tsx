"use client";

/**
 * MobileMenu — o painel de navegação de tela cheia.
 *
 * O que é: o menu de mobile e tablet. Painel de tela cheia, com handler de
 * verdade, foco preso dentro enquanto aberto, fecha com Esc e trava a
 * rolagem do fundo. O código do estudo tinha um botão hambúrguer com
 * aria-label e sem handler nenhum — este componente existe para isso não se
 * repetir.
 *
 * Onde é usado: dentro de components/layout/Header.tsx, abaixo de 1025px.
 *
 * Props:
 *   aberto     se o painel está visível.
 *   aoFechar   chamado no Esc, no botão de fechar e ao seguir um link.
 */
import { useCallback, useEffect, useRef } from "react";
import { navegacao, linkTelefone, linkWhatsApp, unidade } from "../../config/derivados";
import { Fechar, WhatsApp } from "../icons";
import { Brand } from "./Brand";
import { irParaSecao } from "./irParaSecao";
import estilos from "./MobileMenu.module.css";

const FOCAVEIS = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

type MobileMenuProps = {
  aberto: boolean;
  aoFechar: () => void;
};

export function MobileMenu({ aberto, aoFechar }: MobileMenuProps) {
  const painel = useRef<HTMLDivElement>(null);
  const focoAnterior = useRef<HTMLElement | null>(null);

  // Prende o foco dentro do painel: Tab no último volta para o primeiro,
  // Shift+Tab no primeiro vai para o último. Sem isto, o leitor de tela
  // continua andando pela página que está atrás do painel.
  const aoTeclar = useCallback(
    (evento: KeyboardEvent) => {
      if (!aberto) return;

      if (evento.key === "Escape") {
        evento.preventDefault();
        aoFechar();
        return;
      }

      if (evento.key !== "Tab" || !painel.current) return;

      const alvos = Array.from(painel.current.querySelectorAll<HTMLElement>(FOCAVEIS));
      if (alvos.length === 0) return;

      const primeiro = alvos[0];
      const ultimo = alvos[alvos.length - 1];
      const ativo = document.activeElement;

      if (evento.shiftKey && ativo === primeiro) {
        evento.preventDefault();
        ultimo.focus();
      } else if (!evento.shiftKey && ativo === ultimo) {
        evento.preventDefault();
        primeiro.focus();
      }
    },
    [aberto, aoFechar],
  );

  // Foco e trava de rolagem. Depende SÓ de `aberto`: se dependesse também de
  // aoTeclar, cuja identidade muda a cada render, a limpeza rodaria a todo
  // render e devolveria o foco ao botão com o painel ainda aberto.
  useEffect(() => {
    if (!aberto) return;

    // Guarda quem tinha o foco para devolver ao fechar, e leva o foco para
    // dentro do painel.
    focoAnterior.current = document.activeElement as HTMLElement | null;
    painel.current?.querySelector<HTMLElement>(FOCAVEIS)?.focus();

    // Trava a rolagem do fundo enquanto o painel está aberto.
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflowAnterior;
      // Devolve o foco ao botão que abre o menu. Não basta "quem tinha o foco
      // antes": no Safari o toque num botão não dá foco a ele, e o foco caía
      // no <body> — quem navega por teclado perdia o lugar.
      const botao = document.querySelector<HTMLElement>('[aria-controls="menu-principal"]');
      // preventScroll: o botão fica no cabeçalho, e focá-lo não pode puxar a
      // página de volta para o topo depois que um item do menu rolou até a
      // seção (v5).
      (botao ?? focoAnterior.current)?.focus({ preventScroll: true });
    };
  }, [aberto]);

  // O listener é trocado sempre que aoTeclar muda, e só isso.
  useEffect(() => {
    if (!aberto) return;
    document.addEventListener("keydown", aoTeclar);
    return () => document.removeEventListener("keydown", aoTeclar);
  }, [aberto, aoTeclar]);

  const whatsapp = linkWhatsApp();

  return (
    <div
      ref={painel}
      id="menu-principal"
      className={estilos.painel}
      // hidden mantém o painel fora da ordem de tabulação quando fechado,
      // sem precisar desmontá-lo — a animação de saída precisa dele no DOM.
      hidden={!aberto}
      role="dialog"
      aria-modal="true"
      aria-label="Navegação principal"
    >
      <div className={estilos.topo}>
        <Brand />
        <button type="button" className={estilos.fechar} onClick={aoFechar}>
          <Fechar />
          <span className={estilos.rotuloFechar}>Fechar</span>
        </button>
      </div>

      <nav className={estilos.nav} aria-label="Páginas do site">
        <ul>
          {navegacao.map((item) => (
            <li key={item.href}>
              {/* <a>, como no cabeçalho (ver Header.tsx): o clique fecha o
                  painel e o navegador rola até a seção. */}
              <a href={item.href} onClick={(e) => irParaSecao(e, item.href, aoFechar)}>
                {item.rotulo}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={estilos.contato}>
        <a className={estilos.acao} href={linkTelefone()}>
          {unidade.telefone}
        </a>

        {whatsapp ? (
          <a className={estilos.acao} href={whatsapp}>
            <WhatsApp />
            Falar no WhatsApp
          </a>
        ) : (
          <span className={`${estilos.acao} ${estilos.pendente}`} aria-disabled="true">
            <WhatsApp />
            WhatsApp em breve
          </span>
        )}
        <p className={estilos.endereco}>
          {unidade.endereco.logradouro}
          <br />
          {unidade.endereco.bairro} · {unidade.cidade}
        </p>
      </div>
    </div>
  );
}
