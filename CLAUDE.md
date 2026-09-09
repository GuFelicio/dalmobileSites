# Dalmóbile — site institucional

Dois sites (São José dos Campos e Caraguatatuba) gerados de **um repositório só**.
Cliente: Dalmóbile, móveis planejados, fábrica com quase cinco décadas. Marca do grupo Orizon.

---

## Regra zero

Este é um **site institucional**, não uma landing page. A pessoa chega por qualquer porta — do Google numa página de ambiente, do WhatsApp num projeto. Toda página se sustenta sozinha, tem cabeçalho completo, caminho de navegação e rodapé com dados da unidade.

O ativo do cliente é **projeto executado, fotografado de verdade, com o arquiteto que assinou**. Todo o desenho existe para essas fotos aparecerem grandes e intactas. Interface que chama atenção para si é interface errada.

---

## Arquitetura: um código, dois sites

```
config/sjc.ts       →  build  →  dalmobilesjc.com.br
config/caragua.ts   →  build  →  dalmobilecaraguatatuba.com.br
```

O config carrega os dados da unidade **e** a composição da home e o conjunto de páginas daquele site. Não é ficha de contato: é a camada que decide o que cada site mostra.

Cada projeto do portfólio declara onde aparece:
```yaml
unidades: [sjc]          # ou [caragua] ou [sjc, caragua]
```

**Nunca duplicar componente, estilo ou texto por unidade.** Se algo precisa ser diferente, vira campo no config. Foi assim que o site anterior acabou indexado com "Móveis Planejados em São José dos Campos" no domínio de Caraguá.

---

## Mapa de rotas

```
/                          Home — índice, não funil
/projetos                  Índice filtrável por ambiente e por edifício
/projetos/[slug]           Case — o gabarito mais usado do site
/ambientes                 Hub
/ambientes/[slug]          Página do ambiente
/a-dalmobile               Institucional, processo, números, FAQ
/arquitetos                Parceria
/a-loja                    Endereço, mapa, horário, contato
/privacidade
/404
```

Navegação sempre com `next/link`. **Âncora só dentro da própria página, nunca como substituto de rota.**

---

## Design — decisões fechadas, não reabrir sem pedir

### Paleta — acromática
```
--preto     #171614   wordmark, tarja, superfície de imagem
--cinza     #8B8884   cinza da marca: faixas de costura, rodapé
--cinza-clr #C9C6C1   linhas sobre escuro, estados desativados
--papel     #F2F1EE   fundo das páginas de leitura
--branco    #FFFFFF   superfície elevada, reverso do wordmark
```

**Não existe cor de acento.** Se faltar destaque, a resposta é escala ou troca de superfície — nunca cor nova. Único desvio: verde e vermelho de sistema em erro e sucesso de formulário, no menor tamanho possível.

Todo valor de cor vem de token. **Zero hex literal em componente.**

### Superfícies — três fundos, um por função
- **Preto** — abertura, faixa de projetos, índice de projetos, cases, galerias. A imagem manda.
- **Cinza** — faixas de transição, números, rodapé, tiras de chamada. Costura.
- **Papel** — institucional, arquitetos, a loja, ambientes, FAQ, privacidade, 404. O texto manda.

Máximo **quatro trocas de superfície por página**.

### Tipografia — Krub, e só Krub

**A fonte é decisão travada. Nunca trocar, nunca somar uma segunda família — nem "só para este componente", nem para ícone, nem para número.** Se algo parecer precisar de outra fonte, o problema é de escala, peso ou tracking. Pergunte antes.

Self-hosted via `@fontsource/krub`. Carregar só os pesos usados: **300, 400, 600** — não importar 500 nem 700. Nada de Google Fonts por CDN: a fonte vem do bundle.

Stack de fallback obrigatória em toda declaração:
```css
font-family: "Krub", "Segoe UI", system-ui, -apple-system, sans-serif;
```

Hierarquia por escala e tracking, nunca por engordar peso:
| Papel | Desktop | Mobile | Peso | Tracking |
|---|---|---|---|---|
| Display XL | 64px | 40px | 300 | −0.065em |
| Display L | 48px | 32px | 300 | −0.055em |
| Seção | 34px | 26px | 300 | −0.04em |
| Subtítulo | 22px | 20px | 400 | −0.01em |
| Texto | 17px / 1.62 | 16.5px | 400 | 0 |
| Rótulo | 10.5px | 10.5px | 600 | 0.24em, caixa alta |

Medida de leitura **62 a 66 caracteres**. Nunca texto corrido em largura total.

### Forma
- **`border-radius: 0` em tudo.** Foto, card, botão, campo, chip. Junta precisa, como a marcenaria.
- Separação por fio de 1px e por espaço. **Zero sombra.**
- Alinhamento **à esquerda** em tudo. Nada centralizado.
- Escala de espaço base 8: 8 · 16 · 24 · 40 · 64 · 96 · 128. Entre seções: 128 desktop, 72 mobile.

### Foto
- **Nunca escurecida, nunca com filtro, nunca dentro de card com sombra.**
- Na abertura, a foto entra inteira e o título vive numa faixa preta **abaixo** dela. A imagem é o produto; escurecer para caber texto joga fora o ativo.
- Se um dia precisar de texto sobre imagem, use painel sólido ancorado, não overlay na foto inteira.

### Movimento
Mínimo e lento. Fade de 400ms **partindo de visível**. Hover em card: `scale(1.02)` em 600ms. Fio de 1px sob o item de navegação.
Proibido: parallax, scroll sequestrado, carrossel automático, contador animado.
`@media (prefers-reduced-motion: reduce)` obrigatório.

---

## Responsividade — requisito, não ajuste final

O cliente abre no celular, por 4G, quase sempre por link de WhatsApp. **Toda tela é desenhada e testada em mobile antes de existir em desktop.**

### Faixas
```
Mobile    até 600px      1 coluna sempre
Tablet    601 – 1024px   a faixa que todo mundo esquece
Desktop   1025px +
```

**O tablet é onde quebra.** Grade de 2 colunas que funciona em desktop e em mobile costuma estourar entre 700 e 1000px: card espremido, título quebrando em três linhas, ficha técnica ilegível. Testar **retrato (768×1024) e paisagem (1024×768) separadamente** — são layouts diferentes, não o mesmo em outra ordem.

### Regras por componente

| Componente | Mobile | Tablet | Desktop |
|---|---|---|---|
| Grade de projetos | 1 coluna | 1 coluna até 820px, depois 2 | 2 colunas |
| Grade de ambientes | 2 colunas | 3 colunas | 4 colunas |
| Case: foto + ficha | ficha abaixo da foto | ficha abaixo da foto | ficha em coluna lateral |
| Destaque alternado | foto e texto empilhados, sempre foto primeiro | empilhado | lado a lado alternando |
| Faixa de números | 1 por linha | 2 por linha | tudo em linha |
| Rodapé | acordeão ou colunas empilhadas | 2 colunas | 4 colunas |
| Menu | painel de tela cheia | painel de tela cheia | horizontal |

### Regras duras

- **Nenhuma rolagem horizontal, em nenhuma largura.** Tabela, galeria e bloco largo rolam dentro do próprio contêiner com `overflow-x: auto`, nunca no `body`.
- **Alvo de toque mínimo de 44×44px**, com espaço entre alvos vizinhos.
- **Foto sangra até a borda no mobile**; texto mantém a margem de 20px.
- **Nada de `100vh`** — usar `100svh` ou altura de conteúdo. A barra do navegador móvel quebra `vh`.
- Tipografia pela coluna mobile da tabela de escala. Título não passa de 4 linhas em nenhuma largura.
- Imagem sempre com `sizes` correto. Servir imagem de desktop no celular é o erro mais caro do projeto.
- O menu mobile precisa de handler de verdade, foco preso dentro do painel enquanto aberto, e fechar com `Esc`.

### Matriz mínima de teste antes de dar qualquer página por pronta
```
390 × 844    iPhone padrão
430 × 932    iPhone grande
768 × 1024   iPad retrato
1024 × 768   iPad paisagem
1280 × 800   notebook
1920 × 1080  desktop
```

---

## Conteúdo — regras duras

**Só foto de projeto executado pela Dalmóbile.** Nunca render, nunca banco de imagem, nunca registro de obra em apartamento vazio. Arquiteto identifica na hora, e é o único ativo que a concorrência não tem.

**Nenhum número vai ao ar sem confirmação da loja.** Anos de fábrica, garantia, prazo, quantidade de projetos. Sem confirmação, usar formulação verdadeira sem número ("mais de 40 anos").

**Crédito do arquiteto em todo projeto que tiver um**, com autorização prévia. Nenhum concorrente de SJC faz isso.

**Ficha técnica em todo case:** local (edifício e bairro) · ano · ambientes · acabamentos com nome e código · arquiteto.

**Nunca mencionar São José dos Campos no site de Caraguá, nem o contrário.** Verificação obrigatória antes de qualquer deploy.

### Microcópia
Direta, sem linguagem de funil.
- Ações: `Ver projetos` · `Ver projeto` · `Falar sobre um projeto assim` · `Falar no WhatsApp` · `Enviar`
- Confirmação: "Recebemos. Respondemos em até um dia útil."
- Erro: diz o que fazer, não pede desculpa — "Falta o telefone com DDD"

**Proibido:** "Quero meu projeto", "Solicite seu orçamento grátis", "Transforme seu lar", "alto padrão", selo inventado, contador de urgência.

---

## Documentação — outras pessoas vão manter este código

Quem entra depois não vai ter esta conversa. **O que não estiver escrito no repositório, não existe.**

### Documentar junto, nunca depois
Toda alteração e todo componente novo saem com a documentação na mesma entrega. Trabalho sem doc não está pronto.

### Estrutura
```
CLAUDE.md              este arquivo — as regras
README.md              como rodar, buildar e publicar
docs/decisoes.md       log de decisões: data · o que · por quê · o que foi descartado
docs/design-system.md  tokens, escala, componentes, com exemplo de uso
docs/adicionar-projeto.md    passo a passo para publicar um projeto novo
docs/adicionar-ambiente.md   idem para ambiente
docs/unidades.md       o que cada campo do config faz e onde aparece no site
CHANGELOG.md           o que mudou em cada versão
```

O `docs/adicionar-projeto.md` é o mais importante de todos: é a tarefa que outra pessoa vai repetir dezenas de vezes. Precisa cobrir onde colocar as fotos, como nomear, quais campos são obrigatórios, como marcar em qual unidade aparece, e como conferir antes de publicar.

### No código
- **Cabeçalho em todo componente:** o que é, onde é usado, que props recebe. Duas ou três linhas.
- **Todo número mágico no CSS ganha comentário** dizendo de onde veio. `padding: 52px` sem explicação é dívida.
- **Toda regra de responsividade comenta o que ela resolve** — o próximo dev não sabe que aquele breakpoint existe por causa da ficha técnica no iPad.
- Comentários em **português**. O time é brasileiro.

### Nomenclatura — escolher e não misturar
- **Rotas, slugs, conteúdo e nomes de arquivo de conteúdo:** português (`/a-dalmobile`, `projetos/rizzuti-dr-marcos.md`)
- **Código e classes CSS:** inglês (`ProjectCard`, `.project-card`, `.hero-panel`)

O código atual mistura os dois — há `#sintese-contato` convivendo com `.synthesis-shade`. Padronizar na limpeza inicial.

### Log de decisões
Toda escolha que alguém possa querer desfazer entra em `docs/decisoes.md`, com data e motivo. Exemplos que já pertencem a ele: por que Krub e não outra fonte, por que sem cor de acento, por que um repositório para dois sites, por que sem CMS, por que a foto não é escurecida.

Sem isso, daqui a seis meses alguém "melhora" o site desfazendo tudo — de boa-fé, por não saber que era decisão.

---

## Stack

Base: template `site-creator-vinext-starter` — **vinext + Vite + Cloudflare Workers**.

Mantém: o runtime Cloudflare. O site é 90% imagem, e toda foto de conteúdo passa pelo componente **`components/midia/Foto.tsx`**, com `sizes` obrigatório e `prioridade` só na foto de abertura.

> **`next/image` não é usado, e a verificação está feita.** O binding `env.IMAGES` não existe na conta e é pago; além disso, o shim de `next/image` do vinext **desliga o `srcSet` quando recebe um loader próprio**, servindo um arquivo só. As variações são geradas no build por `build/gerar-imagens.mjs` com `sharp`, e o `<Foto>` monta `srcSet` e `sizes` de verdade. Ver `docs/decisoes.md`.

> O endpoint `/_vinext/image` continua em `worker/index.ts` mas **não é exercitado** — nenhuma foto o chama.

### Não adicionar, e remover o que já está
- `components/ui/` — 60 componentes shadcn, nenhum usado
- `drizzle-orm`, `drizzle-kit`, `db/`, `drizzle/`, `examples/d1/`, `drizzle.config.ts` — o site não tem banco
- `app/chatgpt-auth.ts` — o site não tem login
- Tailwind e `vendor/shadcn-tailwind-*.css` — o CSS é escrito à mão
- Dependências sem uso: recharts, embla-carousel, react-day-picker, date-fns, cmdk, vaul, sonner, react-hook-form, zod, next-themes, input-otp, react-resizable-panels
- `public/globe.svg`, `window.svg`, `file.svg`

**Não instalar biblioteca de UI, de animação ou de carrossel.** Se um componente precisa de dependência nova, primeiro pergunte.

### Server components por padrão
`"use client"` só em componente que realmente precisa de estado. Nunca na página inteira.

---

## Obrigatório antes de qualquer deploy

- [ ] `<title>` e `meta description` com a cidade da unidade em **toda** página
- [ ] OpenGraph por página — o vendedor manda o link do case no WhatsApp; o preview é o produto naquele momento
- [ ] Schema `LocalBusiness` por unidade, gerado do config. Endereço, telefone e horário batendo exatamente com o Google Business Profile
- [ ] `sitemap.ts` e `robots.ts`
- [ ] Rodapé com endereço, telefone, WhatsApp e horário
- [ ] `:focus-visible` visível em todo elemento focável
- [ ] Menu mobile funcionando — nada de botão hambúrguer sem handler
- [ ] `alt` descritivo em toda imagem
- [ ] **Rodado em `workerd`, não só em Node:** `npm run workerd` e todas as rotas
      em 200. O runtime da Cloudflare não tem sistema de arquivos, e a suíte
      roda em Node, onde tem — dois deploys já caíram por essa diferença
- [ ] **Nenhum andaime de protótipo no build:** seletor de layout, barra de debug,
      título de estudo, rota de teste
- [ ] Nenhum link âncora apontando para a própria seção
- [ ] Nenhum CTA sem destino real
- [ ] Testado nas seis larguras da matriz, sem rolagem horizontal em nenhuma
- [ ] Documentação da entrega escrita e `CHANGELOG` atualizado

---

## Ordem de construção

Uma fase por vez, com revisão entre elas. **Não tentar construir o site inteiro numa tacada** — o resultado fica raso e a correção sai mais cara que a construção.

1. Limpar o template e extrair o design system do estudo **03 Síntese** para tokens
2. Layout base: cabeçalho, rodapé, as três superfícies
3. Camada de config por unidade
4. Página de case + índice de projetos (é o que o site tem trinta vezes)
5. Ambientes — texto já escrito, reaproveitar dos catálogos
6. Home
7. Institucional, arquitetos, a loja
8. 404, privacidade, SEO, schema
9. Segundo build (Caraguá) e verificação cruzada de cidade
