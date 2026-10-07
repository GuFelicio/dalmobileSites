// O acervo de fotos de uma unidade no config (v6, 07/10/2026: SJC). Confere o
// que a ordem e os créditos prometem, e que cada foto existe de verdade.
// Lê os configs direto, não o HTML: a regra é do dado, valha para qualquer build.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { UNIDADES } from "./unidade-do-build.mjs";

const manifesto = JSON.parse(await readFile(new URL("../public/fotos-geradas/manifesto.json", import.meta.url), "utf8"));
const comAcervo = UNIDADES.filter((u) => u.acervo);

test("ao menos uma unidade tem acervo próprio", () => {
  assert.ok(comAcervo.length > 0, "nenhum config declara `acervo`");
});

for (const u of comAcervo) {
  const { carrossel, avulsas, home } = u.acervo;
  const todas = [...carrossel, ...avulsas];

  test(`${u.id}: o carrossel nunca põe duas fotos seguidas do mesmo arquiteto nem do mesmo ambiente`, () => {
    for (let i = 1; i < carrossel.length; i++) {
      const [a, b] = [carrossel[i - 1], carrossel[i]];
      assert.notEqual(a.arquiteto, b.arquiteto, `posições ${i} e ${i + 1}: ${a.arquivo} e ${b.arquivo} são de ${a.arquiteto}`);
      assert.notEqual(a.ambiente, b.ambiente, `posições ${i} e ${i + 1}: ${a.arquivo} e ${b.arquivo} são ${a.ambiente}`);
    }
  });

  test(`${u.id}: toda foto do acervo existe, com as variações geradas, e aparece uma vez só`, () => {
    const vistos = new Set();
    for (const f of todas) {
      assert.ok(!vistos.has(f.arquivo), `${f.arquivo} está duas vezes no acervo`);
      vistos.add(f.arquivo);
      const entrada = manifesto[`/fotos/${u.id}/acervo/${f.arquivo}.webp`];
      assert.ok(entrada, `${f.arquivo}: não está em public/fotos/${u.id}/acervo/ (rodou npm run fotos?)`);
      assert.ok(entrada.disponiveis.includes(440), `${f.arquivo}: sem a variação de 440px para o celular`);
    }
  });

  test(`${u.id}: as fotos avulsas da home e a de compartilhamento são do acervo`, () => {
    for (const [lugar, arquivo] of Object.entries(home)) {
      assert.ok(todas.some((f) => f.arquivo === arquivo), `home.${lugar}: "${arquivo}" não está no acervo`);
    }
    assert.match(u.compartilhamento, new RegExp(`^/fotos/${u.id}/acervo/`), "o preview do link não vem do acervo");
  });

  test(`${u.id}: o crédito é um nome, não o texto do arquivo`, () => {
    for (const f of todas) {
      assert.doesNotMatch(f.arquiteto, /[a-z][A-Z]|-|\d/, `${f.arquivo}: "${f.arquiteto}" parece o nome do arquivo`);
    }
  });
}
