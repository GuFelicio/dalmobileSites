# Unidades — o que cada campo faz e onde aparece

Um repositório, dois sites. Este documento é o mapa de `config/`.

```
config/tipos.ts        o contrato: campo faltando quebra o BUILD
config/sjc.ts          dados e composição de dalmobilesjc.com.br
config/caragua.ts      dados e composição de dalmobilecaraguatatuba.com.br
config/derivados.ts    o que se calcula a partir dos dados (links, endereço)
config/pendente.ts     o sentinela de dado não confirmado
config/verificar-pendencias.mjs   trava de deploy
```

---

## Como a seleção funciona

A unidade sai da variável de ambiente `UNIDADE`, lida em `vite.config.ts`, que
aponta o alias **`@unidade`** para `config/sjc.ts` ou `config/caragua.ts`.

```bash
npm run dev            # SJC (padrão)
npm run dev:caragua    # Caraguatatuba
npm run build:sjc
npm run build:caragua
npm run pendencias     # o que ainda falta a loja confirmar
npm run deploy:sjc     # trava se houver pendência
npm run deploy:caragua
```

**Todo componente importa de `config/derivados`, nunca de `config/sjc.ts`
direto.** Import direto embute uma unidade específica no bundle das duas.

### Na Cloudflare, o comando de build precisa dizer a unidade

Cada projeto do Workers Builds roda **um** comando, e é ele que decide qual
site sai:

| Projeto | Comando de build |
|---|---|
| `dalmobile-sjc` | `npm run build:sjc` |
| `dalmobile-caragua` | `npm run build:caragua` |

> **`npm run build` puro não serve em CI.** Sem `UNIDADE`, ele cairia no padrão
> e publicaria São José dos Campos — inclusive no projeto de Caraguatatuba, em
> silêncio e com o build verde. Por isso o `vite.config.ts` **recusa** buildar
> em CI sem a variável, com uma mensagem dizendo o que configurar. Fora de CI o
> padrão continua valendo, para o `npm run dev` não exigir cerimônia.

### Por que alias, e não um `if`

Esta é a decisão que sustenta o projeto inteiro. Com um `if` em runtime, os
dois configs entram no bundle e o texto de uma cidade viaja dentro do site da
outra — o erro que derrubou o site anterior. Com alias, **só um arquivo de
config é compilado**, e o teste de cidade cruzada pode ser absoluto.

> **Não adicione `"@unidade"` em `compilerOptions.paths` do `tsconfig.json`.**
> Já foi, e quebrou tudo em silêncio: o `paths` vence o alias do Vite, e os
> dois builds saíam com o config de SJC dentro. O tipo do módulo vive em
> `config/unidade.d.ts`, que resolve o editor sem interferir no build.

---

## Os campos

| Campo | O que é | Onde aparece |
|---|---|---|
| `id` | `"sjc"` ou `"caragua"`. É o valor de `UNIDADE` | seleção de build, nome do Worker |
| `nome` | nome curto da unidade | texto acessível do lockup |
| `cidade` | cidade por extenso | `<title>`, `meta description`, schema, rodapé |
| `estado` | UF | endereço, schema |
| `dominio` | domínio sem barra final | base do sitemap, OpenGraph, link canônico |
| `endereco` | logradouro, bairro, CEP | rodapé, `/a-loja`, schema `LocalBusiness` |
| `marca` | lockup escuro e claro, com dimensões | cabeçalho, rodapé |
| `telefone` | como se escreve, com DDD | rodapé, `/a-loja`; vira `tel:` em `derivados` |
| `whatsapp` | só dígitos, com país; ou `null` | botão do cabeçalho e do rodapé |
| `horarios` | faixas de dias, com `confirmado` | rodapé, `/a-loja`, schema |
| `mapa` | `embed` do iframe e `link` do app | `/a-loja` |
| `googleBusiness` | ficha da loja | referência de conferência do schema |
| `analytics` | `ga` e `pixel`, ou `null` | scripts de medição |
| `outraUnidade` | rótulo e URL da outra loja | link cruzado do rodapé |
| `navegacao` | as rotas deste site, na ordem | cabeçalho e menu mobile |
| `home.abertura` | o vídeo da abertura: `webm`, `mp4`, `poster` | abertura da home |
| `home.fotosNaVitrine` | quantas fotos a vitrine mostra (12 = três ciclos A-B-C) | seção de projetos da home |
| `home.fotoFabrica` | a foto do split da fábrica: lista de ambientes e posição | seção da fábrica da home |
| `home.fotoLoja` | a faixa 21:9 da seção da loja | seção "a loja" da home |
| `gradeDeAmbientes` | `"destaque"` ou `"duasColunas"` | grade de `/ambientes` |

### `home` — estrutura igual, prova diferente

A home é **um componente só** (`app/page.tsx`) para os dois sites. O que muda
entre eles — a mídia e as fotos de cada seção — mora em `home`, e um teste
(`tests/layout.test.mjs`) quebra se alguém escrever caminho de vídeo, escolha de
foto ou tamanho de vitrine direto no componente.

**A abertura é o mesmo vídeo nos dois sites**, por decisão do cliente
(02/10/2026): o que muda na abertura é o **texto** — a cidade no rótulo, que vem
de `cidade`. Para um vídeo por unidade, basta trocar os caminhos de
`home.abertura` no config daquela unidade e pôr os arquivos em
`public/videos/`. Nenhum componente muda.

A escolha de foto (`fotoFabrica`, `fotoLoja`) é uma **lista de preferência**: a
primeira foto que existir, entre os ambientes listados, na posição `indice`.
Caraguá não tem home office nem closet; a lista cai para o que houver.

### `gradeDeAmbientes` — depende do tamanho do acervo

- `"destaque"` (SJC, 7 ambientes): o primeiro em 16:9 ocupando duas colunas,
  os demais em 4:3; 2, 3 e 4 colunas por largura.
- `"duasColunas"` (Caraguá, 4): duas colunas de fotos grandes em toda largura —
  menos acervo pede foto maior, não grade mais vazia.

Nos dois casos a grade **nunca termina com vão**: as colunas de cada item são
calculadas em `app/ambientes/page.tsx`. Se o acervo de uma unidade mudar muito
de tamanho, reveja este campo.

### `marca` — o lockup já contém a cidade

Cada unidade tem seu arquivo, e **o desenho já traz o nome da cidade**. Por
isso não se renderiza o nome da unidade ao lado: seria duplicata. As duas
versões (escura e clara) existem de verdade — nada de clarear a preta com
filtro.

### `whatsapp` — as duas unidades usam o MESMO número

Confirmado pelo cliente em 08/09/2026: `5512996049888` atende os dois sites.

Isso cria um problema que o `docs/direcao-site.md` levanta explicitamente — *"o
lead precisa carregar de qual unidade veio"*. Com um número só, quem atende não
tem como saber de qual cidade a pessoa chegou.

A solução está em `linkWhatsApp()`, em `config/derivados.ts`: o link `wa.me`
leva uma mensagem pré-preenchida com a cidade daquele site. **É o único sinal de
origem que existe.** Se alguém "simplificar" o link tirando o `?text=`, a
origem do lead se perde em silêncio.

### `whatsapp: null` — a ação fica desabilitada, nunca link morto

O `CLAUDE.md` proíbe CTA sem destino real. Enquanto o número não existe, o
botão aparece desabilitado com "em breve". Preencher o campo faz o "em breve"
sumir e o link nascer, sem tocar em componente.

### `outraUnidade.nome` — não cita a cidade da outra loja

O rótulo é genérico ("Nossa outra loja") de propósito. Só a URL contém a outra
cidade, e isso é inevitável, porque a cidade está no domínio. Ver
`docs/decisoes.md`.

### `horarios[].confirmado: false` — trava o deploy

Endereço, telefone e horário têm que bater **exatamente** com o Google Business
Profile daquela loja: divergência derruba a busca local e invalida o schema
`LocalBusiness`. Enquanto `confirmado` for `false`, `npm run deploy:*` recusa.

---

## O que garante que uma cidade não vaze para o site da outra

`npm test` **constrói as duas unidades** e roda a suíte inteira sobre cada uma
(`test:sjc` e `test:caragua`). Os testes descobrem de qual unidade é o build pelo
canônico da home (`tests/unidade-do-build.mjs`) — até 01/10/2026 eles liam o
config de SJC fixo, e o build de Caraguá nunca era testado de verdade.

`tests/unidade-cruzada.test.mjs` aplica a regra de 14/09/2026:

- **Nos campos de SEO** — `<title>`, description, OpenGraph, canônico, `<h1>`,
  schema — e no **sitemap**: a cidade da outra unidade **nunca**. Zero exceção.
- **No corpo visível**: só nas três menções declaradas, que a copy aprovada
  faz de propósito para quem chegou na loja errada — o link "Ver a loja de …"
  do rodapé, a faixa "A Dalmóbile também atende a partir de …" de `/a-loja` e a
  resposta do FAQ de `/a-dalmobile`. Menção nova quebra a suíte.

Conferido em 02/10/2026 nos dois builds, 13 rotas cada: zero ocorrência em SEO,
sitemap e robots; no corpo, só as três declaradas.

Ele já pegou dois de verdade na Fase 3: o `meta description` do `app/layout.tsx`
com a cidade escrita à mão, e — mais sutil — um **comentário** dos arquivos de
config que citava a cidade proibida e sobrevivia no bundle do servidor.
**Nem em comentário.**

---

## Como adicionar um dado novo à unidade

1. Campo em `config/tipos.ts`. Obrigatório, não opcional: opcional vira
   `undefined` silencioso em produção, obrigatório vira erro de compilação na
   máquina de quem editou.
2. Preencher nos **dois** configs. O build quebra até isso acontecer, que é o
   ponto.
3. Se o dado ainda não existe, usar `PENDENTE` — a trava de deploy o encontra.
4. Documentar na tabela acima.

---

## O que ainda falta

`npm run pendencias` lista sempre o estado atual — confie nele, não numa lista
copiada aqui, que envelhece. Em 02/10/2026 eram quatro itens, todos de
`/a-dalmobile` (foto da fábrica, prazo do processo, certificado de garantia e
uma resposta do FAQ que depende do prazo).
