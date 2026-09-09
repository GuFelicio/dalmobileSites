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
import { enderecoEmLinha, linkWhatsApp, unidade } from "../config/derivados";
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

  // TODAS as fotos do acervo desta unidade, achatadas para o slider e na
  // ordem editorial de lib/ambientes.ts — cozinha e quartos primeiro.
  const fotosDoSlider: FotoDoSlider[] = ambientes.flatMap((ambiente) =>
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

  return (
    <div className="site site-synthesis">
      <header className="header synthesis-header">
        <Brand light />
        <nav aria-label="Navegação principal">
          {/* Âncora só para seção desta página. "Ambientes" é ROTA: era
              âncora e não levava a lugar nenhum. */}
          <a href="#sintese-manifesto">A Dalmóbile</a>
          <Link href="/ambientes">Ambientes</Link>
          <a href="#sintese-processo">Como criamos</a>
        </nav>
        <Link className="synthesis-header-link" href="/ambientes">Ver ambientes <Arrow /></Link>
      </header>

      <main>
        <section className="synthesis-hero">
          <Foto
            className="synthesis-hero-image"
            src="/fotos/comum/capa/casa-completa.webp"
            alt="Sala de estar, jantar e espaço gourmet integrados, com forro ripado em madeira, jardim vertical e mesa de jantar em madeira maciça"
            sizes="100vw"
            prioridade
          />
          <div className="synthesis-shade" aria-hidden="true" />
          <div className="synthesis-hero-panel">
            <p className="eyebrow">MÓVEIS PERSONALIZADOS · {unidade.nome.toUpperCase()}</p>
            <h1>Crie seu <em>mundo.</em></h1>
            <p>Design, precisão e liberdade para criar ambientes que expressem a sua forma de viver.</p>
            <Link href="/ambientes">Ver os ambientes <Arrow /></Link>
          </div>
          <div className="synthesis-project-note">
            <span>PROJETO EM DESTAQUE</span>
            <strong>Onde o detalhe se transforma em experiência.</strong>
          </div>
        </section>

        <section className="synthesis-manifesto" id="sintese-manifesto">
          <div className="synthesis-manifesto-content">
            <p className="eyebrow">01 — LIBERDADE CRIATIVA</p>
            <h2>Cada espaço é um mundo particular.</h2>
            <p>Escolher como viver é um ato de liberdade criativa. Por isso, cada projeto nasce da escuta, do repertório e de escolhas que revelam identidade.</p>
            <a href="#sintese-processo">Conheça a nossa essência <Arrow /></a>
          </div>
          <figure className="synthesis-manifesto-image">
            <Foto src={fotoManifesto.src} alt={fotoManifesto.alt} sizes="(max-width: 1024px) 100vw, 50vw" />
            <figcaption>DESIGN BRASILEIRO · ESSÊNCIA ITALIANA</figcaption>
          </figure>
        </section>

        <section className="synthesis-projects" id="sintese-projetos">
          <div className="synthesis-section-heading">
            <div>
              <p className="eyebrow">02 — MUNDOS CRIADOS</p>
              <h2 id="titulo-vitrine">Projetos que permanecem.</h2>
            </div>
            <Link href="/ambientes">Explorar portfólio <Arrow /></Link>
          </div>

          {/* O acervo inteiro desta unidade, passando para o lado. Antes eram
              três fotos de estudo com rótulos inventados. O slider rola por
              scroll-snap nativo: sem biblioteca, e funciona sem JavaScript. */}
          <SliderDeFotos fotos={fotosDoSlider} idRotulo="titulo-vitrine" />
        </section>

        <section className="synthesis-process" id="sintese-processo">
          <div className="synthesis-process-image">
            <Foto src={fotoProcesso.src} alt={fotoProcesso.alt} sizes="(max-width: 1024px) 100vw, 50vw" />
            <span>PRECISÃO EM CADA ESCOLHA</span>
          </div>
          <div className="synthesis-process-copy">
            <p className="eyebrow">03 — DO CONCEITO AO DETALHE</p>
            <h2>Tecnologia que amplia a criação.</h2>
            <p>Produção própria, materiais nobres e domínio integral do processo para transformar intenção em soluções milimetricamente personalizadas.</p>
            <div className="synthesis-stats">
              <div><strong>47</strong><span>anos de história</span></div>
              <div><strong>500+</strong><span>acessórios exclusivos</span></div>
              <div><strong>6</strong><span>anos de garantia</span></div>
            </div>
          </div>
        </section>

        <section className="synthesis-contact" id="sintese-contato">
          <div className="synthesis-contact-copy">
            <p className="eyebrow">SHOWROOM {unidade.nome.toUpperCase()}</p>
            <h2>Seu mundo começa com uma conversa.</h2>
            <p>{enderecoEmLinha()}</p>
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
