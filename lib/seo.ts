/**
 * Metadata compartilhada entre as páginas.
 *
 * O que é: a montagem de OpenGraph e do link canônico, para nenhuma página
 * precisar repetir a mesma conta — e para nenhuma esquecer.
 *
 * Onde é usado: por toda página que exporta `metadata` ou `generateMetadata`.
 *
 * POR QUE OPENGRAPH IMPORTA AQUI: o vendedor manda o link no WhatsApp, e o
 * preview É o produto naquele momento. Uma página sem `og:image` chega ao
 * cliente como um retângulo cinza com o domínio escrito. Ver o checklist
 * "Obrigatório antes de qualquer deploy" do CLAUDE.md.
 */
import type { Metadata } from "next";

import { unidade } from "../config/derivados.ts";
import { urlParaPreview } from "./fotos.ts";

export function metadataDaPagina({
  titulo,
  descricao,
  caminho,
  foto,
  tipo = "website",
}: {
  titulo: string;
  descricao: string;
  /** Começando com "/". É o que vira o canônico e a url do OpenGraph. */
  caminho: string;
  /** Caminho da foto em /fotos/. A variação de preview é escolhida sozinha. */
  foto?: string;
  tipo?: "website" | "article";
}): Metadata {
  const url = `${unidade.dominio}${caminho === "/" ? "" : caminho}`;
  const imagem = foto ? `${unidade.dominio}${urlParaPreview(foto)}` : undefined;

  return {
    title: titulo,
    description: descricao,
    alternates: { canonical: url },
    openGraph: {
      title: titulo,
      description: descricao,
      url,
      siteName: `Dalmóbile ${unidade.cidade}`,
      locale: "pt_BR",
      type: tipo,
      images: imagem ? [{ url: imagem }] : undefined,
    },
    twitter: {
      card: imagem ? "summary_large_image" : "summary",
      title: titulo,
      description: descricao,
      images: imagem ? [imagem] : undefined,
    },
  };
}
