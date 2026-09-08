/**
 * Os ambientes do site — a lista canônica.
 *
 * O que é: o conjunto fechado de ambientes que um projeto pode declarar, e a
 * ponte entre o nome exibido ("Cozinha compacta") e o slug de pasta e de URL
 * ("cozinha-compacta").
 *
 * Onde é usado: pela validação de conteúdo em lib/projetos.ts, pelas pastas de
 * public/fotos/ e, na Fase 5, pelas rotas /ambientes e /ambientes/[slug].
 *
 * POR QUE É FECHADA: o filtro do índice agrupa por texto. Em trinta projetos
 * carregados por pessoas diferentes, "Cozinha", "cozinha" e "Cozinha compacta"
 * viram três filtros distintos para a mesma coisa, e ninguém percebe até o
 * cliente perguntar por que tem duas cozinhas no menu. Ambiente fora da lista
 * quebra o build.
 *
 * Os oito vêm dos catálogos, e estão na seção 3.3 do docs/direcao-site.md.
 * Para acrescentar um: entra aqui, cria a pasta nas três raízes de
 * public/fotos/ e se documenta em docs/adicionar-ambiente.md.
 */

export type Ambiente = {
  /** Como aparece no site. */
  nome: string;
  /** Pasta em public/fotos/<unidade>/ e rota /ambientes/<slug>. */
  slug: string;
};

export const AMBIENTES: Ambiente[] = [
  { nome: "Cozinha compacta", slug: "cozinha-compacta" },
  { nome: "Cozinha gourmet", slug: "cozinha-gourmet" },
  { nome: "Closet", slug: "closet" },
  { nome: "Casa integrada", slug: "casa-integrada" },
  { nome: "Sala de estar", slug: "sala-de-estar" },
  { nome: "Home office", slug: "home-office" },
  { nome: "Lavanderia", slug: "lavanderia" },
  { nome: "Banheiro", slug: "banheiro" },
];

export const NOMES_DE_AMBIENTE = AMBIENTES.map((a) => a.nome);

export function ambientePorNome(nome: string): Ambiente | undefined {
  return AMBIENTES.find((a) => a.nome === nome);
}

export function ambientePorSlug(slug: string): Ambiente | undefined {
  return AMBIENTES.find((a) => a.slug === slug);
}
