# Pendências

O que falta para o site poder ir ao ar. Atualizado em **09/09/2026**.

Quem resolver um item, apaga daqui e registra no `CHANGELOG.md`.

---

## 1. Os textos institucionais são RASCUNHO e travam o deploy

Todas as rotas do mapa existem: `/`, `/ambientes`, `/ambientes/[slug]`,
`/a-loja`, `/a-dalmobile`, `/arquitetos`, `/privacidade` e a 404. **Nenhum link
do site aponta para rota inexistente**, e um teste varre cinco páginas e falha
se voltar a apontar.

Mas `/a-dalmobile` e `/arquitetos` foram escritas **sem entrevista com a loja**,
a partir só do que o `CLAUDE.md` afirma. São rascunho, e
`conteudo/institucional/*.md` traz `confirmado: false` — a trava de deploy
recusa publicar enquanto for assim.

### O que alguém da loja precisa fazer

1. **Ler cada parágrafo** de `conteudo/institucional/a-dalmobile.md` e
   `arquitetos.md` e corrigir o que não for verdade.
2. **Preencher os 16 campos `PENDENTE`.** Cada um é uma promessa ao cliente:

| Campo | O que é |
|---|---|
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

`npm run pendencias` lista sempre o estado atual.

| O que | Unidade | Como obter |
|---|---|---|
| `mapa.embed` e `mapa.link` | as duas | Google Maps → Compartilhar → **Incorporar um mapa**; copiar o `src` do iframe. Sem isso, `/a-loja` mostra uma foto no lugar do mapa |
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

## 5. Conferência visual nas seis larguras

**Nenhuma página foi aberta em navegador.** As regras de responsividade estão
escritas e comentadas, mas ninguém olhou o resultado. É critério de "pronto" de
todas as fases e continua em aberto.

```
390 × 844    iPhone padrão      768 × 1024   iPad retrato
430 × 932    iPhone grande      1024 × 768   iPad paisagem
1280 × 800   notebook           1920 × 1080  desktop
```

O tablet é onde quebra — testar retrato e paisagem separadamente.

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
