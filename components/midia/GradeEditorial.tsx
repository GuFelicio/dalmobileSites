/**
 * GradeEditorial — a vitrine de projetos da home, sem carrossel.
 *
 * O que é: as fotos do acervo num ciclo de três ritmos que se repete
 *   A — uma foto sangrando de ponta a ponta, 16:9, legenda embaixo à esquerda
 *   B — duas fotos 3:2 lado a lado, legenda embaixo de cada
 *   C — uma foto a 2/3 da largura, à direita, legenda na coluna vazia à esquerda
 * O ciclo usa quatro fotos (1 + 2 + 1). Se sobrar uma foto só para o B, ela
 * entra como C — B com uma foto seria um A sem sangria, e A repetiria o anterior.
 *
 * Onde é usado: app/page.tsx, na seção de projetos.
 *
 * Props:
 *   fotos  as fotos do acervo desta unidade, já filtradas e na ordem em que
 *          devem aparecer. A grade não escolhe nem corta: quem chama decide.
 *
 * Legenda SEMPRE abaixo ou ao lado da foto, nunca por cima — nome do projeto
 * em Subtítulo, ambiente em Rótulo. Cada foto leva à página do ambiente.
 *
 * Substitui o SliderDeFotos da V1: carrossel divide a atenção e nenhuma foto
 * ganha o tamanho que merece. Ver docs/direcao-layout-sites-dalmobile.md, 5.3.
 * Server component: não tem estado.
 */
import Link from "next/link";

import Foto from "./Foto";
import estilos from "./GradeEditorial.module.css";

export type FotoDaGrade = {
  src: string;
  titulo: string;
  alt: string;
  ambienteNome: string;
  ambienteSlug: string;
};

type Ritmo = "a" | "b" | "c";
type Bloco = { ritmo: Ritmo; fotos: FotoDaGrade[] };

/** Distribui as fotos no ciclo A-B-C, nessa ordem. */
function emBlocos(fotos: FotoDaGrade[]): Bloco[] {
  const blocos: Bloco[] = [];
  const ciclo: Ritmo[] = ["a", "b", "c"];
  let i = 0;
  let passo = 0;
  while (i < fotos.length) {
    const ritmo = ciclo[passo % ciclo.length];
    const quantas = ritmo === "b" ? 2 : 1;
    const doBloco = fotos.slice(i, i + quantas);
    blocos.push({ ritmo: ritmo === "b" && doBloco.length < 2 ? "c" : ritmo, fotos: doBloco });
    i += doBloco.length;
    passo++;
  }
  return blocos;
}

/** O `sizes` de cada ritmo: a foto é servida no tamanho em que aparece. */
const SIZES: Record<Ritmo, string> = {
  a: "100vw",
  b: "(max-width: 820px) 100vw, 50vw",
  c: "(max-width: 820px) 100vw, 66vw",
};

function Item({ foto, ritmo }: { foto: FotoDaGrade; ritmo: Ritmo }) {
  return (
    <Link href={`/ambientes/${foto.ambienteSlug}`} className={estilos.item}>
      <span className={estilos.moldura}>
        <Foto src={foto.src} alt={foto.alt} sizes={SIZES[ritmo]} className={estilos.foto} />
      </span>
      <span className={estilos.legenda}>
        <span className={estilos.nome}>{foto.titulo}</span>
        <span className={estilos.ambiente}>{foto.ambienteNome}</span>
      </span>
    </Link>
  );
}

export default function GradeEditorial({ fotos }: { fotos: FotoDaGrade[] }) {
  if (fotos.length === 0) return null;
  const blocos = emBlocos(fotos);

  return (
    <div className={estilos.grade}>
      {blocos.map((bloco, i) => (
        <div
          key={bloco.fotos[0].src}
          // O fim de cada ciclo (depois do C) ganha o respiro normal; dentro
          // do ciclo, o curto. Assim nunca há três curtos seguidos.
          className={`${estilos.bloco} ${estilos[bloco.ritmo]} ${bloco.ritmo === "c" && i < blocos.length - 1 ? estilos.fimDeCiclo : ""}`}
        >
          {bloco.fotos.map((foto) => (
            <Item key={foto.src} foto={foto} ritmo={bloco.ritmo} />
          ))}
        </div>
      ))}
    </div>
  );
}
