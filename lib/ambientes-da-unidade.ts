/**
 * Os ambientes da unidade deste build.
 *
 * O que é: a ligação entre o núcleo puro de lib/ambientes-conteudo.ts e o
 * config. As páginas chamam SEMPRE daqui, nunca `todosOsAmbientes()` direto —
 * é o que impede a foto de uma unidade de aparecer no site da outra.
 */
import { unidade } from "../config/derivados.ts";
import { ambientesDe, escolherFoto, type PaginaDeAmbiente } from "./ambientes-conteudo.ts";

export { escolherFoto };

export function ambientesDaUnidade(): PaginaDeAmbiente[] {
  return ambientesDe(unidade.id);
}

export function ambientePorSlugDaUnidade(slug: string): PaginaDeAmbiente | undefined {
  return ambientesDaUnidade().find((a) => a.slug === slug);
}
