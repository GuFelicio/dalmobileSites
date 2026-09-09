/**
 * robots.txt — o que o buscador pode rastrear.
 *
 * O que é: a permissão de rastreamento e o endereço do sitemap DESTA unidade,
 * gerados do config. Cada build produz o seu.
 *
 * Onde é usado: servido em /robots.txt.
 *
 * O que fica de fora do rastreamento, e por quê:
 *   /_vinext/  → endpoint interno, não é página
 *   /projetos  → índice sem conteúdo enquanto a camada estiver dormente
 */
import type { MetadataRoute } from "next";

import { unidade } from "../config/derivados.ts";
import { projetosDaUnidade } from "../lib/projetos-da-unidade.ts";

export default function robots(): MetadataRoute.Robots {
  const semProjetos = projetosDaUnidade().length === 0;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/_vinext/", ...(semProjetos ? ["/projetos"] : [])],
    },
    sitemap: `${unidade.dominio}/sitemap.xml`,
    host: unidade.dominio,
  };
}
