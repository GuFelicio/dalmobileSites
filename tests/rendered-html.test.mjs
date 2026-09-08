// Verifica que o Worker renderiza a página e que o básico de idioma e título
// está no HTML. O teste que veio no template checava uma meta "codex-preview"
// que nada neste projeto emite — foi trocado na Fase 1.
import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("o Worker responde HTML na raiz", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
});

test("a página declara português do Brasil e tem título", async () => {
  const html = await (await render()).text();
  assert.match(html, /<html[^>]*\blang="pt-BR"/i, "falta lang=\"pt-BR\" no <html>");
  assert.match(html, /<title>[^<]+<\/title>/i, "falta <title> com conteúdo");
});
