import React from 'react';
import Button from '../ui/Button';
import Container from '../ui/Container';
import Reveal from '../ui/Reveal';

/** Appel à l'action unique de fin de page : carte arrondie centrée, au-dessus du footer. */
const CtaBand: React.FC = () => (
  <section className="bg-canvas py-10 md:py-16" aria-labelledby="cta-band-title">
    <Container>
      <Reveal className="rounded-panel bg-sand px-6 py-14 text-center md:px-16 md:py-20">
        <p className="eyebrow mb-5">Votre projet</p>
        <h2 id="cta-band-title" className="type-title mx-auto max-w-2xl">
          Un intérieur à repenser&nbsp;? <span className="italic text-sage-700">Parlons-en.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-stone-600">
          Premier échange gratuit et sans engagement, par téléphone ou directement chez vous lors
          d'un rendez-vous conseil.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
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
