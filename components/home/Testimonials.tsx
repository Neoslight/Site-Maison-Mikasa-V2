import React, { useState } from 'react';
import Section from '../ui/Section';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonialsData = [
  {
    id: 1,
    text: 'Toute jeune architecte est déjà très compétente. N\u2019hésite pas à tout faire pour rentrer dans les délais. Elle est d\u2019excellents conseils et à l\u2019écoute de sa clientèle. J\u2019ai pu ouvrir à temps grâce à son travail et les artisans avec lesquels elle travaille. Merci pour le travail effectué au comptoir à pétards.',
    author: 'Thibaud',
    project: 'Rénovation bar/cave à vin, Plumelec (56)',
  },
  {
    id: 2,
    text: 'Merci à Laurine pour l\u2019année que nous venons de passer à rénover une petite maison bretonne. Collaboration très efficace, conseils judicieux et surtout merci pour le sourire et la bonne humeur. Résultats largement conformes à nos espérances.',
    author: 'Marie',
    project: 'Rénovation maison, Île d\u2019Arz (56)',
  },
  {
    id: 3,
    text: 'J\u2019ai fait appel à Laurine pour le suivi d\u2019un chantier de transformation d\u2019un appartement. Les délais étaient courts et malgré les aléas dûs à des causes extérieures, les travaux ont été menés à bien dans les délais impartis. Très agréable, force de proposition, sérieuse. Je la recommande !',
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
    text: 'Merci à Laurine. Elle a été de très bons conseils pour nous aider à aménager et décorer une mezzanine/chambre d\u2019amis/bureau. Elle prend en compte toutes nos envies et demandes et peut se charger du projet de A à Z ou juste l\u2019étape de conception du projet au choix. Elle fournit alors une "liste de courses" et on peut mener à bien notre projet petit à petit selon le temps et le budget dont on dispose. Nous recommandons vivement !',
    author: 'Ulrich',
    project: 'Aménagement maison, Baden (56)',
  },
  {
    id: 6,
    text: 'Nous avons fait appel à Laurine pour notre projet d\u2019aménagement d\u2019une extension, existante mais à l\u2019état brut. Laurine est très à l\u2019écoute des souhaits et contraintes. Elle nous a soumis plusieurs plans possibles, ce qui nous permet de nous projeter et de démarcher auprès d\u2019entrepreneurs. Ravis de son intervention, elle est souriante et efficace, nous recommandons !',
    author: 'Dorothée et Benjamin',
    project: 'Aménagement d\u2019extension, Saint Donan (56)',
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
    <Section id="testimonials" className="max-w-7xl mx-auto px-6">
      {/* En-tête de section */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="mb-6 text-sage-300">
          <Quote className="w-10 h-10 rotate-180" />
        </div>
        <h2 className="font-serif text-3xl text-stone-800 mb-4">Ce qu'ils disent</h2>
        <div className="w-12 h-0.5 bg-sage-400 mx-auto"></div>
      </div>

      {/* Desktop : 3 cartes côte à côte */}
      <div className="hidden md:grid md:grid-cols-3 gap-8">
        {testimonialsData.slice(0, 3).map((t) => (
          <div
            key={t.id}
            className="bg-stone-50 p-8 rounded-sm border border-gray-100 flex flex-col"
          >
            <Quote className="w-6 h-6 text-sage-300 mb-4 rotate-180 flex-shrink-0" />
            <blockquote className="font-light text-stone-700 italic text-sm leading-relaxed flex-grow mb-6">
              « {t.text} »
            </blockquote>
            <div className="border-t border-gray-100 pt-4">
              <cite className="not-italic text-xs font-bold uppercase tracking-widest text-stone-800 block">
                {t.author}
              </cite>
              <span className="text-xs text-sage-600 uppercase tracking-widest">{t.project}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile : carousel (logique inchangée) */}
      <div className="md:hidden flex flex-col items-center text-center">
        <div className="relative w-full">
          {/* Contrôles */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 p-2 text-stone-400 hover:text-sage-600 transition-colors z-10"
            aria-label="Témoignage précédent"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 p-2 text-stone-400 hover:text-sage-600 transition-colors z-10"
            aria-label="Témoignage suivant"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Contenu — key pour déclencher l'animation à chaque changement */}
          <div
            key={currentIndex}
            className="px-8 min-h-[200px] flex flex-col justify-center animate-testimonial-enter"
          >
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

        {/* Indicateurs */}
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
