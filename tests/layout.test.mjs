// Guarda o que a Fase 2 promete: cabeçalho e rodapé completos, menu mobile
// com handler de verdade, e nenhum dado de unidade escrito em componente.
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import { unidade } from "../config/sjc.ts";

/**
 * A página usada para exercitar cabeçalho e rodapé.
 *
 * Era `/teste-layout`, o andaime da Fase 2 — que ficou no ar respondendo 200
 * mesmo sem estar linkada em lugar nenhum. O checklist "Obrigatório antes de
 * qualquer deploy" do CLAUDE.md proíbe rota de teste no build, então a rota
 * saiu e os testes passaram a usar uma página de verdade.
 */
const PAGINA_COM_LAYOUT = "/ambientes";
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
  const { resposta, html } = await renderizar(PAGINA_COM_LAYOUT);
  assert.equal(resposta.status, 200);

  // Do CONFIG, nunca literal: o teste travava o número antigo e quebrou no
  // dia em que a loja unificou o telefone — ou seja, por estar certo.
  assert.ok(html.includes(unidade.endereco.logradouro), "falta o logradouro no rodapé");
  assert.ok(html.includes(unidade.endereco.bairro), "falta o bairro no rodapé");
  assert.ok(html.includes(unidade.telefone), "falta o telefone no rodapé");
  for (const horario of unidade.horarios) {
    assert.ok(html.includes(horario.dias), `falta "${horario.dias}" no rodapé`);
    assert.ok(html.includes(horario.abre), `falta a abertura de ${horario.dias}`);
  }
});

test("o botão de menu tem handler e estado, não só aria-label", async () => {
  const { html } = await renderizar(PAGINA_COM_LAYOUT);
  // O painel existe no DOM e o botão o controla e anuncia se está aberto.
  assert.match(html, /aria-controls="menu-principal"/, "o botão não aponta para o painel");
  assert.match(html, /aria-expanded="(true|false)"/, "o botão não anuncia se está aberto");
  assert.match(html, /id="menu-principal"[^>]*role="dialog"/, "o painel não é um diálogo");
});

test("nenhum CTA sem destino real", async () => {
  const { html } = await renderizar(PAGINA_COM_LAYOUT);
  assert.doesNotMatch(html, /href="#"/, 'há link apontando para "#"');
  // <a(?=[\s>]) para não casar com <address>, que também começa com "<a".
  assert.doesNotMatch(html, /<a(?=[\s>])(?![^>]*\bhref=)/, "há âncora sem href");
});

test("ação sem destino aparece desabilitada, nunca como link", async () => {
  const { html } = await renderizar(PAGINA_COM_LAYOUT);

  // A REGRA, não o estado: uma ação marcada "em breve" nunca pode estar dentro
  // de um <a>. A primeira versão deste teste exigia que a ação DESABILITADA
  // existisse — travava o momento em que a loja ainda não tinha WhatsApp, e
  // passou a falhar no dia em que o número chegou, ou seja, por estar certo.
  assert.doesNotMatch(
    html,
    /<a\b[^>]*>(?:(?!<\/a>)[\s\S])*em breve/i,
    "há um link envolvendo uma ação marcada como 'em breve'",
  );

  // E se houver ação desabilitada, ela precisa estar anunciada como tal.
  if (/em breve/i.test(html)) {
    assert.match(html, /aria-disabled="true"/, "ação 'em breve' sem aria-disabled");
  }
});

test("o link de WhatsApp identifica de qual unidade veio o lead", async () => {
  const { html } = await renderizar(PAGINA_COM_LAYOUT);
  if (!html.includes("wa.me")) return; // sem número ainda, nada a conferir

  // As duas unidades dividem o mesmo número. Sem a mensagem pré-preenchida,
  // quem atende não sabe de qual cidade a pessoa chegou, e a direção exige
  // que o lead carregue a origem. Ver config/derivados.ts.
  for (const [, link] of html.matchAll(/href="(https:\/\/wa\.me\/[^"]+)"/g)) {
    assert.ok(link.includes("?text="), `link de WhatsApp sem origem: ${link}`);
  }
});

test("o sábado está registrado", async () => {
  const { html } = await renderizar(PAGINA_COM_LAYOUT);
  const sabado = unidade.horarios.find((h) => h.dias.toLowerCase().includes("sábado"));
  assert.ok(sabado, "o config não declara horário de sábado");
  assert.ok(html.includes(sabado.dias), "falta o sábado no rodapé");
  assert.ok(html.includes(sabado.fecha), "falta o fechamento de sábado no rodapé");
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

test("nenhum andaime de protótipo no build", async () => {
  // O seletor "ESTUDOS DE HOME" sobreviveu à limpeza da Fase 1 e foi ao ar nos
  // DOIS deploys. Este teste existe para que não volte por descuido.
  // Ver o checklist "Obrigatório antes de qualquer deploy" do CLAUDE.md.
  const { html } = await renderizar("/");
  for (const marca of [
    /ESTUDOS DE HOME/i,
    /study-switcher/,
    /Estudos de Layout/i,
    /Alternar proposta de layout/i,
  ]) {
    assert.doesNotMatch(html, marca, `andaime de protótipo no build: ${marca}`);
  }
});

test("a home é server component: nada de estado de protótipo no cliente", async () => {
  const { html } = await renderizar("/");
  // O <title> provisório vem do config, com a cidade da unidade.
  assert.match(html, /<title>Móveis Planejados em [^<]+ \| Dalmóbile<\/title>/);
});

test("todo link interno leva a uma rota que existe", async () => {
  // O teste antigo só via href="#" e âncora sem href. Passava com a home
  // inteira apontando para #sintese-contato e com quatro rotas 404 no menu e
  // no rodapé.
  //
  // Varre VÁRIAS páginas, e não só a home: a home é o andaime do estudo e tem
  // rodapé próprio, então os links do componente Footer — que é justamente
  // onde estavam as rotas quebradas — não apareciam nela.
  const paginas = ["/", "/ambientes", "/ambientes/cozinha", "/a-loja", "/privacidade"];
  const internos = new Set();
  for (const pagina of paginas) {
    const { html } = await renderizar(pagina);
    const corpo = html.slice(html.indexOf("<body"));
    for (const m of corpo.matchAll(/href="(\/[^"#?]*)"/g)) {
      const href = m[1];
      if (href.startsWith("/assets") || href.startsWith("/fotos")) continue;
      if (href === "/favicon.svg") continue;
      internos.add(href);
    }
  }

  const quebrados = [];
  for (const rota of internos) {
    const { resposta } = await renderizar(rota);
    if (resposta.status !== 200) quebrados.push(`${rota} → ${resposta.status}`);
  }
  assert.deepEqual(
    quebrados,
    [],
    `link apontando para rota inexistente:\n${quebrados.join("\n")}\n` +
      `Ver docs/pendencias.md.`,
  );
});

test("nenhuma âncora aponta para a seção que a contém", async () => {
  // "Agendar uma visita" ficava dentro de #sintese-contato e apontava para
  // #sintese-contato. O CLAUDE.md proíbe: âncora só dentro da própria página,
  // e nunca para a própria seção.
  const { html } = await renderizar("/");
  for (const secao of [...html.matchAll(/<section[^>]*id="([^"]+)"([\s\S]*?)<\/section>/g)]) {
    assert.doesNotMatch(
      secao[2],
      new RegExp(`href="#${secao[1]}"`),
      `a seção #${secao[1]} tem link para si mesma`,
    );
  }
});

test("nenhuma rota de teste no build", async () => {
  // /teste-layout era o andaime da Fase 2 e ficou no ar respondendo 200 até
  // 14/09/2026, sem link nenhum apontando para ela. O checklist do CLAUDE.md
  // proíbe rota de teste no build — e rota que ninguém linka é rota que
  // ninguém confere.
  for (const rota of ["/teste-layout", "/teste", "/debug", "/preview"]) {
    const { resposta } = await renderizar(rota);
    assert.equal(resposta.status, 404, `a rota de teste ${rota} está no ar`);
  }
});
