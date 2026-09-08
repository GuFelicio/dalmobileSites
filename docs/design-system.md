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

**Provisórios.** São os neutros quentes do estudo 03. A paleta acromática
definitiva do `CLAUDE.md` entra aqui quando a loja fechar as cores — e trocar
estas onze linhas troca o site inteiro, sem tocar em nenhum componente.

| Token | Valor | Papel |
|---|---|---|
| `--c-branco` | `#ffffff` | superfície elevada, reverso do wordmark |
| `--c-papel-alto` | `#f9f8f5` | papel um degrau acima do fundo |
| `--c-papel` | `#f5f4f0` | fundo das páginas de leitura |
| `--c-papel-fundo` | `#efede7` | papel rebaixado, faixa de apoio |
| `--c-papel-baixo` | `#e8e6e0` | papel mais rebaixado, faixa de projetos |
| `--c-linha` | `#d3d0c9` | fio sobre claro, estado desativado |
| `--c-cinza` | `#9e9b95` | cinza da marca: costura, faixas |
| `--c-cinza-painel` | `#97958f` | painel sólido do hero |
| `--c-cinza-texto` | `#5d5d58` | texto de apoio sobre papel |
| `--c-oliva` | `#484b45` | superfície escura de processo |
| `--c-tinta` | `#20211f` | texto principal, tarja |
| `--c-preto` | `#111211` | fundo do documento, superfície de imagem |

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
--papel:     var(--c-papel);
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
| Texto | `--fs-texto` | `--tr-texto` | `--lh-texto` | 17px → 16.5px |
| Rótulo | `--fs-rotulo` | `--tr-rotulo` | `--lh-rotulo` | 10.5px, igual em toda largura |

Os valores mobile trocam sozinhos em `@media (max-width: 600px)`, dentro do
próprio `tokens.css`. **O componente não precisa de media query para tipografia.**

Medida de leitura: `--medida` (`64ch`, dentro da faixa de 62 a 66 do `CLAUDE.md`).
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

- `--e-secao` — respiro entre seções: **128px** no desktop, **72px** no mobile (troca sozinho).
- `--e-margem` — margem lateral do texto no mobile: **20px**. A foto sangra até a borda; o texto mantém a margem.
- `--pad-lateral` — margem lateral da **página**: `clamp(20px, 5vw, 80px)`. Cresce com a tela e nunca desce abaixo dos 20px do mobile. É o que `Section`, `Header`, `Footer` e `MobileMenu` usam para alinhar tudo na mesma calha vertical. Não invente outro recuo lateral: use este.
- `--alt-cabecalho` — altura do cabeçalho: **88px**. Vale como offset de âncora e como altura da barra do `MobileMenu`, para o painel abrir alinhado ao cabeçalho que o cobre.

---

## 4. Forma

- `border-radius: 0` em **tudo**. Foto, card, botão, campo, chip. Junta precisa, como a marcenaria.
- Separação por fio de 1px (`--fio`) e por espaço. **Zero sombra.**
- Alinhamento **à esquerda** em tudo. Nada centralizado.
- `--toque` (44px) é o alvo de toque mínimo, com espaço entre alvos vizinhos.

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
| `--mov-fio` | 200ms | fio de 1px sob o item de navegação |
| `--mov-ease` | `cubic-bezier(.2,.8,.2,1)` | curva única do projeto |

**Proibido:** parallax, scroll sequestrado, carrossel automático, contador animado.

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
