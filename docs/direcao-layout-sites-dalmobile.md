# Direção de layout — sites Dalmóbile SJC e Caraguatatuba

**01/10/2026.** Revisão de aparência dos dois sites em servidor de teste, feita sobre prints de página inteira em 1440px e 390px e sobre o CSS computado das páginas.

Nenhuma cor da marca muda. Tudo aqui é **forma**: proporção, ritmo, escala, grade e densidade.

---

## 1. O diagnóstico, em uma frase

A home inteira é a **mesma molécula repetida quatro vezes** — `rótulo numerado → título gigante em duas ou três linhas → parágrafo → link com ↗` — e as páginas internas são a mesma coluna de texto cinza ocupando 55% da tela com 45% de vazio ao lado.

Não é a paleta que entrega. É a **ausência de variação de forma**. Design feito por pessoa varia o intervalo, a escala e o enquadramento conforme o que cada bloco precisa dizer. Design gerado repete a estrutura que funcionou uma vez.

---

## 2. As sete marcas

Em ordem de quanto cada uma entrega o jogo:

1. **Rótulos numerados de seção** — `01 — COMO PROJETAMOS`, `02 — PROJETOS EXECUTADOS`, `03 — DA FÁBRICA À MONTAGEM`. Estúdio nenhum numera as seções da própria home. É o recurso que aparece quando falta ritmo de verdade.
2. **A seta ↗ em todo link** — seis por página.
3. **Split 50/50 alternando mecanicamente** — texto-esquerda/foto-direita, inverte, inverte de novo. Alternância automática é ausência de decisão.
4. **Cartão translúcido sobre a foto de abertura** — e no mobile ele flutua com margem dos dois lados, com um fio de 1px escapando no canto.
5. **Faixa de três números** (1977 · 100% · 6) — dispositivo de landing page.
6. **Intervalo vertical constante** — 112px, 112px, 64px, 0px. Nenhuma seção tem direito a respirar diferente.
7. **Nada sangra** — toda foto dentro da mesma caixa de 1280px, mesma margem.

**O princípio da correção:** quando uma seção parecer fraca, mude a **forma** dela — não acrescente adjetivo visual. Nenhuma seção da home pode ter a mesma silhueta da anterior.

---

## 3. Correções obrigatórias — antes de qualquer redesenho

Não são estética. São defeitos.

### 3.1 O cabeçalho está invisível nas páginas internas

`header` com `background: transparent` e texto `#20211F`, sobre `body { background: #111211 }`. Contraste de ~1,1:1 — o menu não existe em `/ambientes`, `/a-dalmobile`, `/arquitetos` e `/a-loja`.

**Correção:** o cabeçalho herda a superfície em que está.

```
sobre preto   → fundo #111211, texto #F9F8F5, fio inferior rgba(249,248,245,.14)
sobre papel   → fundo #F9F8F5, texto #20211F, fio inferior rgba(32,33,31,.12)
```

Enquanto não rola, pode ser transparente **apenas** sobre a foto de abertura, com o texto em `#F9F8F5`. Depois de 80px de rolagem, assume a superfície sólida.

### 3.2 No mobile não existe navegação

Os quatro itens de menu estão com `width: 0`. Só sobra o botão de WhatsApp, de 42×42px — abaixo do mínimo de 44px.

**Correção:** painel de menu em tela cheia, fundo `#111211`, itens em 32px peso 300, WhatsApp fixo na base do painel. Botão de abrir com área de toque de 48×48px.

### 3.3 Medida de leitura

Parágrafos a 704px / 17px ≈ 85 a 90 caracteres por linha. O alvo é 62 a 66.

**Correção:** `max-width: 34em` em todo texto corrido. Sem exceção.

### 3.4 Texto branco sobre foto

O primeiro card do carrossel tem o título em branco sobre a foto; os outros onze têm o título embaixo. Além de ilegível, denuncia que o componente tem dois estados que ninguém decidiu.

**Correção:** legenda **sempre** abaixo da foto.

### 3.5 Tracking apertado demais — decisão do Gu, não defeito

`-2.64px` em 48px = −0.055em. As letras se tocam em "Nenhuma casa é igual à planta."

Importante: **o código está cumprindo o `CLAUDE.md`**, que especifica Display XL −0.065em e Display L −0.055em. Não é bug, é a especificação apertada demais na prática.

**Proposta:** −0.045em no Display XL, −0.03em no Display L, −0.02em em título de seção, 0 no corpo — e atualizar a tabela do `CLAUDE.md` junto. Só aplicar com aprovação; o resto da V2 não depende disso.

---

## 4. O sistema

### 4.1 Superfícies — de cinco para três

No ar hoje: `#111211` · `#F9F8F5` · `#E8E6E0` · `#484B45` · `#9E9B95`. Cinco tons numa página só.

**Fica com três**, que é o que a direção original define — mantendo os valores que já estão construídos:

| Token | Valor | Onde |
|---|---|---|
| `--preto` | `#111211` | abertura, seção de fábrica, galerias, rodapé |
| `--papel` | `#F9F8F5` | páginas de leitura, hub de ambientes, FAQ |
| `--cinza` | `#E8E6E0` | faixas de costura e transição |

> **Pendência de documentação, não de código.** O `CLAUDE.md` define `--preto #171614`, `--cinza #8B8884` e `--papel #F2F1EE` — nenhum igual ao que está no ar. Como a instrução é não mexer em cor, a V2 mantém os valores construídos e **o `CLAUDE.md` é que precisa ser corrigido** para refletir a realidade. Deixar os dois divergindo é como o site anterior acabou com a cidade errada no título.

`#484B45` e `#9E9B95` saem. A seção da fábrica, que hoje é verde-acinzentada, passa a ser **preta** — e aí a página ganha uma simetria real: abre em preto, fecha em preto, com papel e cinza no meio.

**Máximo de quatro trocas de superfície por página.** Mais que isso vira retalho.

### 4.2 Ritmo vertical — de um intervalo para três

Hoje tudo é 112px (e um 122px que claramente escapou). Ritmo constante é o que faz a página parecer gerada.

| Intervalo | Desktop | Mobile | Quando |
|---|---|---|---|
| **Curto** | 56px | 40px | entre blocos irmãos dentro da mesma seção |
| **Normal** | 120px | 72px | entre seções da mesma superfície |
| **Longo** | 180px | 96px | antes de uma troca de superfície, e antes da seção mais importante da página |

A regra que importa: **nunca dois intervalos longos seguidos, nunca três curtos seguidos.**

### 4.3 Escala tipográfica

Krub, peso 300 — como a direção fechou. O que muda é o tracking e o contraste entre os níveis.

| Papel | Desktop | Mobile | Peso | Tracking |
|---|---|---|---|---|
| Display XL — abertura | `clamp(44px, 5.2vw, 72px)` | 40px | 300 | −0.03em |
| Display L — título de página | 48px | 32px | 300 | −0.03em |
| Seção | 34px | 26px | 300 | −0.02em |
| Frase-manifesto | 30px | 24px | 300 | −0.02em |
| Subtítulo / dek | 20px | 19px | 400 | −0.01em |
| Corpo | 17px / 1.62 | 16.5px | 400 | 0 |
| Apoio | 14.5px | 14px | 400 | 0 |
| Rótulo | 10.5px | 10.5px | 600 | 0.24em, caixa alta |

**Hierarquia hoje:** 48px → 22px → 17px, tudo no mesmo peso e na mesma cor. Lê como uma parede única. O salto de 48 para 20 e a mudança de cor no dek (`--cinza-texto`, não preto) resolvem sem acrescentar nada.

### 4.4 Sangria

Pelo menos **duas fotos por página** passam da grade. Hoje, nenhuma.

```css
.bleed { width: 100vw; margin-left: calc(50% - 50vw); }
```

Usar na foto de abertura e numa foto por página interna. Texto nunca sangra.

### 4.5 A seta ↗

Máximo **uma por seção**, e só em link que leva para fora da página. Para o resto: sublinhado de 1px que aparece no hover, 150ms, `ease`.

---

## 5. Home — a forma nova, seção por seção

Cada seção tem uma silhueta diferente da anterior. É essa a única regra estruturante.

### 5.1 Abertura · preto · **foto cheia**

Foto 16:9 sangrando de ponta a ponta, `max-height: 78svh` (nunca `vh`). **Nada por cima.**

Abaixo, faixa preta: rótulo, título em Display XL (até três linhas, máximo 20 caracteres de largura), dek em duas linhas, botão sólido.

*Por quê:* o cartão translúcido sai. A foto é o único ativo que a concorrência não tem — escurecê-la ou cobri-la para caber texto é jogar fora exatamente isso. E a tipografia em palco próprio é o que faz a abertura parecer editorial em vez de anúncio.

### 5.2 Manifesto · papel · **só tipografia**

Sem rótulo numerado. Sem foto. Sem split.

Uma frase em Frase-manifesto (30px, medida de 24em), sozinha, com 180px acima e abaixo. Logo abaixo, o parágrafo de apoio em corpo, coluna de 34em. Um link discreto.

*Por quê:* é a única seção da página sem imagem. O silêncio é a forma dela — e é o que quebra a cadeia de splits idênticos.

### 5.3 Projetos · cinza · **grade editorial, sem carrossel**

O carrossel sai (a direção já proibia). No lugar, um ciclo de três ritmos que se repete:

```
A   foto sangrando, 16:9 · legenda embaixo, à esquerda
B   duas fotos 3:2 lado a lado · legenda embaixo de cada
C   foto a 2/3 alinhada à direita · legenda na coluna vazia à esquerda
```

Doze fotos = quatro ciclos A-B-C. Fecha com `Ver todos os ambientes`, discreto.

Legenda sempre: nome do projeto em Subtítulo, ambiente em Rótulo abaixo. Nunca sobre a foto.

*Por quê:* carrossel divide a atenção e nenhuma foto ganha o tamanho que merece — e as fotos são grande-angular de ambiente inteiro, o oposto do que cabe numa miniatura. O ciclo de três ritmos dá variação sem exigir decisão nova a cada projeto publicado.

### 5.4 Fábrica · preto · **o único split**

Mantém o 50/50 — foto à esquerda, texto à direita — agora sobre preto.

Como é o único split que sobrou na página, ele passa a significar alguma coisa.

Os três números saem da caixa e viram **linha de fios verticais de 1px**, alinhada à esquerda com o texto, sem fundo próprio: número em 40px, legenda em 12.5px abaixo.

### 5.5 A loja · papel · **faixa baixa**

Deixa de ser split. Foto em faixa 21:9 sangrando, e abaixo, três colunas estreitas sobre papel:

```
ENDEREÇO            HORÁRIO                   CONTATO
rua, bairro,        Seg a sex, 09–19h         (12) ....
cidade, CEP         Sáb, 08–14h               Falar no WhatsApp
```

*Por quê:* elimina o quarto split e, de quebra, o bloco cinza de ~150px vazio que hoje termina a página.

### 5.6 Sequência final de superfícies

```
preto → papel → cinza → preto → papel → rodapé preto
```

Quatro trocas. Abre e fecha escuro.

---

## 6. Páginas internas — um gabarito só

O problema das internas é um só: **o texto ocupa 55% da largura e os outros 45% ficam vazios**, com réguas de 1px que atravessam a página inteira separando um texto que tem metade disso. Em `/arquitetos` ainda há um buraco de ~200px entre a introdução e a primeira seção, maior que todos os outros intervalos da página.

### 6.1 Cabeçalho de página

Rótulo (caminho de navegação) → Display L → uma linha de dek em Subtítulo, cor de apoio → régua de 1px **da largura da coluna de texto**, nunca da página.

Depois da régua: intervalo **normal** (120px). Não 200.

### 6.2 A coluna da direita trabalha

Toda seção de texto longo ganha algo na coluna vazia, alinhado ao topo do bloco:

- em `/a-dalmobile` → foto pequena, ou o número da etapa em escala grande
- em `/arquitetos` → uma frase destacada em Subtítulo, puxada do próprio texto
- em qualquer página → nada, **e aí a régua também para onde o texto para**

A regra: ou a coluna recebe conteúdo, ou a régua encolhe até a medida do texto. O que não pode é fio cheio com texto pela metade.

### 6.3 `/ambientes` — a grade não pode deixar buraco

SJC tem 7 ambientes numa grade de 4 colunas: 4 + 3, com um vão na ponta. Caraguá tem 4, uma linha exata.

**Correção:** grade assimétrica em que o primeiro item ocupa **duas colunas** (foto maior, 16:9) e os demais ocupam uma (4:3). SJC fica 2+1+1 / 1+1+1+1 — sem vão. Caraguá, com quatro itens, vira **duas colunas com fotos grandes**: menos acervo pede foto maior, não grade mais vazia.

Trocar `8 FOTOS` por `8 projetos` ou simplesmente omitir — contagem de arquivo lê como inventário.

### 6.4 `/arquitetos` — a grade 2×2 sai

Os quatro blocos de "Como funciona a parceria" numa grade 2×2 com fio em volta é o molecular mais genérico que existe.

**Correção:** quatro blocos empilhados em largura total, com régua de 1px entre eles, e **duas colunas dentro de cada bloco**: título à esquerda (coluna de 3), texto à direita (coluna de 6). Vira lista editorial em vez de cards.

### 6.5 `/a-dalmobile` — o processo

Os números `01`–`05` hoje são minúsculos e flutuam acima da linha do título da etapa.

**Correção:** 24px, peso 300, cor de apoio, alinhados ao **topo** do título. Régua entre as etapas na largura da coluna de texto.

---

## 7. As duas unidades

**Estrutura idêntica, prova diferente.** Hoje a única diferença entre os sites é o tom do cartão da abertura — e a foto de abertura é a mesma nos dois (mesma cozinha, recorte levemente diferente). Isso derruba a premissa "uma promessa, duas provas" logo na primeira tela.

| | SJC | Caraguatatuba |
|---|---|---|
| Foto de abertura | própria, exclusiva | própria, exclusiva — **nunca a mesma** |
| Grade de ambientes | 7 itens, grade assimétrica 2+1+1 | 4 itens, **duas colunas, fotos grandes** |
| Ciclo do portfólio | A-B-C × 4 | A-B-C até onde o acervo der |
| Tudo o mais | idêntico | idêntico |

Caraguá ter menos acervo não é um problema a esconder com grade apertada — é um motivo para dar mais tamanho a cada foto.

---

## 8. Movimento

Hoje praticamente não existe, o que é melhor que existir demais. O que entra:

- Imagem aparece com fade de 400ms **partindo de visível** — nunca opacidade zero esperando o scroll
- Hover em foto de projeto: `scale(1.02)`, 600ms, `ease-out`. Só isso
- Navegação: fio de 1px aparece sob o item, 150ms
- Botão: `scale(0.97)` no `:active`
- Animar só `transform` e `opacity`
- Respeitar `prefers-reduced-motion`

Sem parallax, sem contador animado, sem scroll sequestrado, sem carrossel.

---

## 9. O que já está certo e não deve ser tocado

- **Raio 0 em tudo** e **zero sombra**, nos dois sites. Isso é raro e é metade do caráter da marca
- Fotos sem filtro, sem escurecimento, sem moldura
- Alinhamento à esquerda consistente
- A estrutura de rodapé em quatro colunas
- Nenhuma rolagem horizontal em nenhuma página, em nenhum dos dois tamanhos

---

## 10. Checklist de verificação

Antes de considerar pronto, conferir nos dois sites, em 1440px e 390px:

- [ ] O cabeçalho é legível em **todas** as páginas, nas duas superfícies
- [ ] O menu abre e funciona no mobile; alvos de toque ≥ 44px
- [ ] Nenhum texto corrido passa de 66 caracteres por linha
- [ ] Nenhuma legenda em cima de foto
- [ ] Nenhum rótulo numerado de seção
- [ ] No máximo uma seta ↗ por seção
- [ ] Três superfícies na página, no máximo quatro trocas
- [ ] Três intervalos verticais distintos em uso, sem dois longos seguidos
- [ ] Pelo menos duas fotos sangram por página
- [ ] Nenhuma seção tem a mesma silhueta da anterior
- [ ] Nenhuma grade termina com vão
- [ ] Nenhuma régua de 1px mais larga que o texto que ela separa
- [ ] A foto de abertura de Caraguá é diferente da de SJC

---

## 11. Como isso vira código

Os prompts de construção estão em `prompts-v2-layout.md`, divididos em cinco fases — mesma convenção dos prompts da v1, uma sessão por fase, commit entre elas.

A V1 fica preservada por **tag + branch**: `v1-layout` como ponto de retorno, `v2-layout` com URL de preview própria no Cloudflare. As duas no ar ao mesmo tempo, para comparar lado a lado. Merge em `main` só depois da aprovação.

| Fase | O que entra |
|---|---|
| **0** | Tag, branch, preview, entrada no log de decisões |
| **1** | Os três defeitos (cabeçalho, menu mobile, medida) e os tokens (três superfícies, três respiros, sangria) |
| **2** | A home — cada seção com forma própria |
| **3** | As páginas internas — gabarito de leitura e as grades |
| **4** | As duas unidades — foto de abertura própria e teste de cidade cruzada |
| **5** | Verificação nas seis larguras e folha de comparação V1 × V2 |
