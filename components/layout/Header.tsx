"use client";

/**
 * Header — o cabeçalho do site.
 *
 * O que é: o lockup da marca com o nome da unidade, os cinco itens do menu e
 * a ação de contato. Sticky no topo, em papel sólido, em toda página — na
 * home fica ACIMA do vídeo da abertura, nunca por cima dele. Abaixo de 1025px
 * o menu vira um painel de tela cheia (components/layout/MobileMenu.tsx).
 *
 * Some ao rolar para baixo e volta ao rolar para cima (v4, 05/10/2026):
 *   · scrollY < 120px: sempre visível, sem fio inferior;
 *   · rolando para baixo depois de 120px: sai para cima (translateY(-100%));
 *   · rolando para cima mais de 8px: volta, com fio inferior de 1px;
 *   · nunca some com o menu mobile aberto nem com foco de teclado dentro dele
 *     (Tab até um item escondido traz o cabeçalho de volta).
 * Só transform anima, e o cabeçalho é sticky: sair do lugar não move nada
 * da página (sem layout shift). Listener passivo + requestAnimationFrame.
 *
 * Onde é usado: em TODA página. O CLAUDE.md exige cabeçalho completo em cada
 * uma — a pessoa chega por qualquer porta, e nenhuma página é a segunda.
 *
 * Props: nenhuma. Até a v4 recebia a superfície em que pousava; desde então
 * é sempre papel.
 */
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { navegacao, linkWhatsApp, unidade } from "../../config/derivados";
import { Menu, WhatsApp } from "../icons";
import { Brand } from "./Brand";
import { MobileMenu } from "./MobileMenu";
import estilos from "./Header.module.css";

// Abaixo disto o cabeçalho fica sempre visível e sem fio: é o topo da página.
const TOPO = 120;
// Quanto é preciso rolar para cima para ele voltar. Abaixo disto é tremor do
// dedo ou da inércia do trackpad, não intenção.
const VOLTA = 8;

export function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [oculto, setOculto] = useState(false);
  const [comFio, setComFio] = useState(false);
  const cabecalho = useRef<HTMLElement>(null);

  // Lido dentro do listener sem reinstalá-lo a cada abertura do menu.
  const menuAbertoRef = useRef(false);
  useEffect(() => {
    menuAbertoRef.current = menuAberto;
  }, [menuAberto]);

  useEffect(() => {
    let ultimoY = window.scrollY;
    // Onde começou a subida atual: para medir os 8px acumulados, e não por
    // evento (um evento de scroll pode trazer 1px).
    let inicioDaSubida = ultimoY;
    let agendado = false;

    const atualizar = () => {
      agendado = false;
      const y = window.scrollY;
      // Foco de TECLADO dentro do cabeçalho (:focus-visible). Foco de toque
      // não conta: ao fechar o menu mobile, o foco volta para o botão do menu
      // e o cabeçalho ficaria preso na tela até a pessoa tocar fora.
      const ativo = document.activeElement;
      const focoDentro =
        !!ativo && !!cabecalho.current?.contains(ativo) && ativo.matches(":focus-visible");

      if (y < TOPO) {
        setOculto(false);
        setComFio(false);
      } else if (menuAbertoRef.current || focoDentro) {
        setOculto(false);
      } else if (y > ultimoY) {
        setOculto(true);
        inicioDaSubida = y;
      } else if (y < ultimoY) {
        if (inicioDaSubida - y > VOLTA) {
          setOculto(false);
          setComFio(true);
        }
      }
      if (y > ultimoY) inicioDaSubida = y;
      ultimoY = y;
    };

    const aoRolar = () => {
      if (agendado) return;
      agendado = true;
      requestAnimationFrame(atualizar);
    };

    // Foco por teclado entrando no cabeçalho escondido: ele volta na hora.
    const aoFocar = (evento: FocusEvent) => {
      if (!(evento.target as Element | null)?.matches(":focus-visible")) return;
      setOculto(false);
      // Fora do topo, volta como na rolagem para cima: com o fio.
      if (window.scrollY >= TOPO) setComFio(true);
    };
    const el = cabecalho.current;

    window.addEventListener("scroll", aoRolar, { passive: true });
    el?.addEventListener("focusin", aoFocar);
    return () => {
      window.removeEventListener("scroll", aoRolar);
      el?.removeEventListener("focusin", aoFocar);
    };
  }, []);

  // Identidade estável: o MobileMenu usa isto como dependência de efeito.
  const fecharMenu = useCallback(() => setMenuAberto(false), []);
  const abrirMenu = useCallback(() => setMenuAberto(true), []);

  const whatsapp = linkWhatsApp();

  const classes = [
    estilos.header,
    oculto && !menuAberto ? estilos.oculto : "",
    comFio ? estilos.comFio : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <header ref={cabecalho} className={classes}>
        <Link href="/" className={estilos.marca} aria-label={`Dalmóbile ${unidade.nome} — página inicial`}>
          <Brand decorativo />
        </Link>

        <nav className={estilos.nav} aria-label="Navegação principal">
          <ul>
            {navegacao.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.rotulo}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={estilos.acoes}>
          {/* O CLAUDE.md proíbe CTA sem destino real. Sem número de WhatsApp,
              a ação aparece desabilitada — é <span>, não <a>, então não há
              link morto para clicar. O telefone continua ativo no rodapé e no
              menu. Assim que o número existir, isto vira link sozinho. */}
          {whatsapp ? (
            <a className={estilos.contato} href={whatsapp}>
              <WhatsApp />
              <span>Falar no WhatsApp</span>
            </a>
          ) : (
            <span className={`${estilos.contato} ${estilos.pendente}`} aria-disabled="true">
              <WhatsApp />
              <span>WhatsApp</span>
              <span className={estilos.emBreve}>em breve</span>
            </span>
          )}

          <button
            type="button"
            className={estilos.hamburguer}
            onClick={abrirMenu}
            aria-expanded={menuAberto}
            aria-controls="menu-principal"
          >
            <Menu />
            <span className={estilos.rotuloMenu}>Menu</span>
          </button>
        </div>
      </header>

      <MobileMenu aberto={menuAberto} aoFechar={fecharMenu} />
    </>
  );
}
