# Adicionar ou atualizar um ambiente

As fotos dos ambientes são o conteúdo principal do site. Esta é a tarefa que
mais se repete: acrescentar fotos novas a um ambiente que já existe.

> **Desde a v5 (06/10/2026) não existe página de ambiente.** O site é uma página
> só, e as fotos de todos os ambientes aparecem no **carrossel da home** (seção
> "Projetos executados"), intercaladas, com o rótulo do ambiente ("01 /
> COZINHA"), o título da foto e o crédito. Os arquivos de
> `conteudo/ambientes/` continuam sendo onde as fotos são listadas. Os campos de
> texto da página (`chamada`, corpo, `chamadaFinal`, `porUnidade`) continuam
> obrigatórios no arquivo, mas não aparecem no site.

---

## São José dos Campos: o acervo (desde a v6, 07/10/2026)

As fotos de SJC **não** ficam em `conteudo/ambientes/`. Elas formam um
acervo no config, sem título: cada foto do carrossel mostra só o rótulo do
ambiente ("01 / COZINHA") e o crédito ("Projeto / Tati Otta").

1. **Coloque o original** em `fotos-originais/sjc/`, com o nome no padrão
   `Ambiente-NomeDoArquiteto.jpg` (com número no fim se houver mais de uma do
   mesmo projeto: `Living-JulianaGuimarães2.jpg`). Essa pasta **não vai para o
   git** — guarde os originais no Drive.
   Prefixos aceitos: `Cozinha`, `Living`, `SalaTV`, `Dormitorio`, `HomeOffice`,
   `closet`, `banheiro`, `corporativo`.
2. **Processe:** `node build/processar-acervo.mjs sjc`. Ele gira pela
   orientação da câmera, tira o EXIF, reduz para 1920px e grava
   `public/fotos/sjc/acervo/<nome>.webp`, em minúsculas e sem acento:
   `Living-JulianaGuimarães2.jpg` → `living-juliana-guimaraes-2.webp`.
3. **Liste a foto em `config/sjc.ts`**, no campo `acervo.carrossel`, na
   posição em que ela deve aparecer:
   ```ts
   { arquivo: "living-juliana-guimaraes-2", ambiente: "living", arquiteto: "Juliana Guimarães" },
   ```
   O `arquiteto` é o nome como aparece no site ("Carina e Thiago"), não o do
   arquivo. Regra da ordem: **nunca duas fotos seguidas do mesmo arquiteto nem
   do mesmo ambiente** — `tests/acervo.test.mjs` reprova se acontecer.
4. **Fotos avulsas da home** (manifesto, fábrica, arquitetos, showroom) ficam
   em `acervo.home`, pelo `arquivo`. Uma foto que não deve entrar no carrossel
   vai em `acervo.avulsas`. O preview do link no WhatsApp é `compartilhamento`.
5. **Confira:** `npm run fotos && npm test`. O alt sai sozinho no formato
   "Cozinha planejada pela Dalmóbile, projeto de Tati Otta" (concordância em
   `lib/acervo.ts`). Nenhuma variação servida passa de 400 KB: o
   `build/gerar-imagens.mjs` baixa a qualidade até caber.

> Crédito de arquiteto só com autorização. As nove assinaturas do acervo de
> 07/10/2026 vieram do cliente junto com as fotos.

O resto deste documento vale para **Caraguatatuba**, que continua usando
`conteudo/ambientes/`.

---

## Antes de começar

1. **Fotos de projeto executado pela Dalmóbile.** Nunca render, nunca banco de
   imagem, nunca apartamento vazio.
2. Saber **de qual unidade** cada foto é: São José dos Campos ou Caraguatatuba.
3. Saber **de qual ambiente** cada foto é.

---

## Passo 1 — Colocar as fotos

```
public/fotos/<unidade>/<ambiente>/<nome>.webp
```

| | |
|---|---|
| `<unidade>` | `sjc` ou `caragua` |
| `<ambiente>` | `cozinha` `quartos` `sala-de-estar` `home-office` `closet` `banheiro` `espaco-gourmet` |

**A pasta é dado, não arrumação.** Se a foto estiver na pasta errada, o build
para e diz.

Mande o arquivo **grande** — pelo menos 1920px de largura. **Não reduza à mão:**
`npm run fotos` gera sozinho as versões de 440, 880, 1240 e 1920px e serve a
certa para cada tela.

> Os originais em resolução cheia ficam em `imgs/`, fora do repositório. O que
> se versiona é a versão de 2560px em `public/fotos/`.

---

## Passo 2 — Descrever a foto no arquivo do ambiente

Abra `conteudo/ambientes/<ambiente>.md` e acrescente um bloco em `fotos:`:

```yaml
  - src: /fotos/sjc/cozinha/19052023-riz2690.webp
    titulo: Ilha de jantar que dispensa a mesa
    alt: Cozinha com ilha central em madeira clara que serve de mesa para oito lugares, armários azuis e cooktop com coifa suspensa
    edificio:
    arquiteto:
```

### `titulo` — a chamada de impacto

Uma linha curta que diz **o que aquela foto resolve**, não o que ela mostra.

- ✅ *Ilha de jantar que dispensa a mesa*
- ✅ *Cabeceira que vira criado-mudo*
- ❌ *Cozinha moderna* — não diz nada
- ❌ *Projeto incrível dos sonhos* — linguagem de funil, proibida no `CLAUDE.md`

### `alt` — para quem não vê a foto

Descreve **o que está na imagem**, e não repete o título. É o que uma pessoa
cega ouve e o que o Google lê. **Um teste falha se o alt for igual ao título.**

### `edificio` e `arquiteto` — deixe vazios até ter

```yaml
    edificio:      # ex.: Edifício Rizzuti
    arquiteto:     # ex.: Marina Toledo
```

Enquanto vazios, **a linha de crédito não aparece na página**. Quando preencher,
ela nasce sozinha sob o título da foto, na galeria do ambiente e no carrossel da
home, no formato da apresentação da loja (copy v4): **`PROJETO / NOME`**, em
caixa alta pequena. Escreva só o nome, em caixa normal — o "Projeto /" e a
caixa alta vêm do código:

```yaml
    arquiteto: Débora Toledo     # sai "PROJETO / DÉBORA TOLEDO"
```

Em 05/10/2026 estão creditadas as fotos `debora-toledo-*` (SJC, Débora Toledo)
e `calabasasapto93-*` (Caraguá, Flávia e Sérgia Garrido).

> **Nome de arquiteto só entra com autorização por escrito.** É exigência do
> `CLAUDE.md`, e vale para cada projeto, não uma vez só.

---

## Texto próprio de uma unidade (`porUnidade`)

*Não aparece no site desde a v5 — fica no arquivo para o dia em que a página de
ambiente voltar.* O texto de um ambiente é **um só** para os dois sites. Quando uma loja precisa
de texto próprio — porque as fotos dela mostram outra solução —, ele vai no
mesmo arquivo, em `porUnidade`, e substitui o padrão **só no site daquela
unidade**. Só três campos podem ser próprios: `chamada`, `texto` e
`chamadaFinal`; o que faltar vem do padrão.

```yaml
porUnidade:
  caragua:
    chamada: Cabeceira, luz e apoio na mesma peça.
    texto: >-
      A cabeceira é baixa e corre a parede inteira: …
```

Hoje usam: `quartos` e `sala-de-estar` (Caraguatatuba, copy v3).

`nomeNoTitulo` (opcional) muda como o ambiente se chama no `<title>` —
`quartos` usa "Quartos e dormitórios".

## Ambiente sem foto numa unidade

Se uma unidade fica sem nenhuma foto de um ambiente, **o ambiente some do
carrossel dela** sozinho. Chegando foto, basta listá-la: ela entra no carrossel.
É o caso do banheiro em Caraguatatuba desde a copy v3. (Todo endereço
`/ambientes/...` responde 301 para `/#projetos` desde a v5 — `worker/index.ts`.)

## Passo 3 — Se o ambiente ainda não existe

1. Acrescente-o em `lib/ambientes.ts`, com `nome`, `slug`, `singular`, `artigo`
   e `planejado`. **Os três últimos são concordância**, e sem eles o site
   escreve "Cozinha planejado" no título e "Quer um quartos assim" na chamada.
2. Crie a pasta em `public/fotos/sjc/`, `caragua/` e `comum/`.
3. Crie `conteudo/ambientes/<slug>.md` copiando outro como modelo.
4. Documente aqui.

O arquivo precisa de: `nome`, `slug`, `unidades`, `chamada` (uma linha) e o
parágrafo do corpo, depois do segundo `---`.

---

## Passo 4 — Conferir

```bash
npm run fotos          # gera as versões de cada foto
npm test               # valida o conteúdo e as regras do site
npm run dev            # São José dos Campos
npm run dev:caragua    # Caraguatatuba
```

- [ ] A foto aparece no carrossel da home, com o ambiente certo, **do site certo**
- [ ] O título diz o que a foto resolve
- [ ] O `alt` descreve a imagem, e é diferente do título
- [ ] O crédito só aparece se você tiver o dado e a autorização
- [ ] No celular, nada rola para o lado

---

## Quando algo dá errado

| Mensagem | O que fazer |
|---|---|
| `falta o campo obrigatório "X"` | acrescente `X` no bloco da foto |
| `o alt repete o título` | o título é a chamada; o alt descreve a imagem |
| `está na pasta "X", mas foi listada no ambiente "Y"` | mova o arquivo, ou mude de arquivo de conteúdo |
| `é de "sjc", que não está em unidades` | acrescente a unidade no topo do arquivo |
| `não foi gerada` | caminho errado, ou faltou `npm run fotos` |
| `o ambiente "X" não está em lib/ambientes.ts` | veja o Passo 3 |

---

## E os projetos?

A pasta `conteudo/projetos/` e as rotas `/projetos` existem no código e estão
**sem conteúdo**: montar um case exige o prédio e o arquiteto de cada
apartamento, que ainda não temos. O menu não mostra a rota enquanto for assim.

Quando os dados chegarem, os campos `edificio` e `arquiteto` de cada foto já
apontam de qual apartamento ela veio, e daí sai o agrupamento por projeto sem
reescrever nada. Ver `docs/decisoes.md`.
