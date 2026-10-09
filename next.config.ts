import type { NextConfig } from "next";

// EXPORTAR=1 gera o site em HTML estático (dist/client/), para o Cloudflare
// Pages. Sem a variável, o build é o de sempre, para o Worker. Ver
// docs/decisoes.md, 09/10/2026, e o script build:pages:* do package.json.
const nextConfig: NextConfig = {
  ...(process.env.EXPORTAR ? { output: "export" as const } : {}),
};

export default nextConfig;
