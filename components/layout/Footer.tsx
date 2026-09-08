/**
 * Footer — o rodapé do site.
 *
 * O que é: mapa do site, não assinatura. Quatro colunas no desktop: a marca
 * com o endereço, as páginas, o contato com horário, e a outra loja mais as
 * políticas. O CLAUDE.md exige endereço, telefone, WhatsApp e horário no
 * rodapé de toda página, porque é o que sustenta a busca local.
 *
 * Onde é usado: em TODA página, sempre na superfície cinza.
 *
 * Props: nenhuma. Tudo vem do config da unidade, via config/derivados.ts
 * da unidade. Nenhum dado de loja escrito direto aqui.
 */
import Link from "next/link";
import {
  enderecoEmLinha,
  linkTelefone,
  linkWhatsApp,
  navegacao,
  unidade,
} from "../../config/derivados";
import { WhatsApp } from "../icons";
import { Brand } from "./Brand";
import estilos from "./Footer.module.css";

export function Footer() {
  const whatsapp = linkWhatsApp();

  return (
    <footer className={estilos.footer}>
      <div className={estilos.colunas}>
        {/* 1 — marca e endereço */}
        <div className={estilos.coluna}>
          <Brand />
          <address className={estilos.endereco}>{enderecoEmLinha()}</address>
        </div>

        {/* 2 — páginas do site */}
        <nav className={estilos.coluna} aria-label="Páginas do site">
          <h2 className={estilos.titulo}>O site</h2>
          <ul className={estilos.lista}>
            {navegacao.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.rotulo}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* 3 — contato e horário */}
        <div className={estilos.coluna}>
          <h2 className={estilos.titulo}>Contato</h2>
          <ul className={estilos.lista}>
            <li>
              <a href={linkTelefone()}>{unidade.telefone}</a>
            </li>
            <li>
              {whatsapp ? (
                <a className={estilos.comIcone} href={whatsapp}>
                  <WhatsApp />
                  Falar no WhatsApp
                </a>
              ) : (
                <span className={`${estilos.comIcone} ${estilos.pendente}`} aria-disabled="true">
                  <WhatsApp />
                  WhatsApp em breve
                </span>
              )}
            </li>
          </ul>

          {/* Publicar o horário é detalhe pequeno com retorno alto: o
              concorrente mais forte de SJC não publica o dele. */}
          <ul className={estilos.horarios}>
            {unidade.horarios.map((horario) => (
              <li key={horario.dias}>
                <span className={estilos.dias}>{horario.dias}</span>
                <span>
                  {horario.abre} às {horario.fecha}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* 4 — a outra loja e as políticas */}
        <div className={estilos.coluna}>
          <h2 className={estilos.titulo}>A outra loja</h2>
          <ul className={estilos.lista}>
            <li>
              <a href={unidade.outraUnidade.url}>{unidade.outraUnidade.nome}</a>
            </li>
          </ul>
          <ul className={estilos.lista}>
            <li>
              <Link href="/privacidade">Privacidade</Link>
            </li>
          </ul>
        </div>
      </div>

      <p className={estilos.assinatura}>
        Dalmóbile {unidade.nome} · Crie seu mundo
      </p>
    </footer>
  );
}
