/**
 * sitemap.xml — o mapa que o Google lê.
 *
 * O que é: as URLs DESTA unidade. Cada build produz o seu: o sitemap de Caraguá
 * nunca cita uma página de São José dos Campos, e vice-versa.
 *
 * Onde é usado: servido em /sitemap.xml, e apontado pelo robots.txt.
 *
 * Desde a v5 (06/10/2026) o site é uma página só: a home e a política de
 * privacidade. As páginas internas antigas respondem 301 para as seções da
 * home (worker/index.ts) e não entram aqui. As fotos do acervo continuam no
 * sitemap, presas à home: a busca por imagem é porta de entrada que a
 * concorrência não trabalha.
 */
import type { MetadataRoute } from "next";

import { unidade } from "../config/derivados.ts";
import { fotosDoCarrossel } from "../lib/acervo.ts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = unidade.dominio;
  const agora = new Date();
  const fotos = fotosDoCarrossel().map((f) => `${base}${f.src}`);

  return [
    { url: `${base}/`, lastModified: agora, changeFrequency: "monthly", priority: 1, images: fotos },
    // A política de privacidade é obrigação legal, não conteúdo de busca.
    { url: `${base}/privacidade`, lastModified: agora, changeFrequency: "yearly", priority: 0.1 },
  ];
}
