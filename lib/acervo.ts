/**
 * As fotos da home: o carrossel de projetos e as quatro fotos avulsas.
 *
 * O que é: a única porta de foto da home. Se a unidade tem `acervo` no config
 * (v6, 07/10/2026), as fotos vêm dele, na ordem dele. Se não tem, vêm de
 * conteudo/ambientes/*.md, intercaladas entre os ambientes. Nos dois casos o
 * carrossel mostra só "01 / AMBIENTE" e o crédito "Projeto / <arquiteto>",
 * sem título (08/10/2026: valia só para o acervo, passou a valer para as duas).
 *
 * Onde é usado: app/page.tsx (carrossel e fotos avulsas) e app/sitemap.ts.
 *
 * O texto alternativo do acervo segue um formato só, porque não temos a
 * descrição de cada cena: "<Ambiente> planejad<o|a> pela Dalmóbile, projeto de
 * <Arquiteto>".
 */
import type { AmbienteDoAcervo, FotoDoAcervo } from "../config/tipos.ts";
import { unidade } from "../config/derivados.ts";
import { ambientesDaUnidade, escolherFoto } from "./ambientes-da-unidade.ts";
import type { FotoDoSlider } from "../components/midia/SliderDeFotos";

/**
 * Rótulo (vira caixa alta no "01 / COZINHA") e o começo do alt, já com a
 * concordância: "Cozinha planejada", "Living planejado", "Sala de TV planejada".
 */
export const AMBIENTES_DO_ACERVO: Record<AmbienteDoAcervo, { nome: string; planejado: string }> = {
  cozinha: { nome: "Cozinha", planejado: "Cozinha planejada" },
  living: { nome: "Living", planejado: "Living planejado" },
  "sala-tv": { nome: "Sala de TV", planejado: "Sala de TV planejada" },
  dormitorio: { nome: "Dormitório", planejado: "Dormitório planejado" },
  "home-office": { nome: "Home office", planejado: "Home office planejado" },
  closet: { nome: "Closet", planejado: "Closet planejado" },
  banheiro: { nome: "Banheiro", planejado: "Banheiro planejado" },
  corporativo: { nome: "Corporativo", planejado: "Ambiente corporativo planejado" },
};

/** Caminho da mestra, como o <Foto> espera: /fotos/<unidade>/acervo/<arquivo>.webp */
export function srcDoAcervo(arquivo: string): string {
  return `/fotos/${unidade.id}/acervo/${arquivo}.webp`;
}

export function altDoAcervo(foto: FotoDoAcervo): string {
  return `${AMBIENTES_DO_ACERVO[foto.ambiente].planejado} pela Dalmóbile, projeto de ${foto.arquiteto}`;
}

/** As fotos do carrossel, na ordem em que aparecem. */
export function fotosDoCarrossel(): FotoDoSlider[] {
  if (unidade.acervo) {
    return unidade.acervo.carrossel.map((f) => ({
      src: srcDoAcervo(f.arquivo),
      alt: altDoAcervo(f),
      ambienteNome: AMBIENTES_DO_ACERVO[f.ambiente].nome,
      edificio: null,
      arquiteto: f.arquiteto,
    }));
  }

  // Sem acervo: TODAS as fotos de conteudo/ambientes/, INTERCALADAS entre os
  // ambientes. O slider mostra três por conjunto, e agrupadas por ambiente os
  // primeiros conjuntos seriam só cozinha.
  const porAmbiente = ambientesDaUnidade().map((ambiente) =>
    ambiente.fotos.map((foto) => ({
      src: foto.src,
      // Sem título, como no acervo (08/10/2026, pedido do cliente): o
      // carrossel mostra só o ambiente e o crédito nos dois sites. O campo
      // `titulo` continua no conteúdo, mas não vai mais ao ar.
      alt: foto.alt,
      ambienteNome: ambiente.nome,
      edificio: foto.edificio,
      arquiteto: foto.arquiteto,
    })),
  );
  const fotos: FotoDoSlider[] = [];
  for (let volta = 0; volta < Math.max(0, ...porAmbiente.map((f) => f.length)); volta++) {
    for (const lista of porAmbiente) if (lista[volta]) fotos.push(lista[volta]);
  }
  return fotos;
}

/** Uma foto avulsa da home: src, alt e, quando houver, o arquiteto. */
export type FotoAvulsa = { src: string; alt: string; arquiteto: string | null };

export type LugarNaHome = "manifesto" | "fabrica" | "arquitetos" | "showroom";

/**
 * As quatro fotos avulsas da home. Com acervo, vêm de `acervo.home` no config.
 * Sem acervo, da escolha que a home sempre fez em conteudo/ambientes/.
 */
export function fotosDaHome(): Record<LugarNaHome, FotoAvulsa | undefined> {
  if (unidade.acervo) {
    const todas = [...unidade.acervo.carrossel, ...unidade.acervo.avulsas];
    const achar = (arquivo: string): FotoAvulsa | undefined => {
      const f = todas.find((x) => x.arquivo === arquivo);
      return f ? { src: srcDoAcervo(f.arquivo), alt: altDoAcervo(f), arquiteto: f.arquiteto } : undefined;
    };
    const { manifesto, fabrica, arquitetos, showroom } = unidade.acervo.home;
    return { manifesto: achar(manifesto), fabrica: achar(fabrica), arquitetos: achar(arquitetos), showroom: achar(showroom) };
  }

  const ambientes = ambientesDaUnidade();
  const manifesto = escolherFoto(ambientes, ["sala-de-estar", "cozinha"], 3);
  const fabrica = escolherFoto(ambientes, ["cozinha", "banheiro"], 7);
  const showroom = escolherFoto(ambientes, ["quartos", "sala-de-estar"], 5);
  // A da seção de arquitetos: de projeto COM arquiteto creditado, e nenhuma das
  // três acima. Sala primeiro, por mostrar mais marcenaria num quadro só.
  const usadas = new Set([manifesto?.src, fabrica?.src, showroom?.src]);
  const arquitetos = ["sala-de-estar", "cozinha", "quartos", "banheiro"]
    .flatMap((slug) => ambientes.find((a) => a.slug === slug)?.fotos ?? [])
    .find((f) => f.arquiteto && !usadas.has(f.src));
  const avulsa = (f?: { src: string; alt: string; arquiteto: string | null }): FotoAvulsa | undefined =>
    f ? { src: f.src, alt: f.alt, arquiteto: f.arquiteto } : undefined;
  return { manifesto: avulsa(manifesto), fabrica: avulsa(fabrica), arquitetos: avulsa(arquitetos), showroom: avulsa(showroom) };
}
