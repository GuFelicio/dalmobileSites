/**
 * Dados da unidade — MÓDULO DE TRANSIÇÃO
 *
 * O que é: a fonte única dos dados da loja enquanto a camada de config por
 * unidade não existe. Nenhum dado de unidade pode ser escrito direto em
 * componente — foi assim que o site anterior acabou indexado com a cidade
 * errada no domínio errado.
 *
 * Onde é usado: components/layout/Header.tsx e components/layout/Footer.tsx.
 *
 * Na Fase 3 este arquivo vira `config/sjc.ts`, ganha tipagem que quebra o
 * build em campo faltando, ganha o irmão `config/caragua.ts` e passa a
 * carregar também a composição da home. A forma abaixo já antecipa isso, para
 * que a Fase 3 seja renomear e tipar, não reescrever.
 */

export type Horario = {
  /** Faixa de dias, como aparece no Google Business Profile. */
  dias: string;
  abre: string;
  fecha: string;
  /**
   * Falso enquanto a loja não confirmar. Nenhum número vai ao ar sem
   * confirmação — a Fase 8 barra o deploy se algum horário continuar assim.
   */
  confirmado?: boolean;
};

export type Unidade = {
  /** Identificador da unidade. Vira o alvo de build na Fase 3. */
  id: "sjc" | "caragua";
  /** Nome curto da unidade, para rótulo e texto acessível. */
  nome: string;
  /** Cidade por extenso, para metadata e schema. NUNCA citar a da outra unidade. */
  cidade: string;
  estado: string;
  endereco: {
    logradouro: string;
    bairro: string;
    cep: string;
  };
  /**
   * O lockup da marca. Cada unidade tem o seu, e ele JÁ CONTÉM a cidade —
   * por isso nada de nome de unidade renderizado ao lado, seria duplicata.
   * As duas versões existem de verdade; nada de clarear preto com filtro.
   */
  marca: {
    /** Para superfície clara (papel, cinza). */
    escura: string;
    /** Para superfície escura (preto). */
    clara: string;
    /** Dimensões do arquivo, para o navegador reservar o espaço e não pular. */
    largura: number;
    altura: number;
  };
  telefone: string;
  /** Só dígitos, formato internacional, para o link wa.me. */
  whatsapp: string | null;
  horarios: Horario[];
  /** A outra loja, para o link cruzado do rodapé. */
  outraUnidade: {
    nome: string;
    url: string;
  };
};

export const unidade: Unidade = {
  id: "sjc",
  nome: "São José dos Campos",
  cidade: "São José dos Campos",
  estado: "SP",
  endereco: {
    logradouro: "Av. Barão do Rio Branco, 736",
    bairro: "Jardim Esplanada",
    cep: "12242-800",
  },
  marca: {
    escura: "/assets/marca-sjc-preto.png",
    clara: "/assets/marca-sjc-branco.png",
    largura: 600,
    altura: 177,
  },
  telefone: "(12) 3341-8777",

  // PENDENTE: a loja está trocando de CRM e ainda não tem número de WhatsApp.
  // Enquanto for null, a ação aparece no layout DESABILITADA, com "em breve" —
  // o CLAUDE.md proíbe CTA sem destino real, então não vira link. Assim que o
  // número existir, basta preencher aqui: o "em breve" some e o link nasce.
  //
  // NÃO PODE IR AO AR ASSIM. Ver o checklist da Fase 8.
  whatsapp: null,

  // PENDENTE: o sábado veio como "acho que até as 14h" — não confirmado.
  // Antes da Fase 8 os dois horários têm que bater EXATAMENTE com o Google
  // Business Profile, porque alimentam o schema LocalBusiness, e endereço,
  // telefone e horário divergentes derrubam a busca local.
  horarios: [
    { dias: "Segunda a sexta", abre: "09h00", fecha: "19h00" },
    { dias: "Sábado", abre: "09h00", fecha: "14h00", confirmado: false },
  ],

  outraUnidade: {
    nome: "Caraguatatuba",
    url: "https://dalmobilecaraguatatuba.com.br",
  },
};

/**
 * Itens do menu principal. Cinco, conforme o mapa de rotas do CLAUDE.md.
 * Na Fase 3 passa a sair do config, porque cada unidade define o conjunto
 * de páginas do seu site.
 */
export const navegacao = [
  { rotulo: "Projetos", href: "/projetos" },
  { rotulo: "Ambientes", href: "/ambientes" },
  { rotulo: "A Dalmóbile", href: "/a-dalmobile" },
  { rotulo: "Arquitetos", href: "/arquitetos" },
  { rotulo: "A loja", href: "/a-loja" },
] as const;

/** Endereço em uma linha, para o rodapé e para o schema. */
export function enderecoEmLinha(u: Unidade = unidade): string {
  const { logradouro, bairro, cep } = u.endereco;
  return `${logradouro} — ${bairro}, ${u.cidade} — ${u.estado}, ${cep}`;
}

/** Link wa.me, ou null enquanto o número não existir. */
export function linkWhatsApp(u: Unidade = unidade): string | null {
  return u.whatsapp ? `https://wa.me/${u.whatsapp}` : null;
}

/** Horários que a loja ainda não confirmou. Vazio é o que precisa acontecer. */
export function horariosNaoConfirmados(u: Unidade = unidade): Horario[] {
  return u.horarios.filter((h) => h.confirmado === false);
}

/** Link tel:, com os dígitos limpos. */
export function linkTelefone(u: Unidade = unidade): string {
  return `tel:+55${u.telefone.replace(/\D/g, "")}`;
}
