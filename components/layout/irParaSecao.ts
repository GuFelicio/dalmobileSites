/**
 * irParaSecao — o clique num item do menu que leva a uma seção da home.
 *
 * O que é: o handler de clique dos links "/#id" do menu (cabeçalho e menu
 * mobile). Quando a pessoa JÁ ESTÁ na home, ele rola até a seção e atualiza o
 * endereço com `history.replaceState`, em vez de deixar o navegador fazer a
 * navegação por âncora. Fora da home (em /privacidade, por exemplo), não faz
 * nada: o link carrega a home já na seção, como sempre.
 *
 * POR QUE EXISTE (10/10/2026): no site estático do Cloudflare Pages, a
 * navegação por âncora travava a página. O navegador dispara `popstate` a cada
 * clique em "#…", e o roteador do vinext responde a `popstate` pedindo os dados
 * da página ao servidor — que no Pages não existe. Ele entrava num laço de
 * `replaceState` (centenas por segundo) e engolia todo clique seguinte: depois
 * do primeiro item do menu, nenhum outro funcionava. `replaceState` não dispara
 * `popstate`, e o laço não começa. Ver docs/decisoes.md.
 *
 * Também não empilha entradas no "Voltar" do navegador: voltar sai da página,
 * em vez de passear pelas seções (e cada passeio dispararia o mesmo laço).
 *
 * Onde é usado: components/layout/Header.tsx e MobileMenu.tsx.
 *
 * Parâmetros: o evento de clique, o href do item ("/#projetos") e, opcional, o
 * que fazer antes de rolar (o menu mobile se fecha).
 */
import type { MouseEvent } from "react";

export function irParaSecao(evento: MouseEvent<HTMLAnchorElement>, href: string, antes?: () => void) {
  const [caminho, id] = href.split("#");
  // Só âncora da página em que a pessoa está. Outra página: navegação normal.
  if (!id || (caminho || "/") !== window.location.pathname) {
    antes?.();
    return;
  }
  // Ctrl/Cmd/Shift/Alt ou botão do meio: abrir em outra aba continua valendo.
  if (evento.button !== 0 || evento.metaKey || evento.ctrlKey || evento.shiftKey || evento.altKey) return;

  const alvo = document.getElementById(id);
  if (!alvo) return;

  evento.preventDefault();
  antes?.();
  window.history.replaceState(window.history.state, "", `#${id}`);

  // Dois quadros: dá tempo de o menu mobile fechar e devolver a rolagem da
  // página antes de rolar. scrollIntoView respeita o scroll-margin-top da
  // seção (a altura do cabeçalho), e a rolagem suave some com
  // prefers-reduced-motion.
  const suave = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  requestAnimationFrame(() =>
    requestAnimationFrame(() => alvo.scrollIntoView({ behavior: suave ? "smooth" : "auto", block: "start" })),
  );
}
