// De qual unidade é o build que está em dist/ — para os testes conferirem o
// site contra o config CERTO.
//
// Antes, seo.test.mjs e layout.test.mjs importavam config/sjc.ts fixo, e
// unidade-cruzada.test.mjs deduzia a unidade procurando o domínio de SJC em
// qualquer lugar do HTML. O build de Caraguá tem o link do rodapé para a loja
// de SJC, então era lido como SJC: 9 testes falhavam no site de Caraguá sem
// que houvesse erro nenhum no site — e um erro de verdade lá passaria batido.
//
// A fonte agora é o <link rel="canonical"> da home: é o campo que declara de
// que domínio a página é, e o link cruzado nunca aparece nele.
//
// Não termina em .test.mjs de propósito: é ajudante, não suíte.
import { unidade as caragua } from "../config/caragua.ts";
import { unidade as sjc } from "../config/sjc.ts";

export const UNIDADES = [sjc, caragua];

/** Renderiza uma rota no Worker de dist/, sem servidor. */
export async function renderizar(rota, aceita = "text/html") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const resposta = await worker.fetch(
    new Request(`http://localhost${rota}`, { headers: { accept: aceita } }),
    { ASSETS: { fetch: async () => new Response("nf", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  return { resposta, corpo: await resposta.text() };
}

/** `{ esta, outra }`: a unidade deste build e a irmã. */
export async function unidadeDoBuild() {
  const { corpo } = await renderizar("/");
  const canonico = corpo.match(/rel="canonical" href="([^"]+)"/)?.[1];
  if (!canonico) throw new Error("A home não declara canônico: não dá para saber a unidade do build.");

  const esta = UNIDADES.find((u) => canonico.startsWith(u.dominio));
  if (!esta) throw new Error(`Canônico "${canonico}" não bate com o domínio de nenhuma unidade.`);
  return { esta, outra: UNIDADES.find((u) => u !== esta) };
}
