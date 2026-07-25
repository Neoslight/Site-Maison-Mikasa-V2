import React, { useState } from 'react';
import Section from '../ui/Section';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonialsData } from '../../data/testimonials';

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

      {/* Desktop : carousel 3 cartes visibles */}
      <div className="hidden md:block">
        <div className="relative">
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-8 p-2 text-stone-400 hover:text-sage-600 transition-colors z-10"
            aria-label="Témoignage précédent"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-8 p-2 text-stone-400 hover:text-sage-600 transition-colors z-10"
            aria-label="Témoignage suivant"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="grid grid-cols-3 gap-8">
            {[0, 1, 2].map((offset) => {
              const t = testimonialsData[(currentIndex + offset) % testimonialsData.length];
              return (
                <div
                  key={`${currentIndex}-${offset}`}
                  className="bg-stone-50 p-8 rounded-sm border border-gray-100 flex flex-col animate-testimonial-enter"
                >
                  <Quote className="w-6 h-6 text-sage-300 mb-4 rotate-180 flex-shrink-0" />
                  <blockquote className="font-light text-stone-700 italic text-sm leading-relaxed flex-grow mb-6">
                    « {t.text} »
                  </blockquote>
                  <div className="border-t border-gray-100 pt-4">
                    <cite className="not-italic text-xs font-bold uppercase tracking-widest text-stone-800 block">
                      {t.author}
                    </cite>
                    <span className="text-xs text-sage-600 uppercase tracking-widest">
                      {t.project}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center space-x-2 mt-8">
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

      {/* Mobile : carousel */}
      <div className="md:hidden flex flex-col items-center text-center">
        <div className="relative w-full">
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
