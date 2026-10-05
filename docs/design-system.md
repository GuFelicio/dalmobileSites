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
camada 1 — valores    --c-*                os valores medidos
camada 2 — semântica  --papel, --grafite…  os nomes que o componente usa
```

### Camada 1 — valores brutos (v4, 05/10/2026)

A paleta da v4 ([`docs/prompt-v4.md`](prompt-v4.md)) substitui a de 02/10. O
diagnóstico: dois papéis quase iguais (`#F9F8F5` e `#F5F4F0`), a faixa de
projetos `#E8E6E0` contra o papel com 1,08:1 de diferença, e o cinza `#9E9B95`
em seção, faixa e rodapé, que se fundiam. O `CLAUDE.md` espelha esta tabela.

| Token | Valor | Papel |
|---|---|---|
| `--c-papel` | `#F6F4F0` | o **único** fundo claro de seção |
| `--c-grafite` | `#262626` | o **único** fundo escuro de seção |
| `--c-cinza` | `#9E9C94` | **só o rodapé** |
| `--c-areia` | `#D5C5B1` | **só** rótulo em caixa alta sobre grafite |
| `--c-tinta` | `#20211F` | texto sobre papel e sobre o rodapé |
| `--c-apoio` | `#5F5D58` | texto secundário sobre papel |
| `--c-linha` | `#D3D0C9` | fio sobre papel, estado desativado |
| `--c-papel-baixo` | `#E8E6E0` | fundo de card antes da foto chegar — **nunca** fundo de seção |
| `--c-branco` | `#FFFFFF` | reverso do wordmark |
| `--c-papel-72` | papel a 72% | texto secundário sobre grafite |
| `--c-papel-fio` | papel a 20% | fio sobre grafite |
| `--c-tinta-fio` | tinta a 12% | fio do cabeçalho quando ele volta |

**Contrastes (WCAG), conferidos por script na entrega da v4:** tinta sobre papel
14,7:1 · apoio sobre papel 6,0 · papel sobre grafite 13,8 · areia sobre grafite
9,0 · tinta sobre o cinza do rodapé 5,9. **Texto claro sobre o cinza do rodapé
dá 2,5:1 e é proibido.** Mínimo de 4,5:1 em todo texto, sem exceção de tamanho.

Saíram na v4: `#F9F8F5`, `#F5F4F0`, `#EFEDE7`, `#97958F`, `#5D5D58`, `#484B45`,
`#111211`, a escada `--sobre-escuro-*`, os tokens `--sup-*` de cinco superfícies
e os `--veu-*`, que não tinham mais uso.

### Variante "palha" — Caraguatatuba

`data-paleta="palha"` no `<html>`, vindo do config da unidade. Troca só a
família do cinza: o rodapé vira `#FFF4EB` (com fio `#CDB49A`, porque contra o
papel ele separa em só 1,02), o apoio vira `#5F5847` e o fio `#E7D8C9`. Papel,
grafite, tinta e areia são os mesmos nos dois sites.

### Camada 2 — nomes semânticos

```css
--papel  --grafite  --cinza  --areia  --tinta  --apoio  --branco
--sobre-grafite  --sobre-grafite-apoio  --sobre-grafite-fio
```

Nomes antigos que o código ainda usa, e continuam valendo: `--preto` é a
**tinta** do texto (não uma superfície), `--cinza-texto` é o apoio, `--cinza-clr`
é o fio sobre papel.

**Não existe cor de acento.** Se faltar destaque, a resposta é escala ou troca de
superfície. O único desvio previsto é verde e vermelho de sistema em erro e
sucesso de formulário, no menor tamanho possível.

### Superfícies — papel e grafite, e o rodapé cinza

**Regra (v4): seções vizinhas nunca têm a mesma cor.** A troca de cor marca a
fronteira da seção — é por isso que o respiro pôde cair. O rodapé é cinza em
**toda** página, inclusive a barra da home, com todo o texto em `--tinta`.

As classes globais `.superficie-papel` e `.superficie-grafite`
([`app/globals.css`](../app/globals.css)) pintam o fundo e publicam as cores de
quem vive dentro:

| Variável | Papel | Grafite |
|---|---|---|
| `--sup-bg` | papel | grafite |
| `--sup-fg` | tinta | papel |
| `--sup-apoio` | apoio | papel a 72% |
| `--sup-rotulo` | tinta | areia |
| `--sup-fio` | linha | papel a 20% |

O componente pede **por estes nomes**, sem saber em que superfície está. É o que
deixa uma seção trocar de cor sem tocar no CSS dela:

```css
.etapaTexto { color: var(--sup-apoio); }
.item       { border-top: var(--fio) solid var(--sup-fio); }
.botao:hover { background: var(--sup-fg); color: var(--sup-bg); }
```

`<Section superficie="papel" | "grafite">` aplica a classe. As seções da home,
que ainda usam marcação própria, põem a classe direto no `<section>`.

A sequência de cada página está no `CLAUDE.md`, seção "Superfícies".

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
| Texto | `--fs-texto` | `--tr-texto` | `--lh-texto` | 17px → 16.5px |
| Rótulo | `--fs-rotulo` | `--tr-rotulo` | `--lh-rotulo` | 10.5px, igual em toda largura |

Os valores mobile trocam sozinhos em `@media (max-width: 600px)`, dentro do
próprio `tokens.css`. **O componente não precisa de media query para tipografia.**

Dek de página: `--fs-dek` (20px), na cor `--cinza-texto`.

Medida de leitura: `--medida` = **`34em`** (~64 caracteres, dentro da faixa de
62 a 66 do `CLAUDE.md`). Até 02/10/2026 era `64ch`, que dava **77** caracteres
por linha: `ch` é a largura do algarismo 0, mais largo que a letra média da
Krub.
Nunca texto corrido em largura total.

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

### Ritmo vertical (v4)

Três intervalos, e só eles. O `clamp` faz a passagem do celular ao desktop
sem media query.

| Token | Valor | Celular → desktop | Quando |
|---|---|---|---|
| `--respiro` | `clamp(48px, 5vw, 72px)` | 48 → 72 | padding-top **e** -bottom de toda seção |
| `--respiro-curto` | `clamp(24px, 2.5vw, 40px)` | 24 → 40 | do cabeçalho da seção (rótulo, título, apoio) ao conteúdo; padding do rodapé |
| `--entre-itens` | `clamp(24px, 2vw, 32px)` | 24 → 32 | entre itens irmãos: etapas, perguntas, blocos, fotos da galeria |

Dentro do cabeçalho de seção: rótulo → **12px** (`--cab-rotulo-titulo`) →
título → **16px** (`--cab-titulo-apoio`) → apoio; parágrafo → link, **24px**
(`--cab-texto-link`).

Até a v4 eram 56 / 120 / 180px (`--respiro-curto`, `--respiro`,
`--respiro-longo`): medido em 1440px, havia de 240 a 300px vazios entre o fim
de uma seção e o título da seguinte. `--respiro-longo`, `--e-secao` e a prop
`respiro="longo"` da `Section` saíram. Exceção única: o lado de uma foto que
sangra até a borda pode ter padding 0.

**Verificação:** nenhum vão vertical maior que 160px entre dois conteúdos
(texto, foto ou caixa com borda), em nenhuma página e largura.

- `--e-margem` — margem lateral do texto no mobile: **20px**. A foto sangra até a borda; o texto mantém a margem.
- `--pad-lateral` — margem lateral da **página**: `clamp(20px, 5vw, 80px)`. Cresce com a tela e nunca desce abaixo dos 20px do mobile. É o que `Section`, `Header`, `Footer` e `MobileMenu` usam para alinhar tudo na mesma calha vertical. Não invente outro recuo lateral: use este.
- `--alt-cabecalho` — altura do cabeçalho: **88px**. Vale como offset de âncora e como altura da barra do `MobileMenu`, para o painel abrir alinhado ao cabeçalho que o cobre.

---

## 4. Forma

- `border-radius: 0` em **tudo**. Foto, card, botão, campo, chip. Junta precisa, como a marcenaria.
- Separação por fio de 1px (`--fio`) e por espaço. **Zero sombra.**
- Alinhamento **à esquerda** em tudo. Nada centralizado.
- `--toque` (44px) é o alvo de toque mínimo, com espaço entre alvos vizinhos.
  Link de texto que não pode crescer sem mudar o desenho ganha uma área de
  toque invisível de 44px (`::before`), como os links da home em `globals.css`.
- `--toque-menu` (48px) é o botão de abrir e de fechar o menu mobile.
- **Seta ↗: no máximo uma por seção**, no link principal dela. Os outros links
  ficam com o fio de 1px.
- **Legenda sempre fora da foto.** Nenhum texto sobre imagem ou vídeo.

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
| `--mov-fio` | 150ms | fio de 1px sob o item de navegação |
| `--mov-ease` | `cubic-bezier(.2,.8,.2,1)` | curva do projeto |
| `--mov-cabecalho` | 250ms | o cabeçalho sumindo e voltando — só `transform` |
| `--mov-cabecalho-ease` | `cubic-bezier(0.25, 1, 0.5, 1)` | curva só do cabeçalho |

**Cabeçalho que some ao rolar (v4)** — `components/layout/Header.tsx`, sem
dependência, listener de scroll passivo + `requestAnimationFrame`:

- `scrollY < 120px`: sempre visível, sem fio inferior;
- rolando para baixo depois de 120px: `translateY(-100%)`;
- rolando para cima mais de 8px (acumulados): volta, em papel, com fio de 1px
  (`--cab-fio`);
- nunca some com o menu mobile aberto nem com **foco de teclado**
  (`:focus-visible`) dentro dele; Tab até ele com ele escondido o traz de
  volta. Foco de toque não conta: ao fechar o menu por toque, o foco volta ao
  botão, e o cabeçalho ficaria preso na tela;
- é `sticky`: sair do lugar não move a página (sem layout shift);
- `prefers-reduced-motion`: troca sem transição.

**Proibido:** parallax, scroll sequestrado, carrossel automático, contador animado.

**Vídeo em loop** (`components/midia/VideoEmLoop.tsx`, só no fundo da capa da
home): `autoplay`, sem som, sem controle; pausa quando sai da tela. Com
`prefers-reduced-motion` mostra só o poster. Não tem estilo próprio: o
enquadramento vem de `className`. Nunca escurecido, e nada por cima dele. Na
v4 a abertura é só o vídeo, com altura máxima de 72svh no desktop e 60svh no
celular. Ver `docs/decisoes.md`.

```tsx
<VideoEmLoop
  className="synthesis-hero-video"
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
