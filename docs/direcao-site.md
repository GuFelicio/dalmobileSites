# Direção do site — Dalmóbile

Composição página por página, seção por seção.

> **Divisão de responsabilidade entre os dois documentos, para não haver contradição:**
> O **`CLAUDE.md`** manda em regras, tokens, paleta, escala tipográfica, grade, forma, responsividade e stack.
> Este arquivo manda em **o que cada página tem, em que ordem, e por quê**.
> Nenhum valor de cor, tamanho ou espaçamento é repetido aqui. Se este documento parecer contradizer o `CLAUDE.md`, o `CLAUDE.md` vence.

---

## 1. O que estamos fazendo

Um **site institucional** de uma loja de móveis planejados com quase cinco décadas de fábrica. Não é landing page: a pessoa chega por qualquer porta — do Google direto numa página de ambiente, do WhatsApp direto num projeto, do Instagram na home. Toda página precisa se sustentar sozinha e levar a qualquer outra.

O site tem uma coisa que a concorrência não tem: **projetos executados, fotografados de verdade, com o arquiteto que assinou**. Todo o desenho existe para essas fotos aparecerem grandes e intactas.

**A promessa, idêntica nas duas unidades:** o móvel é feito para você, seja onde for. O que muda entre SJC e Caraguá não é o discurso — é a prova: quais projetos, quais ambientes, quais fotos.

**Assinatura da marca:** CRIE SEU MUNDO.

---

## 2. O caráter: fino, com peso

A tensão central do projeto, resolvida por divisão de trabalho:

- **O peso vem da massa.** Preto ocupando a tela inteira. Foto sangrando de borda a borda. Poucos elementos por tela. Silêncio entre as seções.
- **A fineza vem do detalhe.** Fio de 1px em vez de borda. Rótulos pequenos e muito espaçados. Krub 300 com tracking negativo. Zero sombra.

**Nunca inverta.** Se uma tela parecer fraca, a correção é aumentar a foto ou tirar elementos — nunca engordar a tipografia ou acrescentar cor.

---

## 3. Home

Índice da marca, não funil. Oito blocos. Sequência de superfícies: **preto → papel → cinza → papel → cinza**.

### 3.1 Abertura · preto

Uma foto do ensaio profissional, 16:9, sangrando de ponta a ponta, altura máxima 78vh (`svh`, nunca `vh`). **Sem texto por cima.**

Logo abaixo, em faixa preta: título em Display XL alinhado à esquerda, até três linhas, largura máxima 20 caracteres. Subtítulo em duas linhas, máximo 42 caracteres de largura. Um botão sólido.

> **Feito para você, seja onde for.**
> Projeto sob medida, fábrica própria e montagem completa. Há mais de 40 anos no Vale do Paraíba.
> `[Ver projetos]`

*Por que o texto não vai sobre a foto:* a imagem é o produto. Escurecer para caber título joga fora o único ativo que a loja tem e a concorrência não. A foto abre inteira; a tipografia ganha palco próprio. Fica editorial em vez de anúncio.

*Sem carrossel.* Divide a atenção e nenhuma foto ganha o tamanho que merece.

### 3.2 Projetos em destaque · preto

Três projetos, empilhados, **alternando o lado**. Foto 3:2 em cerca de dois terços da largura; coluna de texto no terço restante, centrada verticalmente. No mobile empilha, **sempre foto primeiro**.

Cada um: rótulo com o arquiteto (`PROJETO ASSINADO POR GUSTAVO DIAS`), nome do projeto, duas ou três linhas de texto, botão de contorno.

*Por quê:* as fotos são grande angular de ambiente inteiro. Três cards pequenos em fila desperdiçam exatamente o que elas têm. Alternar o lado dá ritmo sem ornamento.

Fecha com um link discreto: **Ver todos os projetos →**

### 3.3 Ambientes · papel

Primeira troca de superfície. Grade 4/3/2 colunas, foto 4:3 com o nome do ambiente abaixo em rótulo.

Em SJC, os oito dos catálogos: cozinha compacta, closet, lavanderia, casa integrada, home office, sala de estar, cozinha gourmet, banheiro. Em Caraguá, o conjunto que a curadoria do acervo do litoral definir.

*Por quê:* aqui card pequeno funciona — são rótulos com foto de apoio, não peças de portfólio. É a porta de entrada da busca orgânica, e é a estrutura que a Costa Flores não tem.

### 3.4 Edifícios onde já estamos · papel

Mesma superfície, sem quebra. Lista tipográfica, **sem foto**: nome do edifício, cidade em apoio, número de projetos à direita em `tabular-nums`.

```
Rizzuti          São José dos Campos          6
Kikute           São José dos Campos          1
Monte Carlo      São José dos Campos          1
Calabassas       São José dos Campos          1
Golf             São José dos Campos          1
```

*Por quê — e este é o bloco que ninguém tem:* a Dalmóbile não tem cliente espalhado, tem presença repetida nos mesmos prédios. Para quem acabou de comprar no Rizzuti, "já fizemos seis apartamentos aqui" vale mais que qualquer parágrafo institucional. É também busca local pura.

Cada linha é link para o portfólio filtrado por aquele edifício.

### 3.5 Tira de arquitetos · preto

Faixa fina, altura de uma linha respirada. Uma frase e um link. É pontuação entre duas superfícies claras, não seção.

> Projetamos junto com escritórios de arquitetura do Vale. **Conheça a parceria →**

### 3.6 A Dalmóbile em uma respirada · cinza

Duas colunas. À esquerda, três ou quatro linhas sobre fábrica, processo e garantia, com link para o institucional. À direita, o vídeo institucional em 16:9 (já existe, hospedado fora).

Abaixo, versão curta da faixa de números — **três, no máximo, e só os confirmados com a loja**. Número sem confirmação não vai ao ar; deixar o slot comentado.

### 3.7 A loja · papel

Duas colunas. À esquerda, foto da fachada ou mapa estático. À direita, endereço completo, telefone, horário e botão de WhatsApp.

*Detalhe pequeno com retorno alto:* **publicar o horário**. O concorrente mais forte de SJC não publica o dele.

### 3.8 Rodapé · cinza

---

## 4. Projetos — índice · preto

Cabeçalho de página: título, uma linha de intro, contagem de projetos.

**Filtro em dois eixos**, lado a lado, em chips: por ambiente e por edifício. **Estado do filtro na URL**, para o link ser compartilhável e indexável.

Grade de 2 colunas no desktop, 1 no mobile e no tablet até 820px. Foto 3:2. Sob cada uma: nome, edifício em rótulo, arquiteto em apoio.

Sem paginação numerada — botão **Carregar mais**. Ordem padrão: mais recentes primeiro.

*Por que 2 colunas e não 3:* as fotos pedem largura. Três colunas transformam ensaio profissional em miniatura.

---

## 5. Case — o gabarito mais importante · preto

É a página que o vendedor manda no WhatsApp e que o arquiteto guarda. O site tem trinta dela e uma home.

1. **Caminho de navegação** — Projetos / Edifício Rizzuti / Dr. Marcos
2. **Cabeçalho** — nome do projeto em Display L; abaixo, rótulo com edifício, bairro e ano
3. **Foto de abertura** — sangrando, 16:9, sem texto por cima
4. **Texto curto** — um parágrafo, medida de 62 a 66 caracteres, sobre o que o projeto resolveu. Não descrever o que a foto já mostra
5. **Ficha técnica** — coluna lateral no desktop, **abaixo da foto no tablet e no mobile**: local, ano, ambientes, acabamentos com nome e código, arquiteto com link
6. **Galeria** — fotos grandes empilhadas, **uma por bloco**, legenda curta abaixo de cada (ambiente e acabamento principal). Nunca mosaico, nunca miniatura
7. **Depoimento do cliente**, quando houver — dentro do case, colado na obra que o gerou. Vale mais que cinco estrelas soltas numa seção genérica
8. **Outros projetos neste edifício** — três cards. É o diferencial trabalhando de novo
9. **Chamada final** — "Falar sobre um projeto assim", em faixa cinza

*Ficha técnica não existe em nenhum site do Vale.* Para quem compara propostas de seis dígitos, é o que constrói confiança.

---

## 6. Ambientes

### 6.1 Hub · papel
Título, uma linha de intro, e a grade completa dos ambientes em 4:3.

### 6.2 Página do ambiente · papel
1. Cabeçalho — nome do ambiente em Display L, complemento em Subtítulo
2. **Texto do catálogo**, 45 a 60 palavras, medida curta. Já escrito, serve sem reescrita
3. Galeria daquele ambiente, reunindo fotos de projetos diferentes, cada uma creditando o projeto de origem
4. **Projetos que têm este ambiente** — cards linkando para os cases
5. Chamada final

*O cruzamento nos dois sentidos — ambiente aponta para projeto, projeto aponta para ambiente — é a estrutura que nenhum concorrente tem. A Costa Flores tem o portfólio e não tem as páginas de ambiente; o Top Vale tem o inverso.*

---

## 7. A Dalmóbile · papel

Página de texto longo. Medida curta, muito respiro, foto pontuando a leitura.

1. **Abertura** — Display L e um parágrafo de posicionamento
2. **A fábrica** — texto e fotos. Nenhum concorrente do Vale mostra fábrica em imagem
3. **O processo** — etapas numeradas, do projeto à montagem. A numeração aqui é legítima: é sequência de verdade. **Com prazo em dias em cada etapa**, se a loja confirmar. Ninguém no Vale publica prazo
4. **Materiais e acabamentos**
5. **Garantia** — em destaque, com número e link para o certificado. Nenhum concorrente publica prazo de garantia
6. **Faixa de números completa** — quatro a seis
7. **Perguntas frequentes** — seção indexável, não acordeão de venda. Responder de verdade: quanto tempo leva, o que a garantia cobre, como se forma o orçamento, atende fora da cidade
8. **Vídeo institucional**

---

## 8. Arquitetos · papel

Conversa com a campanha que já está no ar. **Nenhum dos seis sites de SJC analisados tem essa área** — é o buraco mais valioso do mercado.

1. Abertura — o que a Dalmóbile oferece a quem projeta
2. Como funciona a parceria — detalhamento técnico, prazo de resposta a orçamento de escritório, visita à fábrica
3. **Arquitetos parceiros** — nome de cada um e os projetos que assinou, linkando para os cases
4. Formulário próprio, separado do formulário de cliente final

Publicar nome de terceiro exige autorização de cada arquiteto — combinar antes.

---

## 9. A loja · papel

1. Cabeçalho com o nome da unidade
2. Foto da fachada e do interior
3. Endereço, telefone, WhatsApp, horário completo, mapa
4. Formulário de contato
5. Link para a outra unidade

Endereço, telefone e horário aqui têm que bater **exatamente** com o Google Business Profile daquela loja. É a página que sustenta a busca local e o schema `LocalBusiness`.

---

## 10. 404 e Privacidade · papel

**404** — uma linha honesta, e os quatro caminhos mais úteis: projetos, ambientes, a loja, WhatsApp. Sem piada.

**Privacidade** — exigência da LGPD, porque o formulário coleta nome, telefone e e-mail. Texto simples, link no rodapé e ao lado do checkbox de consentimento.

---

## 11. Formulário

Curto, para qualificar sem criar atrito:

- Nome
- E-mail
- Telefone
- **Faixa de investimento** (lista): até R$ 40 mil · R$ 40 a 80 mil · R$ 80 a 150 mil · acima de R$ 150 mil
- Checkbox de consentimento com link para a privacidade

Campos sem caixa: rótulo em cima, fio de 1px embaixo, fundo transparente.

O lead precisa carregar **de qual unidade veio**.

---

## 12. Microcópia

Direta, na voz da marca, sem linguagem de funil.

| Onde | Texto |
|---|---|
| Botão principal da abertura | Ver projetos |
| Card de projeto | Ver projeto |
| Fim de case | Falar sobre um projeto assim |
| Formulário | Enviar |
| Confirmação | Recebemos. Respondemos em até um dia útil. |
| Erro de campo | Diz o que fazer, não pede desculpa: "Falta o telefone com DDD" |
| WhatsApp | Falar no WhatsApp |
| 404 | Esta página não existe mais. |

**Não usar:** "Quero meu projeto", "Solicite seu orçamento grátis", "Transforme seu lar", "alto padrão", contador de urgência, selo inventado.

---

## 13. O que não fazer

- Escurecer foto para caber texto
- Centralizar qualquer coisa
- Arredondar qualquer canto
- Introduzir cor de acento
- Usar render, banco de imagem ou registro de obra em apartamento vazio — só ensaio profissional
- Sombra em card
- Carrossel automático
- Publicar número que a loja não confirmou
- Repetir o mesmo botão descendo a página
- Deixar qualquer página sem cabeçalho completo e caminho de navegação
- Mencionar São José dos Campos no site de Caraguá, ou o contrário

---

## 14. Ainda em aberto

- Quais e quantos ambientes em Caraguá — sai da curadoria do acervo do litoral
- Quais fotos são de projeto executado pela Dalmóbile
- Garantia em anos, anos de fábrica e demais números — confirmar com a loja
- Se o filtro por edifício entra na v1 ou depois do primeiro lote de cases
