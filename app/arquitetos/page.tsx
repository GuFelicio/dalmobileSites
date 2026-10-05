/**
 * /arquitetos — a página de parceria.
 *
 * O que é: o que a Dalmóbile oferece a quem projeta, como funciona a parceria
 * e — quando houver — os arquitetos parceiros. Segue a seção 8 do
 * docs/direcao-site.md, que chama esta página do "buraco mais valioso do
 * mercado": nenhum dos seis sites de SJC analisados tem área para arquiteto.
 *
 * Onde é usado: rota própria, destino do menu e do rodapé.
 *
 * A LISTA DE PARCEIROS ESTÁ VAZIA, e é de propósito. Publicar nome de terceiro
 * exige autorização POR ESCRITO de cada um, e a autorização vale por projeto,
 * não uma vez só. Depende também de os cases existirem. Ver docs/pendencias.md.
 *
 * O conteúdo vem de conteudo/institucional/arquitetos.md e é RASCUNHO até a
 * loja revisar — a trava de deploy recusa publicar enquanto for assim.
 */
import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "../../components/layout/Footer";
import { Header } from "../../components/layout/Header";
import { Section } from "../../components/layout/Section";
import { linkWhatsApp, unidade } from "../../config/derivados.ts";
import { ambientesDaUnidade } from "../../lib/ambientes-da-unidade.ts";
import { metadataDaPagina } from "../../lib/seo.ts";
import { ehPendente } from "../../config/pendente.ts";
import { institucional } from "../../lib/conteudo.ts";
import { comCidade } from "../../lib/texto.ts";
import estilos from "./arquitetos.module.css";

const pagina = institucional("arquitetos");

export const metadata: Metadata = metadataDaPagina({
  titulo: `Para arquitetos · Dalmóbile ${unidade.cidade}`,
  descricao:
    `Detalhamento técnico, edição milimétrica e orçamento de escritório. ` +
    `Parceria com arquitetos e designers de interiores em ${unidade.cidade}.`,
  caminho: "/arquitetos",
  foto: ambientesDaUnidade()[0]?.fotos[0]?.src,
});

/**
 * Trecho entre *asteriscos* no conteúdo sai em itálico — é o formato de
 * crédito da fábrica no bloco "Crédito no projeto" (copy v3, A8).
 */
function comEnfase(texto: string) {
  return texto.split(/\*([^*]+)\*/).map((parte, i) => (i % 2 === 1 ? <em key={i}>{parte}</em> : parte));
}

export default function Arquitetos() {
  const d = pagina.dados;
  const parceria = d.parceria ?? [];
  const parceiros = d.parceiros ?? [];
  const whatsapp = linkWhatsApp();

  return (
    <>
      <Header />

      <Section superficie="papel">
        <h1 className={estilos.titulo}>{comCidade(pagina.titulo)}</h1>
        <p className={estilos.chamada}>{comCidade(pagina.chamada)}</p>
        <div className={estilos.texto}>
          <p>{comCidade(d.abertura)}</p>
        </div>
      </Section>

      {/* Superfícies (v4, 05/10/2026), sem repetir vizinha: abertura papel →
          como funciona grafite → (parceiros papel →) chamada final papel →
          rodapé. Com parceiros, a chamada vira grafite, para não repetir o
          papel deles; hoje a lista está vazia e a seção não renderiza. */}
      <Section superficie="grafite">
        <h2 className={estilos.secao}>Como funciona a parceria</h2>
        <ul className={estilos.blocos}>
          {parceria.map((bloco) => (
            <li key={bloco.titulo} className={estilos.bloco}>
              <h3 className={estilos.blocoTitulo}>{bloco.titulo}</h3>
              <p className={estilos.blocoTexto}>{comEnfase(comCidade(bloco.texto))}</p>
              {/* Prazo de resposta é compromisso com um escritório. Sem
                  confirmação da loja, não vai ao ar. */}
              {bloco.prazo && !ehPendente(bloco.prazo) ? (
                <p className={estilos.prazo}>{bloco.prazo}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </Section>

      {/* Só renderiza quando houver parceiro COM autorização registrada. */}
      {parceiros.length > 0 ? (
        <Section superficie="papel">
          <h2 className={estilos.secao}>Arquitetos parceiros</h2>
          <ul className={estilos.parceiros}>
            {parceiros.map((p) => (
              <li key={p.nome} className={estilos.parceiro}>
                <span className={estilos.parceiroNome}>{p.nome}</span>
                {p.projetos?.length ? (
                  <ul className={estilos.parceiroProjetos}>
                    {p.projetos.map((proj) => (
                      <li key={proj.slug}>
                        <Link href={`/projetos/${proj.slug}`}>{proj.titulo}</Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section superficie={parceiros.length > 0 ? "grafite" : "papel"}>
        <div className={estilos.chamadaFinal}>
          <p className={estilos.chamadaTexto}>{comCidade(pagina.texto)}</p>
          {/* O formulário próprio é a seção 11 e ainda não existe. O WhatsApp
              é destino real, e a mensagem já identifica a unidade. */}
          {whatsapp ? (
            <a href={whatsapp} className={estilos.chamadaAcao}>
              Falar no WhatsApp
            </a>
          ) : (
            <Link href="/a-loja" className={estilos.chamadaAcao}>
              Showroom {unidade.nome}
            </Link>
          )}
        </div>
      </Section>

      <Footer />
    </>
  );
}
