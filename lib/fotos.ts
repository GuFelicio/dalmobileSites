/**
 * URLs das variações de foto geradas no build.
 *
 * O que é: a tradução entre o caminho do original (`/fotos/...`, que é o que o
 * conteúdo escreve) e o das variações que `build/gerar-imagens.mjs` produz.
 *
 * Onde é usado: components/midia/Foto.tsx e a metadata OpenGraph dos cases.
 *
 * Fica separado do componente porque a metadata roda no servidor, sem React, e
 * precisa da mesma conta — duas implementações da mesma regra divergem.
 */
import manifesto from "../public/fotos-geradas/manifesto.json" with { type: "json" };

export type EntradaDoManifesto = {
  largura: number;
  altura: number;
  disponiveis: number[];
};

const fotos = manifesto as Record<string, EntradaDoManifesto>;

export function entradaDaFoto(src: string): EntradaDoManifesto | undefined {
  return fotos[src];
}

/** `/fotos/a/b.webp` + 880 → `/fotos-geradas/a/b-880.webp` */
export function urlDaVariacao(src: string, largura: number): string {
  const semExtensao = src.replace(/\.[^.]+$/, "");
  return `${semExtensao.replace("/fotos/", "/fotos-geradas/")}-${largura}.webp`;
}

/**
 * A variação para o preview de link (OpenGraph).
 *
 * Mira 1240px: é o que o WhatsApp e o LinkedIn usam sem reamostrar, e evita
 * mandar o original — que numa foto de ensaio real passa fácil de 3 MB, e o
 * preview é a primeira coisa que o cliente vê.
 */
export function urlParaPreview(src: string): string {
  const entrada = entradaDaFoto(src);
  if (!entrada) return src;
  const alvo = 1240;
  const escolhida =
    entrada.disponiveis.find((l) => l >= alvo) ??
    entrada.disponiveis[entrada.disponiveis.length - 1];
  return urlDaVariacao(src, escolhida);
}
