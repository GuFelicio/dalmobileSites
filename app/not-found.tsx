/**
 * 404 — página não encontrada.
 *
 * O que é: uma linha honesta e os caminhos mais úteis, conforme a seção 10 do
 * docs/direcao-site.md. Sem piada.
 *
 * Onde é usado: automaticamente, em qualquer rota que não exista, e pelo
 * notFound() das páginas de ambiente quando o slug não é daquela unidade.
 *
 * Importa mais do que parece agora: /a-dalmobile e /arquitetos ainda não
 * existem e estão linkadas do menu e do rodapé. Até serem construídas, é
 * aqui que quem clicar vai parar. Ver docs/pendencias.md.
 */
import Link from "next/link";

import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { Section } from "../components/layout/Section";
import { linkWhatsApp, unidade } from "../config/derivados.ts";
import { ambientesDaUnidade } from "../lib/ambientes-da-unidade.ts";
import estilos from "./not-found.module.css";

export default function NaoEncontrada() {
  const whatsapp = linkWhatsApp();
  const ambientes = ambientesDaUnidade().slice(0, 4);

  return (
    <>
      <Header superficie="papel" />

      <Section superficie="papel">
        <p className={estilos.codigo}>404</p>
        <h1 className={estilos.titulo}>Esta página não existe mais.</h1>
        <p className={estilos.texto}>
          Pode ter mudado de endereço, ou o link veio quebrado. Estes são os caminhos mais
          úteis daqui:
        </p>

        <ul className={estilos.caminhos}>
          <li>
            <Link href="/ambientes" className={estilos.caminho}>
              Ver os ambientes
            </Link>
          </li>
          <li>
            <Link href="/a-loja" className={estilos.caminho}>
              Showroom {unidade.nome}
            </Link>
          </li>
          {whatsapp ? (
            <li>
              <a href={whatsapp} className={estilos.caminho}>
                Falar no WhatsApp
              </a>
            </li>
          ) : null}
          <li>
            <Link href="/" className={estilos.caminho}>
              Página inicial
            </Link>
          </li>
        </ul>

        {ambientes.length > 0 ? (
          <>
            <h2 className={estilos.subtitulo}>Ou comece por um ambiente</h2>
            <ul className={estilos.atalhos}>
              {ambientes.map((a) => (
                <li key={a.slug}>
                  <Link href={`/ambientes/${a.slug}`} className={estilos.atalho}>
                    {a.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </Section>

      <Footer />
    </>
  );
}
