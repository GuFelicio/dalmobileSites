# Prompts de construção — V2 de layout, sites Dalmóbile

**01/10/2026.** Cinco fases, uma sessão por fase, commit entre elas — mesma
convenção de [`prompts-construcao.md`](prompts-construcao.md), da v1.

A direção completa, com o porquê de cada decisão, está em
[`direcao-layout-sites-dalmobile.md`](direcao-layout-sites-dalmobile.md). Este
arquivo é o roteiro de execução, fase por fase.

> **Desvio já decidido (01/10/2026):** a abertura da home é o **vídeo** em loop
> inteiro em 16:9, sem nada por cima, e não uma foto. O item 11 e o item 22
> abaixo valem com "vídeo" no lugar de "foto". Ver `docs/decisoes.md`.

---

## Como a V1 fica preservada

- Tag **`v1-layout`** no commit `32ad8f4` — o que estava no ar quando a V2 começou.
- Branch **`v2-layout`**, que o Cloudflare publica como preview:
  - SJC: https://v2-layout-dalmobilesjc.gustavo-89c.workers.dev
  - Caraguá: https://v2-layout-dalmobilecaragua.gustavo-89c.workers.dev
- Só vai para `main` depois de aprovada. Se der errado, `git checkout v1-layout`.

## Duas decisões do cliente antes da fase 1

1. **Tracking dos títulos.** O `CLAUDE.md` especifica Display XL −0.065em e
   Display L −0.055em; em 48px as letras se tocam. Proposta: −0.045em no XL e
   −0.03em no L, atualizando o `CLAUDE.md` junto. Sem aprovação, o item 8 da
   fase 1 é pulado.
2. **Paleta do `CLAUDE.md` ≠ código.** O documento diz `#171614`, `#8B8884`,
   `#F2F1EE`; o código tem `#111211`, `#9E9B95`, `#F9F8F5`. A V2 mantém o
   código, e o `CLAUDE.md` é que deveria ser corrigido.

---

## Fase 0 — Preservar a V1 e abrir o terreno

Nenhuma mudança de layout. Árvore limpa; tag `v1-layout` enviada ao remoto;
branch `v2-layout` com URL de preview própria; a URL da V1 continua com a V1;
`docs/decisoes.md` com a entrada da V2.

## Fase 1 — Defeitos e tokens

Só defeitos e design system. Não redesenhar nenhuma seção.

**Parte A — defeitos**

1. **Cabeçalho ilegível nas internas** (texto `#20211F` sobre body `#111211`,
   ~1,1:1). O cabeçalho herda a superfície em que está:
   - sobre preto: fundo `#111211`, texto `#F9F8F5`, fio `rgba(249,248,245,.14)`
   - sobre papel: fundo `#F9F8F5`, texto `#20211F`, fio `rgba(32,33,31,.12)`
   - transparente só sobre a abertura, texto `#F9F8F5`; depois de 80px de
     rolagem assume a superfície sólida.
2. **Mobile sem navegação** (itens com width 0, só o WhatsApp de 42×42px).
   Painel de tela cheia, fundo `#111211`, itens em 32px peso 300, WhatsApp fixo
   na base, foco preso, fecha com Esc. Botão de abrir com 48×48px.
3. **Medida de leitura** (704px/17px ≈ 88 caracteres). `max-width: 34em` em
   todo texto corrido, sem exceção.

**Parte B — tokens**

4. **Superfícies, de cinco para três.** Ficam `--preto #111211`,
   `--papel #F9F8F5`, `--cinza #E8E6E0`. Saem `#484B45` e `#9E9B95`; a seção da
   fábrica passa a ser preta. Teto de quatro trocas por página.
5. **Ritmo vertical, de um intervalo para três:**
   `--respiro-curto` 56px (mobile 40px) entre blocos irmãos ·
   `--respiro` 120px (mobile 72px) entre seções da mesma superfície ·
   `--respiro-longo` 180px (mobile 96px) antes de troca de superfície.
   Nunca dois longos seguidos, nunca três curtos seguidos.
6. **Sangria:** `.bleed { width: 100vw; margin-left: calc(50% - 50vw); }`.
   Pelo menos duas fotos por página. Texto nunca sangra.
7. **Hierarquia:** o dek de página (hoje 22px) passa a 20px peso 400 na cor de
   apoio.
8. **Só com aprovação:** tracking −0.045em (XL) e −0.03em (L), com o
   `CLAUDE.md` atualizado junto.

Regras: zero hex fora dos tokens; Krub 300/400/600; nenhuma dependência nova;
comentário em português em todo número mágico.

**Pronto quando:** cabeçalho legível em todas as páginas; menu mobile abre,
fecha com Esc e prende o foco; nenhum texto corrido passa de 66 caracteres; os
três respiros existem como token e aparecem no CSS; seis larguras sem rolagem
horizontal; `docs/design-system.md` e `CHANGELOG.md` atualizados.

## Fase 2 — Home

Dar **forma própria** a cada seção — nenhuma com a silhueta da anterior.
**Não mexer em texto.**

9. Remover todos os rótulos numerados de seção (01 —, 02 —, 03 —).
10. No máximo uma seta ↗ por seção, só em link que sai da página. No resto,
    sublinhado de 1px no hover, 150ms, ease.
11. **Abertura (preto):** mídia inteira, 16:9, sangrando, `max-height: 78svh`,
    nada por cima. Abaixo, faixa preta: rótulo, título em Display XL (até três
    linhas, no máximo 20 caracteres de largura), dek em duas linhas, botão
    sólido. *(Vídeo, não foto — ver o desvio no topo.)*
12. **Manifesto (papel):** só tipografia. Uma frase em 30px, medida de 24em,
    com `--respiro-longo` acima e abaixo; parágrafo de apoio em 34em; um link
    discreto.
13. **Projetos (cinza):** grade editorial, sem carrossel. Ciclo A-B-C:
    A — foto sangrando 16:9, legenda embaixo à esquerda;
    B — duas fotos 3:2 lado a lado, legenda embaixo de cada;
    C — foto a 2/3 alinhada à direita, legenda na coluna vazia à esquerda.
    12 fotos = 4 ciclos. Fecha com "Ver todos os ambientes", discreto. Legenda
    sempre abaixo da foto (nome em Subtítulo, ambiente em Rótulo). No mobile,
    uma coluna, foto sangrando.
14. **Fábrica (preto):** o único split, 50/50, foto à esquerda. Os três números
    viram linha de fios verticais de 1px, sem fundo: número em 40px peso 300,
    legenda em 12.5px, `tabular-nums`.
15. **A loja (papel):** faixa 21:9 sangrando e, abaixo, três colunas estreitas:
    ENDEREÇO | HORÁRIO | CONTATO.

Superfícies: preto → papel → cinza → preto → papel → rodapé preto (quatro
trocas). **Pronto quando:** nenhuma silhueta repetida, nenhum rótulo numerado,
nenhuma legenda sobre foto, três respiros sem dois longos seguidos, duas fotos
sangrando, seis larguras ok, nenhum texto mudou (diff só de conteúdo),
CHANGELOG.

## Fase 3 — Páginas internas

`/ambientes`, `/ambientes/[slug]`, `/a-dalmobile`, `/arquitetos`, `/a-loja`,
`/privacidade`. **Não mexer em texto.**

16. Gabarito de cabeçalho de página: rótulo (caminho) → Display L → dek em
    Subtítulo na cor de apoio → régua de 1px **da largura da coluna de texto**.
    Depois, `--respiro` (120px).
17. Nenhuma régua mais larga que o texto que separa: ou a coluna da direita
    recebe conteúdo alinhado ao topo (foto pequena, número grande, frase
    puxada do texto), ou a régua encolhe até a medida do texto.
18. `/ambientes` sem vão: primeiro item em duas colunas (16:9), demais em uma
    (4:3). SJC: 2+1+1 / 1+1+1+1. Caraguá (4 itens): duas colunas, fotos
    grandes. 2 colunas no mobile, 3 no tablet, 4 no desktop. "8 FOTOS" vira
    "8 projetos" ou some.
19. `/arquitetos`: a grade 2×2 vira quatro blocos empilhados em largura total,
    régua entre eles, título à esquerda (3 colunas) e texto à direita (6).
20. `/a-dalmobile`, "O processo": números 01–05 em 24px peso 300, cor de apoio,
    alinhados ao topo do título; régua na largura da coluna de texto.
21. Uma foto por página interna com `.bleed`.

**Pronto quando:** nenhuma régua mais larga que o texto, nenhuma grade com
vão nas duas unidades, nenhum bloco com 45% vazio ao lado sem motivo, seis
larguras, nenhum texto mudou, CHANGELOG.

## Fase 4 — As duas unidades

22. Abertura própria por unidade, vinda do config, nunca do componente.
    *(Vídeo — cada unidade precisa do seu.)*
23. Conferir que a composição da home continua vindo do config.
24. Teste de cidade cruzada nos dois builds.

O que muda entre as unidades é só: abertura, acervo, colunas da grade de
ambientes e dados da unidade. Nunca duplicar componente ou estilo.

## Fase 5 — Verificação e comparação

25. Prints de página inteira nos dois sites, nas seis larguras (390×844,
    430×932, 768×1024, 1024×768, 1280×800, 1920×1080): home, /ambientes, uma
    página de ambiente, /a-dalmobile, /arquitetos, /a-loja.
26. Folha de comparação V1 × V2 da home em 1280 e 390, lado a lado.
27. Checklist marcado: cabeçalho legível; menu mobile (Esc, foco, alvos ≥ 44px);
    ≤ 66 caracteres por linha; nenhuma legenda sobre foto; nenhum rótulo
    numerado; no máximo uma ↗ por seção; três superfícies, no máximo quatro
    trocas; três respiros sem dois longos seguidos; duas fotos sangrando por
    página; nenhuma silhueta repetida; nenhuma grade com vão; nenhuma régua
    mais larga que o texto; sem rolagem horizontal; `:focus-visible` em tudo;
    nenhum `100vh`; aberturas diferentes entre unidades; nenhum texto alterado.
28. Checklist "Obrigatório antes de qualquer deploy" do `CLAUDE.md`, marcado.
29. `docs/design-system.md`, `docs/decisoes.md` e `CHANGELOG.md` com a V2.

**Não fazer merge em `main`.** A decisão de promover a V2 é do cliente.

---

## O que não muda na V2

Nenhum texto · nenhuma cor da marca (só a quantidade de superfícies) · raio 0 e
zero sombra · Krub 300/400/600 · alinhamento à esquerda · fotos sem filtro,
escurecimento ou moldura · nenhuma dependência nova · a camada de config por
unidade.
