/**
 * Processa o acervo de fotos de uma unidade: dos originais fora do git para as
 * versões que o site usa.
 *
 * O que é: lê `fotos-originais/<unidade>/*.jpg` (os JPGs da fotografia, de 2 a
 * 19 MB, que NÃO entram no repositório — ver .gitignore) e escreve, para cada
 * um, uma versão-mestra em `public/fotos/<unidade>/acervo/<nome>.webp`:
 *   - girada conforme o EXIF de orientação e SEM EXIF nenhum (o sharp não
 *     copia metadados para a saída; a rotação é aplicada antes);
 *   - com no máximo 1920px de largura, na proporção original;
 *   - WebP de qualidade 90, porque ainda vai passar por build/gerar-imagens.mjs,
 *     que gera as larguras servidas (440 / 880 / 1240 / 1920).
 *
 * Quando rodar: só quando a fotografia entregar fotos novas. Não faz parte do
 * build — o build usa as mestras já versionadas em public/fotos/.
 *
 *   node build/processar-acervo.mjs sjc
 *
 * NOMES (padrão do acervo, v6 — 07/10/2026): o original se chama
 * `Ambiente-NomeDoArquiteto.jpg`, às vezes com número no fim ("…2.jpg",
 * "…(2).jpg"). O publicado sai em minúsculas, sem acento e sem espaço:
 *   Living-JulianaGuimarães2.jpg  →  living-juliana-guimaraes-2.webp
 *   banheiro-RafaelPires(2).jpg   →  banheiro-rafael-pires-2.webp
 * A ordem e os créditos de cada foto no site ficam em config/<unidade>.ts
 * (campo `acervo`), não aqui. Ver docs/adicionar-ambiente.md.
 */
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import sharp from "sharp";

const raiz = fileURLToPath(new URL("..", import.meta.url));

/** Largura máxima da mestra: a maior largura servida pelo site. */
const LARGURA_MESTRA = 1920;
/** Qualidade da mestra. Alta, porque ela ainda é reamostrada no build. */
const QUALIDADE_MESTRA = 90;

/**
 * "HomeOffice-SertãoArquitetura2.jpg" → "home-office-sertao-arquitetura-2".
 * CamelCase vira hífen, acento sai, "(2)" e "2" no fim viram "-2".
 */
export function nomePublicado(arquivo) {
  const base = path.basename(arquivo, path.extname(arquivo));
  return base
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // sem acento
    .replace(/\((\d+)\)$/, "$1") // "(2)" → "2"
    .replace(/([a-z])([A-Z])/g, "$1-$2") // CamelCase → hífen
    .replace(/([A-Za-z])(\d+)$/, "$1-$2") // número final separado
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

export async function processar(unidade) {
  const origem = path.join(raiz, "fotos-originais", unidade);
  const destino = path.join(raiz, "public/fotos", unidade, "acervo");
  let arquivos;
  try {
    arquivos = (await readdir(origem)).filter((a) => /\.jpe?g$/i.test(a)).sort();
  } catch (erro) {
    if (erro.code === "ENOENT") {
      throw new Error(`Pasta ${path.relative(raiz, origem)} não existe. Baixe os originais do Drive para lá.`);
    }
    throw erro;
  }
  await mkdir(destino, { recursive: true });

  const nomes = new Map();
  for (const arquivo of arquivos) {
    const nome = nomePublicado(arquivo);
    if (nomes.has(nome)) {
      throw new Error(`"${arquivo}" e "${nomes.get(nome)}" dariam o mesmo nome publicado: ${nome}`);
    }
    nomes.set(nome, arquivo);
    const info = await sharp(path.join(origem, arquivo))
      .rotate() // aplica o EXIF de orientação antes de descartá-lo
      .resize({ width: LARGURA_MESTRA, withoutEnlargement: true })
      .webp({ quality: QUALIDADE_MESTRA })
      .toFile(path.join(destino, `${nome}.webp`));
    console.log(`  ${arquivo}  →  ${nome}.webp  (${info.width}×${info.height}, ${Math.round(info.size / 1024)} KB)`);
  }
  console.log(`\n  ${arquivos.length} foto(s) em ${path.relative(raiz, destino)}/`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const unidade = process.argv[2];
  if (!unidade) {
    console.error("Uso: node build/processar-acervo.mjs <unidade>   (ex.: sjc)");
    process.exit(1);
  }
  await processar(unidade);
}
