# Changelog

O que mudou em cada entrega. Uma entrada por fase do
[`docs/prompts-construcao.md`](docs/prompts-construcao.md).

Formato: mais recente primeiro. Cada entrada diz o que entrou, o que saiu e o
que ficou pendente de propósito — pendência sem registro vira dívida silenciosa.

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
