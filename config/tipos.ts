/**
 * Tipos da camada de config por unidade.
 *
 * O que é: o contrato que `config/sjc.ts` e `config/caragua.ts` cumprem. É o
 * que faz campo faltando quebrar o BUILD, e não o site em produção.
 *
 * Onde é usado: pelos dois arquivos de config e por quem importa `@unidade`.
 *
 * Por que campo obrigatório não é opcional aqui: o erro que este projeto
 * existe para tornar impossível é o site de uma cidade indexado com o nome da
 * outra. Um campo opcional vira `undefined` silencioso em produção; um campo
 * obrigatório vira erro de compilação na máquina de quem editou.
 */

/** Horário de funcionamento, como aparece no Google Business Profile. */
export type Horario = {
  /** Faixa de dias, exatamente como no Google Business Profile. */
  dias: string;
  abre: string;
  fecha: string;
  /**
   * Falso enquanto a loja não confirmar. Nenhum número vai ao ar sem
   * confirmação — a Fase 8 barra o deploy se algum horário continuar assim.
   */
  confirmado?: boolean;
};

/** Uma rota do menu principal. */
export type ItemDeNavegacao = {
  rotulo: string;
  href: string;
};

export type Unidade = {
  /** Identificador. É o valor da variável UNIDADE no build. */
  id: "sjc" | "caragua";

  /** Nome curto da unidade, para rótulo e texto acessível. */
  nome: string;

  /**
   * Cidade por extenso, para metadata e schema.
   * NUNCA citar a da outra unidade. O teste de cidade cruzada guarda isto.
   */
  cidade: string;
  /**
   * A região que esta loja atende, como aparece no meio da frase ("o Vale do
   * Paraíba", "o litoral norte" — com minúscula, ver docs/vocabulario.md).
   * Entra no FAQ de área de /a-dalmobile e na faixa de /a-loja.
   */
  regiao: string;
  estado: string;

  /** Domínio do site desta unidade, sem barra final. Base do sitemap e do OG. */
  dominio: string;

  /**
   * A variante de paleta desta unidade.
   *
   * "neutra" é a padrão. "palha" troca a família do cinza por tons de areia,
   * para o site do litoral. Os VALORES vivem em app/tokens.css — aqui só se
   * escolhe pelo nome, porque `app/tokens.css` é o único arquivo do projeto
   * com cor literal, e um teste barra qualquer outra.
   *
   * Só a família do cinza muda: preto, papel e branco são os mesmos nos dois
   * sites. Não é cor de acento — é superfície. Ver docs/decisoes.md.
   */
  paleta: "neutra" | "palha";

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
    /** Dimensões do arquivo, para o navegador reservar espaço e não pular. */
    largura: number;
    altura: number;
  };

  telefone: string;

  /**
   * Só dígitos, formato internacional, para o link wa.me.
   * `null` enquanto o número não existir: a ação aparece DESABILITADA, nunca
   * como link morto. O CLAUDE.md proíbe CTA sem destino real.
   */
  whatsapp: string | null;

  horarios: Horario[];

  /**
   * Mapa da loja. `embed` é a URL do iframe; `link` abre o app de mapas.
   * Os dois têm que apontar para a ficha desta unidade, não para o endereço
   * digitado à mão — a ficha é o que o Google reconhece.
   */
  mapa: {
    embed: string;
    link: string;
  };

  /**
   * Google Business Profile desta loja. Endereço, telefone e horário acima
   * têm que bater EXATAMENTE com o que está aqui: divergência derruba a
   * busca local e invalida o schema LocalBusiness.
   */
  googleBusiness: string;

  /**
   * Medição. `null` desliga o script — melhor sem medição do que com o
   * identificador da outra unidade, que contamina os dois relatórios.
   */
  analytics: {
    ga: string | null;
    pixel: string | null;
  };

  /** A outra loja, para a linha do showroom da home que leva ao outro site (v5). */
  outraUnidade: {
    /** O rótulo do link, como ele aparece escrito. */
    nome: string;
    /** A cidade da outra loja, na linha "No <região>, a Dalmóbile atende pela loja de <cidade>." */
    cidade: string;
    /** A região que a outra loja atende. Ver `regiao`. */
    regiao: string;
    url: string;
  };
  /**
   * Textos de SEO que NÃO são simétricos entre as unidades — por isso são
   * campo, e não `{{cidade}}` num texto compartilhado. Fonte: docs/copy-v3.md.
   */
  textos: {
    /** meta description da home (copy v4: a mesma frase, com a cidade). */
    descricaoHome: string;
  };

  /**
   * O conjunto de páginas deste site, na ordem do menu. Cada unidade define
   * o seu: Caraguá pode não ter as mesmas seções que SJC.
   */
  navegacao: ItemDeNavegacao[];
};
