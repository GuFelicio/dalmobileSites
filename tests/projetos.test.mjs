// Regras da Fase 4: conteúdo de projeto, filtro do índice e fotos responsivas.
// Ver docs/adicionar-projeto.md e a seção 5 do docs/direcao-site.md.
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { NOMES_DE_AMBIENTE, ambientePorNome } from "../lib/ambientes.ts";
import { eixosDeFiltro, filtrarPorUnidade, outrosNoEdificio } from "../lib/filtros.ts";
import { todosOsProjetos } from "../lib/projetos.ts";

const raiz = fileURLToPath(new URL("..", import.meta.url));
const projetos = todosOsProjetos();

test("todo projeto declara em quais unidades aparece", () => {
  for (const p of projetos) {
    assert.ok(p.unidades.length > 0, `${p.slug}: sem unidades`);
    for (const u of p.unidades) {
      assert.ok(["sjc", "caragua"].includes(u), `${p.slug}: unidade "${u}" não existe`);
    }
  }
});

test("o filtro por unidade não deixa projeto vazar para o outro site", () => {
  for (const id of ["sjc", "caragua"]) {
    for (const p of filtrarPorUnidade(projetos, id)) {
      assert.ok(p.unidades.includes(id), `${p.slug} apareceu em ${id} sem declarar`);
    }
  }
});

test("toda foto tem alt descritivo, e o alt não repete a legenda", () => {
  for (const p of projetos) {
    for (const f of p.fotos) {
      assert.ok(f.alt && f.alt.length > 15, `${p.slug}: alt curto demais em ${f.src}`);
      assert.notEqual(
        f.alt.trim().toLowerCase(),
        f.legenda.trim().toLowerCase(),
        `${p.slug}: alt igual à legenda em ${f.src} — o alt descreve a imagem para quem não a vê`,
      );
    }
  }
});

test("toda foto citada no conteúdo existe no manifesto gerado", () => {
  const manifesto = JSON.parse(
    readFileSync(path.join(raiz, "public/fotos-geradas/manifesto.json"), "utf8"),
  );
  for (const p of projetos) {
    const citadas = [p.abertura, ...p.fotos.map((f) => f.src)];
    for (const src of citadas) {
      assert.ok(
        manifesto[src],
        `${p.slug}: a foto ${src} não foi gerada. Coloque o arquivo em public/fotos/ e rode "npm run fotos".`,
      );
    }
  }
});

test("nenhuma foto de projeto fica sem variação pequena para o celular", () => {
  const manifesto = JSON.parse(
    readFileSync(path.join(raiz, "public/fotos-geradas/manifesto.json"), "utf8"),
  );
  for (const [src, entrada] of Object.entries(manifesto)) {
    assert.ok(
      entrada.disponiveis.includes(440) || entrada.largura < 440,
      `${src}: sem variação de 440px. Servir imagem de desktop no celular é o erro mais caro do projeto.`,
    );
  }
});

test("crédito de arquiteto só sai com autorização por escrito", () => {
  for (const p of projetos) {
    if (!p.arquiteto) continue;
    assert.ok("autorizado" in p.arquiteto, `${p.slug}: arquiteto sem campo "autorizado"`);
  }
});

test("os eixos de filtro saem sem repetição e ordenados", () => {
  const { ambientes, edificios } = eixosDeFiltro(projetos);
  assert.deepEqual(ambientes, [...new Set(ambientes)], "ambiente repetido no filtro");
  assert.deepEqual(edificios, [...new Set(edificios)], "edifício repetido no filtro");
  assert.deepEqual(ambientes, [...ambientes].sort((a, b) => a.localeCompare(b, "pt-BR")));
});

test('"outros projetos neste edifício" nunca inclui o próprio projeto', () => {
  for (const p of projetos) {
    for (const o of outrosNoEdificio(projetos, p)) {
      assert.notEqual(o.slug, p.slug, `${p.slug} apareceu na própria lista de "outros"`);
      assert.equal(o.edificio, p.edificio);
    }
  }
});

test("a camada de projetos continua funcionando, mesmo sem conteúdo", () => {
  // O conteúdo de projeto saiu quando o site passou a ser organizado por
  // ambiente: falta a informação de prédio e de arquiteto para montar um case.
  // O CÓDIGO fica, e este teste garante que ele não apodrece — o dia em que o
  // cliente trouxer os dados, a camada tem que subir sem conserto.
  // Ver docs/decisoes.md.
  let arquivos = [];
  try { arquivos = readdirSync(path.join(raiz, "conteudo/projetos")); } catch { /* pasta pode não existir */ }
  assert.ok(Array.isArray(todosOsProjetos()), "a leitura de projetos quebrou");
  assert.equal(
    todosOsProjetos().length,
    arquivos.filter((a) => a.endsWith(".md")).length,
    "a contagem de projetos não bate com os arquivos em conteudo/projetos/",
  );
});

test("todo projeto de exemplo está marcado como exemplo", () => {
  // A Fase 4 usa dados inventados. A trava de deploy da Fase 8 lê esta marca.
  for (const p of projetos) {
    assert.equal(
      p.exemplo,
      true,
      `${p.slug}: se este projeto já é real, remova "exemplo: true" do frontmatter`,
    );
  }
});

test("toda foto declara o ambiente, e ele está na lista do projeto", () => {
  for (const p of projetos) {
    for (const f of p.fotos) {
      assert.ok(f.ambiente, `${p.slug}: foto ${f.src} sem ambiente`);
      assert.ok(
        p.ambientes.includes(f.ambiente),
        `${p.slug}: foto de "${f.ambiente}" fora da lista do projeto`,
      );
    }
  }
});

test("todo ambiente declarado existe na lista canônica", () => {
  for (const p of projetos) {
    for (const a of p.ambientes) {
      assert.ok(
        NOMES_DE_AMBIENTE.includes(a),
        `${p.slug}: ambiente "${a}" fora de lib/ambientes.ts — em trinta projetos, ` +
          `"Cozinha" e "cozinha" viram dois filtros para a mesma coisa`,
      );
    }
  }
});

test("a pasta da foto bate com a unidade e com o ambiente declarados", () => {
  // A pasta é dado, não organização. Ver public/fotos/LEIA-ME.md.
  for (const p of projetos) {
    const raizEsperada = p.unidades.length === 2 ? "comum" : p.unidades[0];
    for (const f of p.fotos) {
      const [, raiz, pastaAmbiente] = f.src.split("/").filter(Boolean);
      assert.equal(raiz, raizEsperada, `${p.slug}: ${f.src} na raiz errada`);
      assert.equal(
        pastaAmbiente,
        ambientePorNome(f.ambiente)?.slug,
        `${p.slug}: ${f.src} na pasta de ambiente errada`,
      );
    }
  }
});

test("a foto de abertura é uma das fotos do projeto", () => {
  for (const p of projetos) {
    assert.ok(
      p.fotos.some((f) => f.src === p.abertura),
      `${p.slug}: a abertura aponta para uma foto que não está na galeria`,
    );
  }
});
