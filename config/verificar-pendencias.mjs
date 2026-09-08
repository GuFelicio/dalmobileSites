/**
 * Trava de deploy: nenhum dado não confirmado vai ao ar.
 *
 * O que é: percorre os dois configs e sai com erro se algum campo ainda
 * estiver com o sentinela PENDENTE ou com horário não confirmado.
 *
 * Onde é usado: nos scripts `deploy:sjc` e `deploy:caragua` do package.json,
 * antes do build. Rodar à mão com `npm run pendencias`.
 *
 * POR QUE NÃO É UM TESTE da suíte: enquanto a loja não responde, ele fica
 * vermelho, e suíte que sempre falha deixa de ser sinal — ver docs/decisoes.md.
 * Como trava de deploy ele só aparece na hora que importa: a de publicar.
 */
import { camposPendentes } from "./pendente.ts";
import { unidade as sjc } from "./sjc.ts";
import { unidade as caragua } from "./caragua.ts";

const problemas = [];

for (const u of [sjc, caragua]) {
  for (const campo of camposPendentes(u)) {
    problemas.push(`${u.id}.${campo} — não confirmado com a loja`);
  }
  for (const h of u.horarios.filter((h) => h.confirmado === false)) {
    problemas.push(`${u.id}: horário "${h.dias}" não confirmado com a loja`);
  }
  if (u.whatsapp === null) {
    problemas.push(`${u.id}: sem número de WhatsApp (a ação fica desabilitada)`);
  }
}

if (problemas.length === 0) {
  console.log("\n  Nenhuma pendência. Os dados das duas unidades estão confirmados.\n");
  process.exit(0);
}

console.error(
  `\n  ${problemas.length} pendência(s). Nenhum número vai ao ar sem confirmação\n` +
    `  da loja — ver CLAUDE.md, seção "Conteúdo". Preencher em config/:\n\n` +
    problemas.map((p) => `    · ${p}`).join("\n") +
    `\n\n  Para publicar mesmo assim (só com autorização): DEPLOY_COM_PENDENCIAS=1\n`,
);
process.exit(process.env.DEPLOY_COM_PENDENCIAS === "1" ? 0 : 1);
