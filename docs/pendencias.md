# Pendências

O que falta para o site poder ir ao ar. Atualizado em **09/09/2026**.

Quem resolver um item, apaga daqui e registra no `CHANGELOG.md`.

---

## 1. Rotas que dão 404, linkadas de toda página

**O impacto maior:** `/a-loja` é o destino de *"Falar sobre um projeto assim"*,
a chamada final de **toda** página de ambiente. O principal CTA do site aponta
hoje para uma página que não existe.

| Rota | Linkada de | Fase |
|---|---|---|
| `/a-loja` | menu, rodapé e a chamada final de todo ambiente | 7 |
| `/a-dalmobile` | menu e rodapé | 7 |
| `/arquitetos` | menu, rodapé e a ficha do case | 7 |
| `/privacidade` | rodapé | 8 |

Isso viola o `CLAUDE.md` — *"Nenhum CTA sem destino real"* — e o checklist de
deploy.

**`/a-loja` é a mais urgente**, e é também onde o mapa vive: a seção 9 do
`docs/direcao-site.md` a define como duas colunas, com foto da fachada ou mapa
à esquerda e endereço, telefone, horário e WhatsApp à direita. Endereço,
telefone, horário e WhatsApp **já estão confirmados** nos dois configs — falta
só o `embed` do mapa.

> O teste `nenhum CTA sem destino real` **não pega isto**: ele só verifica
> `href="#"` e âncora sem `href`, não se a rota interna resolve. Fechar esse
> furo faz parte da correção.

---

## 2. Dados da loja ainda por confirmar

`npm run pendencias` lista sempre o estado atual.

| O que | Unidade | Como obter |
|---|---|---|
| `mapa.embed` e `mapa.link` | as duas | Google Maps → Compartilhar → **Incorporar um mapa**; copiar o `src` do iframe |
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

## 7. Imagens órfãs em `public/assets/`

Sem uso desde a remoção dos estudos Editorial e Imersiva: `casa-sabin.webp`,
`loft-sem-pressa.webp`, `quarto-autoral.webp`, `fabrica.webp`. Ficaram porque a
definição de quais fotos entram no site ainda estava aberta. Podem ser apagadas.
