import type { Metadata } from "next";

import { unidade } from "../config/derivados";

// Krub self-hosted, do bundle. Nada de Google Fonts por CDN.
// Só os três pesos da escala do CLAUDE.md: 300, 400 e 600.
// O itálico de 300 entra porque o display do estudo 03 usa <em> — se a
// Fase 2 abandonar o itálico, esta linha sai junto.
import "@fontsource/krub/300.css";
import "@fontsource/krub/300-italic.css";
import "@fontsource/krub/400.css";
import "@fontsource/krub/600.css";
import "./globals.css";

// Título e descrição saem do config da unidade. Escritos à mão, o site de uma
// cidade vai ao ar descrito com o nome da outra — foi o que aconteceu no site
// anterior, e o título aqui chegou a ser "Dalmóbile SJC — Estudos de Layout"
// nos dois deploys.
//
// PROVISÓRIO: o metadata definitivo, com OpenGraph e schema por página, é a
// Fase 8. Aqui fica só o que impede o erro de cidade.
export const metadata: Metadata = {
  title: `Móveis Planejados em ${unidade.cidade} | Dalmóbile`,
  description: `Móveis planejados projetados e fabricados pela Dalmóbile em ${unidade.cidade}. Quase cinco décadas de fábrica própria.`,
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
