# Prompt para o Claude Code · aplicar a copy v3 nos dois sites

**02/10/2026.** Uma sessão nova, commit próprio. Se os ajustes de layout (`ajustes-layout-v1.md`) ainda não rodaram, rode-os antes: eles conferem que "nenhum texto mudou", e esta fase muda texto.

**Antes de colar:** coloque no repositório
- `copy-sites-v3.md` → `docs/copy-v3.md`
- `vocabulario-dalmobile.md` → `docs/vocabulario.md`

---

```
Fase de copy: atualizar o texto dos dois sites (SJC e Caraguatatuba) para a v3.
Só texto, metadata, dados de config e duas remoções de foto. Nada de layout.

ANTES
git add -A && git commit -m "estado antes da copy v3"
git tag copy-antes-v3

DOCUMENTOS
- docs/copy-v3.md: a copy final. É a única fonte de texto.
- docs/vocabulario.md: regras de palavra. Use para conferir, não para reescrever.
Se existir docs/copy-site-sjc.md, ele vira histórico. Não use.

COMO LER O docs/copy-v3.md
- Vai para o site SÓ o que está em linhas que começam com ">" e as células em
  negrito da coluna "Fica assim" das tabelas de legendas. Copie literalmente:
  sem melhorar, sem resumir, sem trocar palavra.
- Parte A vale para os dois sites: troque [CIDADE] pelo nome da unidade, vindo
  do config. Parte B é só SJC. Parte C é só Caraguatatuba.
- "Por que mudou", notas, tabelas de opções e pendências são contexto. Não vão
  para o site.
- Nada entre colchetes vai para o site.
- No título da home, use a opção A ("O projeto começa na medição.").
- A copy define o texto dos links. Quantas setas ↗ aparecem continua seguindo
  a regra de layout que já está no código.

DECISÕES JÁ TOMADAS (aplique, não pergunte)
1. Orçamento de escritório (/arquitetos): manter "Respondemos em até um dia útil."
2. Horários: manter os que estão no config hoje.
3. Data da privacidade: não mexer.
4. WhatsApp e telefone, no config de cada unidade:
   SJC       (12) 99604-9888   wa.me/5512996049888
   Caraguá   (12) 99602-1234   wa.me/5512996021234
   Hoje o site de Caraguá mostra o número de SJC em todo lugar (topo, menu
   mobile, rodapé, /a-loja, /privacidade, links wa.me). Nenhum número escrito
   direto em componente.
5. Remover fotos que não mostram móvel Dalmóbile:
   - SJC: debora-toledo-jardim-das-industrias-122 (legenda "Nicho embutido no
     revestimento"). Sai do carrossel da home e da galeria de banheiro.
   - Caraguá: calabasasapto93-0848 (lavabo de pedra). Sai do carrossel e da galeria.
6. Com isso Caraguá fica sem banheiro: tirar /ambientes/banheiro do build de
   Caraguá, dos blocos "Outros ambientes", "Antes de vir, veja o que já fizemos"
   e do hub. Redirect 301 de /ambientes/banheiro para /ambientes. Sitemap atualizado.
7. Hub /ambientes de Caraguá passa a ter 3 ambientes: 3 colunas iguais no
   desktop, sem vão. SJC não muda.
8. Faixa de números (home e /a-dalmobile, nos dois sites):
     1977 · ano em que a fábrica começou
     2    · fábricas próprias em Bento Gonçalves
     100% · MDF em toda a linha
   "6 anos de garantia" sai.
9. Garantia sai do site inteiro: a seção "Garantia" de /a-dalmobile, a pergunta
   "O que a garantia cobre?", o selo da home (vira FÁBRICA PRÓPRIA · 100% MDF ·
   EDIÇÃO MILIMÉTRICA) e qualquer meta description que cite garantia.
10. Seção da fábrica na home: novo título e texto (A4). O link "Conheça a
    Dalmóbile" vai para /a-dalmobile.
11. FAQ de /a-dalmobile: na ordem do doc. A pergunta de área é diferente por
    site (B4 e C5). Caraguá tem também "Não moro em Caraguatatuba...".
    Saem: garantia, prazo e "O projeto tem custo?".
12. As páginas de quartos e sala de Caraguá têm texto PRÓPRIO (C4). Não usar o
    texto de SJC lá.
13. Em docs/direcao-site.md, o edifício Calabassas está listado em São José dos
    Campos. Corrigir para Caraguatatuba.

TESTE DE CIDADE CRUZADA
As únicas menções permitidas à outra cidade são as de "outra loja": rodapé
"A outra loja", a pergunta de área do FAQ e o parágrafo de /a-loja que aponta
para a outra unidade. Se o teste acusar essas, ajuste a allowlist dele.
Qualquer outra menção é bug.

NÃO FAÇA
- Não mude layout, cor, espaçamento nem componente.
- Não reescreva nenhuma frase. Se algum texto não couber no layout, me avise
  em vez de encurtar.
- Não deixe nenhum texto antigo que o doc substituiu.

VERIFICAÇÃO (me mostre o resultado de cada item)
1. Varredura no HTML gerado dos dois builds (texto visível, title,
   description e og), sem diferenciar maiúscula:
   garantia · certificado · maresia · "mar" como palavra inteira · sob medida ·
   madeira maciça · transform · sonho · exclusiv · sofistica · alto padrão ·
   grátis · gratuito · "6 anos" · "[CONFIRMAR" · "[CIDADE"
   Esperado: zero ocorrências. Liste qualquer achado com página e trecho.
   O alt das imagens fica fora desta varredura: ele descreve a cena da foto
   (ex.: "mesa oval de madeira maciça") e pode continuar como está.
2. Cada build contém só o WhatsApp da própria unidade.
3. Diff só de conteúdo, página por página, nos dois sites: texto visível,
   title e description, antes x depois. É o que eu vou revisar.
4. npm run build dos dois alvos passa. Conferir as seis larguras do CLAUDE.md
   nas páginas que mudaram de texto, sem rolagem horizontal (títulos novos
   podem quebrar em outro lugar).
5. CHANGELOG atualizado com a entrada "copy v3".
```
