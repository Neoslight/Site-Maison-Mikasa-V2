import React from 'react';
import Introduction from '../components/home/Introduction';
import AboutPreview from '../components/home/AboutPreview';
import FeaturedProjects from '../components/home/FeaturedProjects';
import ServicesPreview from '../components/home/ServicesPreview';
import Testimonials from '../components/home/Testimonials';
import { usePageMeta } from '../lib/usePageMeta';
import JsonLd from '../components/seo/JsonLd';

const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: 'Maison Mikasa',
  description:
    "Architecture d'intérieur et décoration sur-mesure en Bretagne et Golfe du Morbihan. Laurine Fourcherot, architecte d'intérieur à Baden (56).",
  url: 'https://www.maisonmikasa.fr',
  telephone: '+33689408566',
  email: 'maisonmikasa@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Baden',
    postalCode: '56870',
    addressRegion: 'Morbihan',
    addressCountry: 'FR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 47.6102,
    longitude: -2.9064,
  },
  areaServed: [
    { '@type': 'City', name: 'Baden' },
    { '@type': 'City', name: 'Vannes' },
    { '@type': 'City', name: 'Île-aux-Moines' },
    { '@type': 'City', name: 'Larmor-Baden' },
    { '@type': 'City', name: 'Saint-Armel' },
    { '@type': 'AdministrativeArea', name: 'Morbihan' },
    { '@type': 'AdministrativeArea', name: 'Bretagne' },
  ],
  founder: {
    '@type': 'Person',
    name: 'Laurine Fourcherot',
    jobTitle: "Architecte d'intérieur",
  },
  image: 'https://www.maisonmikasa.fr/homepage-photo-accueil.webp',
  sameAs: [
    'https://www.facebook.com/maisonmikasa/',
    'https://www.instagram.com/maisonmikasa/',
    'https://www.linkedin.com/in/laurine-fourcherot/',
  ],
};

const Home: React.FC = () => {
  usePageMeta(
    "Architecte d'intérieur à Baden, Morbihan",
    "Laurine Fourcherot, architecte d'intérieur à Baden (56). Projets sur-mesure dans le Golfe du Morbihan : Vannes, Île-aux-Moines, Saint-Armel. Prenez rendez-vous.",
    {
      ogUrl: 'https://www.maisonmikasa.fr/',
      ogImage: 'https://www.maisonmikasa.fr/homepage-photo-accueil.webp',
      canonical: 'https://www.maisonmikasa.fr/',
    }
  );

  return (
    <>
      <JsonLd schema={LOCAL_BUSINESS_SCHEMA} />
      <Introduction />
      <AboutPreview />
      <FeaturedProjects />
      <ServicesPreview />
      <Testimonials />
    </>
  );
};

export default Home;
