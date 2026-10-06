/**
 * Footer — o rodapé do site.
 *
 * O que é: a barra cinza do fim da página, com a marca, o endereço da loja, o
 * WhatsApp (com o número, que é também o telefone), o link da política de
 * privacidade e a assinatura. Desde a v5 (06/10/2026), quando o site virou uma
 * página só, é o MESMO rodapé na home e em /privacidade; o mapa do site com
 * quatro colunas saiu junto com as páginas internas. O horário fica na seção
 * do showroom, logo acima.
 *
 * Onde é usado: na home, em /privacidade e no 404.
 *
 * Props: nenhuma. Tudo vem do config da unidade, via config/derivados.ts.
 */
import Link from "next/link";
import { enderecoEmLinha, linkTelefone, linkWhatsApp, unidade } from "../../config/derivados";
import { WhatsApp } from "../icons";
import { Brand } from "./Brand";
import estilos from "./Footer.module.css";

export function Footer() {
  const whatsapp = linkWhatsApp();

  return (
    <footer className={estilos.footer}>
      <div className={estilos.linha}>
        <Brand />
        <div className={estilos.dados}>
          <address className={estilos.endereco}>{enderecoEmLinha()}</address>
          <ul className={estilos.links}>
            <li>
              {/* O número, e não "Falar no WhatsApp": é o mesmo número do
                  telefone, e assim o rodapé traz os dois (checklist do
                  CLAUDE.md). Sem WhatsApp, vira link de telefone. */}
              <a href={whatsapp ?? linkTelefone()}>
                {whatsapp ? <WhatsApp /> : null}
                {unidade.telefone}
              </a>
            </li>
            <li>
              <Link href="/privacidade">Privacidade</Link>
            </li>
          </ul>
        </div>
      </div>

      <p className={estilos.assinatura}>Dalmóbile {unidade.nome} · Crie seu mundo</p>
    </footer>
  );
}
