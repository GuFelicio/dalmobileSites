// Guarda o que a Fase 2 promete: cabeçalho e rodapé completos, menu mobile
// com handler de verdade, e nenhum dado de unidade escrito em componente.
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));

async function renderizar(rota) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const resposta = await worker.fetch(
    new Request(`http://localhost${rota}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  return { resposta, html: await resposta.text() };
}

async function componentes() {
  const encontrados = [];
  async function varrer(diretorio) {
    const entradas = await readdir(path.join(root, diretorio), { withFileTypes: true });
    for (const entrada of entradas) {
      const relativo = path.join(diretorio, entrada.name);
      if (entrada.isDirectory()) await varrer(relativo);
      else if (entrada.name.endsWith(".tsx")) encontrados.push(relativo);
    }
  }
  await varrer("components");
  return encontrados;
}

test("o rodapé traz endereço, telefone e horário", async () => {
  const { resposta, html } = await renderizar("/teste-layout");
  assert.equal(resposta.status, 200);

  assert.ok(html.includes("Av. Barão do Rio Branco, 736"), "falta o logradouro no rodapé");
  assert.ok(html.includes("Jardim Esplanada"), "falta o bairro no rodapé");
  assert.ok(html.includes("(12) 3341-8777"), "falta o telefone no rodapé");
  assert.ok(html.includes("09h00"), "falta o horário no rodapé");
});

test("o botão de menu tem handler e estado, não só aria-label", async () => {
  const { html } = await renderizar("/teste-layout");
  // O painel existe no DOM e o botão o controla e anuncia se está aberto.
  assert.match(html, /aria-controls="menu-principal"/, "o botão não aponta para o painel");
  assert.match(html, /aria-expanded="(true|false)"/, "o botão não anuncia se está aberto");
  assert.match(html, /id="menu-principal"[^>]*role="dialog"/, "o painel não é um diálogo");
});

test("nenhum CTA sem destino real", async () => {
  const { html } = await renderizar("/teste-layout");
  assert.doesNotMatch(html, /href="#"/, 'há link apontando para "#"');
  // <a(?=[\s>]) para não casar com <address>, que também começa com "<a".
  assert.doesNotMatch(html, /<a(?=[\s>])(?![^>]*\bhref=)/, "há âncora sem href");
});

test("ação sem destino aparece desabilitada, nunca como link", async () => {
  const { html } = await renderizar("/teste-layout");
  // Enquanto a loja não tem WhatsApp, a ação existe no layout mas não é <a>.
  assert.match(html, /aria-disabled="true"/, "a ação pendente não está marcada como desabilitada");
  assert.doesNotMatch(
    html,
    /<a\b[^>]*>(?:(?!<\/a>)[\s\S])*em breve/,
    "há um link envolvendo uma ação marcada como 'em breve'",
  );
});

test("o sábado está registrado", async () => {
  const { html } = await renderizar("/teste-layout");
  assert.ok(html.includes("Sábado"), "falta o horário de sábado no rodapé");
  assert.ok(html.includes("14h00"), "falta o fechamento de sábado");
});

test("nenhum dado de unidade escrito direto em componente", async () => {
  // Tudo tem que vir de app/dados-unidade.ts — na Fase 3, do config. Foi
  // assim que o site anterior acabou indexado com a cidade errada.
  const proibidos = [
    "São José dos Campos",
    "Caraguatatuba",
    "Barão do Rio Branco",
    "3341-8777",
  ];
  const infratores = [];
  for (const arquivo of await componentes()) {
    const conteudo = await readFile(path.join(root, arquivo), "utf8");
    for (const termo of proibidos) {
      if (conteudo.includes(termo)) infratores.push(`${arquivo} contém "${termo}"`);
    }
  }
  assert.deepEqual(infratores, [], infratores.join("\n"));
});

test("todo componente tem cabeçalho de comentário", async () => {
  // O CLAUDE.md exige: o que é, onde é usado, que props recebe.
  const infratores = [];
  for (const arquivo of await componentes()) {
    const conteudo = await readFile(path.join(root, arquivo), "utf8");
    const cabecalho = conteudo.slice(0, 1400);
    if (!cabecalho.includes("O que é:")) infratores.push(`${arquivo}: falta "O que é:"`);
    if (!cabecalho.includes("Onde é usado:")) infratores.push(`${arquivo}: falta "Onde é usado:"`);
  }
  assert.deepEqual(infratores, [], infratores.join("\n"));
});
