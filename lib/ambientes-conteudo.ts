/**
 * Leitura e validação das páginas de ambiente.
 *
 * O que é: lê `conteudo/ambientes/*.md`, valida o frontmatter e devolve os
 * ambientes da unidade deste build.
 *
 * Onde é usado: por lib/ambientes-da-unidade.ts, que faz a ligação com o
 * config. Este arquivo é PURO — não importa "@unidade", que só o Vite sabe
 * resolver —, e por isso a suíte consegue exercitá-lo sem subir um build.
 *
 * A validação é dura de propósito: campo faltando quebra o BUILD, com o nome
 * do arquivo e do campo. Quem publica foto não é quem programa.
 * Ver docs/adicionar-ambiente.md.
 */
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import { ambientePorSlug } from "./ambientes.ts";

const PASTA = path.join(process.cwd(), "conteudo/ambientes");

export type UnidadeId = "sjc" | "caragua";

export type FotoDeAmbiente = {
  src: string;
  /** Título de impacto, exibido sob a foto. */
  titulo: string;
  /** Descrição para quem não vê a imagem. Não repete o título. */
  alt: string;
  /**
   * Prédio ou condomínio onde o projeto foi executado.
   * VAZIO até o cliente informar — ver docs/decisoes.md. Quando preencher,
   * aparece como crédito sob a foto.
   */
  edificio: string | null;
  /**
   * Arquiteto responsável. VAZIO até o cliente informar E autorizar por
   * escrito: o CLAUDE.md exige autorização para publicar nome de terceiro.
   */
  arquiteto: string | null;
  /** De qual unidade veio a foto, deduzido da pasta. */
  unidade: UnidadeId;
};

export type PaginaDeAmbiente = {
  nome: string;
  slug: string;
  /** Concordância, vinda de lib/ambientes.ts. */
  artigo: "um" | "uma";
  planejado: "planejado" | "planejada" | "planejados" | "planejadas";
  singular: string;
  /** Uma linha, sob o título. */
  chamada: string;
  /** O parágrafo do corpo. */
  texto: string;
  unidades: UnidadeId[];
  fotos: FotoDeAmbiente[];
};

function exigir<T>(valor: T | undefined | null, campo: string, arquivo: string): T {
  if (valor === undefined || valor === null || valor === "") {
    throw new Error(
      `conteudo/ambientes/${arquivo}: falta o campo obrigatório "${campo}".\n` +
        `Ver docs/adicionar-ambiente.md para a lista completa.`,
    );
  }
  return valor;
}

function lerArquivo(arquivo: string): PaginaDeAmbiente {
  const { data, content } = matter(readFileSync(path.join(PASTA, arquivo), "utf8"));
  const slug = path.basename(arquivo, ".md");

  const ambiente = ambientePorSlug(slug);
  if (!ambiente) {
    throw new Error(
      `conteudo/ambientes/${arquivo}: o ambiente "${slug}" não está em lib/ambientes.ts.\n` +
        `Ou corrija o nome do arquivo, ou acrescente o ambiente à lista.`,
    );
  }

  const unidades = exigir(data.unidades, "unidades", arquivo) as UnidadeId[];
  const fotosBrutas = exigir(data.fotos, "fotos", arquivo) as FotoDeAmbiente[];

  const fotos = fotosBrutas.map((f, i) => {
    exigir(f.src, `fotos[${i}].src`, arquivo);
    exigir(f.titulo, `fotos[${i}].titulo`, arquivo);
    exigir(f.alt, `fotos[${i}].alt`, arquivo);

    if (f.alt.trim().toLowerCase() === f.titulo.trim().toLowerCase()) {
      throw new Error(
        `conteudo/ambientes/${arquivo}: em ${f.src}, o alt repete o título.\n` +
          `O título é a chamada; o alt descreve a imagem para quem não a vê.`,
      );
    }

    // A PASTA É DADO: /fotos/<unidade>/<ambiente>/arquivo.webp.
    const partes = f.src.split("/").filter(Boolean);
    const raiz = partes[1] as UnidadeId;
    const pastaAmbiente = partes[2];

    if (raiz !== "sjc" && raiz !== "caragua") {
      throw new Error(
        `conteudo/ambientes/${arquivo}: ${f.src} está em public/fotos/${raiz}/, que não é ` +
          `uma unidade. As fotos de ambiente vivem em sjc/ ou caragua/.`,
      );
    }
    if (pastaAmbiente !== slug) {
      throw new Error(
        `conteudo/ambientes/${arquivo}: ${f.src} está na pasta "${pastaAmbiente}", ` +
          `mas foi listada no ambiente "${slug}". Mova o arquivo ou mude de arquivo de conteúdo.`,
      );
    }
    if (!unidades.includes(raiz)) {
      throw new Error(
        `conteudo/ambientes/${arquivo}: ${f.src} é de "${raiz}", que não está em ` +
          `unidades: [${unidades.join(", ")}].`,
      );
    }

    return {
      src: f.src,
      titulo: f.titulo,
      alt: f.alt,
      edificio: f.edificio ?? null,
      arquiteto: f.arquiteto ?? null,
      unidade: raiz,
    };
  });

  return {
    nome: exigir(data.nome, "nome", arquivo),
    slug,
    artigo: ambiente.artigo,
    planejado: ambiente.planejado,
    singular: ambiente.singular,
    chamada: exigir(data.chamada, "chamada", arquivo),
    texto: exigir(content.trim() || null, "texto do corpo", arquivo),
    unidades,
    fotos,
  };
}

/** Todos os ambientes, das duas unidades. Para teste e trava de deploy. */
export function todosOsAmbientes(): PaginaDeAmbiente[] {
  let arquivos: string[];
  try {
    arquivos = readdirSync(PASTA).filter((a) => a.endsWith(".md"));
  } catch (erro) {
    if ((erro as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw erro;
  }
  return arquivos.map(lerArquivo);
}

/**
 * Os ambientes de uma unidade, com SÓ as fotos daquela unidade.
 *
 * O filtro é em dois níveis de propósito: um ambiente pode existir nos dois
 * sites, mas cada site mostra só as suas fotos. É o que impede a cozinha de
 * Caraguá de aparecer no site de SJC.
 */
export function ambientesDe(id: UnidadeId): PaginaDeAmbiente[] {
  return todosOsAmbientes()
    .filter((a) => a.unidades.includes(id))
    .map((a) => ({ ...a, fotos: a.fotos.filter((f) => f.unidade === id) }))
    .filter((a) => a.fotos.length > 0);
}
