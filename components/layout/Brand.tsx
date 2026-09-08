/**
 * Brand — o lockup da marca.
 *
 * O que é: a marca da unidade. O arquivo JÁ CONTÉM a cidade abaixo do
 * wordmark — é assim que a marca é desenhada —, então este componente não
 * renderiza o nome da unidade ao lado. Fazer isso duplicaria a cidade.
 *
 * Há duas versões de verdade, escura e clara, uma por tipo de superfície.
 * Não existe mais filter: invert() clareando a versão preta.
 *
 * Onde é usado: cabeçalho, menu mobile e rodapé.
 *
 * Props:
 *   claro      usa a versão clara, para superfície preta.
 *   decorativo zera o alt, para quando quem carrega o nome acessível é o
 *              link em volta. Padrão false.
 *   className
 *
 * DÍVIDA CONHECIDA: o lockup ainda é PNG. Em SVG ele escalaria sem peso e
 * dispensaria as duas versões — bastaria currentColor. Está pedido.
 */
import { unidade } from "../../config/derivados";
import estilos from "./Brand.module.css";

type BrandProps = {
  claro?: boolean;
  decorativo?: boolean;
  className?: string;
};

export function Brand({ claro = false, decorativo = false, className }: BrandProps) {
  const { marca, nome } = unidade;

  return (
    <img
      className={[estilos.marca, className ?? ""].filter(Boolean).join(" ")}
      src={claro ? marca.clara : marca.escura}
      alt={decorativo ? "" : `Dalmóbile ${nome}`}
      width={marca.largura}
      height={marca.altura}
    />
  );
}
