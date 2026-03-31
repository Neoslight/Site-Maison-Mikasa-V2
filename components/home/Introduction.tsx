import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Section from '../ui/Section';
import { resolveAssetPath } from '../../lib/resolveAssetPath';

const Introduction: React.FC = () => {
  return (
    <div id="intro">
      <Section py="py-0" className="w-full">
        <div className="relative w-full py-32 md:py-48 overflow-hidden flex items-center justify-center">
          {/* Hero image — no artificial blur */}
          <img
            src={resolveAssetPath('/homepage-photo-accueil.webp')}
            alt="Maison Mikasa - Architecture d'intérieur"
            className="absolute inset-0 w-full h-full object-cover object-center scale-105"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-stone-900/45" />

          {/* Text content — staggered reveal via hero-item CSS animation */}
          <div className="relative z-10 max-w-3xl mx-auto text-center px-6 drop-shadow-2xl space-y-8">
            <h1 className="sr-only">Maison Mikasa - Architecture d'intérieur</h1>

            <h2
              className="hero-item font-serif text-3xl md:text-5xl text-white leading-tight drop-shadow-xl"
              style={{ animationDelay: '0ms' }}
            >
              Maison Mikasa imagine pour vous un{' '}
              <span className="italic text-stone-200">refuge sur-mesure.</span>
            </h2>

            <div
              className="hero-item w-16 h-0.5 bg-sage-300 mx-auto drop-shadow-md"
              style={{ animationDelay: '200ms' }}
            />

            <p
              className="hero-item text-stone-100 leading-relaxed font-light text-lg drop-shadow-lg"
              style={{ animationDelay: '350ms' }}
            >
              Parce qu'un lieu de vie harmonieux améliore considérablement le quotidien.
              <br />
              En alliant l'exigence du fonctionnel à l'élégance de l'esthétique, je conçois des
              espaces durables, pensés pour évoluer avec vous. Découvrons le potentiel de votre
              intérieur&nbsp;!
            </p>

            <div className="hero-item" style={{ animationDelay: '500ms' }}>
              <Link
                to="/realisations"
                className="inline-flex items-center text-sm uppercase tracking-widest text-white border-b border-white/40 pb-0.5 hover:border-white transition-colors duration-300"
              >
                Découvrir les réalisations <ArrowRight className="w-3 h-3 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Introduction;
