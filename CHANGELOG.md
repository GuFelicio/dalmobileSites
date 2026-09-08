# Changelog

O que mudou em cada entrega. Uma entrada por fase do
[`docs/prompts-construcao.md`](docs/prompts-construcao.md).

Formato: mais recente primeiro. Cada entrada diz o que entrou, o que saiu e o
que ficou pendente de propósito — pendência sem registro vira dívida silenciosa.

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
