"use client";

/**
 * Header — o cabeçalho do site.
 *
 * O que é: o lockup da marca com o nome da unidade, os cinco itens do menu e
 * a ação de contato. Fica no topo, transparente sobre o conteúdo, e ganha
 * fundo sólido depois de 80px de rolagem. Abaixo de 1025px o menu vira um
 * painel de tela cheia (components/layout/MobileMenu.tsx).
 *
 * Onde é usado: em TODA página. O CLAUDE.md exige cabeçalho completo em cada
 * uma — a pessoa chega por qualquer porta, e nenhuma página é a segunda.
 *
 * Props:
 *   superficie  a superfície em que o cabeçalho está pousado. Decide a cor do
 *               texto e o fundo sólido que ele assume ao rolar. Obrigatória.
 */
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { navegacao, linkWhatsApp, unidade } from "../../config/derivados";
import { Menu, WhatsApp } from "../icons";
import { Brand } from "./Brand";
import { MobileMenu } from "./MobileMenu";
import type { Superficie } from "./Section";
import estilos from "./Header.module.css";

/** Rolagem a partir da qual o cabeçalho ganha fundo sólido. */
const ROLAGEM_PARA_FIXAR = 80;

type HeaderProps = {
  superficie: Superficie;
};

export function Header({ superficie }: HeaderProps) {
  const [fixado, setFixado] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    const aoRolar = () => setFixado(window.scrollY > ROLAGEM_PARA_FIXAR);
    aoRolar(); // o navegador pode restaurar a posição de rolagem ao voltar
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  // Identidade estável: o MobileMenu usa isto como dependência de efeito.
  const fecharMenu = useCallback(() => setMenuAberto(false), []);
  const abrirMenu = useCallback(() => setMenuAberto(true), []);

  const whatsapp = linkWhatsApp();

  const classes = [estilos.header, estilos[superficie], fixado ? estilos.fixado : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <header className={classes}>
        <Link href="/" className={estilos.marca} aria-label={`Dalmóbile ${unidade.nome} — página inicial`}>
          <Brand claro={superficie === "preto"} decorativo />
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

      <MobileMenu aberto={menuAberto} aoFechar={fecharMenu} superficie={superficie} />
    </>
  );
}
