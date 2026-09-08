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

### `marca` — o lockup já contém a cidade

Cada unidade tem seu arquivo, e **o desenho já traz o nome da cidade**. Por
isso não se renderiza o nome da unidade ao lado: seria duplicata. As duas
versões (escura e clara) existem de verdade — nada de clarear a preta com
filtro.

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

`tests/unidade-cruzada.test.mjs` **constrói as duas unidades de verdade** e
vasculha todo o texto de `dist/` — JS, CSS, HTML, JSON. Se o nome de uma cidade
aparecer no build da outra, a suíte quebra.

A única exceção é a **URL do link cruzado do rodapé**, porque a cidade está no
domínio. Qualquer outra ocorrência é o bug.

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

Confirmar com as lojas — `npm run pendencias` lista sempre o estado atual:

- **SJC**: WhatsApp, horário de sábado, mapa e ficha do Google Business
- **Caraguá**: horários, mapa, ficha do Google Business, e se o telefone
  `(12) 98270-3186` é também o WhatsApp
- **As duas**: identificadores de GA e pixel
- **Caraguá**: a curadoria do acervo do litoral define o conjunto de ambientes,
  e portanto pode mudar `navegacao`
