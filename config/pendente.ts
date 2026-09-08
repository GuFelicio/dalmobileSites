/**
 * Sentinela de dado pendente.
 *
 * O que é: o valor que um campo obrigatório carrega enquanto a loja não
 * confirmou o dado real. Existe porque o CLAUDE.md manda que nenhum número vá
 * ao ar sem confirmação, e porque string vazia ou texto inventado passariam
 * despercebidos até alguém ver no site publicado.
 *
 * Onde é usado: config/sjc.ts, config/caragua.ts e o teste que barra o deploy.
 *
 * Como funciona: o valor é visível e feio de propósito. Se vazar para uma
 * página, salta aos olhos em revisão; e `camposPendentes()` o encontra antes,
 * na suíte de testes.
 */

export const PENDENTE = "PENDENTE-CONFIRMAR-COM-A-LOJA";

/**
 * Percorre o config e devolve o caminho de cada campo ainda pendente.
 * Vazio é o que precisa acontecer antes da Fase 8.
 */
export function camposPendentes(valor: unknown, caminho = ""): string[] {
  if (valor === PENDENTE) return [caminho];
  if (Array.isArray(valor)) {
    return valor.flatMap((item, i) => camposPendentes(item, `${caminho}[${i}]`));
  }
  if (valor && typeof valor === "object") {
    return Object.entries(valor).flatMap(([chave, v]) =>
      camposPendentes(v, caminho ? `${caminho}.${chave}` : chave),
    );
  }
  return [];
}
