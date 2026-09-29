import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import Container from '../ui/Container';
import Reveal from '../ui/Reveal';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';

const services = [
  {
    anchor: 'conseil',
    title: 'Rendez-vous Conseil',
    text: '2 heures chez vous pour clarifier votre vision et repartir avec des pistes concrètes.',
    price: '320 €',
  },
  {
    anchor: 'principale',
    title: 'Résidence principale',
    text: 'Conception sur-mesure et suivi de chantier, de A à Z.',
    price: 'Sur devis',
  },
  {
    anchor: 'secondaire',
    title: 'Résidence secondaire & locatif',
    text: 'Un projet mené pour vous, même à distance.',
    price: 'Sur devis',
  },
  {
    anchor: 'mairie',
    title: 'Dossier mairie',
    text: 'Déclaration préalable de travaux, plans et insertion.',
    price: 'Dès 350 €',
  },
];

const ServicesList: React.FC = () => (
  <Section id="prestations">
    <Container>
      <Reveal>
        <SectionHeading
          eyebrow="Prestations"
          title="Un accompagnement à la mesure de votre projet"
          align="center"
          action={
            <Button to="/prestations" variant="link">
              Détail des prestations
            </Button>
          }
        />
      </Reveal>

      <ol className="border-t border-line">
        {services.map((service, index) => (
          <li key={service.anchor} className="border-b border-line">
            <Link
              to={`/prestations#${service.anchor}`}
              className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 gap-y-2 py-8 md:grid-cols-12 md:gap-x-8 md:py-10"
            >
              <span className="text-sm tabular-nums text-stone-400 md:col-span-1">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="type-subtitle transition-colors duration-300 group-hover:text-sage-700 md:col-span-4">
                {service.title}
              </h3>
              <ArrowRight
                className="h-5 w-5 self-center text-stone-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-stone-900 md:order-last md:col-span-1 md:justify-self-end"
                aria-hidden="true"
              />
              <p className="col-span-2 col-start-2 text-base leading-relaxed text-stone-600 md:col-span-4 md:col-start-auto">
                {service.text}
              </p>
              <span className="col-start-2 text-sm text-stone-500 md:col-span-2 md:col-start-auto md:text-right">
                {service.price}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </Container>
  </Section>
);

export default ServicesList;
