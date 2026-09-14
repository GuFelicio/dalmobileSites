// O laboratório é protótipo: ele NÃO pode chegar ao site publicado, e o peso
// que ele traz (three.js, ~128 KB gzip contra os 89 KB que a home inteira
// baixa hoje) não pode encostar em nenhuma página real.
//
// O checklist "Obrigatório antes de qualquer deploy" do CLAUDE.md proíbe rota
// de teste no build, e /teste-layout acabou de ser removida por exatamente
// isso — tinha ficado no ar, sem link nenhum, por semanas.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const raiz = fileURLToPath(new URL("..", import.meta.url));

async function buscar(rota) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const resposta = await worker.fetch(
    new Request(`http://localhost${rota}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("nf", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  return { resposta, html: await resposta.text() };
}

test("o laboratório não responde no build de produção", async () => {
  const { resposta } = await buscar("/laboratorio");
  assert.equal(
    resposta.status,
    404,
    "a rota de laboratório está no ar. Ver a constante PUBLICAR em app/laboratorio/page.tsx.",
  );
});

test("nenhuma página real carrega o three.js", async () => {
  // É a garantia que importa: o chunk existe no build, mas só a rota de
  // laboratório o referencia — e ela não responde. Quem visita o site não
  // baixa um byte de WebGL.
  for (const rota of ["/", "/ambientes", "/ambientes/cozinha", "/a-loja", "/a-dalmobile"]) {
    const { html } = await buscar(rota);
    const arquivos = [...html.matchAll(/\/assets\/([^"]+\.js)/g)].map((m) => m[1]);
    const pesados = arquivos.filter((a) => /three|CenaMateriais/i.test(a));
    assert.deepEqual(
      pesados,
      [],
      `${rota} está carregando ${pesados.join(", ")} — o estudo 3D vazou para uma página real`,
    );
  }
});

test("o laboratório não entra no sitemap nem é linkado", async () => {
  const { html: sitemap } = await buscar("/sitemap.xml");
  assert.ok(!sitemap.includes("/laboratorio"), "o laboratório está no sitemap");

  for (const rota of ["/", "/ambientes", "/a-loja"]) {
    const { html } = await buscar(rota);
    assert.ok(
      !html.includes('href="/laboratorio"'),
      `${rota} tem link para o laboratório`,
    );
  }
});

test("o three é dependência de desenvolvimento, não de produção", () => {
  // Se ele virar dependência de produção, vai junto em toda instalação e no
  // bundle do Worker. Aqui ele existe só para o estudo rodar em `npm run dev`.
  const pkg = JSON.parse(readFileSync(path.join(raiz, "package.json"), "utf8"));
  assert.ok(!pkg.dependencies.three, "three está em dependencies; deveria estar em devDependencies");
  assert.ok(pkg.devDependencies.three, "three saiu do package.json");
});
