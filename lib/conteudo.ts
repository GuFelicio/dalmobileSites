/**
 * O conteúdo do site, já empacotado.
 *
 * O que é: a única porta de conteúdo que as PÁGINAS podem usar. Importa
 * `conteudo/gerado.json`, produzido por `build/gerar-imagens.mjs`… não: por
 * `build/gerar-conteudo.mjs`, antes de cada build.
 *
 * Onde é usado: por lib/ambientes-da-unidade.ts, lib/institucional-runtime.ts
 * e pelas páginas institucionais.
 *
 * NUNCA importe lib/ambientes-conteudo.ts, lib/institucional.ts ou
 * lib/projetos.ts de dentro de app/. Esses três leem o disco com
 * `readFileSync`, e **o runtime do Cloudflare Worker não tem sistema de
 * arquivos**: funciona no `npm run dev` e quebra no deploy, com
 * "no such file or directory, readAll '/bundle/conteudo/...'".
 * Eles existem para o passo de build e para a suíte de testes.
 * Ver docs/decisoes.md.
 */
import gerado from "../conteudo/gerado.json" with { type: "json" };

import type { PaginaDeAmbiente, UnidadeId } from "./ambientes-conteudo.ts";
import { AMBIENTES } from "./ambientes.ts";
import type { DadosArquitetos, DadosDalmobile, PaginaInstitucional } from "./institucional.ts";
import type { Projeto } from "./projetos.ts";

type Conteudo = {
  ambientes: PaginaDeAmbiente[];
  institucional: {
    "a-dalmobile": PaginaInstitucional<DadosDalmobile>;
    arquitetos: PaginaInstitucional<DadosArquitetos>;
  };
  projetos: Projeto[];
};

const conteudo = gerado as unknown as Conteudo;

export const AMBIENTES_PUBLICADOS = conteudo.ambientes;
export const PROJETOS_PUBLICADOS = conteudo.projetos;

export function institucional<K extends keyof Conteudo["institucional"]>(
  slug: K,
): Conteudo["institucional"][K] {
  return conteudo.institucional[slug];
}

/**
 * Os ambientes de uma unidade, com SÓ as fotos daquela unidade, na ordem
 * editorial de lib/ambientes.ts. Mesma regra de lib/ambientes-conteudo.ts —
 * aqui aplicada sobre o conteúdo já empacotado.
 */
export function ambientesDe(id: UnidadeId): PaginaDeAmbiente[] {
  const ordem = AMBIENTES.map((a) => a.slug);
  return AMBIENTES_PUBLICADOS.filter((a) => a.unidades.includes(id))
    .map((a) => ({ ...a, fotos: a.fotos.filter((f) => f.unidade === id) }))
    .filter((a) => a.fotos.length > 0)
    .sort((a, b) => ordem.indexOf(a.slug) - ordem.indexOf(b.slug));
}

/** Escolhe uma foto por ordem de preferência, caindo para o que existir. */
export function escolherFoto(
  ambientes: PaginaDeAmbiente[],
  preferencia: string[],
  indice = 0,
) {
  for (const slug of preferencia) {
    const ambiente = ambientes.find((a) => a.slug === slug);
    const foto = ambiente?.fotos[indice] ?? ambiente?.fotos[0];
    if (foto) return foto;
  }
  return ambientes[0]?.fotos[indice] ?? ambientes[0]?.fotos[0];
}
