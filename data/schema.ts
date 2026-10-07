import { GOOGLE_BUSINESS } from '../lib/site';
import { locationsData } from './locations';
import { projectsData } from './projects';

export const SITE_URL = 'https://www.maisonmikasa.fr';
export const BUSINESS_ID = `${SITE_URL}/#business`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const PERSON_ID = `${SITE_URL}/a-propos#laurine`;

/** References to the entities of the site graph, emitted on every page by Layout (siteGraph). */
export const BUSINESS_REF = { '@id': BUSINESS_ID };
export const PERSON_REF = { '@id': PERSON_ID };

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

const BUSINESS_NODE = {
  '@type': 'HomeAndConstructionBusiness',
  '@id': BUSINESS_ID,
  name: 'Maison Mikasa',
  description:
    "Architecture d'intérieur et décoration sur-mesure en Bretagne et Golfe du Morbihan. Laurine Fourcherot, architecte d'intérieur à Baden (56).",
  url: `${SITE_URL}/`,
  telephone: '+33689408566',
  email: 'maisonmikasa@gmail.com',
  priceRange: '€€€',
  identifier: { '@type': 'PropertyValue', propertyID: 'SIREN', value: '883320194' },
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
  founder: PERSON_REF,
  image: `${SITE_URL}/og/home.jpg`,
  logo: `${SITE_URL}/favicon.svg`,
  ...(GOOGLE_BUSINESS.profileUrl ? { hasMap: GOOGLE_BUSINESS.profileUrl } : {}),
  sameAs: [
    'https://www.facebook.com/maisonmikasa/',
    'https://www.instagram.com/maisonmikasa/',
    'https://www.linkedin.com/in/laurine-fourcherot/',
    ...(GOOGLE_BUSINESS.profileUrl ? [GOOGLE_BUSINESS.profileUrl] : []),
  ],
  // No `review` / `aggregateRating`: the testimonials come from the Google Business
  // Profile, and Google ignores self-serving LocalBusiness reviews (and flags several
  // reviews without aggregateRating as invalid). The profile is linked via hasMap/sameAs.
};

const WEBSITE_NODE = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: 'Maison Mikasa',
  url: `${SITE_URL}/`,
  inLanguage: 'fr-FR',
  publisher: BUSINESS_REF,
};

const PERSON_NODE = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Laurine Fourcherot',
  jobTitle: "Architecte d'intérieur",
  url: `${SITE_URL}/a-propos`,
  worksFor: BUSINESS_REF,
  sameAs: ['https://www.linkedin.com/in/laurine-fourcherot/'],
};

/** Breadcrumb labels for the static routes; project and location pages are resolved from data. */
const STATIC_CRUMBS: Record<string, { name: string; path: string }[]> = {
  '/a-propos': [{ name: 'À propos', path: '/a-propos' }],
  '/prestations': [{ name: 'Prestations', path: '/prestations' }],
  '/realisations': [{ name: 'Réalisations', path: '/realisations' }],
  '/realisations/maison': [
    { name: 'Réalisations', path: '/realisations' },
    { name: 'Maisons', path: '/realisations/maison' },
  ],
  '/realisations/appartement': [
    { name: 'Réalisations', path: '/realisations' },
    { name: 'Appartements', path: '/realisations/appartement' },
  ],
  '/realisations/professionnel': [
    { name: 'Réalisations', path: '/realisations' },
    { name: 'Professionnels', path: '/realisations/professionnel' },
  ],
  '/contact': [{ name: 'Contact', path: '/contact' }],
  '/rendez-vous': [{ name: 'Rendez-vous', path: '/rendez-vous' }],
  '/mentions-legales': [{ name: 'Mentions légales', path: '/mentions-legales' }],
};

function crumbsForPath(path: string): { name: string; path: string }[] | null {
  if (STATIC_CRUMBS[path]) return STATIC_CRUMBS[path];
  const project = projectsData.find((p) => !p.hidden && `/realisations/${p.id}` === path);
  if (project) {
    return [
      { name: 'Réalisations', path: '/realisations' },
      { name: project.title, path },
    ];
  }
  const location = locationsData.find((l) => l.path === path);
  if (location) return [{ name: location.h1, path }];
  return null;
}

/**
 * JSON-LD graph emitted once per page by Layout: WebSite, the business, Laurine and,
 * for known routes, the breadcrumb. Every `@id` referenced by page-level blocks
 * (Service providers, project authors) resolves within the same document.
 */
export function siteGraph(pathname: string) {
  const path = pathname.replace(/\/+$/, '') || '/';
  const crumbs = path === '/' ? null : crumbsForPath(path);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      WEBSITE_NODE,
      BUSINESS_NODE,
      PERSON_NODE,
      ...(crumbs
        ? [
            {
              '@type': 'BreadcrumbList',
              itemListElement: [{ name: 'Accueil', path: '/' }, ...crumbs].map((c, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: c.name,
                item: `${SITE_URL}${c.path}`,
              })),
            },
          ]
        : []),
    ],
  };
}

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
