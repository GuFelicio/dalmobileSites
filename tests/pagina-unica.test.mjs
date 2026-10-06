// A v5 (06/10/2026): os dois sites são uma página só. Guarda o que sustenta
// isso: as rotas antigas redirecionam para as seções certas, o menu aponta
// para seções que existem, e nenhum link leva a uma página que saiu.
// Ver docs/decisoes.md e docs/copy-home-v5.md.
import assert from "node:assert/strict";
import test from "node:test";

import { renderizar } from "./unidade-do-build.mjs";

const REDIRECIONAMENTOS = {
  "/ambientes": "/#projetos",
  "/ambientes/cozinha": "/#projetos",
  "/ambientes/quartos": "/#projetos",
  "/projetos": "/#projetos",
  "/a-dalmobile": "/#a-dalmobile",
  "/arquitetos": "/#arquitetos",
  "/a-loja": "/#a-loja",
};

test("as páginas internas antigas respondem 301 para a seção da home", async () => {
  for (const [rota, destino] of Object.entries(REDIRECIONAMENTOS)) {
    const { resposta } = await renderizar(rota);
    assert.equal(resposta.status, 301, `${rota} deveria ser 301, foi ${resposta.status}`);
    const local = new URL(resposta.headers.get("location"));
    assert.equal(local.pathname + local.hash, destino, `${rota} redireciona para o lugar errado`);
  }
});

test("só a home e /privacidade respondem 200", async () => {
  for (const rota of ["/", "/privacidade"]) {
    const { resposta } = await renderizar(rota);
    assert.equal(resposta.status, 200, `${rota} → ${resposta.status}`);
  }
});

test("todo item do menu aponta para uma seção que existe na home", async () => {
  const { corpo: home } = await renderizar("/");
  const ids = new Set([...home.matchAll(/<section[^>]*\bid="([^"]+)"/g)].map((m) => m[1]));
  for (const id of ["topo", "inicio", "projetos", "a-dalmobile", "arquitetos", "a-loja"]) {
    assert.ok(ids.has(id), `a home não tem a seção #${id}`);
  }
  for (const rota of ["/", "/privacidade"]) {
    const { corpo } = await renderizar(rota);
    const nav = corpo.slice(corpo.indexOf("<nav"), corpo.indexOf("</nav>"));
    const ancoras = [...nav.matchAll(/href="\/#([^"]+)"/g)].map((m) => m[1]);
    assert.deepEqual(ancoras, ["projetos", "a-dalmobile", "arquitetos", "a-loja"], `${rota}: menu fora da v5`);
    for (const id of ancoras) assert.ok(ids.has(id), `${rota}: o menu aponta para #${id}, que não existe`);
  }
});

test("nenhum link do site aponta para uma rota que saiu", async () => {
  const saiu = /href="\/(ambientes|projetos|a-dalmobile|arquitetos|a-loja)(\/[^"]*)?"/;
  for (const rota of ["/", "/privacidade", "/nao-existe"]) {
    const { corpo } = await renderizar(rota);
    const html = corpo.replace(/<script[\s\S]*?<\/script>/g, "");
    const achou = html.match(saiu);
    assert.equal(achou, null, `${rota}: link para rota removida: ${achou?.[0]}`);
  }
});
