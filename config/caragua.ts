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
import type { Unidade } from "./tipos.ts";

export const unidade: Unidade = {
  id: "caragua",
  nome: "Caraguatatuba",
  cidade: "Caraguatatuba",
  regiao: "litoral norte",
  estado: "SP",
  dominio: "https://dalmobilecaraguatatuba.com.br",
  // Areia no lugar do cinza: o site do litoral. Ver app/tokens.css.
  paleta: "palha",

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

  // O número DESTA loja (copy v3, 02/10/2026). Até então o site de Caraguá
  // mostrava o número da outra unidade em todo lugar — topo, menu, rodapé,
  // loja, privacidade e o link do WhatsApp. Telefone e WhatsApp são o mesmo.
  telefone: "(12) 99602-1234",
  whatsapp: "5512996021234",

  horarios: [
    { dias: "Segunda a sexta", abre: "09h00", fecha: "18h00", confirmado: true },
    { dias: "Sábado", abre: "09h00", fecha: "14h00", confirmado: true },
  ],

  // Vêm da ficha do Google Business desta loja, não de endereço digitado
  // à mão: é a ficha que o Google reconhece e que alimenta a busca local.
  // O `link` usa o CID da própria ficha, extraído do embed.
  mapa: {
    embed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7948.553951724388!2d-45.42037385719336!3d-23.626454861256708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cd6318a8e6cb1f%3A0x856a2f54f9f7f902!2sDalm%C3%B3bile%20Caraguatatuba%2C%20M%C3%B3veis%20Planejados%2C%20Arm%C3%A1rios%20Planejados%2C!5e1!3m2!1spt-BR!2sbr!4v1788959063496!5m2!1spt-BR!2sbr",
    link: "https://maps.google.com/?cid=9613548396593281282",
  },

  // Endereço, telefone e horário têm que bater EXATAMENTE com o Google
  // Business — divergência derruba a busca local. Conferir a ficha depois da
  // troca de número da copy v3.
  googleBusiness: "https://share.google/w7Pq6YmLPUP1T8imm",

  // PENDENTE: medição própria desta unidade. Reaproveitar a de SJC
  // contaminaria os dois relatórios.
  analytics: {
    ga: null,
    pixel: null,
  },

  // O rótulo NÃO cita a cidade da outra unidade — só a URL a contém, e isso é
  // inevitável, porque a cidade está no domínio. Ver docs/decisoes.md.
  outraUnidade: {
    nome: "Ver a loja de São José dos Campos",
    cidade: "São José dos Campos",
    regiao: "Vale do Paraíba",
    url: "https://dalmobilesjc.com.br",
  },

  textos: {
    // Copy v4 (docs/copy-v4.md, home): a mesma frase nos dois sites, com a cidade.
    descricaoHome:
      "Móveis personalizados para espaços com identidade. Fábrica própria em Bento Gonçalves desde 1977 e loja em Caraguatatuba. Veja projetos executados.",
  },

  // v5 (06/10/2026): o site é uma página só, e o menu rola até as seções da
  // home. Sempre "/#id", com a barra, para funcionar também a partir de
  // /privacidade. "Ambientes" virou "Projetos" (docs/copy-home-v5.md).
  navegacao: [
    { rotulo: "Projetos", href: "/#projetos" },
    { rotulo: "A Dalmóbile", href: "/#a-dalmobile" },
    { rotulo: "Para arquitetos", href: "/#arquitetos" },
    { rotulo: "A loja", href: "/#a-loja" },
  ],
};
