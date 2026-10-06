/**
 * 404 — página não encontrada.
 *
 * O que é: uma linha honesta e os caminhos mais úteis, conforme a seção 10 do
 * docs/direcao-site.md. Sem piada.
 *
 * Onde é usado: automaticamente, em qualquer rota que não exista. As páginas
 * internas antigas NÃO caem aqui: respondem 301 para a home (worker/index.ts).
 */
import Link from "next/link";

import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { Section } from "../components/layout/Section";
import { linkWhatsApp, unidade } from "../config/derivados.ts";
import estilos from "./not-found.module.css";

export default function NaoEncontrada() {
  const whatsapp = linkWhatsApp();

  return (
    <>
      <Header />

      <Section superficie="papel" className={estilos.pagina}>
        <p className={estilos.codigo}>404</p>
        <h1 className={estilos.titulo}>Esta página não existe mais</h1>
        <p className={estilos.texto}>
          Pode ter mudado de endereço, ou o link veio quebrado. Estes são os caminhos mais
          úteis daqui:
        </p>

        <ul className={estilos.caminhos}>
          <li>
            {/* v5: as páginas internas saíram; os caminhos levam às seções da
                home. "Ver os ambientes" virou "Ver projetos", como o menu. */}
            <Link href="/#projetos" className={estilos.caminho}>
              Ver projetos
            </Link>
          </li>
          <li>
            <Link href="/#a-loja" className={estilos.caminho}>
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

      </Section>

      <Footer />
    </>
  );
}
