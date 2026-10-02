# Design system — Dalmóbile

Tudo o que este documento descreve mora em **um arquivo só**: [`app/tokens.css`](../app/tokens.css).

> **Regra que não se negocia:** `app/tokens.css` é o único arquivo do repositório
> autorizado a conter um valor de cor literal. Hex, `rgb()` ou `rgba()` em qualquer
> outro lugar é bug. Existe uma verificação no fim deste documento para conferir.

Origem: extraído do estudo **03 Síntese** na Fase 1. As regras de escala, forma e
responsividade vêm do `CLAUDE.md`; a composição de cada página vem de
[`docs/direcao-site.md`](direcao-site.md).

---

## 1. Cor

A cor é declarada em **duas camadas**. O componente nunca fala com a camada de baixo.

```
camada 1 — valores    --c-*        onze cores medidas do estudo
camada 2 — semântica  --preto etc. os nomes que o componente usa
```

### Camada 1 — valores brutos

**Definitivos.** São as cores da V1, a versão no ar, confirmadas pelo cliente em
02/10/2026 como as corretas. O `CLAUDE.md` espelha esta tabela. Trocar estas
linhas troca o site inteiro, sem tocar em nenhum componente.

| Token | Valor | Papel |
|---|---|---|
| `--c-branco` | `#ffffff` | superfície elevada, reverso do wordmark |
| `--c-papel-alto` | `#f9f8f5` | **superfície papel**; texto claro sobre preto |
| `--c-papel-baixo` | `#e8e6e0` | **superfície cinza** (costura) |
| `--c-linha` | `#d3d0c9` | fio sobre claro, estado desativado |
| `--c-cinza` | `#e8e6e0` | cinza de costura — era `#9e9b95` até a V1 |
| `--c-cinza-painel` | `#97958f` | painel do hero — sai na fase 2 da V2 |
| `--c-cinza-texto` | `#5d5d58` | texto de apoio sobre papel |
| `--c-tinta` | `#20211f` | texto principal, tarja |
| `--c-preto` | `#111211` | **superfície preta**; fundo do documento |

### V2 — três superfícies (01/10/2026)

Até a V1 a home usava cinco tons de fundo (`#111211`, `#F9F8F5`, `#E8E6E0`,
`#484B45`, `#9E9B95`) e as internas um sexto (`#f5f4f0`). Ficam **três**, todos
valores que já estavam no site — nenhuma cor nova:

| Superfície | Valor | Onde |
|---|---|---|
| preto | `#111211` | abertura, fábrica, galerias, menu mobile |
| papel | `#F9F8F5` | páginas de leitura, hub de ambientes, FAQ |
| cinza | `#E8E6E0` | faixas de costura e transição, rodapé |

Saíram `--c-oliva` (`#484b45`; a seção da fábrica ficou preta), `--c-papel`
(`#f5f4f0`) e `--c-papel-fundo`. **No máximo quatro trocas de superfície por
página.** Na paleta palha de Caraguá, o cinza continua `#fff4eb`.

Com o cinza claro, a faixa cinza separa do papel por **fio** (`--fio-sup`), não
mais pela diferença de tom. E texto sobre cinza é **escuro** (`--preto`,
`--cinza-texto`), nunca `--sobre-escuro-*`.

> Até 02/10/2026 o `CLAUDE.md` descrevia outra paleta (`#171614`, `#8B8884`,
> `#F2F1EE`), que nunca chegou ao código. Foi corrigido para as cores da V1 —
> ver `docs/decisoes.md`.

O estudo tinha **37 hex distintos em 46 ocorrências**. Boa parte era papel quase
igual repetido (`#f6f5f1`, `#f5f4f1`, `#f7f6f3`, `#f8f7f4`…). A Fase 1 colapsou
esses vizinhos nos doze valores acima.

### Camada 2 — nomes semânticos

São os nomes do `CLAUDE.md`. **Nunca renomear:** a troca de paleta acontece na
camada 1, e é isso que mantém a troca barata.

```css
--preto:     var(--c-tinta);
--cinza:     var(--c-cinza);
--cinza-clr: var(--c-linha);
--papel:     var(--c-papel-alto);
--branco:    var(--c-branco);
```

**Não existe cor de acento.** Se faltar destaque, a resposta é escala ou troca de
superfície. O único desvio previsto é verde e vermelho de sistema em erro e
sucesso de formulário, no menor tamanho possível (Fase 7).

> O estudo tinha um acento — `--rust: #a9472f`. Ele só era usado no estudo
> *ateliê* e no sistema de botões, ambos código morto. Saiu junto com eles: não
> foi preciso decidir nada.

### Sobre superfície escura

Escada de alfa sobre branco, no lugar das quinze opacidades ad hoc que o estudo
espalhava (`.16 .17 .2 .23 .25 .45 .48 .55 .58 .62 .65 .66 .68 .7 .72`).

| Token | Uso |
|---|---|
| `--sobre-escuro` | texto principal sobre preto |
| `--sobre-escuro-70` | texto de apoio |
| `--sobre-escuro-55` | rótulo secundário |
| `--sobre-escuro-45` | numeração, estado inativo |
| `--sobre-escuro-fio` | fio de 1px |
| `--sobre-escuro-fio-fr` | fio quase apagado |

### Cabeçalho

O cabeçalho (`components/layout/Header.tsx`) tem o **fundo sólido da superfície
em que está**. Até a V1 ele era transparente até rolar, e nas páginas internas o
texto escuro ficava sobre o body preto, a 1,16:1.

| Superfície | Fundo | Texto | Fio inferior |
|---|---|---|---|
| preto | `--c-preto` | `--cab-texto-sobre-preto` (`#f9f8f5`) | `--cab-fio-sobre-preto` (`.14`) |
| papel | `--papel` | `--preto` | `--cab-fio-sobre-papel` (`.12`) |

Sem exceção: na home ele fica **acima** do vídeo, em preto sólido, e não por
cima dele — a abertura não leva nada sobre a imagem (ver `docs/decisoes.md`,
2026-10-02). O rodapé (`Footer`) é preto em todas as páginas.

```tsx
<Header superficie="papel" />  {/* página interna */}
<Header superficie="preto" />  {/* home */}
```

### Véu sobre foto — temporário

Os tokens `--veu-*` existem **só** para a página de estudos, que sai na Fase 2.
Escurecer foto é proibido pelo `CLAUDE.md` e pela seção 13 da direção.
**Não usar em componente novo.**

---

## 2. Tipografia

Krub e só Krub, self-hosted via `@fontsource/krub`, importada em
[`app/layout.tsx`](../app/layout.tsx). Nada de Google Fonts por CDN.

**Decisão travada:** nunca trocar a família, nunca somar uma segunda — nem para
ícone, nem para número. Se algo parecer precisar de outra fonte, o problema é de
escala, peso ou tracking.

```css
font-family: var(--fonte);
/* "Krub", "Segoe UI", system-ui, -apple-system, sans-serif */
```

Pesos carregados: **300, 400 e 600**, mais o itálico de 300. Nenhum outro.

| Token de peso | Valor | Uso |
|---|---|---|
| `--peso-leve` | 300 | display e títulos |
| `--peso-normal` | 400 | texto corrido e subtítulo |
| `--peso-forte` | 600 | rótulo em caixa alta, e só ele |

Hierarquia por **escala e tracking**, nunca por engordar peso.

| Papel | `font-size` | `letter-spacing` | `line-height` | Desktop → Mobile |
|---|---|---|---|---|
| Display XL | `--fs-display-xl` | `--tr-display-xl` | `--lh-display-xl` | 64px → 40px |
| Display L | `--fs-display-l` | `--tr-display-l` | `--lh-display-l` | 48px → 32px |
| Seção | `--fs-secao` | `--tr-secao` | `--lh-secao` | 34px → 26px |
| Subtítulo | `--fs-subtitulo` | `--tr-subtitulo` | `--lh-subtitulo` | 22px → 20px |
| Dek de página | `--fs-dek` | `--tr-subtitulo` | `--lh-subtitulo` | 20px → 19px, cor `--cinza-texto` |
| Item do menu mobile | `--fs-menu` | `--tr-secao` | `--lh-secao` | 32px, peso 300 |
| Texto | `--fs-texto` | `--tr-texto` | `--lh-texto` | 17px → 16.5px |
| Rótulo | `--fs-rotulo` | `--tr-rotulo` | `--lh-rotulo` | 10.5px, igual em toda largura |

Os valores mobile trocam sozinhos em `@media (max-width: 600px)`, dentro do
próprio `tokens.css`. **O componente não precisa de media query para tipografia.**

Medida de leitura: `--medida` = **`34em`** (~64 caracteres). Nunca texto corrido
em largura total. Até a V1 era `64ch`, que dava **77** caracteres por linha:
`ch` é a largura do algarismo 0, mais largo que a letra média da Krub. Medido
na V2: nenhuma linha passa de 66 caracteres, nas seis larguras.

O **dek** — a linha logo abaixo do título da página — usa `--fs-dek` e a cor
`--cinza-texto`, para título, dek e corpo não lerem como uma parede só.

### Exemplo de uso

```css
.case-title {
  font-size: var(--fs-display-l);
  letter-spacing: var(--tr-display-l);
  line-height: var(--lh-display-l);
  font-weight: var(--peso-leve);
}

.case-body {
  max-width: var(--medida);
  font-size: var(--fs-texto);
  line-height: var(--lh-texto);
  color: var(--preto);
}

.case-label {
  font-size: var(--fs-rotulo);
  letter-spacing: var(--tr-rotulo);
  font-weight: var(--peso-forte);
  text-transform: uppercase;
}
```

---

## 3. Espaço

Escala base 8. Sem valor fora dela em componente novo.

| Token | Valor |
|---|---|
| `--e-1` | 8px |
| `--e-2` | 16px |
| `--e-3` | 24px |
| `--e-4` | 40px |
| `--e-5` | 64px |
| `--e-6` | 96px |
| `--e-7` | 128px |

### Ritmo vertical — três intervalos (V2)

Intervalo constante é a principal razão de uma página parecer gerada. São três,
e trocam sozinhos no mobile (até 600px):

| Token | Desktop | Mobile | Quando |
|---|---|---|---|
| `--respiro-curto` | 56px | 40px | entre blocos irmãos da mesma seção |
| `--respiro` | 120px | 72px | entre seções da mesma superfície |
| `--respiro-longo` | 180px | 96px | antes de troca de superfície, e antes da seção mais importante |

**Nunca dois longos seguidos, nunca três curtos seguidos.** `Section` usa
`--respiro` por padrão; `respiro="longo"` põe 180px embaixo dela.

```tsx
<Section superficie="papel" respiro="longo">…</Section>
```

- `--e-secao` — nome antigo, hoje igual a `--respiro`. Não usar em código novo.
- Duas `Section` seguidas na **mesma** superfície dividem o respiro (a segunda
  perde o padding de cima): entre elas fica 120px, não 240.
- `--e-margem` — margem lateral do texto no mobile: **20px**. A foto sangra até a borda; o texto mantém a margem.
- `--pad-lateral` — margem lateral da **página**: `clamp(20px, 5vw, 80px)`. Cresce com a tela e nunca desce abaixo dos 20px do mobile. É o que `Section`, `Header`, `Footer` e `MobileMenu` usam para alinhar tudo na mesma calha vertical. Não invente outro recuo lateral: use este.
- `--alt-cabecalho` — altura do cabeçalho: **88px**. Vale como offset de âncora e como altura da barra do `MobileMenu`, para o painel abrir alinhado ao cabeçalho que o cobre.

---

## 4. Forma

- `border-radius: 0` em **tudo**. Foto, card, botão, campo, chip. Junta precisa, como a marcenaria.
- Separação por fio de 1px (`--fio`) e por espaço. **Zero sombra.**
- Alinhamento **à esquerda** em tudo. Nada centralizado.
- `--toque` (44px) é o alvo de toque mínimo, com espaço entre alvos vizinhos.
- `--toque-menu` (48px) é o botão que abre e fecha o menu mobile: a única porta
  para a navegação no celular.

### Cabeçalho de página

`components/layout/PageHeader.tsx` — o gabarito de toda página interna:
caminho de navegação → título em Display L → dek → introdução → régua de 1px
na largura da coluna de texto. Vai como primeiro conteúdo de uma `Section`
papel; depois dela vem o respiro normal.

```tsx
<Section superficie="papel">
  <PageHeader caminho={[{ rotulo: "Ambientes", href: "/ambientes" }]} titulo="Cozinha" dek={chamada}>
    <p>{texto}</p>
  </PageHeader>
</Section>
```

**Régua nunca mais larga que o texto que separa.** Lista com fio entre itens
ganha `max-width` da coluna de texto; bloco de duas colunas para onde o texto
para.

### Grade editorial

`components/midia/GradeEditorial.tsx` — a vitrine de projetos, sem carrossel.
Ciclo de três ritmos: **A** foto sangrando 16:9 · **B** duas fotos 3:2 lado a
lado · **C** foto a 2/3 à direita, legenda na coluna vazia à esquerda. Legenda
sempre fora da foto: nome em Subtítulo, ambiente em Rótulo. Uma coluna até
820px, com toda foto sangrando.

```tsx
<GradeEditorial fotos={vitrine.slice(0, 12)} />
```

### Link discreto e seta

Seta ↗ no máximo uma por seção, e só em link que sai do site. Link interno:
sublinhado de 1px que aparece no hover, em `--mov-fio` (150ms).

### Sangria

`.bleed` (em `app/globals.css`) leva uma foto de ponta a ponta da tela, mesmo
dentro de uma seção com margem lateral. **Texto nunca sangra.** A meta da V2 é
pelo menos duas fotos sangrando por página.

```tsx
<Foto src={…} alt={…} sizes="100vw" className={`${estilos.foto} bleed`} />
```

Foto que sangra pede `sizes="100vw"`. O utilitário usa `!important` para vencer
a largura que o componente dá à própria foto.

```css
.chip {
  border: var(--fio) solid var(--cinza-clr);
  min-height: var(--toque);
  padding: 0 var(--e-2);
}
```

---

## 5. Movimento

Mínimo e lento.

| Token | Valor | Uso |
|---|---|---|
| `--mov-fade` | 400ms | fade **partindo de visível** |
| `--mov-hover` | 600ms | hover em card, `scale(1.02)` |
| `--mov-fio` | 150ms | fio de 1px sob o link e o item de navegação |
| `--mov-ease` | `cubic-bezier(.2,.8,.2,1)` | curva única do projeto |

**Proibido:** parallax, scroll sequestrado, carrossel automático, contador animado.

**Vídeo em loop** (`components/midia/VideoEmLoop.tsx`, só na abertura da home):
`autoplay`, sem som, sem controle; pausa quando sai da tela. Com
`prefers-reduced-motion` mostra só o poster. Não tem estilo próprio: o
enquadramento vem de `className`. Inteiro, 16:9, **sem nada por cima e nunca
escurecido**. Ver `docs/decisoes.md` (2026-10-02).

```tsx
<VideoEmLoop
  className={estilos.aberturaVideo}
  webm="/videos/hero-loop.webm"
  mp4="/videos/hero-loop.mp4"
  poster="/videos/hero-loop-poster.jpg"
/>
```

`@media (prefers-reduced-motion: reduce)` está no fim do `globals.css` e zera
transição e animação em tudo. É obrigatório e já vale para o que vier.

---

## 6. Como verificar

Nenhum hex ou `rgb()` fora do arquivo de tokens:

```bash
grep -rn '#[0-9a-fA-F]\{3,8\}\b\|rgba\?(' app worker build \
  --include='*.css' --include='*.tsx' --include='*.ts' \
  | grep -v '^app/tokens.css'
```

Saída vazia = passou.

Nenhum `100vh` (a barra do navegador móvel quebra `vh`; usar `100svh`):

```bash
grep -rn '100vh' app --include='*.css'
```

---

## 7. O que ainda não está aqui

- **A paleta definitiva.** As onze cores da camada 1 são do estudo, não da marca. Aguardando a loja.
- **Componentes.** Cabeçalho, rodapé e as três superfícies entram na Fase 2. Este documento cresce junto.
- **`:focus-visible` por componente.** O `globals.css` tem só o baseline; a Fase 2 refina.
- **A página de estudos não consome os tokens de tipografia.** Ela carrega os
  tamanhos do estudo em `clamp()` e é descartada na Fase 2 — reescrevê-la para a
  escala do `CLAUDE.md` seria redesenhar um andaime. Os tokens de tipografia
  entram em uso no primeiro componente de verdade.
