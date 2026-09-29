import React from 'react';
import { useRouteMeta } from '../lib/useRouteMeta';
import { serviceSchema } from '../data/schema';
import JsonLd from '../components/seo/JsonLd';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import PageHeader from '../components/ui/PageHeader';
import Reveal from '../components/ui/Reveal';
import Section from '../components/ui/Section';
import SectionHeading from '../components/ui/SectionHeading';

const SERVICE_SCHEMAS = [
  serviceSchema({
    name: 'Rendez-vous Conseil',
    description:
      'Immersion de 2 heures chez vous pour clarifier votre projet, avec un book de recommandations envoyé sous 48h.',
    price: 320,
  }),
  serviceSchema({
    name: "Aménagement et décoration d'intérieur - Résidence principale",
    description:
      "Conception sur-mesure d'une résidence principale : étude, plans techniques, sourcing et suivi de chantier.",
  }),
  serviceSchema({
    name: "Aménagement et décoration d'intérieur - Résidence secondaire",
    description:
      'Conception et gestion à distance de résidences secondaires et biens locatifs dans le Golfe du Morbihan.',
  }),
  serviceSchema({
    name: 'Dossier de déclaration préalable de travaux',
    description:
      'Constitution du dossier administratif (plans, formulaires Cerfa) pour vos modifications de façade et petites extensions.',
    price: 350,
  }),
];

interface Offer {
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
}

const OFFERS: Offer[] = [
  {
    id: 'conseil',
    title: 'Le Rendez-vous Conseil',
    tagline: "L'étincelle pour débloquer votre projet.",
    description:
      "Profitez d'une immersion de 2 heures chez vous (ou dans votre futur bien) pour clarifier votre projet. Mes recommandations et conseils sont ensuite synthétisés dans un book personnalisé, envoyé sous 48h.",
    missions: [
      {
        label: 'Diagnostic et échange',
        desc: 'Analyse de vos besoins et du potentiel du lieu sur place : volumes, lumière, circulation, regard technique, vos habitudes…',
      },
      {
        label: 'Votre compte-rendu',
        desc: "Envoi sous 48 heures d'un book pour lancer votre projet sereinement : conseils, pistes d'agencement, planche couleurs, matériaux et aménagement.",
      },
    ],
    priceLabel: 'Tarif',
    price: '320 €',
    note: 'Ce montant est intégralement déduit de la prestation si nous poursuivons ensemble sur un projet de conception complète.',
    cta: 'Réserver mon rendez-vous conseil',
  },
  {
    id: 'principale',
    title: 'Résidence principale',
    tagline: 'Un intérieur qui vous ressemble.',
    description:
      "Transformons votre lieu de vie quotidien pour en révéler tout le potentiel. Mon objectif : créer un intérieur qui vous ressemble, faciliter votre routine et optimiser votre confort avec une conception axée sur l'ergonomie, la fluidité des espaces, les rangements intelligents et une ambiance chaleureuse.",
    missionsLabel: 'Missions à la carte, complètes ou partielles',
    missions: [
      {
        label: 'Étude & Esquisse (APS)',
        desc: "Relevé de l'existant, 3 propositions d'aménagement 2D/3D, planches d'ambiance et estimation budgétaire.",
      },
      {
        label: 'Conception (APD)',
        desc: 'Plan définitif, plans techniques (électricité, plomberie) et création de mobilier sur-mesure (cuisine, dressing).',
      },
      {
        label: 'Sourcing',
        desc: 'Choix définitifs des matériaux, couleurs, mobilier et décoration.',
      },
      {
        label: 'Suivi de chantier',
        desc: "Consultation des artisans, coordination et réunions hebdomadaires jusqu'à la réception.",
      },
      {
        label: 'Aménagement final',
        desc: 'Commandes, réception et installation complète (mobilier, luminaires, textiles).',
      },
    ],
    priceLabel: 'Tarif',
    price: 'Sur devis',
    cta: 'Demander un devis',
  },
  {
    id: 'secondaire',
    title: 'Résidence secondaire & investissement locatif',
    tagline: 'Votre refuge en bord de mer, géré en toute sérénité.',
    description:
      "Rénovez et décorez votre bien à distance, sans avoir à toujours vous déplacer. Je conçois pour vous un cocon ressourçant, parfaitement adapté aux exigences d'une maison de vacances (durabilité, accueil, déconnexion) et à vos habitudes. Profitez d'une gestion « clés en main », de la conception à l'installation finale.",
    missionsLabel: 'Missions à la carte, complètes ou partielles',
    missions: [
      {
        label: 'Étude & Esquisse (APS)',
        desc: "Relevé, 3 propositions d'aménagement 2D/3D, planches d'ambiance et estimation budgétaire.",
      },
      {
        label: 'Conception (APD)',
        desc: 'Plans techniques (électricité, plomberie) et mobilier sur-mesure (cuisine, dressing, rangements).',
      },
      {
        label: 'Sourcing',
        desc: 'Sélection définitive des matériaux, couleurs, mobilier et décoration.',
      },
      {
        label: 'Relais local',
        desc: 'Gestion et pilotage des entreprises locales en votre absence.',
      },
      {
        label: 'Suivi de chantier',
        desc: "Consultation des artisans, coordination et réunions hebdomadaires jusqu'à la réception.",
      },
      {
        label: 'Aménagement final',
        desc: 'Commandes, réception et installation complète (mobilier, luminaires, textiles).',
      },
    ],
    priceLabel: 'Tarif',
    price: 'Sur devis',
    cta: 'Discuter de mon projet',
  },
  {
    id: 'mairie',
    title: 'Dossier mairie — Déclaration préalable de travaux',
    tagline: 'Sécuriser vos démarches.',
    description:
      'Je réalise des dossiers administratifs de Déclaration Préalable (DP) pour vos modifications de façade, extensions et vérandas de moins de 20 m², aménagements extérieurs, etc.',
    missions: [
      {
        label: 'Dossier graphique',
        desc: "Création des plans de masse, des façades et des insertions paysagères obligatoires pour l'administration.",
      },
      {
        label: 'Gestion administrative',
        desc: 'Rédaction des formulaires Cerfa et constitution du dossier complet pour dépôt en mairie.',
      },
      {
        label: 'Suivi du dossier',
        desc: "Accompagnement et échanges avec les services instructeurs jusqu'à l'obtention de l'accord.",
      },
    ],
    priceLabel: 'Forfait',
    price: 'Dès 350 €',
    cta: 'Confier mon dossier',
  },
];

const STEPS = [
  { title: 'Ébauche', desc: 'Étude de faisabilité et premières esquisses 3D.' },
  { title: 'Conception', desc: 'Plans techniques détaillés et choix des matériaux.' },
  { title: 'Travaux', desc: 'Coordination rigoureuse des entreprises locales.' },
  { title: 'Finalisation', desc: 'Mise en place de la décoration et livraison.' },
];

const OfferRow: React.FC<{ offer: Offer; index: number }> = ({ offer, index }) => (
  <article
    id={offer.id}
    className="grid gap-10 border-t border-line py-16 md:py-20 lg:grid-cols-12 lg:gap-16"
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

      <Button to={`/contact?service=${offer.id}`} className="mt-8">
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

const Services: React.FC = () => {
  useRouteMeta();

  return (
    <>
      {SERVICE_SCHEMAS.map((schema, i) => (
        <JsonLd key={i} schema={schema} />
      ))}

      <PageHeader
        eyebrow="Prestations"
        title="Mes prestations d'architecte d'intérieur dans le Golfe du Morbihan"
        intro="De l'analyse de potentiel au suivi complet de vos travaux, j'imagine des espaces fluides où l'esthétique se met au service de votre bien-être pour simplifier votre quotidien et valoriser durablement votre patrimoine."
      />

      <section className="bg-canvas pb-12 md:pb-20">
        <Container>
          {OFFERS.map((offer, index) => (
            <OfferRow key={offer.id} offer={offer} index={index} />
          ))}
        </Container>
      </section>

      <Section tone="surface">
        <Container>
          <SectionHeading
            eyebrow="Le déroulement de notre collaboration"
            title="Un accompagnement serein"
          />
          <ol className="grid gap-10 md:grid-cols-4 md:gap-8">
            {STEPS.map((step, index) => (
              <li key={step.title} className="border-t border-stone-900/20 pt-6">
                <Reveal delay={index * 100}>
                  <span className="text-sm tabular-nums text-sage-700">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 text-2xl">{step.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-stone-600">
                    {step.desc}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </Section>
    </>
  );
};

export default Services;
