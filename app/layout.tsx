import type { Metadata } from "next";

// Krub self-hosted, do bundle. Nada de Google Fonts por CDN.
// Só os três pesos da escala do CLAUDE.md: 300, 400 e 600.
// O itálico de 300 entra porque o display do estudo 03 usa <em> — se a
// Fase 2 abandonar o itálico, esta linha sai junto.
import "@fontsource/krub/300.css";
import "@fontsource/krub/300-italic.css";
import "@fontsource/krub/400.css";
import "@fontsource/krub/600.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dalmóbile SJC — Estudos de Layout",
  description: "Três direções visuais para a nova experiência digital da Dalmóbile São José dos Campos.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
