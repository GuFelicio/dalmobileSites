# Log de decisões

Toda escolha que alguém possa querer desfazer entra aqui, com data e motivo.
Sem isto, daqui a seis meses alguém "melhora" o site desfazendo tudo — de
boa-fé, por não saber que era decisão.

Formato: **data · o que · por quê · o que foi descartado**.

> **As seis entradas abaixo registram decisões tomadas antes do código, no
> `CLAUDE.md` e no briefing.** Estão aqui porque o log serve para que ninguém as
> desfaça de boa-fé daqui a seis meses, por não saber que eram decisão.

---

## Fundação · Um repositório gera os dois sites

**Decisão.** Um código, dois builds, dois domínios. Não são dois projetos, nem
um projeto com dois temas em runtime.

**Por quê.** O site anterior eram dois repositórios, e foi assim que Caraguá foi
ao ar indexado com *"Móveis Planejados em São José dos Campos"*: alguém copiou
o de SJC e esqueceu de trocar. Com um repositório, uma correção de layout ou de
acessibilidade chega aos dois sites no mesmo commit, e a diferença entre eles
fica confinada a `config/` — onde é visível, tipada e testada.

**O que isso obriga.** Nunca duplicar componente, estilo ou texto por unidade.
Se algo precisa ser diferente, vira campo no config. A paleta "palha" de Caraguá
segue essa regra: um campo, não um segundo CSS.

**Descartado.** Dois repositórios (é o erro original) e um site só servindo as
duas cidades (cada unidade tem endereço, telefone e acervo próprios, e o Google
precisa de um domínio por praça para a busca local funcionar).

---

## Fundação · Sem CMS: o conteúdo é Markdown no repositório

**Decisão.** Fotos em `public/fotos/`, textos em `conteudo/**/*.md`. Nenhum
painel de administração, nenhum banco.

**Por quê.** O acervo muda poucas vezes por mês — alguns projetos novos por
trimestre. Um CMS cobraria por isso o ano inteiro: mensalidade, um serviço a
mais para cair, uma conta a mais para alguém perder a senha, e latência por
requisição num site cuja prioridade é foto chegando rápido no 4G.

Com Markdown no repositório, o conteúdo é **versionado junto com o código**:
dá para ver quem mudou o quê e voltar atrás. E a validação roda no build —
campo faltando quebra a publicação com uma mensagem que diz o que fazer, em
vez de ir ao ar torto.

**O custo, que é real.** Publicar um projeto exige mexer em arquivo e rodar
comandos. Por isso `docs/adicionar-ambiente.md` e `docs/adicionar-projeto.md`
são escritos para quem não programa, e são os documentos mais importantes do
repositório.

**Descartado.** CMS hospedado (custo recorrente e dependência externa para um
acervo que quase não muda) e CMS próprio (seria o produto, não o site).

---

## Fundação · Sem blog na versão 1

**Decisão.** O site não tem blog nem seção de novidades.

**Por quê.** Blog só funciona com cadência — sem publicação regular, ele
envelhece à vista, e um "último post: há 14 meses" no rodapé diz sobre a
empresa exatamente o contrário do que se queria dizer. A loja não tem hoje
quem escreva com regularidade.

E o tráfego orgânico que um blog buscaria já tem lugar melhor: as **páginas de
ambiente**, que ranqueiam para "cozinha planejada em São José dos Campos" com
foto de projeto executado — que é o ativo que a concorrência não tem.

**Quando reabrir.** Se a loja passar a ter quem escreva toda semana. Aí o blog
entra como pasta nova em `conteudo/`, sem tocar em arquitetura.

**Descartado.** Blog com dois ou três posts de lançamento (é o cenário que
envelhece) e blog terceirizado com texto genérico de SEO (contradiz a regra de
que o ativo é projeto executado e fotografado de verdade).

---

## Fundação · Krub, e só Krub

**Decisão.** Uma família tipográfica em todo o site, self-hosted via
`@fontsource/krub`, nos pesos 300, 400 e 600.

**Por quê.** A hierarquia do site vem de **escala e tracking**, não de misturar
fontes nem de engordar peso — é o que sustenta um desenho quieto, em que a foto
é o que chama atenção. Uma segunda família resolveria por contraste tipográfico
o que aqui se resolve por tamanho e espaço, e roubaria a atenção da imagem.

Self-hosted, e não Google Fonts por CDN: a fonte vem do bundle, sem requisição
a terceiro, sem salto de layout e sem depender de um domínio externo estar no ar.
Só três pesos, porque cada peso é um arquivo a baixar num site que abre por 4G.

**A regra que fica.** Se algo parecer precisar de outra fonte, o problema é de
escala, peso ou tracking. Nem para ícone, nem para número: os ícones são SVG
inline escritos à mão, justamente por isso.

**Descartado.** Uma segunda família para títulos (contraste que a escala já
resolve), Google Fonts por CDN (requisição a terceiro e ponto de falha) e
carregar os sete pesos da família (peso morto no 4G).

---

## Fundação · Não existe cor de acento

**Decisão.** A paleta é acromática. Não há uma cor de destaque para botão, link
ou chamada. Único desvio previsto: verde e vermelho de sistema em erro e
sucesso de formulário, no menor tamanho possível.

**Por quê.** O site é 90% foto de marcenaria, e marcenaria é cor: madeira,
laca, pedra. Uma cor de acento entra em competição com o produto em toda tela —
e perde, ou pior, ganha. Sem acento, a única coisa colorida na página é a foto.

**O que substitui o acento.** Quando faltar destaque, a resposta é **escala ou
troca de superfície**, nunca cor nova. É por isso que existem três superfícies
(preto, cinza, papel) em vez de uma paleta de destaques.

**A tensão registrada.** A paleta "palha" de Caraguá é cromática. Ela passa
porque é **superfície**, não acento — não há elemento colorido chamando
atenção, e sim um fundo que mudou de temperatura. Ver a entrada de 09/09.

**Descartado.** Um acento tirado da marca (competiria com a foto) e usar cor
para hierarquia de botão (é o que escala e superfície fazem aqui).

---

## Fundação · A foto nunca é escurecida

**Decisão.** Nenhum filtro, nenhum overlay, nenhuma sombra sobre foto. Quando
precisar de texto sobre imagem, usa-se **painel sólido ancorado** — como o do
hero da home —, não véu na foto inteira.

**Por quê.** O ativo do cliente é projeto executado, fotografado por
profissional, com o arquiteto que assinou. Escurecer a foto para caber um
título joga fora exatamente aquilo pelo qual se pagou, e que a concorrência
não tem. O arquiteto que abre o site reconhece na hora uma foto tratada.

**O que isso obriga no desenho.** O título vive numa faixa **abaixo** da foto,
ou num painel sólido ao lado dela. É mais difícil de compor do que jogar um
gradiente por cima — e é a razão de o desenho ter as três superfícies.

**A dívida que resta.** `.synthesis-project-featured::after` ainda põe um
gradiente sobre a foto grande da vitrine da home. Veio do estudo, sobreviveu
porque a home é provisória, e **precisa sair quando a home definitiva for
construída**.

**Descartado.** Gradiente sob o texto (é o véu com outro nome) e caixa
translúcida sobre a foto (o painel sólido resolve sem tocar na imagem).

---

## 2026-10-07 · v6: o acervo de SJC mora no config, sem título nas fotos

**O quê.** As fotos de São José dos Campos passaram a vir de um acervo no
config (`acervo` em `config/sjc.ts`): uma lista com arquivo, ambiente e
arquiteto de cada foto, na ordem do carrossel. As fotos não têm mais título;
mostram só o ambiente e o crédito. Caraguatatuba continua com
`conteudo/ambientes/`, e em 08/10/2026 também perdeu os títulos no carrossel
(pedido do cliente) — a regra "sem título" passou a valer para os dois sites.

**Por quê.** Decisão do cliente, com o acervo novo da fotografia (40 fotos de
nove arquitetos). Não há descrição de cada cena — por isso também o alt de
formato único. A ordem num array do config deixa o cliente reordenar mexendo
num lugar só; um teste segura a regra de não repetir arquiteto nem ambiente.

**Como.** Os originais (2 a 19 MB) ficam fora do git, em `fotos-originais/`,
como já era com `imgs/`; o repositório guarda mestras de 1920px. O pipeline
ganhou teto de 400 KB por variação e passou a apagar variações órfãs. Um passo
depois do build (`build/podar-fotos.mjs`) tira do site de cada unidade as
fotos da outra — antes, as de Caraguá iam ao ar no domínio de SJC, sem link.

**Descartado.** Pôr as 40 fotos em `conteudo/ambientes/`: a lista de
ambientes de lá é fechada e não tem living, sala de TV nem corporativo, e
exigiria título e alt descritivo que não temos. Escolher sozinho as fotos
avulsas: o cliente indicou cada uma.

---

## 2026-10-07 · A abertura tem vídeo vertical no celular

**O quê.** Até 600px a abertura toca a versão vertical do vídeo (720×1280), num
quadro 9:16 com teto de 60svh; acima, a horizontal, como antes.

**Por quê.** O cliente produziu a versão vertical. Num telefone em pé, o vídeo
horizontal ocupava uma faixa de ~220px de altura; o vertical usa a tela.

**Como.** `<source media>` com as fontes mobile primeiro, e o poster num
`<picture>` atrás do vídeo: o navegador baixa só a versão da tela, sem
JavaScript. 600px e não 768 (como no rascunho parado em `feat/video-mobile`):
no iPad em pé a abertura é 16:9, e o horizontal cabe nele inteiro.

**Descartado.** Trocar o vídeo por JavaScript (`matchMedia`): baixaria a versão
errada antes da hidratação. O atributo `poster`: aceita uma imagem só.

---

## 2026-10-06 · Ajustes de diagramação da home, depois da v5

**O quê** (pedidos do cliente, todos na home):
1. **Quebra de linha nos títulos.** "Móveis personalizados" numa linha só no
   desktop (de 1025px para cima), e o resto embaixo; "de alto padrão" sempre
   inteiro, numa linha própria, no título da fábrica. Feito com
   `.synthesis-linha` e `.synthesis-inteira` (`app/globals.css`), não com
   `<br>`: no celular "Móveis personalizados" não cabe numa linha no tamanho do
   h1, e as duas palavras quebram entre si.
2. **"Para arquitetos" ganhou uma foto** embaixo do título, com o crédito — de
   projeto assinado (Débora Toledo em SJC, Flávia e Sérgia Garrido em Caraguá),
   escolhida no código entre as que têm `arquiteto` e não aparecem em outra
   seção. A coluna da esquerda ficava vazia ao lado dos três itens.
3. **A frase final de "Para arquitetos" ficou centralizada** na largura da
   seção, embaixo das duas colunas, com um fio em cima. É a **segunda exceção**
   à regra de alinhamento à esquerda do `CLAUDE.md` (a primeira é o rodapé).
4. **Endereço e horário saíram do showroom** ("ficou muito poluído"). O
   endereço fica só no rodapé; o horário **não aparece mais na página** e
   continua indo ao Google pelo schema `LocalBusiness`, gerado do config. Fica
   o "Abrir no mapa".

**Descartado.** `<br>` fixo nos títulos (quebraria errado no celular); tirar
também o "Abrir no mapa" (sem endereço na seção, é o único caminho até a loja
ali).

---

## 2026-10-06 · v5: site de uma página

**O quê.** Os dois sites passaram a ser só a home, mais `/privacidade`. Saíram
`/ambientes`, `/ambientes/[slug]`, `/a-dalmobile`, `/arquitetos`, `/a-loja` (e
`/projetos`, que estava no build sem link). Cada endereço antigo responde **301**
para a seção equivalente da home (`worker/index.ts`), e o menu — Projetos · A
Dalmóbile · Para arquitetos · A loja — rola até as seções (`/#projetos`,
`/#a-dalmobile`, `/#arquitetos`, `/#a-loja`). Entrou a seção "Para arquitetos"
(o resumo da antiga página); o showroom ganhou endereço, "Abrir no mapa" e a
linha da outra loja com link para o outro site. O grafite clareou de `#262626`
para `#363838`, e o rodapé de Caraguá voltou ao cinza de SJC. Texto:
`docs/copy-home-v5.md`. O código anterior está na tag `v4-multipagina`.

**Por quê.** Decisão do cliente, no roteiro da v5 (06/10/2026). O motivo do
formato de uma página não foi registrado no roteiro — quem souber, complete
aqui. O do grafite foi: `#262626` "ficou escuro demais". `#363838` mantém o
contraste do texto (papel sobre ele dá 10,7:1, o secundário 6,4 e a areia 7,0).

**Como.** 301 e não 404: quem tinha o link num favorito, num cartão ou numa
conversa cai na seção certa, e o Google transfere a relevância. Os links do
menu são `<a href="/#id">`, e não `next/link`: na própria home o `<Link>` do
vinext não rola até a âncora. Cada seção tem `scroll-margin-top` igual à
altura do cabeçalho. A camada de texto institucional (`conteudo/institucional/`,
`lib/institucional.ts`, `lib/texto.ts`) saiu junto com as páginas: ficaria no
bundle sem uso, e a pendência dela (a foto da fábrica) travaria `npm run
deploy:*` por uma página que não existe mais.

**Descartado.** 404 nas rotas antigas; manter as páginas internas fora do
menu (seriam páginas órfãs, que ninguém confere); o mapa embutido (`iframe`)
no showroom — o "Abrir no mapa" leva ao mesmo lugar sem pesar na página; o
rodapé de quatro colunas com o mapa do site, que não tem mais o que listar.

---

## 2026-10-05 · v4: papel e grafite alternando, cinza só no rodapé, respiro menor

**O quê.** Um papel só (`#F6F4F0`) e um escuro de seção só (grafite `#262626`),
alternando sem nunca repetir a cor da vizinha; o cinza (`#9E9C94`) ficou só no
rodapé, que é cinza em toda página. O respiro caiu para 72px por seção no
desktop (48 no celular). A abertura da home é só o vídeo. O cabeçalho some ao
rolar para baixo e volta ao rolar para cima. Roteiro: `docs/prompt-v4.md`.

**Por que papel + grafite.** Medido no site: dois papéis quase iguais
(#F9F8F5 e #F5F4F0); a faixa de projetos contra o papel com 1,08:1 de
diferença, invisível como fronteira; o cinza em seção, faixa e rodapé se
fundindo; texto branco sobre o cinza do processo com 2,8:1. Duas superfícies
com contraste alto entre si (papel sobre grafite dá 13,8:1) fazem de cada troca
uma fronteira legível, e as duas carregam texto acima de 4,5:1 sem exceção.
Continua acromático: o grafite não é acento, é superfície. Com a cor marcando
cada fronteira, o espaço deixou de precisar fazer esse trabalho — e o respiro
caiu de 240–300px vazios entre seções para 144px, e o rodapé do celular de
1.106 para 582px.

**Por que a abertura ficou só com a foto.** A faixa de título sob o vídeo
("O projeto começa na medição.") empilhava dois títulos gigantes no mesmo papel,
um logo acima do outro, e empurrava o primeiro conteúdo para fora da primeira
tela. Sem ela, a imagem — que é o produto — abre a página inteira e sozinha,
como a regra de foto do `CLAUDE.md` pede, e o título da seção seguinte vira o
h1 e aparece na primeira tela (o vídeo tem teto de 72svh no desktop, 60 no
celular).

**Por que o menu some.** O cabeçalho fixo ocupava 88px de toda tela, o tempo
todo — no celular, mais de 10% da altura, em cima das fotos. Escondido ao
descer, a foto ganha a tela inteira na leitura; ao subir (o gesto de quem
procura a navegação), ele volta na hora. Só `transform`, 250ms, sem layout
shift; nunca some com o menu aberto nem com foco de teclado dentro dele, e sem
animação com movimento reduzido. Conferido em teclado e toque (29 verificações).

**Descartado.** A regra de "no máximo quatro trocas de superfície por página"
(a v4 troca a cada seção, de propósito); o `--respiro-longo`; o oliva, o preto
e o papel-baixo como fundo de seção; o rodapé preto da home; esconder o
cabeçalho também com foco de toque dentro dele (prendia o cabeçalho na tela
depois de fechar o menu por toque).

---

## 2026-10-02 · Copy v3: onde o roteiro deixou espaço, o que foi decidido

A copy v3 (`docs/copy-v3.md`) foi aplicada literalmente. Nos pontos abaixo o
roteiro (`docs/prompt-copy-v3.md`) não dizia, ou se contradizia:

1. **O fecho de `/a-dalmobile` ficou de fora.** A copy (A7) pedia "As lojas
   Dalmóbile de São José dos Campos e Caraguatatuba atendem o Vale do Paraíba e
   o litoral norte." nos dois sites, e o roteiro só permite três menções à
   outra cidade. O cliente decidiu tirar a frase; a faixa do fim da página fica
   só com o botão do showroom.
2. **Texto diferente por unidade sem duplicar arquivo.** Quartos e sala de
   Caraguá ficam no mesmo `.md`, em `porUnidade`. A pergunta de área do FAQ é
   uma frase só, com `{{regiao}}` e `{{outraRegiao}}`. A description da home e
   a do hub, que não são simétricas, viraram campo do config (`textos`).
3. **`/a-loja`:** a copy lista ENDEREÇO, WHATSAPP e HORÁRIO. A linha "Telefone"
   saiu (é o mesmo número) e a de WhatsApp mostra o número, como link. O
   horário segue com o desenho de antes (dia de um lado, hora do outro).
4. **"Respondemos em até um dia útil."** continua no lugar e no desenho de
   antes (rótulo sob o bloco de orçamento), por decisão do cliente.
   **Desfeito em 05/10/2026:** o cliente informou que esse prazo não existe na
   loja. A frase saiu de `/arquitetos` e de `/privacidade`, e o `CLAUDE.md`
   deixou de prescrevê-la na confirmação de formulário. Não recolocar prazo de
   resposta sem a loja confirmar.
5. **Redirect 301 por regra, não por endereço:** todo ambiente da lista oficial
   que a unidade não publica responde 301 para o hub. Em Caraguá isso vale para
   o banheiro (pedido) e também para home office, closet e espaço gourmet, que
   antes davam 404.
6. **As fotos removidas saíram do conteúdo, não do disco.** Os arquivos ficam em
   `public/fotos/`, sem uso; voltar é relistar.

**Duas consequências de layout, corrigidas com aprovação do cliente:**
- `/arquitetos` passou de 4 para 5 blocos, e a grade 2×2 terminaria com um
  bloco sozinho. Virou lista de uma coluna, na medida do texto, com régua entre
  os blocos.
- O carrossel agrupava de 3 em 3 e juntava a sobra ao grupo anterior. Com uma
  foto a menos em cada site, um grupo ficava com 5 fotos e todos os outros
  ganhavam um vão vazio embaixo. Agora a sobra vira o último grupo, mais curto.

---

## 2026-10-02 · Sem endereços de preview no Cloudflare

**Decisão.** `preview_urls: false` na configuração do Worker, em
`vite.config.ts`. O site publica direto de `main`; os previews por branch só
mantinham no ar versões que não valem mais — a V2 descartada continuava
acessível em `v2-layout-*.workers.dev`.

**Por que pela configuração, e não pelo painel.** Fica escrito no repositório
(quem vier depois sabe que é decisão) e não exige login na conta da Cloudflare
na máquina de desenvolvimento.

**Para voltar a ter preview por branch:** tirar a linha `preview_urls: false`.

---

## 2026-10-02 · A home termina numa barra com a marca, não no rodapé completo

> **Atualizado em 05/10/2026 (v4):** a barra fica no cinza do rodapé, como todo
> rodapé do site — não mais preta. E, a pedido do cliente, o **endereço da
> loja saiu da seção de contato e foi para a barra**, ao lado da marca. Horário
> e WhatsApp continuam na seção de contato.
>
> **Exceção ao alinhamento à esquerda (05/10/2026, pedido do cliente):** nessa
> barra, o endereço fica em 14px e alinhado à **direita**, na ponta oposta à
> marca, do tablet para cima. No celular, onde ele desce para baixo da marca,
> continua à esquerda. É a única exceção à regra do `CLAUDE.md`; não estender
> para outros lugares sem decisão nova.

**Decisão do cliente.** Depois da seção da loja — que já mostra endereço,
horário e WhatsApp —, a home fecha com uma barra preta só com a marca da
unidade. As páginas internas continuam com o rodapé completo (`Footer`).

**Por quê.** Na home o rodapé completo repetiria, logo abaixo, os mesmos dados
da seção da loja. O `CLAUDE.md` pede endereço, telefone, WhatsApp e horário no
rodapé de toda página; na home eles estão na última seção, a um palmo da barra.

**Descartado.** O rodapé completo também na home (a mesma informação duas
vezes seguidas).

---

## 2026-10-02 · Ajustes de layout na V1: o que foi decidido no caminho

O roteiro "Ajustes de layout na V1" foi seguido. Onde ele deixava espaço ou se
contradizia, a escolha foi:

1. **Faixa do título da abertura em papel** (o padrão do roteiro), e não preta.
   O `CLAUDE.md` foi atualizado.
2. **Cabeçalho da home em papel sólido, ACIMA do vídeo.** O roteiro pede o
   cabeçalho transparente sobre a abertura e, ao mesmo tempo, a abertura "sem
   nada por cima e sem escurecimento". Sobre o vídeo claro, o texto do
   cabeçalho só lia com o gradiente de topo — que escurece a imagem. Papel, e
   não preto, para não carregar no preto.
3. **A legenda "O que vem por escrito" foi para baixo da foto da fábrica.** O
   roteiro só citava o card do carrossel, mas a verificação final pede
   "nenhuma legenda sobre foto". O texto ficou; mudou o lugar.
4. **Caraguá em `/ambientes`:** o roteiro diz "não mexer lá" porque no desktop a
   grade fecha exata. No tablet (3 colunas) ela fechava 3+1, com vão; o último
   card agora estica. No desktop nada mudou.
5. **O mapa de `/a-loja` saiu da ordem do Tab.** O foco entrava no Google Maps
   (outro domínio) sem contorno visível. O "Abrir no mapa" logo acima leva ao
   mesmo lugar.
6. **Alvo de toque dos links de texto da home:** uma área invisível de 44px em
   volta do link, em vez de aumentar o link — aumentar afastaria o fio do texto,
   e o roteiro não muda desenho.
7. **"Uma seta por seção"** foi aplicado tirando a seta dos links dos cards do
   carrossel; cada seção ficou com a seta do seu link principal.

**Descartado.** Cabeçalho transparente com gradiente sobre o vídeo (escurece a
imagem) e tirar a legenda da fábrica (seria mudar texto).

---

## 2026-10-02 · A V2 de layout foi descartada; a V1 fica, com três ajustes

**Decisão.** O cliente viu a V2 (fases 0 a 4, construída em `v2-layout` a partir
de `docs/direcao-layout-sites-dalmobile.md`) e preferiu manter a V1. A branch foi
apagada; o código ficou na tag **`v2-arquivo`**, só como arquivo. A direção de
layout e o roteiro da V2 não entraram no `main`.

**O que foi aproveitado**, refeito sobre a V1 e sem mudar o desenho das seções:
- cabeçalho com fundo sólido nas páginas internas (era 1,16:1 de contraste);
- a home com o `Header` comum, e portanto com menu no celular;
- `--medida` em `34em` (com `64ch` as linhas tinham 77 caracteres);
- o `CLAUDE.md` passa a descrever as cores que estão no ar — o cliente
  confirmou que são as corretas.

**Descartado.** Tudo o mais da V2: as três superfícies, os três respiros, a nova
home, a grade editorial, o gabarito das internas, a composição da home no
config.

---

## 2026-10-01 · O vídeo vai para o fundo da capa; a seção 01 volta

**Decisão.** O vídeo em loop saiu da faixa separada e virou o **fundo da capa**
(`.synthesis-hero`), no lugar da foto `casa-completa.webp`. A faixa foi removida
e a seção "01 — Como projetamos" voltou exatamente como era antes, com a foto,
a legenda e a numeração 01/02/03. O painel da capa (rótulo, H1, texto e "Ver
os ambientes") não mudou.

**Como se comporta agora.**
- `autoplay`, porque passou a ser o primeiro conteúdo da página: começa antes
  mesmo do JavaScript. Pausa se a capa sai da tela e volta quando ela reaparece.
- `prefers-reduced-motion: reduce` → para e volta ao poster (`load()`), mesmo
  que o autoplay tenha começado antes da hidratação.
- `object-fit: cover` e `object-position: center` em todas as larguras.
- O `.synthesis-shade`, que escurecia a foto inteira, **saiu**. No lugar há só
  um gradiente no topo (`--degrade-cabecalho`, preto a 35% até sumir em 22% da
  altura), para o cabeçalho branco ficar legível sobre as partes claras do
  vídeo. O vídeo em si não é escurecido.
- A foto `casa-completa.webp` continua no repositório: é a imagem de
  compartilhamento (OpenGraph) em `app/layout.tsx`.

**Desvio consciente do `CLAUDE.md`.** A regra diz que "na abertura, a foto entra
inteira e o título vive numa faixa preta abaixo dela". A capa já não seguia isso
desde o estudo 03 (o painel fica sobre a imagem, como "painel sólido ancorado",
que o próprio `CLAUDE.md` admite). O vídeo mantém esse painel e tira o véu, então
fica mais perto da regra do que estava.

**Descartado.** Manter a faixa separada abaixo da capa (o pedido do cliente era
o vídeo na abertura) e manter o véu da foto sobre o vídeo (o cliente pediu
explicitamente sem filtro escuro).

---

## 2026-10-01 · Vídeo em loop no lugar da seção "01 — Como projetamos"

> **Substituída no mesmo dia** pela entrada acima: o vídeo foi para a capa e a
> seção 01 voltou. Fica o registro do que foi tentado.

**Decisão.** A seção do manifesto da home (rótulo "01 — Como projetamos",
título "Nenhuma casa é igual à planta.", texto sobre a medição no imóvel, link
"Como trabalhamos" e a foto com a legenda "Fábrica própria · 100% MDF · 6 anos
de garantia") saiu. No lugar entrou uma faixa de vídeo em loop, largura total,
sem som e sem controle: `components/midia/VideoEmLoop.tsx`. A capa continua
igual, com o H1. As seções seguintes foram renumeradas (01 Projetos
executados, 02 Da fábrica à montagem).

**Por quê.** Pedido do cliente: um vídeo de projeto executado mostra a
marcenaria melhor que o texto. O conteúdo da seção não se perdeu: a medição e
o processo estão em `/a-dalmobile`, e fábrica, MDF e garantia estão na seção
"Da fábrica à montagem", logo abaixo na home.

**Como se comporta.**
- Toca só quando a faixa entra na tela (IntersectionObserver, 25% visível) e
  pausa quando sai. **Sem o atributo `autoplay`**, de propósito: com ele, o
  vídeo começaria no carregamento, antes de a pessoa chegar até ele.
- `preload="auto"`, sem lazy-load: a faixa fica logo abaixo da capa e é
  alcançada na primeira rolagem. O custo é o download do webm (4,4 MB) já no
  carregamento da home.
- `prefers-reduced-motion: reduce` → nunca toca; fica o poster.
- `aria-hidden`: é decorativo, não carrega informação.
- webm (VP9) primeiro, mp4 (H.264) de fallback. Arquivos em `public/videos/`,
  um conjunto só, servido pelos dois sites.
- Altura `clamp(480px, 56.25vw, 100svh)`: o quadro 16:9 inteiro do notebook
  para cima, e no celular 480px com corte nas laterais (`object-fit: cover`).

**Não conflita com "carrossel automático proibido".** O vídeo é um plano
contínuo de um ambiente, não troca de conteúdo nem rouba a leitura de uma foto
— que é o que a regra protege. Não é escurecido nem tem texto por cima.

**Descartado.** Pôr o vídeo na capa (tiraria o H1 e a foto de abertura da
primeira dobra) e tocar com `autoplay` desde o carregamento (gasta bateria e
dados com um vídeo que ainda não está na tela).

---

## 2026-09-14 · A outra cidade pode ser nomeada no corpo, nunca no SEO

**Decisão.** Reverte a entrada de 08/09 ("O link para a outra loja não cita a
cidade dela"). A copy aprovada nomeia a loja irmã de propósito, e o teste de
cidade cruzada passou a proibir onde o dano acontece, em vez de banir a string.

**A regra nova, em duas camadas:**

1. **Banimento absoluto** nos campos que dizem ao Google de que praça o site é:
   `<title>`, `meta description`, OpenGraph, Twitter, canônico, `<h1>`, o schema
   e o **sitemap inteiro**. Zero tolerância — uma só menção já faz o site ser
   lido errado.
2. **No corpo, só menção declarada.** Toda ocorrência tem que casar com uma das
   frases de `MENCOES_DECLARADAS`, em `tests/unidade-cruzada.test.mjs`. Hoje são
   três: o rótulo do link cruzado, a faixa da página da loja e a resposta do FAQ.
   Uma menção nova quebra a suíte e obriga alguém a olhar — que é o ponto.

**Por quê.** A proibição original tratava a string como o perigo. O perigo é o
site ser *sobre* a cidade errada. Um link dizendo "Ver a loja de Caraguatatuba"
não confunde o Google e ajuda quem chegou na praça errada — e "Nossa outra
loja", que era a saída anterior, deixava o leitor sem saber onde é a outra loja.

**O teste ficou mais forte, não mais fraco.** Antes varria arquivos de `dist/`,
com a carga do RSC repetindo cada frase e o `<title>` valendo tanto quanto um
comentário. Agora renderiza as sete páginas e separa campo estrutural de corpo.
Verificado das duas formas: cidade errada no `<title>` quebra; menção nova no
corpo quebra.

**Descartado.** Manter o banimento absoluto (obrigaria a escrever "nossa outra
loja", pior para o leitor e para a busca) e remover o teste (é o que existe
para impedir o erro que derrubou o site anterior).

---

## 2026-09-14 · A cidade nos textos compartilhados é `{{cidade}}`, não texto fixo

**Decisão.** `conteudo/institucional/*.md` usa `{{cidade}}` e `{{outraCidade}}`,
substituídos por `lib/texto.ts` a partir do config da unidade.

**Por quê — e isto quase foi ao ar errado.** A copy aprovada traz *"Fábrica
própria desde 1977. Loja em São José dos Campos"* como subtítulo de
`/a-dalmobile`. Só que o arquivo institucional é **um só para os dois sites**:
escrito assim, o site de Caraguatatuba iria ao ar com a cidade errada na segunda
linha da página. É literalmente o erro que derrubou o site anterior, reaparecido
por outra porta — desta vez pela copy, não pelo código.

A alternativa seria um arquivo por unidade, e o `CLAUDE.md` é explícito: *"nunca
duplicar componente, estilo ou texto por unidade — se algo precisa ser
diferente, vira campo no config"*.

**O que isso obriga.** Quem escrever copy institucional **não escreve nome de
cidade**. Escreve `{{cidade}}`. Está documentado no topo do próprio arquivo de
conteúdo, que é onde a pessoa vai olhar.

**Descartado.** Um arquivo por unidade (duplicação proibida, e os dois
divergiriam na terceira edição) e detectar a cidade por regex no render (
adivinhação: "São José" aparece em nome de rua e de bairro).

---

## 2026-09-09 · Caraguatatuba usa a paleta "palha"; SJC segue na neutra

**Decisão.** O site do litoral troca a **família do cinza** por tons de areia.
Preto, papel e branco são os mesmos nos dois. A escolha é um campo do config
(`paleta: "neutra" | "palha"`), e os valores vivem em `app/tokens.css`, sob
`:root[data-paleta="palha"]`, aplicado por um atributo no `<html>`.

| | neutra (SJC) | palha (Caraguá) |
|---|---|---|
| `--c-cinza` | `#9e9b95` | `#cfc4a9` |
| `--c-cinza-painel` | `#97958f` | `#cfc4a9` |
| `--c-cinza-texto` | `#5d5d58` | `#5f5847` |
| `--c-linha` | `#d3d0c9` | `#c6bda6` |

**Por quê.** Pedido do cliente: dar cara de litoral ao site de Caraguatatuba.
A areia clara faz isso sem tocar no desenho — nenhum componente muda, nenhuma
regra de layout muda, e os nomes semânticos (`--cinza`, `--cinza-clr`,
`--cinza-texto`) continuam os mesmos.

**A tensão com o `CLAUDE.md`, que precisa ficar escrita.** O documento descreve
a paleta como **acromática** e diz que *"não existe cor de acento"*. A palha é
cromática. O que sustenta a decisão é que (a) ela é **superfície**, não acento —
não há um elemento colorido para chamar atenção, e sim um fundo que mudou de
temperatura; e (b) o `docs/decisoes.md` de 04/09 já registra que a paleta em
uso é **provisória**, vinda do estudo, e que *"as cores definitivas ainda não
foram fechadas com a loja"*. Quando forem, esta decisão volta à mesa.

**Onde NÃO está o hex.** No config. `app/tokens.css` é o único arquivo do
projeto com cor literal, e um teste barra qualquer outra — inclusive `hsl()`,
`oklch()` e `color-mix()`. O config escolhe **pelo nome**.

**Contraste, medido.** O painel do hero herda texto escuro, e não branco como
eu supus a princípio: sobre o cinza dá 5,40:1, e sobre a palha, **9,33:1**. O
texto de apoio sobre papel foi de 6,02 para 6,42. Nenhuma troca piorou nada.

**Descartado.** Trocar só o painel do hero (deixaria palha em cima e cinza no
rodapé, no mesmo site), pôr o hex no config (quebra a regra de cor literal e o
teste que a guarda) e um segundo arquivo de CSS por unidade (é exatamente a
duplicação por unidade que o `CLAUDE.md` proíbe).

---

## 2026-09-09 · O conteúdo é empacotado no build; o Worker não lê disco

**Decisão.** `build/gerar-conteudo.mjs` lê e valida `conteudo/**/*.md` em Node,
no build, e escreve `conteudo/gerado.json`. As páginas importam esse JSON por
`lib/conteudo.ts`. **Nenhuma página em `app/` pode importar valor de
`lib/projetos.ts`, `lib/ambientes-conteudo.ts` ou `lib/institucional.ts`** —
esses três leem o disco e existem só para o build e para os testes.

**Por que — e isto foi ao ar quebrado.** O runtime do Cloudflare Worker **não
tem sistema de arquivos**. O deploy das duas unidades falhou com:

```
Uncaught Error: no such file or directory, readAll
'/bundle/conteudo/institucional/a-dalmobile.md'
```

`/a-dalmobile` chamava `lerInstitucional()` em escopo de módulo, e a Cloudflare
executa o topo do worker para validar. Mas o problema era maior que o erro
mostrava: `/ambientes` e `/projetos` também liam disco, só que **dentro do
componente** — teriam dado 500 a cada requisição em produção.

**Por que os testes não pegaram, que é a parte que importa.** A suíte importa
`dist/server/index.js` **em Node**, onde `fs` existe e `process.cwd()` é a raiz
do projeto. Tudo passava. O ambiente de teste era mais permissivo que o de
produção, e essa diferença é invisível até o deploy.

Foi fechado com `tests/bundle-worker.test.mjs`, que **vasculha o bundle** que
vai para a Cloudflare e falha se `readFileSync(`, `readdirSync(`, `gray-matter`
ou `js-yaml` estiverem lá — mais uma contraprova de que o conteúdo empacotado
chegou. Verificado reintroduzindo o bug: a suíte quebra.

**Efeito colateral bom.** `gray-matter` e `js-yaml` deixaram de ir para o
bundle do Worker. Eles só precisam existir no passo de build.

**Descartado.** `import.meta.glob` com `?raw` para embutir o Markdown cru (o
`gray-matter` continuaria no bundle, e a validação passaria a rodar a cada
requisição em vez de uma vez no build) e mover o conteúdo para KV ou R2
(dependência de serviço e latência por requisição, para dado que muda poucas
vezes por mês).

---

## 2026-09-09 · O site passa a ser organizado por ambiente, não por projeto

**Decisão.** O conteúdo principal são as páginas de ambiente
(`/ambientes/[slug]`), que reúnem fotos de apartamentos diferentes. As rotas de
projeto (`/projetos` e `/projetos/[slug]`) e toda a camada `lib/projetos.ts`
**ficam no código, sem conteúdo**, e fora do menu.

**Por quê.** O acervo que chegou tem 45 fotos de seis apartamentos, e **nenhuma
informação de prédio ou de arquiteto**. Um case exige ficha técnica: local, ano,
acabamentos com código, arquiteto. Sem esses dados não há case — e seis
apartamentos com sete fotos cada não sustentam as "trinta" que a direção prevê.

**O que isso custa, e é preciso dizer.** A seção 6 do `docs/direcao-site.md`
afirma que o cruzamento nos dois sentidos — ambiente aponta para projeto,
projeto aponta para ambiente — *"é a estrutura que nenhum concorrente tem: a
Costa Flores tem o portfólio e não tem as páginas de ambiente; o Top Vale tem o
inverso"*. Indo só por ambiente, o site fica onde o Top Vale está. Perdem-se
também a ficha técnica e o crédito do arquiteto, que o `CLAUDE.md` chama de
ativos que nenhum concorrente de SJC tem.

**Como isso fica reversível, que é o ponto.** Cada foto carrega os campos
`edificio` e `arquiteto`, hoje vazios, e o **nome do arquivo preserva a origem**
(`27062023-riz4771`, `dalmobile-calabasasapto93-0919`). Hoje ainda dá para saber
de que apartamento cada foto veio; daqui a seis meses não daria. Quando os dados
chegarem, o agrupamento por projeto sai daí sem reescrever conteúdo.

**Descartado.** Apagar a camada de projetos (jogaria fora a Fase 4 inteira e o
caminho de volta), inventar prédio e arquiteto para ter cases (o `CLAUDE.md`
proíbe número ou nome sem confirmação) e deixar `/projetos` no menu apontando
para uma página vazia.

---

## 2026-09-09 · A lista de ambientes vem do acervo, não do catálogo

**Decisão.** Os ambientes do site são sete: cozinha, quartos, sala de estar,
home office, closet, banheiro e espaço gourmet.

**Por quê.** A seção 3.3 do `docs/direcao-site.md` lista "os oito dos
catálogos": cozinha compacta, closet, lavanderia, casa integrada, home office,
sala de estar, cozinha gourmet, banheiro. O acervo real não bate com essa lista
em três pontos:

- **"Quartos" não está no catálogo, e é o ambiente MAIS fotografado** — doze das
  45 fotos. Deixá-lo de fora tiraria do site o segundo maior conjunto de provas.
- **O acervo não separa cozinha compacta de gourmet.** As onze fotos de cozinha
  são cozinhas, e forçar a divisão criaria duas páginas com critério inventado.
- **"Casa integrada" e "lavanderia" não têm nenhuma foto.** Página de ambiente
  sem foto não é página.

Entrou "espaço gourmet" no lugar da pasta "churrasqueira" do acervo.

**Descartado.** Manter os oito do catálogo e reclassificar as fotos à força
(nove fotos de quarto viariam "closet", que é outra coisa) e criar páginas
vazias para os ambientes sem foto.

---

## 2026-09-09 · Os originais das fotos ficam fora do repositório

**Decisão.** `imgs/` está no `.gitignore`. O que se versiona é a versão de
2560px em WebP, em `public/fotos/`.

**Por quê.** Medido: os 46 originais somam **250 MB**; em 2560px WebP somam
**20 MB**, com qualidade 86. O site nunca serve acima de 1920px, então a
diferença é invisível no navegador e brutal no repositório. Projetando o acervo
completo — 30 projetos, ~300 fotos —, seriam **1,6 GB contra ~100 MB**.

**O que fica combinado.** Os originais em resolução cheia são arquivo morto e
vivem no Drive. Se um dia for preciso um recorte ou uma impressão, é lá.

**Descartado.** Commitar os originais (clone e build da Cloudflare ficariam
lentos, e o GitHub avisa) e Git LFS (resolve o peso, mas acrescenta ferramenta
que quem entrar depois precisa instalar, e o build da Cloudflare precisaria
suportar).

---

## 2026-09-09 · `--cinza-texto`: a camada semântica ganhou um token de texto

**Decisão.** Acrescentado `--cinza-texto` à camada semântica de
`app/tokens.css`, apontando para `--c-cinza-texto` (`#5d5d58`).

**Por quê.** A camada semântica tinha `--preto`, `--cinza`, `--cinza-clr`,
`--papel` e `--branco`, e nenhum token para **texto de apoio sobre papel**.
Usar `--cinza` para isso reprova em acessibilidade: medido, `--cinza` sobre
`--papel` dá **2,52:1**, e o mínimo do WCAG AA para texto é **4,5:1**. O novo
token dá **6,02:1**.

O valor já existia na camada 1, nomeado para essa função — o que faltava era a
ponte semântica. Três lugares do case da Fase 4 já usavam `--cinza` como cor de
texto e estavam reprovando; foram corrigidos.

**A regra que fica:** `--cinza` para faixa e superfície, `--cinza-texto` para
texto sobre papel.

**Descartado.** Usar `--cinza` mesmo assim (reprova em contraste) e escrever o
hex direto no componente (o `CLAUDE.md` proíbe, e um teste barra).

---

## 2026-09-08 · O estudo escolhido é o 03 Síntese; os outros dois ficam no histórico

**Decisão.** Dos três estudos de layout, vale o **03 Síntese**. O Editorial e o
Imersiva foram removidos do código, junto com o seletor "ESTUDOS DE HOME" que
alternava entre eles.

**Onde eles estão, se alguém quiser revê-los.** No **commit inicial**
(`b25c42f`, "Fase 1: limpeza do template e design system em tokens"), em
`app/page.tsx` e nas regras `.editorial-*` e `.immersive-*` do `app/globals.css`.
Foi por isso que o `docs/prompts-construcao.md` mandava que o primeiro commit
fosse a base intacta: é o arquivo morto dos três estudos.

```bash
git show b25c42f:app/page.tsx
git show b25c42f:app/globals.css
```

**Por quê remover.** O seletor era andaime de protótipo e **foi ao ar nos dois
deploys** — uma barra fixa dizendo "ESTUDOS DE HOME" no site de um cliente.
Sobreviveu à limpeza da Fase 1 porque a página que ele controlava ainda estava
em revisão, e ninguém reviu a decisão quando a revisão terminou.

**O que ficou no lugar.** A Síntese virou conteúdo direto do `app/page.tsx`, sem
`"use client"` e sem `useState`: a home voltou a ser server component. Continua
**provisória** — a home de verdade é a Fase 6, que a remonta sobre `Header`,
`Footer` e `Section`.

**O que isso mudou no processo.** O `CLAUDE.md` ganhou um item no checklist de
deploy: *"Nenhum andaime de protótipo no build: seletor de layout, barra de
debug, título de estudo, rota de teste"*. E um teste passou a falhar se qualquer
marca do seletor voltar ao HTML — checklist que só existe em documento não
sobrevive ao terceiro mês.

**Descartado.** Manter os três estudos atrás de uma variável de ambiente (mesmo
código morto, com mais uma chave para esquecer ligada) e apagá-los sem registro
(quem quiser rever o Editorial não saberia que ele existiu).

---

## 2026-09-08 · As fotos são organizadas por unidade e por ambiente, e a pasta é dado

**Decisão.** `public/fotos/` tem três raízes — `sjc/`, `caragua/` e `comum/` —,
cada uma com uma pasta por ambiente. O nome do arquivo carrega o slug do
projeto. A validação de conteúdo confere a pasta contra o frontmatter.

**Por quê.** O cliente vai carregar as fotos, e pediu a separação por site —
é como ele pensa o acervo. Em vez de tratar isso como arrumação e deixar o
caminho ser texto livre, a estrutura virou **invariante checada**: a raiz tem
que bater com `unidades`, e a pasta do ambiente com o campo `ambiente` da foto.
Assim a organização que ele já ia fazer passa a pegar erro de arquivamento,
que num acervo de trinta projetos é o erro mais provável de todos.

**A terceira raiz.** `comum/` existe porque um projeto pode ser
`unidades: [sjc, caragua]`. Sem ela, a mesma foto teria duas cópias — o dobro
de arquivo, e duas versões que um dia divergem sem ninguém notar.

**Descartado.** Pasta por projeto (`projetos/<slug>/`, que era a estrutura da
Fase 4 — some agora, para não conviverem duas convenções), duas raízes sem a
`comum/` (obriga a duplicar arquivo) e derivar o ambiente do caminho em vez de
declará-lo (renomear pasta passaria a mudar dado em silêncio).

---

## 2026-09-08 · A lista de ambientes é fechada, em `lib/ambientes.ts`

**Decisão.** Um projeto só pode declarar ambientes que estejam na lista. Nome
fora dela quebra o build.

**Por quê.** O filtro do índice agrupa por texto. Com trinta projetos carregados
por pessoas diferentes ao longo de meses, "Cozinha", "cozinha" e "Cozinha
compacta" viram três filtros para a mesma coisa — e ninguém percebe até o
cliente perguntar por que há duas cozinhas no menu. Fechar a lista é o que
mantém o filtro utilizável.

**Descartado.** Aceitar texto livre e normalizar depois (normalização adivinha,
e adivinha errado em "Sala de estar" vs "Estar") e uma lista só de sugestão
(sugestão que não bloqueia não sobrevive ao terceiro mês).

---

## 2026-09-08 · As fotos não usam `next/image`; o componente é nosso

**Decisão.** Toda foto de conteúdo passa por `components/midia/Foto.tsx`, que
emite `<img>` com `srcSet` e `sizes` reais apontando para variações geradas no
build por `build/gerar-imagens.mjs` com `sharp`. O `next/image` não é usado.

**Por quê — e agora com a verificação feita.** A Fase 1 já havia constatado que
o binding `env.IMAGES` não existe na conta e é pago. Faltava a outra metade, que
só apareceu ao ler o código do vinext: **o shim de `next/image` do vinext
desliga o `srcSet` quando recebe um `loader` próprio** (`skipOpt = ... || !!loader`)
e passa a servir um arquivo só. E com `unoptimized: true` ele gera um `srcSet`
em que todas as larguras apontam para o **mesmo** arquivo.

Ou seja: nenhum caminho com `next/image` neste runtime entrega a imagem certa
para cada tela. E servir imagem de desktop no celular é, nas palavras do próprio
`CLAUDE.md`, "o erro mais caro do projeto" — num site que é 90% foto e que o
cliente abre por 4G, vindo de link de WhatsApp.

**O que isso custou.** Uma linha do `CLAUDE.md` ("usar `next/image` em todas as
fotos") deixou de valer, e foi reescrita. A regra por trás dela — foto sempre com
`sizes` correto — continua valendo e ficou mais forte: no `<Foto>`, `sizes` é
prop obrigatória, e foto sem variação gerada quebra o build em vez de virar
`<img>` quebrado em produção.

**Descartado.** `next/image` com `unoptimized` (cumpre a letra da regra e viola o
motivo dela), `loader` próprio no `next/image` (o vinext desliga o `srcSet`) e
contratar o Cloudflare Images (custo recorrente para um acervo que muda poucas
vezes por mês).

---

## 2026-09-08 · O estado do filtro do índice vive na URL, não no cliente

**Decisão.** `/projetos` lê `?ambiente=`, `?edificio=` e `?ate=` de
`searchParams`. Os chips são links, e "Carregar mais" também. A página inteira
segue server component, sem `"use client"`.

**Por quê.** A direção pede o filtro compartilhável e indexável — o vendedor
manda "olha os projetos no Rizzuti" pelo WhatsApp, e esse link precisa abrir
já filtrado. Estado de cliente não sobrevive a um link colado. De quebra, o
filtro funciona sem JavaScript e não custa bundle num site que precisa chegar
rápido no 4G.

**Detalhe que custou um bug.** Trocar de filtro **zera** o `?ate=`. Sem isso,
quem tinha carregado 12 projetos e filtrava para um edifício com 2 continuava
vendo "Carregar mais" sem ter o que carregar.

**Descartado.** Estado em React com `useState` (quebra o link compartilhável e
torna a página cliente) e paginação numerada (a direção pede "Carregar mais").

---

## 2026-09-08 · A unidade é escolhida por alias no build, nunca por `if` em runtime

**Decisão.** `vite.config.ts` lê `process.env.UNIDADE` e aponta o alias
`@unidade` para `config/sjc.ts` ou `config/caragua.ts`. Todo componente importa
de `config/derivados`, que reexporta o alias.

**Por quê.** Com um `if` em runtime os **dois** configs entram no bundle, e o
texto de uma cidade viaja dentro do site da outra. Seria o mesmo erro do site
anterior, só que escondido no JavaScript em vez de na `<meta>`. Com alias, só um
arquivo de config é compilado — e é isso que permite ao teste de cidade cruzada
ser absoluto: "esta string não pode existir em `dist/`", sem exceção.

**A armadilha que custou caro.** A primeira versão declarava também
`"@unidade"` em `compilerOptions.paths` do `tsconfig.json`, para o editor não
reclamar. **O `paths` vence o alias do Vite**, e o resultado foi que os dois
builds saíam com o config de SJC dentro — inclusive o de Caraguá. Não dava erro
nenhum; o build passava. Só o teste de cidade cruzada pegou. O tipo do módulo
agora vive em `config/unidade.d.ts`, que resolve o editor sem tocar na
resolução do build. **Não reintroduza aquela linha.**

**Descartado.** Seleção por `if` em runtime (leva os dois no bundle), variável
`import.meta.env` inlinada (mesmo problema: o código dos dois continua lá) e
dois repositórios (é exatamente o que o `CLAUDE.md` proíbe).

---

## 2026-09-08 · O link para a outra loja não cita a cidade dela

**Decisão.** `outraUnidade.nome` é "Nossa outra loja" nos dois configs, e não o
nome da cidade. Só a URL contém a outra cidade.

**Por quê.** Duas regras do projeto se chocam de verdade aqui: o `CLAUDE.md`
manda "nunca mencionar São José dos Campos no site de Caraguá, nem o contrário",
e o `docs/direcao-site.md` pede "link para a outra unidade" no rodapé. Um link
rotulado com o nome da outra cidade cumpre a segunda e viola a primeira ao pé da
letra — e foi assim que o teste de cidade cruzada travou na primeira execução.

Aplicou-se a leitura estrita, porque a regra existe por um motivo mensurável: o
site anterior foi indexado com a cidade errada. A URL é a única ocorrência
inevitável, porque a cidade está no domínio.

**Reversível.** Se a loja preferir o rótulo com o nome da cidade — é mais claro
para quem lê —, muda-se uma linha em cada config e abre-se a exceção
correspondente no teste. Mas é decisão de quem responde pelo SEO, não de quem
escreve o componente.

**Descartado.** Rotular com a cidade (viola a regra que existe por causa de um
erro real e caro) e remover o link cruzado (a direção o pede, e ele é útil para
quem está na cidade errada).

---

## 2026-09-08 · A checagem de dado pendente é trava de deploy, não teste

**Decisão.** `config/verificar-pendencias.mjs` roda em `npm run deploy:*` e
recusa a publicação enquanto houver campo `PENDENTE` ou horário não confirmado.
Não é um teste da suíte.

**Por quê.** Como teste, ele ficaria vermelho por semanas — enquanto as lojas
não respondem — e **suíte que sempre falha deixa de ser sinal**, que é o mesmo
motivo pelo qual o teste do `codex-preview` foi substituído em vez de remendado.
Como trava de deploy, ele aparece exatamente na hora que importa: a de publicar.

Existe escotilha (`DEPLOY_COM_PENDENCIAS=1`) porque pode haver motivo legítimo
para publicar com o WhatsApp ainda desabilitado — mas ela é explícita e deixa
rastro, em vez de ser o comportamento padrão.

**Descartado.** Deixar como teste vermelho (deixa de ser sinal) e não checar
nada (o `CLAUDE.md` manda que nenhum número vá ao ar sem confirmação da loja).

---

## 2026-09-08 · Hospedagem em Cloudflare Workers, na conta da agência

**Decisão.** Os dois sites rodam em **Cloudflare Workers**, numa conta própria
da agência, publicados por push no GitHub via Workers Builds. Plano gratuito.

**Por quê — e este é o motivo que faltava escrito:** o site é de um **cliente
terceiro**, e isso elimina a opção mais óbvia. O plano Hobby da Vercel proíbe
uso comercial, e a definição deles é ampla: qualquer deploy que gere ganho
financeiro para alguém envolvido na produção, **incluindo quem escreveu o
código**. Site institucional de loja e projeto faturado são ambos comerciais.

Entre as que permitem uso comercial no plano gratuito, a Cloudflare ganha por
uma característica que importa muito para este projeto especificamente: **as
requisições a arquivos estáticos são gratuitas e ilimitadas, e não há cobrança
de egresso**. O site é 90% foto. Esse é o maior custo do projeto, e ele é zero.

A Netlify foi descartada menos pelo limite e mais pelo **modo de falha**: o
plano gratuito novo dá cerca de 15 GB/mês, e ao estourar **todos os sites da
conta são pausados** até virar o mês. Num site de cliente isso é inaceitável.
Para efeito de conta: um case com dez fotos de 300 KB é 3 MB, o que dá cerca de
5.000 visualizações mensais antes de tudo sair do ar.

**O limite que resta.** O vinext ainda não pré-renderiza em build — só faz ISR.
Então **cada página vista é uma invocação de Worker**, e o plano gratuito dá
100.000 por dia. Com 2.000 visitas diárias e 8 páginas por visita são 16.000:
sobra folga de 6×. Se um dia apertar, o plano pago é US$ 5/mês para a conta
inteira, cobrindo os dois sites.

**Descartado.** Vercel (proíbe uso comercial no gratuito), Netlify (banda baixa
e pausa a conta inteira ao estourar), GitHub Pages (só estático, não roda o
Worker que o formulário e o ISR precisam).

---

## 2026-09-08 · Descolamento do OpenAI Sites

**Decisão.** Removidos `.openai/hosting.json`, `scripts/install-ci.sh`,
`scripts/build-verified.sh`, `scripts/sites-env.sh` e
`build/sites-vite-plugin.ts`. O `vite.config.ts` perdeu o plugin do Sites, a
leitura do `hosting.json` e o desvio de HMR para o sandbox do Codex.

**Por quê.** Na Fase 1 esses arquivos foram preservados de propósito, porque a
hospedagem presumida era o OpenAI Sites e o builder remoto dependia deles. Com
a decisão de publicar na conta Cloudflare da agência, essa razão deixou de
existir — e eles apontavam para um `project_id` de outra plataforma.

**Descartado.** Manter os dois caminhos convivendo, o que deixaria dois
mecanismos de publicação concorrentes e uma configuração morta apontando para
um projeto que não é nosso.

---

## 2026-09-08 · node_modules e dist ficam fora da pasta do Google Drive

**Decisão.** No ambiente local, `node_modules` e `dist` são links simbólicos
para `~/.cache/dalmobile-build/`. O código-fonte continua no Drive.

**Por quê.** Medido: o build **não terminava em 15 minutos** com as duas pastas
no Drive, e roda em **2 segundos** com elas fora. O `vinext build` ficava
bloqueado em I/O enquanto o Google Drive tentava sincronizar cada um dos
milhares de arquivos que o build escreve. Chegou a travar até um `cat` de
arquivo pequeno. Sincronizar `node_modules` e `dist` não traz benefício nenhum:
são gerados, descartáveis e já ignorados pelo Git.

**Atenção ao reinstalar:** `npm install` rodando na pasta do Drive **substitui
o link simbólico de `node_modules` por diretório real**. Instale em
`~/.cache/dalmobile-build/` e refaça o link.

**Descartado.** Mover o repositório inteiro para disco local (funciona, mas tira
o projeto do Drive que a agência usa para compartilhar) e pausar a sincronização
durante o trabalho (frágil: basta esquecer uma vez).

---

## 2026-09-04 · Estilo em CSS Modules, um arquivo por componente

**Decisão.** Cada componente tem seu `.module.css` ao lado. O `globals.css`
fica só com o reset e o que é global de verdade.

**Por quê.** Escopo automático, sem prefixo manual e sem colisão de nome — o
estudo já tinha `.header` genérico brigando com três variantes. Vem com o Vite,
não é dependência nova.

**Descartado.** Continuar num `globals.css` único (foi o que produziu as 533
linhas com dois blocos conflitantes que a Fase 1 teve de fundir) e CSS-in-JS
(dependência nova, e roda no cliente num site que quer server components).

---

## 2026-09-04 · Os dados da unidade num módulo de transição, não espalhados

**Decisão.** `app/dados-unidade.ts` guarda tudo da loja desde a Fase 2, embora a
camada de config só seja a Fase 3.

**Por quê.** O cabeçalho e o rodapé precisam de endereço, telefone e horário
agora. Escrevê-los dentro dos componentes e migrar depois seria criar exatamente
o erro que o `CLAUDE.md` manda tornar impossível — e um teste já falha se um
nome de cidade aparecer dentro de `components/`.

**Descartado.** Adiantar a camada de config inteira para a Fase 2 (seleção por
ambiente, dois alvos de build, tipagem, teste de cidade cruzada — é fase própria)
e usar placeholders (os dados reais já estavam disponíveis).

---

## 2026-09-04 · O menu de tablet é o painel de tela cheia, não a barra horizontal

**Decisão.** A navegação horizontal só aparece a partir de **1025px**. De 601 a
1024px vale o mesmo painel do telefone.

**Por quê.** O `CLAUDE.md` já manda painel de tela cheia no tablet, e a razão
aparece na conta: lockup com nome de unidade + cinco itens de menu + ação de
contato não cabem em 768px sem espremer o item a menos de 44px ou quebrar o
título em duas linhas. O tablet é onde quebra — é a faixa que o documento chama
de "a que todo mundo esquece".

**Descartado.** Barra horizontal com itens menores no tablet (viola o alvo de
toque de 44px) e menu horizontal com scroll lateral (viola "nenhuma rolagem
horizontal, em nenhuma largura").

---

## 2026-09-04 · O binding `env.IMAGES` não existe; as variações de imagem serão geradas no build com `sharp`

**O que foi verificado.** O `worker/index.ts` atende `/_vinext/image` chamando
`env.IMAGES.input(...)`. O binding não é declarado em lugar nenhum:

- `.openai/hosting.json` → `{"d1": null, "r2": null}`, sem menção a images
- `vite.config.ts`, em `localBindingConfig` → só `d1_databases` e `r2_buckets`
- `dist/server/wrangler.json`, o build real → nenhuma chave `images`; `image-config.json` está vazio

Ou seja: **a rota `/_vinext/image` lança em produção hoje.** Não se percebeu
porque a página de estudos usa `<img src>` puro e nunca exercitou o endpoint.

**Decisão.** Gerar as variações de imagem no build com `sharp` e servir
estático, em vez de contratar o Cloudflare Images.

**Por quê.** O site é 90% imagem e o `CLAUDE.md` exige `next/image` em todas as
fotos, com `sizes` por breakpoint. Depender de um binding que não existe, e que
é pago, cria um custo recorrente e um ponto de falha para um acervo que muda
poucas vezes por mês. Gerar no build é determinístico e sai de graça.

**Descartado.** Declarar o binding Images no Cloudflare (custo recorrente e
dependência de plano) e servir `<img>` sem otimização (o `CLAUDE.md` proíbe, e
servir imagem de desktop no celular é o erro mais caro do projeto).

**Ainda não implementado.** A dependência `sharp` e o passo de build entram na
Fase 4, quando as fotos de verdade e o `next/image` entrarem. Adicioná-la agora
deixaria uma dependência sem uso no `package.json`, contra o critério da Fase 1.

---

## 2026-09-04 · A paleta em `app/tokens.css` é provisória, e vem do estudo — não do `CLAUDE.md`

**Decisão.** A camada 1 do arquivo de tokens carrega os onze neutros **quentes**
medidos do estudo 03 Síntese (`#f5f4f0`, `#20211f`, `#111211`…), e não a paleta
acromática do `CLAUDE.md` (`#171614`, `#8B8884`, `#C9C6C1`, `#F2F1EE`).

**Por quê.** As duas não são a mesma paleta — a do estudo é quente, a do
`CLAUDE.md` é neutra —, e as cores definitivas ainda não foram fechadas com a
loja. Trocar agora mudaria a temperatura do estudo que o cliente aprovou, sem
que a alternativa esteja confirmada.

**Como fica barato de reverter.** A cor é declarada em duas camadas. O
componente só fala com a camada semântica (`--preto`, `--cinza`, `--cinza-clr`,
`--papel`, `--branco`), cujos nomes são os do `CLAUDE.md` e não mudam. Quando as
cores da marca chegarem, **trocar onze linhas troca o site inteiro**.

**Descartado.** Aplicar a paleta do `CLAUDE.md` já na Fase 1 (mudaria o estudo
aprovado antes de haver decisão) e deixar cor literal espalhada até as cores
chegarem (é exatamente o que a Fase 1 existe para acabar).

---

## 2026-09-04 · A escala tipográfica e de espaço segue o `CLAUDE.md`, não o estudo

**Decisão.** Os tokens de tipografia e espaço reproduzem a tabela do
`CLAUDE.md` — Display XL 64px no desktop e 40px no mobile, escala de espaço base
8 — e não os valores do estudo, cujo `h1` chegava a `clamp(64px, 6.2vw, 102px)`
e cujos espaçamentos (`52px`, `30px`, `54px`, `7px`) não caíam em escala nenhuma.

**Por quê.** O `docs/direcao-site.md` resolve a precedência por escrito: *"Se
este documento parecer contradizer o `CLAUDE.md`, o `CLAUDE.md` vence"*, e o
`CLAUDE.md` manda em escala tipográfica e grade. A direção também descreve as
páginas usando os nomes da tabela ("Display XL", "Display L", "Subtítulo"), o
que só faz sentido se a tabela for a régua.

**Consequência a olhar na Fase 2.** O site vai ficar **visivelmente mais quieto**
que o estudo: um título de abertura de 64px onde o estudo mostrava até 102px.
Isso é coerente com a seção 2 da direção ("se uma tela parecer fraca, a correção
é aumentar a foto ou tirar elementos — nunca engordar a tipografia"), mas é uma
diferença que vale ver renderizada antes de seguir.

**Descartado.** Extrair a escala do estudo, que contradiz a tabela do `CLAUDE.md`
e não tem procedência rastreável para nenhum dos seus números.

---

## 2026-09-04 · O véu sobre foto continua no código, marcado para morrer

**Decisão.** Os tokens `--veu-*` e as regras `.synthesis-shade`,
`.immersive-shade` e `.synthesis-project-featured::after` foram mantidos, com
comentário dizendo que são temporários.

**Por quê.** Escurecer foto é proibido pelo `CLAUDE.md` e pela seção 13 da
direção. Mas a página que os usa é a de **estudos**, um andaime de revisão que
sai inteiro na Fase 2. Removê-los agora quebraria a legibilidade da página que
o cliente ainda está usando para revisar, e seria redesenhar na fase que
explicitamente proíbe redesenhar.

**Descartado.** Apagar os véus na Fase 1 (quebra o andaime antes da hora) e
deixá-los sem marcação (viraria dívida silenciosa e alguém os copiaria para um
componente novo).

---

## 2026-09-04 · Sem biblioteca de ícones; SVG inline à mão

**Decisão.** `lucide-react` removido. Os ícones do site — seta, hambúrguer,
fechar, WhatsApp — serão SVG inline escritos à mão, a partir da Fase 2.

**Por quê.** São menos de dez ícones em todo o site. Uma biblioteca inteira para
isso contraria o "não instalar biblioteca de UI" do `CLAUDE.md` e adiciona peso
a um site cuja prioridade é imagem chegando rápido no 4G.

**Descartado.** Manter `lucide-react` (dependência inteira para meia dúzia de
formas) e usar fonte de ícone (a tipografia é decisão travada: Krub e só Krub).

---

## 2026-09-04 · Um teste do template foi substituído em vez de consertado

**Decisão.** `tests/rendered-html.test.mjs` foi reescrito.

**Por quê.** Ele exigia uma `<meta name="codex-preview" content="development">`.
Essa string não existe em lugar nenhum do projeto além do próprio regex do
teste: nem no `vinext`, nem no `app/layout.tsx`, nem na cópia intocada do site
de Caraguá, nem no `layout.tsx` do commit original. Era resto do ambiente de
preview do OpenAI Sites, quebrado desde que o `layout.tsx` do template foi
substituído pelo da Dalmóbile. **Nunca poderia passar neste repositório.**

**Descartado.** Emitir a meta só para satisfazer o teste (seria mentir sobre o
ambiente) e deixar o teste vermelho (uma suíte que sempre falha deixa de ser
sinal).

---

## 2026-09-04 · Os scripts de build do template ganharam um caminho local

**Decisão.** `build` e `lint` passaram a rodar direto (`vinext build`,
`eslint`). Os originais foram preservados como `build:ci` e `install:ci`.

**Por quê.** `scripts/build-verified.sh` exige o `timeout` do GNU e
`scripts/install-ci.sh` exige `flock`, `sha256sum` e `/proc`. Nada disso existe
no macOS, que é a máquina de desenvolvimento. Os scripts saíam com código 69
antes de tentar qualquer coisa — o critério "`npm run build` passa" era
inalcançável por motivo de sistema operacional, não de código.

**Descartado.** Instalar `coreutils` via Homebrew (empurra requisito de máquina
para quem entrar depois) e apagar os scripts de CI (o builder remoto do Sites os
usa).
