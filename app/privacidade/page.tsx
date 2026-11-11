/**
 * /privacidade — a política de privacidade.
 *
 * O que é: exigência da LGPD. Texto simples, em superfície papel, conforme a
 * seção 10 do docs/direcao-site.md.
 *
 * Onde é usado: rota própria, linkada do rodapé de toda página e, quando o
 * formulário existir, ao lado do checkbox de consentimento.
 *
 * ATENÇÃO: este texto descreve o que o site faz HOJE — não coleta dado nenhum,
 * porque o formulário ainda não existe. Quando a seção 11 da direção for
 * implementada, ESTE ARQUIVO PRECISA SER REVISTO junto, e de preferência lido
 * por quem responde juridicamente pela loja.
 */
import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "../../components/layout/Footer";
import { Header } from "../../components/layout/Header";
import { Section } from "../../components/layout/Section";
import { enderecoEmLinha, linkTelefone, linkWhatsApp, unidade } from "../../config/derivados.ts";
import { metadataDaPagina } from "../../lib/seo.ts";
import estilos from "./privacidade.module.css";

export const metadata: Metadata = {
  ...metadataDaPagina({
    titulo: `Política de privacidade | Dalmóbile ${unidade.cidade}`,
    descricao: `Como a Dalmóbile ${unidade.cidade} trata os dados de quem visita o site.`,
    caminho: "/privacidade",
    // A mesma foto de preview da home, do config: sem foto, o link
    // compartilhado no WhatsApp saía sem preview (checklist do CLAUDE.md).
    foto: unidade.compartilhamento,
  }),
  // Obrigação legal, não conteúdo de busca: fica fora do índice, mas os links
  // dela continuam sendo seguidos.
  robots: { index: false, follow: true },
};

export default function Privacidade() {
  const temCadastro = Boolean(unidade.paginasExtras?.construvale2026);
  return (
    <>
      <Header />

      <Section superficie="papel">
        <h1 className={estilos.titulo}>Política de privacidade</h1>
        {/* Data FIXA, da última alteração real do texto. Não usar a data de hoje:
            a página se atualizaria sozinha todo dia e perderia a função.
            Mudou o texto? mude esta data junto. */}
        <p className={estilos.atualizado}>
          {/* A unidade com a página de cadastro da Construvale mudou o texto em
              11/11/2026; a outra continua com o de 06/10/2026. */}
          Atualizada em {temCadastro ? "11 de novembro de 2026" : "6 de outubro de 2026"}.
        </p>

        <div className={estilos.texto}>
          <h2>Quem somos</h2>
          <p>
            {/* Endereço com vírgulas, sem travessão, e o número abrindo o
                WhatsApp da unidade (docs/copy-home-v5.md). */}
            Dalmóbile {unidade.nome}, com showroom em {enderecoEmLinha()}. Telefone{" "}
            <a href={linkWhatsApp() ?? linkTelefone()}>{unidade.telefone}</a>.
          </p>

          <h2>Que dados este site coleta</h2>
          {/* ATENÇÃO: "não usa cookie de rastreamento" precisa continuar
              verdadeiro depois do go-live. Se GA4 ou pixel entrarem — e a
              direção prevê os dois —, esta página tem que ser reescrita
              ANTES, não depois. É contradição de LGPD, não de copy. */}
          {/* Na unidade com /construvale2026 o site passou a coletar nome e
              telefone naquela página (11/11/2026). O texto vem da unidade: a
              outra não tem a página, e a frase dela continua verdadeira. */}
          {temCadastro ? (
            <p>
              <strong>Nenhum, com uma exceção.</strong> O site não tem cadastro e não usa cookie
              de rastreamento. A página da apresentação da Construvale 2026, aberta pelo QR code
              do estande, pede nome e telefone (e-mail é opcional) para liberar o download.
              Esses dados ficam só com a Dalmóbile e são usados para enviar a apresentação e
              falar sobre o seu projeto. Se você falar com a gente pelo WhatsApp ou pelo
              telefone, ficam registrados o seu contato e o que você contou sobre o projeto,
              usados só para responder e tocar o seu projeto, e por mais ninguém.
            </p>
          ) : (
            <p>
              <strong>Nenhum.</strong> Este site não tem formulário, não pede cadastro e não usa
              cookie de rastreamento. Se você falar com a gente pelo WhatsApp ou pelo telefone,
              aí sim ficam registrados o seu contato e o que você contou sobre o projeto,
              usados só para responder e tocar o seu projeto, e por mais ninguém.
            </p>
          )}

          <h2>Com quem compartilhamos</h2>
          <p>
            Com ninguém. Não vendemos, não cedemos e não trocamos dado de cliente. O site é
            hospedado na Cloudflare, que registra endereços de acesso para operar o serviço,
            como qualquer servidor faz.
          </p>

          <h2>Seus direitos</h2>
          <p>
            A LGPD garante a você pedir acesso, correção ou exclusão dos seus dados a qualquer
            momento. Basta falar com a loja pelo telefone acima.
          </p>

          <h2>Quando isto mudar</h2>
          <p>
            Se o site passar a ter formulário de contato ou medição de audiência, esta página é
            atualizada antes, com a data de revisão no topo.
          </p>
        </div>

        <p className={estilos.volta}>
          <Link href="/">Voltar para a página inicial</Link>
        </p>
      </Section>

      <Footer />
    </>
  );
}
