/**
 * Completa o export estático de uma unidade para o Cloudflare Pages.
 *
 * O que é: com EXPORTAR=1, o vinext pré-renderiza as páginas (/ e /privacidade)
 * em HTML dentro de `dist/client/`. Faltam três coisas que, no Worker, eram
 * respondidas em tempo de execução:
 *   - robots.txt e sitemap.xml (rotas de metadata, que o export não grava);
 *   - os 301 das páginas internas antigas (worker/index.ts), que no Pages
 *     viram o arquivo `_redirects`.
 *
 * Este passo sobe o servidor de produção do próprio build por alguns
 * segundos, copia robots.txt e sitemap.xml para `dist/client/` e escreve o
 * `_redirects`, e apaga o ponteiro do Wrangler para o config do Worker. Assim os textos continuam vindo de app/robots.ts e
 * app/sitemap.ts, sem duplicar nada por unidade.
 *
 * Onde é usado: no fim de `npm run build:pages:sjc` e
 * `npm run build:pages:caragua` (package.json). O deploy pelo Worker
 * (`build:sjc`, `deploy:sjc`) não passa por aqui.
 *
 * Também cuida da /construvale2026 (11/11/2026), página que só existe na
 * unidade com `paginasExtras.construvale2026` no config:
 *   - na unidade que tem: o HTML vai para `construvale2026/index.html` (ao lado
 *     do PDF), o `_headers` ganha o X-Robots-Tag noindex, e o build falha se a
 *     página aparecer no sitemap ou se o PDF não estiver lá;
 *   - na que não tem: nada dela fica em `dist/client/`.
 *
 *   node build/exportar-estatico.mjs sjc
 */
import { spawn } from "node:child_process";
import { access, appendFile, mkdir, rename, rm, writeFile } from "node:fs/promises";
import { createServer } from "node:net";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const raiz = fileURLToPath(new URL("..", import.meta.url));
const destino = path.join(raiz, "dist/client");

const unidade = process.argv[2];
if (!["sjc", "caragua"].includes(unidade)) {
  console.error("Uso: node build/exportar-estatico.mjs <sjc|caragua>");
  process.exit(1);
}
const { unidade: config } = await import(pathToFileURL(path.join(raiz, "config", `${unidade}.ts`)).href);

// A /construvale2026 fora da busca também pelo cabeçalho HTTP (vale para o
// PDF, que não tem <meta>). Não vai Disallow no robots.txt: o robô precisa
// conseguir ler o noindex.
const CABECALHOS_CONSTRUVALE = `
# /construvale2026: página do QR code da feira, fora da busca (11/11/2026).
/construvale2026
  X-Robots-Tag: noindex, nofollow
/construvale2026/*
  X-Robots-Tag: noindex, nofollow
`;

async function existe(arquivo) {
  try {
    await access(arquivo);
    return true;
  } catch {
    return false;
  }
}

async function arrumarConstruvale(sitemap) {
  const html = path.join(destino, "construvale2026.html");
  const rsc = path.join(destino, "construvale2026.rsc");
  const pasta = path.join(destino, "construvale2026");
  if (!config.paginasExtras?.construvale2026) {
    await rm(html, { force: true });
    await rm(rsc, { force: true });
    await rm(pasta, { recursive: true, force: true });
    return;
  }
  if (sitemap.includes("construvale2026")) throw new Error("A /construvale2026 apareceu no sitemap.xml.");
  if (!(await existe(html))) throw new Error("O export não gerou construvale2026.html.");
  await mkdir(pasta, { recursive: true });
  await rename(html, path.join(pasta, "index.html"));
  const pdf = path.join(destino, config.paginasExtras.construvale2026.pdf);
  if (!(await existe(pdf))) throw new Error(`O PDF não está no build: ${config.paginasExtras.construvale2026.pdf}`);
  await appendFile(path.join(destino, "_headers"), CABECALHOS_CONSTRUVALE);
  console.log("  Export estático: /construvale2026 em construvale2026/index.html, com noindex no _headers.");
}

// Os mesmos redirecionamentos de worker/index.ts, no formato do Pages.
// Mantenha os dois em sincronia enquanto o Worker existir.
// Regras exatas antes das com asterisco: o Pages avalia mais rápido assim.
const REDIRECIONAMENTOS = `# Páginas internas que saíram na v5 (06/10/2026). Ver worker/index.ts.
/ambientes /#projetos 301
/projetos /#projetos 301
/a-dalmobile /#a-dalmobile 301
/arquitetos /#arquitetos 301
/a-loja /#a-loja 301
/ambientes/* /#projetos 301
/projetos/* /#projetos 301
`;

function portaLivre() {
  return new Promise((resolve, reject) => {
    const s = createServer();
    s.once("error", reject);
    s.listen(0, "127.0.0.1", () => {
      const { port } = s.address();
      s.close(() => resolve(port));
    });
  });
}

async function esperar(url, tentativas = 60) {
  for (let i = 0; i < tentativas; i++) {
    try {
      const r = await fetch(url);
      if (r.ok) return;
    } catch {
      // servidor ainda subindo
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`O servidor de produção não respondeu em ${url}.`);
}

const porta = await portaLivre();
const base = `http://127.0.0.1:${porta}`;
const servidor = spawn(
  process.execPath,
  [path.join(raiz, "node_modules/vinext/dist/cli.js"), "start", "--port", String(porta)],
  { cwd: raiz, stdio: ["ignore", "ignore", "inherit"] },
);

try {
  await esperar(`${base}/robots.txt`);
  const textos = {};
  for (const arquivo of ["robots.txt", "sitemap.xml"]) {
    const r = await fetch(`${base}/${arquivo}`);
    if (!r.ok) throw new Error(`/${arquivo} respondeu ${r.status}.`);
    textos[arquivo] = await r.text();
    await writeFile(path.join(destino, arquivo), textos[arquivo]);
  }
  await arrumarConstruvale(textos["sitemap.xml"]);
  await writeFile(path.join(destino, "_redirects"), REDIRECIONAMENTOS);

  // O plugin da Cloudflare deixa um ponteiro para dist/server/wrangler.json
  // (o config do Worker). No Pages ele faria o deploy tratar o site como
  // Worker. O deploy:* da máquina passa o config com -c e não depende dele.
  await rm(path.join(raiz, ".wrangler/deploy/config.json"), { force: true });
  console.log("  Export estático: robots.txt, sitemap.xml e _redirects gravados.");
} finally {
  servidor.kill();
}
