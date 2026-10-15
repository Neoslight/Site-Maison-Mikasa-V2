import React from 'react';
import { Printer } from 'lucide-react';
import { useRouteMeta } from '../lib/useRouteMeta';
import { EMAIL, EMAIL_HREF, PHONE, PHONE_HREF } from '../lib/site';
import {
  PRO_CHALLENGES,
  PRO_DIAGNOSTIC_PRICE,
  PRO_DOSSIER_PRICE,
  PRO_FAQ,
  PRO_OFFERS,
  PRO_SECTORS,
  PRO_STEPS,
} from '../data/professionals';
import { projectsData } from '../data/projects';
import { testimonialsData } from '../data/testimonials';
import { faqPageSchema, serviceSchema } from '../data/schema';
import JsonLd from '../components/seo/JsonLd';
import ProQuoteForm from '../components/pro/ProQuoteForm';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import OfferRow from '../components/ui/OfferRow';
import PageHeader from '../components/ui/PageHeader';
import ProjectCard from '../components/ui/ProjectCard';
import Reveal from '../components/ui/Reveal';
import Section from '../components/ui/Section';
import SectionHeading from '../components/ui/SectionHeading';

const OFFER_PRICES: Record<string, number> = {
  diagnostic: PRO_DIAGNOSTIC_PRICE,
  dossiers: PRO_DOSSIER_PRICE,
};

const SERVICE_SCHEMAS = PRO_OFFERS.map((offer) =>
  serviceSchema({
    name: `${offer.title} — professionnels`,
    description: offer.description,
    price: OFFER_PRICES[offer.id],
    forBusiness: true,
  })
);

const proProjects = projectsData.filter((p) => p.projectType === 'Professionnel' && !p.hidden);
const proTestimonial = testimonialsData.find((t) => t.id === 1);

const Professionnels: React.FC = () => {
  useRouteMeta();

  return (
    <>
      {SERVICE_SCHEMAS.map((schema, i) => (
        <JsonLd key={i} schema={schema} />
      ))}
      <JsonLd schema={faqPageSchema(PRO_FAQ)} />

      <PageHeader
        eyebrow="Professionnels"
        title="Architecte d'intérieur pour les professionnels dans le Morbihan"
        intro="Restaurant, bar, boutique, hôtel, gîte, institut ou cabinet : je conçois et j'aménage des lieux qui attirent vos clients, facilitent le travail de vos équipes et ouvrent à la date prévue, à Vannes, Auray et dans tout le Golfe du Morbihan."
      >
        <div className="mt-10 flex flex-col gap-3 sm:flex-row print:hidden">
          <Button to="#devis">Demander un devis</Button>
          <Button to="/rendez-vous?type=appel" variant="secondary">
            Appel découverte 20 min
          </Button>
        </div>
        <p className="mt-10 hidden text-sm text-stone-600 print:block">
          Maison Mikasa · Laurine Fourcherot · {PHONE} · {EMAIL} · www.maisonmikasa.fr
        </p>
      </PageHeader>

      {/* Pour qui */}
      <Section tone="surface">
        <Container>
          <SectionHeading
            eyebrow="Pour qui"
            title="Des lieux qui travaillent pour vous"
            lead="Chaque activité a ses usages, ses clients et ses règles. J'accompagne les professionnels de l'accueil, du commerce, du soin et de l'investissement locatif."
          />
          <ul className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {PRO_SECTORS.map((sector, index) => (
              <li
                key={sector.id}
                id={sector.id}
                className="border-t border-stone-900/20 pt-6 print:break-inside-avoid"
              >
                <Reveal delay={(index % 3) * 100}>
                  <h3 className="text-2xl">{sector.label}</h3>
                  <p className="mt-2 text-sm text-sage-700">{sector.examples.join(' · ')}</p>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-stone-600">
                    {sector.challenges}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Enjeux */}
      <Section>
        <Container className="grid gap-10 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-5">
            <h2 className="type-title">Un projet professionnel ne se mène pas comme une maison</h2>
            <p className="mt-5 text-base leading-relaxed text-stone-600">
              Votre local est un outil de travail et une vitrine. Il doit être beau, mais aussi
              conforme, solide et rentable. Ce que je prends en compte dès le premier rendez-vous :
            </p>
          </Reveal>
          <ul className="md:col-span-6 md:col-start-7">
            {PRO_CHALLENGES.map((item, i) => (
              <li
                key={i}
                className="flex gap-5 border-t border-line py-5 text-base leading-relaxed text-stone-700 last:border-b"
              >
                <span className="pt-0.5 text-sm tabular-nums text-sage-700">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Offre */}
      <section className="bg-canvas pb-12 md:pb-20" aria-labelledby="pro-offre">
        <Container>
          <div className="flex flex-col gap-6 pb-12 md:flex-row md:items-end md:justify-between md:pb-16">
            <div className="max-w-2xl">
              <p className="eyebrow mb-4">L'offre professionnels</p>
              <h2 id="pro-offre" className="type-title">
                Des missions à la carte, sur devis
              </h2>
              <p className="mt-5 text-base leading-relaxed text-stone-600 md:text-lg">
                Commencez par un diagnostic, ou confiez-moi le projet de la conception à
                l'ouverture. Les tarifs sont indiqués hors taxes.
              </p>
            </div>
            <Button
              variant="link"
              arrow={false}
              onClick={() => window.print()}
              className="shrink-0 print:hidden"
            >
              <Printer className="h-3.5 w-3.5" aria-hidden="true" />
              Imprimer l'offre / PDF
            </Button>
          </div>
          {PRO_OFFERS.map((offer, index) => (
            <OfferRow key={offer.id} offer={offer} index={index} />
          ))}
        </Container>
      </section>

      {/* Déroulé */}
      <Section tone="surface">
        <Container>
          <SectionHeading eyebrow="Le déroulé" title="De l'appel au jour de l'ouverture" />
          <ol className="grid gap-10 md:grid-cols-5 md:gap-8">
            {PRO_STEPS.map((step, index) => (
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

      {/* Preuve */}
      {proProjects.length > 0 && (
        <Section className="print:hidden">
          <Container className="grid items-center gap-12 md:grid-cols-12 md:gap-8">
            <Reveal className="md:col-span-5">
              <ProjectCard project={proProjects[0]} sizes="(max-width: 768px) 100vw, 40vw" />
            </Reveal>
            <Reveal className="md:col-span-6 md:col-start-7" delay={120}>
              <p className="eyebrow mb-4">Réalisation</p>
              <h2 className="type-title">Ouvrir à temps, dans un lieu qui vous ressemble</h2>
              {proTestimonial && (
                <figure className="mt-8">
                  <blockquote className="font-serif text-xl italic leading-relaxed text-stone-800 md:text-2xl">
                    « {proTestimonial.text} »
                  </blockquote>
                  <figcaption className="mt-5 text-sm text-stone-500">
                    {proTestimonial.author}, {proTestimonial.project}
                  </figcaption>
                </figure>
              )}
              <Button to="/realisations/professionnel" variant="link" className="mt-10">
                Voir les réalisations professionnelles
              </Button>
            </Reveal>
          </Container>
        </Section>
      )}

      {/* FAQ — contenu visible (cohérent avec le JSON-LD FAQPage) */}
      <Section tone="surface">
        <Container>
          <SectionHeading eyebrow="FAQ" title="Vos questions de professionnels" />
          <div>
            {PRO_FAQ.map((item, i) => (
              <div
                key={i}
                className="grid gap-3 border-t border-line py-8 md:grid-cols-12 md:gap-8 md:py-10 print:break-inside-avoid"
              >
                <h3 className="text-xl md:col-span-5">{item.q}</h3>
                <p className="text-base leading-relaxed text-stone-600 md:col-span-6 md:col-start-7">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Devis */}
      <section id="devis" className="bg-canvas py-20 md:py-32 print:hidden">
        <Container className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <aside className="space-y-10 lg:col-span-4">
            <div>
              <p className="eyebrow mb-4">Devis</p>
              <h2 className="type-title">Parlons de votre établissement</h2>
              <p className="mt-5 text-base leading-relaxed text-stone-600">
                Quelques informations suffisent pour préparer notre échange. Je vous réponds sous
                48h ouvrées.
              </p>
            </div>
            <dl className="space-y-6">
              <div className="border-t border-line pt-5">
                <dt className="text-xs uppercase tracking-[0.16em] text-stone-500">Téléphone</dt>
                <dd className="mt-2 text-base text-stone-900">
                  <a href={PHONE_HREF} className="transition-colors hover:text-sage-700">
                    {PHONE}
                  </a>
                </dd>
              </div>
              <div className="border-t border-line pt-5">
                <dt className="text-xs uppercase tracking-[0.16em] text-stone-500">Email</dt>
                <dd className="mt-2 text-base text-stone-900">
                  <a href={EMAIL_HREF} className="transition-colors hover:text-sage-700">
                    {EMAIL}
                  </a>
                </dd>
              </div>
            </dl>
            <div className="rounded-soft bg-sand p-8">
              <h3 className="text-2xl">Prendre rendez-vous</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-stone-600">
                Vous préférez en parler de vive voix ? Réservez un appel découverte de 20 minutes,
                gratuit et sans engagement.
              </p>
              <Button to="/rendez-vous?type=appel" variant="link" className="mt-6">
                Voir les créneaux disponibles
              </Button>
            </div>
          </aside>

          <div className="rounded-soft bg-surface p-8 md:rounded-panel md:p-12 lg:col-span-7 lg:col-start-6">
            <h3 className="type-subtitle">Demande de devis professionnel</h3>
            <ProQuoteForm />
          </div>
        </Container>
      </section>
    </>
  );
};

export default Professionnels;
