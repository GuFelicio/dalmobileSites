# Pendências

O que falta para o site poder ir ao ar. Atualizado em **09/09/2026**.

Quem resolver um item, apaga daqui e registra no `CHANGELOG.md`.

---

## 1. Quatro dados que a loja ainda precisa confirmar

A copy foi revisada e aplicada em 14/09/2026 (`copy-site-dalmobile-sjc.md`), e
os textos institucionais saíram de rascunho: `confirmado: true`. As pendências
caíram de **18 para 4**.

| Campo | O que é | O que fazer |
|---|---|---|
| `processo[3].prazo` | prazo de produção, em dias úteis | Confirmar a média. "Ninguém no Vale publica prazo" é um buraco de mercado mapeado — uma frase, e o site passa a ter algo que nenhum concorrente da cidade tem |
| `faq[1].resposta` | "Quanto tempo leva do fechamento à montagem?" | Depende do prazo acima |
| `garantia.certificado` | o PDF do certificado | Conseguir o arquivo. Sem ele, o botão não é renderizado — prometer documento e não entregar é pior que não prometer |
| `fabrica.foto` | foto da planta de Bento Gonçalves | Nenhum concorrente do Vale mostra a sua fábrica |

**Campo pendente não vira buraco na página: ele é OMITIDO.** Um teste falha se
a palavra "PENDENTE" chegar ao HTML.

### Telefone — RESOLVIDO em 14/09/2026

Um número só, nas duas lojas: **(12) 99604-9888**, o mesmo do WhatsApp.
Saíram do site o fixo de SJC `(12) 3341-8777` e o celular de Caraguá
`(12) 98270-3186`.

> Se alguém ainda atende por um desses, reverter é trocar uma linha em
> `config/sjc.ts` ou `config/caragua.ts`.

### Horário — CONFERIR CONTRA O GOOGLE MEU NEGÓCIO

Não consegui ler a ficha: o Google Maps só monta a página com JavaScript, e o
HTML que o servidor devolve não traz horário nem telefone.

O que está no site hoje, e precisa bater **exatamente** com a ficha de cada
loja — divergência derruba a busca local e invalida o schema `LocalBusiness`:

| | Segunda a sexta | Sábado |
|---|---|---|
| **São José dos Campos** | 09h00 às 19h00 | 08h00 às 14h00 |
| **Caraguatatuba** | 09h00 às 18h00 | 09h00 às 14h00 |

> A copy apontou divergência no sábado de SJC: o site diz **08h–14h**, os
> catálogos dizem **9h–13h**. Vale abrir as duas fichas e conferir linha a
> linha.

### O formulário de contato

Seção 11 da direção, não existe. Precisa de endpoint no Worker, validação,
consentimento de LGPD e o campo que diz de qual unidade veio o lead. Até lá,
WhatsApp e telefone são o caminho, e os dois são destinos reais.

**Quando ele entrar, `/privacidade` precisa ser reescrita ANTES** — hoje ela
afirma que o site não usa cookie de rastreamento. Se GA4 ou pixel entrarem, a
afirmação vira falsa, e isso é problema de LGPD, não de copy.

---|---|
| `processo[].prazo` (5) | prazo de cada etapa, em dias. Ninguém no Vale publica isso |
| `garantia.anos` e `.certificado` | prazo de garantia e link do certificado |
| `numeros[].valor` (4) | a faixa de números: anos, projetos, cidades, equipe |
| `faq[].resposta` (3) | quanto tempo leva, o que a garantia cobre, se atende fora da cidade |
| `fabrica.foto` | foto da fábrica — nenhum concorrente do Vale mostra a sua |
| `parceria[1].prazo` | prazo de resposta a orçamento de escritório |

3. **Mudar `confirmado` para `true`** nos dois arquivos.

> **Campo pendente não vira buraco na página: ele é OMITIDO.** A faixa de
> números não aparece, os prazos não aparecem, e três das seis perguntas do FAQ
> ficam de fora. Um teste falha se a palavra "PENDENTE" chegar ao HTML.

### A lista de arquitetos parceiros está vazia, de propósito

`parceiros: []` em `arquitetos.md`. Publicar nome de terceiro exige
**autorização por escrito de cada um**, e ela vale por projeto, não uma vez só.
Depende também de os cases existirem.

> **Nenhum número da fábrica vai ao ar sem confirmação da loja** — anos, prazo,
> garantia, quantidade de projetos. Sem confirmação, usar formulação verdadeira
> sem número ("mais de 40 anos").

### O formulário de contato

A seção 11 da direção define um formulário próprio, e ele **não existe**.
Precisa de endpoint no Worker, validação, consentimento de LGPD e o campo que
diz de qual unidade veio o lead. Até lá, WhatsApp e telefone são o caminho, e
os dois são destinos reais.

Quando o formulário entrar, **`/privacidade` precisa ser revista junto**: hoje
ela diz, com verdade, que o site não coleta dado nenhum.

---

## 2. Dados da loja ainda por confirmar

`npm run pendencias` lista sempre o estado atual. Endereço, telefone, WhatsApp,
horário e mapa das duas unidades **estão completos**.

| O que | Unidade | Como obter |
|---|---|---|
| `analytics.ga` e `analytics.pixel` | as duas | o cliente envia depois; `null` não trava o deploy |

**Divergência conhecida:** a ficha do Google Business de Caraguatatuba ainda
mostra o telefone antigo. O cliente vai atualizar. Endereço, telefone e horário
precisam bater **exatamente** com a ficha, senão a busca local cai e o schema
`LocalBusiness` fica inválido.

---

## 3. Prédio e arquiteto de cada foto

Os campos `edificio` e `arquiteto` existem em todo bloco de foto de
`conteudo/ambientes/*.md` e estão **vazios**. Enquanto estiverem, a linha de
crédito não aparece na página.

Nome de arquiteto **só entra com autorização por escrito**, e a autorização vale
por projeto, não uma vez só.

O nome do arquivo preserva de qual apartamento cada foto veio
(`27062023-riz4771`, `dalmobile-calabasasapto93-0919`). É por aí que se
reconstrói o agrupamento por projeto quando os dados chegarem.

---

## 4. A camada de projetos está dormente

`/projetos`, `/projetos/[slug]` e `lib/projetos.ts` existem e funcionam, **sem
conteúdo**, e fora do menu. Montar um case exige ficha técnica: local, ano,
acabamentos com código e arquiteto.

Quando os dados de prédio e arquiteto chegarem, o caminho de volta está descrito
em `docs/decisoes.md`.

---

## 5. Conferência visual — FEITA

O cliente abriu os dois sites e confirmou a responsividade em 09/09/2026.
Refazer sempre que uma página nova entrar.

---

## 6. A home ainda é provisória

`app/page.tsx` é o estudo 03 Síntese promovido a conteúdo, com marcação própria
e o CSS `.synthesis-*` do `globals.css`. A home definitiva é a **Fase 6**, que a
remonta sobre `Header`, `Footer` e `Section`, seguindo a composição da seção 3
do `docs/direcao-site.md`.

Enquanto isso, ela usa os componentes de verdade só em parte. Não copiar nada
dela para página nova.

---

## 7. Foto da fachada

A seção 9 da direção pede foto da fachada e do interior em `/a-loja`. O acervo
não tem nenhuma das duas — a página usa uma foto de ambiente enquanto isso.

---

## 8. Imagens órfãs em `public/assets/`

Sem uso desde a remoção dos estudos Editorial e Imersiva: `casa-sabin.webp`,
`loft-sem-pressa.webp`, `quarto-autoral.webp`, `fabrica.webp`. Ficaram porque a
definição de quais fotos entram no site ainda estava aberta. Podem ser apagadas.

---

## 9. Redirects dos sites antigos

O item 6 da Fase 8 pede redirects das URLs que o Google já indexou dos sites
anteriores. **Não foi feito: não temos a lista dessas URLs.**

Para levantá-la: no Google Search Console de cada domínio, ou buscando
`site:dalmobilesjc.com.br` e `site:dalmobilecaraguatatuba.com.br`. Com a lista,
os redirects entram no `worker/index.ts`, antes do handler.

Sem isso, cada URL antiga indexada vira um 404 — a página 404 existe e é
prestativa, mas o link perde a autoridade que tinha acumulado.

---

## 10. O laboratório de cena 3D é temporário

`app/laboratorio/` e `components/midia/CenaMateriais.tsx` são um **estudo**,
pedido em 14/09/2026 para decidir se a home ganha uma cena 3D no bloco 01.

**Ele não vai ao ar:** a rota responde 404 fora do `npm run dev`, e um teste
falha se alguém publicá-la. Nenhuma página real carrega o `three` — verificado
em teste, e a home continua baixando 89 KB gzip.

**Para ver:** `npm run dev` e abrir `/laboratorio`.

**Quando a decisão for tomada, os dois caminhos são:**

| Decisão | O que fazer |
|---|---|
| **Não adotar** | `rm -rf app/laboratorio components/midia/CenaMateriais* components/midia/materiais.ts`, `npm rm three @types/three`, e apagar `tests/laboratorio.test.mjs` |
| **Adotar** | Antes de mais nada, reabrir três regras do `CLAUDE.md`: a proibição de biblioteca de animação (linha 243), a de parallax (linha 111) e a regra zero — *"interface que chama atenção para si é interface errada"*. A cena custa **~128 KB gzip contra os 89 KB que a home inteira baixa hoje**, num site cuja regra é abrir rápido no 4G |

> Enquanto o estudo existir, cada deploy sobe **720 KB** de um chunk que
> ninguém consegue baixar. Não prejudica o visitante, mas é desperdício —
> mais uma razão para decidir logo.
