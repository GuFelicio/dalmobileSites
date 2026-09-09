# Dalmóbile — site institucional

Dois sites (São José dos Campos e Caraguatatuba) gerados de **um repositório só**.

A fonte da verdade das regras é o [`CLAUDE.md`](CLAUDE.md). Em caso de conflito
entre documentos, ele vence.

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
npm install            # instala as dependências

npm run dev            # desenvolvimento — São José dos Campos
npm run dev:caragua    # desenvolvimento — Caraguatatuba

npm run build:sjc      # build de São José dos Campos
npm run build:caragua  # build de Caraguatatuba

npm test               # build + a suíte inteira
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
for r in / /ambientes /ambientes/cozinha /a-loja /a-dalmobile /arquitetos \
         /privacidade /sitemap.xml /robots.txt; do
  printf "%s %s\n" "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:8799$r)" "$r"
done
```

Tudo 200. Qualquer 500 aqui é erro que só apareceria em produção.
Ver [`tests/README-workerd.md`](tests/README-workerd.md).

## Como o conteúdo funciona

| Onde | O quê |
|---|---|
| `public/fotos/<unidade>/<ambiente>/` | as fotos. A pasta é **dado**: o build confere |
| `conteudo/ambientes/*.md` | título e `alt` de cada foto, texto do ambiente |
| `conteudo/institucional/*.md` | textos de `/a-dalmobile` e `/arquitetos` |
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

**Fases 1 a 8 de 9 concluídas.** Existe o design system em `app/tokens.css` e o
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

**Próxima: Fase 9 — verificação cruzada final e publicação.**

O que trava a publicação hoje não é código: são as 18 pendências de
[`docs/pendencias.md`](docs/pendencias.md), que dependem da loja. Ver
[`docs/prompts-construcao.md`](docs/prompts-construcao.md).
