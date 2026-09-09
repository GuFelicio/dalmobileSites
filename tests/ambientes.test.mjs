// Regras das páginas de ambiente, que são o conteúdo principal do site.
// Ver docs/adicionar-ambiente.md e a seção 6 do docs/direcao-site.md.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { AMBIENTES, ambientePorSlug } from "../lib/ambientes.ts";
import { ambientesDe, todosOsAmbientes } from "../lib/ambientes-conteudo.ts";

const raiz = fileURLToPath(new URL("..", import.meta.url));
const ambientes = todosOsAmbientes();

test("há conteúdo de ambiente publicado", () => {
  assert.ok(ambientes.length > 0, "nenhum arquivo em conteudo/ambientes/");
});

test("todo ambiente com conteúdo está na lista canônica", () => {
  for (const a of ambientes) {
    assert.ok(ambientePorSlug(a.slug), `"${a.slug}" não está em lib/ambientes.ts`);
  }
});

test("toda foto tem título e alt, e o alt não repete o título", () => {
  for (const a of ambientes) {
    for (const f of a.fotos) {
      assert.ok(f.titulo?.length > 5, `${a.slug}: título curto em ${f.src}`);
      assert.ok(f.alt?.length > 20, `${a.slug}: alt curto em ${f.src}`);
      assert.notEqual(
        f.alt.trim().toLowerCase(),
        f.titulo.trim().toLowerCase(),
        `${a.slug}: alt igual ao título em ${f.src}`,
      );
    }
  }
});

test("a foto de uma unidade nunca aparece no site da outra", () => {
  // É a regra que derrubou o site anterior, agora no nível da foto.
  for (const id of ["sjc", "caragua"]) {
    for (const a of ambientesDe(id)) {
      for (const f of a.fotos) {
        assert.equal(f.unidade, id, `${a.slug}: foto de ${f.unidade} no site de ${id}`);
        assert.ok(f.src.startsWith(`/fotos/${id}/`), `${a.slug}: ${f.src} fora da raiz de ${id}`);
      }
    }
  }
});

test("nenhum ambiente entra num site sem ter foto lá", () => {
  for (const id of ["sjc", "caragua"]) {
    for (const a of ambientesDe(id)) {
      assert.ok(a.fotos.length > 0, `${a.slug}: página vazia no site de ${id}`);
    }
  }
});

test("toda foto de ambiente existe no manifesto gerado", () => {
  const manifesto = JSON.parse(
    readFileSync(path.join(raiz, "public/fotos-geradas/manifesto.json"), "utf8"),
  );
  for (const a of ambientes) {
    for (const f of a.fotos) {
      assert.ok(
        manifesto[f.src],
        `${a.slug}: ${f.src} não foi gerada. Rode "npm run fotos".`,
      );
    }
  }
});

test("a pasta da foto bate com o ambiente do arquivo de conteúdo", () => {
  for (const a of ambientes) {
    for (const f of a.fotos) {
      const [, , pasta] = f.src.split("/").filter(Boolean);
      assert.equal(pasta, a.slug, `${a.slug}: ${f.src} está na pasta "${pasta}"`);
    }
  }
});

test("a concordância de cada ambiente está declarada", () => {
  // Sem isto sai "Cozinha planejado" no <title> e "Quer um quartos assim"
  // na chamada — as duas frases que o Google e o cliente leem.
  for (const a of AMBIENTES) {
    assert.ok(["um", "uma"].includes(a.artigo), `${a.slug}: artigo inválido`);
    assert.match(a.planejado, /^planejad[oa]s?$/, `${a.slug}: flexão inválida`);
    assert.ok(a.singular?.length > 2, `${a.slug}: falta o singular`);
  }
  assert.equal(ambientePorSlug("quartos").singular, "quarto");
  assert.equal(ambientePorSlug("cozinha").artigo, "uma");
});

test("crédito de prédio e de arquiteto só aparece quando existe", () => {
  // Os campos existem no conteúdo e estão vazios até o cliente informar.
  // Nome de terceiro exige autorização por escrito — CLAUDE.md.
  for (const a of ambientes) {
    for (const f of a.fotos) {
      assert.ok(f.edificio === null || typeof f.edificio === "string");
      assert.ok(f.arquiteto === null || typeof f.arquiteto === "string");
    }
  }
});

test("nenhum sentinela PENDENTE vaza para o HTML", async () => {
  // Os textos institucionais têm prazo, garantia e números por confirmar.
  // A página OMITE cada campo pendente; se um vazar, o site publica a palavra
  // "PENDENTE" na cara do cliente. Ver conteudo/institucional/.
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  for (const rota of ["/a-dalmobile", "/arquitetos", "/a-loja", "/", "/ambientes"]) {
    const resposta = await worker.fetch(
      new Request(`http://localhost${rota}`, { headers: { accept: "text/html" } }),
      { ASSETS: { fetch: async () => new Response("nf", { status: 404 }) } },
      { waitUntil() {}, passThroughOnException() {} },
    );
    const html = await resposta.text();
    assert.doesNotMatch(html, /PENDENTE/, `"PENDENTE" apareceu no HTML de ${rota}`);
  }
});
