/**
 * / — a home, provisória.
 *
 * O que é: o estudo 03 Síntese, que foi o escolhido, promovido a conteúdo
 * direto. Os estudos Editorial e Imersiva e o seletor de layout saíram: eram
 * andaime de protótipo e chegaram a ir ao ar nos dois deploys.
 *
 * PROVISÓRIA: a home de verdade é a Fase 6, que a remonta com Header, Footer e
 * Section, sobre a composição da seção 3 do docs/direcao-site.md. Até lá esta
 * página usa marcação própria e o CSS de `.synthesis-*` do globals.css.
 *
 * Não copiar nada daqui para uma página nova. O que já está pronto para reuso
 * vive em components/.
 */

// A cidade vem do config, nunca escrita à mão: até andaime entra no bundle, e
// o teste de cidade cruzada vasculha tudo.
import Link from "next/link";

import { Brand } from "../components/layout/Brand";
import { Header } from "../components/layout/Header";
import Foto from "../components/midia/Foto";
import SliderDeFotos, { type FotoDoSlider } from "../components/midia/SliderDeFotos";
import VideoEmLoop from "../components/midia/VideoEmLoop";
import { enderecoEmLinha, linkWhatsApp, unidade } from "../config/derivados";
import { ambientesDaUnidade, escolherFoto } from "../lib/ambientes-da-unidade.ts";

const Arrow = () => <span aria-hidden="true">↗</span>;

export default function Home() {
  // A vitrine sai do acervo real desta unidade, não de foto de estudo. Como
  // vem do config, o site de Caraguá mostra os ambientes de Caraguá sozinho.
  const ambientes = ambientesDaUnidade();
  const whatsapp = linkWhatsApp();

  // As três fotos de apoio da home. A lista de preferência cai para o que a
  // unidade tiver: Caraguá não tem home office nem closet.
  const fotoManifesto = escolherFoto(ambientes, ["sala-de-estar", "cozinha"], 3);
  const fotoProcesso = escolherFoto(ambientes, ["cozinha", "banheiro"], 7);
  const fotoContato = escolherFoto(ambientes, ["quartos", "sala-de-estar"], 5);

  // TODAS as fotos do acervo desta unidade, INTERCALADAS entre os ambientes.
  //
  // Não é enfeite: o slider mostra três fotos por conjunto, e agrupadas por
  // ambiente os quatro primeiros conjuntos seriam só cozinha. Intercalando,
  // cada conjunto mostra cozinha, quarto e sala — que é o que faz a pessoa
  // querer passar para o lado. A ordem de entrada continua sendo a editorial
  // de lib/ambientes.ts, então a primeira foto do site é sempre a da cozinha.
  const porAmbiente = ambientes.map((ambiente) =>
    ambiente.fotos.map((foto) => ({
      src: foto.src,
      titulo: foto.titulo,
      alt: foto.alt,
      ambienteNome: ambiente.nome,
      ambienteSlug: ambiente.slug,
      edificio: foto.edificio,
      arquiteto: foto.arquiteto,
    })),
  );

  const fotosDoSlider: FotoDoSlider[] = [];
  for (let volta = 0; volta < Math.max(0, ...porAmbiente.map((f) => f.length)); volta++) {
    for (const fotos of porAmbiente) {
      if (fotos[volta]) fotosDoSlider.push(fotos[volta]);
    }
  }

  return (
    <div className="site site-synthesis">
      {/* O mesmo cabeçalho das outras páginas, em papel sólido, ACIMA do
          vídeo e não por cima dele: a abertura não leva nada sobre a imagem.
          O cabeçalho próprio que a home tinha escondia o menu no celular. */}
      <Header />

      <main>
        {/* A abertura é SÓ o vídeo (v4, 05/10/2026): inteiro na largura, sem
            nada por cima e sem faixa de texto embaixo. A faixa com o rótulo,
            o título "O projeto começa na medição.", o parágrafo e o botão
            saiu — empilhava dois títulos gigantes no mesmo papel. O h1 da
            página passou a ser o título da seção seguinte. O vídeo é
            decorativo (aria-hidden). */}
        <section className="synthesis-hero">
          <div className="synthesis-hero-media">
            <VideoEmLoop
              className="synthesis-hero-video"
              webm="/videos/hero-loop.webm"
              mp4="/videos/hero-loop.mp4"
              poster="/videos/hero-loop-poster.jpg"
            />
          </div>
        </section>

        <section className="synthesis-manifesto superficie-papel" id="sintese-manifesto">
          <div className="synthesis-manifesto-content">
            {/* Copy v4 (docs/copy-v4.md, home, seção 1): a frase de abertura da
                apresentação institucional, e o h1 da página desde a v4. */}
            <p className="eyebrow">MÓVEIS PLANEJADOS · {unidade.cidade.toUpperCase()}</p>
            <h1>Móveis personalizados para espaços com identidade</h1>
            <p>
              Com origem em Bento Gonçalves, a Dalmóbile reúne design, precisão industrial e
              cuidado com os acabamentos para desenvolver ambientes de alto padrão. O desenho
              acompanha o espaço e a intenção do projeto: a medição é feita no imóvel, com a
              obra pronta, e cada peça é editada milímetro a milímetro.
            </p>
            <Link href="/a-dalmobile">Como trabalhamos <Arrow /></Link>
          </div>
          <figure className="synthesis-manifesto-image">
            <Foto src={fotoManifesto.src} alt={fotoManifesto.alt} sizes="(max-width: 1024px) 100vw, 50vw" />
            {/* Três fatos de processo (copy v3, A2). A garantia saiu do site. */}
            <figcaption>FÁBRICA PRÓPRIA · 100% MDF · EDIÇÃO MILIMÉTRICA</figcaption>
          </figure>
        </section>

        <section className="synthesis-projects superficie-grafite" id="sintese-projetos">
          <div className="synthesis-section-heading">
            <div>
              {/* "Fotografado depois da montagem" faz uma afirmação que a
                  concorrência não pode fazer: aqui não tem render, não tem
                  banco de imagem, não tem apartamento de fornecedor. */}
              <p className="eyebrow">PROJETOS EXECUTADOS</p>
              <h2 id="titulo-vitrine">Fotografado depois da montagem</h2>
            </div>
            <Link href="/ambientes">Ver todos os ambientes <Arrow /></Link>
          </div>

          {/* O acervo inteiro desta unidade, passando para o lado. Antes eram
              três fotos de estudo com rótulos inventados. O slider rola por
              scroll-snap nativo: sem biblioteca, e funciona sem JavaScript. */}
          <SliderDeFotos fotos={fotosDoSlider} idRotulo="titulo-vitrine" />
        </section>

        <section className="synthesis-process superficie-papel" id="sintese-processo">
          <div className="synthesis-process-image">
            <Foto src={fotoProcesso.src} alt={fotoProcesso.alt} sizes="(max-width: 1024px) 100vw, 50vw" />
            <span>O QUE VEM DA FÁBRICA</span>
          </div>
          <div className="synthesis-process-copy">
            {/* Copy v4 (home, seção 3): a linha do tempo da apresentação. */}
            <p className="eyebrow">UMA HISTÓRIA EM EVOLUÇÃO</p>
            <h2>Da marcenaria à personalização de alto padrão</h2>
            <p>
              A Dalmóbile nasceu em 1977, em Bento Gonçalves, como Esquadrias Cladeju.
              Assumiu o nome atual em 2000, ganhou nova sede de 10.000 m² em 2012 e, desde
              2025, tem foco em móveis personalizados, flexíveis e de alto padrão. As duas
              fábricas produzem a linha inteira: MDF, laca, vidro e alumínio.
            </p>
            <Link href="/a-dalmobile">Conheça a Dalmóbile <Arrow /></Link>
            {/* Três números verificados (copy v3, A4). "6 anos de garantia" saiu:
                garantia é conversa de venda, não de site. */}
            <div className="synthesis-stats">
              <div><strong>1977</strong><span>ano em que a fábrica começou</span></div>
              <div><strong>2</strong><span>fábricas próprias em Bento Gonçalves</span></div>
              <div><strong>100%</strong><span>MDF em toda a linha</span></div>
            </div>
          </div>
        </section>

        <section className="synthesis-contact superficie-grafite" id="sintese-contato">
          <div className="synthesis-contact-copy">
            {/* Publicar endereço e horário aqui é vantagem direta: o
                concorrente mais forte da cidade não publica o dele. */}
            <p className="eyebrow">SHOWROOM {unidade.cidade.toUpperCase()}</p>
            {/* Copy v4 (home, seção 4): "Para quem vai viver o ambiente" e as
                três perguntas da apresentação. */}
            <h2>Para quem vai viver o ambiente</h2>
            <p>
              Três perguntas ajudam a transformar preferências em prioridades de projeto: o
              que precisa caber, o que precisa facilitar e que sensação você quer encontrar.
              Traga as respostas, e a planta do imóvel, para a conversa no showroom.
            </p>
            {/* O endereço foi para o rodapé (05/10/2026, pedido do cliente);
                aqui fica o horário, a 16px do texto. */}
            <p className="synthesis-contact-horario">
              {unidade.horarios
                .map((h) => `${h.dias}, ${h.abre} às ${h.fecha}`)
                .join(" · ")}
            </p>
            {/* Destino REAL. Antes apontava para #sintese-contato, que é esta
                mesma seção — o "link âncora para a própria seção" que o
                CLAUDE.md proíbe. /a-loja ainda não existe; ver
                docs/pendencias.md. */}
            {whatsapp ? (
              <a href={whatsapp}>Falar no WhatsApp <Arrow /></a>
            ) : (
              <span aria-disabled="true">Contato em breve</span>
            )}
          </div>
          <div className="synthesis-contact-image"><Foto src={fotoContato.src} alt={fotoContato.alt} sizes="(max-width: 1024px) 100vw, 50vw" /></div>
        </section>
      </main>

      {/* O fim da home: a marca e o endereço da loja, no cinza do rodapé (v4:
          o rodapé é cinza em toda página; era preto). O endereço saiu da seção
          de contato e veio para cá (pedido do cliente, 05/10/2026). Horário e
          WhatsApp continuam na seção de contato logo acima — o rodapé
          completo repetiria tudo (decisão do cliente, 02/10/2026). As páginas
          internas seguem com o rodapé completo. */}
      <footer className="synthesis-footer">
        <Brand />
        <address className="synthesis-footer-endereco">{enderecoEmLinha()}</address>
      </footer>
    </div>
  );
}
