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

  // PENDENTE: a loja está trocando de CRM e ainda não tem número de WhatsApp.
  // Enquanto for null, a ação aparece DESABILITADA, com "em breve" — o
  // CLAUDE.md proíbe CTA sem destino real, então não vira link. Assim que o
  // número existir, basta preencher aqui: o "em breve" some e o link nasce.
  whatsapp: null,

  // PENDENTE: o sábado veio como "acho que até as 14h" — não confirmado.
  // Antes da Fase 8 os dois horários têm que bater EXATAMENTE com o Google
  // Business Profile, porque alimentam o schema LocalBusiness, e endereço,
  // telefone e horário divergentes derrubam a busca local.
  horarios: [
    { dias: "Segunda a sexta", abre: "09h00", fecha: "19h00" },
    { dias: "Sábado", abre: "09h00", fecha: "14h00", confirmado: false },
  ],

  // PENDENTE: as duas URLs saem da ficha do Google Business, não de endereço
  // digitado à mão. A página /a-loja é a que sustenta a busca local.
  mapa: {
    embed: PENDENTE,
    link: PENDENTE,
  },
  googleBusiness: PENDENTE,

  // PENDENTE: cada unidade tem a sua medição. Melhor sem medição do que com o
  // identificador da outra loja, que contamina os dois relatórios.
  analytics: {
    ga: null,
    pixel: null,
  },

  // O rótulo NÃO cita a cidade da outra unidade — só a URL a contém, e isso é
  // inevitável, porque a cidade está no domínio. Ver docs/decisoes.md.
  outraUnidade: {
    nome: "Nossa outra loja",
    url: "https://dalmobilecaraguatatuba.com.br",
  },

  // Cinco itens, conforme o mapa de rotas do CLAUDE.md.
  navegacao: [
    { rotulo: "Projetos", href: "/projetos" },
    { rotulo: "Ambientes", href: "/ambientes" },
    { rotulo: "A Dalmóbile", href: "/a-dalmobile" },
    { rotulo: "Arquitetos", href: "/arquitetos" },
    { rotulo: "A loja", href: "/a-loja" },
  ],
};
