/**
 * / — a home.
 *
 * O que é: o índice do site, não um funil. Cinco seções, cada uma com FORMA
 * PRÓPRIA — nenhuma tem a silhueta da anterior (V2, fase 2; ver
 * docs/direcao-layout-sites-dalmobile.md, seção 5):
 *
 *   abertura  · preto · o vídeo inteiro, 16:9, sem nada por cima; o título vive
 *                        numa faixa preta abaixo dele
 *   manifesto · papel · só tipografia — a única seção sem imagem
 *   projetos  · cinza · grade editorial em ciclo A-B-C, sem carrossel
 *   fábrica   · preto · o único split 50/50 da página
 *   a loja    · papel · faixa 21:9 sangrando e três colunas de serviço
 *   rodapé    · preto
 *
 * Onde é usado: rota `/`, nos dois sites. Tudo o que difere entre as unidades
 * — cidade, endereço, horário, acervo — vem do config e do conteúdo.
 *
 * A COPY FOI APROVADA EM SETEMBRO. A V2 mudou só a forma: os textos são os
 * mesmos da V1. Saíram os rótulos numerados (01 —, 02 —, 03 —), a legenda que
 * ficava sobre a foto da fábrica e a da foto do manifesto, que saiu junto com
 * a foto.
 */
import Link from "next/link";

import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import Foto from "../components/midia/Foto";
import GradeEditorial, { type FotoDaGrade } from "../components/midia/GradeEditorial";
import VideoEmLoop from "../components/midia/VideoEmLoop";
import { enderecoEmLinha, linkTelefone, linkWhatsApp, unidade } from "../config/derivados";
import { ambientesDaUnidade, escolherFoto } from "../lib/ambientes-da-unidade.ts";
import estilos from "./home.module.css";

/** Quantas fotos a vitrine mostra: três ciclos A-B-C de quatro fotos. */
const FOTOS_NA_VITRINE = 12;

export default function Home() {
  // A vitrine sai do acervo real desta unidade. Como vem do config, o site de
  // Caraguá mostra os ambientes de Caraguá sozinho.
  const ambientes = ambientesDaUnidade();
  const whatsapp = linkWhatsApp();

  // Fotos de apoio. A lista de preferência cai para o que a unidade tiver:
  // Caraguá não tem home office nem closet.
  const fotoFabrica = escolherFoto(ambientes, ["cozinha", "banheiro"], 7);
  const fotoLoja = escolherFoto(ambientes, ["quartos", "sala-de-estar"], 5);

  // As fotos do acervo INTERCALADAS entre os ambientes: agrupadas, os
  // primeiros ciclos seriam só cozinha. A ordem de entrada é a editorial de
  // lib/ambientes.ts, então a primeira foto da vitrine é sempre a da cozinha.
  // Caraguá, com menos acervo, mostra até onde o acervo der.
  const porAmbiente: FotoDaGrade[][] = ambientes.map((ambiente) =>
    ambiente.fotos.map((foto) => ({
      src: foto.src,
      titulo: foto.titulo,
      alt: foto.alt,
      ambienteNome: ambiente.nome,
      ambienteSlug: ambiente.slug,
    })),
  );
  const vitrine: FotoDaGrade[] = [];
  for (let volta = 0; volta < Math.max(0, ...porAmbiente.map((f) => f.length)); volta++) {
    for (const fotos of porAmbiente) {
      if (fotos[volta]) vitrine.push(fotos[volta]);
    }
  }

  return (
    <>
      <Header superficie="preto" />

      <main>
        {/* ABERTURA · preto. O vídeo entra inteiro e sem nada por cima — nem
            cartão, nem véu, nem o cabeçalho: escurecer ou cobrir a imagem para
            caber texto é jogar fora o único ativo que a concorrência não tem. */}
        <section className={estilos.abertura}>
          <div className={estilos.aberturaMidia}>
            <VideoEmLoop
              className={estilos.aberturaVideo}
              webm="/videos/hero-loop.webm"
              mp4="/videos/hero-loop.mp4"
              poster="/videos/hero-loop-poster.jpg"
            />
          </div>
          <div className={estilos.aberturaFaixa}>
            {/* "Crie seu mundo" é assinatura de marca e continua no rodapé. */}
            <p className={estilos.rotulo}>MÓVEIS PLANEJADOS · {unidade.cidade.toUpperCase()}</p>
            <h1 className={estilos.aberturaTitulo}>O projeto começa na medição.</h1>
            <p className={estilos.aberturaDek}>
              Marcenaria desenhada, fabricada e instalada pela Dalmóbile. Fábrica própria
              desde 1977.
            </p>
            <Link href="/ambientes" className={estilos.botao}>
              Ver os ambientes
            </Link>
          </div>
        </section>

        {/* MANIFESTO · papel. Só tipografia: sem foto, sem split, sem rótulo.
            O silêncio é a forma dela, e é o que quebra a cadeia de splits. */}
        <section className={estilos.manifesto}>
          <h2 className={estilos.manifestoFrase}>Nenhuma casa é igual à planta.</h2>
          <p className={estilos.manifestoTexto}>
            A medição é feita no imóvel, com a obra pronta — é de lá que sai o desenho.
            O pé-direito real, o vão que ficou dois centímetros fora do projeto, a tomada
            que ninguém previu. O móvel se ajusta à casa; nunca o contrário.
          </p>
          <Link href="/a-dalmobile" className={estilos.linkDiscreto}>
            Como trabalhamos
          </Link>
        </section>

        {/* PROJETOS · cinza. "Fotografado depois da montagem": aqui não tem
            render, nem banco de imagem, nem apartamento de fornecedor. */}
        <section className={estilos.projetos} aria-labelledby="titulo-vitrine">
          <h2 id="titulo-vitrine" className={estilos.secaoTitulo}>
            Fotografado depois da montagem.
          </h2>
          <GradeEditorial fotos={vitrine.slice(0, FOTOS_NA_VITRINE)} />
          <Link href="/ambientes" className={`${estilos.linkDiscreto} ${estilos.projetosFim}`}>
            Ver todos os ambientes
          </Link>
        </section>

        {/* FÁBRICA · preto. O único split da página — por isso ele significa
            alguma coisa. Foto à esquerda, texto à direita. */}
        <section className={estilos.fabrica}>
          <div className={estilos.fabricaFoto}>
            <Foto
              src={fotoFabrica.src}
              alt={fotoFabrica.alt}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className={estilos.fabricaTexto}>
            <h2 className={estilos.fabricaTitulo}>Produção própria, com garantia publicada.</h2>
            <p className={estilos.fabricaCorpo}>
              A marcenaria não é comprada de terceiro: sai da fábrica da própria Dalmóbile,
              100% em MDF, com ferragem e acabamento definidos no projeto. Cada proposta vai
              com a lista de acabamentos por nome e código — o que permite comparar
              orçamentos com honestidade e repor uma peça daqui a cinco anos sem adivinhação.
            </p>
            {/* Três números verificados em fonte pública da rede. Em linha de
                fios verticais, sem caixa: faixa de números com fundo próprio é
                dispositivo de landing page. */}
            <ul className={estilos.numeros}>
              <li><strong>1977</strong><span>ano em que a fábrica começou</span></li>
              <li><strong>100%</strong><span>MDF em todo o projeto</span></li>
              <li><strong>6</strong><span>anos de garantia</span></li>
            </ul>
          </div>
        </section>

        {/* A LOJA · papel. Faixa baixa: foto 21:9 sangrando e, abaixo, três
            colunas de serviço. Publicar o horário é vantagem direta: o
            concorrente mais forte da cidade não publica o dele. */}
        <section className={estilos.loja}>
          <p className={estilos.rotulo}>SHOWROOM {unidade.cidade.toUpperCase()}</p>
          <h2 className={estilos.secaoTitulo}>Venha com a planta em mãos.</h2>
          <div className={`${estilos.lojaFoto} bleed`}>
            <Foto src={fotoLoja.src} alt={fotoLoja.alt} sizes="100vw" />
          </div>
          <div className={estilos.lojaColunas}>
            <div>
              <h3 className={estilos.rotulo}>Endereço</h3>
              <p>{enderecoEmLinha()}</p>
            </div>
            <div>
              <h3 className={estilos.rotulo}>Horário</h3>
              {unidade.horarios.map((h) => (
                <p key={h.dias}>{`${h.dias}, ${h.abre} às ${h.fecha}`}</p>
              ))}
            </div>
            <div>
              <h3 className={estilos.rotulo}>Contato</h3>
              <p>
                <a href={linkTelefone()} className={estilos.linkDiscreto}>
                  {unidade.telefone}
                </a>
              </p>
              {/* A única seta da seção: é o único link que sai do site. */}
              {whatsapp ? (
                <p>
                  <a href={whatsapp} className={estilos.linkDiscreto}>
                    Falar no WhatsApp <span aria-hidden="true">↗</span>
                  </a>
                </p>
              ) : (
                <p aria-disabled="true">Contato em breve</p>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
