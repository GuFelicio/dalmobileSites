/**
 * Leitura e validação dos projetos do portfólio.
 *
 * O que é: lê `conteudo/projetos/*.md`, valida o frontmatter e devolve só os
 * projetos da unidade deste build. É a fonte de `/projetos` e `/projetos/[slug]`.
 *
 * Onde é usado: por lib/projetos-da-unidade.ts, que faz a ligação com o
 * config. Este arquivo é PURO de propósito — não importa "@unidade", que só
 * o Vite sabe resolver —, e por isso a suíte de testes consegue exercitar a
 * validação sem subir um build inteiro.
 *
 * A validação é dura de propósito: um campo faltando quebra o BUILD, com o
 * nome do arquivo e do campo na mensagem. Quem publica projeto não é
 * necessariamente quem programa — o erro tem que dizer o que fazer.
 * Ver docs/adicionar-projeto.md.
 */
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const PASTA = path.join(process.cwd(), "conteudo/projetos");

export type Acabamento = { nome: string; codigo: string };

export type FotoDoProjeto = {
  src: string;
  /** Legenda curta sob a foto: ambiente e acabamento principal. */
  legenda: string;
  /** Texto alternativo descritivo. Não repete a legenda. */
  alt: string;
};

export type Projeto = {
  slug: string;
  titulo: string;
  edificio: string;
  bairro: string;
  ano: number;
  ambientes: string[];
  acabamentos: Acabamento[];
  arquiteto: { nome: string; autorizado: boolean } | null;
  abertura: string;
  fotos: FotoDoProjeto[];
  /** Parágrafo curto: o que o projeto resolveu. Não descreve a foto. */
  texto: string;
  /** Em quais unidades este projeto aparece. */
  unidades: ("sjc" | "caragua")[];
  /** Dados inventados para desenvolvimento. Barra o deploy. */
  exemplo: boolean;
};

function exigir<T>(valor: T | undefined | null, campo: string, arquivo: string): T {
  if (valor === undefined || valor === null || valor === "") {
    throw new Error(
      `conteudo/projetos/${arquivo}: falta o campo obrigatório "${campo}".\n` +
        `Ver docs/adicionar-projeto.md para a lista completa.`,
    );
  }
  return valor;
}

function lerArquivo(arquivo: string): Projeto {
  const bruto = readFileSync(path.join(PASTA, arquivo), "utf8");
  const { data, content } = matter(bruto);
  const slug = path.basename(arquivo, ".md");

  const unidades = exigir(data.unidades, "unidades", arquivo) as Projeto["unidades"];
  if (!Array.isArray(unidades) || unidades.length === 0) {
    throw new Error(
      `conteudo/projetos/${arquivo}: "unidades" precisa listar ao menos uma unidade — ` +
        `[sjc], [caragua] ou [sjc, caragua].`,
    );
  }
  for (const u of unidades) {
    if (u !== "sjc" && u !== "caragua") {
      throw new Error(`conteudo/projetos/${arquivo}: unidade "${u}" não existe.`);
    }
  }

  const fotos = exigir(data.fotos, "fotos", arquivo) as FotoDoProjeto[];
  fotos.forEach((f, i) => {
    exigir(f.src, `fotos[${i}].src`, arquivo);
    exigir(f.legenda, `fotos[${i}].legenda`, arquivo);
    // alt descritivo é exigência de acessibilidade do CLAUDE.md, não enfeite.
    exigir(f.alt, `fotos[${i}].alt`, arquivo);
  });

  const texto = content.trim();
  if (!texto) {
    throw new Error(
      `conteudo/projetos/${arquivo}: falta o parágrafo do corpo — o que o projeto ` +
        `resolveu. Não descreva o que a foto já mostra.`,
    );
  }

  return {
    slug,
    titulo: exigir(data.titulo, "titulo", arquivo),
    edificio: exigir(data.edificio, "edificio", arquivo),
    bairro: exigir(data.bairro, "bairro", arquivo),
    ano: exigir(data.ano, "ano", arquivo),
    ambientes: exigir(data.ambientes, "ambientes", arquivo),
    acabamentos: exigir(data.acabamentos, "acabamentos", arquivo),
    arquiteto: data.arquiteto ?? null,
    abertura: exigir(data.abertura, "abertura", arquivo),
    fotos,
    texto,
    unidades,
    exemplo: data.exemplo === true,
  };
}

/** Todos os projetos, das duas unidades. Só para teste e para a trava de deploy. */
export function todosOsProjetos(): Projeto[] {
  let arquivos: string[];
  try {
    arquivos = readdirSync(PASTA).filter((a) => a.endsWith(".md"));
  } catch (erro) {
    if ((erro as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw erro;
  }
  return arquivos.map(lerArquivo).sort((a, b) => b.ano - a.ano || a.titulo.localeCompare(b.titulo, "pt-BR"));
}

/** Filtra os projetos de uma unidade. Um projeto declara onde aparece. */
export function filtrarPorUnidade(projetos: Projeto[], id: "sjc" | "caragua"): Projeto[] {
  return projetos.filter((p) => p.unidades.includes(id));
}

/** Outros projetos no mesmo edifício. O diferencial trabalhando de novo. */
export function outrosNoEdificio(projetos: Projeto[], projeto: Projeto, limite = 3): Projeto[] {
  return projetos
    .filter((p) => p.edificio === projeto.edificio && p.slug !== projeto.slug)
    .slice(0, limite);
}

/** Os eixos de filtro do índice, já ordenados e sem repetição. */
export function eixosDeFiltro(projetos: Projeto[]) {
  const ambientes = new Set<string>();
  const edificios = new Set<string>();
  for (const p of projetos) {
    p.ambientes.forEach((a) => ambientes.add(a));
    edificios.add(p.edificio);
  }
  const ordenar = (s: Set<string>) => [...s].sort((a, b) => a.localeCompare(b, "pt-BR"));
  return { ambientes: ordenar(ambientes), edificios: ordenar(edificios) };
}
