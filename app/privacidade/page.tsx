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
import { enderecoEmLinha, linkTelefone, unidade } from "../../config/derivados.ts";
import { metadataDaPagina } from "../../lib/seo.ts";
import estilos from "./privacidade.module.css";

export const metadata: Metadata = {
  ...metadataDaPagina({
    titulo: `Política de privacidade | Dalmóbile ${unidade.cidade}`,
    descricao: `Como a Dalmóbile ${unidade.cidade} trata os dados de quem visita o site.`,
    caminho: "/privacidade",
  }),
  // Obrigação legal, não conteúdo de busca: fica fora do índice, mas os links
  // dela continuam sendo seguidos.
  robots: { index: false, follow: true },
};

export default function Privacidade() {
  return (
    <>
      <Header superficie="papel" />

      <Section superficie="papel">
        <h1 className={estilos.titulo}>Política de privacidade</h1>
        <p className={estilos.atualizado}>Atualizada em 9 de setembro de 2026.</p>

        <div className={estilos.texto}>
          <h2>Quem somos</h2>
          <p>
            Dalmóbile {unidade.nome}, com showroom em {enderecoEmLinha()}. Telefone{" "}
            <a href={linkTelefone()}>{unidade.telefone}</a>.
          </p>

          <h2>Que dados este site coleta</h2>
          <p>
            <strong>Nenhum.</strong> Este site não tem formulário, não pede cadastro e não usa
            cookie de identificação. Navegar por ele não deixa dado seu conosco.
          </p>
          <p>
            Se você nos escrever pelo WhatsApp ou ligar, aí sim recebemos o que você nos contar
            — nome, telefone e o que precisa. Usamos isso para responder e para conduzir o seu
            projeto, e nada além disso.
          </p>

          <h2>Com quem compartilhamos</h2>
          <p>
            Com ninguém. Não vendemos, não cedemos e não trocamos dado de cliente. O site é
            hospedado na Cloudflare, que registra endereços de acesso para operar o serviço,
            como qualquer servidor faz.
          </p>

          <h2>Seus direitos</h2>
          <p>
            A LGPD garante a você pedir acesso, correção ou exclusão dos seus dados a qualquer
            momento. Basta falar com a loja pelo telefone acima — respondemos em até um dia
            útil.
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
