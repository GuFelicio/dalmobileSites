/**
 * Config da unidade de Caraguatatuba.
 *
 * O que é: todos os dados e a composição do site que vai para
 * dalmobilecaraguatatuba.com.br. Selecionado no build por `UNIDADE=caragua`.
 *
 * Onde é usado: nunca importado direto. Os componentes importam `@unidade`,
 * que o Vite resolve para este arquivo ou para o de SJC. É isso que garante
 * que o texto desta unidade não entre no bundle da outra.
 *
 * ESTADO: os dados da loja ainda não chegaram. Os campos marcados com
 * PENDENTE quebram a suíte de testes de propósito — ver config/pendente.ts.
 * Preencher aqui é a única coisa que falta para o segundo site existir.
 *
 * NUNCA escrever o nome da cidade da outra unidade aqui — nem em comentário:
 * o bundle do servidor preserva comentários, e o teste vasculha o bundle.
 * Ver tests/unidade-cruzada.test.mjs.
 */
import { PENDENTE } from "./pendente.ts";
import type { Unidade } from "./tipos.ts";

export const unidade: Unidade = {
  id: "caragua",
  nome: "Caraguatatuba",
  cidade: "Caraguatatuba",
  estado: "SP",
  dominio: "https://dalmobilecaraguatatuba.com.br",

  endereco: {
    logradouro: "Av. Espírito Santo, 58",
    bairro: "Jardim Primavera",
    cep: "11660-660",
  },

  // Os dois arquivos de marca já existem em public/assets/. As dimensões são
  // as mesmas do lockup de SJC: mesmo desenho, cidade diferente.
  marca: {
    escura: "/assets/marca-caragua-preto.png",
    clara: "/assets/marca-caragua-branco.png",
    largura: 600,
    altura: 177,
  },

  // É um celular, não um fixo. Ainda não confirmado se é o mesmo número do
  // WhatsApp — enquanto não for, o campo whatsapp abaixo segue null.
  telefone: "(12) 98270-3186",

  // PENDENTE: só dígitos, com código do país — ex.: "5512900000000".
  // Enquanto for null, a ação aparece DESABILITADA, nunca como link morto.
  whatsapp: null,

  // PENDENTE: horários exatamente como no Google Business Profile desta loja.
  // Não copiar os de SJC: loja de litoral costuma ter sábado diferente.
  horarios: [
    { dias: "Segunda a sexta", abre: PENDENTE, fecha: PENDENTE, confirmado: false },
    { dias: "Sábado", abre: PENDENTE, fecha: PENDENTE, confirmado: false },
  ],

  // PENDENTE: as duas URLs saem da ficha do Google Business desta unidade.
  mapa: {
    embed: PENDENTE,
    link: PENDENTE,
  },
  googleBusiness: PENDENTE,

  // PENDENTE: medição própria desta unidade. Reaproveitar a de SJC
  // contaminaria os dois relatórios.
  analytics: {
    ga: null,
    pixel: null,
  },

  // O rótulo NÃO cita a cidade da outra unidade — só a URL a contém, e isso é
  // inevitável, porque a cidade está no domínio. Ver docs/decisoes.md.
  outraUnidade: {
    nome: "Nossa outra loja",
    url: "https://dalmobilesjc.com.br",
  },

  // PENDENTE de curadoria: a direção diz que o conjunto de ambientes de
  // Caraguá sai do acervo do litoral, e pode não ser o mesmo de SJC. Este
  // menu é o de SJC até a curadoria definir.
  navegacao: [
    { rotulo: "Projetos", href: "/projetos" },
    { rotulo: "Ambientes", href: "/ambientes" },
    { rotulo: "A Dalmóbile", href: "/a-dalmobile" },
    { rotulo: "Arquitetos", href: "/arquitetos" },
    { rotulo: "A loja", href: "/a-loja" },
  ],
};
