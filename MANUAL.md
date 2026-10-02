# Manual do site da Dalmóbile

**Este é o documento de entrada.** Se você é uma IA e recebeu só este arquivo,
ele basta para entender o projeto e fazer as tarefas mais comuns. Onde algo
precisar de mais profundidade, há o ponteiro para o documento certo.

Se você é uma pessoa: leia a seção que corresponde à sua tarefa. Não precisa
ler o resto.

> **Última verificação: 16/09/2026.** Todos os números deste documento foram
> medidos, não estimados. Se algo aqui divergir do código, **o código vence** —
> e este arquivo precisa ser corrigido.

---

## 1. O que é este projeto

Um repositório que gera **dois sites institucionais** da Dalmóbile, uma loja de
móveis planejados:

```
config/sjc.ts      →  build  →  dalmobilesjc.com.br
config/caragua.ts  →  build  →  dalmobilecaraguatatuba.com.br
```

Não são dois projetos. É um código só, com dois alvos de build. **O que difere
entre as duas lojas vive em `config/`** — e em nenhum outro lugar.

### A regra que explica quase todas as decisões

O site anterior de Caraguatatuba foi ao ar indexado como *"Móveis Planejados em
São José dos Campos"*, porque eram dois repositórios e alguém copiou um e
esqueceu de trocar. **Boa parte da arquitetura e dos testes deste projeto existe
para tornar esse erro impossível.**

Se você for mexer em algo e tiver dúvida, a pergunta certa é: *isto pode fazer
um site citar a cidade do outro?*

### O ativo do cliente

Fotografia de **projeto executado pela Dalmóbile**, com o arquiteto que assinou.
Nunca render, nunca banco de imagem, nunca apartamento vazio. Todo o desenho do
site existe para essas fotos aparecerem grandes e intactas.

---

## 2. Como rodar

Node.js 22.13 ou mais novo.

```bash
npm install

npm run dev            # São José dos Campos — http://localhost:5173
npm run dev:caragua    # Caraguatatuba

npm test               # builda e testa as DUAS unidades (57 testes cada)
npm run test:sjc       # só São José dos Campos
npm run test:caragua   # só Caraguatatuba
npm run lint
npx tsc --noEmit

npm run pendencias     # o que ainda falta a loja confirmar
```

### Antes de publicar, rode no motor da Cloudflare

```bash
npm run build:sjc
npm run workerd        # sobe em http://localhost:8799
```

**Isto não é opcional.** A suíte de testes roda o Worker **em Node**, onde
`fs` existe. O runtime da Cloudflare é o `workerd`, que **não tem sistema de
arquivos**. Dois deploys já caíram por essa diferença, com 100% dos testes
verdes. Ver [`tests/README-workerd.md`](tests/README-workerd.md).

---

## 3. O que está no ar

| Rota | O que é |
|---|---|
| `/` | home — abertura em vídeo, manifesto, grade de projetos, fábrica, a loja, rodapé |
| `/ambientes` | hub: grade dos ambientes daquela unidade |
| `/ambientes/[slug]` | página do ambiente: texto + galeria |
| `/a-loja` | endereço, telefone, WhatsApp, horário, mapa, schema `LocalBusiness` |
| `/a-dalmobile` | institucional: fábrica, processo, materiais, garantia, FAQ |
| `/arquitetos` | proposta de parceria com escritórios |
| `/privacidade` | LGPD |
| `/sitemap.xml` · `/robots.txt` | gerados do config, um por unidade |
| qualquer outra | 404 com os caminhos úteis |

**`/projetos` e `/projetos/[slug]` existem no código mas estão sem conteúdo**, e
por isso ficam fora do menu, do sitemap e do robots. Ver a seção 8.

### Os sete ambientes

Cozinha · Quartos · Sala de estar · Home office · Closet · Banheiro ·
Espaço gourmet

A lista é **fechada**, em `lib/ambientes.ts`. Nome fora dela quebra o build, de
propósito: com fotos carregadas por pessoas diferentes ao longo de meses,
"Quarto", "quartos" e "Dormitório" virariam três páginas para a mesma coisa.

Cada ambiente traz também a **concordância** (`artigo`, `planejado`,
`singular`). Sem isso o site escrevia "Cozinha planejado" no `<title>` e "Quer
um quartos assim" na chamada.

---

## 4. Onde fica cada coisa

```
config/           o que difere entre as duas lojas
conteudo/         os textos e a lista de fotos de cada página
public/fotos/     as fotos, por unidade e por ambiente
lib/              leitura e validação do conteúdo
app/              as rotas
components/       cabeçalho, rodapé, superfícies, foto, slider
build/            os dois passos que rodam antes do build
tests/            57 testes
docs/             documentação detalhada
```

### As três regras de arquitetura que não podem ser quebradas

**1. Nenhuma página em `app/` pode importar valor de `lib/projetos.ts`,
`lib/ambientes-conteudo.ts` ou `lib/institucional.ts`.**
Esses três leem o disco com `readFileSync`, e o Worker da Cloudflare **não tem
sistema de arquivos**. Importar um valor deles — mesmo sem chamar a leitura —
arrasta o `fs` para o bundle e derruba o deploy. As páginas leem de
`lib/conteudo.ts`, que importa um JSON gerado no build.

**2. Zero cor literal fora de `app/tokens.css`.**
Nem hex, nem `rgb()`, nem `hsl()`, nem `oklch()`. Um teste barra.

**3. Nunca duplicar componente, estilo ou texto por unidade.**
Se algo precisa ser diferente entre as lojas, vira **campo no config**. Foi
assim que a paleta de Caraguá foi feita: um campo, não um segundo CSS.

---

## 5. Tarefa: publicar fotos novas

É a tarefa que mais se repete. Passo a passo completo em
[`docs/adicionar-ambiente.md`](docs/adicionar-ambiente.md); o resumo:

### 5.1 A foto vai para a pasta certa

```
public/fotos/<unidade>/<ambiente>/<arquivo>.webp
```

| | |
|---|---|
| `<unidade>` | `sjc`, `caragua` ou `comum` (aparece nos dois sites) |
| `<ambiente>` | `cozinha` `quartos` `sala-de-estar` `home-office` `closet` `banheiro` `espaco-gourmet` |

**A pasta é dado, não arrumação.** Se a foto estiver na pasta errada, o build
para e diz onde ela deveria estar.

Mande o arquivo **grande** — pelo menos 1920px de largura. **Não reduza à mão:**
`npm run fotos` gera sozinho as versões de 440, 880, 1240 e 1920px e serve a
certa para cada tela. Os originais em resolução cheia ficam em `imgs/`, fora do
repositório.

### 5.2 Descreva a foto no arquivo do ambiente

Em `conteudo/ambientes/<ambiente>.md`, acrescente um bloco em `fotos:`:

```yaml
  - src: /fotos/sjc/cozinha/19052023-riz2690.webp
    titulo: Ilha de jantar que dispensa a mesa
    alt: Cozinha com ilha central em madeira clara que serve de mesa para oito lugares, armários azuis e cooktop com coifa suspensa
    edificio:
    arquiteto:
```

| Campo | O que é |
|---|---|
| `titulo` | a chamada de impacto: **o que a foto resolve**, não o que ela mostra |
| `alt` | o que se vê, para quem não vê a imagem. **Não pode repetir o título** — um teste falha |
| `edificio` | prédio ou condomínio. Vazio = a linha de crédito não aparece |
| `arquiteto` | **só com autorização por escrito**, e ela vale por projeto |

### 5.3 Confira

```bash
npm run fotos && npm test
npm run dev          # e npm run dev:caragua
```

---

## 6. Tarefa: mudar texto do site

| Onde está o texto | Arquivo |
|---|---|
| Páginas de ambiente | `conteudo/ambientes/<slug>.md` |
| `/a-dalmobile` e `/arquitetos` | `conteudo/institucional/*.md` |
| Home, `/a-loja`, `/privacidade`, 404 | direto no `.tsx` da rota, em `app/` |
| Endereço, telefone, horário, menu | `config/sjc.ts` e `config/caragua.ts` |

### A regra que mais pega quem escreve

**Os textos de `conteudo/` são compartilhados pelos dois sites.** Se o texto
precisa citar a cidade, escreva o marcador — nunca o nome:

```yaml
chamada: Fábrica própria desde 1977. Loja em {{cidade}}.
resposta: Para quem está mais perto, a loja de {{outraCidade}} pode atender melhor.
```

`lib/texto.ts` substitui por unidade. Escrever "São José dos Campos" à mão faz
o site de Caraguatatuba ir ao ar com a cidade errada — que é exatamente o erro
que derrubou o site anterior.

### A voz do texto

Três regras, de [`docs/copy/sjc.md`](docs/copy/sjc.md):

1. **Nomear a decisão, não o sentimento.** *"Ilha de jantar que dispensa a
   mesa"* diz mais que um parágrafo sobre "ambientes que expressam sua forma
   de viver".
2. **Termo técnico vem com a consequência colada.** *"Gabinete suspenso, sem pé
   no piso molhado"* — o arquiteto reconhece o termo, o cliente entende pela
   consequência.
3. **Nenhuma frase que o concorrente também poderia assinar.**

Quando um bloco parecer fraco, seja **mais específico** — nunca mais adjetivo.

**Proibido:** "Quero meu projeto", "Solicite seu orçamento grátis", "Transforme
seu lar", "alto padrão", "sonho", "aconchego", contador de urgência, selo
inventado.

---

## 7. Tarefa: mudar dado da loja

Tudo em `config/sjc.ts` e `config/caragua.ts`. Os campos estão documentados um a
um em [`docs/unidades.md`](docs/unidades.md).

**Endereço, telefone e horário têm que bater exatamente com o Google Business
Profile** daquela loja. Divergência derruba a busca local e invalida o schema
`LocalBusiness` de `/a-loja`.

### Dado que a loja ainda não confirmou

Escreva `PENDENTE` no lugar do valor. O que acontece:

- o campo é **omitido** da página, não vira buraco
- `npm run pendencias` lista o que falta
- `npm run deploy:*` **recusa publicar**
- um teste falha se a palavra "PENDENTE" chegar ao HTML

Horário não confirmado (`confirmado: false`) também não entra no schema:
alimentar a busca local com dado que a loja não confirmou é pior que não
alimentar.

---

## 8. O estado de hoje, e o que falta

### Pendências com a loja — 4

Rode `npm run pendencias` para ver o estado atual. Hoje:

| Campo | O que é |
|---|---|
| `a-dalmobile.processo[3].prazo` | prazo de produção em dias úteis |
| `a-dalmobile.faq[1].resposta` | "quanto tempo leva" — depende do prazo acima |
| `a-dalmobile.garantia.certificado` | o PDF do certificado |
| `a-dalmobile.fabrica.foto` | foto da fábrica de Bento Gonçalves |

**Enquanto houver pendência, `npm run deploy:*` não publica.**

### Outras coisas em aberto

- **Horário contra o Google Meu Negócio** — não foi possível conferir
  automaticamente (o Maps só monta a ficha com JavaScript)
- **Prédio e arquiteto de cada foto** — os campos existem e estão vazios
- **Formulário de contato** — não existe. Quando entrar, **`/privacidade`
  precisa ser reescrita antes**: hoje ela afirma que o site não usa cookie de
  rastreamento
- **Redirects das URLs antigas** — falta a lista do Search Console
- **Copy de Caraguatatuba** — só a de SJC foi escrita

Lista completa e atualizada em [`docs/pendencias.md`](docs/pendencias.md).

### A camada de projetos está dormente

`/projetos`, `/projetos/[slug]` e `lib/projetos.ts` existem e funcionam, **sem
conteúdo**. Montar um case exige ficha técnica: local, ano, acabamentos com
código e arquiteto — dados que ainda não temos.

Cada foto já guarda de qual apartamento veio (no nome do arquivo:
`27062023-riz4771`, `dalmobile-calabasasapto93-0919`) e tem os campos
`edificio` e `arquiteto` prontos. Quando os dados chegarem, os cases voltam sem
reescrever conteúdo.

---

## 9. Publicação

Dois projetos no Cloudflare Workers Builds, que constroem a cada push na `main`:

| Projeto | Comando de build |
|---|---|
| `dalmobile-sjc` | `npm run build:sjc` |
| `dalmobile-caragua` | `npm run build:caragua` |

> **`npm run build` puro não serve em CI.** Sem a variável `UNIDADE` ele cairia
> no padrão e publicaria São José dos Campos — **inclusive no projeto de
> Caraguatatuba**, em silêncio. Por isso o build **recusa rodar em CI** sem ela,
> com uma mensagem dizendo o que configurar.

Para publicar da sua máquina: `npm run deploy:sjc` ou `npm run deploy:caragua`.
Os dois rodam `npm run pendencias` antes e recusam publicar com dado por
confirmar.

### Checklist antes de qualquer deploy

Está no `CLAUDE.md`, seção "Obrigatório antes de qualquer deploy". Os itens que
mais são esquecidos:

- [ ] Rodado em **`workerd`**, não só em Node
- [ ] Nenhum andaime de protótipo no build — **nem rota de teste**
- [ ] Nenhum CTA sem destino real
- [ ] Testado nas seis larguras, sem rolagem horizontal

---

## 10. Os testes, e o que cada um protege

57 testes, rodados **uma vez para cada unidade**: `npm test` builda SJC e
testa, depois builda Caraguá e testa. Eles sempre testam o que seria publicado,
nos dois sites.

Os testes que dependem da unidade (`seo`, `layout`, `unidade-cruzada`) **não
importam config fixo**: descobrem de qual unidade é o build pelo canônico da
home, em `tests/unidade-do-build.mjs`. Até 01/10/2026 eles importavam
`config/sjc.ts`, e o build de Caraguá reprovava em 9 testes sem ter erro —
enquanto um erro de verdade em Caraguá passaria. Não volte a importar o config
de uma unidade num teste que olha o HTML.

| Arquivo | Protege |
|---|---|
| `unidade-cruzada.test.mjs` | **o erro que derrubou o site anterior** — ver abaixo |
| `bundle-worker.test.mjs` | que o bundle do Worker não leia disco |
| `design-tokens.test.mjs` | zero cor literal fora dos tokens, zero `100vh` |
| `layout.test.mjs` | rodapé, menu mobile, links que resolvem, sem rota de teste |
| `ambientes.test.mjs` | conteúdo, alt, pasta certa, nenhum `PENDENTE` no HTML |
| `projetos.test.mjs` | a camada dormente continua funcionando |
| `seo.test.mjs` | title, description, OpenGraph, canônico, sitemap, robots |
| `rendered-html.test.mjs` | o Worker responde HTML em português |

### Como o teste de cidade cruzada funciona

Ele **não** proíbe a string. A copy nomeia a loja irmã de propósito, porque
ajuda quem chegou na cidade errada. A proibição mira onde o dano acontece:

1. **Banimento absoluto** em `<title>`, `meta description`, OpenGraph,
   canônico, `<h1>`, schema e **o sitemap inteiro**. É por esses campos que o
   Google decide de que praça o site é.
2. **No corpo, só menção declarada.** Toda ocorrência tem que casar com uma das
   frases de `MENCOES_DECLARADAS`, no próprio arquivo de teste. Uma menção nova
   quebra a suíte e obriga alguém a olhar — que é o ponto.

Se você precisar citar a outra cidade num texto novo, acrescente a frase à
lista **com um comentário dizendo por que ela ajuda o leitor**.

---

## 11. Design — o que não se decide de novo

Detalhe em [`docs/design-system.md`](docs/design-system.md). O essencial:

| | |
|---|---|
| **Tipografia** | Krub, e só Krub. Pesos 300, 400, 600. Hierarquia por escala e tracking, nunca por engordar peso |
| **Cor** | acromática. **Não existe cor de acento.** Falta destaque? escala ou troca de superfície |
| **Superfícies** | preto (a imagem manda) · cinza (costura) · papel (o texto manda). Máximo 4 trocas por página |
| **Forma** | `border-radius: 0` em tudo. Separação por fio de 1px. **Zero sombra** |
| **Foto** | **nunca escurecida, nunca com filtro.** Texto sobre foto só em painel sólido ancorado |
| **Movimento** | mínimo e lento. **Proibido parallax, scroll sequestrado, carrossel automático** |
| **Medida de leitura** | 62 a 66 caracteres. Nunca texto corrido em largura total |

Caraguatatuba usa a paleta **palha** (`data-paleta="palha"` no `<html>`): só a
família do cinza muda, para tons de areia. A escolha é um campo do config; os
valores vivem em `app/tokens.css`.

### Peso, que é requisito e não detalhe

A home baixa **88 KB gzip**. O cliente abre no celular, por 4G, quase sempre por
link de WhatsApp. **Não instalar biblioteca de UI, de animação ou de carrossel.**
Se um componente parecer precisar de dependência nova, **pergunte antes**.

Um estudo de cena 3D foi construído e descartado em 14/09/2026 — ele dobrava o
peso da home. O registro do porquê está no `CHANGELOG.md`.

---

## 12. Os outros documentos

| Arquivo | Quando ler |
|---|---|
| [`CLAUDE.md`](CLAUDE.md) | **as regras.** Em conflito com qualquer outro documento, ele vence |
| [`docs/adicionar-ambiente.md`](docs/adicionar-ambiente.md) | publicar fotos — escrito para quem não programa |
| [`docs/adicionar-projeto.md`](docs/adicionar-projeto.md) | publicar um case, quando a camada acordar |
| [`docs/unidades.md`](docs/unidades.md) | o que cada campo do config faz |
| [`docs/design-system.md`](docs/design-system.md) | tokens, escala, exemplos |
| [`docs/decisoes.md`](docs/decisoes.md) | **por que as coisas são como são.** Leia antes de desfazer qualquer decisão |
| [`docs/direcao-site.md`](docs/direcao-site.md) | o que cada página tem e por quê |
| [`docs/copy/sjc.md`](docs/copy/sjc.md) | o texto aprovado, com o motivo de cada escolha |
| [`docs/pendencias.md`](docs/pendencias.md) | o que falta |
| [`CHANGELOG.md`](CHANGELOG.md) | o que mudou em cada entrega |
| [`docs/prompts-construcao.md`](docs/prompts-construcao.md) | histórico: o plano de nove fases, concluído |

**`docs/decisoes.md` é o mais importante para quem vai mexer.** Ele existe
porque, sem ele, daqui a seis meses alguém "melhora" o site desfazendo uma
decisão — de boa-fé, por não saber que era decisão.

---

## 13. Se você é uma IA lendo isto

Quatro coisas que este projeto aprendeu do jeito difícil, e que valem mais que
qualquer instrução genérica:

**1. A suíte verde não significa que sobe.** Os testes rodam o Worker em Node,
onde `fs` existe. O runtime real não tem disco. Sempre `npm run workerd` antes
de dizer que está pronto.

**2. Teste que trava um valor quebra quando o código fica certo.** Já aconteceu
três vezes aqui: o teste fixava o telefone, o horário, a ausência de WhatsApp.
Teste a **regra**, lendo do config — nunca o valor.

**3. Nenhum número vai ao ar sem confirmação da loja.** Anos de fábrica,
garantia, prazo, quantidade de projetos. Se não tiver confirmação, use
`PENDENTE` e deixe a trava de deploy fazer o trabalho. Um prazo de garantia
inventado não é texto ruim — é promessa contratual falsa.

**4. Verifique antes de afirmar.** Este projeto tem números medidos em quase
todo documento. Se você for dizer que algo pesa, mede. Se for dizer que uma
rota responde, busca. Já houve caso de eu afirmar que um painel usava texto
branco quando usava preto — e a decisão seguinte teria saído errada.
