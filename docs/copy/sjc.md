# Copy do site — Dalmóbile São José dos Campos

> **HISTÓRICO — não usar.** Substituído em 02/10/2026 pela copy v3,
> [`docs/copy-v3.md`](../copy-v3.md), que é a única fonte de texto dos dois
> sites. As regras de palavra estão em [`docs/vocabulario.md`](../vocabulario.md).
> Este arquivo fica só como registro do que esteve no ar até então.

**Revisão completa, 09/09/2026.** Cobre as páginas que estão no ar em `dalmobilesjc.gustavo-89c.workers.dev`: home, hub de ambientes, as 7 páginas de ambiente, A Dalmóbile, Para arquitetos, A loja e Privacidade.

Cada bloco abaixo é para copiar direto no código. Onde há uma decisão pendente, está marcado com **⚠️** e listado no fim do documento.

---

## A régua de voz

Três regras. Toda linha do site passa pelas três.

**1. Nomear a decisão, não o sentimento.**
O que diferencia a Dalmóbile é a escolha de projeto, não a emoção que ela provoca. "Ilha de jantar que dispensa a mesa" diz mais em seis palavras do que um parágrafo sobre "ambientes que expressam sua forma de viver".

**2. Todo termo técnico vem com a consequência colada.**
É o que faz o texto servir aos dois públicos ao mesmo tempo. O arquiteto reconhece o termo; o cliente final entende pela consequência. *"Frontão em pedra, sem rejunte à vista"* — o termo e o porquê na mesma linha. Termo sozinho confunde; consequência sozinha é genérica.

**3. Nenhuma frase que o concorrente também poderia assinar.**
Se a Costa Flores pode colar a frase no site dela sem mudar nada, a frase não é da Dalmóbile e não deveria estar no ar.

**Regra de correção:** quando um bloco parecer fraco, o caminho é ser mais específico — nunca mais adjetivo.

---

# 1 · Home

### Meta

| Campo | Texto |
|---|---|
| `title` | Móveis Planejados em São José dos Campos \| Dalmóbile |
| `description` | Móveis planejados projetados, fabricados e instalados pela Dalmóbile em São José dos Campos. Fábrica própria desde 1977, 100% MDF, 6 anos de garantia. |

### 1.1 Abertura

> **Rótulo:** MÓVEIS PLANEJADOS · SÃO JOSÉ DOS CAMPOS
>
> # O projeto começa na medição.
>
> Marcenaria desenhada, fabricada e instalada pela Dalmóbile. Fábrica própria desde 1977.
>
> `[Ver os ambientes ↗]`

*Por que mudou:* "Crie seu mundo" é assinatura de marca e continua no rodapé, onde assinatura fica. Como manchete, ela não diz nada que o concorrente não possa dizer. "O projeto começa na medição" diz uma coisa verificável, específica e que separa a Dalmóbile de quem vende módulo pronto — já na primeira linha.

**Alternativa**, se o cliente quiser a assinatura no topo: manter `CRIE SEU MUNDO` como rótulo (lugar do olho-mágico) e a manchete abaixo. A assinatura ganha destaque sem ocupar o lugar do argumento.

### 1.2 Seção 01 · manifesto (`#sintese-manifesto`)

> **01 — COMO PROJETAMOS**
>
> ## Nenhuma casa é igual à planta.
>
> A medição é feita no imóvel, com a obra pronta — é de lá que sai o desenho. O pé-direito real, o vão que ficou dois centímetros fora do projeto, a tomada que ninguém previu. O móvel se ajusta à casa; nunca o contrário.
>
> `Como trabalhamos ↗`
>
> **Selo:** FÁBRICA PRÓPRIA · 100% MDF · 6 ANOS DE GARANTIA

*Por que mudou:* "Liberdade criativa", "escuta", "repertório" e "identidade" são palavras que qualquer marcenaria do país usa. A frase acima é a mesma ideia — o projeto é seu, não é catálogo — dita por um fato de ofício. E o selo passa a carregar três dados verificáveis no lugar de "essência italiana", que não se sustenta em nada no site.

### 1.3 Seção 02 · portfólio

> **02 — PROJETOS EXECUTADOS**
>
> ## Fotografado depois da montagem.
>
> `Ver todos os ambientes ↗`

*Por que mudou:* "Mundos criados" e "Projetos que permanecem" são bonitos e vazios. "Fotografado depois da montagem" faz uma afirmação que a concorrência não pode fazer: aqui não tem render, não tem banco de imagem, não tem apartamento decorado de fornecedor. É o ativo do site declarado em quatro palavras.

**Legendas do carrossel — mantidas.** São o melhor texto do site: nomeiam a decisão de projeto, cabem numa linha e nenhuma poderia ser reaproveitada por outra loja. Não mexi em nenhuma.

Três valeria conferir contra a foto antes do go-live, porque descrevem cor ou estilo em vez de solução — que é o padrão das outras 33:

| # | Como está | Sugestão, se a foto permitir |
|---|---|---|
| 02 | Arco colorido feito de marcenaria | *Arco de marcenaria no lugar da porta* |
| 13 | Gabinete terracota contra o mármore | *Gabinete suspenso, sem pé no piso molhado* |
| 33 | Boiserie e madeira na mesma parede | *Boiserie e madeira sem emenda aparente* |

> **Contador:** 1 DE 12

### 1.4 Seção 03 · fábrica e garantia (`#sintese-processo`)

> **O QUE VEM POR ESCRITO**
>
> **03 — DA FÁBRICA À MONTAGEM**
>
> ## Produção própria, com garantia publicada.
>
> A marcenaria não é comprada de terceiro: sai da fábrica da própria Dalmóbile, 100% em MDF, com ferragem e acabamento definidos no projeto. Cada proposta vai com a lista de acabamentos por nome e código — o que permite comparar orçamentos com honestidade e repor uma peça daqui a cinco anos sem adivinhação.

**Faixa de números — três, todos confirmados:**

| Número | Legenda |
|---|---|
| **1977** | ano em que a fábrica começou |
| **100%** | MDF em todo o projeto |
| **6** | anos de garantia |

*Por que mudou:* ⚠️ **"500+ acessórios exclusivos" não tem fonte.** Não aparece em nenhum material da rede — o que existe publicado é outra coisa (padrões de BP, tons de laca, cores de vidro). Além disso, "acessório exclusivo" é linguagem de catálogo de fornecedor: não significa nada para quem está comprando uma cozinha.

⚠️ **"47 anos" está errado.** A empresa é de 1977, o que dá 49 em 2026. Troquei a contagem pelo ano: é verificável, é mais específico, e não precisa ser atualizado nunca mais. Se o cliente preferir a contagem, o número correto é 49 — ou "quase cinco décadas", que já está no `description`.

E "Tecnologia que amplia a criação" saiu porque não entrega informação nenhuma. O parágrafo novo diz o que a tecnologia faz na prática: código de acabamento na proposta é o detalhe que permite comparar orçamento e repor peça — e é justamente o que nenhum concorrente do Vale oferece.

### 1.5 Contato

> **SHOWROOM SÃO JOSÉ DOS CAMPOS**
>
> ## Venha com a planta em mãos.
>
> Av. Barão do Rio Branco, 736 — Jardim Esplanada, São José dos Campos — SP, 12242-800
> Segunda a sexta, 09h às 19h · Sábado, 08h às 14h ⚠️
>
> `[Falar no WhatsApp ↗]`

*Por que mudou:* "Seu mundo começa com uma conversa" é o clichê mais comum do setor. "Venha com a planta em mãos" faz três coisas de uma vez: diz o próximo passo concreto, sinaliza que ali se fala de projeto (não de venda), e qualifica quem chega. E publicar o horário aqui é vantagem direta — o concorrente mais forte de SJC não publica o dele.

### 1.6 Menu do topo

⚠️ **Problema de navegação, não de texto:** hoje "A Dalmóbile" e "Como criamos" apontam para âncoras da própria home. Quem entra pela home nunca descobre `/a-dalmobile` nem `/arquitetos`.

> **Menu:** Ambientes · A Dalmóbile · Para arquitetos · A loja
> **Botão:** Falar no WhatsApp ↗

As âncoras da home continuam existindo; só não devem ocupar o lugar das páginas.

---

# 2 · Ambientes (hub)

### Meta

| Campo | Texto |
|---|---|
| `title` | Ambientes — móveis planejados em São José dos Campos \| Dalmóbile |
| `description` | Cozinha, quartos, sala, home office, closet, banheiro e espaço gourmet planejados pela Dalmóbile em São José dos Campos. Fotos de projetos executados. |

> # Ambientes
>
> Cada ambiente resolve um problema diferente de marcenaria. As fotos abaixo são de projetos que a Dalmóbile desenhou, fabricou e instalou — nenhum render, nenhuma imagem de banco.

*Por que mudou:* a versão anterior já era boa. Só ficou explícito o que estava implícito: dizer que **não** há render é mais forte do que dizer que as fotos são de projetos executados, porque nomeia o que a concorrência faz.

---

# 3 · Páginas de ambiente

Cada página segue a mesma estrutura: rótulo → título → uma frase de subtítulo → um parágrafo → galeria → outros ambientes → chamada final.

**Duas correções valem para todas as sete:**

⚠️ **"no seu apartamento" sai.** A frase estava nas sete chamadas finais e exclui casa — que é metade do portfólio, incluindo o caso Lapinha.

⚠️ **A fôrma repetida sai.** Sete páginas terminando em "Quer um(a) X assim no seu apartamento?" é padrão de texto gerado, e o leitor percebe na segunda página. As perguntas abaixo variam; o botão continua o mesmo, que é o correto — botão é interface, não texto.

---

## 3.1 Cozinha

`title:` Cozinha planejada em São José dos Campos | Dalmóbile

> **AMBIENTES / COZINHA**
>
> # Cozinha
>
> ### É onde a marcenaria mais trabalha e menos aparece.
>
> Cooktop, coifa, torre de fornos, adega, lixeira e tomada têm lugar definido antes de a primeira peça ser cortada. Depois disso o desenho é consequência: a porta abre para o lado que não trava a passagem, a bancada fica na altura de quem cozinha, e o que é feio some atrás de uma porta.
>
> **Chamada final:** Quer resolver a sua cozinha?
> `[Falar sobre um projeto assim]`

⚠️ *Erro corrigido:* no ar, o subtítulo e o fim do parágrafo são **a mesma frase invertida** — "onde a marcenaria trabalha mais e aparece menos" / "É o ambiente onde a marcenaria mais trabalha e menos aparece". Agora a ideia aparece uma vez só, no subtítulo, e o parágrafo desenvolve em vez de repetir.

---

## 3.2 Quartos

`title:` Quartos planejados em São José dos Campos | Dalmóbile

> **AMBIENTES / QUARTOS**
>
> # Quartos
>
> ### Cabeceira, luz e guarda-roupa saem da mesma peça.
>
> Quando a marcenaria assume a parede inteira, o quarto para de parecer montado por partes. A cabeceira recebe a iluminação, o criado deixa de ser móvel solto e o guarda-roupa encosta no teto — que é onde ele deixa de juntar poeira em cima. O que se vê é uma parede, não quatro móveis.
>
> **Chamada final:** Quer um quarto resolvido assim?
> `[Falar sobre um projeto assim]`

---

## 3.3 Sala de estar

`title:` Sala de estar planejada em São José dos Campos | Dalmóbile

> **AMBIENTES / SALA DE ESTAR**
>
> # Sala de estar
>
> ### Estar e jantar resolvidos na mesma marcenaria.
>
> Na maioria das casas os dois dividem o mesmo cômodo, e é a marcenaria que separa um do outro sem levantar parede. Painel que engole a fiação, rack suspenso que libera o piso, estante que marca onde a mesa começa. A sala fica maior sem mudar de tamanho.
>
> **Chamada final:** Quer uma sala resolvida assim?
> `[Falar sobre um projeto assim]`

⚠️ *Erro corrigido:* o texto no ar é inteiro sobre **painel de TV** — mas metade das seis fotos é mesa de jantar em madeira maciça, estante aérea sobre a mesa e jardim vertical. O texto prometia uma galeria que não é a que está ali. A versão nova cobre o cômodo inteiro, que é o que as fotos mostram.

---

## 3.4 Home office

`title:` Home office planejado em São José dos Campos | Dalmóbile

> **AMBIENTES / HOME OFFICE**
>
> # Home office
>
> ### Trabalho que some quando o expediente acaba.
>
> Deixou de ser um canto emprestado da sala. Hoje pede fiação por dentro do móvel, luz de tarefa sobre a bancada e porta que fecha na frente do que não deve aparecer na chamada de vídeo. Às seis da tarde o escritório desaparece e o cômodo volta a ser o que era.
>
> **Chamada final:** Quer um home office assim?
> `[Falar sobre um projeto assim]`

*Nota:* aproveita a ideia que já estava escrita no catálogo de Home Office — vale manter a mesma frase circulando entre as peças, é o que constrói voz de marca.

---

## 3.5 Closet

`title:` Closet planejado em São José dos Campos | Dalmóbile

> **AMBIENTES / CLOSET**
>
> # Closet
>
> ### Dimensionado por contagem, não por metro quadrado.
>
> Antes de desenhar, a gente conta: quantos cabides longos, quantos curtos, quantos pares, quantas gavetas. O que sai todo dia fica na altura do olho, o que amassa ganha gaveta rasa, o que é de estação vai para cima. A medida sai do que você tem hoje, com folga para o que vem.
>
> **Chamada final:** Quer um closet desenhado assim?
> `[Falar sobre um projeto assim]`

---

## 3.6 Banheiro

`title:` Banheiro planejado em São José dos Campos | Dalmóbile

> **AMBIENTES / BANHEIRO**
>
> # Banheiro
>
> ### Marcenaria que convive com água todo dia.
>
> É o ambiente que mais castiga o material: vapor, respingo e produto de limpeza. Por isso a decisão aqui está no acabamento e na ferragem — borda selada, corrediça que não enferruja, gabinete suspenso para não apoiar no piso molhado. O desenho vem depois disso, não antes.
>
> **Chamada final:** Quer um banheiro assim?
> `[Falar sobre um projeto assim]`

---

## 3.7 Espaço gourmet

`title:` Espaço gourmet planejado em São José dos Campos | Dalmóbile

> **AMBIENTES / ESPAÇO GOURMET**
>
> # Espaço gourmet
>
> ### O ambiente que só existe quando a casa está cheia.
>
> Churrasqueira, chopeira, cooktop e uma bancada com espaço para quem só quer ficar por perto. A marcenaria aqui trabalha para uma noite específica: superfície que aguenta calor e copo, armário para o que não se usa toda semana, circulação que não trava com dez pessoas em pé.
>
> **Chamada final:** Quer um espaço gourmet assim?
> `[Falar sobre um projeto assim]`

---

# 4 · A Dalmóbile

### Meta

| Campo | Texto |
|---|---|
| `title` | A Dalmóbile — móveis planejados em São José dos Campos |
| `description` | Fábrica própria desde 1977, 100% MDF e 6 anos de garantia. Como a Dalmóbile projeta, fabrica e instala em São José dos Campos. |

> # A Dalmóbile
>
> ### Fábrica própria desde 1977. Loja em São José dos Campos.
>
> A Dalmóbile projeta, fabrica e instala móveis planejados. A produção é da própria marca — não é comprada de marcenaria terceira — e a loja de São José dos Campos responde por tudo o que acontece entre a primeira medição e a revisão final da montagem. É o que permite resolver um problema de obra em dias, e não em fornecedores.

## 4.1 A produção é própria

> ## A produção é própria
>
> A marcenaria não é comprada de terceiro: sai da fábrica da Dalmóbile em Bento Gonçalves, 100% em MDF, com a ferragem e o acabamento definidos ainda no projeto. São duas unidades fabris e produção em linha — e é isso que sustenta a garantia de seis anos. Na prática significa três coisas: o projeto pode fugir do padrão, a medida pode ser ajustada depois da visita técnica, e uma peça pode ser refeita sem virar disputa entre empresas.

⚠️ **Esta é a correção mais importante do documento.** O texto no ar afirma que *"quem desenha o seu armário trabalha no mesmo lugar em que ele é cortado"* e que *"o que você vê no showroom sai da nossa fábrica, com a nossa equipe, no nosso prazo"* — o que descreve uma marcenaria local, e não é o caso.

A fábrica é **a mesma para toda a Dalmóbile**, em Bento Gonçalves (RS): duas unidades, produção em linha, MDF processado na própria planta. A loja de SJC projeta, vende, mede e monta; a fabricação é da indústria da marca.

Isso não enfraquece o argumento — inverte quem ele derruba. Contra o concorrente que compra de marcenaria terceira, "produção industrial própria, mesma linha em todas as lojas" é **mais** forte do que uma oficina local, porque significa repetibilidade, padrão de acabamento e uma garantia que alguém tem tamanho para honrar. E dizer isso abertamente é o que permite convidar o arquiteto para ver a fábrica sem constrangimento.

## 4.2 O processo

> ## O processo
>
> **01 · Conversa**
> Você traz a planta ou as fotos do imóvel e conta como usa a casa. Acabamento é o último assunto, não o primeiro.
>
> **02 · Medição no local**
> Medimos no imóvel, com a obra pronta. Nenhum projeto é fabricado sobre medida de planta: obra e planta divergem, e o milímetro aparece na montagem.
>
> **03 · Projeto**
> Você recebe o projeto em 3D e a proposta detalhada, com cada acabamento identificado por nome e código. Ajustamos junto até fechar.
>
> **04 · Fabricação**
> A produção começa depois do aceite do projeto e da conferência final de medidas. ⚠️ *(slot de prazo)*
>
> **05 · Montagem**
> Nossa equipe instala e faz a revisão com você presente, item por item. O que não passar na revisão volta.

⚠️ **Prazo.** Hoje o processo tem cinco etapas e nenhum número de dias — e "ninguém no Vale publica prazo" era um dos buracos de mercado mapeados na análise de concorrência. Achei "até 20 dias úteis" no site de outra unidade da rede, mas é fraco demais para publicar em nome de SJC.

Assim que a loja confirmar, a etapa 04 fecha com uma linha do tipo:

> *A produção leva em média X dias úteis a partir do aceite. O prazo da sua entrega vai por escrito no contrato.*

Uma frase, e o site passa a ter algo que nenhum concorrente da cidade tem.

## 4.3 Materiais e acabamentos

> ## Materiais e acabamentos
>
> Trabalhamos com 100% MDF. Cada projeto sai com a lista de acabamentos por nome e código — o mesmo código que fica registrado no seu contrato. Isso serve para duas coisas bem práticas: comparar propostas com honestidade e repor uma peça daqui a cinco anos sem adivinhação.

*Nota:* a menção a "fornecedores que emitem certificado de origem" saiu por precaução — é uma afirmação sobre a cadeia de fornecimento que a loja precisaria conseguir comprovar. Se houver o certificado, vale voltar **com o nome da certificação**, que é mais forte do que a frase genérica.

## 4.4 Garantia ⚠️

> ## Garantia
>
> **Seis anos**, em todos os projetos. A garantia cobre a marcenaria que fabricamos e a montagem que fizemos, e o texto completo — o que cobre, o que não cobre e como acionar — vem no contrato.
>
> `Ver o certificado de garantia ↗`

⚠️ *Contradição corrigida:* a home anuncia "6 anos de garantia" e esta página, no ar, se recusa a dar o número — e ainda promete que "o mesmo texto fica publicado aqui", sem publicar nada. Duas páginas do mesmo site dizendo coisas diferentes sobre o mesmo assunto.

Os seis anos estão confirmados em três fontes públicas da rede. Pode ir ao ar. **O que falta é o PDF do certificado** para o link funcionar — sem ele, tirar o botão e manter só o texto.

## 4.5 Perguntas frequentes

> **Como se forma o orçamento?**
> Pelo projeto, não pelo metro quadrado. O que muda o preço é a quantidade de peças, o tipo de acabamento, a ferragem escolhida e a complexidade da marcenaria. Por isso o orçamento vem depois da medição e do projeto — um número dado antes disso é chute.
>
> **Quanto tempo leva do fechamento à montagem?** ⚠️
> *(depende do prazo confirmado — ver 4.2)*
>
> **Preciso ter arquiteto para fechar um projeto?**
> Não. Projetamos direto com você. Se você já tem arquiteto, trabalhamos a partir do projeto dele e cuidamos do detalhamento da marcenaria.
>
> **Dá para fazer só um ambiente?**
> Dá. Muita gente começa pela cozinha ou pelo closet e volta depois para os outros ambientes. O projeto é feito para conversar com o que vier depois.
>
> **Vocês atendem fora de São José dos Campos?**
> Atendemos o Vale do Paraíba a partir da loja de São José dos Campos. Para quem está no litoral norte, a loja de Caraguatatuba é a mais perto.
>
> **O que a garantia cobre?**
> A marcenaria que fabricamos e a montagem que fizemos, por seis anos. O texto completo vem no contrato, e o certificado está publicado nesta página.

*Nota:* o FAQ que já estava no ar é o melhor texto do site depois da página de arquitetos — "um número dado antes disso é chute" é exatamente a voz que a gente quer. Mantive as três perguntas originais palavra por palavra e acrescentei três que a direção previa e faltavam. É seção indexável: cada pergunta é uma busca real.

## 4.6 Fechamento

> A Dalmóbile é marca do grupo Orizon e atende o Vale do Paraíba e o litoral norte a partir de duas lojas.
>
> **Showroom São José dos Campos**
> Av. Barão do Rio Branco, 736 — Jardim Esplanada, São José dos Campos — SP, 12242-800

---

# 5 · Para arquitetos

### Meta

| Campo | Texto |
|---|---|
| `title` | Para arquitetos — Dalmóbile São José dos Campos |
| `description` | Detalhamento técnico de marcenaria, visita à fábrica e fila separada para orçamento de escritório. Parceria com escritórios de arquitetura no Vale do Paraíba. |

> # Para arquitetos
>
> ### Detalhamento técnico, produção própria e fila separada para orçamento de escritório.
>
> Quem projeta precisa de um fornecedor que leia projeto, discuta viabilidade e entregue no prazo que já foi combinado com o cliente. Como a produção é da própria Dalmóbile, essa conversa acontece com quem responde pela peça — não com um intermediário que leva a dúvida embora e volta três dias depois.

## 5.1 Como funciona a parceria

> **Detalhamento técnico**
> Você entrega o projeto e nós detalhamos a marcenaria: encaixes, ferragens, espessuras, folgas de obra. O detalhamento volta para você aprovar antes de qualquer corte.
>
> **Orçamento de escritório**
> Orçamento de escritório entra numa fila própria, separada do balcão, e vale para projeto completo. Respondemos em até um dia útil. ⚠️
>
> **Visita à fábrica**
> Você e o seu cliente podem ver a produção em Bento Gonçalves. Duas unidades fabris, produção em linha, MDF processado na própria planta. É o argumento mais forte que temos, e o que mais convence quem está comparando propostas.
>
> **Crédito no projeto**
> Projeto assinado por você que for publicado neste site vai com o seu nome. Só entra com a sua autorização, por escrito, e sai a qualquer momento se você pedir.

⚠️ *Correção:* o texto no ar diz *"Todo projeto publicado neste site credita o arquiteto que o assinou"* — e nenhum projeto do site credita ninguém hoje, porque ainda não existem páginas de case. A página desmentia a si mesma para quem clicasse. A versão acima é um compromisso, não uma descrição do que já existe: fica verdadeira agora e continua verdadeira quando os cases entrarem.

⚠️ *"Respondemos em até um dia útil"* aparece duas vezes na página. Deixei no bloco de orçamento, onde é uma promessa de serviço concreta, e tirei do fechamento.

## 5.2 Fechamento

> Se você projeta e quer conhecer a fábrica, fale com a loja.
>
> `[Falar no WhatsApp]`

*Nota geral:* esta é a melhor página do site — a única que já falava com autoridade de ofício do começo ao fim. Mexi o mínimo: a correção do crédito, a repetição, e "marceneiro" virou "fornecedor" (arquiteto que contrata marcenaria industrializada não chama a Dalmóbile de marceneiro).

---

# 6 · A loja

### Meta

| Campo | Texto |
|---|---|
| `title` | Showroom em São José dos Campos \| Dalmóbile |
| `description` | Showroom Dalmóbile na Av. Barão do Rio Branco, 736 — Jardim Esplanada, São José dos Campos. Segunda a sexta das 09h às 19h, sábado das 08h às 14h. |

> # Showroom São José dos Campos
>
> ### Venha ver de perto o que a foto não resolve.
>
> Acabamento se decide na mão: a cor sob a luz do ambiente, a textura da borda, o peso da ferragem, o ruído da corrediça ao fechar. No showroom tudo isso está montado. Se puder, traga a planta do imóvel — a conversa anda muito mais rápido.

> **ENDEREÇO**
> Av. Barão do Rio Branco, 736 — Jardim Esplanada, São José dos Campos — SP, 12242-800
> `Abrir no mapa`
>
> **TELEFONE** ⚠️
> (12) 3341-8777
>
> **WHATSAPP** ⚠️
> `Falar no WhatsApp`
>
> **HORÁRIO** ⚠️
> Segunda a sexta · 09h00 às 19h00
> Sábado · 08h00 às 14h00

> A Dalmóbile também atende o litoral norte, a partir de Caraguatatuba.
> `Ver a outra loja`

> **Antes de vir, veja o que já fizemos**
> Cozinha · Quartos · Sala de estar · Home office · Closet · Banheiro · Espaço gourmet

*Por que mudou:* "É a maneira mais rápida de decidir o que só a foto não resolve" estava certa na ideia e vaga na execução. A versão nova **lista** o que só o showroom resolve — cor sob luz, textura de borda, peso de ferragem, ruído de corrediça. Quem é do ramo reconhece os quatro; quem não é entende na hora por que vale a visita. E "traga a planta" repete o gesto da home, que é como uma frase vira assinatura.

*Ajuste:* "também atende em outra cidade" era impreciso — a outra loja atende **o litoral norte**, e nomear a região é melhor para busca e para o leitor.

---

# 7 · Privacidade

Mantida praticamente como está. É uma boa página de privacidade: curta, honesta e legível — e "**Nenhum.**" como resposta inteira à pergunta sobre coleta de dados é o melhor tipo de microcópia que existe.

Dois ajustes:

> **Que dados este site coleta**
>
> **Nenhum.** Este site não tem formulário, não pede cadastro e não usa cookie de rastreamento. Se você falar com a gente pelo WhatsApp ou pelo telefone, aí sim ficam registrados o seu contato e o que você contou sobre o projeto — usados só para responder e tocar o seu projeto, e por mais ninguém.

⚠️ **A data precisa ser real.** Hoje está "Atualizada em 9 de setembro de 2026", que é a data de hoje — provavelmente gerada automática. Tem que ser a data da última alteração de verdade do texto, senão a página se atualiza sozinha todo dia e perde a função.

⚠️ **A afirmação "não usa cookie de rastreamento" precisa continuar verdadeira depois do go-live.** Se entrar GA4 ou pixel — e a direção prevê os dois — esta página tem que ser reescrita **antes**, não depois. É o tipo de contradição que vira problema de LGPD, não de copy.

---

# 8 · Microcópia consolidada

| Onde | Texto |
|---|---|
| Botão principal da home | Ver os ambientes ↗ |
| Link do manifesto | Como trabalhamos ↗ |
| Link do portfólio | Ver todos os ambientes ↗ |
| Fim de página de ambiente | Falar sobre um projeto assim |
| WhatsApp | Falar no WhatsApp |
| Mapa | Abrir no mapa |
| Outra unidade | Ver a loja de Caraguatatuba |
| Rodapé, assinatura | DALMÓBILE SÃO JOSÉ DOS CAMPOS · CRIE SEU MUNDO |

**Não usar, em lugar nenhum do site:** "Quero meu projeto", "Solicite seu orçamento grátis", "Transforme seu lar", "alto padrão", "sonho", "aconchego", "ambientes que expressam sua personalidade", contador de urgência, selo inventado.

---

# 9 · Pendências — o que precisa ser confirmado com a loja

Em ordem de urgência. Nada aqui é opinião: é dado que o site afirma e que precisa estar certo.

| # | Item | Situação | O que fazer |
|---|---|---|---|
| 1 | **Telefone** | Dois números no site: WhatsApp da home vai para **(12) 99604-9888**, o rodapé mostra **(12) 3341-8777** | Definir qual é o de contato e qual é o de WhatsApp, e bater com o Google Business |
| 2 | **Horário de sábado** | Site: **08h–14h**. Catálogos: **9h–13h** | Confirmar e igualar em site, catálogos e Google Business |
| 3 | **Prazo de produção** | Ausente no site inteiro | Confirmar a média em dias úteis e fechar a etapa 04 e o FAQ |
| 4 | **Certificado de garantia** | O texto promete o documento; o PDF não existe | Conseguir o PDF, ou tirar o botão e manter só o texto |
| 5 | **Certificado de origem do MDF** | Afirmação removida por precaução | Se existir, voltar com o nome da certificação |
| 6 | **Data da privacidade** | Data de hoje, provavelmente automática | Fixar a data real da última alteração |
| 7 | **Crédito dos arquitetos** | Prometido, inexistente | Autorização por escrito de cada arquiteto, antes de publicar qualquer nome |

**Confirmado na pesquisa, pode publicar sem medo:** fundação em **1977**, **6 anos de garantia**, **100% MDF**, fábrica própria em **Bento Gonçalves** com duas unidades fabris.

**Descartado:** "500+ acessórios exclusivos" (sem fonte), "47 anos" (o correto é 49, ou o ano), "essência italiana" (claim genérico do setor, sem sustentação no site).
