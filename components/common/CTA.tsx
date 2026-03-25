import React from 'react';
import { Link } from 'react-router-dom';
import Section from '../ui/Section';

const CTA: React.FC = () => {
  return (
    <Section id="cta" className="max-w-7xl mx-auto px-6 border-t border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center">
        <div className="space-y-4">
          <h3 className="font-serif text-2xl text-stone-800">À propos</h3>
          <p className="text-sm text-stone-700 font-light">
            Découvrez qui je suis, l’histoire de Maison Mikasa, et ma mission.
          </p>
          <Link
            to="/a-propos"
            className="inline-block text-xs uppercase tracking-widest text-stone-600 hover:text-sage-600 mt-4 py-3 px-8 border border-stone-200 hover:border-sage-200 transition-all duration-300 rounded-sm hover:-translate-y-1 hover:shadow-lg active:translate-y-0 active:shadow-sm"
          >
            En savoir plus
          </Link>
        </div>

        <div className="space-y-4">
          <h3 className="font-serif text-2xl text-stone-800">Les projets</h3>
          <p className="text-sm text-stone-700 font-light">
            Découvrez les projets de Maison Mikasa.
          </p>
          <Link
            to="/realisations"
            className="inline-block text-xs uppercase tracking-widest text-white bg-sage-600 hover:bg-sage-700 mt-4 py-3 px-8 border border-transparent transition-all duration-300 rounded-sm hover:-translate-y-1 hover:shadow-lg active:translate-y-0 active:shadow-sm"
          >
            Je découvre
          </Link>
        </div>
      </div>
    </Section>
  );
};

export default CTA;
