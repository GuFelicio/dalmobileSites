/**
 * Funções puras de filtro do índice de projetos.
 *
 * Ficam separadas de lib/projetos.ts porque aquele arquivo lê o disco, e
 * **o runtime do Cloudflare Worker não tem sistema de arquivos**: uma página
 * que o importe quebra no deploy, mesmo sem chamar a leitura. Ver lib/conteudo.ts.
 */
import type { Projeto } from "./projetos.ts";

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
