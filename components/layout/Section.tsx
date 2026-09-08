/**
 * Section — as três superfícies do site.
 *
 * O que é: o invólucro que decide em que fundo um bloco vive. Preto para
 * quando a imagem manda, cinza para costura, papel para quando o texto manda.
 * Fora daqui, nenhum componente escolhe fundo sozinho.
 *
 * Onde é usado: em toda página, em volta de cada bloco de conteúdo.
 *
 * Props:
 *   superficie  "preto" | "cinza" | "papel"  — obrigatória, sem padrão: a
 *               escolha da superfície é decisão de composição, não default.
 *   semRespiro  remove o respiro vertical, para faixas finas de pontuação.
 *   sangra      remove a margem lateral, para foto de ponta a ponta.
 *   as          a tag renderizada. Padrão "section".
 *   id, className, children
 *
 * REGRA DE COMPOSIÇÃO: no máximo QUATRO trocas de superfície por página.
 * Não dá para o componente verificar isso sozinho — quem monta a página
 * confere. A sequência da home está na seção 3 do docs/direcao-site.md.
 */
import type { ElementType, ReactNode } from "react";
import estilos from "./Section.module.css";

export type Superficie = "preto" | "cinza" | "papel";

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
