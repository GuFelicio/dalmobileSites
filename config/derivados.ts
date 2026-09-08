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
