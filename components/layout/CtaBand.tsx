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
          Un premier appel découverte de 20 minutes, gratuit et sans engagement. Pour aller plus
          loin, le rendez-vous conseil se tient chez vous (2 h, 320 €, déduits si vous nous confiez
          ensuite la conception complète).
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
