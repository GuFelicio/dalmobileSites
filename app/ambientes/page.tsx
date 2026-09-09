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
  titulo: `Ambientes — Móveis planejados em ${unidade.cidade} | Dalmóbile`,
  descricao:
    `Cozinha, quartos, sala, home office, closet e banheiro planejados pela ` +
    `Dalmóbile em ${unidade.cidade}. Fotos de projetos executados.`,
  caminho: "/ambientes",
  foto: ambientesDaUnidade()[0]?.fotos[0]?.src,
});

export default function HubDeAmbientes() {
  const ambientes = ambientesDaUnidade();

  return (
    <>
      <Header superficie="papel" />

      <Section superficie="papel">
        <h1 className={estilos.titulo}>Ambientes</h1>
        <p className={estilos.intro}>
          Cada ambiente pede uma solução diferente de marcenaria. Estas são fotos de projetos
          que a Dalmóbile desenhou, fabricou e instalou.
        </p>

        <ul className={estilos.grade}>
          {ambientes.map((ambiente, i) => (
            <li key={ambiente.slug} className={estilos.card}>
              <Link href={`/ambientes/${ambiente.slug}`} className={estilos.cardLink}>
                <div className={estilos.cardFoto}>
                  <Foto
                    src={ambiente.fotos[0].src}
                    alt={ambiente.fotos[0].alt}
                    /* Grade 2/3/4 colunas: a foto ocupa ~metade, ~um terço e
                       ~um quarto da largura em cada faixa. */
                    sizes="(max-width: 600px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    prioridade={i < 4}
                    className={estilos.cardImg}
                  />
                </div>
                <span className={estilos.cardNome}>{ambiente.nome}</span>
                <span className={estilos.cardContagem}>
                  {ambiente.fotos.length === 1 ? "1 foto" : `${ambiente.fotos.length} fotos`}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Footer />
    </>
  );
}
