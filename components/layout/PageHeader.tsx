/**
 * PageHeader — o cabeçalho de página, igual em toda página interna.
 *
 * O que é: o gabarito de abertura das internas (V2, direção de layout, 6.1):
 *   caminho de navegação (rótulo) → título em Display L → dek na cor de apoio
 *   → introdução opcional → régua de 1px DA LARGURA DA COLUNA DE TEXTO.
 * A régua fecha o cabeçalho e nunca atravessa a página: régua mais larga que o
 * texto que ela separa é o que fazia as internas parecerem meio vazias.
 * Depois dela vem o respiro normal (120px), que é o padding da Section.
 *
 * Onde é usado: /ambientes, /ambientes/[slug], /a-dalmobile, /arquitetos,
 * /a-loja e /privacidade, sempre como primeiro conteúdo de uma Section papel.
 *
 * Props:
 *   caminho   os passos ACIMA desta página, do mais geral ao mais próximo.
 *             A página atual entra sozinha no fim, com o título. "Início" é
 *             sempre o primeiro passo.
 *   titulo    o <h1> da página.
 *   dek       a linha logo abaixo do título. Opcional.
 *   children  a introdução, em texto corrido. Opcional.
 *
 * Server component: não tem estado.
 */
import Link from "next/link";
import type { ReactNode } from "react";

import estilos from "./PageHeader.module.css";

type Passo = { rotulo: string; href: string };

type PageHeaderProps = {
  caminho?: Passo[];
  titulo: ReactNode;
  /** Como a página se chama no caminho, se for diferente do título. */
  rotuloNoCaminho?: string;
  dek?: ReactNode;
  children?: ReactNode;
};

export function PageHeader({ caminho = [], titulo, rotuloNoCaminho, dek, children }: PageHeaderProps) {
  const passos: Passo[] = [{ rotulo: "Início", href: "/" }, ...caminho];

  return (
    <header className={estilos.cabecalho}>
      <nav aria-label="Caminho de navegação" className={estilos.caminho}>
        <ol>
          {passos.map((passo) => (
            <li key={passo.href}>
              <Link href={passo.href}>{passo.rotulo}</Link>
            </li>
          ))}
          <li aria-current="page">{rotuloNoCaminho ?? titulo}</li>
        </ol>
      </nav>

      <h1 className={estilos.titulo}>{titulo}</h1>
      {dek ? <p className={estilos.dek}>{dek}</p> : null}
      {children ? <div className={estilos.intro}>{children}</div> : null}

      <hr className={estilos.regua} />
    </header>
  );
}
