import path from "node:path";
import { defineConfig } from "vite";
import vinext from "vinext";

// Qual das duas unidades este build gera. Um código, dois sites.
//
// A seleção é por ALIAS, resolvido em tempo de build, e não por um if em
// runtime. A diferença é o projeto inteiro: com um if, os dois configs
// entram no bundle, e o texto de uma cidade viaja dentro do site da outra —
// exatamente o erro que derrubou o site anterior. Com alias, só um arquivo
// de config é compilado, e o teste de cidade cruzada pode ser absoluto.
const UNIDADES = ["sjc", "caragua"] as const;
type IdDeUnidade = (typeof UNIDADES)[number];

function unidadeDoBuild(): IdDeUnidade {
  const escolhida = process.env.UNIDADE ?? "sjc";
  if (!UNIDADES.includes(escolhida as IdDeUnidade)) {
    throw new Error(
      `UNIDADE="${escolhida}" não existe. Use uma de: ${UNIDADES.join(", ")}.`,
    );
  }
  return escolhida as IdDeUnidade;
}

// Bindings do Worker para o desenvolvimento local. Precisam espelhar o que
// existe na conta Cloudflare — hoje, nada além do runtime: o site não tem
// banco, nem bucket, nem fila.
//
// O binding IMAGES NÃO está declarado de propósito. Ele não existe na conta,
// e a decisão foi gerar as variações de imagem no build com sharp. Ver
// docs/decisoes.md.
const bindingsLocais = {
  main: "./worker/index.ts",
  compatibility_flags: ["nodejs_compat"],
};

export default defineConfig(async () => {
  // Mantém o estado do Wrangler e do Miniflare dentro do projeto, em vez de
  // espalhar pelo home. São ajustes de ferramenta, não de aplicação: o que é
  // ambiente da aplicação vive em .env*, que o Git ignora.
  process.env.WRANGLER_WRITE_LOGS ??= "false";
  process.env.WRANGLER_LOG_PATH ??= ".wrangler/logs";
  process.env.MINIFLARE_REGISTRY_PATH ??= ".wrangler/registry";

  // O Wrangler congela o caminho de log no momento em que o plugin da
  // Cloudflare é importado — por isso o import é dinâmico, depois das linhas
  // acima.
  const { cloudflare } = await import("@cloudflare/vite-plugin");

  const unidade = unidadeDoBuild();
  console.log(`\n  Unidade deste build: ${unidade}\n`);

  return {
    // "@unidade" resolve para o config da unidade deste build. Todo
    // componente importa daqui e nunca de config/sjc.ts direto.
    resolve: {
      alias: {
        "@unidade": path.resolve(import.meta.dirname, `config/${unidade}.ts`),
      },
    },
    server: {
      host: "0.0.0.0",
    },
    plugins: [
      vinext(),
      cloudflare({
        viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
        inspectorPort: false,
        config: bindingsLocais,
      }),
    ],
  };
});
