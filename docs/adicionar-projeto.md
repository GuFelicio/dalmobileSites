# Adicionar um projeto ao portfólio

Esta é a tarefa que mais se repete no site. Dá para fazer sem saber programar.

**Tempo:** uns 20 minutos, quase todo em escolher e nomear as fotos.

---

## Antes de começar, três coisas precisam estar prontas

1. **As fotos do projeto executado.** Fotografia de verdade, do apartamento
   entregue. **Nunca render, nunca banco de imagem, nunca obra vazia.** Arquiteto
   identifica na hora, e é o único ativo que a concorrência não tem.
2. **A ficha:** edifício, bairro, ano, ambientes e os acabamentos com nome
   **e código**. O código é o que sustenta a comparação de proposta.
3. **A autorização do arquiteto, por escrito**, se o projeto tiver um. Sem ela o
   nome não é publicado — nem no site, nem no preview do link.

---

## Passo 1 — Colocar as fotos

Crie uma pasta com o **slug** do projeto (o nome que vai aparecer na URL) em:

```
public/fotos/projetos/<slug>/
```

O slug é minúsculo, sem acento e com hífen no lugar do espaço:
`rizzuti-dr-marcos`, `loft-sem-pressa`.

Dentro, nomeie as fotos **na ordem em que devem aparecer**, com dois dígitos:

```
public/fotos/projetos/rizzuti-dr-marcos/
  01-cozinha.webp
  02-suite.webp
  03-home-office.webp
```

> **A primeira foto é a de abertura** — a que sangra no topo do case e a que
> aparece no preview quando o vendedor manda o link no WhatsApp. Escolha a
> melhor, não a primeira que a fotógrafa entregou.

**Formato e tamanho.** Mande o arquivo grande, na melhor qualidade que tiver
(`.jpg`, `.png` ou `.webp`, com pelo menos 1920px de largura). **Não reduza nada
à mão:** o build gera sozinho as versões de 440, 880, 1240 e 1920px e serve a
certa para cada tela. Reduzir antes só faz o site ficar borrado no desktop.

---

## Passo 2 — Escrever o arquivo do projeto

Crie `conteudo/projetos/<slug>.md`, com o **mesmo slug** da pasta de fotos.
Copie o modelo abaixo e substitua:

```markdown
---
titulo: Apartamento Dr. Marcos
edificio: Edifício Rizzuti
bairro: Jardim Aquarius
ano: 2025

# Onde este projeto aparece. [sjc], [caragua] ou [sjc, caragua].
unidades: [sjc]

arquiteto:
  nome: Marina Toledo
  autorizado: true    # só true com autorização POR ESCRITO

ambientes: [Cozinha, Suíte, Home office]

acabamentos:
  - nome: Freijó natural
    codigo: MDF-FRJ-018
  - nome: Laca fosco areia
    codigo: LC-AR-204

abertura: /fotos/projetos/rizzuti-dr-marcos/01-cozinha.webp

fotos:
  - src: /fotos/projetos/rizzuti-dr-marcos/01-cozinha.webp
    legenda: Cozinha em freijó natural, com bancada em quartzo branco absoluto
    alt: Cozinha planejada em madeira freijó, bancada clara e iluminação embutida sob os armários
---

O apartamento tinha uma cozinha estreita e nenhum lugar de trabalho. A solução
foi tratar os dois como um problema só.
```

### Os campos, um por um

| Campo | Obrigatório | O que é |
|---|---|---|
| `titulo` | sim | nome do projeto, como aparece no case e no índice |
| `edificio` | sim | agrupa o filtro e o bloco "outros projetos neste edifício" |
| `bairro` | sim | aparece na ficha técnica |
| `ano` | sim | ano da entrega. Ordena o índice, mais recentes primeiro |
| `unidades` | sim | **em qual site aparece** — leia a seção abaixo |
| `ambientes` | sim | alimenta o filtro por ambiente. Use os nomes já existentes |
| `acabamentos` | sim | `nome` e `codigo` de cada um |
| `abertura` | sim | a foto do topo e do preview de link |
| `fotos` | sim | a galeria, na ordem em que aparecem |
| `arquiteto` | não | só se houver, e só com `autorizado: true` |
| corpo do texto | sim | um parágrafo do que o projeto **resolveu** |

### `legenda` e `alt` não são a mesma coisa

- **`legenda`** é o que aparece impresso sob a foto: ambiente e acabamento
  principal. Curta.
- **`alt`** é o que uma pessoa cega ouve no lugar da foto, e o que o Google lê.
  Descreve **o que se vê**, e não repete a legenda. Um teste falha se forem
  iguais.

### O parágrafo do corpo

Diga **o que o projeto resolveu** — o problema do apartamento e a saída que a
marcenaria deu. Não descreva o que a foto já mostra. Dois a quatro períodos.

---

## Passo 3 — Escolher em qual site o projeto aparece

Este é o campo que mais dá errado, e o erro é caro.

```yaml
unidades: [sjc]              # só em dalmobilesjc.com.br
unidades: [caragua]          # só em dalmobilecaraguatatuba.com.br
unidades: [sjc, caragua]     # nos dois
```

Um projeto de Caraguatatuba marcado como `[sjc]` vai ao ar no site errado. O
site anterior foi indexado com a cidade errada, e é o erro que este projeto
existe para tornar impossível.

Na dúvida, use só a unidade que executou o projeto.

---

## Passo 4 — Conferir antes de publicar

Rode, na pasta do projeto:

```bash
npm run fotos     # gera as versões de cada foto
npm test          # valida o conteúdo e as regras do site
npm run dev       # abre o site de SJC em http://localhost:5173
npm run dev:caragua   # o de Caraguatatuba
```

**A lista de conferência:**

- [ ] O projeto aparece em `/projetos` **do site certo**, e não do outro
- [ ] A foto de abertura é a melhor foto do conjunto
- [ ] Todas as fotos carregam, na ordem certa
- [ ] Os códigos de acabamento conferem com a proposta
- [ ] O nome do arquiteto só aparece se a autorização estiver em mãos
- [ ] O filtro por ambiente e por edifício encontra o projeto
- [ ] No celular, nada rola para o lado

Depois, `npm run deploy:sjc` ou `npm run deploy:caragua`.

---

## Quando algo dá errado

O build **para** e diz o quê. Os erros mais comuns:

| Mensagem | O que fazer |
|---|---|
| `falta o campo obrigatório "X"` | acrescente o campo `X` no frontmatter |
| `"unidades" precisa listar ao menos uma unidade` | use `[sjc]`, `[caragua]` ou `[sjc, caragua]` |
| `unidade "X" não existe` | só existem `sjc` e `caragua` |
| `a foto ... não está no manifesto` | o caminho está errado, ou faltou `npm run fotos` |
| `falta o parágrafo do corpo` | escreva o texto **abaixo** do segundo `---` |
| `alt igual à legenda` | o `alt` descreve a imagem; a legenda a nomeia |

Se o erro citar um arquivo em `config/`, não é problema do projeto: é dado da
loja pendente. Rode `npm run pendencias`.

---

## O que barra a publicação

`npm run deploy:*` **recusa** publicar enquanto houver:

- projeto marcado com `exemplo: true` (os três que vieram com a Fase 4 são
  inventados, para desenvolvimento — **apague-os** quando os reais entrarem)
- arquiteto com `autorizado: false`
- dado da loja ainda por confirmar

Isso é proposital. Rode `npm run pendencias` para ver a lista.

---

## Depoimento do cliente

Ainda **não** está implementado. É o bloco 7 do case, e entra quando a loja
trouxer o primeiro depoimento com autorização de uso. Depoimento vale muito
mais colado na obra que o gerou do que solto numa seção genérica — por isso ele
vive dentro do case, e não numa página de "avaliações".
