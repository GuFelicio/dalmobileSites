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
import { unidade } from "../config/derivados";

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
  return (
    <div className="site site-synthesis">
      <header className="header synthesis-header">
        <Brand light />
        <nav aria-label="Navegação principal">
          <a href="#sintese-manifesto">A Dalmóbile</a>
          <a href="#sintese-projetos">Projetos</a>
          <a href="#sintese-processo">Como criamos</a>
        </nav>
        <a className="synthesis-header-link" href="#sintese-contato">Showroom {unidade.nome} <Arrow /></a>
      </header>

      <main>
        <section className="synthesis-hero">
          <img className="synthesis-hero-image" src="/assets/casacor-madeira.webp" alt="Ambiente Dalmóbile em madeira com iluminação acolhedora" />
          <div className="synthesis-shade" aria-hidden="true" />
          <div className="synthesis-hero-panel">
            <p className="eyebrow">MÓVEIS PERSONALIZADOS · SJC</p>
            <h1>Crie seu <em>mundo.</em></h1>
            <p>Design, precisão e liberdade para criar ambientes que expressem a sua forma de viver.</p>
            <a href="#sintese-projetos">Descubra nossos projetos <Arrow /></a>
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
            <img src="/assets/manifesto.webp" alt="Pessoa observando os acabamentos de um ambiente Dalmóbile" />
            <figcaption>DESIGN BRASILEIRO · ESSÊNCIA ITALIANA</figcaption>
          </figure>
        </section>

        <section className="synthesis-projects" id="sintese-projetos">
          <div className="synthesis-section-heading">
            <div><p className="eyebrow">02 — MUNDOS CRIADOS</p><h2>Projetos que permanecem.</h2></div>
            <a href="#sintese-contato">Explorar portfólio <Arrow /></a>
          </div>
          <article className="synthesis-project synthesis-project-featured">
            <img src="/assets/le-tt.webp" alt="Ambiente expressivo em madeira e tons profundos" />
            <div><span>01 / EXPRESSIVO</span><h3>Matéria, luz e personalidade.</h3><a href="#sintese-contato">Ver projeto <Arrow /></a></div>
          </article>
          <div className="synthesis-project-pair">
            <article className="synthesis-project synthesis-project-light">
              <img src="/assets/spa-vivix.webp" alt="Spa com formas curvas e iluminação indireta" />
              <div><span>02 / ORGÂNICO</span><h3>Formas que acolhem.</h3><a href="#sintese-contato">Ver projeto <Arrow /></a></div>
            </article>
            <article className="synthesis-project synthesis-project-dark">
              <img src="/assets/refugio-poeta.webp" alt="Bar residencial com madeira e obras de arte" />
              <div><span>03 / CONTEMPORÂNEO</span><h3>Um universo particular.</h3><a href="#sintese-contato">Ver projeto <Arrow /></a></div>
            </article>
          </div>
        </section>

        <section className="synthesis-process" id="sintese-processo">
          <div className="synthesis-process-image">
            <img src="/assets/tecnologia.webp" alt="Seleção técnica de acabamento Dalmóbile" />
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
            <p className="eyebrow">SHOWROOM SJC</p>
            <h2>Seu mundo começa com uma conversa.</h2>
            <p>Conheça de perto materiais, acabamentos e possibilidades para o seu projeto.</p>
            <a href="#sintese-contato">Agendar uma visita <Arrow /></a>
          </div>
          <div className="synthesis-contact-image"><img src="/assets/casacor-organico.webp" alt="Ambiente Dalmóbile com formas orgânicas e marcenaria clara" /></div>
        </section>
      </main>
    </div>
  );
}
