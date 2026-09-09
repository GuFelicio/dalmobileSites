/**
 * Leitura das páginas institucionais.
 *
 * O que é: lê `conteudo/institucional/*.md` — hoje `a-dalmobile` e
 * `arquitetos`. Núcleo puro, sem "@unidade", para a suíte exercitá-lo.
 *
 * Onde é usado: app/a-dalmobile/page.tsx, app/arquitetos/page.tsx e a trava
 * de deploy em config/verificar-pendencias.mjs.
 *
 * POR QUE TEM `confirmado`: estes textos foram escritos SEM entrevista com a
 * loja, a partir só do que o CLAUDE.md afirma. São rascunho. O documento é
 * explícito: nenhum número vai ao ar sem confirmação — anos de fábrica,
 * garantia, prazo, quantidade de projetos. Enquanto `confirmado` for false, a
 * trava de deploy recusa publicar.
 */
import { readFileSync } from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import { camposPendentes, ehPendente } from "../config/pendente.ts";

export { ehPendente };

const PASTA = path.join(process.cwd(), "conteudo/institucional");

export type EtapaDoProcesso = { etapa: string; texto: string; prazo?: string };
export type NumeroDaFaixa = { valor: string; rotulo: string };
export type PerguntaFrequente = { pergunta: string; resposta: string };
export type BlocoDeParceria = { titulo: string; texto: string; prazo?: string };
export type ArquitetoParceiro = {
  nome: string;
  projetos?: { titulo: string; slug: string }[];
};

/** O frontmatter de /a-dalmobile. */
export type DadosDalmobile = {
  abertura: string;
  fabrica: { titulo: string; texto: string; foto?: string };
  processo: EtapaDoProcesso[];
  materiais: { titulo: string; texto: string };
  garantia: { anos?: string; certificado?: string; texto: string };
  numeros: NumeroDaFaixa[];
  faq: PerguntaFrequente[];
};

/** O frontmatter de /arquitetos. */
export type DadosArquitetos = {
  abertura: string;
  parceria: BlocoDeParceria[];
  parceiros: ArquitetoParceiro[];
  formulario: boolean;
};

export type PaginaInstitucional<D = Record<string, unknown>> = {
  slug: string;
  titulo: string;
  chamada: string;
  /** Falso enquanto a loja não revisou. Trava o deploy. */
  confirmado: boolean;
  /** Caminhos dos campos ainda com o sentinela PENDENTE. */
  pendentes: string[];
  /** O frontmatter tipado. Cada página tem uma forma diferente. */
  dados: D;
  /** O corpo, depois do segundo `---`. */
  texto: string;
};

export function lerInstitucional<D = Record<string, unknown>>(slug: string): PaginaInstitucional<D> {
  const { data, content } = matter(
    readFileSync(path.join(PASTA, `${slug}.md`), "utf8"),
  );
  return {
    slug,
    titulo: String(data.titulo ?? ""),
    chamada: String(data.chamada ?? ""),
    confirmado: data.confirmado === true,
    pendentes: camposPendentes(data),
    dados: data as D,
    texto: content.trim(),
  };
}

export const SLUGS_INSTITUCIONAIS = ["a-dalmobile", "arquitetos"] as const;

export function todasInstitucionais(): PaginaInstitucional[] {
  return SLUGS_INSTITUCIONAIS.map(lerInstitucional);
}
