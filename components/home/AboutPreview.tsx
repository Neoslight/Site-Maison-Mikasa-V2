import React from 'react';
import { Link } from 'react-router-dom';
import Section from '../ui/Section';

const AboutPreview: React.FC = () => {
  return (
    <Section id="about" bgColor="bg-stone-50" className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="font-serif text-3xl text-stone-800 mb-4">Qui suis-je&nbsp;?</h2>
        <div className="w-12 h-0.5 bg-sage-400 mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="flex justify-center md:justify-end">
          <div className="relative w-full max-w-sm aspect-[3/4] overflow-hidden rounded-sm shadow-md group">
            <img
              src="assets\images\photo-profil.webp"
              alt="Laurine Fourcherot"
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center space-y-6 text-stone-700 font-light leading-relaxed">
          <div>
            <h3 className="font-serif text-2xl text-stone-800 mb-1">Laurine Fourcherot</h3>
            <p className="text-xs uppercase tracking-widest text-sage-600 mb-4">
              Architecte d’intérieur et décoratrice
            </p>
          </div>

          <p>
            Badennoise et fondatrice de <strong>Maison Mikasa</strong>, j’imagine des intérieurs qui
            racontent votre histoire et facilitent votre quotidien. Qu’il s’agisse de sublimer
            l’ancien ou de réchauffer le récent, je coordonne l’intégralité de votre projet pour
            vous offrir une rénovation fluide et maîtrisée, de la première esquisse à la remise des
            clés.
          </p>

          <div className="pt-2">
            <Link
              to="/a-propos"
              className="text-sm border-b border-stone-800 pb-1 hover:text-sage-600 hover:border-sage-600 transition-colors uppercase tracking-widest text-stone-800"
            >
              Lire la suite
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AboutPreview;
