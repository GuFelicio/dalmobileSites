# Changelog

O que mudou em cada entrega. Uma entrada por fase do
[`docs/prompts-construcao.md`](docs/prompts-construcao.md).

Formato: mais recente primeiro. Cada entrada diz o que entrou, o que saiu e o
que ficou pendente de propósito — pendência sem registro vira dívida silenciosa.

---

## [0.6.0] — 2026-09-09

### `/a-loja`, `/privacidade` e a 404

O CTA principal do site — *"Falar sobre um projeto assim"*, no fim de toda
página de ambiente — apontava para uma página que **não existia**.

**Entrou**

- **`/a-loja`** — endereço, telefone, WhatsApp e horário completo, tudo do
  config, mais atalhos para os ambientes e a faixa da outra loja. Carrega o
  **schema `LocalBusiness`** gerado do config, que é o que sustenta a busca
  local. Horário não confirmado **não entra no schema**.
- **`/privacidade`** — LGPD. Diz, com verdade, que o site não coleta dado
  nenhum, porque ainda não tem formulário. **Precisa ser revista quando o
  formulário entrar.**
- **404** — uma linha honesta e os caminhos mais úteis, sem piada. Importa
  agora: é onde cai quem clicar no que ainda não existe.
- `mapaDaUnidade()` e `schemaLocalBusiness()` em `config/derivados.ts`.

**O mapa**

`mapa.embed` continua pendente. A página **não renderiza iframe vazio**: sem o
dado, mostra uma foto de ambiente no lugar. Quando o embed chegar, o mapa nasce
sozinho.

**Mudou**

- `/a-dalmobile` e `/arquitetos` **saíram do menu e do rodapé**. Não existem, e
  dependem de texto institucional que ainda não temos — linkar para elas era
  404 em toda página. O menu ficou com "Ambientes" e "A loja".
- A ficha do case dormente deixou de linkar `/arquitetos`.

**O teste de links estava furado**

Ele varria só a home — e a home é o andaime do estudo, com rodapé próprio. Os
links do componente `Footer`, que é **onde estavam as rotas quebradas**, nunca
eram vistos. Agora varre cinco páginas. Verificado injetando uma rota falsa: o
teste acusa `→ 404` e quebra a suíte.

---

## [0.5.2] — 2026-09-09

### A home passou a usar o acervo real e a levar a algum lugar

**O problema.** A home era o estudo promovido a conteúdo, e **nenhum botão
levava às páginas de ambiente**. Toda ação apontava para `#sintese-contato` — e
"Agendar uma visita" ficava *dentro* daquela seção, apontando para ela mesma,
que é o "link âncora para a própria seção" proibido pelo `CLAUDE.md`. A seção
02, "Projetos que permanecem", mostrava três fotos de estudo com rótulos
inventados ("EXPRESSIVO", "ORGÂNICO", "CONTEMPORÂNEO").

**Corrigido**

- Menu, hero, "Explorar portfólio" e os cards levam a `/ambientes` e
  `/ambientes/[slug]`. Âncora sobrou só onde é legítima: seção da própria página.
- "Agendar uma visita" virou **"Falar no WhatsApp"**, com destino real e a
  mensagem que identifica a unidade de origem.
- A seção 02 mostra os **três primeiros ambientes desta unidade**, com a foto e
  o título reais, e cada card leva à página do ambiente.
- Hero, manifesto, processo e contato passaram a usar fotos do acervo, via
  `<Foto>` com `srcSet`. **Só o logo da marca restou de `public/assets/`.**
- `MÓVEIS PERSONALIZADOS · SJC` e `SHOWROOM SJC` estavam com a sigla escrita à
  mão — outro vazamento que o teste de cidade cruzada não pega, porque a sigla
  não é o nome da cidade. Agora vêm do config.

**Ordem editorial, não alfabética**

`ambientesDe()` passou a ordenar pela lista de `lib/ambientes.ts`, e não pela
ordem do sistema de arquivos. Em ordem alfabética a home abria com **Banheiro**;
agora abre com Cozinha, Quartos e Sala de estar. Vale também para `/ambientes`.

**Dois testes novos, para o furo que deixou isso passar**

O teste `nenhum CTA sem destino real` só via `href="#"` e âncora sem `href`.
Passava com a home inteira apontando para si mesma e com quatro rotas 404 no
menu e no rodapé. Agora: um teste **busca cada link interno da home e confere
se a rota responde 200**, e outro falha se uma seção tiver link para si mesma.
A suíte foi de 41 para **43**.

**`docs/pendencias.md`**

Documento novo com o que falta: as quatro rotas 404, os dados de loja, prédio e
arquiteto por foto, a camada de projetos dormente, a conferência nas seis
larguras e a home provisória.

---

## [0.5.1] — 2026-09-09

### Trava: em CI, o build recusa rodar sem saber a unidade

`npm run build` sem `UNIDADE` caía no padrão e produzia **São José dos Campos**.
Nos dois projetos da Cloudflare com o comando padrão, os **dois** sites sairiam
SJC — em silêncio, com o build verde. É o mesmo erro que derrubou o site
anterior, só que na camada de deploy, onde nenhum teste alcança.

`vite.config.ts` agora recusa buildar quando `CI` está definida e `UNIDADE` não,
com uma mensagem que diz qual comando usar em cada projeto. Fora de CI o padrão
continua valendo, para o `npm run dev` não exigir cerimônia.

Documentado em `docs/unidades.md`, com a tabela de comando por projeto.

---

## [0.5.0] — 2026-09-09

### O acervo real entrou, e o site virou organizado por ambiente

**45 fotos reais** de seis apartamentos, de 250 MB para 20 MB no repositório.

**Entrou**

- `conteudo/ambientes/*.md` — sete ambientes, com título de impacto e `alt`
  escritos foto a foto, olhando cada uma das 45.
- `/ambientes` (hub, grade 2/3/4 colunas, foto 4:3) e `/ambientes/[slug]`
  (texto, galeria grande empilhada, chamada final).
- `lib/ambientes-conteudo.ts` (núcleo puro) e `lib/ambientes-da-unidade.ts`.
- Concordância por ambiente em `lib/ambientes.ts` — `artigo`, `planejado` e
  `singular`. Sem isso o site escrevia "Cozinha planejado" no `<title>` e
  "Quer um quartos assim" na chamada.
- Capa do site: `casaCompleta.jpg`, que mostra estar, jantar e gourmet juntos.
- 9 testes de ambiente. A suíte foi de 32 para **41**.
- `docs/adicionar-ambiente.md`.

**Mudou**

- A lista de ambientes passou a vir do acervo, não do catálogo: entraram
  **Quartos** (o mais fotografado, 12 fotos) e **Espaço gourmet**; saíram
  cozinha compacta/gourmet separadas, casa integrada e lavanderia, sem foto.
- `imgs/` foi para o `.gitignore`: os originais em resolução cheia são arquivo
  morto e vivem no Drive.
- `/projetos` saiu do menu. A rota e a camada continuam no código, sem
  conteúdo, esperando prédio e arquiteto.
- Os três projetos de exemplo e suas fotos foram removidos.

**Corrigido — acessibilidade**

`--cinza` como cor de texto sobre papel dá **2,52:1** de contraste, e o WCAG AA
exige 4,5:1. A camada semântica não tinha token para texto de apoio; ganhou
`--cinza-texto`, com **6,02:1**. Três lugares do case da Fase 4 já reprovavam.

**Pendente**

- **Prédio e arquiteto de cada foto.** Os campos existem e estão vazios; a
  linha de crédito não aparece enquanto for assim.
- Mapa das duas lojas.
- **Conferência visual nas seis larguras** — as páginas novas nunca foram
  abertas em navegador.

---

## [0.4.1] — 2026-09-08

### Corretiva — o andaime de protótipo saiu do ar

O seletor **"ESTUDOS DE HOME"** estava publicado nos dois deploys: uma barra
fixa de protótipo no site de um cliente. Sobreviveu à limpeza da Fase 1 porque
a página que ele controlava ainda estava em revisão, e a decisão não foi
revista quando a revisão terminou.

**Removido**

- `StudySwitcher` e todo o CSS `.study-*`, incluindo a compensação
  `.site { padding-top: 58px }` da barra fixa.
- `EditorialLayout`, `ImmersiveLayout` e todo o CSS `.editorial-*` e
  `.immersive-*`. Fica só o Síntese, promovido a conteúdo direto do `page.tsx`.
- O `useState` que restava e, com ele, o `"use client"`: **a home voltou a ser
  server component**.
- Mais duas compensações da barra fixa embutidas em outras regras
  (`.header { top: 58px }` e `calc(100svh - 58px)` no hero).
- Sete classes órfãs sem prefixo, restos dos mesmos estudos: `.hero-support`,
  `.manifesto-copy`, `.menu-button`, `.process-photo-wrap`, `.process-stats`,
  `.section-heading-row`, `.text-link`.

`app/page.tsx`: 302 → 125 linhas. `app/globals.css`: 758 → 429 linhas. Toda
classe restante do `globals.css` está em uso.

**Corrigido de quebra**

- O link do cabeçalho dizia **"Showroom SJC"**, escrito à mão. No site de
  Caraguá saía "Showroom SJC", e o teste de cidade cruzada **não pegava** —
  a sigla não é o nome da cidade. Agora lê do config.
- `<title>` provisório passou a `Móveis Planejados em <cidade> | Dalmóbile`,
  com a cidade do config. O definitivo é a Fase 8.

**Para não voltar**

- `CLAUDE.md`, no checklist de deploy: *"Nenhum andaime de protótipo no build:
  seletor de layout, barra de debug, título de estudo, rota de teste"*.
- Dois testes novos: um falha se qualquer marca do seletor reaparecer no HTML,
  outro confere o formato do título. A suíte foi de 30 para 32.

**Imagens órfãs — nenhuma foi apagada, conforme pedido**

Com a saída dos dois estudos, quatro arquivos de `public/assets/` deixaram de
ser referenciados:

| Arquivo | Onde era usado |
|---|---|
| `casa-sabin.webp` | estudo Editorial |
| `loft-sem-pressa.webp` | estudo Editorial |
| `quarto-autoral.webp` | estudo Imersiva |
| `fabrica.webp` | estudo Imersiva |

Seguem no repositório, conforme pedido, até a definição de quais fotos entram
no site. As demais de `public/assets/` continuam em uso pelo Síntese.

> Atenção ao apagá-las: os arquivos de `public/fotos/` que os projetos de
> exemplo usam são **cópias** destas, com outro nome. Apagar as originais não
> quebra os projetos.

---

## [0.4.0] — 2026-09-08

### Estrutura de fotos por unidade e ambiente

Preparação para o cliente carregar o acervo real.

**Entrou**

- `public/fotos/{sjc,caragua,comum}/<ambiente>/` — 27 pastas, com
  `public/fotos/LEIA-ME.md` explicando a escolha entre as três raízes.
- `lib/ambientes.ts` — a lista canônica dos oito ambientes dos catálogos.
- Campo `ambiente` por foto no frontmatter, necessário para a galeria de
  `/ambientes/[slug]` da Fase 5.
- Quatro validações novas, todas com mensagem que diz o que fazer: ambiente
  fora da lista, foto na raiz errada, pasta de ambiente que não bate com o
  campo, e foto sem ambiente.
- 4 testes novos. A suíte foi de 26 para 30.

**Migrado**

- Os três projetos de exemplo saíram de `public/fotos/projetos/<slug>/` para a
  estrutura nova. A convenção antiga foi removida, para não conviverem duas.

**Bug sério corrigido: `npm run fotos` não fazia nada**

O guard de execução direta comparava `import.meta.url` com
`file://${process.argv[1]}`. O caminho deste projeto contém espaço, que a URL
codifica como `%20` e o argv não — a comparação nunca casava. O passo de imagem
**não rodava**, em silêncio, com o build verde. Na Cloudflare isso significaria
publicar sem nenhuma variação gerada, ou seja, foto de desktop no celular. Agora
usa `pathToFileURL`.

---

## [0.3.0] — 2026-09-08

### Fase 4 — Case e índice de projetos

O gabarito que o site repete trinta vezes.

**Entrou**

- `conteudo/projetos/*.md` — projeto em Markdown com frontmatter validado.
  Campo faltando quebra o build com mensagem que diz o que fazer.
- `lib/projetos.ts` — núcleo puro de leitura e validação, sem `@unidade`, para
  a suíte conseguir exercitá-lo sem subir um build.
- `lib/projetos-da-unidade.ts` — a ligação com o config. As páginas chamam daqui.
- `build/gerar-imagens.mjs` — gera 440/880/1240/1920 com `sharp`, incremental,
  sem ampliar acima do original. Escreve um manifesto com proporção e larguras.
- `components/midia/Foto.tsx` — `<img>` com `srcSet` e `sizes` reais. `sizes` é
  prop obrigatória; foto sem variação gerada quebra o build.
- `lib/fotos.ts` — a conta de URL, compartilhada entre o componente e a metadata.
- `/projetos` — índice em preto, filtro por ambiente e por edifício com estado
  na URL, "Carregar mais" como link. Server component, sem JavaScript.
- `/projetos/[slug]` — o case, com os nove blocos da seção 5 da direção e
  OpenGraph por página com a foto de abertura.
- `docs/adicionar-projeto.md` — o passo a passo, escrito para quem não programa.
- 10 testes novos de conteúdo, filtro e imagem.
- `sharp` e `gray-matter` (aprovados antes de instalar).

**next/image saiu, e a verificação está registrada**

Além do binding `env.IMAGES` não existir, descobriu-se lendo o vinext que o shim
de `next/image` **desliga o `srcSet` ao receber um loader próprio**, e com
`unoptimized` gera um `srcSet` apontando todas as larguras para o mesmo arquivo.
Nenhum caminho entregava a imagem certa por tela. A linha do `CLAUDE.md` que
mandava usar `next/image` foi reescrita; a regra por trás dela ficou mais forte.

**Verificado**

- No build de Caraguá, `/projetos/rizzuti-dr-marcos` (só de SJC) responde **404**.
- Filtro correto nos dois eixos; combinação sem resultado mostra saída; valor
  inventado na URL devolve a lista inteira, não página em branco.

**Corrigido**

- `docs/prompts-construcao.md` mandava ler a "seção 8" da direção para a Fase 4;
  a seção 8 é Arquitetos. O gabarito é a 5 e o índice a 4.
- `@next/next/no-img-element` desligado com justificativa: com a decisão tomada,
  o aviso viraria ruído constante que treina o time a ignorar o lint.

**Pendente**

- Os três projetos são **exemplo**, com dados inventados, e a trava de deploy
  recusa publicar enquanto estiverem marcados assim.
- O bloco 7 do case (depoimento) não foi implementado: entra com o primeiro
  depoimento autorizado.
- **Falta a conferência visual nas seis larguras da matriz.** As regras estão
  escritas e comentadas, mas ninguém olhou as páginas ainda.

---

## [0.2.1] — 2026-09-08

Dados das duas lojas confirmados pelo cliente. As pendências caíram de 15 para 4.

**Confirmado**

- **SJC** — WhatsApp `5512996049888`; sábado 08h00 às 14h00 (o horário anterior,
  não confirmado, dizia 09h00); ficha do Google Business.
- **Caraguá** — WhatsApp `5512996049888`; segunda a sexta 09h00 às 18h00; ficha
  do Google Business.

**As duas unidades usam o MESMO número de WhatsApp**

Isso colide com o `docs/direcao-site.md`, que exige que o lead carregue de qual
unidade veio. `linkWhatsApp()` passou a montar o `wa.me` com mensagem
pré-preenchida citando a cidade daquele site — é o **único** sinal de origem que
existe. Um teste novo falha se algum link de WhatsApp sair sem ela.

**Corrigido**

- O rodapé renderizava "Dalmóbile Nossa outra loja". O prefixo saiu e o rótulo
  virou "Ver a outra loja".
- O teste "ação sem destino aparece desabilitada" travava o **estado** (a loja
  sem WhatsApp) em vez da **regra**, e passou a falhar no dia em que o número
  chegou — ou seja, por estar certo. Reescrito para testar a regra.

**Pendente**

- Mapa (`embed` e `link`) das duas unidades — o link `share.google` não serve,
  só resolve com JavaScript. Precisa do iframe de "Compartilhar > Incorporar um
  mapa" do Google Maps.
- Horário de sábado de Caraguá. Se a loja não abre, **remover** a linha.
- GA e pixel das duas — o cliente envia depois.
- A ficha do Google Business de Caraguá ainda mostra o telefone antigo; o
  cliente vai atualizar. Endereço, telefone e horário têm que bater exatamente.

---

## [0.2.0] — 2026-09-08

### Fase 3 — Camada de config por unidade

A camada que faz um código gerar dois sites.

**Entrou**

- `config/tipos.ts` — o contrato. Campo faltando quebra o **build**, não o site.
- `config/sjc.ts` e `config/caragua.ts` — dados e composição de cada unidade.
- `config/derivados.ts` — o que se calcula dos dados: `tel:`, `wa.me`, endereço
  em uma linha. Único ponto de import dos componentes.
- `config/unidade.d.ts` — o tipo do módulo `@unidade`, para o editor.
- Seleção por `UNIDADE` no build, com alias `@unidade` em `vite.config.ts`.
- Scripts: `dev:caragua`, `build:sjc`, `build:caragua`, `deploy:sjc`,
  `deploy:caragua`, `pendencias`.
- `config/verificar-pendencias.mjs` — trava de deploy: recusa publicar com dado
  não confirmado pela loja. Escotilha explícita em `DEPLOY_COM_PENDENCIAS=1`.
- `tests/unidade-cruzada.test.mjs` — constrói as **duas** unidades de verdade e
  vasculha todo o texto de `dist/`.
- `docs/unidades.md` — o que cada campo faz e onde aparece.

**Saiu**

- `app/dados-unidade.ts`, absorvido por `config/`. Era módulo de transição e
  cumpriu o que prometia: a Fase 3 foi renomear e tipar, não reescrever.

**Três bugs que o teste de cidade cruzada pegou na primeira execução**

1. O `paths` do `tsconfig.json` vencia o alias do Vite, e **os dois builds
   saíam com o config de SJC dentro** — inclusive o de Caraguá. Nenhum erro,
   build passando. Só o teste pegou.
2. O `meta description` de `app/layout.tsx` tinha a cidade escrita à mão: o site
   de Caraguá iria ao ar descrito como "Dalmóbile São José dos Campos". É
   exatamente o erro que derrubou o site anterior.
3. Um **comentário** dos arquivos de config citava a cidade proibida e
   sobrevivia no bundle do servidor. Nem em comentário.

**Dados recebidos**

- Caraguatatuba: endereço (Av. Espírito Santo, 58 — Jardim Primavera,
  11660-660) e telefone (12) 98270-3186.

**Pendente** — `npm run pendencias` lista o estado atual

- SJC: WhatsApp, horário de sábado, mapa, ficha do Google Business
- Caraguá: horários, mapa, ficha do Google Business, e se o telefone é também
  o WhatsApp
- As duas: GA e pixel

**Correções de infraestrutura**

- `tsconfig.json` deixou de checar `Dir Base/` (código de outro projeto) e
  `dist/`. O `tsc` agora passa limpo.
- `@cloudflare/workers-types` adicionado: `Fetcher` em `worker/index.ts` não
  tinha tipo.

---

## [0.1.0] — 2026-09-08

Primeira publicação do repositório no GitHub. Reúne as Fases 1 e 2, que foram
construídas antes de o repositório existir e por isso não têm commit próprio.

### Infraestrutura

- `.gitignore` criado. `node_modules` e `dist` são links simbólicos para
  `~/.cache/dalmobile-build/` e nunca são versionados — a entrada precisa ser
  `node_modules` **sem barra final**, porque padrão com barra não casa com link
  simbólico. `Dir Base/` (referência do site antigo) fica fora do repositório.
- `docs/direcao-site.md` e `docs/prompts-construcao.md` movidos da raiz para
  `docs/`, onde o `README.md` e o `docs/decisoes.md` já os referenciavam.

---

### Fase 2 — Layout base

Cabeçalho, rodapé e as três superfícies. Ainda sem rotas.

**Entrou**

- `components/layout/Header.tsx` — lockup da marca com nome da unidade, itens de
  menu e ação de contato. A navegação horizontal só existe a partir de 1025px.
- `components/layout/MobileMenu.tsx` — painel de tela cheia com handler de
  verdade: fecha com `Esc`, prende o foco dentro do painel enquanto aberto e
  devolve o foco ao gatilho ao fechar.
- `components/layout/Footer.tsx` — quatro colunas no desktop, dados da unidade,
  link para a outra loja, políticas. É mapa do site, não assinatura.
- `components/layout/Brand.tsx` e `components/layout/Section.tsx` — `Section`
  exige a prop `superficie` (`"preto" | "cinza" | "papel"`), sem padrão, para
  que a escolha de fundo seja sempre deliberada.
- `components/icons/index.tsx` — SVG inline escritos à mão, sem biblioteca.
- `app/dados-unidade.ts` — módulo de transição com endereço, telefone e horário
  até a camada de config chegar na Fase 3.
- `:focus-visible` visível em todo elemento focável.
- `app/teste-layout/` — página temporária que renderiza os componentes nas três
  superfícies, para revisão. **Sai na Fase 3.**

**Decisões registradas** em [`docs/decisoes.md`](docs/decisoes.md): o menu de
tablet é o painel de tela cheia e não a barra horizontal; os dados da unidade
vivem num módulo próprio desde já; o estilo é CSS Modules, um arquivo por
componente.

---

### Fase 1 — Limpeza e design system

**Saiu** — conforme a seção "Não adicionar" do `CLAUDE.md`:

- `components/ui/` inteiro (60 componentes shadcn, nenhum importado)
- `drizzle-orm`, `drizzle-kit`, `db/`, `drizzle/`, `examples/`,
  `drizzle.config.ts` — o site não tem banco
- `app/chatgpt-auth.ts` — o site não tem login
- Tailwind, `vendor/shadcn-tailwind-*.css` e os `@import` do `globals.css`
- `recharts`, `embla-carousel`, `react-day-picker`, `date-fns`, `cmdk`, `vaul`,
  `sonner`, `react-hook-form`, `zod`, `next-themes`, `input-otp`,
  `react-resizable-panels`, `lucide-react`
- `public/globe.svg`, `window.svg`, `file.svg`
- O acoplamento ao OpenAI Sites: `.openai/hosting.json`, `scripts/` e
  `build/sites-vite-plugin.ts`

**Entrou**

- `app/tokens.css` — o design system extraído do estudo *03 Síntese*, em duas
  camadas: os valores brutos (`--c-*`) e os nomes semânticos (`--preto`,
  `--cinza`, `--papel`…). **Único arquivo do projeto com valor de cor literal**,
  hoje 12 deles. Componente só fala com a camada semântica, então trocar a
  paleta é trocar onze linhas.
- Krub self-hosted via `@fontsource/krub`, pesos 300, 400 e 600, com a stack de
  fallback obrigatória.
- `docs/design-system.md` — tokens, escala e exemplos de uso.
- `tests/` — 12 testes que policiam as regras que são fáceis de quebrar sem
  perceber: cor literal fora dos tokens, `100vh`, pesos da Krub, CTA sem destino
  real, dado de unidade escrito dentro de componente, cabeçalho de comentário em
  todo componente.

**Verificado, e o que se descobriu**

- O binding `env.IMAGES` **não existe** em ambiente nenhum: a rota
  `/_vinext/image` lançaria em produção hoje. Não se percebeu antes porque a
  página de estudos usa `<img src>` puro. As variações de imagem passam a ser
  geradas no build com `sharp`, decisão registrada em `docs/decisoes.md`.
- Um teste do template exigia uma `<meta name="codex-preview">` que não existe
  neste repositório e nunca poderia passar. Foi substituído, não remendado.

**Pendente de propósito**

- A paleta em `app/tokens.css` é a **quente do estudo**, não a acromática do
  `CLAUDE.md`. As cores definitivas ainda não foram fechadas com a loja.
- Os tokens `--veu-*` e as regras de véu sobre foto continuam no código,
  marcados para morrer junto com a página de estudos. Escurecer foto é proibido.
- `sharp` e o passo de build de imagem entram na Fase 4, com as fotos de verdade.
- O peso `300-italic` da Krub é carregado só para a página de estudos
  (`.manifesto-copy em`, `.synthesis-hero-panel h1 em`). **Sai junto com ela**,
  a menos que o itálico apareça no desenho definitivo.
