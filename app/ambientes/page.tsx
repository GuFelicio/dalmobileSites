/**
 * /ambientes — o hub.
 *
 * O que é: a grade de todos os ambientes desta unidade, em superfície papel,
 * conforme a seção 6.1 do docs/direcao-site.md. Cada card leva à página do
 * ambiente. A foto do card é a primeira foto daquele ambiente.
 *
 * Onde é usado: rota própria, e destino do menu principal.
 *
 * Grade 4/3/2 colunas, foto 4:3, nome abaixo em rótulo. Card pequeno funciona
 * aqui porque são rótulos com foto de apoio, não peças de portfólio.
 */
import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "../../components/layout/Footer";
import { Header } from "../../components/layout/Header";
import { PageHeader } from "../../components/layout/PageHeader";
import { Section } from "../../components/layout/Section";
import Foto from "../../components/midia/Foto";
import { unidade } from "../../config/derivados.ts";
import { metadataDaPagina } from "../../lib/seo.ts";
import { ambientesDaUnidade } from "../../lib/ambientes-da-unidade.ts";
import estilos from "./ambientes.module.css";

export const metadata: Metadata = metadataDaPagina({
  titulo: `Ambientes — Móveis planejados em ${unidade.cidade} | Dalmóbile`,
  descricao:
    `Cozinha, quartos, sala, home office, closet, banheiro e espaço gourmet ` +
    `planejados pela Dalmóbile em ${unidade.cidade}. Fotos de projetos executados.`,
  caminho: "/ambientes",
  foto: ambientesDaUnidade()[0]?.fotos[0]?.src,
});

/**
 * Quantas colunas cada item ocupa, para a grade NUNCA terminar com vão
 * (V2, direção de layout, 6.3). O primeiro item ocupa `primeiro` colunas; se a
 * conta não fechar a última linha, o último item estica até a borda.
 * Feito por conta, e não por CSS fixo, para continuar sem vão quando a loja
 * ganhar ou perder um ambiente.
 */
function colunasPorItem(total: number, colunas: number, primeiro: number): number[] {
  if (total === 1) return [colunas];
  const spans = Array.from({ length: total }, (_, i) => (i === 0 ? primeiro : 1));
  const resto = (primeiro + total - 1) % colunas;
  if (resto !== 0) spans[total - 1] += colunas - resto;
  return spans;
}

export default function HubDeAmbientes() {
  const ambientes = ambientesDaUnidade();

  // O desenho da grade vem do config (`gradeDeAmbientes`), porque depende do
  // acervo de cada unidade. "destaque" (SJC, 7): o primeiro em 16:9 e os
  // outros em 4:3 — 2 colunas no celular, 3 no tablet, 4 no desktop, como o
  // CLAUDE.md manda. "duasColunas" (Caraguá, 4): fotos grandes em toda
  // largura — menos acervo pede foto maior, não grade mais vazia.
  const poucos = unidade.gradeDeAmbientes === "duasColunas";
  const grade = poucos
    ? { celular: colunasPorItem(ambientes.length, 2, 1), tablet: colunasPorItem(ambientes.length, 2, 1), desktop: colunasPorItem(ambientes.length, 2, 1) }
    : { celular: colunasPorItem(ambientes.length, 2, 2), tablet: colunasPorItem(ambientes.length, 3, 3), desktop: colunasPorItem(ambientes.length, 4, 2) };

  return (
    <>
      <Header superficie="papel" />

      <Section superficie="papel">
        {/* Dizer que NÃO há render é mais forte do que dizer que as fotos são
            de projetos executados: nomeia o que a concorrência faz. */}
        <PageHeader titulo="Ambientes">
          <p>
            Cada ambiente resolve um problema diferente de marcenaria. As fotos abaixo são de
            projetos que a Dalmóbile desenhou, fabricou e instalou — nenhum render, nenhuma
            imagem de banco.
          </p>
        </PageHeader>
      </Section>

      <Section superficie="papel">
        <ul className={`${estilos.grade} ${poucos ? estilos.poucos : estilos.destaque}`}>
          {ambientes.map((ambiente, i) => {
            const emDestaque = !poucos && i === 0;
            return (
              <li
                key={ambiente.slug}
                className={`${estilos.card} ${emDestaque ? estilos.cardDestaque : ""}`}
                // As colunas de cada item, por faixa de largura. O CSS lê
                // estas variáveis nas media queries de ambientes.module.css.
                style={
                  {
                    "--colunas-celular": grade.celular[i],
                    "--colunas-tablet": grade.tablet[i],
                    "--colunas-desktop": grade.desktop[i],
                  } as React.CSSProperties
                }
              >
                <Link href={`/ambientes/${ambiente.slug}`} className={estilos.cardLink}>
                  <div className={estilos.cardFoto}>
                    <Foto
                      src={ambiente.fotos[0].src}
                      alt={ambiente.fotos[0].alt}
                      sizes={
                        poucos
                          ? "50vw"
                          : emDestaque
                            ? "(max-width: 1024px) 100vw, 50vw"
                            : "(max-width: 600px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      }
                      prioridade={i < 4}
                      className={estilos.cardImg}
                    />
                  </div>
                  {/* Só o nome. A contagem de fotos ("3 FOTOS") saiu na V2: lia
                      como inventário, não como portfólio. */}
                  <span className={estilos.cardNome}>{ambiente.nome}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      <Footer />
    </>
  );
}
