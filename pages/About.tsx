import React from 'react';
import Section from '../components/ui/Section';
import { Heart, Ruler, Sparkles, MapPin } from 'lucide-react';
import { usePageMeta } from '../lib/usePageMeta';
import { resolveAssetPath } from '../lib/resolveAssetPath';

const valuesData = [
  {
    icon: Heart,
    title: 'Empathie & Écoute',
    description:
      'Chaque projet commence par une rencontre humaine. Je prends le temps de comprendre vos habitudes, vos goûts et vos contraintes pour créer un lieu qui vous correspond vraiment.',
  },
  {
    icon: Ruler,
    title: 'Fonctionnalité',
    description:
      "Le beau n'est rien sans l'utile. J'optimise chaque mètre carré pour fluidifier la circulation, maximiser les rangements et simplifier votre quotidien pour alléger votre charge mentale.",
  },
  {
    icon: Sparkles,
    title: 'Durabilité',
    description:
      "Je privilégie les matériaux naturels, le mobilier de qualité et les artisans locaux. Rénover, c'est aussi s'engager pour un habitat plus sain, pérenne et respectueux de l'environnement.",
  },
];

const About: React.FC = () => {
  usePageMeta(
    'À propos',
    "Laurine Fourcherot, architecte d'intérieur et décoratrice à Baden (56), Golfe du Morbihan."
  );
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <Section
        bgColor="bg-stone-50"
        className="max-w-4xl mx-auto px-6 text-center"
        py="py-24 md:py-32"
      >
        <span className="text-sage-600 uppercase tracking-widest text-xs font-bold mb-6 block">
          À propos
        </span>
        <h1 className="font-serif text-4xl md:text-6xl text-stone-800 mb-8 leading-tight">
          L'art de vivre, <span className="italic text-stone-600">simplement.</span>
        </h1>
        <p className="text-stone-700 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
          Derrière Maison Mikasa se cache une envie profonde : remettre l'humain et son bien-être au
          cœur de l'habitat.
        </p>
      </Section>

      {/* Portrait & Story Section */}
      <Section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <div className="relative order-1 md:order-1">
            <div className="aspect-[3/4] bg-stone-100 rounded-sm overflow-hidden shadow-xl">
              <img
                src={resolveAssetPath('photo-profil.webp')}
                alt="Laurine Fourcherot - Architecte d'intérieur à Baden, Morbihan"
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Decorative box */}
            <div className="absolute -bottom-6 -right-6 w-3/4 h-3/4 border border-sage-200 -z-10 rounded-sm hidden md:block"></div>
          </div>

          {/* Text Column */}
          <div className="order-2 md:order-2 space-y-6 text-stone-700 leading-relaxed font-light">
            <div>
              <h2 className="font-serif text-3xl text-stone-800 mb-2">Moi, c'est Laurine</h2>
              <div className="w-12 h-0.5 bg-sage-400"></div>
            </div>

            <div className="pt-4 space-y-4">
              <p>
                Badennoise, j'ai fondé <strong>Maison Mikasa</strong> avec une conviction : votre
                intérieur doit être un <strong>refuge</strong> qui raconte votre histoire et
                facilite votre quotidien.
              </p>
              <p>
                J'ai toujours aimé étudier les espaces, j'aime révéler leur potentiel et repenser
                leur agencement pour y créer un véritable cocon. Je vous accompagne aujourd'hui dans
                la rénovation de votre intérieur, afin de valoriser au mieux votre patrimoine.
              </p>
              <p>
                Formée auprès d'expertes reconnues : Maïlys Dorn, fondatrice de l'École HOME dont je
                suis issue, et Catherine Grave, enseignante à l'École Boulle, j'ai acquis les
                compétences techniques et artistiques nécessaires pour vous accompagner de
                l'esquisse au chantier.
              </p>
              <p>
                Mon univers mêle matériaux nobles, textiles enveloppants, formes organiques et
                teintes chaleureuses, avec une sensibilité particulière pour le charme de l'ancien.
                J'aime créer des espaces équilibrés : un juste milieu entre douceur et caractère, où
                le contemporain rencontre l'authentique, et où le confort préserve l'âme des lieux.
              </p>
              <p>
                C'est en comprenant vos habitudes de vie, vos envies et votre manière d'habiter
                l'espace que nous construisons ensemble un projet cohérent et durable. Un intérieur
                qui vous ressemble vraiment.
              </p>
              <p>
                Au-delà de la conception, je coordonne les travaux et gère les contraintes
                techniques. Mon but ? Transformer votre rénovation en une aventure fluide et
                maîtrisée, pour que vous n'ayez qu'à vous projeter dans votre futur chez vous.
              </p>
            </div>

            <div className="flex items-center space-x-3 text-sage-700 pt-6 font-medium text-sm bg-stone-50 p-4 rounded-sm border border-stone-100">
              <MapPin className="w-5 h-5 flex-shrink-0" />
              <span>Basée à Baden, j'interviens dans tout le Morbihan (56).</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Philosophy / Values */}
      <Section bgColor="bg-stone-50" className="max-w-7xl mx-auto px-6" py="py-20 md:py-24">
        <div className="mb-16">
          <span className="text-sage-600 uppercase tracking-widest text-xs font-bold mb-4 block">
            Ce qui guide chaque projet
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-stone-800">Mes valeurs</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {valuesData.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-sm shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center group relative overflow-hidden"
              >
                {/* Numéro décoratif en arrière-plan */}
                <span className="absolute top-4 right-4 font-serif text-7xl text-stone-100 leading-none select-none pointer-events-none">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className="w-14 h-14 mx-auto bg-sage-50 rounded-full flex items-center justify-center text-sage-600 mb-6 group-hover:bg-sage-100 transition-colors relative z-10">
                  <Icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl text-stone-800 mb-4 relative z-10">
                  {value.title}
                </h3>
                <p className="text-stone-600 font-light text-sm leading-relaxed relative z-10">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
};

export default About;
