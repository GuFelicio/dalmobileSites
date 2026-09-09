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

import { NOMES_DE_AMBIENTE, ambientePorNome } from "./ambientes.ts";

const PASTA = path.join(process.cwd(), "conteudo/projetos");

export type Acabamento = { nome: string; codigo: string };

export type FotoDoProjeto = {
  src: string;
  /** Qual ambiente esta foto mostra. Alimenta a galeria de /ambientes/[slug]. */
  ambiente: string;
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

  const ambientes = exigir(data.ambientes, "ambientes", arquivo) as string[];
  // Lista fechada: em trinta projetos, "Cozinha" e "cozinha" viram dois
  // filtros para a mesma coisa. Ver lib/ambientes.ts.
  for (const a of ambientes) {
    if (!NOMES_DE_AMBIENTE.includes(a)) {
      throw new Error(
        `conteudo/projetos/${arquivo}: o ambiente "${a}" não existe.\n` +
          `Os ambientes são: ${NOMES_DE_AMBIENTE.join(", ")}.\n` +
          `Para criar um novo, ver docs/adicionar-ambiente.md.`,
      );
    }
  }

  const fotos = exigir(data.fotos, "fotos", arquivo) as FotoDoProjeto[];
  fotos.forEach((f, i) => {
    exigir(f.src, `fotos[${i}].src`, arquivo);
    exigir(f.legenda, `fotos[${i}].legenda`, arquivo);
    // alt descritivo é exigência de acessibilidade do CLAUDE.md, não enfeite.
    exigir(f.alt, `fotos[${i}].alt`, arquivo);
    exigir(f.ambiente, `fotos[${i}].ambiente`, arquivo);

    if (!ambientes.includes(f.ambiente)) {
      throw new Error(
        `conteudo/projetos/${arquivo}: a foto ${f.src} diz ser de "${f.ambiente}", ` +
          `que não está na lista "ambientes" do projeto (${ambientes.join(", ")}).\n` +
          `Ou corrija a foto, ou acrescente o ambiente ao projeto.`,
      );
    }

    // A PASTA TAMBÉM É DADO. public/fotos/<raiz>/<ambiente>/arquivo.webp:
    // a raiz diz em que site o projeto aparece, e a pasta seguinte o ambiente.
    // Conferir os dois contra o frontmatter é o que impede foto arquivada no
    // lugar errado de virar galeria errada — e é barato, porque o caminho já
    // está aqui. Ver public/fotos/LEIA-ME.md.
    const partes = f.src.split("/").filter(Boolean); // ["fotos", raiz, ambiente, arquivo]
    const raiz = partes[1];
    const pastaAmbiente = partes[2];

    const esperada =
      unidades.length === 2 ? "comum" : unidades[0];
    if (raiz !== esperada) {
      throw new Error(
        `conteudo/projetos/${arquivo}: a foto está em public/fotos/${raiz}/, mas o ` +
          `projeto declara unidades: [${unidades.join(", ")}].\n` +
          `Ela deveria estar em public/fotos/${esperada}/. ` +
          `Ver public/fotos/LEIA-ME.md.`,
      );
    }

    const slugEsperado = ambientePorNome(f.ambiente)?.slug;
    if (pastaAmbiente !== slugEsperado) {
      throw new Error(
        `conteudo/projetos/${arquivo}: a foto está na pasta "${pastaAmbiente}", mas ` +
          `diz ser de "${f.ambiente}" (pasta ${slugEsperado}).\n` +
          `Mova o arquivo, ou corrija o campo "ambiente".`,
      );
    }
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
    ambientes,
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

