/**
 * /projetos — o índice do portfólio.
 *
 * O que é: a grade de todos os projetos desta unidade, em superfície preta,
 * com filtro em dois eixos: por ambiente e por edifício.
 *
 * Onde é usado: rota própria, e destino do menu principal.
 *
 * O ESTADO DO FILTRO VIVE NA URL (?ambiente= &edificio= &ate=), nunca em
 * estado de cliente. Três motivos, todos da direção: o link tem que ser
 * compartilhável, tem que ser indexável, e a página inteira continua sendo
 * server component — sem JavaScript, o filtro ainda funciona.
 *
 * Por isso "Carregar mais" também é um link, com ?ate=. Não é botão com
 * estado: é a mesma página pedindo mais linhas.
 */
import type { Metadata } from "next";
import Link from "next/link";

import { unidade } from "../../config/derivados.ts";
import { Footer } from "../../components/layout/Footer";
import { Header } from "../../components/layout/Header";
import { Section } from "../../components/layout/Section";
import Foto from "../../components/midia/Foto";
import { eixosDeFiltro } from "../../lib/filtros.ts";
import type { Projeto } from "../../lib/projetos.ts";
import { projetosDaUnidade } from "../../lib/projetos-da-unidade.ts";
import estilos from "./projetos.module.css";

/** Quantos projetos por lote. "Carregar mais" soma outro lote. */
const LOTE = 6;

export const metadata: Metadata = {
  title: `Projetos executados — Dalmóbile ${unidade.cidade}`,
  description:
    `Projetos de móveis planejados executados pela Dalmóbile em ${unidade.cidade}, ` +
    `com ficha técnica, acabamentos e o arquiteto que assinou.`,
};

type Busca = { ambiente?: string; edificio?: string; ate?: string };

/** Monta o href preservando os outros filtros. Um eixo não apaga o outro. */
function comFiltro(atual: Busca, mudanca: Partial<Busca>): string {
  const params = new URLSearchParams();
  const proximo = { ...atual, ...mudanca };
  // Ao trocar um filtro, a contagem volta ao primeiro lote: manter ?ate= alto
  // depois de filtrar mostraria "carregar mais" sem ter mais nada a carregar.
  if (mudanca.ambiente !== undefined || mudanca.edificio !== undefined) delete proximo.ate;
  if (proximo.ambiente) params.set("ambiente", proximo.ambiente);
  if (proximo.edificio) params.set("edificio", proximo.edificio);
  if (proximo.ate) params.set("ate", proximo.ate);
  const query = params.toString();
  return query ? `/projetos?${query}` : "/projetos";
}

function Chip({
  rotulo,
  href,
  ativo,
}: {
  rotulo: string;
  href: string;
  ativo: boolean;
}) {
  return (
    <li>
      <Link href={href} className={estilos.chip} aria-current={ativo ? "true" : undefined}>
        {rotulo}
      </Link>
    </li>
  );
}

function Card({ projeto, primeiro }: { projeto: Projeto; primeiro: boolean }) {
  return (
    <li className={estilos.card}>
      <Link href={`/projetos/${projeto.slug}`} className={estilos.cardLink}>
        <div className={estilos.cardFoto}>
          <Foto
            src={projeto.abertura}
            alt={projeto.fotos[0]?.alt ?? projeto.titulo}
            /* Grade: 1 coluna até 820px, 2 acima. A foto ocupa a largura toda
               da coluna, então acima de 820px são ~50vw menos a calha. */
            sizes="(max-width: 820px) 100vw, 50vw"
            prioridade={primeiro}
            className={estilos.cardImg}
          />
        </div>
        <h2 className={estilos.cardTitulo}>{projeto.titulo}</h2>
      </Link>
      <p className={estilos.cardRotulo}>
        {projeto.edificio} · {projeto.ano}
      </p>
      {projeto.arquiteto?.autorizado ? (
        <p className={estilos.cardApoio}>{projeto.arquiteto.nome}</p>
      ) : null}
    </li>
  );
}

export default async function IndiceDeProjetos({
  searchParams,
}: {
  searchParams: Promise<Busca>;
}) {
  const busca = await searchParams;
  const todos = projetosDaUnidade();
  const { ambientes, edificios } = eixosDeFiltro(todos);

  // Filtro só vale se o valor existir de verdade: ?ambiente=inventado devolve
  // a lista inteira, e não uma página vazia sem explicação.
  const ambiente = busca.ambiente && ambientes.includes(busca.ambiente) ? busca.ambiente : undefined;
  const edificio = busca.edificio && edificios.includes(busca.edificio) ? busca.edificio : undefined;

  const filtrados = todos.filter(
    (p) =>
      (!ambiente || p.ambientes.includes(ambiente)) && (!edificio || p.edificio === edificio),
  );

  const ate = Math.max(LOTE, Number.parseInt(busca.ate ?? "", 10) || LOTE);
  const visiveis = filtrados.slice(0, ate);
  const faltam = filtrados.length - visiveis.length;

  const contagem =
    filtrados.length === 1 ? "1 projeto executado" : `${filtrados.length} projetos executados`;

  return (
    <>
      <Header superficie="preto" />

      <Section superficie="preto">
        <h1 className={estilos.titulo}>Projetos</h1>
        <p className={estilos.intro}>
          Cada projeto aqui foi desenhado, fabricado e instalado pela Dalmóbile. As fotos são
          dos apartamentos entregues.
        </p>
        <p className={estilos.contagem}>{contagem}</p>

        <div className={estilos.filtros}>
          <div className={estilos.eixo}>
            <h2 className={estilos.eixoTitulo} id="filtro-ambiente">
              Ambiente
            </h2>
            <ul className={estilos.chips} aria-labelledby="filtro-ambiente">
              <Chip rotulo="Todos" href={comFiltro(busca, { ambiente: undefined })} ativo={!ambiente} />
              {ambientes.map((a) => (
                <Chip
                  key={a}
                  rotulo={a}
                  href={comFiltro(busca, { ambiente: a === ambiente ? undefined : a })}
                  ativo={a === ambiente}
                />
              ))}
            </ul>
          </div>

          <div className={estilos.eixo}>
            <h2 className={estilos.eixoTitulo} id="filtro-edificio">
              Edifício
            </h2>
            <ul className={estilos.chips} aria-labelledby="filtro-edificio">
              <Chip rotulo="Todos" href={comFiltro(busca, { edificio: undefined })} ativo={!edificio} />
              {edificios.map((e) => (
                <Chip
                  key={e}
                  rotulo={e}
                  href={comFiltro(busca, { edificio: e === edificio ? undefined : e })}
                  ativo={e === edificio}
                />
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section superficie="preto" semRespiro>
        {visiveis.length === 0 ? (
          <p className={estilos.vazio}>
            Nenhum projeto com esse filtro.{" "}
            <Link href="/projetos" className={estilos.vazioLink}>
              Ver todos os projetos
            </Link>
          </p>
        ) : (
          <ul className={estilos.grade}>
            {visiveis.map((p, i) => (
              <Card key={p.slug} projeto={p} primeiro={i === 0} />
            ))}
          </ul>
        )}

        {faltam > 0 ? (
          <p className={estilos.mais}>
            <Link href={comFiltro(busca, { ate: String(ate + LOTE) })} className={estilos.maisLink}>
              Carregar mais ({faltam})
            </Link>
          </p>
        ) : null}
      </Section>

      <Footer />
    </>
  );
}
