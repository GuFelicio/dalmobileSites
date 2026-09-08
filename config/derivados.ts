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

/** Link wa.me, ou null enquanto o número não existir. */
export function linkWhatsApp(u: Unidade = unidade): string | null {
  return u.whatsapp ? `https://wa.me/${u.whatsapp}` : null;
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
