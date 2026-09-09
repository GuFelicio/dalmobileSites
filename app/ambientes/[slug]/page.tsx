/**
 * /ambientes/[slug] — a página do ambiente.
 *
 * O que é: o texto do ambiente e a galeria daquele ambiente, reunindo fotos de
 * apartamentos diferentes. Segue a seção 6.2 do docs/direcao-site.md.
 *
 * Onde é usado: rota própria, destino de todo card do hub.
 *
 * Cada foto traz um título de impacto e, quando o cliente informar, o prédio e
 * o arquiteto. Os campos existem no conteúdo e ficam vazios até lá — ver
 * docs/decisoes.md sobre por que o crédito não é inventado.
 *
 * Trocas de superfície: papel (texto) → preto (galeria) → cinza (chamada).
 * Três, dentro do máximo de quatro do CLAUDE.md.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Footer } from "../../../components/layout/Footer";
import { Header } from "../../../components/layout/Header";
import { Section } from "../../../components/layout/Section";
import Foto from "../../../components/midia/Foto";
import { unidade } from "../../../config/derivados.ts";
import { metadataDaPagina } from "../../../lib/seo.ts";
import { ambientePorSlugDaUnidade, ambientesDaUnidade } from "../../../lib/ambientes-da-unidade.ts";
import estilos from "./ambiente.module.css";

type Props = { params: Promise<{ slug: string }> };

/** Só os ambientes DESTA unidade viram rota. */
export function generateStaticParams() {
  return ambientesDaUnidade().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ambiente = ambientePorSlugDaUnidade(slug);
  if (!ambiente) return {};

  const descricao = `${ambiente.chamada} ${ambiente.nome} ${ambiente.planejado} pela Dalmóbile em ${unidade.cidade}, em projetos executados.`;

  return metadataDaPagina({
    titulo: `${ambiente.nome} ${ambiente.planejado} em ${unidade.cidade} | Dalmóbile`,
    descricao,
    caminho: `/ambientes/${ambiente.slug}`,
    foto: ambiente.fotos[0].src,
    tipo: "article",
  });
}

export default async function PaginaDeAmbiente({ params }: Props) {
  const { slug } = await params;
  const ambiente = ambientePorSlugDaUnidade(slug);
  if (!ambiente) notFound();

  const outros = ambientesDaUnidade().filter((a) => a.slug !== ambiente.slug);

  return (
    <>
      <Header superficie="papel" />

      <Section superficie="papel">
        <nav aria-label="Caminho de navegação" className={estilos.caminho}>
          <ol>
            <li>
              <Link href="/ambientes">Ambientes</Link>
            </li>
            <li aria-current="page">{ambiente.nome}</li>
          </ol>
        </nav>

        <h1 className={estilos.titulo}>{ambiente.nome}</h1>
        <p className={estilos.chamada}>{ambiente.chamada}</p>
        <div className={estilos.texto}>
          <p>{ambiente.texto}</p>
        </div>
      </Section>

      {/* Galeria: uma foto por bloco, grande, com o título abaixo.
          Nunca mosaico, nunca miniatura — a foto é o produto. */}
      <Section superficie="preto" sangra>
        <ul className={estilos.galeria}>
          {ambiente.fotos.map((foto, i) => (
            <li key={foto.src} className={estilos.item}>
              <figure>
                <Foto
                  src={foto.src}
                  alt={foto.alt}
                  sizes="100vw"
                  prioridade={i === 0}
                  className={estilos.foto}
                />
                <figcaption className={estilos.legenda}>
                  <span className={estilos.legendaTitulo}>{foto.titulo}</span>
                  {/* Crédito só quando o dado existe. Sem prédio confirmado e
                      sem autorização do arquiteto, a linha não aparece. */}
                  {foto.edificio || foto.arquiteto ? (
                    <span className={estilos.credito}>
                      {[foto.edificio, foto.arquiteto].filter(Boolean).join(" · ")}
                    </span>
                  ) : null}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Section>

      {outros.length > 0 ? (
        <Section superficie="papel">
          <h2 className={estilos.outrosTitulo}>Outros ambientes</h2>
          <ul className={estilos.outros}>
            {outros.map((a) => (
              <li key={a.slug}>
                <Link href={`/ambientes/${a.slug}`} className={estilos.outrosLink}>
                  {a.nome}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section superficie="cinza" semRespiro>
        <div className={estilos.chamadaFinal}>
          <p className={estilos.chamadaTexto}>
            Quer {ambiente.artigo} {ambiente.singular} assim no seu apartamento?
          </p>
          <Link href="/a-loja" className={estilos.chamadaAcao}>
            Falar sobre um projeto assim
          </Link>
        </div>
      </Section>

      <Footer />
    </>
  );
}
