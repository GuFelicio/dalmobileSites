/**
 * Valores derivados do config da unidade.
 *
 * O que é: o que se calcula a partir dos dados da loja — link wa.me, link
 * tel:, endereço em uma linha. Fica separado dos dados porque config é o que a
 * loja informa, e isto é o que o site faz com aquilo.
 *
 * Onde é usado: components/layout/Header, Footer, MobileMenu e Brand.
 *
 * Cada função aceita uma unidade explícita, mas assume a do build. É o que
 * permite testar as duas sem trocar o alvo do build.
 */
import { unidade as unidadeDoBuild } from "@unidade";
import { PENDENTE } from "./pendente.ts";
import type { Horario, ItemDeNavegacao, Unidade } from "./tipos.ts";

// Anotado de propósito: "@unidade" é um módulo resolvido por alias no build,
// e sem a anotação o tipo se perde e tudo que vem daqui vira `any`.
export const unidade: Unidade = unidadeDoBuild;

/** Endereço em uma linha, para o rodapé e para o schema LocalBusiness. */
export function enderecoEmLinha(u: Unidade = unidade): string {
  const { logradouro, bairro, cep } = u.endereco;
  return `${logradouro} — ${bairro}, ${u.cidade} — ${u.estado}, ${cep}`;
}

/**
 * Link wa.me com mensagem pré-preenchida, ou null enquanto o número não existir.
 *
 * A mensagem NÃO é enfeite: as duas unidades compartilham o mesmo número de
 * WhatsApp, e o `docs/direcao-site.md` exige que o lead carregue de qual
 * unidade veio. Sem ela, quem atende não tem como saber se a pessoa está no
 * site de uma cidade ou no da outra. É o único sinal de origem que existe.
 *
 * O texto segue a microcópia do CLAUDE.md: direto, sem linguagem de funil.
 */
export function linkWhatsApp(u: Unidade = unidade): string | null {
  if (!u.whatsapp) return null;
  const mensagem = `Olá! Falo com a Dalmóbile ${u.cidade}?`;
  return `https://wa.me/${u.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

/** Link tel:, com os dígitos limpos. */
export function linkTelefone(u: Unidade = unidade): string {
  return `tel:+55${u.telefone.replace(/\D/g, "")}`;
}

/** Horários que a loja ainda não confirmou. Vazio é o que precisa acontecer. */
export function horariosNaoConfirmados(u: Unidade = unidade): Horario[] {
  return u.horarios.filter((h) => h.confirmado === false);
}

/** Itens do menu principal desta unidade. */
export const navegacao: ItemDeNavegacao[] = unidade.navegacao;

/**
 * O mapa desta unidade, ou null enquanto a loja não mandar o embed.
 *
 * Existe para a página não renderizar um iframe com o sentinela dentro. Sem
 * isto, /a-loja mostraria uma moldura vazia — pior que não mostrar mapa nenhum.
 */
export function mapaDaUnidade(u: Unidade = unidade): { embed: string; link: string } | null {
  if (u.mapa.embed === PENDENTE || u.mapa.link === PENDENTE) return null;
  return u.mapa;
}

/**
 * Schema LocalBusiness desta unidade, para a busca local.
 *
 * Endereço, telefone e horário TÊM que bater exatamente com o Google Business
 * Profile: divergência derruba a busca local e invalida o schema.
 * Ver docs/pendencias.md.
 */
export function schemaLocalBusiness(u: Unidade = unidade) {
  return {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    name: `Dalmóbile ${u.cidade}`,
    url: u.dominio,
    telephone: `+55${u.telefone.replace(/\D/g, "")}`,
    image: `${u.dominio}${u.marca.escura}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: u.endereco.logradouro,
      addressLocality: u.cidade,
      addressRegion: u.estado,
      postalCode: u.endereco.cep,
      addressCountry: "BR",
    },
    openingHoursSpecification: u.horarios
      // Horário não confirmado não entra no schema: alimentar a busca local
      // com dado que a loja não confirmou é pior que não alimentar.
      .filter((h) => h.confirmado !== false)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        description: h.dias,
        opens: h.abre.replace("h", ":"),
        closes: h.fecha.replace("h", ":"),
      })),
  };
}
