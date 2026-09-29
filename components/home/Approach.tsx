import React from 'react';
import Button from '../ui/Button';
import Container from '../ui/Container';
import Img from '../ui/Img';
import Reveal from '../ui/Reveal';
import Section from '../ui/Section';

const pillars = [
  {
    title: 'Un quotidien amélioré',
    text: 'Un intérieur pensé pour vous simplifier la vie et servir vos habitudes : volumes optimisés, circulation fluide, rangements à leur place.',
  },
  {
    title: 'Un investissement durable',
    text: 'Des matériaux de qualité et des choix intemporels, qui valorisent votre bien et traversent les années sans se démoder.',
  },
  {
    title: 'Un chantier serein',
    text: "Je coordonne les artisans, le planning et le budget, de la première esquisse à la remise des clés. Vous vivez vos travaux l'esprit tranquille.",
  },
];

/** Présentation de Laurine et des trois engagements du studio. */
const Approach: React.FC = () => (
  <Section id="approche" tone="surface">
    <Container>
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="aspect-[4/5] overflow-hidden bg-sand">
            <Img
              src="photo-profil.webp"
              alt="Laurine Fourcherot, architecte d'intérieur à Baden"
              sizes="(max-width: 1024px) 100vw, 40vw"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>

        <Reveal className="lg:col-span-6 lg:col-start-7">
          <p className="eyebrow mb-5">L'approche</p>
          <h2 className="type-title">Des intérieurs qui racontent votre histoire</h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-stone-600 md:text-lg">
            <p>
              Badennoise et fondatrice de Maison Mikasa, j'imagine des intérieurs qui facilitent
              votre quotidien. Qu'il s'agisse de sublimer l'ancien ou de réchauffer le récent, je
              coordonne l'intégralité de votre projet pour une rénovation fluide et maîtrisée.
            </p>
          </div>
          <p className="mt-8 font-serif text-lg italic text-stone-900">
            Laurine Fourcherot, architecte d'intérieur et décoratrice
          </p>
          <Button to="/a-propos" variant="link" className="mt-8">
            Mon parcours
          </Button>
        </Reveal>
      </div>

      <ul className="mt-20 grid gap-10 border-t border-line pt-12 md:mt-28 md:grid-cols-3 md:gap-12">
        {pillars.map((pillar, index) => (
          <li key={pillar.title}>
            <Reveal delay={index * 120}>
              <h3 className="text-xl md:text-2xl">{pillar.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-stone-600 md:text-base">
                {pillar.text}
              </p>
            </Reveal>
          </li>
        ))}
      </ul>
    </Container>
  </Section>
);

export default Approach;
