import React from 'react';
import { useRouteMeta } from '../lib/useRouteMeta';
import Container from '../components/ui/Container';
import Img from '../components/ui/Img';
import PageHeader from '../components/ui/PageHeader';
import Reveal from '../components/ui/Reveal';
import Section from '../components/ui/Section';
import SectionHeading from '../components/ui/SectionHeading';

const valuesData = [
  {
    title: 'Empathie & Écoute',
    description:
      'Chaque projet commence par une rencontre humaine. Je prends le temps de comprendre vos habitudes, vos goûts et vos contraintes pour créer un lieu qui vous correspond vraiment.',
  },
  {
    title: 'Fonctionnalité',
    description:
      "Le beau n'est rien sans l'utile. J'optimise chaque mètre carré pour fluidifier la circulation, maximiser les rangements et simplifier votre quotidien pour alléger votre charge mentale.",
  },
  {
    title: 'Durabilité',
    description:
      "Je privilégie les matériaux naturels, le mobilier de qualité et les artisans locaux. Rénover, c'est aussi s'engager pour un habitat plus sain, pérenne et respectueux de l'environnement.",
  },
];

const About: React.FC = () => {
  useRouteMeta();
  return (
    <>
      <PageHeader
        title={
          <>
            <span className="eyebrow mb-6">
              Architecte d'intérieur &amp; décoratrice à Baden — Golfe du Morbihan
            </span>
            L'art de vivre, <span className="italic text-sage-700">simplement.</span>
          </>
        }
        intro="Derrière Maison Mikasa se cache une envie profonde : remettre l'humain et son bien-être au cœur de l'habitat."
      />

      <Section spacing="none" className="pb-20 md:pb-32">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="rounded-arch aspect-[4/5] overflow-hidden bg-sand lg:sticky lg:top-28">
              <Img
                src="photo-profil.webp"
                alt="Laurine Fourcherot - Architecte d'intérieur à Baden, Morbihan"
                sizes="(max-width: 1024px) 100vw, 40vw"
                loading="eager"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="type-title">Moi, c'est Laurine</h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-stone-600 md:text-lg">
              <p className="text-stone-900">
                Badennoise, j'ai fondé Maison Mikasa avec une conviction : votre intérieur doit être
                un refuge qui raconte votre histoire et facilite votre quotidien.
              </p>
              <p>
                J'ai toujours aimé étudier les espaces, j'aime révéler leur potentiel et repenser
                leur agencement pour y créer un véritable cocon. Je vous accompagne aujourd'hui dans
                la rénovation de votre intérieur, afin de valoriser au mieux votre patrimoine.
              </p>
              <p>
                Formée auprès d'expertes reconnues : Maïlys Dorn, fondatrice de l'École HOME dont je
                suis issue, et Catherine Grave, enseignante à l'École Boulle, j'ai acquis les
                compétences techniques et artistiques nécessaires pour vous accompagner de
                l'esquisse au chantier.
              </p>
              <p>
                Mon univers mêle matériaux nobles, textiles enveloppants, formes organiques et
                teintes chaleureuses, avec une sensibilité particulière pour le charme de l'ancien.
                J'aime créer des espaces équilibrés : un juste milieu entre douceur et caractère, où
                le contemporain rencontre l'authentique, et où le confort préserve l'âme des lieux.
              </p>
              <p>
                C'est en comprenant vos habitudes de vie, vos envies et votre manière d'habiter
                l'espace que nous construisons ensemble un projet cohérent et durable. Un intérieur
                qui vous ressemble vraiment.
              </p>
              <p>
                Au-delà de la conception, je coordonne les travaux et gère les contraintes
                techniques. Mon but ? Transformer votre rénovation en une aventure fluide et
                maîtrisée, pour que vous n'ayez qu'à vous projeter dans votre futur chez vous.
              </p>
            </div>
            <p className="mt-10 border-t border-line pt-6 text-sm text-stone-500">
              Basée à Baden, j'interviens dans tout le Morbihan (56).
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <SectionHeading eyebrow="Ce qui guide chaque projet" title="Mes valeurs" />
          <ul className="grid gap-10 md:grid-cols-3 md:gap-12">
            {valuesData.map((value, index) => (
              <li key={value.title} className="border-t border-stone-900/20 pt-6">
                <Reveal delay={index * 120}>
                  <h3 className="text-2xl">{value.title}</h3>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-stone-600">
                    {value.description}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
};

export default About;
