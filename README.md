# Dalmóbile — site institucional

Dois sites (São José dos Campos e Caraguatatuba) gerados de **um repositório só**.

👉 **Comece por [`MANUAL.md`](MANUAL.md)** — é o documento de entrada, e sozinho
já explica o projeto e as tarefas mais comuns. Serve também para colar numa IA
e pedir que ela trabalhe no site.

A fonte da verdade das **regras** é o [`CLAUDE.md`](CLAUDE.md). Em caso de
conflito entre documentos, ele vence.

## Documentos

| Arquivo | O que é |
|---|---|
| [`MANUAL.md`](MANUAL.md) | **o documento de entrada — leia este primeiro** |
| [`CLAUDE.md`](CLAUDE.md) | as regras: tokens, paleta, escala, forma, responsividade, stack |
| [`docs/direcao-site.md`](docs/direcao-site.md) | o que cada página tem, em que ordem, e por quê |
| [`docs/design-system.md`](docs/design-system.md) | os tokens e como usá-los |
| [`docs/decisoes.md`](docs/decisoes.md) | log de decisões: o que, por quê, o que foi descartado |
| [`docs/adicionar-ambiente.md`](docs/adicionar-ambiente.md) | **como publicar fotos novas** |
| [`docs/copy/`](docs/copy/) | o texto aprovado pelo cliente, por unidade |
| [`docs/adicionar-projeto.md`](docs/adicionar-projeto.md) | como publicar um projeto (dormente) |
| [`docs/unidades.md`](docs/unidades.md) | o que cada campo do config faz |
| [`docs/prompts-construcao.md`](docs/prompts-construcao.md) | o plano de nove fases |
| [`CHANGELOG.md`](CHANGELOG.md) | o que mudou em cada entrega |
| [`docs/pendencias.md`](docs/pendencias.md) | **o que falta para o site ir ao ar** |

Em caso de conflito entre os documentos, **o `CLAUDE.md` vence**.

## Requisitos

- Node.js `>= 22.13.0`

## Como rodar

```bash
npm install            # instala as dependências

npm run dev            # desenvolvimento — São José dos Campos
npm run dev:caragua    # desenvolvimento — Caraguatatuba

npm run build:sjc      # build de São José dos Campos
npm run build:caragua  # build de Caraguatatuba

npm test               # build + a suíte inteira, nas DUAS unidades
npm run lint           # ESLint
npm run workerd        # roda o build no motor da Cloudflare, em localhost:8799

npm run pendencias     # o que ainda falta a loja confirmar
npm run deploy:sjc     # publica SJC (recusa se houver pendência)
npm run deploy:caragua # publica Caraguatatuba
```

### Antes de publicar, rode em `workerd`

A suíte roda o Worker **em Node**, onde `fs` existe. O runtime da Cloudflare é
o `workerd`, que **não tem sistema de arquivos**. Dois deploys já caíram por
essa diferença, com a suíte 100% verde.

```bash
npm run build:sjc
npm run workerd        # em outro terminal, confira as rotas:
```

```bash
for r in / /privacidade /sitemap.xml /robots.txt /ambientes /a-dalmobile \
         /arquitetos /a-loja; do
  printf "%s %s\n" "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:8799$r)" "$r"
done
```

As quatro primeiras em 200; as páginas internas antigas em 301 (o site é uma
página só desde a v5). Qualquer 500 aqui é erro que só apareceria em produção.
Ver [`tests/README-workerd.md`](tests/README-workerd.md).

## Como o conteúdo funciona

| Onde | O quê |
|---|---|
| `public/fotos/<unidade>/<ambiente>/` | as fotos. A pasta é **dado**: o build confere |
| `conteudo/ambientes/*.md` | título, `alt` e crédito de cada foto do carrossel da home |
| `app/page.tsx` | o texto da home, literal de `docs/copy-home-v5.md` |
| `conteudo/projetos/*.md` | os cases — **sem conteúdo hoje** |
| `config/sjc.ts` e `config/caragua.ts` | tudo que difere entre as duas lojas |

O build lê e valida esses arquivos e escreve `conteudo/gerado.json`, que é o que
o Worker carrega. **Campo faltando quebra o build**, com uma mensagem dizendo o
que fazer. Nada disso é lido em tempo de execução: o Worker não tem disco.

Para publicar foto nova, ver
[`docs/adicionar-ambiente.md`](docs/adicionar-ambiente.md) — é escrito para quem
não programa.

## Publicação

O site roda em **Cloudflare Workers**, na conta da agência, em **dois projetos
do Workers Builds** — um por unidade —, que constroem a cada push na `main`.

Cada projeto precisa do comando de build da sua unidade:

| Projeto | Comando de build |
|---|---|
| `dalmobile-sjc` | `npm run build:sjc` |
| `dalmobile-caragua` | `npm run build:caragua` |

> **`npm run build` puro não serve em CI.** Sem a variável `UNIDADE`, ele cairia
> no padrão e publicaria São José dos Campos — inclusive no projeto de
> Caraguatatuba, em silêncio. Por isso o build **recusa rodar em CI** sem ela,
> com uma mensagem dizendo o que configurar.

Para publicar da sua máquina, `npm run deploy:sjc` ou `npm run deploy:caragua`.
Os dois rodam `npm run pendencias` antes e **recusam publicar** enquanto houver
dado da loja por confirmar.

> **Se o projeto estiver numa pasta do Google Drive**, aponte `node_modules` e
> `dist` para fora dela, senão o build não termina — o Drive tenta sincronizar
> os milhares de arquivos que cada build escreve. Ver `docs/decisoes.md`.
> Com o desvio, o build cai de "não termina" para 2 segundos.

## Estrutura

```
app/            código do site
  tokens.css    ÚNICO arquivo com valor de cor literal
  globals.css   folha global
worker/         entrada do Cloudflare Worker, com /_vinext/image
public/assets/  fotos e marcas
tests/          testes de build e de regras de design
docs/           documentação
```

## Estado

**v5 no ar (06/10/2026): cada site é uma página só.** A home tem seis seções —
abertura em vídeo, manifesto, projetos executados (carrossel com as fotos de
todos os ambientes), fábrica, para arquitetos e showroom — e o menu rola até
elas. Fica também `/privacidade`. As páginas internas antigas respondem 301 para
as seções equivalentes (`worker/index.ts`); o código delas está na tag
`v4-multipagina`. O `npm test` roda 62 testes por unidade.

A camada de config por unidade gera os dois sites do mesmo código, e um teste
falha se o nome de uma cidade aparecer no build da outra fora da única menção
declarada. Ver [`docs/unidades.md`](docs/unidades.md).

O que trava a publicação hoje não é código: são as 18 pendências de
[`docs/pendencias.md`](docs/pendencias.md), que dependem da loja. Ver
[`docs/prompts-construcao.md`](docs/prompts-construcao.md).
