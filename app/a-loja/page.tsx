/**
 * /a-loja — a página do showroom.
 *
 * O que é: endereço, telefone, WhatsApp, horário completo e mapa da unidade,
 * conforme a seção 9 do docs/direcao-site.md. É a página que sustenta a busca
 * local, e por isso carrega o schema LocalBusiness gerado do config.
 *
 * Onde é usado: rota própria, destino do menu, do rodapé e — o mais
 * importante — da chamada final de toda página de ambiente.
 *
 * O QUE AINDA NÃO TEM:
 *   · o mapa, enquanto a loja não mandar o embed do Google Maps. A seção só
 *     aparece quando o dado existe; ver config/derivados.ts.
 *   · foto da fachada, que a direção pede e o acervo não tem.
 *   · o formulário de contato, que é a seção 11 da direção e precisa de um
 *     endpoint próprio. Até lá o WhatsApp e o telefone são o caminho, e os
 *     dois são destinos reais.
 *   Ver docs/pendencias.md.
 */
import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "../../components/layout/Footer";
import { Header } from "../../components/layout/Header";
import { PageHeader } from "../../components/layout/PageHeader";
import { Section } from "../../components/layout/Section";
import Foto from "../../components/midia/Foto";
import {
  enderecoEmLinha,
  linkTelefone,
  linkWhatsApp,
  mapaDaUnidade,
  schemaLocalBusiness,
  unidade,
} from "../../config/derivados.ts";
import { ambientesDaUnidade, escolherFoto } from "../../lib/ambientes-da-unidade.ts";
import { metadataDaPagina } from "../../lib/seo.ts";
import estilos from "./a-loja.module.css";

export const metadata: Metadata = metadataDaPagina({
  titulo: `Showroom em ${unidade.cidade} | Dalmóbile`,
  descricao:
    `Showroom Dalmóbile na ${unidade.endereco.logradouro} — ` +
    `${unidade.endereco.bairro}, ${unidade.cidade}. ` +
    unidade.horarios.map((h) => `${h.dias} das ${h.abre} às ${h.fecha}`).join(", ") + ".",
  caminho: "/a-loja",
  foto: escolherFoto(ambientesDaUnidade(), ["sala-de-estar", "cozinha"], 0)?.src,
});

export default function ALoja() {
  const whatsapp = linkWhatsApp();
  const mapa = mapaDaUnidade();
  const ambientes = ambientesDaUnidade();
  // Sem foto de fachada no acervo, a abertura usa a melhor foto de ambiente.
  const foto = escolherFoto(ambientes, ["sala-de-estar", "cozinha"], 0);
  // A foto que sangra entre o cabeçalho e os dados (V2, fase 3). Outra foto,
  // para não repetir a que entra no lugar do mapa quando ele falta.
  const fotoFaixa = escolherFoto(ambientes, ["quartos", "cozinha"], 2);

  return (
    <>
      <Header superficie="papel" />

      {/* O schema é o motivo de esta página existir para o Google. Gerado do
          config, então não há como divergir do que o rodapé mostra. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLocalBusiness()) }}
      />

      <Section superficie="papel">
        {/* A versão anterior estava certa na ideia e vaga na execução. Esta
            LISTA o que só o showroom resolve: quem é do ramo reconhece os
            quatro, quem não é entende na hora por que vale a visita. */}
        <PageHeader
          titulo={`Showroom ${unidade.cidade}`}
          rotuloNoCaminho="A loja"
          dek="Venha ver de perto o que a foto não resolve."
        >
          <p>
            Acabamento se decide na mão: a cor sob a luz do ambiente, a textura da borda, o peso
            da ferragem, o ruído da corrediça ao fechar. No showroom tudo isso está montado. Se
            puder, traga a planta do imóvel — a conversa anda muito mais rápido.
          </p>
        </PageHeader>

        {fotoFaixa ? (
          <Foto
            src={fotoFaixa.src}
            alt={fotoFaixa.alt}
            sizes="100vw"
            className={`${estilos.faixa} bleed`}
          />
        ) : null}

        <div className={estilos.colunas}>
          {/* Duas colunas no desktop, empilhadas abaixo — a direção pede foto
              ou mapa à esquerda e os dados à direita. No telefone os dados
              vêm primeiro: quem abre esta página quer o endereço. */}
          <div className={estilos.dados}>
            <dl className={estilos.lista}>
              <dt>Endereço</dt>
              <dd>
                <address className={estilos.endereco}>{enderecoEmLinha()}</address>
                {mapa ? (
                  <a href={mapa.link} className={estilos.linkMapa}>
                    Abrir no mapa
                  </a>
                ) : null}
              </dd>

              <dt>Telefone</dt>
              <dd>
                <a href={linkTelefone()}>{unidade.telefone}</a>
              </dd>

              <dt>WhatsApp</dt>
              <dd>
                {whatsapp ? (
                  <a href={whatsapp}>Falar no WhatsApp</a>
                ) : (
                  <span aria-disabled="true">Em breve</span>
                )}
              </dd>

              <dt>Horário</dt>
              <dd>
                <ul className={estilos.horarios}>
                  {unidade.horarios.map((h) => (
                    <li key={h.dias}>
                      <span className={estilos.dias}>{h.dias}</span>
                      <span>
                        {h.abre} às {h.fecha}
                      </span>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>
          </div>

          <div className={estilos.visual}>
            {mapa ? (
              <iframe
                className={estilos.mapa}
                src={mapa.embed}
                title={`Mapa do showroom da Dalmóbile em ${unidade.cidade}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : foto ? (
              // Sem mapa, a foto ocupa o lugar. Melhor uma foto de verdade
              // que uma moldura vazia esperando um dado que não chegou.
              <Foto
                src={foto.src}
                alt={foto.alt}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={estilos.foto}
              />
            ) : null}
          </div>
        </div>
      </Section>

      <Section superficie="cinza" semRespiro>
        <div className={estilos.outraLoja}>
          {/* Nomear a região é melhor para busca e para o leitor do que
              "também atende em outra cidade". */}
          <p className={estilos.outraTexto}>
            A Dalmóbile também atende a partir de {unidade.outraUnidade.cidade}.
          </p>
          <a href={unidade.outraUnidade.url} className={estilos.outraAcao}>
            {unidade.outraUnidade.nome}
          </a>
        </div>
      </Section>

      <Section superficie="papel">
        <h2 className={estilos.subtitulo}>Antes de vir, veja o que já fizemos</h2>
        <ul className={estilos.atalhos}>
          {ambientes.map((a) => (
            <li key={a.slug}>
              <Link href={`/ambientes/${a.slug}`} className={estilos.atalho}>
                {a.nome}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Footer />
    </>
  );
}
