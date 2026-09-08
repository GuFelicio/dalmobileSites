// Guarda as regras da Fase 1 que são fáceis de quebrar sem perceber.
// Ver docs/design-system.md e a seção "Design" do CLAUDE.md.
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const ARQUIVO_DE_TOKENS = path.join("app", "tokens.css");
const PASTAS = ["app", "components", "worker", "build", "lib", "config"];
const EXTENSOES = new Set([".css", ".ts", ".tsx"]);

async function fontes() {
  const encontrados = [];
  async function varrer(diretorio) {
    let entradas;
    try {
      entradas = await readdir(path.join(root, diretorio), { withFileTypes: true });
    } catch (erro) {
      if (erro.code === "ENOENT") return; // pasta ainda não existe nesta fase
      throw erro;
    }
    for (const entrada of entradas) {
      const relativo = path.join(diretorio, entrada.name);
      if (entrada.isDirectory()) await varrer(relativo);
      else if (EXTENSOES.has(path.extname(entrada.name))) encontrados.push(relativo);
    }
  }
  for (const pasta of PASTAS) await varrer(pasta);
  return encontrados;
}

// Remove comentários /* */ e // para não acusar exemplo escrito em comentário.
function semComentarios(texto) {
  return texto.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
}

test("nenhuma cor literal fora de app/tokens.css", async () => {
  const infratores = [];
  for (const arquivo of await fontes()) {
    if (arquivo === ARQUIVO_DE_TOKENS) continue;
    const conteudo = semComentarios(await readFile(path.join(root, arquivo), "utf8"));
    conteudo.split("\n").forEach((linha, indice) => {
      // hex de cor, e rgb()/rgba() com valores numéricos
      if (/#[0-9a-fA-F]{3,8}\b/.test(linha) || /\brgba?\(\s*[\d.]/.test(linha)) {
        infratores.push(`${arquivo}:${indice + 1}  ${linha.trim()}`);
      }
    });
  }
  assert.deepEqual(
    infratores,
    [],
    `Cor literal fora do arquivo de tokens. Toda cor vem de token — ver docs/design-system.md:\n${infratores.join("\n")}`,
  );
});

test("nenhum 100vh: a barra do navegador móvel quebra vh", async () => {
  const infratores = [];
  for (const arquivo of await fontes()) {
    const conteudo = semComentarios(await readFile(path.join(root, arquivo), "utf8"));
    conteudo.split("\n").forEach((linha, indice) => {
      if (/\b100vh\b/.test(linha)) infratores.push(`${arquivo}:${indice + 1}  ${linha.trim()}`);
    });
  }
  assert.deepEqual(infratores, [], `Usar 100svh no lugar de 100vh:\n${infratores.join("\n")}`);
});

test("a Krub carrega só os pesos 300, 400 e 600", async () => {
  const layout = await readFile(path.join(root, "app", "layout.tsx"), "utf8");
  const pesos = [...layout.matchAll(/@fontsource\/krub\/(\d+)(-italic)?\.css/g)].map((m) => m[1]);
  const proibidos = pesos.filter((peso) => !["300", "400", "600"].includes(peso));
  assert.deepEqual(proibidos, [], `Peso de fonte fora da escala do CLAUDE.md: ${proibidos.join(", ")}`);
  assert.ok(pesos.length > 0, "nenhum peso da Krub importado");
});
