# Prompts para o Claude Code · v4 (cores, espaçamento, menu e copy)

**05/10/2026.** Três fases, uma sessão nova por fase, commit entre elas. **A estrutura do site não muda:** mesmas páginas, mesmas seções, mesma ordem. As únicas mudanças de estrutura são as que o Gu pediu: sai a faixa de texto da abertura e o menu passa a sumir ao rolar.

**Antes da fase 1, coloque no repositório:**
- `copy-sites-v4.md` → `docs/copy-v4.md`
- `vocabulario-dalmobile.md` → `docs/vocabulario.md` (substitui)

---

## O diagnóstico, em uma tabela

| Problema medido no site | Correção |
|---|---|
| Dois "papéis" quase iguais (#F9F8F5 e #F5F4F0) | Um papel só: **#F6F4F0**, o da apresentação |
| Faixa de título da abertura e seção "Nenhuma casa…" no mesmo fundo, dois títulos gigantes empilhados | A faixa sai; a abertura fica só com a foto |
| Projetos (#E8E6E0) contra papel: diferença de 1,08:1 | Seções vizinhas alternam **papel ↔ grafite #262626** |
| Cinza médio (#9E9B95) em seção, faixa de chamada e rodapé, que se fundem | Cinza **só no rodapé** (#9E9C94, a cor da capa da apresentação) |
| Texto branco sobre cinza no processo de /a-dalmobile: 2,8:1 | Contraste mínimo de 4,5:1 em todo texto |
| Rodapé preto na home e cinza nas internas | Rodapé cinza em todas |
| Respiro demais: 240 a 300px vazios entre seções, rodapé de 1.106px no celular | Escala menor e única: 72px por seção no desktop, 48 no celular |
| Menu fixo o tempo todo | Some ao rolar para baixo, volta ao rolar para cima |

**Contrastes conferidos:** tinta #20211F sobre papel 14,7:1 · apoio #5F5D58 sobre papel 6,0:1 · papel sobre grafite 13,8:1 · areia #D5C5B1 sobre grafite 9,0:1 · tinta sobre o cinza do rodapé 5,9:1. Texto claro sobre o cinza do rodapé dá 2,5:1 e está **proibido**.

---

## Fase 1 · Cores, espaçamento, menu, rodapé e abertura

```
Fase 1 de 3. Design system, comportamento do menu e a abertura da home.
Nenhum texto muda nesta fase. Nenhuma seção muda de lugar.

ANTES
git add -A && git commit -m "estado antes da v4"
git tag v4-antes

=== PALETA ===
1. Tokens finais (no arquivo de tokens; nenhum hex fora dele):
     --papel      #F6F4F0   único fundo claro. Substitui #F9F8F5 e #F5F4F0
     --grafite    #262626   único fundo escuro de seção. Substitui #484B45 e
                            #111211 em seção
     --cinza      #9E9C94   SÓ no rodapé. Substitui #9E9B95
     --areia      #D5C5B1   SÓ em rótulos em caixa alta sobre grafite
     --tinta      #20211F   texto sobre papel e sobre o cinza do rodapé
     --apoio      #5F5D58   texto secundário sobre papel
     sobre grafite: texto --papel; secundário rgba(246,244,240,.72)
   #E8E6E0 sai de fundo de seção (pode ficar como fio ou fundo de card).
   Atualizar a tabela de paleta do CLAUDE.md.

2. Regra de superfície (registrar no CLAUDE.md; a regra antiga de "no máximo
   quatro trocas por página" sai): seções vizinhas NUNCA têm a mesma cor.
   Rodapé cinza em todas as páginas, com todo o texto em --tinta.
   Aplicar exatamente esta sequência, sem mudar a ordem das seções:

   Home
     abertura (só foto) → seção "Nenhuma casa…" papel → projetos grafite →
     fábrica papel → contato grafite → rodapé cinza
   /ambientes
     cabeçalho e grade papel → rodapé cinza
   /ambientes/[slug]
     cabeçalho papel → galeria grafite → outros ambientes papel →
     chamada final grafite → rodapé cinza
   /a-dalmobile
     abertura papel → "A produção é própria" grafite (a faixa de números
     entra dentro desta seção) → processo papel → materiais grafite →
     perguntas frequentes papel → faixa do link do showroom grafite →
     rodapé cinza
   /arquitetos
     abertura papel → como funciona grafite → chamada final papel →
     rodapé cinza
   /a-loja
     abertura com dados e mapa papel → faixa "a outra loja" grafite →
     "antes de vir" papel → rodapé cinza
   /privacidade
     papel → rodapé cinza

   Única mudança de lugar permitida: a faixa de números de /a-dalmobile
   entra dentro da seção "A produção é própria".

=== ABERTURA DA HOME ===
3. Remover a faixa de texto abaixo da foto de abertura (rótulo, título
   "O projeto começa na medição.", parágrafo e botão). A abertura fica só
   com a foto, inteira, sangrando, sem nada por cima.
   O h1 da página passa a ser o título da seção seguinte (hoje um h2).
   Nesta fase o texto continua o atual; a fase 2 troca.

=== ESPAÇAMENTO (o site está com respiro demais) ===
4. Medido hoje em 1440px: entre o fim do texto de uma seção e o título da
   seguinte há de 240 a 300px vazios (ex.: "Nenhuma casa…" termina com 120px
   e projetos começa com 180px). Nas internas, 120 + 120 entre todo bloco, e
   o rodapé abre com 120px. No celular o rodapé tem 1.106px de altura.
   Agora cada fronteira de seção já é marcada pela troca de cor, então o
   respiro pode cair bastante. Escala nova, base 8, e só ela:

     --respiro        clamp(48px, 5vw, 72px)   padding-top E padding-bottom
                                               de toda seção (72 no desktop,
                                               48 no celular)
     --respiro-curto  clamp(24px, 2.5vw, 40px) entre o cabeçalho da seção
                                               (rótulo, título, apoio) e o
                                               conteúdo
     --entre-itens    clamp(24px, 2vw, 32px)   entre itens irmãos: etapas do
                                               processo, perguntas do FAQ,
                                               blocos de /arquitetos, fotos
                                               da galeria

   Dentro do cabeçalho de seção: rótulo → 12px → título → 16px → apoio.
   Parágrafo → link: 24px.
   Remover todos os valores soltos (0, 112, 120, 122, 180) e o --respiro-longo.
   Exceção: o lado de uma foto que sangra até a borda pode ter padding 0.

5. Pontos específicos:
   - Foto de abertura da home: altura máxima 72svh no desktop e 60svh no
     celular, para o título da seção seguinte aparecer na primeira tela.
   - Rodapé: padding de --respiro-curto em cima e embaixo. No celular, links
     em duas colunas e sem o vão de 136px acima do primeiro título; alvo:
     rodapé com menos de 600px de altura no celular.
   - Fábrica no celular: o vão de 115px entre a foto e o rótulo cai para
     --respiro-curto.
   - Galeria das páginas de ambiente: --entre-itens entre as fotos e altura
     máxima de 85svh por foto. Hoje a galeria da cozinha tem quase 10.000px.

=== MENU ===
6. O cabeçalho some ao rolar para baixo e volta ao rolar para cima:
   - scrollY < 120px: sempre visível, sem fio inferior.
   - rolando para baixo depois de 120px: translateY(-100%).
   - rolando para cima (mais de 8px): volta, fundo --papel, fio inferior
     1px rgba(32,33,31,.12).
   - transição só de transform, 250ms, cubic-bezier(0.25, 1, 0.5, 1).
   - nunca some com o menu mobile aberto nem com foco dentro do cabeçalho.
   - prefers-reduced-motion: troca sem transição.
   - listener de scroll passivo + requestAnimationFrame. Nenhuma dependência.
   - sem layout shift quando o cabeçalho some.

NÃO FAÇA
Não mude texto, fonte, escala tipográfica nem a ordem das seções.

PRONTO QUANDO
- a sequência de superfícies de cada página bate com a lista acima
- nenhum hex fora do arquivo de tokens; #F9F8F5, #F5F4F0, #484B45, #9E9B95
  e #111211 não aparecem mais como fundo de seção
- contraste >= 4,5:1 em todo texto, conferido por script
- a abertura da home é só a foto, e a página tem exatamente um h1
- nenhum vão vertical maior que 160px entre dois textos, em nenhuma página
  (conferir por script); me mostre a altura total de cada página antes e
  depois (hoje: home 6.116px, /a-dalmobile 5.458px, cozinha 11.655px em 1440)
- o menu some e volta como descrito, testado com teclado e no mobile
- seis larguras do CLAUDE.md sem rolagem horizontal
- CHANGELOG, docs/design-system.md e CLAUDE.md atualizados
```

---

## Fase 2 · Copy v4 (os dois sites)

```
Fase 2 de 3. Só texto, metadata e créditos de foto, seguindo docs/copy-v4.md.
Nenhuma seção nova, nenhuma seção removida, nenhuma mudança de layout.

COMO LER O docs/copy-v4.md
- Vai para o site só o que está em linhas que começam com ">". Copie
  literalmente, sem melhorar nem resumir.
- [CIDADE] vem do config da unidade. Nada entre colchetes vai para o site.
- Títulos SEM ponto final, em todo o site.
- Onde o v4 manda manter o texto que está no ar (perguntas frequentes e
  A loja), a fonte é docs/copy-v3.md.

O QUE MUDA
1. Home: textos da seção "Nenhuma casa…" (agora h1 "Móveis personalizados
   para espaços com identidade"), da fábrica e do contato.
2. /a-dalmobile: abertura, produção, processo (mesmas 5 etapas, com os nomes
   Contexto, Criação, Refinamento, Produção, Instalação) e materiais.
3. /arquitetos: título, subtítulo e os cinco blocos (mesma quantidade, novos
   títulos).
4. /ambientes: subtítulo e intro. Tirar a contagem "8 fotos" dos cards.
5. Páginas de ambiente: subtítulo, parágrafo e chamada final, por unidade.
6. Crédito abaixo da legenda das fotos (carrossel e galerias):
   SJC, fotos debora-toledo-*      → PROJETO / DÉBORA TOLEDO
   Caraguá, fotos calabasasapto93-* → PROJETO / FLÁVIA E SÉRGIA GARRIDO
   Crédito em caixa alta pequena, na cor de apoio da superfície.

NÃO FAÇA
- Não reescreva frase. Se um texto não couber no layout, me avise.
- Não mexa em cor, espaçamento nem ordem de seção.

PRONTO QUANDO
- varredura no HTML gerado dos dois builds sem: garantia, certificado,
  maresia, "6 anos", "[CONFIRMAR", "[CIDADE", e sem título (h1, h2, h3)
  terminando em ponto
- cada build contém só o WhatsApp da própria unidade
- teste de cidade cruzada passando
- diff só de conteúdo, página por página, nos dois sites
- CHANGELOG atualizado
```

---

## Fase 3 · Verificação

```
Fase 3 de 3. Nenhuma funcionalidade nova.

1. Playwright nos dois sites, nas seis larguras do CLAUDE.md. Prints de página
   inteira de: home, /ambientes, /ambientes/cozinha, /a-dalmobile, /arquitetos,
   /a-loja. As imagens são lazy: role a página inteira antes do print, senão
   as fotos saem em branco.
2. Script que lista a cor de fundo de cada seção, em ordem, por página.
   Me mostre a lista. Nenhuma cor pode aparecer duas vezes seguidas.
3. Script de contraste em todo texto visível. Nada abaixo de 4,5:1.
4. Teste do menu: some ao descer, volta ao subir, não some com o menu mobile
   aberto, funciona com reduced motion.
5. Checklist "Obrigatório antes de qualquer deploy" do CLAUDE.md, marcado.
6. docs/decisoes.md: entrada da v4 (por que papel + grafite, por que a
   abertura ficou só com a foto, por que o menu some).

Não faça deploy de produção. Eu aprovo pelos prints.
```
