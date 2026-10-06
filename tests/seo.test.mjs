// Fase 8: o que faz o site existir para o Google.
// Ver o checklist "Obrigatório antes de qualquer deploy" do CLAUDE.md.
import assert from "node:assert/strict";
import test from "node:test";

import { renderizar as buscar, unidadeDoBuild } from "./unidade-do-build.mjs";

// O config da unidade deste build — SJC ou Caraguá. Era config/sjc.ts fixo, e
// o site de Caraguá reprovava aqui por ser de Caraguá.
const { esta: unidade } = await unidadeDoBuild();

// Desde a v5 (06/10/2026) o site é a home e a política de privacidade.
const PAGINAS = ["/", "/privacidade"];

test("toda página tem title e description com a cidade da unidade", async () => {
  for (const rota of PAGINAS) {
    const { corpo } = await buscar(rota);
    const titulo = corpo.match(/<title>([^<]+)<\/title>/)?.[1];
    const descricao = corpo.match(/name="description" content="([^"]+)"/)?.[1];
    assert.ok(titulo, `${rota}: sem <title>`);
    assert.ok(descricao, `${rota}: sem meta description`);
    assert.ok(
      `${titulo} ${descricao}`.includes(unidade.cidade),
      `${rota}: nem o título nem a descrição citam "${unidade.cidade}"`,
    );
  }
});

test("toda página indexável tem OpenGraph com imagem", async () => {
  // O vendedor manda o link no WhatsApp: o preview É o produto naquele
  // momento. Sem og:image, o link chega como um retângulo cinza.
  for (const rota of PAGINAS) {
    const { corpo } = await buscar(rota);
    const noindex = /name="robots"[^>]*content="[^"]*noindex/.test(corpo);
    if (noindex) continue; // /privacidade é obrigação legal, não busca

    for (const propriedade of ["og:title", "og:description", "og:url", "og:image"]) {
      assert.match(
        corpo,
        new RegExp(`property="${propriedade}"`),
        `${rota}: sem ${propriedade}`,
      );
    }
  }
});

test("toda página declara o canônico, com o domínio da unidade", async () => {
  for (const rota of PAGINAS) {
    const { corpo } = await buscar(rota);
    const canonico = corpo.match(/rel="canonical" href="([^"]+)"/)?.[1];
    assert.ok(canonico, `${rota}: sem link canônico`);
    assert.ok(
      canonico.startsWith(unidade.dominio),
      `${rota}: canônico "${canonico}" não usa o domínio desta unidade`,
    );
  }
});

test("o sitemap lista só as páginas desta unidade", async () => {
  const { resposta, corpo } = await buscar("/sitemap.xml", "application/xml");
  assert.equal(resposta.status, 200);

  const urls = [...corpo.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  // Site de uma página (v5): a home e a privacidade, e nada mais. As páginas
  // internas antigas respondem 301 e não podem voltar ao sitemap.
  assert.deepEqual(
    urls.sort(),
    [`${unidade.dominio}/`, `${unidade.dominio}/privacidade`].sort(),
    "o sitemap deve ter só a home e /privacidade",
  );
});

test("o robots.txt aponta para o sitemap desta unidade", async () => {
  const { resposta, corpo } = await buscar("/robots.txt", "text/plain");
  assert.equal(resposta.status, 200);
  assert.match(corpo, /User-Agent: \*/i);
  assert.ok(
    corpo.includes(`Sitemap: ${unidade.dominio}/sitemap.xml`),
    "robots.txt sem o sitemap desta unidade",
  );
  assert.match(corpo, /Disallow: \/_vinext\//, "robots.txt não bloqueia /_vinext/");
});

test("a política de privacidade fica fora do índice", async () => {
  const { corpo } = await buscar("/privacidade");
  assert.match(
    corpo,
    /name="robots"[^>]*content="[^"]*noindex/,
    "/privacidade deveria ser noindex: é obrigação legal, não conteúdo de busca",
  );
});

test("o schema LocalBusiness sai do config, com os dados da loja", async () => {
  // Na home desde a v5 (era em /a-loja, que saiu).
  const { corpo } = await buscar("/");
  const bruto = corpo.match(/application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)?.[1];
  assert.ok(bruto, "a home sem schema LocalBusiness");

  const schema = JSON.parse(bruto);
  assert.equal(schema.address.addressLocality, unidade.cidade);
  assert.equal(schema.address.postalCode, unidade.endereco.cep);
  assert.equal(schema.telephone, `+55${unidade.telefone.replace(/\D/g, "")}`);
  assert.ok(schema.openingHoursSpecification.length > 0, "schema sem horário");

  // Horário não confirmado não entra: alimentar a busca local com dado que a
  // loja não confirmou é pior que não alimentar.
  const confirmados = unidade.horarios.filter((h) => h.confirmado !== false).length;
  assert.equal(schema.openingHoursSpecification.length, confirmados);
});
