/**
 * Empacota o conteúdo de `conteudo/` num único JSON, para o Worker.
 *
 * POR QUE ISTO EXISTE: o runtime do Cloudflare Worker **não tem sistema de
 * arquivos**. Só o JavaScript empacotado vai para lá — `conteudo/` não vai. Ler
 * `.md` com `readFileSync` em tempo de execução funciona no `npm run dev` e
 * quebra no deploy:
 *
 *   Uncaught Error: no such file or directory, readAll
 *   '/bundle/conteudo/institucional/a-dalmobile.md'
 *
 * Então a leitura e a validação acontecem AQUI, no build, em Node, e o
 * resultado vira `conteudo/gerado.json`, que as páginas importam como módulo.
 * Campo faltando continua quebrando o build — só que neste passo.
 *
 * Roda antes do build, pelos scripts `build:*` do package.json.
 */
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { todosOsAmbientes } from "../lib/ambientes-conteudo.ts";
import { todasInstitucionais } from "../lib/institucional.ts";
import { todosOsProjetos } from "../lib/projetos.ts";

const raiz = fileURLToPath(new URL("..", import.meta.url));

export async function gerar({ silencioso = false } = {}) {
  const conteudo = {
    ambientes: todosOsAmbientes(),
    institucional: Object.fromEntries(todasInstitucionais().map((p) => [p.slug, p])),
    projetos: todosOsProjetos(),
  };

  const destino = path.join(raiz, "conteudo/gerado.json");
  await writeFile(destino, JSON.stringify(conteudo, null, 1) + "\n");

  if (!silencioso) {
    console.log(
      `  Conteúdo: ${conteudo.ambientes.length} ambiente(s), ` +
        `${Object.keys(conteudo.institucional).length} página(s) institucional(is), ` +
        `${conteudo.projetos.length} projeto(s).`,
    );
  }
  return conteudo;
}

if (import.meta.url === (await import("node:url")).pathToFileURL(process.argv[1]).href) {
  await gerar();
}
