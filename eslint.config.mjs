import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Material de referência (sites antigos e estudos), fora do build.
    "Dir Base/**",
  ]),

  {
    rules: {
      // O site NÃO usa next/image, e a decisão está verificada e registrada em
      // docs/decisoes.md: o binding env.IMAGES não existe na conta, e o shim de
      // next/image do vinext desliga o srcSet quando recebe um loader próprio.
      // As variações saem de build/gerar-imagens.mjs com sharp, e o
      // components/midia/Foto.tsx monta srcSet e sizes de verdade — que é o que
      // esta regra quer garantir. Mantê-la ligada só produziria ruído constante
      // que treinaria o time a ignorar a saída do lint.
      "@next/next/no-img-element": "off",
    },
  },
]);

export default eslintConfig;
