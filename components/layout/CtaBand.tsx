import React from 'react';
import Button from '../ui/Button';
import Container from '../ui/Container';
import Reveal from '../ui/Reveal';

/** Appel à l'action unique de fin de page, affiché au-dessus du footer. */
const CtaBand: React.FC = () => (
  <section className="bg-sand py-20 md:py-28" aria-labelledby="cta-band-title">
    <Container>
      <Reveal className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-5">Votre projet</p>
          <h2 id="cta-band-title" className="type-title">
            Un intérieur à repenser&nbsp;? <span className="italic text-sage-700">Parlons-en.</span>
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-stone-600">
            Premier échange gratuit et sans engagement, par téléphone ou directement chez vous lors
            d'un rendez-vous conseil.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
          <Button to="/rendez-vous">Prendre rendez-vous</Button>
          <Button to="/contact" variant="secondary">
            Écrire un message
          </Button>
        </div>
      </Reveal>
    </Container>
  </section>
);

export default CtaBand;
