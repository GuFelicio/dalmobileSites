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
import { Section } from "../../components/layout/Section";
import Foto from "../../components/midia/Foto";
import { unidade } from "../../config/derivados.ts";
import { metadataDaPagina } from "../../lib/seo.ts";
import { ambientesDaUnidade } from "../../lib/ambientes-da-unidade.ts";
import estilos from "./ambientes.module.css";

export const metadata: Metadata = metadataDaPagina({
  titulo: `Ambientes · móveis planejados em ${unidade.cidade} | Dalmóbile`,
  // Lista os ambientes de cada unidade (copy v3, C4): vem do config.
  descricao: unidade.textos.descricaoAmbientes,
  caminho: "/ambientes",
  foto: ambientesDaUnidade()[0]?.fotos[0]?.src,
});

/**
 * Quantas colunas cada item ocupa, para a grade NUNCA terminar com vão. O
 * primeiro ocupa `primeiro` colunas; se a conta não fechar a última linha, o
 * último estica até a borda. Por conta, e não por CSS fixo, para continuar sem
 * vão quando a loja ganhar ou perder um ambiente.
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

  // Mais de quatro ambientes (SJC, 7): o primeiro em destaque, ocupando duas
  // colunas com foto 16:9 — 2+1+1 / 1+1+1+1 no desktop, sem vão. Até quatro
  // (Caraguá) não há destaque: no desktop a linha fecha exata e nada muda; no
  // tablet (3 colunas) o último card estica até a borda, para não sobrar vão.
  const destaque = ambientes.length > 4;
  // No desktop são 4 colunas; com MENOS de 4 ambientes, uma coluna por
  // ambiente — Caraguá, com 3 (copy v3), fica em 3 colunas iguais, sem vão.
  const colunasDesktop = destaque ? 4 : Math.min(4, ambientes.length);
  const grade = {
    celular: colunasPorItem(ambientes.length, 2, destaque ? 2 : 1),
    tablet: colunasPorItem(ambientes.length, 3, destaque ? 3 : 1),
    desktop: colunasPorItem(ambientes.length, colunasDesktop, destaque ? 2 : 1),
  };

  return (
    <>
      <Header />

      <Section superficie="papel">
        <h1 className={estilos.titulo}>Ambientes</h1>
        {/* Copy v4 (docs/copy-v4.md, hub): a pergunta da apresentação como
            subtítulo, e a intro. */}
        <p className={estilos.chamada}>Qual ambiente você quer explorar agora?</p>
        <p className={estilos.intro}>
          Cada ambiente pede decisões diferentes. As fotos são de projetos que a Dalmóbile
          projetou, fabricou e instalou em {unidade.cidade}.
        </p>

        <ul
          className={estilos.grade}
          style={{ "--colunas-grade-desktop": colunasDesktop } as React.CSSProperties}
        >
          {ambientes.map((ambiente, i) => (
            <li
              key={ambiente.slug}
              className={`${estilos.card} ${destaque && i === 0 ? estilos.cardDestaque : ""}`}
              // As colunas deste item em cada faixa de largura, lidas pelo CSS.
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
                    /* Grade 2/3/4 colunas: a foto ocupa ~metade, ~um terço e
                       ~um quarto da largura em cada faixa. */
                    sizes={
                      destaque && i === 0
                        ? "(max-width: 1024px) 100vw, 50vw"
                        : "(max-width: 600px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    }
                    prioridade={i < 4}
                    className={estilos.cardImg}
                  />
                </div>
                {/* A contagem de fotos ("8 fotos") saiu na copy v4. */}
                <span className={estilos.cardNome}>{ambiente.nome}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Footer />
    </>
  );
}
