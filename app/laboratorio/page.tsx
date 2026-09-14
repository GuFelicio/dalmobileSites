/**
 * /laboratorio — estudo de cena 3D. NÃO VAI AO AR.
 *
 * O que é: o protótipo da cena de materiais, montado no enquadramento do
 * bloco 01 da home ("Nenhuma casa é igual à planta"), para a decisão de
 * adotá-la ou não ser tomada olhando o lugar certo.
 *
 * Onde é usado: em nenhum lugar. A rota **responde 404 no build de
 * produção** e só existe em `npm run dev`.
 *
 * POR QUE 404 EM PRODUÇÃO: o checklist "Obrigatório antes de qualquer
 * deploy" do CLAUDE.md proíbe rota de teste no build, e `/teste-layout`
 * acabou de ser removida por exatamente isso — tinha ficado no ar
 * respondendo 200, sem link nenhum, por semanas. Uma rota de protótipo que
 * ninguém linka é uma rota que ninguém confere.
 *
 * Como ver: `npm run dev` e abrir http://localhost:5173/laboratorio
 *
 * Se um dia quiser publicá-la para revisão remota, troque a constante
 * abaixo — e ponha um prazo para tirá-la de novo.
 */
import { notFound } from "next/navigation";

import { Footer } from "../../components/layout/Footer";
import { Header } from "../../components/layout/Header";
import { Section } from "../../components/layout/Section";
import CenaMateriais from "../../components/midia/CenaMateriais";
import estilos from "./laboratorio.module.css";

/** Publicar o laboratório no site? Deixe `false`. Ver o cabeçalho acima. */
const PUBLICAR = false;

export const metadata = {
  title: "Laboratório — estudo de cena",
  robots: { index: false, follow: false },
};

export default function Laboratorio() {
  if (!PUBLICAR && !import.meta.env.DEV) notFound();

  return (
    <>
      <Header superficie="papel" />

      <Section superficie="papel" semRespiro>
        <p className={estilos.aviso}>
          Estudo. Esta página não vai ao ar — responde 404 fora do modo de
          desenvolvimento. Ver o cabeçalho de <code>app/laboratorio/page.tsx</code>.
        </p>
      </Section>

      {/* O enquadramento do bloco 01 da home: texto à esquerda, a peça
          visual à direita. A cena ocupa o lugar exato da foto de hoje. */}
      <Section superficie="papel">
        <div className={estilos.bloco}>
          <div className={estilos.texto}>
            <p className={estilos.rotulo}>01 — COMO PROJETAMOS</p>
            <h1 className={estilos.titulo}>Nenhuma casa é igual à planta.</h1>
            <p className={estilos.paragrafo}>
              A medição é feita no imóvel, com a obra pronta — é de lá que sai o desenho.
              O pé-direito real, o vão que ficou dois centímetros fora do projeto, a tomada
              que ninguém previu. O móvel se ajusta à casa; nunca o contrário.
            </p>
          </div>

          <div className={estilos.cena}>
            <CenaMateriais />
          </div>
        </div>
      </Section>

      {/* Espaço abaixo para a rolagem ter curso: a cena é controlada por ela. */}
      <Section superficie="papel">
        <p className={estilos.paragrafo}>
          Role a página para ver a sequência: as chapas entram uma a uma, a lâmina assume a
          curva, a fita de borda acompanha, e o conjunto fecha em composição.
        </p>
      </Section>

      <Footer />
    </>
  );
}
