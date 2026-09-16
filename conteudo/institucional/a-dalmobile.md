---
# Texto revisado a partir de docs/copy/sjc.md (09/09/2026), que
# corrigiu erros de fato do rascunho anterior — o principal deles: a fábrica
# NÃO é local, é a da marca em Bento Gonçalves.
#
# `confirmado: true` porque os dados que restaram estão verificados em fonte
# pública da rede: fundação em 1977, 6 anos de garantia, 100% MDF e as duas
# unidades fabris. O que ainda não tem fonte segue como PENDENTE e é OMITIDO
# da página — não vira buraco.
confirmado: true

titulo: A Dalmóbile
# {{cidade}} e {{outraCidade}} são substituídos por unidade — ver lib/texto.ts.
# Este arquivo serve aos DOIS sites; cidade escrita à mão aqui iria ao ar
# errada no outro.
chamada: Fábrica própria desde 1977. Loja em {{cidade}}.

abertura: >-
  A Dalmóbile projeta, fabrica e instala móveis planejados. A produção é da
  própria marca — não é comprada de marcenaria terceira — e a loja de
  {{cidade}} responde por tudo o que acontece entre a primeira medição e a
  revisão final da montagem. É o que permite resolver um problema de obra em
  dias, e não em fornecedores.

fabrica:
  titulo: A produção é própria
  texto: >-
    A marcenaria não é comprada de terceiro: sai da fábrica da Dalmóbile em
    Bento Gonçalves, 100% em MDF, com a ferragem e o acabamento definidos ainda
    no projeto. São duas unidades fabris e produção em linha — e é isso que
    sustenta a garantia de seis anos. Na prática significa três coisas: o
    projeto pode fugir do padrão, a medida pode ser ajustada depois da visita
    técnica, e uma peça pode ser refeita sem virar disputa entre empresas.
  # PENDENTE: a direção aponta que nenhum concorrente do Vale mostra a fábrica
  # em imagem. Não temos foto da planta de Bento Gonçalves no acervo.
  foto: PENDENTE

processo:
  # A numeração é legítima: é sequência de verdade, não escada de venda.
  - etapa: Conversa
    texto: >-
      Você traz a planta ou as fotos do imóvel e conta como usa a casa.
      Acabamento é o último assunto, não o primeiro.
    prazo:
  - etapa: Medição no local
    texto: >-
      Medimos no imóvel, com a obra pronta. Nenhum projeto é fabricado sobre
      medida de planta: obra e planta divergem, e o milímetro aparece na
      montagem.
    prazo:
  - etapa: Projeto
    texto: >-
      Você recebe o projeto em 3D e a proposta detalhada, com cada acabamento
      identificado por nome e código. Ajustamos junto até fechar.
    prazo:
  - etapa: Fabricação
    texto: >-
      A produção começa depois do aceite do projeto e da conferência final de
      medidas.
    # PENDENTE: "ninguém no Vale publica prazo" é um buraco de mercado
    # mapeado na análise de concorrência. Quando a loja confirmar a média,
    # esta linha vira: "A produção leva em média X dias úteis a partir do
    # aceite. O prazo da sua entrega vai por escrito no contrato."
    prazo: PENDENTE
  - etapa: Montagem
    texto: >-
      Nossa equipe instala e faz a revisão com você presente, item por item.
      O que não passar na revisão volta.
    prazo:

materiais:
  titulo: Materiais e acabamentos
  texto: >-
    Trabalhamos com 100% MDF. Cada projeto sai com a lista de acabamentos por
    nome e código — o mesmo código que fica registrado no seu contrato. Isso
    serve para duas coisas bem práticas: comparar propostas com honestidade e
    repor uma peça daqui a cinco anos sem adivinhação.

garantia:
  anos: Seis anos
  # PENDENTE: o PDF do certificado não existe. Enquanto não existir, o botão
  # "Ver o certificado" não é renderizado — prometer documento e não entregar
  # é pior que não prometer.
  certificado: PENDENTE
  texto: >-
    Em todos os projetos. A garantia cobre a marcenaria que fabricamos e a
    montagem que fizemos, e o texto completo — o que cobre, o que não cobre e
    como acionar — vem no contrato.

# Três números, todos verificados em fonte pública da rede. Saíram do rascunho
# anterior: "500+ acessórios exclusivos" (sem fonte, e linguagem de catálogo de
# fornecedor) e "47 anos" (errado: 1977 dá 49 em 2026). O ano é melhor que a
# contagem — é verificável e não precisa ser atualizado nunca mais.
numeros:
  - valor: "1977"
    rotulo: ano em que a fábrica começou
  - valor: "100%"
    rotulo: MDF em todo o projeto
  - valor: "6"
    rotulo: anos de garantia

faq:
  # Seção indexável, não acordeão de venda: cada pergunta é uma busca real.
  - pergunta: Como se forma o orçamento?
    resposta: >-
      Pelo projeto, não pelo metro quadrado. O que muda o preço é a quantidade
      de peças, o tipo de acabamento, a ferragem escolhida e a complexidade da
      marcenaria. Por isso o orçamento vem depois da medição e do projeto — um
      número dado antes disso é chute.
  - pergunta: Quanto tempo leva do fechamento à montagem?
    # PENDENTE: depende do prazo de produção — ver a etapa 04 do processo.
    resposta: PENDENTE
  - pergunta: Preciso ter arquiteto para fechar um projeto?
    resposta: >-
      Não. Projetamos direto com você. Se você já tem arquiteto, trabalhamos a
      partir do projeto dele e cuidamos do detalhamento da marcenaria.
  - pergunta: Dá para fazer só um ambiente?
    resposta: >-
      Dá. Muita gente começa pela cozinha ou pelo closet e volta depois para os
      outros ambientes. O projeto é feito para conversar com o que vier depois.
  - pergunta: Vocês atendem fora de {{cidade}}?
    resposta: >-
      Atendemos a região a partir da loja de {{cidade}}. Para quem está mais
      perto da outra unidade, a loja de {{outraCidade}} pode atender melhor.
  - pergunta: O que a garantia cobre?
    resposta: >-
      A marcenaria que fabricamos e a montagem que fizemos, por seis anos. O
      texto completo vem no contrato.
---

A Dalmóbile é marca do grupo Orizon e atende o Vale do Paraíba e o litoral norte
a partir de duas lojas.
