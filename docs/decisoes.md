# Log de decisões

Toda escolha que alguém possa querer desfazer entra aqui, com data e motivo.
Sem isto, daqui a seis meses alguém "melhora" o site desfazendo tudo — de
boa-fé, por não saber que era decisão.

Formato: **data · o que · por quê · o que foi descartado**.

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
