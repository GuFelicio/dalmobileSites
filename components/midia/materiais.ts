/**
 * Os materiais da cena de estudo — PROVISÓRIOS.
 *
 * O que é: a paleta de acabamentos usada pela cena 3D do laboratório. Cor,
 * rugosidade e espessura de cada peça, num arquivo só, para que trocar por
 * material fotografado na loja seja trocar este arquivo — e nada mais.
 *
 * Onde é usado: components/midia/CenaMateriais.tsx.
 *
 * COMO TROCAR PELAS FOTOS REAIS, quando elas existirem:
 *   1. fotografe a chapa em luz difusa, de frente, sem reflexo
 *   2. gere um recorte quadrado que repita sem emenda (1024px basta)
 *   3. ponha em public/fotos/materiais/<slug>.webp
 *   4. acrescente `mapa: "/fotos/materiais/<slug>.webp"` ao acabamento
 *   A cena carrega a textura quando o campo existe e usa a cor quando não.
 *
 * As cores abaixo NÃO vêm de app/tokens.css de propósito: não são cor de
 * interface, são aparência de material. Misturá-las com a paleta do site faria
 * a troca por foto real mexer nos tokens.
 */

export type Acabamento = {
  /** Como a peça é chamada na proposta. Aparece na legenda da cena. */
  nome: string;
  /** Cor base, enquanto não há foto do material. */
  cor: number;
  /** 0 é espelho, 1 é fosco total. Madeira fica entre 0.55 e 0.85. */
  rugosidade: number;
  /** Espessura da peça em milímetros — é ela que dá escala à cena. */
  espessuraMm: number;
  /** Foto do material, quando existir. Ver o passo a passo acima. */
  mapa?: string;
};

export const ACABAMENTOS: Acabamento[] = [
  { nome: "Freijó natural", cor: 0xb98d5f, rugosidade: 0.72, espessuraMm: 18 },
  { nome: "Carvalho claro", cor: 0xd6b78b, rugosidade: 0.68, espessuraMm: 18 },
  { nome: "Nogueira", cor: 0x6b4a32, rugosidade: 0.62, espessuraMm: 25 },
  { nome: "Laca fosco areia", cor: 0xcfc4a9, rugosidade: 0.88, espessuraMm: 15 },
  { nome: "Laca fosco grafite", cor: 0x4a4a48, rugosidade: 0.86, espessuraMm: 15 },
  { nome: "Cumaru", cor: 0x8a5a3b, rugosidade: 0.66, espessuraMm: 20 },
];

/** A lâmina que faz a curva. É a peça principal da composição. */
export const LAMINA: Acabamento = {
  nome: "Lâmina curva em freijó",
  cor: 0xc39364,
  rugosidade: 0.7,
  espessuraMm: 6,
};

/** A fita de borda, que acompanha a curva da lâmina. */
export const FITA: Acabamento = {
  nome: "Fita de borda",
  cor: 0x8f6a45,
  rugosidade: 0.55,
  espessuraMm: 2,
};

/** Luz da cena. Neutra e quente, como luz de showroom. */
export const LUZ = {
  ambiente: 0xfff4eb,
  ambienteIntensidade: 1.1,
  principal: 0xffffff,
  principalIntensidade: 2.2,
  fundo: 0xf5f4f0,
};
