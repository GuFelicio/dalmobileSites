/**
 * Substituição de cidade nos textos compartilhados.
 *
 * O que é: troca `{{cidade}}` pela cidade desta unidade e `{{outraCidade}}`
 * pela cidade da outra, nos textos que os DOIS sites compartilham. Desde a
 * copy v3, também `{{regiao}}` e `{{outraRegiao}}` — a região que cada loja
 * atende (FAQ de área de /a-dalmobile).
 *
 * Onde é usado: nas páginas institucionais, que leem o mesmo arquivo de
 * conteúdo nas duas unidades.
 *
 * POR QUE EXISTE: `conteudo/institucional/a-dalmobile.md` é um arquivo só
 * para os dois sites. A copy diz "Loja em São José dos Campos" — e escrito
 * assim, o site de Caraguatatuba iria ao ar com a cidade errada na segunda
 * linha da página institucional. É literalmente o erro que derrubou o site
 * anterior.
 *
 * A alternativa seria um arquivo por unidade, e o CLAUDE.md é explícito:
 * "nunca duplicar componente, estilo ou texto por unidade — se algo precisa
 * ser diferente, vira campo no config".
 */
import { unidade } from "../config/derivados.ts";

export function comCidade(texto: string): string {
  return texto
    .replaceAll("{{cidade}}", unidade.cidade)
    .replaceAll("{{outraCidade}}", unidade.outraUnidade.cidade)
    .replaceAll("{{outraRegiao}}", unidade.outraUnidade.regiao)
    .replaceAll("{{regiao}}", unidade.regiao);
}
