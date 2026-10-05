/**
 * Section — as três superfícies do site.
 *
 * O que é: o invólucro que decide em que fundo um bloco vive: papel ou
 * grafite. O cinza é só do rodapé. Fora daqui (e das seções da home, que usam
 * as mesmas classes globais), nenhum componente escolhe fundo sozinho.
 *
 * Onde é usado: em toda página, em volta de cada bloco de conteúdo.
 *
 * Props:
 *   superficie  "papel" | "grafite" — obrigatória, sem padrão: a escolha da
 *               superfície é decisão de composição, não default.
 *   semRespiro  remove o respiro vertical (a foto de abertura do case).
 *   sangra      remove a margem lateral, para foto de ponta a ponta.
 *   as          a tag renderizada. Padrão "section".
 *   id, className, children
 *
 * REGRA DE COMPOSIÇÃO (v4): seções vizinhas NUNCA têm a mesma cor, e o
 * rodapé é sempre cinza. A sequência de cada página está no CLAUDE.md.
 */
import type { ElementType, ReactNode } from "react";
import estilos from "./Section.module.css";

export type Superficie = "papel" | "grafite";

type SectionProps = {
  superficie: Superficie;
  semRespiro?: boolean;
  sangra?: boolean;
  as?: ElementType;
  id?: string;
  className?: string;
  children: ReactNode;
};

export function Section({
  superficie,
  semRespiro = false,
  sangra = false,
  as: Tag = "section",
  id,
  className,
  children,
}: SectionProps) {
  const classes = [
    estilos.section,
    estilos[superficie],
    `superficie-${superficie}`,
    semRespiro ? estilos.semRespiro : "",
    sangra ? estilos.sangra : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={classes} id={id}>
      {children}
    </Tag>
  );
}
