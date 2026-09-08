// O erro que este arquivo existe para tornar impossível: o site anterior de
// Caraguatatuba foi ao ar indexado com "Móveis Planejados em São José dos
// Campos". Constrói as DUAS unidades de verdade e vasculha a saída.
//
// Ver docs/unidades.md e a seção "Conteúdo" do CLAUDE.md.
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

import { unidade as sjc } from "../config/sjc.ts";
import { unidade as caragua } from "../config/caragua.ts";

const executar = promisify(execFile);
const raiz = fileURLToPath(new URL("..", import.meta.url));

/** Constrói uma unidade e devolve todo o texto gerado, arquivo a arquivo. */
async function saidaDoBuild(id) {
  await executar("npx", ["vinext", "build"], {
    cwd: raiz,
    env: { ...process.env, UNIDADE: id },
    maxBuffer: 64 * 1024 * 1024,
  });

  const arquivos = [];
  async function varrer(dir) {
    for (const e of await readdir(path.join(raiz, dir), { withFileTypes: true })) {
      const rel = path.join(dir, e.name);
      if (e.isDirectory()) await varrer(rel);
      // Só o que carrega texto. Fonte e imagem não têm cidade dentro.
      else if (/\.(js|mjs|css|html|json|txt|xml)$/.test(e.name)) arquivos.push(rel);
    }
  }
  await varrer("dist");

  return Promise.all(
    arquivos.map(async (a) => ({ arquivo: a, texto: await readFile(path.join(raiz, a), "utf8") })),
  );
}

/**
 * A cidade da outra unidade pode aparecer SÓ dentro da URL do link cruzado do
 * rodapé — a cidade está no domínio, e o link para a outra loja é pedido pela
 * direção. Em qualquer outro lugar é o bug que derrubou o site anterior.
 */
function ocorrenciasProibidas(texto, cidadeProibida, urlDaOutraLoja) {
  const semALinkLegitimo = texto.split(urlDaOutraLoja).join("");
  const alvo = cidadeProibida.toLowerCase();
  const linhas = [];
  semALinkLegitimo.split("\n").forEach((linha, i) => {
    if (linha.toLowerCase().includes(alvo)) linhas.push(`linha ${i + 1}: ${linha.trim().slice(0, 160)}`);
  });
  return linhas;
}

test("o build de Caraguatatuba não cita São José dos Campos", async (t) => {
  t.diagnostic("constrói UNIDADE=caragua e vasculha dist/");
  const saida = await saidaDoBuild("caragua");
  const infratores = [];
  for (const { arquivo, texto } of saida) {
    for (const proibida of ["São José dos Campos", "Sao Jose dos Campos"]) {
      for (const linha of ocorrenciasProibidas(texto, proibida, caragua.outraUnidade.url)) {
        infratores.push(`${arquivo}  ${linha}`);
      }
    }
  }
  assert.deepEqual(infratores, [], `Cidade de SJC no build de Caraguá:\n${infratores.join("\n")}`);
});

test("o build de São José dos Campos não cita Caraguatatuba", async (t) => {
  t.diagnostic("constrói UNIDADE=sjc e vasculha dist/");
  const saida = await saidaDoBuild("sjc");
  const infratores = [];
  for (const { arquivo, texto } of saida) {
    for (const linha of ocorrenciasProibidas(texto, "Caraguatatuba", sjc.outraUnidade.url)) {
      infratores.push(`${arquivo}  ${linha}`);
    }
  }
  assert.deepEqual(infratores, [], `Cidade de Caraguá no build de SJC:\n${infratores.join("\n")}`);
});

test("as duas unidades declaram cidades diferentes e domínios diferentes", () => {
  assert.notEqual(sjc.cidade, caragua.cidade);
  assert.notEqual(sjc.dominio, caragua.dominio);
  assert.notEqual(sjc.id, caragua.id);
  // O link cruzado de cada uma aponta para o domínio da outra.
  assert.equal(sjc.outraUnidade.url, caragua.dominio);
  assert.equal(caragua.outraUnidade.url, sjc.dominio);
});

// A verificação de dados PENDENTES não vive aqui: ela é trava de deploy, em
// config/verificar-pendencias.mjs. Enquanto a loja não responde ela fica
// vermelha, e suíte que sempre falha deixa de ser sinal. Rode `npm run
// pendencias` para ver o que falta.
