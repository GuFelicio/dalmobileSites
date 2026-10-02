/**
 * /a-dalmobile — a página institucional.
 *
 * O que é: quem é a Dalmóbile, a fábrica, o processo, materiais,
 * números e as perguntas frequentes. Segue a seção 7 do docs/direcao-site.md.
 * Texto longo, medida curta, muito respiro.
 *
 * Onde é usado: rota própria, destino do menu e do rodapé.
 *
 * O CONTEÚDO VEM DE conteudo/institucional/a-dalmobile.md, e é RASCUNHO: foi
 * escrito sem entrevista com a loja. Enquanto `confirmado` for false, a trava
 * de deploy recusa publicar.
 *
 * Todo campo ainda com o sentinela PENDENTE é OMITIDO da página, e não
 * renderizado como buraco: prazo e número da faixa são promessa, e
 * promessa sem confirmação da loja não vai ao ar. Ver docs/pendencias.md.
 */
import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "../../components/layout/Footer";
import { Header } from "../../components/layout/Header";
import { Section } from "../../components/layout/Section";
import Foto from "../../components/midia/Foto";
import { unidade } from "../../config/derivados.ts";
import { metadataDaPagina } from "../../lib/seo.ts";
import { ambientesDaUnidade, escolherFoto } from "../../lib/ambientes-da-unidade.ts";
import { ehPendente } from "../../config/pendente.ts";
import { institucional } from "../../lib/conteudo.ts";
import { comCidade } from "../../lib/texto.ts";
import estilos from "./a-dalmobile.module.css";

const pagina = institucional("a-dalmobile");

export const metadata: Metadata = metadataDaPagina({
  titulo: `A Dalmóbile · móveis planejados em ${unidade.cidade}`,
  descricao:
    `Móveis personalizados com fábrica própria em Bento Gonçalves desde 1977. ` +
    `Como a Dalmóbile projeta, fabrica e monta em ${unidade.cidade}.`,
  caminho: "/a-dalmobile",
  foto: escolherFoto(ambientesDaUnidade(), ["cozinha", "sala-de-estar"], 2)?.src,
});

export default function ADalmobile() {
  const d = pagina.dados;
  const ambientes = ambientesDaUnidade();
  const foto = escolherFoto(ambientes, ["cozinha", "sala-de-estar"], 2);

  const processo = d.processo ?? [];
  const numeros = (d.numeros ?? []).filter((n) => !ehPendente(n.valor));
  // Perguntas de uma unidade só (`unidades`) aparecem só no site dela.
  const faq = (d.faq ?? []).filter(
    (p) => !ehPendente(p.resposta) && (!p.unidades || p.unidades.includes(unidade.id)),
  );

  return (
    <>
      <Header superficie="papel" />

      <Section superficie="papel">
        <h1 className={estilos.titulo}>{comCidade(pagina.titulo)}</h1>
        <p className={estilos.chamada}>{comCidade(pagina.chamada)}</p>
        <div className={estilos.texto}>
          <p>{comCidade(d.abertura)}</p>
        </div>
      </Section>

      {/* Respiro longo: vem uma troca de superfície (papel → cinza). */}
      <Section superficie="papel" respiro="longo">
        <h2 className={estilos.secao}>{d.fabrica?.titulo}</h2>
        <div className={estilos.texto}>
          <p>{comCidade(d.fabrica?.texto ?? "")}</p>
        </div>
        {/* A direção pede foto de fábrica e o acervo não tem. Até ter, uma
            foto de projeto executado, que é o ativo que a loja realmente tem. */}
        {foto ? (
          <Foto
            src={foto.src}
            alt={foto.alt}
            sizes="(max-width: 1024px) 100vw, 66vw"
            className={estilos.foto}
          />
        ) : null}
      </Section>

      <Section superficie="cinza">
        <h2 className={estilos.secao}>O processo</h2>
        <ol className={estilos.processo}>
          {processo.map((etapa, i) => (
            <li key={etapa.etapa} className={estilos.etapa}>
              <span className={estilos.numero}>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className={estilos.etapaTitulo}>{etapa.etapa}</h3>
                <p className={estilos.etapaTexto}>{etapa.texto}</p>
                {/* Prazo é compromisso. Sem confirmação da loja, não aparece. */}
                {etapa.prazo && !ehPendente(etapa.prazo) ? (
                  <p className={estilos.prazo}>{etapa.prazo}</p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section superficie="papel">
        <h2 className={estilos.secao}>{d.materiais?.titulo}</h2>
        <div className={estilos.texto}>
          <p>{comCidade(d.materiais?.texto ?? "")}</p>
          {/* A frase oficial da fábrica, em itálico (copy v3, A7). */}
          {d.materiais?.fecho ? (
            <p>
              <em>{d.materiais.fecho}</em>
            </p>
          ) : null}
        </div>
        {/* A seção Garantia saiu na copy v3: garantia, certificado e prazos
            ficam na conversa de venda, não no site (docs/vocabulario.md). */}
      </Section>

      {/* A faixa de números só existe se houver número confirmado. Faixa com
          zero itens seria uma seção vazia; com um item, uma promessa fraca. */}
      {numeros.length >= 3 ? (
        <Section superficie="cinza" semRespiro>
          <ul className={estilos.numeros}>
            {numeros.map((n) => (
              <li key={n.rotulo}>
                <span className={estilos.numeroValor}>{n.valor}</span>
                <span className={estilos.numeroRotulo}>{n.rotulo}</span>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {faq.length > 0 ? (
        <Section superficie="papel">
          <h2 className={estilos.secao}>Perguntas frequentes</h2>
          {/* Seção indexável, não acordeão de venda: as respostas ficam
              abertas, para o Google ler e para a pessoa achar sem clicar. */}
          <dl className={estilos.faq}>
            {faq.map((p) => (
              <div key={p.pergunta} className={estilos.item}>
                <dt className={estilos.pergunta}>{comCidade(p.pergunta)}</dt>
                <dd className={estilos.resposta}>{comCidade(p.resposta)}</dd>
              </div>
            ))}
          </dl>
        </Section>
      ) : null}

      <Section superficie="cinza" semRespiro>
        <div className={estilos.chamadaFinal}>
          {/* Texto só se o conteúdo tiver: desde a copy v3 o corpo está vazio
              e a faixa fica só com o botão. */}
          {pagina.texto ? <p className={estilos.chamadaTexto}>{comCidade(pagina.texto)}</p> : null}
          <Link href="/a-loja" className={estilos.chamadaAcao}>
            Showroom {unidade.nome}
          </Link>
        </div>
      </Section>

      <Footer />
    </>
  );
}
