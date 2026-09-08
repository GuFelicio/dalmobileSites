/**
 * Os projetos da unidade deste build.
 *
 * O que é: a ligação entre o núcleo puro de `lib/projetos.ts` e o config da
 * unidade. Existe separado porque o núcleo não pode importar "@unidade" — só o
 * Vite resolve esse alias, e a suíte de testes roda em node puro.
 *
 * Onde é usado: app/projetos/page.tsx e app/projetos/[slug]/page.tsx.
 *
 * As páginas chamam SEMPRE daqui, nunca `todosOsProjetos()` direto. É o que
 * impede um projeto de uma unidade de aparecer no site da outra.
 */
import { unidade } from "../config/derivados.ts";
import {
  filtrarPorUnidade,
  outrosNoEdificio as outrosNoEdificioBase,
  todosOsProjetos,
  type Projeto,
} from "./projetos.ts";

export function projetosDaUnidade(): Projeto[] {
  return filtrarPorUnidade(todosOsProjetos(), unidade.id);
}

export function projetoPorSlug(slug: string): Projeto | undefined {
  return projetosDaUnidade().find((p) => p.slug === slug);
}

export function outrosNoEdificio(projeto: Projeto, limite = 3): Projeto[] {
  return outrosNoEdificioBase(projetosDaUnidade(), projeto, limite);
}
