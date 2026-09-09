/**
 * sitemap.xml — o mapa que o Google lê.
 *
 * O que é: a lista de todas as URLs DESTA unidade, gerada do config e do
 * conteúdo. Cada build produz o seu: o sitemap de Caraguá nunca cita uma
 * página de São José dos Campos, e vice-versa.
 *
 * Onde é usado: servido em /sitemap.xml, e apontado pelo robots.txt.
 *
 * As páginas de ambiente vêm em primeiro lugar depois da home porque são a
 * porta de entrada da busca orgânica — ver a seção 3.3 do docs/direcao-site.md.
 *
 * `/projetos` NÃO entra enquanto estiver sem conteúdo: sitemap que aponta para
 * índice vazio ensina o Google que o site tem página fraca.
 */
import type { MetadataRoute } from "next";

import { unidade } from "../config/derivados.ts";
import { ambientesDaUnidade } from "../lib/ambientes-da-unidade.ts";
import { projetosDaUnidade } from "../lib/projetos-da-unidade.ts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = unidade.dominio;
  const agora = new Date();

  const fixas: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/ambientes`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/a-loja`, changeFrequency: "yearly", priority: 0.8 },
    { url: `${base}/a-dalmobile`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/arquitetos`, changeFrequency: "yearly", priority: 0.7 },
    // A política de privacidade é obrigação legal, não conteúdo de busca.
    { url: `${base}/privacidade`, changeFrequency: "yearly", priority: 0.1 },
  ];

  const ambientes: MetadataRoute.Sitemap = ambientesDaUnidade().map((a) => ({
    url: `${base}/ambientes/${a.slug}`,
    changeFrequency: "monthly",
    priority: 0.9,
    // As fotos do ambiente entram no sitemap: o site é 90% imagem, e a busca
    // por imagem é uma porta de entrada que a concorrência não trabalha.
    images: a.fotos.map((f) => `${base}${f.src}`),
  }));

  const projetos: MetadataRoute.Sitemap = projetosDaUnidade().map((p) => ({
    url: `${base}/projetos/${p.slug}`,
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  // /projetos só entra quando houver case publicado. Ver docs/pendencias.md.
  const indiceDeProjetos: MetadataRoute.Sitemap =
    projetos.length > 0
      ? [{ url: `${base}/projetos`, changeFrequency: "monthly", priority: 0.8 }]
      : [];

  return [...fixas, ...ambientes, ...indiceDeProjetos, ...projetos].map((e) => ({
    lastModified: agora,
    ...e,
  }));
}
