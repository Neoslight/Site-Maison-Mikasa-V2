import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { testimonialsData } from '../../data/testimonials';
import { GOOGLE_BUSINESS } from '../../lib/site';
import { cn } from '../../lib/utils';
import Container from '../ui/Container';
import Reveal from '../ui/Reveal';
import Section from '../ui/Section';

const navButton =
  'flex h-11 w-11 items-center justify-center rounded-full border border-stone-900/20 text-stone-700 transition-colors duration-300 hover:border-stone-900 hover:text-stone-900';

/**
 * Une citation à la fois. Toutes les citations sont empilées dans la même cellule
 * de grille : la hauteur est celle de la plus longue (aucun saut de mise en page)
 * et tout le texte est présent dans le HTML prérendu.
 */
const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const count = testimonialsData.length;
  const go = (delta: number) => setCurrent((index) => (index + delta + count) % count);

  return (
    <Section id="avis" tone="surface">
      <Container size="medium">
        <Reveal className="text-center">
          <p className="eyebrow mb-10">Ils m'ont fait confiance</p>

          <div className="grid" aria-live="polite">
            {testimonialsData.map((testimonial, index) => (
              <figure
                key={testimonial.id}
                aria-hidden={index !== current}
                className={cn(
                  'col-start-1 row-start-1 flex flex-col justify-center transition-opacity duration-500',
                  index === current ? 'opacity-100' : 'pointer-events-none opacity-0'
                )}
              >
                <blockquote className="font-serif text-xl leading-snug text-stone-900 md:text-[1.75rem]">
                  «&nbsp;{testimonial.text}&nbsp;»
                </blockquote>
                <figcaption className="mt-8 text-sm text-stone-500">
                  <span className="font-medium text-stone-900">{testimonial.author}</span> —{' '}
                  {testimonial.project}
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-12 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => go(-1)}
              className={navButton}
              aria-label="Avis précédent"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <span className="min-w-12 text-sm tabular-nums text-stone-500">
              {current + 1} / {count}
            </span>
            <button
              type="button"
              onClick={() => go(1)}
              className={navButton}
              aria-label="Avis suivant"
            >
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {GOOGLE_BUSINESS.profileUrl && (
            <p className="mt-10 text-sm text-stone-500">
              <a
                href={GOOGLE_BUSINESS.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 transition-colors hover:text-stone-900"
              >
                {GOOGLE_BUSINESS.rating && GOOGLE_BUSINESS.reviewCount
                  ? `Noté ${String(GOOGLE_BUSINESS.rating).replace('.', ',')}/5 sur Google · ${GOOGLE_BUSINESS.reviewCount} avis`
                  : 'Voir tous les avis sur Google'}
              </a>
            </p>
          )}
        </Reveal>
      </Container>
    </Section>
  );
};

export default Testimonials;
