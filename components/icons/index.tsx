/**
 * Ícones — SVG inline, escritos à mão.
 *
 * O que é: as poucas formas que o site usa. São menos de dez em todo o
 * projeto; uma biblioteca inteira para isso contraria o "não instalar
 * biblioteca de UI" do CLAUDE.md e pesa num site cuja prioridade é foto
 * chegando rápido no 4G. Ver docs/decisoes.md.
 *
 * Onde é usado: cabeçalho, menu mobile, rodapé, links de texto.
 *
 * Props: todos aceitam `className`. São decorativos por padrão
 * (`aria-hidden`), porque quem carrega o significado é o texto ao lado.
 * Traço de 1px e canto reto, como o resto do sistema.
 */

type IconeProps = { className?: string };

const base = {
  width: 16,
  height: 16,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1,
  "aria-hidden": true,
  focusable: false,
} as const;

/** Seta diagonal dos links de texto: "Ver projetos ↗". */
export function Seta({ className }: IconeProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 12 12 4" />
      <path d="M5.5 4H12v6.5" />
    </svg>
  );
}

/** Hambúrguer do menu mobile. Duas linhas, não três: é fio, não ícone gordo. */
export function Menu({ className }: IconeProps) {
  return (
    <svg {...base} className={className}>
      <path d="M2 5.5h12" />
      <path d="M2 10.5h12" />
    </svg>
  );
}

/** Fechar, do painel de menu. */
export function Fechar({ className }: IconeProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3.5 3.5l9 9" />
      <path d="M12.5 3.5l-9 9" />
    </svg>
  );
}

/** WhatsApp. Preenchido, porque o contorno some no tamanho que usamos. */
export function WhatsApp({ className }: IconeProps) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden
      focusable="false"
      className={className}
    >
      <path d="M8.02 1.6a6.35 6.35 0 0 0-5.4 9.7L1.6 14.4l3.19-1a6.35 6.35 0 1 0 3.23-11.8Zm0 1.17a5.18 5.18 0 1 1-2.64 9.63l-.19-.11-1.89.59.6-1.84-.12-.2A5.18 5.18 0 0 1 8.02 2.77Zm-2.3 2.62c-.11 0-.29.04-.44.2-.15.17-.58.57-.58 1.38 0 .82.6 1.6.68 1.71.08.11 1.16 1.85 2.88 2.52 1.43.56 1.72.45 2.03.42.31-.03 1-.4 1.14-.8.14-.39.14-.72.1-.79-.04-.07-.15-.11-.31-.19-.16-.08-.99-.49-1.14-.54-.15-.06-.26-.08-.37.08-.11.16-.42.53-.52.64-.09.11-.19.12-.35.04-.16-.08-.7-.26-1.33-.82-.49-.44-.82-.98-.92-1.14-.1-.16-.01-.25.07-.33.07-.07.16-.19.24-.28.08-.1.1-.17.16-.28.05-.11.03-.21-.01-.29-.04-.08-.36-.9-.5-1.23-.13-.32-.26-.28-.36-.28h-.31Z" />
    </svg>
  );
}
