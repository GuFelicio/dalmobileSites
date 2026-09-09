/**
 * Os ambientes do site — a lista canônica.
 *
 * O que é: o conjunto fechado de ambientes que uma foto pode declarar, e a
 * ponte entre o nome exibido ("Sala de estar") e o slug de pasta e de URL
 * ("sala-de-estar").
 *
 * Onde é usado: pela validação de conteúdo, pelas pastas de public/fotos/ e
 * pelas rotas /ambientes e /ambientes/[slug].
 *
 * POR QUE É FECHADA: as páginas de ambiente agrupam por este nome. Com fotos
 * carregadas por pessoas diferentes ao longo de meses, "Quarto", "quartos" e
 * "Dormitório" viram três páginas para a mesma coisa, e ninguém percebe até o
 * cliente perguntar. Nome fora da lista quebra o build.
 *
 * DE ONDE VEIO ESTA LISTA: do acervo real, e não dos "oito dos catálogos" da
 * seção 3.3 do docs/direcao-site.md. As duas não batem, e a diferença importa:
 * o catálogo separa cozinha compacta de gourmet, e o acervo não faz essa
 * distinção; o catálogo não tem "Quartos", que é o ambiente MAIS fotografado
 * do acervo, com doze fotos. Registrado em docs/decisoes.md.
 *
 * Para acrescentar um: entra aqui, cria a pasta nas três raízes de
 * public/fotos/ e se documenta em docs/adicionar-ambiente.md.
 */

export type Ambiente = {
  /** Como aparece no site. */
  nome: string;
  /** Pasta em public/fotos/<unidade>/ e rota /ambientes/<slug>. */
  slug: string;
  /**
   * Concordância, para o texto gerado sair em português correto.
   * Sem isto sai "Cozinha planejado" no <title> e "Quer um cozinha assim"
   * na chamada — e são justamente as frases que o Google e o cliente leem.
   */
  artigo: "um" | "uma";
  planejado: "planejado" | "planejada" | "planejados" | "planejadas";
  /**
   * O nome no singular, para a chamada final ("Quer um quarto assim?").
   * "Quartos" é o único plural da lista, mas a chamada fala de um ambiente só.
   */
  singular: string;
};

export const AMBIENTES: Ambiente[] = [
  { nome: "Cozinha", slug: "cozinha", singular: "cozinha", artigo: "uma", planejado: "planejada" },
  { nome: "Quartos", slug: "quartos", singular: "quarto", artigo: "um", planejado: "planejados" },
  { nome: "Sala de estar", slug: "sala-de-estar", singular: "sala de estar", artigo: "uma", planejado: "planejada" },
  { nome: "Home office", slug: "home-office", singular: "home office", artigo: "um", planejado: "planejado" },
  { nome: "Closet", slug: "closet", singular: "closet", artigo: "um", planejado: "planejado" },
  { nome: "Banheiro", slug: "banheiro", singular: "banheiro", artigo: "um", planejado: "planejado" },
  { nome: "Espaço gourmet", slug: "espaco-gourmet", singular: "espaço gourmet", artigo: "um", planejado: "planejado" },
];

export const NOMES_DE_AMBIENTE = AMBIENTES.map((a) => a.nome);

export function ambientePorNome(nome: string): Ambiente | undefined {
  return AMBIENTES.find((a) => a.nome === nome);
}

export function ambientePorSlug(slug: string): Ambiente | undefined {
  return AMBIENTES.find((a) => a.slug === slug);
}
