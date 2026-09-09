# Dalmóbile — site institucional

Dois sites (São José dos Campos e Caraguatatuba) gerados de **um repositório só**.

> Este README está no mínimo necessário. A Fase 9 o completa com publicação e
> operação. Enquanto isso, a fonte da verdade é o [`CLAUDE.md`](CLAUDE.md).

## Documentos

| Arquivo | O que é |
|---|---|
| [`CLAUDE.md`](CLAUDE.md) | as regras: tokens, paleta, escala, forma, responsividade, stack |
| [`docs/direcao-site.md`](docs/direcao-site.md) | o que cada página tem, em que ordem, e por quê |
| [`docs/design-system.md`](docs/design-system.md) | os tokens e como usá-los |
| [`docs/decisoes.md`](docs/decisoes.md) | log de decisões: o que, por quê, o que foi descartado |
| [`docs/adicionar-ambiente.md`](docs/adicionar-ambiente.md) | **como publicar fotos novas** |
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
npm install     # instala as dependências
npm run dev     # servidor de desenvolvimento (Vite + Cloudflare)
npm run build:sjc      # build de São José dos Campos
npm run build:caragua  # build de Caraguatatuba
npm run pendencias     # o que falta a loja confirmar
npm run deploy:sjc     # publica (trava se houver pendência)
npm test        # build + testes
npm run lint    # ESLint
```

## Publicação

O site roda em **Cloudflare Workers**, na conta da agência. O `vinext build`
gera `dist/server/wrangler.json` já pronto, e o `npm run deploy` o entrega.

Na prática a publicação é automática: o repositório está conectado ao
Cloudflare Workers Builds, que constrói e publica a cada push na `main`.

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

**Fases 1 a 7 de 9 concluídas.** Existe o design system em `app/tokens.css` e o
layout base — cabeçalho, rodapé, menu mobile e as três superfícies, em
`components/layout/`. O `npm test` roda 12 testes que policiam as regras do
`CLAUDE.md`.

A camada de config por unidade existe: `UNIDADE=sjc` e `UNIDADE=caragua`
geram os dois sites do mesmo código, e um teste constrói as duas unidades e
falha se o nome de uma cidade aparecer no build da outra. Ver
[`docs/unidades.md`](docs/unidades.md).

O conteúdo principal são as páginas de ambiente: `/ambientes` e
`/ambientes/[slug]`, com **45 fotos reais** de projetos executados.

`/projetos` e `/projetos/[slug]` existem no código mas estão **sem conteúdo** e
fora do menu: montar um case exige o prédio e o arquiteto de cada apartamento,
que ainda não temos. Ver [`docs/decisoes.md`](docs/decisoes.md).

Ainda não existem institucional, arquitetos, a loja, 404 nem home definitiva.

Duas páginas são andaime temporário e saem na Fase 3: `app/page.tsx` (os três
estudos de layout) e `app/teste-layout/` (a revisão dos componentes nas três
superfícies).

**Próxima: Fase 8 — sitemap, robots e SEO por página.** Ver
[`docs/prompts-construcao.md`](docs/prompts-construcao.md).
