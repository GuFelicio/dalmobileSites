/**
 * Tira do build de uma unidade as fotos que não são dela.
 *
 * O que é: o Vite copia `public/` inteiro para `dist/client/` — inclusive as
 * fotos da OUTRA unidade e as de `comum/` que esta não usa. Nada disso é
 * referenciado pela página, mas ia ao ar mesmo assim: o site de SJC servia as
 * fotos de Caraguá, e vice-versa. Este passo apaga, em `dist/client/fotos/` e
 * `dist/client/fotos-geradas/`:
 *   - a pasta da outra unidade;
 *   - em `comum/`, tudo que não for a foto de compartilhamento desta unidade
 *     (`compartilhamento` no config) ou uma variação dela.
 *
 * Onde é usado: no fim de `npm run build:sjc` e `npm run build:caragua`
 * (package.json). Criado na v6 (07/10/2026), quando SJC trocou o acervo de
 * fotos e o critério passou a ser "o build de SJC não contém foto antiga".
 *
 *   node build/podar-fotos.mjs sjc
 */
import { readdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const raiz = fileURLToPath(new URL("..", import.meta.url));
const UNIDADES = ["sjc", "caragua"];

async function listar(dir, prefixo = "") {
  let entradas;
  try {
    entradas = await readdir(dir, { withFileTypes: true });
  } catch (erro) {
    if (erro.code === "ENOENT") return [];
    throw erro;
  }
  const arquivos = [];
  for (const e of entradas) {
    const rel = path.join(prefixo, e.name);
    if (e.isDirectory()) arquivos.push(...(await listar(path.join(dir, e.name), rel)));
    else arquivos.push(rel);
  }
  return arquivos;
}

export async function podar(unidade) {
  if (!UNIDADES.includes(unidade)) throw new Error(`Unidade desconhecida: "${unidade}". Use ${UNIDADES.join(" ou ")}.`);
  const { unidade: config } = await import(pathToFileURL(path.join(raiz, "config", `${unidade}.ts`)).href);
  // "/fotos/comum/capa/casa-completa.webp" → "comum/capa/casa-completa"
  const manter = config.compartilhamento.replace(/^\/fotos\//, "").replace(/\.[^.]+$/, "");

  let removidos = 0;
  for (const pasta of ["fotos", "fotos-geradas"]) {
    const base = path.join(raiz, "dist/client", pasta);
    for (const outra of UNIDADES.filter((u) => u !== unidade)) {
      const alvo = path.join(base, outra);
      removidos += (await listar(alvo)).length;
      await rm(alvo, { recursive: true, force: true });
    }
    for (const arquivo of await listar(path.join(base, "comum"))) {
      const semExtensao = path.join("comum", arquivo).replace(/\.[^.]+$/, "");
      // A mestra ("…/casa-completa") e as variações ("…/casa-completa-1240").
      if (semExtensao === manter || new RegExp(`^${manter}-\\d+$`).test(semExtensao)) continue;
      await rm(path.join(base, "comum", arquivo));
      removidos++;
    }
  }
  console.log(`  Fotos: ${removidos} arquivo(s) de fora da unidade "${unidade}" tirado(s) do build.`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  await podar(process.argv[2]);
}
