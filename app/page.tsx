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

import Foto from "../components/midia/Foto";
import SliderDeFotos, { type FotoDoSlider } from "../components/midia/SliderDeFotos";
import VideoEmLoop from "../components/midia/VideoEmLoop";
import { enderecoEmLinha, linkWhatsApp, navegacao, unidade } from "../config/derivados";
import { ambientesDaUnidade, escolherFoto } from "../lib/ambientes-da-unidade.ts";

const Arrow = () => <span aria-hidden="true">↗</span>;

function Brand({ light = false }: { light?: boolean }) {
  return (
    <img
      className={`brand-mark${light ? " brand-mark--light" : ""}`}
      src="/assets/dalmobile-logo.png"
      alt="Dalmóbile — Crie seu mundo"
    />
  );
}

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
      <header className="header synthesis-header">
        <Brand light />
        {/* Rotas, não âncoras. "A Dalmóbile" e "Como criamos" apontavam para
            seções desta página, e quem entrava pela home nunca descobria
            /a-dalmobile nem /arquitetos. As âncoras continuam existindo; só
            não ocupam o lugar das páginas. */}
        <nav aria-label="Navegação principal">
          {navegacao.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.rotulo}
            </Link>
          ))}
        </nav>
        {whatsapp ? (
          <a className="synthesis-header-link" href={whatsapp}>
            Falar no WhatsApp <Arrow />
          </a>
        ) : (
          <Link className="synthesis-header-link" href="/a-loja">
            Showroom {unidade.nome} <Arrow />
          </Link>
        )}
      </header>

      <main>
        <section className="synthesis-hero">
          {/* Vídeo de projeto executado no fundo da capa, no lugar da foto. É
              decorativo (aria-hidden): o título e o texto estão no painel.
              Ver docs/decisoes.md, 2026-10-01. */}
          <VideoEmLoop
            className="synthesis-hero-video"
            webm="/videos/hero-loop.webm"
            mp4="/videos/hero-loop.mp4"
            poster="/videos/hero-loop-poster.jpg"
          />
          {/* Só o topo escurece, e pouco: é o que deixa o logo, o menu e o
              "Falar no WhatsApp" legíveis sobre as partes claras do vídeo. O
              vídeo em si nunca é escurecido. */}
          <div className="synthesis-hero-top" aria-hidden="true" />
          <div className="synthesis-hero-panel">
            {/* "Crie seu mundo" é assinatura de marca e continua no rodapé,
                onde assinatura fica. Como manchete, não dizia nada que o
                concorrente não pudesse dizer. */}
            <p className="eyebrow">MÓVEIS PLANEJADOS · {unidade.cidade.toUpperCase()}</p>
            <h1>O projeto começa na medição.</h1>
            <p>
              Marcenaria desenhada, fabricada e instalada pela Dalmóbile. Fábrica própria
              desde 1977.
            </p>
            <Link href="/ambientes">Ver os ambientes <Arrow /></Link>
          </div>

        </section>

        <section className="synthesis-manifesto" id="sintese-manifesto">
          <div className="synthesis-manifesto-content">
            {/* "Liberdade criativa", "escuta", "repertório" e "identidade" são
                palavras que qualquer marcenaria do país usa. A mesma ideia —
                o projeto é seu, não é catálogo — dita por um fato de ofício. */}
            <p className="eyebrow">01 — COMO PROJETAMOS</p>
            <h2>Nenhuma casa é igual à planta.</h2>
            <p>
              A medição é feita no imóvel, com a obra pronta — é de lá que sai o desenho.
              O pé-direito real, o vão que ficou dois centímetros fora do projeto, a tomada
              que ninguém previu. O móvel se ajusta à casa; nunca o contrário.
            </p>
            <Link href="/a-dalmobile">Como trabalhamos <Arrow /></Link>
          </div>
          <figure className="synthesis-manifesto-image">
            <Foto src={fotoManifesto.src} alt={fotoManifesto.alt} sizes="(max-width: 1024px) 100vw, 50vw" />
            {/* Três dados verificáveis no lugar de "essência italiana", que não
                se sustentava em nada no site. */}
            <figcaption>FÁBRICA PRÓPRIA · 100% MDF · 6 ANOS DE GARANTIA</figcaption>
          </figure>
        </section>

        <section className="synthesis-projects" id="sintese-projetos">
          <div className="synthesis-section-heading">
            <div>
              {/* "Fotografado depois da montagem" faz uma afirmação que a
                  concorrência não pode fazer: aqui não tem render, não tem
                  banco de imagem, não tem apartamento de fornecedor. */}
              <p className="eyebrow">02 — PROJETOS EXECUTADOS</p>
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
            <span>O QUE VEM POR ESCRITO</span>
          </div>
          <div className="synthesis-process-copy">
            <p className="eyebrow">03 — DA FÁBRICA À MONTAGEM</p>
            <h2>Produção própria, com garantia publicada.</h2>
            <p>
              A marcenaria não é comprada de terceiro: sai da fábrica da própria Dalmóbile,
              100% em MDF, com ferragem e acabamento definidos no projeto. Cada proposta vai
              com a lista de acabamentos por nome e código — o que permite comparar
              orçamentos com honestidade e repor uma peça daqui a cinco anos sem adivinhação.
            </p>
            {/* Três números verificados em fonte pública da rede. Saíram
                "500+ acessórios exclusivos" (sem fonte, e linguagem de catálogo
                de fornecedor) e "47 anos" (errado: 1977 dá 49 em 2026). O ano
                é melhor que a contagem: é verificável e não envelhece. */}
            <div className="synthesis-stats">
              <div><strong>1977</strong><span>ano em que a fábrica começou</span></div>
              <div><strong>100%</strong><span>MDF em todo o projeto</span></div>
              <div><strong>6</strong><span>anos de garantia</span></div>
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
    </div>
  );
}
