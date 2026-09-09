# Pendências

O que falta para o site poder ir ao ar. Atualizado em **09/09/2026**.

Quem resolver um item, apaga daqui e registra no `CHANGELOG.md`.

---

## 1. Duas páginas institucionais ainda não existem

`/a-loja`, `/privacidade` e a 404 foram construídas. **Nenhum link do site
aponta hoje para rota inexistente** — e um teste varre cinco páginas e falha se
voltar a apontar.

Faltam duas, ambas da Fase 7, e ambas **dependem de texto que não temos**:

| Rota | O que precisa | Fase |
|---|---|---|
| `/a-dalmobile` | institucional, processo, números da fábrica, FAQ | 7 |
| `/arquitetos` | proposta de parceria e a lista de arquitetos parceiros | 7 |

Enquanto não existirem, **não são linkadas** — o menu tem só "Ambientes" e
"A loja". O `CLAUDE.md` proíbe CTA sem destino real, e elas estavam dando 404
no menu e no rodapé de toda página.

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
