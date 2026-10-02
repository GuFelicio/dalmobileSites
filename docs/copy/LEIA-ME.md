# Copy do site

> **Desde 02/10/2026 a fonte de texto é a copy v3,
> [`docs/copy-v3.md`](../copy-v3.md)**, que cobre os dois sites (parte A comum,
> B só SJC, C só Caraguatatuba). As regras de palavra estão em
> [`docs/vocabulario.md`](../vocabulario.md). Esta pasta guarda o histórico.

| Arquivo | Unidade | Estado |
|---|---|---|
| [`../copy-v3.md`](../copy-v3.md) | as duas | **em vigor**, aplicada em 02/10/2026 |
| [`sjc.md`](sjc.md) | São José dos Campos | histórico — aplicado em 14/09/2026, substituído |

## Como isto se relaciona com o que está no ar

A copy de SJC foi aplicada nas sete páginas de ambiente, nas duas
institucionais, na home, em `/a-loja` e em `/privacidade`.

**Os textos de ambiente e institucionais são compartilhados pelos dois sites.**
Onde o texto precisa citar a cidade, ele escreve `{{cidade}}` ou
`{{outraCidade}}`, e `lib/texto.ts` substitui por unidade. Quem escrever a copy
de Caraguá **não escreve nome de cidade** — escreve o marcador.

Sem isso, um texto como "Loja em São José dos Campos" iria ao ar no site de
Caraguatatuba. Ver `docs/decisoes.md`.
