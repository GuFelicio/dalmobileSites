# Changelog

O que mudou em cada entrega. Uma entrada por fase do
[`docs/prompts-construcao.md`](docs/prompts-construcao.md).

Formato: mais recente primeiro. Cada entrada diz o que entrou, o que saiu e o
que ficou pendente de propósito — pendência sem registro vira dívida silenciosa.

---

## [não publicado] — 2026-10-06 · v5: site de uma página

Roteiro e texto: `docs/copy-home-v5.md`. Estado anterior: tag `v4-multipagina`.

### Cor
- `--grafite` de `#262626` para `#363838`, pelo token: seções escuras, a
  espera do vídeo e o destaque do 404 (que usava a tinta como fundo). Todo
  fundo escuro computado é `rgb(54, 56, 56)`.
- Rodapé de Caraguatatuba no cinza `#9E9C94`, igual ao de SJC (era `#FFF4EB`).
  A paleta palha ficou só com o apoio e o fio sobre papel.

### Rotas
- Saem `/ambientes`, `/ambientes/[slug]`, `/a-dalmobile`, `/arquitetos`,
  `/a-loja`, `/projetos` e `/projetos/[slug]`. Ficam `/` e `/privacidade`.
- 301: `/ambientes` e `/ambientes/*` → `/#projetos` · `/projetos` e
  `/projetos/*` → `/#projetos` · `/a-dalmobile` → `/#a-dalmobile` ·
  `/arquitetos` → `/#arquitetos` · `/a-loja` → `/#a-loja`.
- Sitemap só com `/` (com as fotos do carrossel) e `/privacidade`.
- O schema `LocalBusiness` foi de `/a-loja` para a home.

### Menu e âncoras
- Projetos · A Dalmóbile · Para arquitetos · A loja, como `/#id`, em `<a>`
  (o `<Link>` do vinext não rola até a âncora na própria home). Rolagem suave
  do CSS, sem ela com movimento reduzido; `scroll-margin-top` de 88px em cada
  seção. No menu mobile, o item fecha o painel e rola; o foco volta ao botão
  sem puxar a página (`preventScroll`).

### Home
- Ordem: abertura → manifesto papel (`#inicio`) → projetos grafite
  (`#projetos`) → fábrica papel (`#a-dalmobile`) → **para arquitetos grafite
  (`#arquitetos`, seção nova)** → showroom **papel** (`#a-loja`, era grafite) →
  rodapé cinza.
- Texto novo no manifesto, na fábrica e no showroom; três legendas de SJC
  trocadas ("Bancada branca contínua", "Rack suspenso na parede inteira",
  "Painel amadeirado na parede inteira").
- Saem "Como trabalhamos", "Ver todos os ambientes", os "Ver cozinha", "Ver
  quartos"… de cada foto e "Conheça a Dalmóbile".
- Showroom: endereço (com vírgulas, sem travessão), "Abrir no mapa", horário,
  WhatsApp e a linha da outra loja com link para o outro site.
- O título de "Para arquitetos" usa `clamp(30px, 3.6vw, 52px)`: é uma frase de
  75 caracteres, e com os tamanhos dos outros títulos passaria de 4 linhas.

### Rodapé e /privacidade
- Um rodapé só, na home e em `/privacidade`: marca, endereço, WhatsApp com o
  número, Privacidade e a assinatura.
- `/privacidade`: endereço com vírgulas e "…sobre o projeto, usados só
  para…" (sem travessão); o telefone abre o WhatsApp.
- 404: os caminhos levam a `/#projetos` e `/#a-loja`; "Ver os ambientes" virou
  "Ver projetos", como o menu; a lista de ambientes saiu.

### Saiu do código
- As páginas internas, o texto institucional (`conteudo/institucional/`,
  `lib/institucional.ts`, `lib/texto.ts`) e o campo `textos.descricaoAmbientes`
  do config. `npm run pendencias` não acusa mais nada.

### Testes
- `tests/pagina-unica.test.mjs`: os 301, só `/` e `/privacidade` em 200, o
  menu apontando para seções que existem, nenhum link para rota que saiu.
- Cidade cruzada: a linha da outra loja no showroom é a única menção permitida.
- 62 testes por unidade, todos passando.

---

## 2026-10-05 · v4 aprovada: ajustes finais

Aprovada pelo cliente nos prints da fase 3, com dois ajustes:

- **Marca menor** no cabeçalho, no menu mobile e nos rodapés:
  `clamp(144px, 38vw, 170px)` (era `clamp(168px, 44vw, 200px)`). A linha da
  cidade continua legível; o comentário em `components/layout/Brand.module.css`
  marca 144px como piso.
- **Endereço da loja no rodapé da home:** saiu da seção de contato (onde ficava
  junto do texto) e foi para a barra final, ao lado da marca (embaixo dela no
  celular). O horário continua na seção de contato.
- **Endereço do rodapé da home menor e à direita:** 14px, na ponta oposta à
  marca, em uma linha no desktop; à esquerda no celular, embaixo da marca.
  Única exceção à regra de alinhamento à esquerda (registrada no `CLAUDE.md` e
  em `docs/decisoes.md`).

Conferido de novo: contraste (nada abaixo de 4,5:1), matriz sem rolagem nem
vão acima de 160px, menu (29/29) e 58 testes por unidade.

---

## [não publicado] — 2026-10-05 · v4, fase 3: verificação

Sem funcionalidade nova e **sem deploy**: a aprovação é pelos prints. Resultado
completo em [`docs/verificacao-v4.md`](docs/verificacao-v4.md).

- 72 prints de página inteira (2 sites × 6 larguras × 6 páginas) em
  `prints-v4/`, fora do git.
- Sequência de superfícies listada por página: nenhuma cor repetida em seguida.
- Contraste: nenhum texto abaixo de 4,5:1 (2.502 em SJC, 1.968 em Caraguá).
- Menu: 29 verificações por site, todas passando.
- Checklist de deploy do `CLAUDE.md` marcado, com a exceção da home e o que
  depende do Google Business Profile anotados.
- `docs/decisoes.md`: a entrada da v4 explica por que papel + grafite, por que
  a abertura ficou só com a foto e por que o menu some.

### Corrigido
- `/privacidade` ganhou `og:image` (a capa da home): sem ela, o link
  compartilhado saía sem preview.
- O caminho de navegação das páginas de ambiente ficava desalinhado ("COZINHA"
  acima de "AMBIENTES"); agora centrado.

---

## [não publicado] — 2026-10-05 · v4, fase 2: copy v4

Os dois sites com o texto de `docs/copy-v4.md` (voz da apresentação
institucional). Só texto, metadata e créditos de foto: nenhuma seção nova ou
removida, nenhuma mudança de layout. Vocabulário: `docs/vocabulario.md` v3
("alto padrão" liberado; o `CLAUDE.md` e o `MANUAL.md` deixaram de proibi-lo).

### Texto
- **Home:** rótulo "MÓVEIS PLANEJADOS · [CIDADE]", h1 "Móveis personalizados
  para espaços com identidade" e o parágrafo novo; fábrica com "UMA HISTÓRIA
  EM EVOLUÇÃO" / "Da marcenaria à personalização de alto padrão" e a linha do
  tempo; contato com "Para quem vai viver o ambiente" e as três perguntas.
  Meta description nova nos dois configs.
- **/a-dalmobile:** subtítulo, abertura, produção, a jornada ("Uma jornada
  guiada por decisões claras": Contexto, Criação, Refinamento, Produção,
  Instalação, com a frase de fecho) e "O que pode ser construído sob medida".
  Campos novos no conteúdo: `processoTitulo` e `processoFecho`. Perguntas
  frequentes sem mudança (copy v3). Meta description nova.
- **/arquitetos:** "Para arquitetos e designers", subtítulo novo e os cinco
  blocos com os títulos da apresentação (Autoria preservada, Orçamento de
  escritório, Suporte à especificação, A fábrica, Projeto creditado). Title e
  description novos.
- **Prazo de resposta fora do site:** "Respondemos em até um dia útil" saiu do
  bloco de orçamento de `/arquitetos` e da `/privacidade` (que ganhou nova
  data de atualização) — o cliente informou que o compromisso não existe.
- **/ambientes:** subtítulo "Qual ambiente você quer explorar agora?" e intro
  nova; a contagem de fotos dos cards saiu.
- **Páginas de ambiente:** subtítulo, parágrafo e chamada final novos nos sete
  ambientes de SJC; Caraguá com texto próprio em cozinha, quartos e sala
  (`porUnidade`, agora com `chamadaFinal` também).
- **Títulos sem ponto final** em todo o site, inclusive o 404.

### Créditos
- `PROJETO / NOME` abaixo da legenda, na galeria dos ambientes e no carrossel
  da home, em caixa alta pequena na cor de apoio da superfície. Preenchido pelo
  campo `arquiteto` das fotos: 10 de Débora Toledo (SJC) e 8 de Flávia e Sérgia
  Garrido (Caraguá). Autorização das duas confirmada pelo cliente em 05/10/2026.

### Correção
- A meta description das páginas de ambiente emendava o subtítulo (agora sem
  ponto) na frase seguinte; o gerador põe o ponto quando falta.

### Conferido
- Varredura do HTML dos dois builds: sem garantia, certificado, maresia,
  "6 anos", "[CONFIRMAR", "[CIDADE" ou título terminando em ponto.
- Cada build só com o WhatsApp da própria unidade; teste de cidade cruzada e os
  58 testes de cada unidade passando.
- Diff do texto renderizado, página por página, nos dois sites: só conteúdo.
- Matriz de seis larguras sem rolagem horizontal nem vão acima de 160px;
  contraste sem nada abaixo de 4,5:1.

---

## [não publicado] — 2026-10-05 · v4, fase 1: cores, espaçamento, menu, rodapé e abertura

Roteiro em `docs/prompt-v4.md`. **Nenhum texto mudou** (a copy v4 é a fase 2),
**nenhuma seção mudou de lugar**, exceto a faixa de números de `/a-dalmobile`,
que entrou dentro de "A produção é própria". Estado anterior: tag `v4-antes`.

### Cor
- Paleta nova em `app/tokens.css`: um papel só (`#F6F4F0`), um escuro de seção
  só (grafite `#262626`), cinza `#9E9C94` só no rodapé, areia `#D5C5B1` só em
  rótulo sobre grafite, apoio `#5F5D58`. Saíram `#F9F8F5`, `#F5F4F0`, `#EFEDE7`,
  `#97958F`, `#484B45`, `#111211`, `--sobre-escuro-*`, `--sup-*`, `--veu-*`.
- Regra nova: **seções vizinhas nunca na mesma cor**; sai a de "no máximo
  quatro trocas". Classes globais `.superficie-papel` e `.superficie-grafite`
  publicam `--sup-fg`, `--sup-apoio`, `--sup-rotulo`, `--sup-fio`, `--sup-bg`.
- `Section` aceita `papel | grafite`; a prop `respiro` saiu.
- Rodapé cinza em toda página, texto em tinta — inclusive a barra da home, que
  era preta. Caraguá segue com o rodapé palha.
- Contraste conferido por script: 0 textos abaixo de 4,5:1 nos dois sites
  (a seta desativada do slider dava 3,07 e perdeu a opacidade).

### Abertura da home
- Saiu a faixa de texto abaixo do vídeo (rótulo, "O projeto começa na
  medição.", parágrafo e botão). A abertura é só o vídeo, com no máximo 72svh
  (desktop) e 60svh (celular). O h1 passou a ser "Nenhuma casa é igual à
  planta." — o texto muda na fase 2.

### Espaçamento
- Escala única: `--respiro` 48→72, `--respiro-curto` 24→40, `--entre-itens`
  24→32 (clamp). Cabeçalho de seção 12 / 16 / 24px. Saíram 112, 120, 122, 180
  e `--respiro-longo`.
- Galeria de ambiente: `--entre-itens` entre as fotos, foto com no máximo 85svh
  (encolhe inteira, sem corte).
- Rodapé: padding `--respiro-curto`, duas colunas no celular — de ~1.100 para
  582px de altura em 390px.
- Alturas em 1440px, antes → depois: home 6.116 → 5.171 · /a-dalmobile
  5.458 → 4.945 · cozinha 11.655 → 8.298 · /arquitetos 2.386 → 2.195 ·
  /a-loja 2.041 → 1.771 · /ambientes 1.755 → 1.507.
- Nenhum vão vertical acima de 160px nas seis larguras da matriz, nos dois sites.

### Menu
- O cabeçalho some ao rolar para baixo (depois de 120px) e volta ao rolar para
  cima (mais de 8px), com fio de 1px; só `transform`, 250ms. Não some com o menu
  mobile aberto nem com foco de teclado dentro dele; Tab o traz de volta. Sem
  layout shift, sem dependência, sem transição com movimento reduzido.
- O cabeçalho e o menu mobile são sempre papel; a prop `superficie` do `Header`
  saiu.

### Testes
- Volta o teste "todo var(--x) usado tem definição" (`tests/design-tokens.test.mjs`):
  58 testes por unidade, todos passando.

---

## [não publicado] — 2026-10-02 · copy v3

Os dois sites com o texto da copy v3 (`docs/copy-v3.md`). Só texto, metadata,
dados de config e duas fotos a menos. Regras de palavra: `docs/vocabulario.md`.
A copy de 09/09 (`docs/copy/sjc.md`) virou histórico.

### Texto
- **Home:** dek da abertura, parágrafo de "Como projetamos", selo (FÁBRICA
  PRÓPRIA · 100% MDF · EDIÇÃO MILIMÉTRICA), e a seção da fábrica inteira — novo
  título, novo texto, link "Conheça a Dalmóbile" para `/a-dalmobile`, rótulo da
  foto "O QUE VEM DA FÁBRICA" e a faixa de números 1977 · 2 · 100%.
- **Ambientes:** textos novos de cozinha, home office, banheiro, espaço gourmet,
  quartos e sala; Caraguatatuba com texto **próprio** em quartos e sala (novo
  campo `porUnidade`). 19 legendas trocadas (14 de SJC, 5 de Caraguá).
- **/a-dalmobile:** abertura, fábrica, processo, materiais (com "Personalizar não
  é adaptar."), números e FAQ na ordem da copy; pergunta de área própria de
  cada site; Caraguá ganha "Não moro em Caraguatatuba…". O fecho da copy (A7),
  que citava as duas cidades nos dois sites, **não entrou** por decisão do
  cliente: a faixa do fim fica só com o botão do showroom.
- **/arquitetos:** os 5 blocos da copy viraram uma lista de uma coluna, na
  medida do texto. A grade 2×2 terminaria com um bloco sozinho (2+2+1).
- **Carrossel da home:** a sobra de fotos (quando o acervo não é múltiplo de 3)
  vira o último conjunto, mais curto, em vez de engordar o anterior — o que
  deixava um vão vazio embaixo de todos os outros conjuntos.
- **/arquitetos:** abertura e blocos novos ("O que dá para especificar", "A
  fábrica", crédito no formato do Dalmóbile Reconhece); saiu "Visita à fábrica".
- **/a-loja:** texto novo, endereço no formato da copy, uma linha de WhatsApp
  com o número (telefone e WhatsApp são o mesmo), faixa da outra loja com a
  região.
- **Metadata:** title e description de home, hub, ambientes, `/a-dalmobile`,
  `/arquitetos` e `/a-loja` conforme a copy.

### Saiu do site inteiro
Garantia (seção, pergunta, número "6 anos", selo e meta descriptions), prazo, a
pergunta "O projeto tem custo?" e o texto sobre marca do grupo. Varredura nos
dois builds: zero ocorrência de garantia, certificado, maresia, "mar", sob
medida, madeira maciça, transform, sonho, exclusiv, sofistica, alto padrão,
grátis, gratuito, "6 anos", [CONFIRMAR e [CIDADE.

### Dados e fotos
- **Caraguatatuba com o próprio número:** (12) 99602-1234, `wa.me/5512996021234`.
  Cada build só contém o número da sua unidade.
- **Fotos sem móvel Dalmóbile, fora:** o nicho de mármore (SJC, banheiro) e o
  lavabo de pedra (Caraguá, banheiro). Os arquivos continuam em `public/fotos/`.
- **Caraguá sem banheiro:** sai do hub, de "Outros ambientes", de "Antes de vir"
  e do sitemap; `/ambientes/banheiro` responde 301 para `/ambientes`. O hub de
  Caraguá fica em 3 colunas iguais no desktop.
- **Pendências com a loja:** de 4 para 1 (só a foto da fábrica).
- `docs/direcao-site.md`: o edifício Calabassas é em Caraguatatuba.

### Código
`config/tipos.ts` ganhou `regiao`, `outraUnidade.regiao` e `textos`;
`lib/texto.ts`, `{{regiao}}` e `{{outraRegiao}}`; o conteúdo de ambiente,
`porUnidade` e `nomeNoTitulo`; o FAQ, `unidades`. Redirect 301 no Worker para
ambiente que a unidade não publica. A allowlist do teste de cidade cruzada tem
só as três menções permitidas: rodapé, pergunta de área do FAQ e faixa de
`/a-loja`.

### Verificado
57/57 testes nas duas unidades; build dos dois alvos; `workerd` com todas as
rotas em 200 (e o 301); seis larguras sem rolagem horizontal nas páginas que
mudaram; maior linha 66 caracteres.

---

## [não publicado] — 2026-10-02 · sem endereços de preview

- `preview_urls: false` na configuração do Worker (`vite.config.ts`). Os
  endereços `*.workers.dev` de preview deixam de responder — entre eles os da V2
  descartada (`v2-layout-dalmobilesjc…` e `v2-layout-dalmobilecaragua…`). Os
  sites de produção não mudam.
- A tag `v1-layout` foi apagada, a pedido do cliente.

---

## [não publicado] — 2026-10-02 · o fim da home

- A home termina numa **barra preta só com a marca da unidade**, logo depois da
  seção da loja (endereço, horário e WhatsApp). Antes ela terminava sem rodapé
  nenhum. Decisão do cliente: os dados já estão na seção da loja, e um rodapé
  completo os repetiria. As páginas internas seguem com o rodapé completo.

---

## [não publicado] — 2026-10-02 · ajustes de layout, fase 2: subtrações e ritmo

Sobre a V1. Estrutura, splits, carrossel, tipografia e cores ficam como estão.
**Nenhum texto mudou:** o diff do texto renderizado das 8 páginas, nas duas
unidades, só mostra o número saindo dos rótulos e a seta saindo dos links dos
cards. **Nenhuma cor mudou de valor:** `tokens.css` só ganhou nomes.

### Saiu
- Os números dos rótulos de seção da home: "01 — COMO PROJETAMOS" virou
  "COMO PROJETAMOS", e assim os outros dois. Tamanho, tracking e posição iguais.
- As setas ↗ dos links dos cards do carrossel. Fica no máximo uma por seção.
- O cartão sobre o vídeo da abertura e o gradiente do topo. O vídeo entra
  inteiro (16:9, de ponta a ponta), sem nada por cima; rótulo, título, dek e
  link passam para uma faixa em papel logo abaixo, com os mesmos tamanhos e a
  mesma ordem, e emendam na seção seguinte. Saiu junto o fio solto do canto do
  cartão. O cabeçalho da home fica em papel sólido, acima do vídeo.
- O título em branco sobre a foto do primeiro card do carrossel, e o véu dele.
  A legenda fica embaixo, como nos outros cards.
- A legenda "O que vem por escrito", que ficava sobre a foto da seção da
  fábrica: foi para baixo da foto, na própria faixa oliva.

### Ajustado
- **Três respiros** (`--respiro-curto` 56/40, `--respiro` 120/72,
  `--respiro-longo` 180/96), os três em uso. O 112px e o 122px da home saíram.
  O longo vem antes da faixa de projetos da home e antes da troca de
  superfície de `/a-dalmobile`; nunca dois seguidos.
- **Seções seguidas na mesma superfície dividem o respiro** (`Section`): o vão
  de ~250px entre a introdução e "Como funciona a parceria" de `/arquitetos`
  virou 120px, e o mesmo nas outras internas.
- **Réguas na largura do texto:** processo e FAQ de `/a-dalmobile`; em
  `/arquitetos`, a grade 2×2 na largura de duas colunas de texto.
- **`/ambientes` sem vão.** SJC: o primeiro ambiente em duas colunas, 16:9 no
  desktop — 2+1+1 / 1+1+1+1. Caraguá não muda no desktop; no tablet, o último
  card estica para fechar a linha (era 3+1 com vão). As colunas são calculadas,
  e a grade continua sem vão se o número de ambientes mudar.
- **A faixa de três números de `/a-dalmobile`** sem vão no tablet.
- **Dek de página** em 20px, na cor de apoio.
- `--mov-fio` de 200 para 150ms.

### Documentado
- As cinco superfícies em uso com nome (`--sup-preto`, `--sup-papel`,
  `--sup-papel-baixo`, `--sup-oliva`, `--sup-cinza`) em `tokens.css`, e a tabela
  no `CLAUDE.md`. As internas usam ainda o papel `#F5F4F0`.

### Verificado — as duas unidades, 7 páginas, 6 larguras
Cabeçalho legível (mínimo 14,7:1); menu mobile abre, prende o foco e fecha com
Esc; nenhum alvo abaixo de 44px; 935 focos com contorno; nenhum rótulo numerado;
no máximo uma seta por seção; vídeo de abertura inteiro em toda largura;
nenhum texto sobre foto ou vídeo; três respiros, nenhum longo seguido; maior
linha 66 caracteres; nenhuma régua mais larga que o texto; nenhuma grade com
vão; nenhuma rolagem horizontal. 57/57 testes; `workerd` com todas as rotas em
200. Prints de página inteira: 6 páginas × 6 larguras × 2 unidades.

---

## [não publicado] — 2026-10-02 · ajustes de layout, fase 1: defeitos

Sobre a V1. Nenhuma mudança de layout, nenhuma cor da paleta alterada (o diff
de `tokens.css` só acrescenta os dois fios do cabeçalho, que são cores da
paleta com transparência), nenhum texto alterado.

- **Cabeçalho:** sobre papel, fundo da própria superfície da página e fio da
  tinta a 12%; sobre preto, texto em papel `#F9F8F5` e fio do papel a 14%.
  Transparente só sobre a abertura da home, até 80px. Menor contraste medido
  nas internas: 14,7:1 (era 1,16:1).
- **Menu mobile:** botão de abrir e de fechar com 48px; itens em 32px peso 300.
- **Alvos de toque:** nenhum abaixo de 44px. Os links de texto da home ganharam
  área de toque invisível de 44px (o desenho do link e do fio não mudou); o
  "A loja" do rodapé ganhou largura mínima; o caminho de navegação da página
  de ambiente, altura mínima.
- **Foco visível:** 935 focos percorridos por Tab, todos com contorno. O mapa
  de `/a-loja` saiu da ordem do Tab — o foco entrava no Google Maps sem
  contorno nenhum; o link "Abrir no mapa", logo acima, leva ao mesmo lugar.

Verificado nas duas unidades, nas seis larguras, sem rolagem horizontal.
57/57 testes.

---

## [não publicado] — 2026-10-02 · ajustes na V1

A V2 de layout foi descartada pelo cliente (fica só a tag `v2-arquivo`, fora
de uso). Destes ajustes, todos sobre a V1, nenhum muda o desenho das seções:

- **Cabeçalho legível nas páginas internas.** Ele era transparente até rolar, e
  o texto escuro ficava sobre o body preto (1,16:1). Agora tem o fundo sólido
  da superfície desde o topo. Na home continua transparente sobre o vídeo e
  fica sólido depois de 80px de rolagem.
- **A home tem menu no celular.** O cabeçalho próprio da home escondia a
  navegação e deixava só o WhatsApp de 42px. Ela passou a usar o `Header`
  comum, com o painel de tela cheia, foco preso e Esc. O foco volta ao botão
  ao fechar o menu.
- **Medida de leitura de no máximo 66 caracteres.** `--medida` de `64ch` (77
  caracteres medidos) para `34em`; os parágrafos da home com largura fixa em px
  passaram a usar o token.
- **`CLAUDE.md` com as cores que estão no ar**, por decisão do cliente. Nenhuma
  cor do site mudou.

---

## [não publicado] — 2026-10-01 · vídeo na capa

### O vídeo vai para o fundo da capa; a seção 01 volta

Vale para os dois sites.

- O **fundo da capa** passou a ser o vídeo em loop (`autoplay`, mudo, `cover`,
  poster `hero-loop-poster.jpg`, `aria-hidden`), no lugar da foto
  `casa-completa.webp`. O painel da capa não mudou.
- O véu `.synthesis-shade`, que escurecia a imagem inteira, saiu. Ficou só um
  gradiente no topo (token novo `--degrade-cabecalho`) para o cabeçalho.
- Com `prefers-reduced-motion`, o vídeo para no poster.
- A **faixa de vídeo separada saiu** (com `VideoEmLoop.module.css`), e a seção
  **"01 — Como projetamos" voltou** como era, com a numeração 01/02/03.

Por que e o que foi descartado: `docs/decisoes.md`, primeira entrada de
2026-10-01.

---

## [não publicado] — 2026-10-01

### Vídeo em loop no lugar da seção "01 — Como projetamos"

Vale para os dois sites (o `app/page.tsx` é o mesmo).

**Saiu** a seção do manifesto da home: rótulo "01 — Como projetamos", H2
"Nenhuma casa é igual à planta.", o parágrafo sobre a medição no imóvel, o link
"Como trabalhamos" (→ `/a-dalmobile`) e a foto com a legenda "Fábrica própria ·
100% MDF · 6 anos de garantia". O CSS `.synthesis-manifesto*` saiu junto.

**Entrou** `components/midia/VideoEmLoop.tsx`: vídeo largura total, sem som e
sem controle, que toca quando entra na tela e pausa quando sai. Com
`prefers-reduced-motion`, só o poster. Arquivos em `public/videos/`:
`hero-loop.webm` (4,4 MB, VP9), `hero-loop.mp4` (7,6 MB, H.264, fallback) e
`hero-loop-poster.jpg`.

As seções seguintes foram renumeradas: "01 — Projetos executados" e "02 — Da
fábrica à montagem". A capa e o H1 não mudaram.

Por que e o que foi descartado: `docs/decisoes.md`, entrada de 2026-10-01.
## [não publicado] — 2026-10-01 · testes por unidade

### A suíte passa a testar Caraguá de verdade

**O problema.** Rodada sobre o build de Caraguá, a suíte reprovava em 9 de 57
testes sem haver erro no site. `seo.test.mjs` e `layout.test.mjs` importavam
`config/sjc.ts` fixo (cobravam cidade, domínio, endereço e schema de SJC), e
`unidade-cruzada.test.mjs` deduzia a unidade procurando o domínio de SJC em
qualquer lugar do HTML — que em Caraguá aparece no link do rodapé para a loja
irmã. O lado perigoso: **um erro real em Caraguá passaria**, porque o teste de
cidade cruzada procurava "Caraguatatuba" no site de Caraguá.

**A correção.**
- `tests/unidade-do-build.mjs`: descobre a unidade do build pelo
  `<link rel="canonical">` da home e expõe o `renderizar` que os três arquivos
  repetiam.
- `seo`, `layout` e `unidade-cruzada` usam esse ajudante.
- O teste "nenhum dado de unidade escrito em componente" passou a proibir cidade
  e rua das duas unidades, lidas do config (só tinha a rua de SJC).
- `npm test` = `test:sjc` + `test:caragua`: builda e testa as duas unidades.

**Verificado.** 57/57 em SJC e 57/57 em Caraguá. E a prova de que o teste
morde: com "São José dos Campos" plantado no H1, o build de Caraguá reprova em
dois testes de cidade cruzada.

---

## [1.0.0-rc4] — 2026-09-16

### `MANUAL.md`: um documento de entrada que se basta

Escrito para ser lido por uma IA que não conhece o projeto — cole o arquivo e
ela entende o que é o site e como fazer as tarefas do dia a dia. Uma pessoa lê
só a seção da sua tarefa.

Cobre: o que é o projeto e a regra que explica quase todas as decisões; como
rodar; todas as rotas; onde fica cada coisa; as três regras de arquitetura que
não podem ser quebradas; publicar fotos; mudar texto; mudar dado da loja; o
estado de hoje com as pendências; publicação; o que cada teste protege; o
design fechado; e um mapa dos outros documentos.

**Todos os números do manual foram medidos, não estimados** — 57 testes, 88 KB
gzip na home, 4 pendências, 7 ambientes — e reconferidos depois de escrito.

A última seção é dirigida a IAs, com as quatro coisas que este projeto aprendeu
do jeito difícil: a suíte verde não significa que sobe; teste que trava valor
quebra quando o código fica certo; nenhum número vai ao ar sem confirmação da
loja; e verifique antes de afirmar.

### Organização

- `copy-site-dalmobile-sjc.md` saiu da raiz para **`docs/copy/sjc.md`**, com as
  6 referências atualizadas. `docs/copy/LEIA-ME.md` explica a relação entre a
  copy aprovada e o que está no ar — e avisa que quem escrever a de Caraguá
  **não escreve nome de cidade**, escreve `{{cidade}}`.
- `README.md` e `CLAUDE.md` passaram a apontar para o manual logo no topo.

A raiz ficou só com `MANUAL.md`, `README.md`, `CLAUDE.md`, `CHANGELOG.md` e os
arquivos de configuração.

---

## [não publicado] — 2026-09-14

### Estudo de cena 3D: construído e descartado no mesmo dia

O protótipo em `/laboratorio` com three.js foi **rejeitado e removido**. Fica o
registro, porque a razão é útil para a próxima tentativa.

**Por que falhou.** Geometria procedural sem textura produz placas planas e
cores chapadas — aparência de amostruário técnico, não de marcenaria. Era o
resultado inevitável da técnica, não um problema de ajuste.

**O que a investigação da referência revelou.** O site tomado como referência
(costaflores.com.br) **não usa 3D em tempo real**: é WordPress + Elementor
servindo **vídeos MP4 renderizados** com um efeito de escala no scroll. Zero
`three`, zero `.glb`, zero `gsap` no HTML. A qualidade cinematográfica vem de
renderização offline — o caminho do WebGL estava errado desde o início.

**Removido:** `app/laboratorio/`, `components/midia/CenaMateriais.*`,
`components/midia/materiais.ts`, `tests/laboratorio.test.mjs`, e as
dependências `three` e `@types/three`. A home voltou a **88 KB gzip** e o
build inteiro a 92 KB (era 274 KB com o three).

A animação passou a ser produzida fora deste repositório.

---

## [1.0.0-rc3] — 2026-09-14

### Capa nova, telefone unificado e a rota de teste fora do ar

- **Capa da home trocada.** Foto nova de `casaCompleta.jpg` — sala com painel
  de madeira do chão ao teto e forro iluminado. O `alt` foi reescrito junto:
  o anterior descrevia a foto antiga (jantar e gourmet integrados), e teria
  ficado descrevendo uma imagem que não estava mais lá.
- **Um telefone só, nas duas lojas:** `(12) 99604-9888`, o mesmo do WhatsApp.
  Saíram o fixo de SJC e o celular de Caraguá. Resolve a divergência que a
  copy apontou — o site mostrava dois números diferentes.
- **`/teste-layout` foi removida.** Estava **no ar respondendo 200** desde a
  Fase 2, sem link nenhum apontando para ela. O checklist do `CLAUDE.md`
  proíbe rota de teste no build. Os testes de layout passaram a usar
  `/ambientes`, que é página de verdade, e um teste novo falha se
  `/teste-layout`, `/teste`, `/debug` ou `/preview` voltarem a responder.
- **O teste do rodapé travava o telefone antigo** em vez de ler o config, e
  quebrou no dia em que a loja unificou o número — ou seja, por estar certo.
  Agora confere a regra: endereço, telefone e horários vêm do config.

A suíte foi para **57**.

**Não resolvido:** o horário não pôde ser conferido contra o Google Meu
Negócio — o Maps só monta a ficha com JavaScript. Ver `docs/pendencias.md`.

---

## [1.0.0-rc2] — 2026-09-14

### A copy revisada entrou no site inteiro

Aplicado `docs/copy/sjc.md`. **As pendências caíram de 18 para 4.**

**Correções de fato, não de estilo**

- **A fábrica não é local.** O texto no ar dizia que *"quem desenha o seu
  armário trabalha no mesmo lugar em que ele é cortado"* — descrição de uma
  marcenaria de bairro. A produção é da indústria da marca, em **Bento
  Gonçalves**, com duas unidades fabris. O argumento fica mais forte, não mais
  fraco: repetibilidade e uma garantia que alguém tem tamanho para honrar.
- **"47 anos" estava errado** — 1977 dá 49 em 2026. Trocado pelo **ano**, que
  é verificável e não envelhece.
- **"500+ acessórios exclusivos" saiu**: sem fonte, e linguagem de catálogo de
  fornecedor.
- **A garantia de 6 anos entrou na página institucional.** A home anunciava
  "6 anos" e `/a-dalmobile` se recusava a dar o número — duas páginas do mesmo
  site dizendo coisas diferentes.
- **Cozinha:** o subtítulo e o fim do parágrafo eram a mesma frase invertida.
- **Sala de estar:** o texto era todo sobre painel de TV, e metade das fotos é
  mesa de jantar e estante. O texto prometia uma galeria que não era aquela.
- **`/arquitetos`** dizia *"todo projeto publicado credita o arquiteto"* — e
  nenhum credita, porque não há cases. Virou compromisso, não descrição.
- **O menu da home** levava a âncoras: quem entrava pela home nunca descobria
  `/a-dalmobile` nem `/arquitetos`. Agora são rotas, vindas do config.
- **"no seu apartamento" saiu** das sete chamadas finais — exclui casa, que é
  metade do portfólio. Cada ambiente ganhou a sua pergunta: sete páginas na
  mesma fôrma é padrão de texto gerado.

**Uma armadilha que quase foi ao ar**

A copy traz *"Loja em São José dos Campos"* como subtítulo de `/a-dalmobile` —
e o arquivo institucional é **um só para os dois sites**. Escrito assim, o site
de Caraguatatuba iria ao ar com a cidade errada na segunda linha. `lib/texto.ts`
substitui `{{cidade}}` e `{{outraCidade}}` por unidade.

**O teste de cidade cruzada foi reescrito**

A copy nomeia a loja irmã de propósito, o que reverte a decisão de 08/09. A
proibição deixou de ser "a string não existe" e passou a ser: **banimento
absoluto** em `<title>`, description, OpenGraph, canônico, `<h1>`, schema e
sitemap; **no corpo, só menção declarada**. O teste agora renderiza as sete
páginas em vez de varrer arquivos de `dist/` — verificado das duas formas.

---

## [1.0.0-rc] — 2026-09-09

### Fase 9 — verificação cruzada e documentação completa

**As nove fases estão construídas.** O que falta para publicar não é código.

**Verificação cruzada, nos dois builds**

| | SJC | Caraguá |
|---|---|---|
| Cidade da outra unidade em `dist/` | **0** | **0** |
| Paleta | neutra | palha |
| URLs no sitemap | 13 | 10 |
| Fotos no sitemap | 36 | 9 |

**`docs/decisoes.md` completo** — 33 entradas. Entraram as seis de fundação que
a Fase 9 exigia e que existiam só no `CLAUDE.md`, nunca como decisão registrada:
um repositório para dois sites, sem CMS, sem blog na v1, Krub e só Krub, sem
cor de acento, e a foto que nunca é escurecida. Cada uma com o porquê e o que
foi descartado — o log existe para ninguém as desfazer de boa-fé.

**`README.md` completo** — como rodar cada unidade, como o conteúdo funciona,
a tabela de comando por projeto do Workers Builds, e a seção de verificação em
`workerd` com o laço de `curl` pronto.

**Responsividade** confirmada pelo cliente nas seis larguras, nos dois sites.

---

## [0.9.0] — 2026-09-09

### Fase 8 — o site existe para o Google

**Entrou**

- **`app/sitemap.ts`** — gerado do config e do conteúdo. Cada build produz o
  seu: o sitemap de Caraguá tem 10 URLs e não cita SJC em lugar nenhum.
  As fotos de cada ambiente entram como `<image:image>` — o site é 90% imagem,
  e a busca por imagem é porta de entrada que a concorrência não trabalha.
  `/projetos` **não entra** enquanto estiver sem conteúdo: sitemap apontando
  para índice vazio ensina o Google que o site tem página fraca.
- **`app/robots.ts`** — aponta para o sitemap da unidade e bloqueia
  `/_vinext/` e, enquanto dormente, `/projetos`.
- **`lib/seo.ts`** — monta OpenGraph, Twitter Card e link canônico num lugar
  só, para nenhuma página repetir a conta e nenhuma esquecer.
- **OpenGraph em todas as páginas indexáveis.** Antes existia só nas de
  ambiente: home, `/a-loja` e as institucionais iam para o WhatsApp como um
  retângulo cinza.
- **Link canônico** em toda página, com o domínio da unidade.
- 7 testes novos. A suíte foi para **55**.

**Verificado**

Nos dois builds e em `workerd`: 9 rotas em 200, `/nao-existe` em 404, o
sitemap de Caraguá sem nenhuma menção a SJC, e o schema `LocalBusiness` com
endereço, telefone e horário saindo do config.

**Não feito, e por quê**

O item 6 da fase pede **redirects das URLs indexadas dos sites antigos**. Não
temos essa lista. Registrado em `docs/pendencias.md` com o caminho para
levantá-la no Search Console.

---

## [0.8.0] — 2026-09-09

### Caraguatatuba ganhou paleta própria: areia no lugar do cinza

Só a **família do cinza** muda — painel do hero, faixas, rodapé e tiras de
chamada. Preto, papel e branco são os mesmos nos dois sites, e **nenhum
componente foi tocado**: os nomes semânticos não mudaram.

- `app/tokens.css` ganhou `:root[data-paleta="palha"]` com quatro valores.
  Continua sendo o único arquivo do projeto com cor literal.

  A família inteira usa **`#fff4eb`**: painel do hero, faixas, rodapé e tiras
  de chamada. 14,93:1 com a tinta por cima.

  **A separação passou a ser por fio, não por contraste de fundo** — que é o
  que o `CLAUDE.md` prescreve: *"separação por fio de 1px e por espaço, zero
  sombra"*. A faixa quase branca separa do papel em apenas **1,02** e sozinha
  sumiria dentro da página; é o fio que a torna uma faixa. Token novo,
  `--fio-sup`: **transparente** na paleta neutra, onde o cinza já separa em
  2,52 e o fio seria ruído; **`#cdb49a`** na palha, com peso calibrado no fio
  da paleta neutra (1,80 contra a sua superfície; este tem 1,83).
- `config/tipos.ts` ganhou `paleta: "neutra" | "palha"`. O config escolhe
  **pelo nome** — o hex nunca sai de `tokens.css`.
- O `<html>` carrega `data-paleta`, vindo do config da unidade.
- Teste novo: a variante existe em `tokens.css` e as duas unidades a declaram.
  A suíte foi para **48**.

**Contraste medido, e uma correção do que eu havia afirmado.** Eu disse que o
painel do hero usava texto branco e reprovava com 3,00:1. Estava errado: ele
herda texto escuro de `.site-synthesis`, e passa com 5,40:1. Sobre a palha vai
para **9,33:1**. O texto de apoio sobre papel foi de 6,02 para 6,42.

Verificado nos dois builds e em `workerd`: `<html data-paleta="palha">` e a
regra no CSS servido.

---

## [0.7.2] — 2026-09-09

### O slider voltou à composição do estudo

A primeira versão virou uma tira de cards iguais de 3:2 — ficou grosseira e
perdeu o desenho aprovado.

Agora cada passo do slider é a **composição original**: a foto grande com o
título por cima e o par de fotos abaixo. O que muda é que o conjunto se repete
para o lado, com o resto do acervo na mesma forma. A aparência vem das classes
`synthesis-project*` do `globals.css`, que é o desenho que o cliente aprovou —
o componente só as agrupa de três em três e faz rolar.

**As fotos passaram a ser intercaladas entre os ambientes.** Não é enfeite:
agrupadas por ambiente, os quatro primeiros conjuntos de SJC seriam só cozinha.
Intercalando, cada conjunto mostra cozinha, quarto e sala — que é o que faz
querer passar para o lado. A ordem de entrada continua a editorial de
`lib/ambientes.ts`, então a primeira foto do site é sempre a da cozinha.

12 conjuntos em SJC, 3 em Caraguá. Um contador "1 de 12" diz onde a pessoa
está, em vez de bolinhas — com doze conjuntos, um ponto por conjunto viraria
ruído. Uma sobra de uma ou duas fotos volta para o conjunto anterior, para não
existir passo capenga.

Verificado em `workerd`, não só em Node.

---

## [0.7.1] — 2026-09-09

### Correção: o deploy quebrava porque o Worker não tem sistema de arquivos

Os dois deploys falhavam com `no such file or directory, readAll
'/bundle/conteudo/institucional/a-dalmobile.md'`.

**A causa.** O conteúdo era lido de `conteudo/**/*.md` com `readFileSync`, em
tempo de execução. Isso funciona no `npm run dev` e **não existe** no runtime
do Cloudflare Worker: só o JavaScript empacotado vai para lá.

E era maior que o erro mostrava: `/a-dalmobile` quebrava no *deploy*, porque
chamava a leitura em escopo de módulo; `/ambientes` e `/projetos` liam disco
**dentro do componente** e teriam dado 500 a cada requisição em produção.

**A correção.** `build/gerar-conteudo.mjs` lê e valida em Node, no build, e
escreve `conteudo/gerado.json`. As páginas importam por `lib/conteudo.ts`.
Campo faltando continua quebrando o build — só que neste passo. `lib/filtros.ts`
recebeu as funções puras que estavam presas ao módulo que lê disco.

**Por que os testes não pegaram.** A suíte importa `dist/server/index.js` **em
Node**, onde `fs` existe. O ambiente de teste era mais permissivo que o de
produção. `tests/bundle-worker.test.mjs` fecha isso: vasculha o bundle e falha
se `readFileSync(`, `readdirSync(`, `gray-matter` ou `js-yaml` estiverem nele.
Verificado reintroduzindo o bug. A suíte foi para **47**.

**De quebra:** `gray-matter` e `js-yaml` saíram do bundle do Worker.

---

## [0.7.0] — 2026-09-09

### Fase 7 — o mapa de rotas está completo

**Os mapas entraram.** `mapa.embed` e `mapa.link` das duas lojas, da ficha do
Google Business. O `link` usa o CID extraído do próprio embed, e os dois foram
verificados: respondem 302 para o Maps. **Zero pendências de dado de loja** —
os dois configs estão completos pela primeira vez.

**`/a-dalmobile` e `/arquitetos`**, seguindo as seções 7 e 8 da direção:
abertura, a fábrica, o processo em cinco etapas numeradas, materiais, garantia,
faixa de números e FAQ aberto (indexável, não acordeão de venda); e, para
arquitetos, os quatro blocos da parceria.

**Estes textos são RASCUNHO, e travam o deploy**

Foram escritos **sem entrevista com a loja**, a partir só do que o `CLAUDE.md`
afirma: móveis planejados, fábrica própria com quase cinco décadas, marca do
grupo Orizon. `conteudo/institucional/*.md` traz `confirmado: false`, e a trava
de deploy recusa publicar enquanto for assim.

**Nada que a loja não confirmou é renderizado.** 16 campos estão com o sentinela
`PENDENTE` — os cinco prazos de etapa, os anos de garantia, os quatro números da
faixa, três respostas do FAQ, a foto de fábrica e o prazo de resposta a
escritório. Cada um é **omitido** da página, não renderizado como buraco: a
faixa de números não aparece, os prazos não aparecem, e o FAQ mostra 3 das 6
perguntas. Um teste falha se a palavra "PENDENTE" chegar ao HTML.

**A lista de arquitetos parceiros está vazia**, de propósito: publicar nome de
terceiro exige autorização por escrito de cada um, e ela vale por projeto.

**Entrou também**

- `lib/institucional.ts`, com o frontmatter tipado — sem `any`.
- `ehPendente()` em `config/pendente.ts`, e o sentinela passou a aceitar a forma
  curta `PENDENTE` usada nos arquivos de conteúdo.
- "A Dalmóbile" e "Arquitetos" voltaram ao menu.
- Um teste novo: nenhum sentinela vaza para o HTML. A suíte foi para **44**.

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
