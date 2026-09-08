/**
 * Página de teste do layout base — TEMPORÁRIA.
 *
 * O que é: o andaime de revisão da Fase 2. Renderiza cabeçalho, rodapé e as
 * três superfícies para conferência nas seis larguras da matriz do CLAUDE.md.
 *
 * SAI NA FASE 3, junto com a página de estudos. Não linkar de lugar nenhum,
 * não indexar, não copiar nada daqui para uma página de verdade.
 *
 * Como usar: o cabeçalho muda de superfície pelo parâmetro ?superficie=,
 * porque ele assume o fundo daquela em que está pousado e isso precisa ser
 * visto nas três.
 */
import Link from "next/link";
import { Footer } from "../../components/layout/Footer";
import { Header } from "../../components/layout/Header";
import { Section, type Superficie } from "../../components/layout/Section";
import estilos from "./teste.module.css";

const SUPERFICIES: Superficie[] = ["preto", "cinza", "papel"];

function ehSuperficie(valor: string | undefined): valor is Superficie {
  return SUPERFICIES.includes(valor as Superficie);
}

export default async function TesteLayout({
  searchParams,
}: {
  searchParams: Promise<{ superficie?: string }>;
}) {
  const params = await searchParams;
  const superficie: Superficie = ehSuperficie(params.superficie) ? params.superficie : "preto";

  return (
    <>
      <Header superficie={superficie} />

      {/* A primeira seção repete a superfície do cabeçalho, porque é nela que
          ele está pousado — é assim que a página real vai montar. */}
      <Section superficie={superficie}>
        <p className={estilos.rotulo}>Fase 2 · andaime de revisão</p>
        <h1 className={estilos.displayXl}>Feito para você, seja onde for.</h1>
        <p className={estilos.texto}>
          Role para ver o cabeçalho ganhar fundo sólido depois de 80px. Abaixo de
          1025px o menu vira painel de tela cheia: abre no botão, prende o foco
          dentro, fecha no Esc.
        </p>

        <nav className={estilos.controles} aria-label="Trocar a superfície do cabeçalho">
          {SUPERFICIES.map((valor) => (
            <Link
              key={valor}
              href={`/teste-layout?superficie=${valor}`}
              aria-current={valor === superficie ? "page" : undefined}
            >
              Cabeçalho em {valor}
            </Link>
          ))}
        </nav>
      </Section>

      {/* As três superfícies, uma atrás da outra, para comparar as trocas.
          Numa página de verdade isto seria demais: o limite é quatro trocas
          por página. Aqui são três porque o objetivo é justamente vê-las. */}
      {SUPERFICIES.map((valor) => (
        <Section key={valor} superficie={valor}>
          <p className={estilos.rotulo}>Superfície {valor}</p>
          <h2 className={estilos.displayL}>
            {valor === "preto" ? "A imagem manda." : null}
            {valor === "cinza" ? "Costura." : null}
            {valor === "papel" ? "O texto manda." : null}
          </h2>
          <p className={estilos.texto}>
            Medida de leitura travada entre 62 e 66 caracteres, para conferir a
            quebra de linha em cada largura. A hierarquia vem de escala e
            tracking, nunca de engordar o peso. Nesta linha deve haver uma quebra
            confortável, sem palavra órfã no fim do parágrafo.
          </p>
          <p className={estilos.subtitulo}>Subtítulo em 22px, 20px no telefone.</p>
        </Section>
      ))}

      <Footer />
    </>
  );
}
