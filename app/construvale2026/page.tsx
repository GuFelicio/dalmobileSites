/**
 * /construvale2026 — a página do QR code do estande da Construvale 2026.
 *
 * O que é: uma página ISOLADA do site (11/11/2026). A pessoa lê o QR code no
 * estande, deixa nome e telefone e baixa a apresentação em PDF. Sem cabeçalho,
 * sem rodapé do site e sem nenhum link para outra página dele: o logo não leva
 * a lugar nenhum, e o aviso de privacidade fica aqui mesmo. Fora da busca
 * (noindex no HTML, X-Robots-Tag no _headers, fora do sitemap).
 *
 * Onde é usado: só no site da unidade que tem `paginasExtras.construvale2026`
 * no config. Nas outras a rota responde 404, e o build não leva nada dela
 * (build/podar-fotos.mjs e build/exportar-estatico.mjs).
 *
 * Os dados vão para uma planilha do Google por um Apps Script, direto do
 * navegador (components/construvale/FormularioConstruvale.tsx). Nada de server
 * action: o site continua exportável em HTML estático.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Brand } from "../../components/layout/Brand";
import FormularioConstruvale from "../../components/construvale/FormularioConstruvale";
import { linkWhatsApp, unidade } from "../../config/derivados";
import { metadataDaPagina } from "../../lib/seo.ts";
import estilos from "./construvale.module.css";

const pagina = unidade.paginasExtras?.construvale2026;

export const metadata: Metadata = pagina
  ? {
      ...metadataDaPagina({
        titulo: `Construvale 2026 · apresentação da Dalmóbile ${unidade.cidade}`,
        descricao: `Baixe a apresentação da Dalmóbile ${unidade.cidade} em PDF.`,
        caminho: "/construvale2026/",
        foto: unidade.compartilhamento,
      }),
      // Fora da busca: só quem tem o QR code chega aqui.
      robots: { index: false, follow: false },
    }
  : {};

export default function Construvale2026() {
  if (!pagina) notFound();

  return (
    <div className={estilos.pagina}>
      <main className={estilos.coluna}>
        {/* A mesma imagem da abertura da home (o quadro do vídeo), vertical no
            celular e horizontal acima: foto e não vídeo, porque no estande o
            sinal é 4G ruim. Sem nada por cima. */}
        <picture className={estilos.foto}>
          <source media="(max-width: 600px)" srcSet="/videos/hero-loop-mobile-poster.jpg" />
          <img src="/videos/hero-loop-poster.jpg" alt="" fetchPriority="high" />
        </picture>

        <div className={estilos.marca}>
          {/* Sem link: a página não leva a outra parte do site. */}
          <Brand className={estilos.logo} />
        </div>

        <div className={estilos.conteudo}>
          <p className={estilos.rotulo}>CONSTRUVALE 2026</p>
          <h1 className={estilos.titulo}>Leve a apresentação da Dalmóbile com você</h1>
          <p className={estilos.apoio}>{pagina.apoio}</p>

          <FormularioConstruvale
            appsScript={pagina.appsScript}
            pdf={pagina.pdf}
            whatsapp={linkWhatsApp()}
            telefone={unidade.telefone}
          />
        </div>

        {/* Rodapé curto, só texto: as duas lojas, sem link. */}
        <footer className={estilos.rodape}>
          <p className={estilos.assinatura}>Dalmóbile · Crie seu mundo</p>
          {pagina.lojas.map((loja) => (
            <p key={loja} className={estilos.loja}>
              {loja}
            </p>
          ))}
        </footer>
      </main>
    </div>
  );
}
