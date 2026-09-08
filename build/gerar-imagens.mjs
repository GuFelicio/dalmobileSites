/**
 * Gera as variações de cada foto no build, com sharp.
 *
 * O que é: lê cada foto de `public/fotos/` e escreve as larguras de
 * `LARGURAS` em `public/fotos-geradas/`, em WebP. O componente <Foto> monta o
 * `srcSet` a partir desses arquivos.
 *
 * Por que não é o next/image: o endpoint /_vinext/image depende do binding
 * `env.IMAGES`, que não existe na conta e é pago. E o shim de next/image do
 * vinext, quando recebe um `loader` próprio, **desliga o srcSet** e serve um
 * arquivo só — que é justamente o erro que este passo existe para evitar.
 * Ver docs/decisoes.md.
 *
 * Roda antes do build, pelo script `prebuild` do package.json.
 * É incremental: só regera o que mudou, comparando data de modificação.
 */
import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import sharp from "sharp";

const raiz = fileURLToPath(new URL("..", import.meta.url));
const ORIGEM = path.join(raiz, "public/fotos");
const DESTINO = path.join(raiz, "public/fotos-geradas");

/**
 * As larguras servidas. Escolhidas a partir da matriz de teste do CLAUDE.md,
 * não de uma lista genérica:
 *   440  → coluna única no iPhone padrão (390px) com folga de densidade
 *   880  → iPhone grande em 2x, e coluna única do tablet até 820px
 *   1240 → uma coluna da grade de 2 no notebook de 1280
 *   1920 → foto sangrando a largura toda no desktop
 * Acima da largura do original nada é gerado: ampliar só aumenta o arquivo.
 */
export const LARGURAS = [440, 880, 1240, 1920];

/** Qualidade do WebP. 82 é onde a diferença deixa de ser visível na foto. */
const QUALIDADE = 82;

/** Nome do arquivo gerado: `cozinha.webp` + 880 → `cozinha-880.webp`. */
export function nomeGerado(arquivo, largura) {
  const ext = path.extname(arquivo);
  return `${path.basename(arquivo, ext)}-${largura}.webp`;
}

async function existeEAtual(destino, origem) {
  try {
    const [d, o] = await Promise.all([stat(destino), stat(origem)]);
    return d.mtimeMs >= o.mtimeMs;
  } catch {
    return false;
  }
}

async function listarFotos(dir, prefixo = "") {
  let entradas;
  try {
    entradas = await readdir(dir, { withFileTypes: true });
  } catch (erro) {
    if (erro.code === "ENOENT") return []; // ainda não há fotos no projeto
    throw erro;
  }
  const fotos = [];
  for (const e of entradas) {
    const rel = path.join(prefixo, e.name);
    if (e.isDirectory()) fotos.push(...(await listarFotos(path.join(dir, e.name), rel)));
    else if (/\.(jpe?g|png|webp)$/i.test(e.name)) fotos.push(rel);
  }
  return fotos;
}

export async function gerar({ silencioso = false } = {}) {
  const fotos = await listarFotos(ORIGEM);
  if (fotos.length === 0) {
    if (!silencioso) console.log("  Nenhuma foto em public/fotos/ — nada a gerar.");
    return { geradas: 0, reaproveitadas: 0, manifesto: {} };
  }

  let geradas = 0;
  let reaproveitadas = 0;
  const manifesto = {};

  for (const foto of fotos) {
    const origem = path.join(ORIGEM, foto);
    const entrada = sharp(origem);
    const { width: larguraOriginal, height: alturaOriginal } = await entrada.metadata();

    // Nunca ampliar: uma foto de 1200px não vira 1920 de verdade, só pesa mais.
    const larguras = LARGURAS.filter((l) => l <= larguraOriginal);
    if (larguras.length === 0) larguras.push(larguraOriginal);

    await mkdir(path.join(DESTINO, path.dirname(foto)), { recursive: true });

    for (const largura of larguras) {
      const saida = path.join(DESTINO, path.dirname(foto), nomeGerado(foto, largura));
      if (await existeEAtual(saida, origem)) {
        reaproveitadas++;
        continue;
      }
      await sharp(origem).resize({ width: largura, withoutEnlargement: true })
        .webp({ quality: QUALIDADE })
        .toFile(saida);
      geradas++;
    }

    // O manifesto guarda o que o <Foto> precisa saber sem ler o disco:
    // proporção (para reservar espaço e não pular) e larguras disponíveis.
    manifesto[`/fotos/${foto}`] = {
      largura: larguraOriginal,
      altura: alturaOriginal,
      disponiveis: larguras,
      hash: createHash("sha1").update(await readFile(origem)).digest("hex").slice(0, 8),
    };
  }

  await writeFile(
    path.join(raiz, "public/fotos-geradas/manifesto.json"),
    JSON.stringify(manifesto, null, 2) + "\n",
  );

  if (!silencioso) {
    console.log(
      `  Fotos: ${geradas} variação(ões) gerada(s), ${reaproveitadas} reaproveitada(s), ` +
        `${Object.keys(manifesto).length} foto(s) no manifesto.`,
    );
  }
  return { geradas, reaproveitadas, manifesto };
}

// Executado direto pelo script de build (`npm run fotos`).
//
// pathToFileURL, e não `file://${process.argv[1]}`: o caminho deste projeto tem
// espaço ("Site Dalmobile"), que a URL codifica como %20 e o argv não. A
// comparação ingênua nunca casava, e o passo de imagem passou a NÃO RODAR em
// silêncio — build verde, nenhuma variação gerada, foto de desktop no celular.
if (import.meta.url === pathToFileURL(process.argv[1]).href) await gerar();
