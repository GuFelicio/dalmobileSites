---
# Copy v4 (docs/copy-v4.md, "A Dalmóbile"), 05/10/2026: abertura, produção,
# processo e materiais. As perguntas frequentes continuam as da copy v3
# (docs/copy-v3.md, A7, B4 e C5).
#
# Por decisão de marca, saíram do site: a garantia (seção, pergunta e número),
# os prazos e a pergunta "O projeto tem custo?". Ver docs/vocabulario.md, 2.3.
confirmado: true

titulo: A Dalmóbile
# {{cidade}}, {{outraCidade}}, {{regiao}} e {{outraRegiao}} são substituídos
# por unidade — ver lib/texto.ts. Este arquivo serve aos DOIS sites; cidade
# escrita à mão aqui iria ao ar errada no outro.
chamada: Da marcenaria à personalização de alto padrão

abertura: >-
  Com origem em Bento Gonçalves, no polo moveleiro da Serra Gaúcha, a Dalmóbile
  reúne design, precisão industrial e cuidado com os acabamentos. Desde 2025, o
  foco é o móvel personalizado: flexível nas medidas, nos materiais e na
  linguagem de cada projeto. A loja de {{cidade}} projeta, acompanha e instala.

fabrica:
  titulo: A produção é própria
  texto: >-
    Os móveis saem das duas fábricas da Dalmóbile em Bento Gonçalves, que
    processam cerca de 54 mil metros quadrados de MDF por mês. A fábrica produz
    a própria linha inteira: MDF, laca, vidro e alumínio. Na prática, não existe
    módulo padrão, cada peça é editada milímetro a milímetro, e todo móvel leva
    o selo de origem impresso no fundo.
  # PENDENTE: a direção aponta que nenhum concorrente do Vale mostra a fábrica
  # em imagem. Não temos foto da planta de Bento Gonçalves no acervo.
  foto: PENDENTE

# O processo: as mesmas cinco etapas, com os nomes da jornada da apresentação
# institucional (docs/vocabulario.md, seção 0). A numeração é legítima: é
# sequência de verdade, não escada de venda. Prazo não entra (decisão de marca).
processoTitulo: Uma jornada guiada por decisões claras
processo:
  - etapa: Contexto
    texto: >-
      Rotina, desejos e prioridades. Você traz a planta ou as fotos do imóvel e
      conta como usa a casa.
  - etapa: Criação
    texto: >-
      Layout, linguagem e materiais. O projeto ganha forma, e cada acabamento é
      identificado na proposta.
  - etapa: Refinamento
    texto: >-
      Medidas, detalhes e soluções. A medição é feita no imóvel, com a obra
      pronta: obra e planta sempre divergem em algum ponto, e é ali que o
      milímetro aparece.
  - etapa: Produção
    texto: >-
      Processos integrados na fábrica. Depois do aceite, o pedido entra na
      produção e você acompanha cada etapa pelo site da Dalmóbile.
  - etapa: Instalação
    texto: >-
      Montagem e experiência de uso. A equipe da loja monta e revisa com você
      presente, item por item.
# A frase que fecha a jornada, logo abaixo da última etapa.
processoFecho: A qualidade da conversa inicial orienta todas as decisões seguintes.

materiais:
  titulo: O que pode ser construído sob medida
  texto: >-
    Dimensões e proporções, cores e acabamentos, organização interna, frentes,
    bordas e encontros. O acabamento vai de BP, laca, vidro, alumínio, lâmina de
    madeira e tecidos até o padrão de MDF que você especificar: com a linha One,
    a fábrica produz no padrão de qualquer grande fornecedor do país. Toda a
    linha é 100% MDF, com ação antimicrobiana, borda colada com cola PUR, que
    não solta com calor e umidade, e fundo com proteção antimofo.
  # Frase oficial da fábrica, em itálico, logo abaixo do parágrafo.
  fecho: Personalizar não é adaptar.

# A mesma faixa da home (copy v3, A4).
numeros:
  - valor: "1977"
    rotulo: ano em que a fábrica começou
  - valor: "2"
    rotulo: fábricas próprias em Bento Gonçalves
  - valor: "100%"
    rotulo: MDF em toda a linha

faq:
  # Seção indexável, não acordeão de venda: cada pergunta é uma busca real.
  # `unidades` (opcional) restringe a pergunta a um site só.
  - pergunta: Como se forma o orçamento?
    resposta: >-
      Pelo projeto, não pelo metro quadrado. O que muda o preço é a quantidade
      de peças, o tipo de acabamento, a ferragem escolhida e a complexidade do
      desenho. Por isso o orçamento vem depois da medição e do projeto. Um
      número dado antes disso é chute.
  - pergunta: Preciso ter arquiteto para fechar um projeto?
    resposta: >-
      Não. Projetamos direto com você. Se você já tem arquiteto, trabalhamos a
      partir do projeto dele e cuidamos do detalhamento da marcenaria.
  - pergunta: Dá para fazer só um ambiente?
    resposta: >-
      Dá. Muita gente começa pela cozinha ou pelo closet e volta depois para os
      outros ambientes. O projeto é feito para conversar com o que vier depois.
  - pergunta: Posso escolher um padrão que não está no mostruário?
    resposta: >-
      Pode. Além da cartela da Dalmóbile, a linha One produz no padrão de MDF
      dos principais fornecedores do país. Você especifica, a fábrica produz.
  - pergunta: Como sei que o móvel é Dalmóbile?
    resposta: >-
      Pelo fundo. Todo móvel tem o selo de origem e a marca impressos na chapa.
  # A pergunta de área: mesma forma nos dois sites, com a cidade e a região de
  # cada um (copy v3, B4 e C5).
  - pergunta: Vocês atendem fora de {{cidade}}?
    resposta: >-
      Atendemos {{cidade}} e o {{regiao}}. No {{outraRegiao}}, quem atende é a
      loja de {{outraCidade}}.
  # Só Caraguatatuba (copy v3, C5).
  - pergunta: Não moro em {{cidade}}. Como acompanho o projeto?
    unidades: [caragua]
    resposta: >-
      Depois do aceite, o pedido pode ser acompanhado na fábrica pelo site da
      Dalmóbile, etapa por etapa. E a loja combina com você como prefere aprovar
      o projeto e receber a montagem.

# Sem texto no corpo, de propósito: o fecho da copy v3 (A7) citava as duas
# cidades nos dois sites e saiu por decisão do cliente (02/10/2026). A faixa
# do fim da página fica só com o botão para o showroom.
---
