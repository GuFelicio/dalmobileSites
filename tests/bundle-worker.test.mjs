// O runtime do Cloudflare Worker NÃO tem sistema de arquivos. Uma página que
// leia .md com readFileSync funciona no `npm run dev`, passa nos testes — que
// rodam o Worker em Node, onde fs existe — e QUEBRA NO DEPLOY:
//
//   Uncaught Error: no such file or directory, readAll
//   '/bundle/conteudo/institucional/a-dalmobile.md'
//
// Aconteceu, nos dois deploys. Este teste vasculha o bundle que vai para a
// Cloudflare e falha antes de o wrangler tentar publicar.
// Ver lib/conteudo.ts e docs/decisoes.md.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";

const bundle = readFileSync(
  fileURLToPath(new URL("../dist/server/index.js", import.meta.url)),
  "utf8",
);

/** Remove comentários, para não acusar a própria explicação escrita no código. */
function semComentarios(texto) {
  return texto.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
}

const codigo = semComentarios(bundle);

test("o bundle do Worker não lê o sistema de arquivos", () => {
  for (const chamada of ["readFileSync(", "readdirSync(", "readFile(", "existsSync("]) {
    assert.ok(
      !codigo.includes(chamada),
      `"${chamada}" está no bundle do Worker, que não tem sistema de arquivos.\n` +
        `O conteúdo tem que ser empacotado no build — ver build/gerar-conteudo.mjs\n` +
        `e lib/conteudo.ts. Nenhuma página em app/ pode importar valores de\n` +
        `lib/projetos.ts, lib/ambientes-conteudo.ts ou lib/institucional.ts.`,
    );
  }
});

test("o parser de Markdown não vai para o Worker", () => {
  // gray-matter e js-yaml só precisam existir no passo de build. Se
  // aparecerem no bundle, é sinal de que alguma página importou um módulo
  // que lê conteúdo do disco — mesmo que não chame a leitura.
  for (const dependencia of ["gray-matter", "js-yaml"]) {
    assert.ok(
      !codigo.includes(dependencia),
      `"${dependencia}" foi parar no bundle do Worker. Alguma página importa um\n` +
        `módulo que lê conteúdo do disco. Ver lib/conteudo.ts.`,
    );
  }
});

test("o conteúdo empacotado chegou ao bundle", () => {
  // A contraprova: se o JSON não foi embutido, as páginas ficam sem conteúdo.
  assert.match(
    bundle,
    /Ilha de jantar que dispensa a mesa/,
    "o conteúdo de conteudo/gerado.json não está no bundle — rodou `npm run conteudo`?",
  );
});
