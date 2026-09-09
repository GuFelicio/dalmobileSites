/**
 * Config da unidade de São José dos Campos.
 *
 * O que é: todos os dados e a composição do site que vai para
 * dalmobilesjc.com.br. Selecionado no build por `UNIDADE=sjc`.
 *
 * Onde é usado: nunca importado direto. Os componentes importam `@unidade`,
 * que o Vite resolve para este arquivo ou para o de Caraguá. É isso que
 * garante que o texto desta unidade não entre no bundle da outra.
 *
 * NUNCA escrever o nome da cidade da outra unidade aqui — nem em comentário:
 * o bundle do servidor preserva comentários, e o teste vasculha o bundle.
 * Ver tests/unidade-cruzada.test.mjs.
 */
import { PENDENTE } from "./pendente.ts";
import type { Unidade } from "./tipos.ts";

export const unidade: Unidade = {
  id: "sjc",
  nome: "São José dos Campos",
  cidade: "São José dos Campos",
  estado: "SP",
  dominio: "https://dalmobilesjc.com.br",

  endereco: {
    logradouro: "Av. Barão do Rio Branco, 736",
    bairro: "Jardim Esplanada",
    cep: "12242-800",
  },

  marca: {
    escura: "/assets/marca-sjc-preto.png",
    clara: "/assets/marca-sjc-branco.png",
    largura: 600,
    altura: 177,
  },

  telefone: "(12) 3341-8777",

  // ATENÇÃO: é o MESMO número do WhatsApp de Caraguá. Confirmado pelo cliente
  // em 08/09/2026. Ver a nota em docs/unidades.md sobre a origem do lead.
  whatsapp: "5512996049888",

  horarios: [
    { dias: "Segunda a sexta", abre: "09h00", fecha: "19h00", confirmado: true },
    { dias: "Sábado", abre: "08h00", fecha: "14h00", confirmado: true },
  ],

  // PENDENTE: o embed do iframe sai do próprio Google Maps, em
  // "Compartilhar > Incorporar um mapa". O link de share.google abaixo não
  // serve: ele só resolve com JavaScript.
  mapa: {
    embed: PENDENTE,
    link: PENDENTE,
  },

  googleBusiness: "https://share.google/YlOCrgmB7IEKe4bPc",

  // PENDENTE: cada unidade tem a sua medição. Melhor sem medição do que com o
  // identificador da outra loja, que contamina os dois relatórios.
  analytics: {
    ga: null,
    pixel: null,
  },

  // O rótulo NÃO cita a cidade da outra unidade — só a URL a contém, e isso é
  // inevitável, porque a cidade está no domínio. Ver docs/decisoes.md.
  outraUnidade: {
    nome: "Ver a outra loja",
    url: "https://dalmobilecaraguatatuba.com.br",
  },

  // Cinco itens, conforme o mapa de rotas do CLAUDE.md.
  navegacao: [
    // "Projetos" sai do menu enquanto não houver case publicado: falta a
    // informação de prédio e de arquiteto. A rota e a camada continuam no
    // código, prontas. Ver docs/decisoes.md.
    { rotulo: "Ambientes", href: "/ambientes" },
    { rotulo: "A Dalmóbile", href: "/a-dalmobile" },
    { rotulo: "Arquitetos", href: "/arquitetos" },
    { rotulo: "A loja", href: "/a-loja" },
  ],
};
