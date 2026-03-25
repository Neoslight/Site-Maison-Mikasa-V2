import React from 'react';
import { Link } from 'react-router-dom';
import Section from '../ui/Section';

const AboutPreview: React.FC = () => {
  return (
    <Section id="about" bgColor="bg-stone-50" className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="font-serif text-3xl text-stone-800 mb-4">Qui je suis ?</h2>
        <div className="w-12 h-0.5 bg-sage-400 mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        {/* Image */}
        <div className="md:col-span-5 lg:col-span-4">
          <div className="relative aspect-[3/4] overflow-hidden rounded-sm shadow-md group">
            <img
              src="https://picsum.photos/id/64/600/800"
              alt="Laurine Fourcherot"
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Text */}
        <div className="md:col-span-7 lg:col-span-8 space-y-6 text-stone-700 font-light leading-relaxed">
          <div>
            <h3 className="font-serif text-2xl text-stone-800 mb-1">Laurine Fourcherot</h3>
            <p className="text-xs uppercase tracking-widest text-sage-600 mb-4">
              Architecte d'intérieur et décoratrice
            </p>
          </div>

          <div className="space-y-4">
            <p>
              Badennoise depuis toujours, j’ai fondé <strong>Maison Mikasa</strong> avec une
              conviction simple : votre intérieur ne doit pas seulement être joli, il doit être
              votre refuge. Passionnée par l'architecture et la rénovation depuis l'enfance, j'aime
              déceler le potentiel caché de chaque espace. Qu'il s'agisse de sublimer une bâtisse
              ancienne ou de redonner une âme à un intérieur trop froid, mon but est de créer un
              lieu qui raconte votre histoire, en alliant esthétisme et fonctionnalité.
            </p>
            <p>
              Repenser son intérieur est une belle aventure, mais la coordination des travaux
              demande du temps et de l'énergie. Je suis là pour absorber toute cette complexité
              technique. De l'optimisation des volumes au choix des matériaux nobles, je gère votre
              projet de A à Z pour que vous n'ayez qu'à vous concentrer sur l'essentiel : vous
              projeter sereinement dans votre futur cocon.
            </p>
          </div>

          <div className="pt-6">
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
