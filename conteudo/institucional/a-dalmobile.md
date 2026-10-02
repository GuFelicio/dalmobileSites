---
# Copy v3 (docs/copy-v3.md, A7, B4 e C5), 02/10/2026. Substitui o texto de
# 09/09 (docs/copy/sjc.md, agora histórico).
#
# Por decisão de marca, saíram do site: a garantia (seção, pergunta e número),
# os prazos e a pergunta "O projeto tem custo?". Ver docs/vocabulario.md, 2.3.
confirmado: true

titulo: A Dalmóbile
# {{cidade}}, {{outraCidade}}, {{regiao}} e {{outraRegiao}} são substituídos
# por unidade — ver lib/texto.ts. Este arquivo serve aos DOIS sites; cidade
# escrita à mão aqui iria ao ar errada no outro.
chamada: Fábrica própria em Bento Gonçalves desde 1977. Loja em {{cidade}}.

abertura: >-
  A Dalmóbile fabrica móveis planejados personalizados. A loja de {{cidade}}
  projeta, mede, acompanha o pedido e monta. Quem fez a medição responde pelo
  projeto até a revisão final da montagem.

fabrica:
  titulo: A produção é própria
  texto: >-
    Os móveis saem das duas fábricas da Dalmóbile em Bento Gonçalves, na Serra
    Gaúcha, que processam cerca de 54 mil metros quadrados de MDF por mês. A
    fábrica produz a própria linha inteira: MDF, laca, vidro e alumínio. No seu
    projeto, isso quer dizer três coisas: não existe módulo padrão, cada peça é
    editada milímetro a milímetro, e todo móvel leva o selo de origem impresso
    no fundo.
  # PENDENTE: a direção aponta que nenhum concorrente do Vale mostra a fábrica
  # em imagem. Não temos foto da planta de Bento Gonçalves no acervo.
  foto: PENDENTE

processo:
  # A numeração é legítima: é sequência de verdade, não escada de venda.
  # Prazo não entra (decisão de marca): o cliente acompanha o pedido pelo site.
  - etapa: Conversa
    texto: >-
      Você traz a planta ou as fotos do imóvel e conta como usa a casa.
      Acabamento é o último assunto, não o primeiro.
  - etapa: Medição no local
    texto: >-
      Medimos no imóvel, com a obra pronta. Obra e planta sempre divergem em
      algum ponto, e é na medição que o milímetro aparece.
  - etapa: Projeto
    texto: >-
      Você recebe o projeto e a proposta detalhada, com cada acabamento
      identificado. Ajustamos junto até fechar.
  - etapa: Fabricação
    texto: >-
      Depois do aceite e da conferência final de medidas, o pedido entra na
      fábrica. A partir daí você acompanha cada etapa pelo site da Dalmóbile.
  - etapa: Montagem
    texto: >-
      A equipe da loja monta e faz a revisão com você presente, item por item.
      O que não passar na revisão volta.

materiais:
  titulo: Materiais e acabamentos
  texto: >-
    Toda a linha é 100% MDF, com ação antimicrobiana. A borda é colada com cola
    PUR, que não solta com calor e umidade, e o fundo dos móveis recebe proteção
    antimofo. No acabamento, a escolha vai de laca, vidro e alumínio produzidos
    pela própria fábrica até o padrão de MDF que você especificar: com a linha
    One, a Dalmóbile produz no padrão de qualquer grande fornecedor do país.
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
