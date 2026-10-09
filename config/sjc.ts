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
import type { Unidade } from "./tipos.ts";

export const unidade: Unidade = {
  id: "sjc",
  nome: "São José dos Campos",
  cidade: "São José dos Campos",
  regiao: "Vale do Paraíba",
  estado: "SP",
  dominio: "https://dalmobilesjc.com.br",
  paleta: "neutra",

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

  // Telefone e WhatsApp são o mesmo número, e é desta loja só: cada unidade
  // tem o seu desde a copy v3 (02/10/2026). O fixo (12) 3341-8777, antigo,
  // saiu do site em 14/09/2026.
  telefone: "(12) 99604-9888",
  whatsapp: "5512996049888",

  horarios: [
    { dias: "Segunda a sexta", abre: "09h00", fecha: "19h00", confirmado: true },
    { dias: "Sábado", abre: "08h00", fecha: "14h00", confirmado: true },
  ],

  // Vêm da ficha do Google Business desta loja, não de endereço digitado
  // à mão: é a ficha que o Google reconhece e que alimenta a busca local.
  // O `link` usa o CID da própria ficha, extraído do embed.
  mapa: {
    embed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.164260255828!2d-45.90758552424654!3d-23.198064448346774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cc35f585cbb2b5%3A0xd1f3dbb975a0b84b!2sDalm%C3%B3bile%20S%C3%A3o%20Jos%C3%A9%20dos%20Campos%20%7C%20M%C3%B3veis%20Planejados%20%7C%20Arm%C3%A1rios%20Planejados%20%7C%20Cozinha%20Planejada!5e1!3m2!1spt-BR!2sbr!4v1788961246677!5m2!1spt-BR!2sbr",
    link: "https://maps.google.com/?cid=15128677162856527947",
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
    nome: "Ver a loja de Caraguatatuba",
    cidade: "Caraguatatuba",
    regiao: "litoral norte",
    url: "https://dalmobilecaraguatatuba.com.br",
  },

  textos: {
    // Copy v4 (docs/copy-v4.md, home): a mesma frase nos dois sites, com a cidade.
    descricaoHome:
      "Móveis personalizados para espaços com identidade. Fábrica própria em Bento Gonçalves desde 1977 e loja em São José dos Campos. Veja projetos executados.",
  },

  // v5 (06/10/2026): o site é uma página só, e o menu rola até as seções da
  // home. Sempre "/#id", com a barra, para funcionar também a partir de
  // /privacidade. "Ambientes" virou "Projetos" (docs/copy-home-v5.md).
  navegacao: [
    { rotulo: "Projetos", href: "/#projetos" },
    { rotulo: "A Dalmóbile", href: "/#a-dalmobile" },
    // "Para parceiros" desde 09/10/2026 (pedido do cliente); a âncora segue #arquitetos.
    { rotulo: "Para parceiros", href: "/#arquitetos" },
    { rotulo: "A loja", href: "/#a-loja" },
  ],

  // O preview do link no WhatsApp (og:image), da home e de /privacidade.
  compartilhamento: "/fotos/sjc/acervo/manifesto-rafael-pires.webp",

  // O acervo de fotos de SJC (v6, 07/10/2026): 40 fotos de projetos assinados,
  // processadas dos originais por build/processar-acervo.mjs. Passo a passo em
  // docs/adicionar-ambiente.md.
  acervo: {
    // A ORDEM DO CARROSSEL é a ordem desta lista: reordene à vontade. A regra
    // usada para gerá-la: ambientes alternando e nunca duas fotos seguidas do
    // mesmo arquiteto (um teste confere as duas coisas).
    carrossel: [
      { arquivo: "cozinha-tati-otta", ambiente: "cozinha", arquiteto: "Tati Otta" },
      { arquivo: "dormitorio-gustavo-dias", ambiente: "dormitorio", arquiteto: "Gustavo Dias" },
      { arquivo: "cozinha-juliana-guimaraes", ambiente: "cozinha", arquiteto: "Juliana Guimarães" },
      { arquivo: "living-gustavo-dias", ambiente: "living", arquiteto: "Gustavo Dias" },
      { arquivo: "banheiro-juliana-guimaraes", ambiente: "banheiro", arquiteto: "Juliana Guimarães" },
      { arquivo: "cozinha-gustavo-dias", ambiente: "cozinha", arquiteto: "Gustavo Dias" },
      { arquivo: "dormitorio-juliana-guimaraes", ambiente: "dormitorio", arquiteto: "Juliana Guimarães" },
      { arquivo: "living-gustavo-dias-2", ambiente: "living", arquiteto: "Gustavo Dias" },
      { arquivo: "banheiro-carina-thiago", ambiente: "banheiro", arquiteto: "Carina Thiago" },
      { arquivo: "cozinha-rafael-pires", ambiente: "cozinha", arquiteto: "Rafael Pires" },
      { arquivo: "home-office-juliana-guimaraes", ambiente: "home-office", arquiteto: "Juliana Guimarães" },
      { arquivo: "banheiro-brc", ambiente: "banheiro", arquiteto: "BRC" },
      { arquivo: "cozinha-carina-thiago", ambiente: "cozinha", arquiteto: "Carina Thiago" },
      { arquivo: "dormitorio-rafael-pires", ambiente: "dormitorio", arquiteto: "Rafael Pires" },
      { arquivo: "living-juliana-guimaraes", ambiente: "living", arquiteto: "Juliana Guimarães" },
      { arquivo: "corporativo-gustavo-dias", ambiente: "corporativo", arquiteto: "Gustavo Dias" },
      { arquivo: "home-office-brc", ambiente: "home-office", arquiteto: "BRC" },
      { arquivo: "sala-tv-gustavo-dias", ambiente: "sala-tv", arquiteto: "Gustavo Dias" },
      { arquivo: "banheiro-rafael-pires", ambiente: "banheiro", arquiteto: "Rafael Pires" },
      { arquivo: "dormitorio-carina-thiago", ambiente: "dormitorio", arquiteto: "Carina Thiago" },
      { arquivo: "living-juliana-guimaraes-2", ambiente: "living", arquiteto: "Juliana Guimarães" },
      { arquivo: "cozinha-brc", ambiente: "cozinha", arquiteto: "BRC" },
      { arquivo: "home-office-carina-thiago", ambiente: "home-office", arquiteto: "Carina Thiago" },
      { arquivo: "closet-gustavo-dias", ambiente: "closet", arquiteto: "Gustavo Dias" },
      { arquivo: "banheiro-rafael-pires-2", ambiente: "banheiro", arquiteto: "Rafael Pires" },
      { arquivo: "corporativo-gustavo-dias-2", ambiente: "corporativo", arquiteto: "Gustavo Dias" },
      { arquivo: "cozinha-dany-resck", ambiente: "cozinha", arquiteto: "Dany Resck" },
      { arquivo: "dormitorio-sertao-arquitetura", ambiente: "dormitorio", arquiteto: "Sertão Arquitetura" },
      { arquivo: "living-juliana-guimaraes-3", ambiente: "living", arquiteto: "Juliana Guimarães" },
      { arquivo: "home-office-carina-thiago-2", ambiente: "home-office", arquiteto: "Carina Thiago" },
      { arquivo: "sala-tv-brc", ambiente: "sala-tv", arquiteto: "BRC" },
      { arquivo: "banheiro-tati-otta", ambiente: "banheiro", arquiteto: "Tati Otta" },
      { arquivo: "closet-juliana-guimaraes", ambiente: "closet", arquiteto: "Juliana Guimarães" },
      { arquivo: "corporativo-gustavo-dias-3", ambiente: "corporativo", arquiteto: "Gustavo Dias" },
      { arquivo: "cozinha-debora-toledo", ambiente: "cozinha", arquiteto: "Débora Toledo" },
      { arquivo: "dormitorio-dany-resck", ambiente: "dormitorio", arquiteto: "Dany Resck" },
      { arquivo: "home-office-sertao-arquitetura", ambiente: "home-office", arquiteto: "Sertão Arquitetura" },
      { arquivo: "living-tati-otta", ambiente: "living", arquiteto: "Tati Otta" },
      { arquivo: "sala-tv-rafael-pires", ambiente: "sala-tv", arquiteto: "Rafael Pires" },
    ],
    // Fora do carrossel: a foto do arquivo "Manifesto-RafaelPires.jpg", que é
    // de uma cozinha e entra na fábrica e no preview do link.
    avulsas: [
      { arquivo: "manifesto-rafael-pires", ambiente: "cozinha", arquiteto: "Rafael Pires" },
    ],
    // As quatro fotos avulsas da home (docs/copy-home-v5.md, seções 2, 4, 5 e 6).
    home: {
      manifesto: "living-tati-otta",
      fabrica: "manifesto-rafael-pires",
      arquitetos: "home-office-sertao-arquitetura",
      showroom: "cozinha-juliana-guimaraes",
    },
  },
};
