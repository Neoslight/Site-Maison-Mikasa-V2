import { GOOGLE_BUSINESS } from '../lib/site';
import { testimonialsData } from './testimonials';

export const SITE_URL = 'https://www.maisonmikasa.fr';
export const BUSINESS_ID = `${SITE_URL}/#business`;

/** Reference to the single LocalBusiness entity defined on the homepage (pages/Home.tsx). */
export const BUSINESS_REF = { '@id': BUSINESS_ID };

export const AREA_SERVED = [
  { '@type': 'City', name: 'Baden' },
  { '@type': 'City', name: 'Vannes' },
  { '@type': 'City', name: 'Auray' },
  { '@type': 'City', name: 'Arradon' },
  { '@type': 'City', name: 'Larmor-Baden' },
  { '@type': 'City', name: 'Île-aux-Moines' },
  { '@type': 'City', name: "Île-d'Arz" },
  { '@type': 'City', name: 'Saint-Armel' },
  { '@type': 'City', name: 'Sarzeau' },
  { '@type': 'City', name: 'Séné' },
  { '@type': 'City', name: 'Theix-Noyalo' },
  { '@type': 'City', name: 'Ploeren' },
  { '@type': 'City', name: 'Le Bono' },
  { '@type': 'City', name: 'Saint-Avé' },
  { '@type': 'City', name: 'Locmariaquer' },
  { '@type': 'City', name: 'Plumelec' },
  { '@type': 'Place', name: 'Golfe du Morbihan' },
  { '@type': 'AdministrativeArea', name: 'Morbihan' },
  { '@type': 'AdministrativeArea', name: 'Bretagne' },
];

export const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  '@id': BUSINESS_ID,
  name: 'Maison Mikasa',
  description:
    "Architecture d'intérieur et décoration sur-mesure en Bretagne et Golfe du Morbihan. Laurine Fourcherot, architecte d'intérieur à Baden (56).",
  url: SITE_URL,
  telephone: '+33689408566',
  email: 'maisonmikasa@gmail.com',
  priceRange: '€€€',
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
  areaServed: AREA_SERVED,
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
  founder: {
    '@type': 'Person',
    name: 'Laurine Fourcherot',
    jobTitle: "Architecte d'intérieur",
  },
  image: `${SITE_URL}/og/home.jpg`,
  logo: `${SITE_URL}/favicon.svg`,
  ...(GOOGLE_BUSINESS.profileUrl ? { hasMap: GOOGLE_BUSINESS.profileUrl } : {}),
  sameAs: [
    'https://www.facebook.com/maisonmikasa/',
    'https://www.instagram.com/maisonmikasa/',
    'https://www.linkedin.com/in/laurine-fourcherot/',
    ...(GOOGLE_BUSINESS.profileUrl ? [GOOGLE_BUSINESS.profileUrl] : []),
  ],
  // Sourced from real reviews on the Google Business Profile (data/testimonials.ts).
  // No reviewRating: individual star ratings aren't tracked in the source content,
  // and fabricating one would misrepresent the review.
  review: testimonialsData.map((t) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: t.author },
    reviewBody: t.text,
  })),
};

export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Maison Mikasa',
  url: SITE_URL,
  inLanguage: 'fr-FR',
  publisher: BUSINESS_REF,
};

interface ServiceSchemaInput {
  name: string;
  description: string;
  price?: number;
}

export function serviceSchema({ name, description, price }: ServiceSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: name,
    name,
    description,
    provider: BUSINESS_REF,
    areaServed: { '@type': 'Place', name: 'Golfe du Morbihan' },
    ...(price
      ? {
          offers: {
            '@type': 'Offer',
            price,
            priceCurrency: 'EUR',
          },
        }
      : {}),
  };
}

interface FaqSchemaInput {
  q: string;
  a: string;
}

export function faqPageSchema(faq: FaqSchemaInput[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}
