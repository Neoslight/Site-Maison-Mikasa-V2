import React, { useState } from 'react';
import Section from '../ui/Section';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonialsData = [
  {
    id: 1,
    text: 'Toute jeune architecte est déjà très compétente. N’hésite pas à tout faire pour rentrer dans les délais. Elle est d’excellents conseils et à l’écoute de sa clientèle. J’ai pu ouvrir à temps grâce à son travail et les artisans avec lesquels elle travaille. Merci pour le travail effectué au comptoir à pétards.',
    author: 'Thibaud',
    project: 'Rénovation bar/cave à vin, Plumelec (56)',
  },
  {
    id: 2,
    text: "Merci à Laurine pour l'année que nous venons de passer à rénover une petite maison bretonne. Collaboration très efficace, conseils judicieux et surtout merci pour le sourire et la bonne humeur. Résultats largement conformes à nos espérances.",
    author: 'Marie',
    project: 'Rénovation maison, Île d’Arz (56)',
  },
  {
    id: 3,
    text: "J'ai fait appel à Laurine pour le suivi d'un chantier de transformation d'un appartement. Les délais étaient courts et malgré les aléas dûs à des causes extérieures, les travaux ont été menés à bien dans les délais impartis. Très agréable, force de proposition, sérieuse. Je la recommande !",
    author: 'Marie-José',
    project: 'Rénovation appartement, Vannes (56)',
  },
  {
    id: 4,
    text: 'Notre projet était de repenser notre intérieur. Laurine nous a guidé en nous proposant des plans avec plusieurs propositions, ce qui nous a permis de nous projeter, elle a suivi notre chantier et nous sommes ravis du résultat. Merci.',
    author: 'Claire',
    project: 'Rénovation maison, Baden (56)',
  },
  {
    id: 5,
    text: 'Merci à Laurine. Elle a été de très bons conseils pour nous aider à aménager et décorer une mezzanine/chambre d\'amis/bureau. Elle prend en compte toutes nos envies et demandes et peut se charger du projet de A à Z ou juste l\'étape de conception du projet au choix. Elle fournit alors une "liste de courses" et on peut mener à bien notre projet petit à petit selon le temps et le budget dont on dispose. Nous recommandons vivement !',
    author: 'Ulrich',
    project: 'Aménagement maison, Baden (56)',
  },
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  return (
    <Section id="testimonials" className="max-w-5xl mx-auto px-6">
      <div className="flex flex-col items-center text-center">
        <div className="mb-8 text-sage-300">
          <Quote className="w-10 h-10 rotate-180" />
        </div>

        <div className="relative w-full">
          {/* Controls */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-12 p-2 text-stone-400 hover:text-sage-600 transition-colors z-10"
            aria-label="Témoignage précédent"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-12 p-2 text-stone-400 hover:text-sage-600 transition-colors z-10"
            aria-label="Témoignage suivant"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Content */}
          <div className="px-8 md:px-16 min-h-[200px] flex flex-col justify-center transition-opacity duration-500">
            <blockquote className="font-light text-stone-700 italic text-lg md:text-xl leading-relaxed mb-8">
              « {testimonialsData[currentIndex].text} »
            </blockquote>

            <div className="flex flex-col items-center space-y-1">
              <cite className="not-italic text-sm font-bold uppercase tracking-widest text-stone-800">
                {testimonialsData[currentIndex].author}
              </cite>
              <span className="text-xs text-sage-600 uppercase tracking-widest">
                {testimonialsData[currentIndex].project}
              </span>
            </div>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex space-x-2 mt-8">
          {testimonialsData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-sage-600 w-4' : 'bg-stone-300 hover:bg-sage-400'
              }`}
              aria-label={`Aller au témoignage ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Testimonials;
