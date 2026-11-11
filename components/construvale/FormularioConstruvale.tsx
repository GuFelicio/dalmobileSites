"use client";

/**
 * FormularioConstruvale — o cadastro que libera o PDF da apresentação.
 *
 * O que é: nome, telefone (WhatsApp), e-mail opcional e a autorização. Ao
 * enviar, valida no navegador, manda os dados ao Apps Script (planilha do
 * Google) e troca o formulário pela tela "Pronto", com o botão do PDF. Tudo no
 * navegador: nenhuma server action, para o site continuar exportável em HTML
 * estático (CLAUDE.md, "Publicação: Cloudflare Pages").
 *
 * Onde é usado: app/construvale2026/page.tsx, e só lá.
 *
 * Props:
 *   appsScript  endereço do Apps Script (config da unidade)
 *   pdf         caminho do PDF da apresentação
 *   whatsapp    link wa.me da loja, para o botão secundário (ou null)
 *   telefone    o número da loja, como aparece no aviso de privacidade
 *
 * ENVIO NO ESTANDE (4G ruim): o Apps Script não devolve CORS, então o fetch é
 * `no-cors` e a resposta é opaca — não dá para saber se gravou. O PDF é
 * liberado quando o fetch termina OU depois de 4 segundos, o que vier
 * primeiro: a pessoa não pode ficar presa na fila do estande. `keepalive`
 * deixa o envio terminar mesmo se ela já tiver saído da página.
 *
 * Quem já se cadastrou neste aparelho (localStorage) vê direto a tela "Pronto".
 */
import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";

import estilos from "./FormularioConstruvale.module.css";

type Props = {
  appsScript: string;
  pdf: string;
  whatsapp: string | null;
  telefone: string;
};

type Campo = "nome" | "telefone" | "email" | "aceite";
type Erros = Partial<Record<Campo, string>>;

const CHAVE = "dalmobile-construvale2026";
/** Tempo máximo de espera do envio antes de liberar o PDF. */
const ESPERA_MAXIMA_MS = 4000;

/** O primeiro nome salvo neste aparelho, ou null. Lido como store externo: no
 *  HTML estático (servidor) é sempre null, e o navegador troca depois, sem
 *  erro de hidratação. */
function lerSalvo(): string | null {
  try {
    const salvo = window.localStorage.getItem(CHAVE);
    return salvo ? (JSON.parse(salvo).primeiroNome ?? "") : null;
  } catch {
    return null; // localStorage bloqueado (aba anônima): mostra o formulário
  }
}
const assinarNada = () => () => {};

/** Só os dígitos, no máximo 11 (DDD + 9 dígitos). */
const digitos = (valor: string) => valor.replace(/\D/g, "").slice(0, 11);

/** "12996021234" → "(12) 99602-1234"; com 10 dígitos, "(12) 3456-7890". Parcial enquanto digita. */
function mascara(valor: string): string {
  const d = digitos(valor);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  const ddd = d.slice(0, 2);
  const resto = d.slice(2);
  const corte = d.length === 11 ? 5 : 4;
  if (resto.length <= corte) return `(${ddd}) ${resto}`;
  return `(${ddd}) ${resto.slice(0, corte)}-${resto.slice(corte)}`;
}

function validar(nome: string, telefone: string, email: string, aceite: boolean): Erros {
  const erros: Erros = {};
  if (!nome.trim()) erros.nome = "Escreva seu nome.";
  const n = digitos(telefone).length;
  if (n !== 10 && n !== 11) erros.telefone = "Confira o telefone, com DDD: (12) 99999-9999.";
  if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
    erros.email = "Esse e-mail parece incompleto.";
  }
  if (!aceite) erros.aceite = "Marque a autorização para continuar.";
  return erros;
}

export default function FormularioConstruvale({ appsScript, pdf, whatsapp, telefone }: Props) {
  const [nome, setNome] = useState("");
  const [fone, setFone] = useState("");
  const [email, setEmail] = useState("");
  const [aceite, setAceite] = useState(false);
  const [empresa, setEmpresa] = useState(""); // campo armadilha (robôs)
  const [erros, setErros] = useState<Erros>({});
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState<string | null>(null);
  // Quem já se cadastrou neste aparelho vai direto para o PDF.
  const salvo = useSyncExternalStore(assinarNada, lerSalvo, () => null);
  const pronto = enviado ?? salvo;
  // O botão só funciona depois que o JavaScript assume a página. Antes disso,
  // num 4G lento, o toque fazia o envio nativo do formulário: a página
  // recarregava com os dados no endereço e nada era gravado.
  const hidratado = useSyncExternalStore(assinarNada, () => true, () => false);
  const tituloPronto = useRef<HTMLHeadingElement>(null);
  const focarPronto = useRef(false);

  // Depois do envio, o foco vai para o título da tela nova (leitor de tela e
  // teclado não ficam perdidos onde o formulário estava).
  useEffect(() => {
    if (pronto !== null && focarPronto.current) tituloPronto.current?.focus();
  }, [pronto]);

  async function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (enviando) return;

    const encontrados = validar(nome, fone, email, aceite);
    setErros(encontrados);
    const primeiro = (["nome", "telefone", "email", "aceite"] as Campo[]).find((c) => encontrados[c]);
    if (primeiro) {
      document.getElementById(`cv-${primeiro}`)?.focus();
      return;
    }

    setEnviando(true);
    const corpo = new URLSearchParams({
      nome: nome.trim(),
      telefone: mascara(fone),
      email: email.trim(),
      consentimento: "sim",
      origem: "qr-construvale2026",
      pagina: window.location.href,
      empresa,
    });
    const envio = fetch(appsScript, { method: "POST", mode: "no-cors", keepalive: true, body: corpo }).catch(
      () => undefined,
    );
    await Promise.race([envio, new Promise((r) => setTimeout(r, ESPERA_MAXIMA_MS))]);

    const primeiroNome = nome.trim().split(/\s+/)[0];
    try {
      window.localStorage.setItem(CHAVE, JSON.stringify({ primeiroNome }));
    } catch {
      // sem localStorage: a pessoa só não pula o formulário da próxima vez.
    }
    focarPronto.current = true;
    setEnviando(false);
    setEnviado(primeiroNome);
  }

  if (pronto !== null) {
    return (
      <div className={estilos.pronto} aria-live="polite">
        <h2 ref={tituloPronto} tabIndex={-1} className={estilos.prontoTitulo}>
          {pronto ? `Pronto, ${pronto}.` : "Pronto."}
        </h2>
        <p className={estilos.prontoTexto}>A apresentação está liberada.</p>
        <a className={estilos.botao} href={pdf} target="_blank" rel="noopener">
          Abrir a apresentação (PDF)
        </a>
        {whatsapp ? (
          <a className={estilos.botaoSecundario} href={whatsapp}>
            Falar com a loja no WhatsApp
          </a>
        ) : null}
      </div>
    );
  }

  // Ligação entre o campo e a mensagem de erro dele, para o leitor de tela.
  const erroDe = (campo: Campo) =>
    erros[campo]
      ? { "aria-invalid": true as const, "aria-describedby": `cv-${campo}-erro` }
      : { "aria-invalid": false as const };

  return (
    <form className={estilos.formulario} onSubmit={enviar} noValidate>
      <div className={estilos.campo}>
        <label htmlFor="cv-nome" className={estilos.label}>
          Nome
        </label>
        <input
          id="cv-nome"
          className={estilos.input}
          type="text"
          name="nome"
          autoComplete="name"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          {...erroDe("nome")}
        />
        {erros.nome ? (
          <p id="cv-nome-erro" className={estilos.erro}>
            {erros.nome}
          </p>
        ) : null}
      </div>

      <div className={estilos.campo}>
        <label htmlFor="cv-telefone" className={estilos.label}>
          Telefone (WhatsApp)
        </label>
        <input
          id="cv-telefone"
          className={estilos.input}
          type="tel"
          inputMode="tel"
          name="telefone"
          autoComplete="tel"
          value={fone}
          onChange={(e) => setFone(mascara(e.target.value))}
          {...erroDe("telefone")}
        />
        {erros.telefone ? (
          <p id="cv-telefone-erro" className={estilos.erro}>
            {erros.telefone}
          </p>
        ) : null}
      </div>

      <div className={estilos.campo}>
        <label htmlFor="cv-email" className={estilos.label}>
          E-mail (opcional)
        </label>
        <input
          id="cv-email"
          className={estilos.input}
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          {...erroDe("email")}
        />
        {erros.email ? (
          <p id="cv-email-erro" className={estilos.erro}>
            {erros.email}
          </p>
        ) : null}
      </div>

      {/* Armadilha para robôs: fora da tela (não display:none, que alguns
          robôs reconhecem), fora do Tab e do leitor de tela. Gente não vê
          nem preenche; o Apps Script descarta o cadastro que vier com ela. */}
      <div className={estilos.armadilha} aria-hidden="true">
        <label htmlFor="cv-empresa">Empresa</label>
        <input
          id="cv-empresa"
          type="text"
          name="empresa"
          tabIndex={-1}
          autoComplete="off"
          value={empresa}
          onChange={(e) => setEmpresa(e.target.value)}
        />
      </div>

      <div className={estilos.campo}>
        <div className={estilos.aceite}>
          <input
            id="cv-aceite"
            className={estilos.caixa}
            type="checkbox"
            name="consentimento"
            checked={aceite}
            onChange={(e) => setAceite(e.target.checked)}
            {...erroDe("aceite")}
          />
          <label htmlFor="cv-aceite" className={estilos.aceiteTexto}>
            Autorizo a Dalmóbile a usar meu nome, telefone e e-mail para enviar a apresentação e falar
            comigo sobre o meu projeto.
          </label>
        </div>
        {erros.aceite ? (
          <p id="cv-aceite-erro" className={estilos.erro}>
            {erros.aceite}
          </p>
        ) : null}
      </div>

      <button type="submit" className={estilos.botao} disabled={!hidratado || enviando} aria-busy={enviando}>
        {enviando ? "Enviando…" : "Baixar a apresentação"}
      </button>

      <p className={estilos.aviso}>
        Seus dados ficam só com a Dalmóbile, não são vendidos nem repassados. Para pedir a exclusão, fale com a
        loja pelo WhatsApp {telefone}.
      </p>
    </form>
  );
}
