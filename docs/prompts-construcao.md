# Prompts de construção — site Dalmóbile no Claude Code

Uma fase por sessão. Revisar o resultado antes de passar para a próxima.

---

## Os documentos e quem manda em quê

```
CLAUDE.md                    regras, tokens, paleta, escala, forma,
                             responsividade e stack — lido automaticamente
docs/direcao-site.md         o que cada página tem, em que ordem, e por quê
docs/prompts-construcao.md   este arquivo: as nove fases
```

**Regra de precedência:** onde os dois primeiros parecerem discordar, **o `CLAUDE.md` vence**. Ele é a especificação; o `direcao-site.md` é composição. Nenhum valor de cor, tamanho ou espaçamento aparece nos dois — se aparecer, é bug de documentação e precisa ser corrigido no `direcao-site.md`.

---

## Antes de começar

**1. Não peça para "aprender o arquivo".** O `CLAUDE.md` na raiz entra como contexto sozinho, em toda sessão. Pedir para ler e resumir só gasta contexto.

**2. Faça uma leitura crítica, uma vez só.** Antes da fase 1, cole:

```
Leia o CLAUDE.md e o docs/direcao-site.md deste repositório e o código atual.

Não escreva nem altere nada ainda. Me responda três coisas:

1. Onde as regras dos dois documentos se contradizem entre si, ou contradizem
   o que já existe no código.
2. Que decisões estão ambíguas o bastante para você precisar chutar.
3. O que você acha que vai ser mais difícil de cumprir, e por quê.

Seja específico e cite trechos.
```

Isso derruba as contradições antes de virarem código. É a única coisa que vale fazer antes de construir.

**3. Uma sessão nova por fase**, e commit entre elas. Contexto acumulado de fase anterior atrapalha mais do que ajuda, e commit por fase te dá para onde voltar.

**4. O primeiro commit é a base intacta**, antes de qualquer limpeza. É o arquivo morto dos três estudos de layout — se um dia alguém quiser rever o Editorial ou o Imersiva, está no histórico.

---

## Fase 1 — Limpeza e tokens

```
Fase 1 de 9. Só limpeza e design system. Não crie páginas novas nesta fase.

CONTEXTO
O repositório veio do template site-creator-vinext-starter e carrega muita
coisa que este projeto não usa. O desenho que vale está no estudo
"03 Síntese" do app/page.tsx atual.

FAÇA
1. Remova, conforme a seção "Não adicionar" do CLAUDE.md:
   - components/ui/ inteiro (60 componentes shadcn, nenhum importado)
   - drizzle-orm, drizzle-kit, db/, drizzle/, examples/, drizzle.config.ts
   - app/chatgpt-auth.ts
   - Tailwind e vendor/shadcn-tailwind-*.css, e os @import do globals.css
   - as dependências de produção sem uso listadas no CLAUDE.md
   - public/globe.svg, window.svg, file.svg
   Mantenha o worker/ e o runtime Cloudflare.

2. Do CSS atual, extraia o design system do estudo 03 Síntese para tokens
   em um único arquivo, seguindo a paleta, a escala tipográfica e a escala
   de espaço do CLAUDE.md. Hoje há 37 hex literais e 5 variáveis, sendo
   uma nunca usada. Depois desta fase não pode existir hex literal
   fora do arquivo de tokens.

3. Apague o CSS morto: o estudo "atelier" inteiro, as regras órfãs da
   Síntese antiga, as media queries duplicadas, o sistema de botões
   nunca usado.

4. Configure a Krub self-hosted com os pesos 300, 400 e 600 apenas,
   com a stack de fallback do CLAUDE.md.

5. Verifique se o binding env.IMAGES existe no ambiente Cloudflare.
   Me diga o que encontrou — não decida sozinho o plano B.

NÃO FAÇA
Não crie rotas, não mexa em conteúdo, não redesenhe nada.

PRONTO QUANDO
- npm run build passa
- o arquivo de tokens existe e nenhum componente tem hex literal
- package.json só tem o que o site usa
- docs/design-system.md escrito, com os tokens e exemplo de uso
- CHANGELOG.md criado com esta entrega
```

---

## Fase 2 — Layout base

```
Fase 2 de 9. Cabeçalho, rodapé e as três superfícies. Ainda sem páginas.

FAÇA
1. Componente de cabeçalho: lockup da marca com o nome da unidade embaixo,
   cinco itens de menu, botão de WhatsApp. Fixo após 80px de rolagem,
   com fundo sólido da superfície em que está.

2. Menu mobile de verdade: painel de tela cheia, handler funcionando,
   foco preso dentro do painel enquanto aberto, fecha com Esc.
   O código atual tem um botão hambúrguer com aria-label e sem handler —
   não repita isso.

3. Componente de rodapé: quatro colunas no desktop, dados da unidade,
   link para a outra loja, políticas. É mapa do site, não assinatura.

4. As três superfícies (preto, cinza, papel) como classes ou componente
   de seção, com a regra de no máximo quatro trocas por página.

5. :focus-visible visível em todo elemento focável. Não existe hoje.

6. Uma página de teste temporária que renderize os três componentes nas
   três superfícies, para eu revisar. Ela sai na fase seguinte.

PRONTO QUANDO
- testado nas seis larguras da matriz do CLAUDE.md, sem rolagem horizontal
- menu mobile abre, fecha com Esc e prende o foco
- cada componente tem cabeçalho de comentário dizendo o que é, onde é
  usado e que props recebe
- CHANGELOG atualizado
```

---

## Fase 3 — Camada de config por unidade

```
Fase 3 de 9. A camada que faz um código gerar dois sites.

FAÇA
1. config/sjc.ts e config/caragua.ts, com: nome da unidade, endereço,
   telefone, WhatsApp, horário, mapa, Google Business, GA, pixel — e
   a composição da home e o conjunto de páginas daquele site.

2. Seleção por variável de ambiente no build, e dois alvos de build.

3. Tipagem do config, para campo faltando quebrar o build e não o site.

4. Cabeçalho e rodapé passam a ler tudo do config. Nenhum dado de
   unidade escrito direto em componente.

5. Um teste que falhe se o build de Caraguá contiver a string
   "São José dos Campos" em qualquer lugar, e vice-versa. Esse erro já
   aconteceu no site anterior; quero ele impossível.

PRONTO QUANDO
- os dois builds rodam e produzem cabeçalho e rodapé corretos
- o teste de cidade cruzada passa
- docs/unidades.md escrito: o que cada campo faz e onde aparece
```

---

## Fase 4 — Case e índice de projetos

```
Fase 4 de 9. O gabarito mais usado do site. Leia a seção 8 do
docs/direcao-site.md antes de começar.

FAÇA
1. Conteúdo de projeto em Markdown com frontmatter: slug, título,
   edifício, bairro, cidade, ano, ambientes, acabamentos, arquiteto,
   unidades: [sjc | caragua | ambos], fotos com legenda.

2. /projetos — índice em superfície preta, filtro por ambiente e por
   edifício, estado do filtro na URL para o link ser compartilhável.
   Grade de 2 colunas no desktop, 1 no mobile e até 820px.

3. /projetos/[slug] — os nove blocos da seção 8 da direção, incluindo
   ficha técnica, galeria de fotos grandes empilhadas e
   "outros projetos neste edifício".

4. next/image em todas as fotos, com sizes correto por breakpoint.

5. Use dois ou três projetos de exemplo. As fotos e os dados reais
   ainda não estão confirmados — deixe claro no código o que é exemplo.

PRONTO QUANDO
- as seis larguras passam; no iPad a ficha técnica vai abaixo da foto
- nenhum CTA aponta para a própria seção
- docs/adicionar-projeto.md escrito: onde colocar as fotos, como nomear,
  campos obrigatórios, como marcar a unidade, como conferir antes de
  publicar. Este é o documento mais importante do repositório.
```

---

## Fase 5 — Ambientes

```
Fase 5 de 9.

FAÇA
1. /ambientes — hub em superfície papel, grade 4/3/2 colunas.
2. /ambientes/[slug] — texto do ambiente, galeria reunindo fotos de
   projetos diferentes com crédito de origem, e os cases que contêm
   aquele ambiente.
3. O cruzamento nos dois sentidos: ambiente aponta para projeto,
   projeto aponta para ambiente.
4. Conteúdo dos oito ambientes de SJC em Markdown. Os textos já existem
   e eu vou colar — deixe a estrutura pronta para recebê-los.

PRONTO QUANDO
- seis larguras passam
- docs/adicionar-ambiente.md escrito
```

---

## Fase 6 — Home

```
Fase 6 de 9. Leia a seção 6 do docs/direcao-site.md.

FAÇA
Os oito blocos, na ordem e nas superfícies descritas. Atenção especial:

- A abertura NÃO tem texto sobre a foto. A foto entra inteira, 16:9,
  altura máxima 78vh, e o título vive numa faixa preta abaixo dela.
  O código atual escurece a foto — não repita.
- Destaques alternando lado, foto 3:2 em dois terços da largura.
  No mobile empilha, sempre foto primeiro.
- "Edifícios onde já estamos" é lista tipográfica, sem foto.
- Faixa de números: versão curta, três números, e só entram os
  confirmados. Se eu não tiver confirmado, deixe o slot comentado.

PRONTO QUANDO
- seis larguras passam, sem 100vh em lugar nenhum
- a home não repete o mesmo botão descendo a página
```

---

## Fase 7 — Institucional, arquitetos e a loja

```
Fase 7 de 9. Seções 10, 11 e 12 do docs/direcao-site.md.

FAÇA
1. /a-dalmobile — superfície papel, texto longo em medida de 62 a 66
   caracteres, processo em etapas numeradas, faixa de números completa,
   FAQ como seção indexável (não acordeão de venda).
2. /arquitetos — parceria, lista de arquitetos parceiros com os projetos
   que assinaram, formulário próprio separado do de cliente final.
3. /a-loja — mapa, endereço, horário, fachada, formulário.
4. Formulário: quatro campos mais faixa de investimento, checkbox de
   consentimento com link para a privacidade. Destino do envio: Worker
   do Cloudflare mandando e-mail para a unidade correta.

PRONTO QUANDO
- seis larguras passam
- o formulário envia e o lead identifica de qual unidade veio
```

---

## Fase 8 — 404, privacidade, SEO e schema

```
Fase 8 de 9. É a fase que faz o site existir para o Google.

FAÇA
1. /404 e /privacidade.
2. Metadata por página: title e description com a cidade da unidade,
   em toda página, geradas a partir do config.
3. OpenGraph por página, com imagem gerada da foto de capa do case.
   O vendedor manda o link no WhatsApp; o preview é o produto.
4. Schema LocalBusiness por unidade, gerado do config.
5. sitemap.ts e robots.ts por unidade.
6. Redirects das URLs que o Google já indexou dos sites antigos.

PRONTO QUANDO
- o checklist "Obrigatório antes de qualquer deploy" do CLAUDE.md
  passa inteiro, item por item
- me mostre o resultado do checklist, marcado
```

---

## Fase 9 — Caraguá e verificação cruzada

```
Fase 9 de 9.

FAÇA
1. Preencher config/caragua.ts com os dados reais da unidade.
2. Conteúdo de projetos e ambientes de Caraguá.
3. Rodar o teste de cidade cruzada nos dois builds.
4. Revisão final lado a lado dos dois sites, nas seis larguras.
5. README.md completo: como rodar, como buildar cada unidade, como
   publicar, e onde ficam os documentos.
6. docs/decisoes.md com o log completo: por que Krub, por que sem cor
   de acento, por que um repositório para dois sites, por que sem CMS,
   por que a foto não é escurecida, por que sem blog na v1.

PRONTO QUANDO
- os dois builds passam e nenhum menciona a cidade do outro
- a documentação está completa o suficiente para outra pessoa publicar
  um projeto novo sem falar comigo
```

---

## O que ainda trava

Duas perguntas de conteúdo continuam sem resposta e vão barrar as fases 4 e 6:

- **As fotos são projetos executados pela Dalmóbile?** Os nomes de arquivo do estudo (`casacor-madeira`, `spa-vivix`, `le-tt`, `refugio-poeta`) não batem com nenhuma pasta do acervo.
- **Os números estão confirmados com a loja?** 49 anos, 500+ acessórios, 6 anos de garantia.

Dá para construir até a fase 3 sem isso. Da fase 4 em diante, não.
