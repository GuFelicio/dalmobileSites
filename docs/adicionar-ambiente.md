# Adicionar ou atualizar um ambiente

As páginas de ambiente são o conteúdo principal do site. Esta é a tarefa que
mais se repete: acrescentar fotos novas a um ambiente que já existe.

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
ela nasce sozinha sob o título da foto.

> **Nome de arquiteto só entra com autorização por escrito.** É exigência do
> `CLAUDE.md`, e vale para cada projeto, não uma vez só.

---

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

- [ ] A foto aparece no ambiente certo, **do site certo**
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
