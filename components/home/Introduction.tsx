import React from 'react';
import Button from '../ui/Button';
import Container from '../ui/Container';
import Img from '../ui/Img';

/** Hero éditorial : titre sur fond crème, puis grande photo panoramique. */
const Introduction: React.FC = () => (
  <section id="intro" className="bg-canvas">
    <Container className="grid gap-8 pb-12 pt-10 md:pb-16 md:pt-20 lg:grid-cols-12 lg:items-end lg:gap-12">
      <h1 className="lg:col-span-8">
        <span className="eyebrow mb-6">
          Architecte d'intérieur — Vannes, Baden &amp; Golfe du Morbihan
        </span>
        <span className="type-display block">
          Maison Mikasa imagine pour vous un{' '}
          <span className="italic text-sage-700">refuge sur-mesure.</span>
        </span>
      </h1>

      <div className="lg:col-span-4 lg:pb-2">
        <p className="text-base leading-relaxed text-stone-600">
          Parce qu'un lieu de vie harmonieux améliore considérablement le quotidien. En alliant
          l'exigence du fonctionnel à l'élégance de l'esthétique, je conçois des espaces durables,
          pensés pour évoluer avec vous.
        </p>
        <Button to="/realisations" className="mt-8">
          Découvrir les réalisations
        </Button>
      </div>
    </Container>

    <div className="mx-auto max-w-[1600px] md:px-10">
      <div className="aspect-[4/3] overflow-hidden bg-sand md:aspect-[21/9]">
        <Img
          src="/homepage-photo-accueil.webp"
          alt="Maison Mikasa - Architecture d'intérieur"
          sizes="(max-width: 1600px) 100vw, 1600px"
          loading="eager"
          fetchPriority="high"
          className="h-full w-full object-cover object-center"
        />
      </div>
    </div>
  </section>
);

export default Introduction;
