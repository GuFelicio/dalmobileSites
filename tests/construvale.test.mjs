// /construvale2026 (11/11/2026): a página do QR code da feira. Só existe na
// unidade com `paginasExtras.construvale2026` no config, fora da busca e
// isolada do site. Ver app/construvale2026/page.tsx e docs/decisoes.md.
import assert from "node:assert/strict";
import test from "node:test";

import { renderizar, unidadeDoBuild } from "./unidade-do-build.mjs";

const { esta: unidade } = await unidadeDoBuild();
const pagina = unidade.paginasExtras?.construvale2026;

if (!pagina) {
  test(`${unidade.id}: /construvale2026 não existe nesta unidade`, async () => {
    const { resposta } = await renderizar("/construvale2026");
    assert.equal(resposta.status, 404);
  });
} else {
  test(`${unidade.id}: /construvale2026 responde, fora da busca`, async () => {
    const { resposta, corpo } = await renderizar("/construvale2026");
    assert.equal(resposta.status, 200);
    assert.match(corpo, /<meta name="robots" content="noindex, nofollow"/);
    const { corpo: sitemap } = await renderizar("/sitemap.xml", "application/xml");
    assert.doesNotMatch(sitemap, /construvale2026/, "a página apareceu no sitemap");
    const { corpo: robots } = await renderizar("/robots.txt", "text/plain");
    assert.doesNotMatch(robots, /construvale/i, "Disallow no robots.txt impede o robô de ler o noindex");
  });

  test(`${unidade.id}: /construvale2026 é isolada — sem cabeçalho, rodapé do site nem link para outra página`, async () => {
    const { corpo } = await renderizar("/construvale2026");
    const html = corpo.slice(corpo.indexOf("<body")).replace(/<script[\s\S]*?<\/script>/g, "");
    assert.doesNotMatch(html, /<header/, "a página tem o cabeçalho do site");
    assert.doesNotMatch(html, /<nav/, "a página tem menu");
    const links = [...html.matchAll(/<a\b[^>]*href="([^"]*)"/g)].map((m) => m[1]);
    assert.deepEqual(links, [], `link na página: ${links.join(", ")}`);
  });

  test(`${unidade.id}: a privacidade conta que a página coleta nome e telefone`, async () => {
    const { corpo } = await renderizar("/privacidade");
    assert.match(corpo, /Construvale 2026/);
  });
}
