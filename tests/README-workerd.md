# Por que a suíte não basta

Os testes importam `dist/server/index.js` **em Node**, onde `fs` existe e
`process.cwd()` é a raiz do projeto. O runtime da Cloudflare é `workerd`, que
**não tem sistema de arquivos**.

Essa diferença já derrubou dois deploys com a suíte 100% verde:

```
Uncaught Error: no such file or directory, readAll
'/bundle/conteudo/institucional/a-dalmobile.md'
```

`tests/bundle-worker.test.mjs` cobre esse caso específico vasculhando o bundle.
Mas para a checagem completa, **rode o worker de verdade**:

```bash
npm run build:sjc
npm run workerd          # sobe o workerd em http://localhost:8799
```

Em outro terminal:

```bash
for r in / /ambientes /ambientes/cozinha /a-loja /a-dalmobile /arquitetos /privacidade; do
  printf "%s %s\n" "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:8799$r)" "$r"
done
```

Tudo 200. Qualquer 500 aqui é erro que só aparece em produção.

**Faça isto antes de qualquer deploy**, e sempre que mexer em como o conteúdo
é carregado.
