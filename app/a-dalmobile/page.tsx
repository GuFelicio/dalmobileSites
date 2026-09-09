/**
 * /a-dalmobile — a página institucional.
 *
 * O que é: quem é a Dalmóbile, a fábrica, o processo, materiais, garantia,
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
 * renderizado como buraco: prazo, garantia e número da faixa são promessa, e
 * promessa sem confirmação da loja não vai ao ar. Ver docs/pendencias.md.
 */
import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "../../components/layout/Footer";
import { Header } from "../../components/layout/Header";
import { Section } from "../../components/layout/Section";
import Foto from "../../components/midia/Foto";
import { unidade } from "../../config/derivados.ts";
import { ambientesDaUnidade, escolherFoto } from "../../lib/ambientes-da-unidade.ts";
import {
  ehPendente,
  lerInstitucional,
  type DadosDalmobile,
} from "../../lib/institucional.ts";
import estilos from "./a-dalmobile.module.css";

const pagina = lerInstitucional<DadosDalmobile>("a-dalmobile");

export const metadata: Metadata = {
  title: `A Dalmóbile — móveis planejados em ${unidade.cidade}`,
  description:
    `Fábrica própria, projeto, fabricação e montagem. Conheça a Dalmóbile ` +
    `${unidade.cidade}: processo, materiais e perguntas frequentes.`,
};

export default function ADalmobile() {
  const d = pagina.dados;
  const ambientes = ambientesDaUnidade();
  const foto = escolherFoto(ambientes, ["cozinha", "sala-de-estar"], 2);

  const processo = d.processo ?? [];
  const numeros = (d.numeros ?? []).filter((n) => !ehPendente(n.valor));
  const faq = (d.faq ?? []).filter((p) => !ehPendente(p.resposta));
  const garantiaAnos = ehPendente(d.garantia?.anos) ? null : d.garantia?.anos;

  return (
    <>
      <Header superficie="papel" />

      <Section superficie="papel">
        <h1 className={estilos.titulo}>{pagina.titulo}</h1>
        <p className={estilos.chamada}>{pagina.chamada}</p>
        <div className={estilos.texto}>
          <p>{d.abertura}</p>
        </div>
      </Section>

      <Section superficie="papel">
        <h2 className={estilos.secao}>{d.fabrica?.titulo}</h2>
        <div className={estilos.texto}>
          <p>{d.fabrica?.texto}</p>
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
          <p>{d.materiais?.texto}</p>
        </div>

        <h2 className={estilos.secao}>Garantia</h2>
        <div className={estilos.texto}>
          {garantiaAnos ? <p className={estilos.garantiaAnos}>{garantiaAnos}</p> : null}
          <p>{d.garantia?.texto}</p>
        </div>
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
                <dt className={estilos.pergunta}>{p.pergunta}</dt>
                <dd className={estilos.resposta}>{p.resposta}</dd>
              </div>
            ))}
          </dl>
        </Section>
      ) : null}

      <Section superficie="cinza" semRespiro>
        <div className={estilos.chamadaFinal}>
          <p className={estilos.chamadaTexto}>{pagina.texto}</p>
          <Link href="/a-loja" className={estilos.chamadaAcao}>
            Showroom {unidade.nome}
          </Link>
        </div>
      </Section>

      <Footer />
    </>
  );
}
