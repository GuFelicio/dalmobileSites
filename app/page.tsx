"use client";

import { useState } from "react";

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

function StudySwitcher({ current, onChange }: { current: number; onChange: (index: number) => void }) {
  const options = ["Editorial", "Imersiva", "Síntese"];
  return (
    <aside className="study-switcher" aria-label="Alternar proposta de layout">
      <span className="study-label">ESTUDOS DE HOME</span>
      <div className="study-options">
        {options.map((option, index) => (
          <button
            className={current === index ? "is-active" : ""}
            key={option}
            onClick={() => { onChange(index); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            type="button"
            aria-pressed={current === index}
          >
            <span>0{index + 1}</span> {option}
          </button>
        ))}
      </div>
      <span className="study-font">KRUB</span>
    </aside>
  );
}

function EditorialLayout() {
  return (
    <div className="site site-editorial">
      <header className="header editorial-header">
        <Brand />
        <nav aria-label="Navegação principal">
          <a href="#editorial-projetos">Projetos</a>
          <a href="#editorial-dalmobile">A Dalmóbile</a>
          <a href="#editorial-processo">Processo</a>
        </nav>
        <a className="header-link" href="#editorial-contato">São José dos Campos <Arrow /></a>
      </header>

      <main>
        <section className="editorial-hero">
          <div className="editorial-lines" aria-hidden="true" />
          <div className="editorial-hero-copy">
            <p className="eyebrow">MÓVEIS PERSONALIZADOS · SJC</p>
            <h1>Crie seu <em>mundo.</em></h1>
            <p className="hero-support">Design autoral, precisão e liberdade criativa para transformar espaços em experiências que têm a sua identidade.</p>
            <a className="text-link" href="#editorial-projetos">Conheça nossos projetos <Arrow /></a>
          </div>
          <figure className="editorial-hero-image">
            <img src="/assets/casacor-madeira.webp" alt="Ambiente Dalmóbile em madeira com iluminação acolhedora" />
            <figcaption><span>PROJETO EM DESTAQUE</span><span>Liberdade em cada escolha</span></figcaption>
          </figure>
        </section>

        <section className="editorial-manifesto" id="editorial-dalmobile">
          <div className="editorial-kicker">01 — MANIFESTO</div>
          <div className="manifesto-copy">
            <p>Escolher como viver é um ato de <em>liberdade criativa.</em></p>
            <span>Cada canto, cor, textura e forma pode contar uma história. A Dalmóbile une técnica e imaginação para criar espaços que revelam quem você é — e quem sonha ser.</span>
          </div>
          <img className="manifesto-image" src="/assets/manifesto.webp" alt="Pessoa observando os acabamentos de um ambiente Dalmóbile" />
        </section>

        <section className="editorial-projects" id="editorial-projetos">
          <div className="section-heading-row">
            <div><p className="eyebrow">02 — PROJETOS</p><h2>Mundos criados.</h2></div>
            <a className="text-link" href="#editorial-contato">Ver portfólio completo <Arrow /></a>
          </div>
          <div className="editorial-project-grid">
            <article className="editorial-project editorial-project--wide">
              <img src="/assets/casacor-organico.webp" alt="Ambiente orgânico com marcenaria clara" />
              <div><span>RESIDENCIAL</span><h3>Espaços para celebrar</h3></div>
            </article>
            <article className="editorial-project editorial-project--tall">
              <img src="/assets/spa-vivix.webp" alt="Spa com formas curvas e iluminação indireta" />
              <div><span>BEM-ESTAR</span><h3>O detalhe vira experiência</h3></div>
            </article>
            <article className="editorial-project editorial-project--small">
              <img src="/assets/casa-sabin.webp" alt="Sala com estante de madeira e poltronas azuis" />
              <div><span>LIVING</span><h3>Personalidade revelada</h3></div>
            </article>
          </div>
        </section>

        <section className="editorial-process" id="editorial-processo">
          <div className="process-photo-wrap">
            <img src="/assets/tecnologia.webp" alt="Seleção técnica de acabamento Dalmóbile" />
            <span>TECNOLOGIA QUE POTENCIALIZA</span>
          </div>
          <div className="process-copy">
            <p className="eyebrow">03 — DO CONCEITO AO DETALHE</p>
            <h2>Precisão para criar sem limites.</h2>
            <p>Produção própria, materiais nobres e domínio de cada etapa para levar o projeto do primeiro traço à instalação final.</p>
            <div className="process-stats">
              <div><strong>47</strong><span>anos de história</span></div>
              <div><strong>500+</strong><span>acessórios exclusivos</span></div>
              <div><strong>6</strong><span>anos de garantia</span></div>
            </div>
          </div>
        </section>

        <section className="editorial-contact" id="editorial-contato">
          <p className="eyebrow">SHOWROOM SÃO JOSÉ DOS CAMPOS</p>
          <h2>Seu mundo começa com uma conversa.</h2>
          <a href="#editorial-contato">Agendar atendimento <Arrow /></a>
        </section>
      </main>
    </div>
  );
}

function ImmersiveLayout() {
  return (
    <div className="site site-immersive">
      <header className="header immersive-header">
        <Brand light />
        <nav aria-label="Navegação principal">
          <a href="#imersiva-projetos">Projetos</a>
          <a href="#imersiva-processo">Como criamos</a>
          <a href="#imersiva-contato">Visite o showroom</a>
        </nav>
        <button className="menu-button" type="button" aria-label="Abrir menu"><span /><span /></button>
      </header>

      <main>
        <section className="immersive-hero">
          <img src="/assets/le-tt.webp" alt="Ambiente envolvente em madeira e tons profundos" />
          <div className="immersive-shade" />
          <div className="immersive-hero-copy">
            <p>SÃO JOSÉ DOS CAMPOS · SP</p>
            <h1>Espaços que contam a sua história.</h1>
            <a href="#imersiva-projetos">Explorar projetos <Arrow /></a>
          </div>
          <div className="immersive-index" aria-hidden="true"><strong>01</strong><span /><small>03</small></div>
          <p className="immersive-scroll">ROLE PARA DESCOBRIR</p>
        </section>

        <section className="immersive-intro">
          <p className="eyebrow">DALMÓBILE SJC</p>
          <h2>Não criamos apenas móveis. Criamos a atmosfera onde a vida acontece.</h2>
          <p>Cada ambiente nasce do encontro entre a sua forma de viver e a liberdade de personalizar materiais, volumes, cores e detalhes.</p>
        </section>

        <section className="immersive-projects" id="imersiva-projetos">
          <article className="immersive-project">
            <img src="/assets/spa-vivix.webp" alt="Spa com formas curvas e luz quente" />
            <div className="immersive-project-caption"><p>01 / AUTORAL</p><h3>Formas que acolhem.</h3><a href="#imersiva-contato">Ver projeto <Arrow /></a></div>
          </article>
          <article className="immersive-project immersive-project--offset">
            <img src="/assets/loft-sem-pressa.webp" alt="Loft em tons profundos e marcenaria personalizada" />
            <div className="immersive-project-caption"><p>02 / EXPRESSIVO</p><h3>Cor, matéria e ritmo.</h3><a href="#imersiva-contato">Ver projeto <Arrow /></a></div>
          </article>
          <article className="immersive-project">
            <img src="/assets/refugio-poeta.webp" alt="Bar residencial com madeira e arte" />
            <div className="immersive-project-caption"><p>03 / CONTEMPORÂNEO</p><h3>Um mundo particular.</h3><a href="#imersiva-contato">Ver projeto <Arrow /></a></div>
          </article>
        </section>

        <section className="immersive-process" id="imersiva-processo">
          <p className="eyebrow">NOSSO PROCESSO</p>
          <div className="immersive-process-row">
            <h2>Da intenção ao milímetro.</h2>
            <ol>
              <li><span>01</span>Escuta e repertório</li>
              <li><span>02</span>Projeto e personalização</li>
              <li><span>03</span>Produção de precisão</li>
              <li><span>04</span>Instalação e cuidado</li>
            </ol>
          </div>
        </section>

        <section className="immersive-contact" id="imersiva-contato">
          <img src="/assets/casacor-madeira.webp" alt="Detalhes de marcenaria iluminada" />
          <div><p className="eyebrow">SHOWROOM SJC</p><h2>Entre. Imagine. Crie.</h2><a href="#imersiva-contato">Agendar uma visita <Arrow /></a></div>
        </section>
      </main>
    </div>
  );
}

function SynthesisLayout() {
  return (
    <div className="site site-synthesis">
      <header className="header synthesis-header">
        <Brand light />
        <nav aria-label="Navegação principal">
          <a href="#sintese-manifesto">A Dalmóbile</a>
          <a href="#sintese-projetos">Projetos</a>
          <a href="#sintese-processo">Como criamos</a>
        </nav>
        <a className="synthesis-header-link" href="#sintese-contato">Showroom SJC <Arrow /></a>
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

export default function Home() {
  const [current, setCurrent] = useState(2);
  return (
    <>
      <StudySwitcher current={current} onChange={setCurrent} />
      {current === 0 && <EditorialLayout />}
      {current === 1 && <ImmersiveLayout />}
      {current === 2 && <SynthesisLayout />}
    </>
  );
}
