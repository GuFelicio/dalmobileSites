/**
 * /projetos/[slug] — o case. O gabarito mais usado do site.
 *
 * O que é: a página que o vendedor manda no WhatsApp e que o arquiteto guarda.
 * O site tem trinta dela e uma home. Segue os nove blocos da seção 5 do
 * docs/direcao-site.md, nesta ordem:
 *
 *   1 caminho de navegação   2 cabeçalho          3 foto de abertura
 *   4 texto curto            5 ficha técnica      6 galeria
 *   7 depoimento             8 outros no edifício 9 chamada final
 *
 * Onde é usado: rota própria, destino de todo card do índice.
 *
 * Trocas de superfície: preto (abertura e galeria) → papel (ficha e texto) →
 * preto (outros projetos) → cinza (chamada). Quatro, o máximo do CLAUDE.md.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { unidade } from "../../../config/derivados.ts";
import { Footer } from "../../../components/layout/Footer";
import { Header } from "../../../components/layout/Header";
import { Section } from "../../../components/layout/Section";
import Foto from "../../../components/midia/Foto";
import { urlParaPreview } from "../../../lib/fotos.ts";
import estilos from "./case.module.css";
import { outrosNoEdificio, projetoPorSlug, projetosDaUnidade } from "../../../lib/projetos-da-unidade.ts";

type Props = { params: Promise<{ slug: string }> };

/** Gera as rotas dos projetos DESTA unidade. Um case de uma unidade não
    existe como rota na outra — nem como 404 com o nome vazando no sitemap. */
export function generateStaticParams() {
  return projetosDaUnidade().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const projeto = projetoPorSlug(slug);
  if (!projeto) return {};

  const descricao = `${projeto.titulo}: ${projeto.ambientes.join(", ").toLowerCase()} no ${projeto.edificio}, ${projeto.bairro}. Projeto executado pela Dalmóbile ${unidade.cidade} em ${projeto.ano}.`;

  return {
    title: `${projeto.titulo} — ${projeto.edificio} | Dalmóbile ${unidade.cidade}`,
    description: descricao,
    // O vendedor manda o link no WhatsApp: o preview É o produto naquele
    // momento. Por isso OpenGraph por página, com a foto de abertura.
    openGraph: {
      title: `${projeto.titulo} — ${projeto.edificio}`,
      description: descricao,
      url: `${unidade.dominio}/projetos/${projeto.slug}`,
      type: "article",
      images: [{ url: `${unidade.dominio}${urlParaPreview(projeto.abertura)}` }],
    },
  };
}

export default async function Case({ params }: Props) {
  const { slug } = await params;
  const projeto = projetoPorSlug(slug);
  if (!projeto) notFound();

  const outros = outrosNoEdificio(projeto);
  const creditar = projeto.arquiteto?.autorizado === true;

  return (
    <>
      <Header superficie="preto" />

      <Section superficie="preto">
        {/* 1. Caminho de navegação — a pessoa chega por qualquer porta. */}
        <nav aria-label="Caminho de navegação" className={estilos.caminho}>
          <ol>
            <li>
              <Link href="/projetos">Projetos</Link>
            </li>
            <li>
              <Link href={`/projetos?edificio=${encodeURIComponent(projeto.edificio)}`}>
                {projeto.edificio}
              </Link>
            </li>
            <li aria-current="page">{projeto.titulo}</li>
          </ol>
        </nav>

        {/* 2. Cabeçalho */}
        <h1 className={estilos.titulo}>{projeto.titulo}</h1>
        <p className={estilos.rotulo}>
          {projeto.edificio} · {projeto.bairro} · {projeto.ano}
        </p>
      </Section>

      {/* 3. Foto de abertura — sangrando, sem texto por cima. A imagem é o
          produto; escurecer para caber texto joga fora o ativo. */}
      <Section superficie="preto" sangra semRespiro>
        <Foto
          src={projeto.abertura}
          alt={projeto.fotos[0]?.alt ?? projeto.titulo}
          sizes="100vw"
          prioridade
          className={estilos.abertura}
        />
      </Section>

      <Section superficie="papel">
        <div className={estilos.corpo}>
          {/* 4. Texto curto — o que o projeto resolveu. */}
          <div className={estilos.texto}>
            <p>{projeto.texto}</p>
          </div>

          {/* 5. Ficha técnica — coluna lateral no desktop, ABAIXO da foto no
              tablet e no mobile. É a ordem do DOM que garante isso: no
              telefone e no iPad a ficha vem depois do texto, naturalmente. */}
          <aside className={estilos.ficha} aria-labelledby="ficha-titulo">
            <h2 id="ficha-titulo" className={estilos.fichaTitulo}>
              Ficha técnica
            </h2>
            <dl>
              <dt>Local</dt>
              <dd>
                {projeto.edificio} — {projeto.bairro}
              </dd>

              <dt>Ano</dt>
              <dd>{projeto.ano}</dd>

              <dt>Ambientes</dt>
              <dd>{projeto.ambientes.join(" · ")}</dd>

              <dt>Acabamentos</dt>
              <dd>
                <ul className={estilos.acabamentos}>
                  {projeto.acabamentos.map((a) => (
                    <li key={a.codigo}>
                      {a.nome} <span className={estilos.codigo}>{a.codigo}</span>
                    </li>
                  ))}
                </ul>
              </dd>

              {/* Crédito do arquiteto só com autorização por escrito. Sem ela,
                  a linha não existe — nem com o nome, nem com "não informado". */}
              {creditar ? (
                <>
                  <dt>Arquiteto</dt>
                  <dd>
                    {/* /arquitetos ainda não existe; ver docs/pendencias.md. */}
                    {projeto.arquiteto!.nome}
                  </dd>
                </>
              ) : null}
            </dl>
          </aside>
        </div>
      </Section>

      {/* 6. Galeria — fotos grandes empilhadas, uma por bloco, legenda curta
          abaixo. Nunca mosaico, nunca miniatura. */}
      <Section superficie="preto" sangra>
        <ul className={estilos.galeria}>
          {projeto.fotos.map((foto) => (
            <li key={foto.src} className={estilos.galeriaItem}>
              <figure>
                <Foto src={foto.src} alt={foto.alt} sizes="100vw" className={estilos.galeriaFoto} />
                <figcaption>{foto.legenda}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Section>

      {/* 8. Outros projetos neste edifício. (7, o depoimento, entra quando a
          loja trouxer depoimentos autorizados — ver docs/adicionar-projeto.md.) */}
      {outros.length > 0 ? (
        <Section superficie="preto">
          <h2 className={estilos.outrosTitulo}>Outros projetos no {projeto.edificio}</h2>
          <ul className={estilos.outros}>
            {outros.map((o) => (
              <li key={o.slug}>
                <Link href={`/projetos/${o.slug}`}>
                  <Foto
                    src={o.abertura}
                    alt={o.fotos[0]?.alt ?? o.titulo}
                    sizes="(max-width: 820px) 100vw, 33vw"
                    className={estilos.outrosFoto}
                  />
                  <span className={estilos.outrosNome}>{o.titulo}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {/* 9. Chamada final, em faixa cinza. */}
      <Section superficie="cinza" semRespiro>
        <div className={estilos.chamada}>
          <p className={estilos.chamadaTexto}>Quer um projeto assim no seu apartamento?</p>
          <Link href="/a-loja" className={estilos.chamadaAcao}>
            Falar sobre um projeto assim
          </Link>
        </div>
      </Section>

      <Footer />
    </>
  );
}
