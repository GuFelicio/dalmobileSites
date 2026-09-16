// O erro que este arquivo existe para tornar impossível: o site anterior de
// Caraguatatuba foi ao ar indexado com "Móveis Planejados em São José dos
// Campos".
//
// A REGRA MUDOU EM 14/09/2026, e é importante entender como. Antes, a cidade
// da outra unidade era banida de TODO o build. A copy aprovada pelo cliente
// nomeia a loja irmã de propósito — no rótulo do link cruzado, na página da
// loja e no FAQ —, porque é o que ajuda quem está na cidade errada.
//
// Então a proibição deixou de ser "a string não existe" e passou a ser onde
// o dano realmente acontece:
//
//   1. BANIMENTO ABSOLUTO nos campos que definem de que cidade o site é:
//      <title>, meta description, OpenGraph, canônico, <h1> e o schema.
//      É por eles que o Google decide a praça. Zero tolerância.
//
//   2. NO CORPO, só menção DECLARADA. Toda ocorrência tem que casar com uma
//      das frases da lista abaixo. Uma menção nova quebra a suíte e obriga
//      alguém a olhar — que é o ponto.
//
// Ver docs/decisoes.md e docs/copy/sjc.md.
import assert from "node:assert/strict";
import test from "node:test";

import { unidade as caragua } from "../config/caragua.ts";
import { unidade as sjc } from "../config/sjc.ts";

const PAGINAS = [
  "/",
  "/ambientes",
  "/ambientes/cozinha",
  "/a-loja",
  "/a-dalmobile",
  "/arquitetos",
  "/privacidade",
];

/**
 * As únicas menções à outra cidade permitidas no corpo, e o porquê de cada uma.
 * `{outra}` é substituído pela cidade da outra unidade.
 */
const MENCOES_DECLARADAS = [
  // O rótulo do link cruzado, que vem do config. Rodapé e página da loja.
  "Ver a loja de {outra}",
  // Faixa da página da loja: nomear a região ajuda quem chegou na cidade errada.
  "A Dalmóbile também atende a partir de {outra}",
  // FAQ de /a-dalmobile: "Vocês atendem fora de <cidade>?"
  "a loja de {outra} pode atender melhor",
];

async function renderizar(rota) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const resposta = await worker.fetch(
    new Request(`http://localhost${rota}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("nf", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  return resposta.text();
}

/** A unidade deste build, deduzida do domínio que o canônico declara. */
async function unidadeDoBuild() {
  const html = await renderizar("/");
  return html.includes(sjc.dominio) ? { esta: sjc, outra: caragua } : { esta: caragua, outra: sjc };
}

/** Os campos que dizem ao Google de que cidade o site é. */
function camposEstruturais(html) {
  const cabeca = html.slice(0, html.indexOf("</head>"));
  const campos = [];
  const pegar = (re, nome) => {
    for (const m of cabeca.matchAll(re)) campos.push([nome, m[1]]);
  };
  pegar(/<title>([^<]*)<\/title>/g, "title");
  pegar(/name="description" content="([^"]*)"/g, "description");
  pegar(/property="og:[^"]*" content="([^"]*)"/g, "openGraph");
  pegar(/name="twitter:[^"]*" content="([^"]*)"/g, "twitter");
  pegar(/rel="canonical" href="([^"]*)"/g, "canonical");
  pegar(/application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g, "schema");
  for (const m of html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)) {
    campos.push(["h1", m[1].replace(/<[^>]+>|<!-- -->/g, "")]);
  }
  return campos;
}

test("nenhum campo de SEO cita a cidade da outra unidade", async () => {
  // É por estes campos que o Google decide de que praça o site é. Aqui não há
  // menção legítima: uma só já basta para o site inteiro ser lido errado.
  const { esta, outra } = await unidadeDoBuild();
  const infratores = [];

  for (const rota of PAGINAS) {
    const html = await renderizar(rota);
    for (const [nome, valor] of camposEstruturais(html)) {
      // A URL da outra loja é inevitável: a cidade está no domínio.
      const semUrl = valor.split(outra.dominio).join("");
      if (semUrl.toLowerCase().includes(outra.cidade.toLowerCase())) {
        infratores.push(`${rota} · ${nome}: ${valor.slice(0, 140)}`);
      }
    }
  }

  assert.deepEqual(
    infratores,
    [],
    `Campo de SEO do site de ${esta.cidade} citando ${outra.cidade}:\n` +
      infratores.join("\n"),
  );
});

test("no corpo, a outra cidade só aparece nas menções declaradas", async () => {
  const { esta, outra } = await unidadeDoBuild();
  const permitidas = MENCOES_DECLARADAS.map((m) => m.replace("{outra}", outra.cidade));
  const infratores = [];

  for (const rota of PAGINAS) {
    let html = await renderizar(rota);
    // Só o corpo visível. Fora o <head> e, principalmente, TODO <script>: a
    // carga do RSC repete o HTML inteiro em JSON escapado, e sem tirá-la cada
    // frase é contada duas vezes — foi o que fez este teste acusar uma menção
    // que já estava declarada.
    html = html.slice(html.indexOf("<body"));
    html = html.replace(/<script[\s\S]*?<\/script>/g, " ");
    let texto = html.replace(/<!-- -->/g, "").replace(/<[^>]+>/g, " ");

    texto = texto.split(outra.dominio).join(" ");
    for (const frase of permitidas) texto = texto.split(frase).join(" ");

    if (texto.toLowerCase().includes(outra.cidade.toLowerCase())) {
      const trecho = texto.match(new RegExp(`.{0,70}${outra.cidade}.{0,50}`, "i"))?.[0];
      infratores.push(`${rota}: ${trecho?.trim()}`);
    }
  }

  assert.deepEqual(
    infratores,
    [],
    `Menção NÃO DECLARADA a ${outra.cidade} no site de ${esta.cidade}:\n` +
      infratores.join("\n") +
      `\n\nSe a menção é intencional, acrescente-a a MENCOES_DECLARADAS neste\n` +
      `arquivo, com um comentário dizendo por que ela ajuda o leitor.`,
  );
});

test("o sitemap não cita a outra unidade", async () => {
  // O sitemap é o que o Google lê primeiro. Nenhuma exceção aqui.
  const { outra } = await unidadeDoBuild();
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const xml = await (
    await worker.fetch(
      new Request("http://localhost/sitemap.xml"),
      { ASSETS: { fetch: async () => new Response("nf", { status: 404 }) } },
      { waitUntil() {}, passThroughOnException() {} },
    )
  ).text();

  assert.ok(!xml.includes(outra.dominio), `sitemap com URL de ${outra.cidade}`);
  assert.ok(!xml.includes(outra.cidade), `sitemap citando ${outra.cidade}`);
});

test("as duas unidades declaram cidades, domínios e link cruzado coerentes", () => {
  assert.notEqual(sjc.cidade, caragua.cidade);
  assert.notEqual(sjc.dominio, caragua.dominio);
  assert.notEqual(sjc.id, caragua.id);
  assert.equal(sjc.outraUnidade.url, caragua.dominio);
  assert.equal(caragua.outraUnidade.url, sjc.dominio);
  // A cidade da outra unidade é dado, e é o que lib/texto.ts usa para
  // substituir {{outraCidade}} nos textos compartilhados.
  assert.equal(sjc.outraUnidade.cidade, caragua.cidade);
  assert.equal(caragua.outraUnidade.cidade, sjc.cidade);
});
