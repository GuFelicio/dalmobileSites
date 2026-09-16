# Copy do site

Um arquivo por unidade. O texto aprovado pelo cliente vive aqui; o que está
**no ar** vive em `conteudo/` e em `app/`.

| Arquivo | Unidade | Estado |
|---|---|---|
| [`sjc.md`](sjc.md) | São José dos Campos | aplicado em 14/09/2026 |
| `caragua.md` | Caraguatatuba | **não existe ainda** |

## Como isto se relaciona com o que está no ar

A copy de SJC foi aplicada nas sete páginas de ambiente, nas duas
institucionais, na home, em `/a-loja` e em `/privacidade`.

**Os textos de ambiente e institucionais são compartilhados pelos dois sites.**
Onde o texto precisa citar a cidade, ele escreve `{{cidade}}` ou
`{{outraCidade}}`, e `lib/texto.ts` substitui por unidade. Quem escrever a copy
de Caraguá **não escreve nome de cidade** — escreve o marcador.

Sem isso, um texto como "Loja em São José dos Campos" iria ao ar no site de
Caraguatatuba. Ver `docs/decisoes.md`.
