import React from 'react';
import Button from './Button';
import Reveal from './Reveal';

export interface Offer {
  /** Ancre utilisée par les liens de l'accueil (/prestations#…) et le paramètre ?service= du contact. */
  id: string;
  title: string;
  tagline: string;
  description: string;
  missionsLabel?: string;
  missions: { label: string; desc: string }[];
  priceLabel: string;
  price: string;
  note?: string;
  cta: string;
  /** Cible du bouton. Par défaut : le formulaire de contact pré-rempli (/contact?service=…). */
  ctaTo?: string;
}

/** Ligne d'offre : titre, tarif et bouton à gauche, description et missions à droite. */
const OfferRow: React.FC<{ offer: Offer; index: number }> = ({ offer, index }) => (
  <article
    id={offer.id}
    className="grid gap-10 border-t border-line py-16 md:py-20 lg:grid-cols-12 lg:gap-16 print:break-inside-avoid print:py-8"
  >
    <Reveal className="lg:col-span-5">
      <span className="text-sm tabular-nums text-stone-400">
        {String(index + 1).padStart(2, '0')}
      </span>
      <h2 className="type-title mt-4">{offer.title}</h2>
      <p className="mt-4 font-serif text-lg italic text-sage-700">{offer.tagline}</p>

      <dl className="mt-10 flex items-baseline justify-between border-y border-line py-5">
        <dt className="text-xs uppercase tracking-[0.16em] text-stone-500">{offer.priceLabel}</dt>
        <dd className="font-serif text-2xl text-stone-900">{offer.price}</dd>
      </dl>
      {offer.note && <p className="mt-4 text-sm leading-relaxed text-stone-500">{offer.note}</p>}

      <Button to={offer.ctaTo ?? `/contact?service=${offer.id}`} className="mt-8 print:hidden">
        {offer.cta}
      </Button>
    </Reveal>

    <Reveal className="lg:col-span-6 lg:col-start-7" delay={120}>
      <p className="text-base leading-relaxed text-stone-600 md:text-lg">{offer.description}</p>
      {offer.missionsLabel && <p className="eyebrow mt-10 text-stone-500">{offer.missionsLabel}</p>}
      <ul className={offer.missionsLabel ? 'mt-4' : 'mt-10'}>
        {offer.missions.map((mission) => (
          <li key={mission.label} className="border-t border-line py-5 first:border-t-0 md:py-6">
            <h3 className="font-sans text-base font-medium text-stone-900">{mission.label}</h3>
            <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-stone-600">{mission.desc}</p>
          </li>
        ))}
      </ul>
    </Reveal>
  </article>
);

export default OfferRow;
