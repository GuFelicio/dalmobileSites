/**
 * Foto — a imagem responsiva do site.
 *
 * O que é: um <img> com `srcSet` e `sizes` reais, apontando para as variações
 * que `build/gerar-imagens.mjs` gera com sharp.
 *
 * Onde é usado: em toda foto de conteúdo — case, índice de projetos, ambientes.
 *
 * Props:
 *   src       caminho da foto original, começando em /fotos/
 *   alt       descrição para quem não vê a imagem. Obrigatório.
 *   sizes     a largura que a foto ocupa em cada faixa. Obrigatório: sem isso
 *             o navegador assume 100vw e baixa a maior variação sempre.
 *   prioridade  só na foto de abertura da página. Carrega sem lazy.
 *   className   para o enquadramento; a Foto não decide layout.
 *
 * POR QUE NÃO É next/image: o endpoint /_vinext/image depende do binding
 * `env.IMAGES`, que não existe na conta e é pago. E o shim do vinext, ao
 * receber um `loader` próprio, DESLIGA o srcSet e passa a servir um arquivo só
 * — exatamente o erro que este componente existe para evitar. Ver
 * docs/decisoes.md.
 */
import { entradaDaFoto, urlDaVariacao } from "../../lib/fotos.ts";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  prioridade?: boolean;
  className?: string;
};

export default function Foto({ src, alt, sizes, prioridade = false, className }: Props) {
  const entrada = entradaDaFoto(src);

  // Falha alto e cedo: foto no conteúdo sem variação gerada é erro de build,
  // não um <img> quebrado descoberto em produção.
  if (!entrada) {
    throw new Error(
      `Foto "${src}" não está no manifesto. Coloque o arquivo em public/fotos/ e ` +
        `rode \`npm run fotos\`. Ver docs/adicionar-projeto.md.`,
    );
  }

  const srcSet = entrada.disponiveis.map((l) => `${urlDaVariacao(src, l)} ${l}w`).join(", ");
  const maior = entrada.disponiveis[entrada.disponiveis.length - 1];

  return (
    <img
      className={className}
      src={urlDaVariacao(src, maior)}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      // Reserva o espaço pela proporção real: a página não pula quando a foto
      // chega. Largura e altura vêm do manifesto, medidas do arquivo.
      width={entrada.largura}
      height={entrada.altura}
      loading={prioridade ? "eager" : "lazy"}
      fetchPriority={prioridade ? "high" : undefined}
      decoding={prioridade ? "sync" : "async"}
    />
  );
}
