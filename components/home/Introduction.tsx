import React from 'react';
import Section from '../ui/Section';
import { resolveAssetPath } from '../../lib/resolveAssetPath';

const Introduction: React.FC = () => {
  return (
    <div id="intro">
      {/* Top Image with Text Overlay - Full Width */}
      <Section py="py-0" className="w-full">
        <div className="relative w-full py-24 md:py-32 overflow-hidden flex items-center justify-center">
          <img
            src={resolveAssetPath('/homepage-photo-accueil.webp')}
            alt="Maison Mikasa - Architecture d'intérieur"
            className="absolute inset-0 w-full h-full object-cover object-center blur-[2px] scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-stone-900/40"></div>

          {/* Text Content */}
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8 px-6 drop-shadow-2xl">
            <h1 className="sr-only">Maison Mikasa - Architecture d'intérieur</h1>
            <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight drop-shadow-xl">
              Maison Mikasa imagine pour vous un{' '}
              <span className="italic text-stone-200">refuge sur-mesure.</span>
            </h2>
            <div className="w-16 h-0.5 bg-sage-300 mx-auto drop-shadow-md"></div>
            <div className="text-stone-50 leading-relaxed font-light space-y-6 text-lg drop-shadow-lg">
              <p>
                Parce qu'un lieu de vie harmonieux améliore considérablement le quotidien, Maison
                Mikasa imagine pour vous un refuge sur-mesure.
              </p>
              <p>
                En alliant l'exigence du fonctionnel à l'élégance de l’esthétique, je conçois des
                espaces durables, pensés pour évoluer avec vous. Découvrez le potentiel de votre
                intérieur.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Introduction;
