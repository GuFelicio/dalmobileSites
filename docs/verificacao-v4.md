# Verificação da v4 — fase 3

**05/10/2026.** Resultado da fase 3 do [`docs/prompt-v4.md`](prompt-v4.md):
os dois sites conferidos depois das fases 1 (cores, espaçamento, menu) e 2
(copy v4). **Nada foi publicado nesta fase**: a aprovação é pelos prints.

Tudo foi rodado no build de produção servido em `workerd` (`npm run workerd`),
não em Node, nas seis larguras da matriz do `CLAUDE.md`.

---

## 1. Prints

72 prints de página inteira — 2 sites × 6 larguras × 6 páginas (home,
`/ambientes`, `/ambientes/cozinha`, `/a-dalmobile`, `/arquitetos`, `/a-loja`),
com a página rolada inteira antes, para as fotos lazy carregarem.

Ficam em `prints-v4/sjc/` e `prints-v4/caragua/`, na raiz do repositório, **fora
do git** (`.git/info/exclude`): são 72 imagens grandes, de conferência, não de
código. Nome: `<largura>-<página>.png`.

> Ferramenta: Chrome headless pelo protocolo de depuração (CDP), no lugar do
> Playwright, que não é dependência do projeto — o `CLAUDE.md` pede para não
> instalar biblioteca sem perguntar. O resultado é o mesmo: print de página
> inteira, em faixas de 2000px costuradas (acima de ~4000px de altura a
> captura do Chrome headless trava).

## 2. Cor de fundo de cada seção, em ordem

Nenhuma cor aparece duas vezes seguidas, em nenhuma página, nos dois sites,
a 1440px e a 390px. Lista (a mesma nas duas larguras):

| Página | Sequência |
|---|---|
| home | só vídeo → papel → grafite → papel → grafite → cinza (rodapé) |
| `/ambientes` | papel → cinza (rodapé) |
| `/ambientes/cozinha` | papel → grafite → papel → grafite → cinza (rodapé) |
| `/a-dalmobile` | papel → grafite → papel → grafite → papel → grafite → cinza (rodapé) |
| `/arquitetos` | papel → grafite → papel → cinza (rodapé) |
| `/a-loja` | papel → grafite → papel → cinza (rodapé) |
| `/privacidade` | papel → cinza (rodapé) |

Em Caraguatatuba o rodapé é o cinza da paleta palha (`#FFF4EB`).

## 3. Contraste

Todo texto visível, contra o fundo efetivo (com transparência resolvida), nas
seis larguras: **SJC 2.502 textos, Caraguatatuba 1.968 — nenhum abaixo de
4,5:1.**

## 4. Menu

29 verificações por site, todas passando: visível e sem fio abaixo de 120px;
some ao descer; não volta com subida de 5px, volta com mais de 8px e com fio;
sem layout shift; Shift+Tab com o cabeçalho escondido o traz de volta; com foco
de teclado dentro ele não some; no celular o toque abre o painel, o cabeçalho
não some com ele aberto, o Tab fica preso no painel, Esc fecha e devolve o
foco, e depois de fechar por toque ele volta a sumir; transição só de
`transform`, 250ms, e nenhuma com `prefers-reduced-motion`.

## 5. Matriz de larguras

48 combinações de página × largura por site (390, 430, 768, 1024, 1280, 1920):
nenhuma rolagem horizontal, nenhum vão vertical acima de 160px entre dois
conteúdos, exatamente um h1 por página.

Altura das páginas (px):

| | home | ambientes | cozinha | a-dalmobile | arquitetos | a-loja |
|---|---|---|---|---|---|---|
| SJC 390 | 5.925 | 1.860 | 4.824 | 5.233 | 2.552 | 2.419 |
| SJC 1280 | 4.906 | 1.381 | 8.243 | 4.814 | 2.065 | 1.677 |
| SJC 1920 | 5.580 | 1.714 | 8.384 | 5.434 | 2.171 | 1.965 |
| Caraguá 390 | 5.712 | 1.503 | 3.048 | 5.486 | 2.560 | 2.329 |
| Caraguá 1280 | 4.749 | 1.064 | 4.076 | 5.010 | 2.065 | 1.677 |
| Caraguá 1920 | 5.069 | 1.264 | 4.185 | 5.632 | 2.171 | 1.965 |

## 6. Checklist "Obrigatório antes de qualquer deploy" (`CLAUDE.md`)

Conferido nos dois builds.

- [x] `<title>` e `meta description` com a cidade da unidade em toda página
- [x] OpenGraph por página (`og:title`, `og:description`, `og:image`).
      `/privacidade` estava sem `og:image` — corrigido nesta fase (capa da home)
- [x] Schema `LocalBusiness` por unidade, gerado do config, em `/a-loja`, com
      endereço, telefone e horário. **Bater com o Google Business Profile não dá
      para conferir por script** e continua pendente: a ficha de Caraguá com o
      número novo, e o sábado de SJC (site 08h–14h, catálogos 9h–13h)
- [x] `sitemap.ts` e `robots.ts` (200 nos dois)
- [x] Rodapé com endereço, telefone, WhatsApp e horário em toda página interna.
      **Exceção decidida pelo cliente (02/10/2026):** a home termina na barra
      com a marca e o endereço da loja (desde 05/10); horário e WhatsApp estão
      na seção de contato logo acima, e o telefone no menu
- [x] `:focus-visible` visível em todo elemento focável (percorrido com Tab)
- [x] Menu mobile funcionando, com handler, foco preso e Esc (seção 4)
- [x] `alt` em toda imagem; vazio só no lockup do cabeçalho, cujo nome
      acessível vem do link em volta
- [x] Rodado em `workerd`: todas as rotas em 200
- [x] Nenhum andaime de protótipo no build
- [x] Nenhum link âncora apontando para a própria seção
- [x] Nenhum CTA sem destino real (nenhum `href` vazio nem `aria-disabled`)
- [x] Testado nas seis larguras da matriz, sem rolagem horizontal (seção 5)
- [x] Documentação da entrega escrita e `CHANGELOG` atualizado

Também: `npm test` com 58 testes por unidade passando (inclui o de cidade
cruzada), lint limpo, e cada build com só o WhatsApp da própria unidade.

## 7. Corrigido nesta fase

- `/privacidade` sem `og:image`: o link compartilhado saía sem preview.
- Caminho de navegação das páginas de ambiente: "COZINHA" ficava acima de
  "AMBIENTES" (o link tem 44px de alvo e o item atual é só texto). Visto nos
  prints; agora centrado.

## 8. Pendências que não são da v4

- ~~Autorização de Débora Toledo e de Flávia e Sérgia Garrido para o crédito
  nas fotos~~ — confirmada pelo cliente em 05/10/2026.
- Horário de sábado de SJC e ficha do Google de Caraguá (item 6). A ficha de
  Caraguá o cliente vai acertar por conta própria.
- Legendas do carrossel da home no iPad em pé (768px) chegam a 5–6 linhas: a
  coluna do título fica estreita entre o rótulo e o link. Já era assim antes da
  v4; ajuste de layout, se o cliente quiser.
