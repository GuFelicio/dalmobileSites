import { defineConfig } from "vite";
import vinext from "vinext";

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

  return {
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
