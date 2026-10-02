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
      <Header superficie="papel" />

      <main>
        <section className="synthesis-hero">
          {/* O vídeo de projeto executado entra INTEIRO, de ponta a ponta, sem
              nada por cima e sem escurecimento. É decorativo (aria-hidden): o
              título e o texto vivem na faixa logo abaixo. */}
          <div className="synthesis-hero-media">
            <VideoEmLoop
              className="synthesis-hero-video"
              webm="/videos/hero-loop.webm"
              mp4="/videos/hero-loop.mp4"
              poster="/videos/hero-loop-poster.jpg"
            />
          </div>
          {/* A faixa do título, em papel, IMEDIATAMENTE abaixo do vídeo. Era um
              cartão sobre a imagem; os elementos, os tamanhos e a ordem são os
              mesmos. Emenda sem corte com a seção seguinte, também papel. */}
          <div className="synthesis-hero-panel">
            {/* "Crie seu mundo" é assinatura de marca e continua no rodapé,
                onde assinatura fica. Como manchete, não dizia nada que o
                concorrente não pudesse dizer. */}
            <p className="eyebrow">MÓVEIS PLANEJADOS · {unidade.cidade.toUpperCase()}</p>
            <h1>O projeto começa na medição.</h1>
            <p>
              Móveis personalizados, editados milímetro a milímetro para o seu imóvel.
              Fábrica própria desde 1977.
            </p>
            <Link href="/ambientes">Ver os ambientes <Arrow /></Link>
          </div>

        </section>

        <section className="synthesis-manifesto" id="sintese-manifesto">
          <div className="synthesis-manifesto-content">
            {/* "Liberdade criativa", "escuta", "repertório" e "identidade" são
                palavras que qualquer marcenaria do país usa. A mesma ideia —
                o projeto é seu, não é catálogo — dita por um fato de ofício. */}
            <p className="eyebrow">COMO PROJETAMOS</p>
            <h2>Nenhuma casa é igual à planta.</h2>
            <p>
              A medição é feita no imóvel, com a obra pronta, e é de lá que sai o desenho:
              o pé-direito real, o vão que ficou dois centímetros fora do projeto, a tomada
              que ninguém previu. Na Dalmóbile não existe módulo padrão. Cada peça é editada
              milímetro a milímetro para caber no que a obra entregou.
            </p>
            <Link href="/a-dalmobile">Como trabalhamos <Arrow /></Link>
          </div>
          <figure className="synthesis-manifesto-image">
            <Foto src={fotoManifesto.src} alt={fotoManifesto.alt} sizes="(max-width: 1024px) 100vw, 50vw" />
            {/* Três fatos de processo (copy v3, A2). A garantia saiu do site. */}
            <figcaption>FÁBRICA PRÓPRIA · 100% MDF · EDIÇÃO MILIMÉTRICA</figcaption>
          </figure>
        </section>

        <section className="synthesis-projects" id="sintese-projetos">
          <div className="synthesis-section-heading">
            <div>
              {/* "Fotografado depois da montagem" faz uma afirmação que a
                  concorrência não pode fazer: aqui não tem render, não tem
                  banco de imagem, não tem apartamento de fornecedor. */}
              <p className="eyebrow">PROJETOS EXECUTADOS</p>
              <h2 id="titulo-vitrine">Fotografado depois da montagem.</h2>
            </div>
            <Link href="/ambientes">Ver todos os ambientes <Arrow /></Link>
          </div>

          {/* O acervo inteiro desta unidade, passando para o lado. Antes eram
              três fotos de estudo com rótulos inventados. O slider rola por
              scroll-snap nativo: sem biblioteca, e funciona sem JavaScript. */}
          <SliderDeFotos fotos={fotosDoSlider} idRotulo="titulo-vitrine" />
        </section>

        <section className="synthesis-process" id="sintese-processo">
          <div className="synthesis-process-image">
            <Foto src={fotoProcesso.src} alt={fotoProcesso.alt} sizes="(max-width: 1024px) 100vw, 50vw" />
            <span>O QUE VEM DA FÁBRICA</span>
          </div>
          <div className="synthesis-process-copy">
            <p className="eyebrow">DA FÁBRICA À MONTAGEM</p>
            <h2>Do MDF ao vidro, tudo sai da mesma fábrica.</h2>
            <p>
              Os móveis saem das duas fábricas da Dalmóbile em Bento Gonçalves, na Serra
              Gaúcha, que produzem a linha inteira: MDF, laca, vidro e alumínio. A borda é
              colada com cola PUR, que não solta com calor e umidade, o fundo recebe proteção
              antimofo e todo móvel leva o selo de origem impresso na chapa.
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

        <section className="synthesis-contact" id="sintese-contato">
          <div className="synthesis-contact-copy">
            {/* "Seu mundo começa com uma conversa" é o clichê mais comum do
                setor. "Venha com a planta em mãos" diz o próximo passo
                concreto, sinaliza que ali se fala de projeto e qualifica quem
                chega. E publicar o horário é vantagem direta: o concorrente
                mais forte da cidade não publica o dele. */}
            <p className="eyebrow">SHOWROOM {unidade.cidade.toUpperCase()}</p>
            <h2>Venha com a planta em mãos.</h2>
            <p>{enderecoEmLinha()}</p>
            <p>
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

      {/* O fim da home: uma barra preta só com a marca. Endereço, horário e
          WhatsApp já estão na seção da loja logo acima — repeti-los num rodapé
          completo seria a mesma informação duas vezes (decisão do cliente,
          02/10/2026). As páginas internas seguem com o rodapé completo. */}
      <footer className="synthesis-footer">
        <Brand claro />
      </footer>
    </div>
  );
}
