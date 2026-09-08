/**
 * Tipo do módulo "@unidade".
 *
 * O que é: a declaração que faz o editor e o `tsc` entenderem o import que o
 * Vite resolve em tempo de build para config/sjc.ts ou config/caragua.ts.
 *
 * POR QUE NÃO É UM "paths" NO tsconfig.json: já foi, e quebrou o projeto em
 * silêncio. O `paths` vence o alias do Vite, então TODO build saía com o
 * config de SJC dentro — inclusive o de Caraguá. O teste de cidade cruzada
 * pegou. Não reintroduza `"@unidade"` em `compilerOptions.paths`.
 * Ver docs/decisoes.md.
 */
declare module "@unidade" {
  import type { Unidade } from "./tipos.ts";
  export const unidade: Unidade;
}
