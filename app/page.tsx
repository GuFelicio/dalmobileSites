/**
 * / — a home, e desde a v5 (06/10/2026) o site inteiro.
 *
 * O que é: a página única dos dois sites. Seis blocos, cada um com o id que o
 * menu usa para rolar até ele (docs/copy-home-v5.md, "Estrutura da home"):
 *
 *   #topo         abertura, só o vídeo
 *   #inicio       manifesto                 papel   (o h1 da página)
 *   #projetos     projetos executados        grafite
 *   #a-dalmobile  fábrica                    papel
 *   #arquitetos   para arquitetos            grafite
 *   #a-loja       showroom                   papel
 *                 rodapé                     cinza
 *
 * As páginas internas (/ambientes, /a-dalmobile, /arquitetos, /a-loja) saíram
 * na v5 e respondem 301 para estas seções (worker/index.ts). O código delas
 * está na tag v4-multipagina.
 *
 * O texto é o de docs/copy-home-v5.md, literal. A marcação ainda é a do estudo
 * 03 Síntese, com o CSS de `.synthesis-*` do globals.css.
 */

// A cidade vem do config, nunca escrita à mão: o teste de cidade cruzada
// vasculha o bundle inteiro.
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import Foto from "../components/midia/Foto";
import SliderDeFotos from "../components/midia/SliderDeFotos";
import VideoEmLoop from "../components/midia/VideoEmLoop";
import {
  linkWhatsApp,
  mapaDaUnidade,
  schemaLocalBusiness,
  unidade,
} from "../config/derivados";
import { fotosDaHome, fotosDoCarrossel } from "../lib/acervo.ts";

const Arrow = () => <span aria-hidden="true">↗</span>;

export default function Home() {
  const whatsapp = linkWhatsApp();

  // As fotos vêm de lib/acervo.ts: do acervo da unidade no config, quando ela
  // tem um (sem título, com o crédito), ou de conteudo/ambientes/ (com título).
  const fotosDoSlider = fotosDoCarrossel();
  const {
    manifesto: fotoManifesto,
    fabrica: fotoProcesso,
    arquitetos: fotoArquitetos,
    showroom: fotoContato,
  } = fotosDaHome();

  const mapa = mapaDaUnidade();

  return (
    <div className="site site-synthesis">
      {/* O mesmo cabeçalho de /privacidade, em papel sólido, ACIMA do vídeo e
          não por cima dele. Os itens do menu rolam até as seções abaixo. */}
      <Header />

      {/* O schema LocalBusiness veio de /a-loja para cá na v5: é a página que
          o Google indexa. Gerado do config — não há como divergir do rodapé. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLocalBusiness()) }}
      />

      <main>
        {/* A abertura é SÓ o vídeo (v4): inteiro na largura, sem nada por cima
            e sem faixa de texto embaixo. O vídeo é decorativo (aria-hidden). */}
        <section className="synthesis-hero" id="topo">
          <div className="synthesis-hero-media">
            {/* Duas versões (07/10/2026): vertical (720×1280) até 600px,
                horizontal (1920×1080) acima. O navegador baixa só a que serve
                à tela. */}
            <VideoEmLoop
              className="synthesis-hero-video"
              media="(max-width: 600px)"
              mobile={{
                mp4: "/videos/hero-loop-mobile.mp4",
                poster: "/videos/hero-loop-mobile-poster.jpg",
              }}
              desktop={{
                webm: "/videos/hero-loop.webm",
                mp4: "/videos/hero-loop.mp4",
                poster: "/videos/hero-loop-poster.jpg",
              }}
            />
          </div>
        </section>

        <section className="synthesis-manifesto superficie-papel" id="inicio">
          <div className="synthesis-manifesto-content">
            <p className="eyebrow">MÓVEIS PLANEJADOS · {unidade.cidade.toUpperCase()}</p>
            {/* Quebra de linha depois de "Móveis personalizados", pedida pelo
                cliente (06/10/2026): no desktop o par fica numa linha só e o
                resto embaixo. No celular as duas palavras não cabem juntas no
                tamanho do h1, e cada uma ocupa a sua linha. */}
            <h1>
              <span className="synthesis-linha">Móveis personalizados</span> para espaços com
              identidade
            </h1>
            <p>
              Com origem em Bento Gonçalves, a Dalmóbile fabrica móveis personalizados de alto
              padrão. O desenho acompanha o espaço e a intenção do projeto: medimos no imóvel,
              com a obra pronta, e cada peça é editada milímetro a milímetro.
            </p>
            {/* "Como trabalhamos" saiu na v5: levava a /a-dalmobile. */}
          </div>
          <figure className="synthesis-manifesto-image">
            {fotoManifesto ? (
              <Foto src={fotoManifesto.src} alt={fotoManifesto.alt} sizes="(max-width: 1024px) 100vw, 50vw" />
            ) : null}
            <figcaption>FÁBRICA PRÓPRIA · 100% MDF · EDIÇÃO MILIMÉTRICA</figcaption>
          </figure>
        </section>

        <section className="synthesis-projects superficie-grafite" id="projetos">
          <div className="synthesis-section-heading">
            <div>
              <p className="eyebrow">PROJETOS EXECUTADOS</p>
              <h2 id="titulo-vitrine">Fotografado depois da montagem</h2>
            </div>
            {/* "Ver todos os ambientes" saiu na v5, com as páginas de ambiente. */}
          </div>

          {/* O acervo inteiro desta unidade, passando para o lado, por
              scroll-snap nativo: sem biblioteca, e funciona sem JavaScript. */}
          <SliderDeFotos fotos={fotosDoSlider} idRotulo="titulo-vitrine" />
        </section>

        <section className="synthesis-process superficie-papel" id="a-dalmobile">
          <div className="synthesis-process-image">
            {fotoProcesso ? (
              <Foto src={fotoProcesso.src} alt={fotoProcesso.alt} sizes="(max-width: 1024px) 100vw, 50vw" />
            ) : null}
            <span>O QUE VEM DA FÁBRICA</span>
          </div>
          <div className="synthesis-process-copy">
            <p className="eyebrow">UMA HISTÓRIA EM EVOLUÇÃO</p>
            {/* "de alto padrão" sempre junto, numa linha própria (pedido do
                cliente, 06/10/2026): partido, lia "alto / padrão". */}
            <h2>
              Da marcenaria à personalização{" "}
              <span className="synthesis-linha synthesis-inteira">de alto padrão</span>
            </h2>
            <p>
              A Dalmóbile nasceu em 1977, em Bento Gonçalves, como Esquadrias Cladeju. Assumiu o
              nome atual em 2000, ganhou nova sede de 10.000 m² em 2012 e, desde 2025, tem foco
              em móveis personalizados e flexíveis. As duas fábricas produzem a linha inteira:
              MDF, laca, vidro e alumínio.
            </p>
            {/* "Conheça a Dalmóbile" saiu na v5: levava a /a-dalmobile. */}
            <div className="synthesis-stats">
              <div><strong>1977</strong><span>ano em que a fábrica começou</span></div>
              <div><strong>2</strong><span>fábricas próprias em Bento Gonçalves</span></div>
              <div><strong>100%</strong><span>MDF em toda a linha</span></div>
            </div>
          </div>
        </section>

        {/* Para arquitetos (v5, seção nova): o resumo da antiga /arquitetos.
            Rótulo e título à esquerda; os três itens à direita, com fio entre
            eles, e a frase final embaixo. Sem botão: o contato é o showroom,
            logo abaixo. */}
        <section className="synthesis-architects superficie-grafite" id="arquitetos">
          <div className="synthesis-architects-heading">
            <p className="eyebrow">PARA ARQUITETOS E DESIGNERS</p>
            <h2>Detalhamento, especificação e orçamento de escritório com quem fabrica a peça</h2>
            {/* Uma foto de projeto assinado por arquiteto, com o crédito, embaixo
                do título (pedido do cliente, 06/10/2026: a coluna ficava vazia
                ao lado dos itens). É a prova do que a seção promete. */}
            {fotoArquitetos?.arquiteto ? (
              <figure className="synthesis-architects-image">
                <Foto src={fotoArquitetos.src} alt={fotoArquitetos.alt} sizes="(max-width: 1024px) 100vw, 45vw" />
                <figcaption>Projeto / {fotoArquitetos.arquiteto}</figcaption>
              </figure>
            ) : null}
          </div>
          <div className="synthesis-architects-body">
            <ul className="synthesis-architects-items">
              <li>
                <h3>Autoria preservada</h3>
                <p>
                  Você entrega o projeto e nós detalhamos a marcenaria: encaixes, ferragens,
                  espessuras e folgas de obra. Nada entra na fábrica sem a sua aprovação.
                </p>
              </li>
              <li>
                <h3>Suporte à especificação</h3>
                <p>
                  Desde o início do projeto, você pode especificar laca, vidro e alumínio da
                  própria fábrica, painéis ripados retos ou curvos, cantos curvos, portas que
                  entram no móvel e tomadas embutidas. Se o padrão de MDF não estiver na
                  cartela, a linha One produz no padrão de qualquer grande fornecedor.
                </p>
              </li>
              <li>
                <h3>Orçamento de escritório</h3>
                <p>O orçamento de escritório entra numa fila própria, separada do balcão.</p>
              </li>
            </ul>
          </div>
          {/* A frase final, centralizada na largura da seção, embaixo das duas
              colunas (pedido do cliente, 06/10/2026). Exceção ao alinhamento à
              esquerda do CLAUDE.md — ver docs/decisoes.md. */}
          <p className="synthesis-architects-closing">
            Se você projeta e quer conhecer os acabamentos ou a fábrica, fale com a loja.
          </p>
        </section>

        {/* O showroom passou de grafite para PAPEL na v5, para a alternância
            continuar depois da seção de arquitetos. */}
        <section className="synthesis-contact superficie-papel" id="a-loja">
          <div className="synthesis-contact-copy">
            <p className="eyebrow">SHOWROOM {unidade.cidade.toUpperCase()}</p>
            <h2>Para quem vai viver o ambiente</h2>
            <p>
              Três perguntas ajudam a definir o que o projeto precisa resolver: o que precisa
              caber, o que precisa facilitar e que sensação você quer encontrar. Traga as
              respostas, e a planta do imóvel, para a conversa no showroom.
            </p>
            {/* Endereço e horário saíram daqui (pedido do cliente, 06/10/2026:
                a seção ficava poluída); o endereço fica no rodapé, logo abaixo.
                Fica o "Abrir no mapa", a 16px do texto. */}
            {mapa ? (
              <div className="synthesis-contact-dados">
                <a href={mapa.link}>Abrir no mapa</a>
              </div>
            ) : null}
            {whatsapp ? (
              <a className="synthesis-contact-acao" href={whatsapp}>
                Falar no WhatsApp <Arrow />
              </a>
            ) : null}
            {/* A outra loja, com link para o OUTRO SITE. É a única menção à
                outra cidade no corpo (tests/unidade-cruzada.test.mjs). */}
            <p className="synthesis-contact-outra">
              No {unidade.outraUnidade.regiao}, a Dalmóbile atende pela loja de{" "}
              {unidade.outraUnidade.cidade}.{" "}
              <a href={unidade.outraUnidade.url}>{unidade.outraUnidade.nome}</a>
            </p>
          </div>
          <div className="synthesis-contact-image">
            {fotoContato ? (
              <Foto src={fotoContato.src} alt={fotoContato.alt} sizes="(max-width: 1024px) 100vw, 50vw" />
            ) : null}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
