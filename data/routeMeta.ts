import { projectsData } from './projects';
import { locationsData } from './locations';

export const SITE_URL = 'https://www.maisonmikasa.fr';
// Stable, unhashed filenames written by scripts/generate-og-images.ts — safe to
// reference by static path since they're regenerated fresh on every build.
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og/home.jpg`;

export interface RouteMeta {
  title: string;
  description: string;
  ogImage: string;
  canonical: string;
}

const withSuffix = (title: string) => `${title} | Maison Mikasa`;

/** Truncate at the last whitespace before `max` chars and append an ellipsis. */
function truncateDescription(text: string, max = 155): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max)}…`;
}

const staticRouteMeta: Record<string, RouteMeta> = {
  '/': {
    title: "Architecte d'intérieur Vannes & Golfe du Morbihan | Maison Mikasa",
    description:
      "Laurine Fourcherot, architecte d'intérieur à Baden : conception sur-mesure, rénovation et suivi de chantier à Vannes, Auray et dans le Golfe du Morbihan.",
    ogImage: DEFAULT_OG_IMAGE,
    canonical: `${SITE_URL}/`,
  },
  '/a-propos': {
    title: withSuffix("Laurine Fourcherot, architecte d'intérieur à Baden"),
    description:
      "Laurine Fourcherot, architecte d'intérieur et décoratrice à Baden : sa méthode, ses engagements et sa façon d'imaginer vos intérieurs dans le Golfe.",
    ogImage: DEFAULT_OG_IMAGE,
    canonical: `${SITE_URL}/a-propos`,
  },
  '/prestations': {
    title: withSuffix("Prestations et tarifs d'architecte d'intérieur"),
    description:
      'Rendez-vous conseil à domicile (320 €), conception sur-mesure, suivi de chantier, dossier mairie dès 350 € : les prestations de Maison Mikasa en Morbihan.',
    ogImage: DEFAULT_OG_IMAGE,
    canonical: `${SITE_URL}/prestations`,
  },
  '/realisations': {
    title: withSuffix("Réalisations en architecture d'intérieur, Morbihan"),
    description:
      "Maisons, appartements et locaux professionnels rénovés à Vannes, Baden, l'Île-aux-Moines et dans le Golfe du Morbihan : photos et détails des projets.",
    ogImage: DEFAULT_OG_IMAGE,
    canonical: `${SITE_URL}/realisations`,
  },
  '/realisations/maison': {
    title: withSuffix('Rénovation de maisons dans le Golfe du Morbihan'),
    description:
      "Maisons de famille et maisons de pêcheur rénovées ou aménagées à Baden, l'Île-aux-Moines et l'Île-d'Arz : découvrez les projets de Maison Mikasa.",
    ogImage: DEFAULT_OG_IMAGE,
    canonical: `${SITE_URL}/realisations/maison`,
  },
  '/realisations/appartement': {
    title: withSuffix("Rénovation d'appartements à Vannes"),
    description:
      'Appartements rénovés sur le port et en centre-ville de Vannes : réagencement, rangements sur mesure et décoration. Découvrez les projets de Maison Mikasa.',
    ogImage: DEFAULT_OG_IMAGE,
    canonical: `${SITE_URL}/realisations/appartement`,
  },
  '/realisations/professionnel': {
    title: withSuffix('Aménagement de locaux professionnels en Morbihan'),
    description:
      'Aménagement de commerces et locaux professionnels en Morbihan, comme une cave et bar à vins à Plumelec : un lieu fonctionnel, chaleureux et à votre image.',
    ogImage: DEFAULT_OG_IMAGE,
    canonical: `${SITE_URL}/realisations/professionnel`,
  },
  '/contact': {
    title: withSuffix("Contact architecte d'intérieur à Baden et Vannes"),
    description:
      "Un projet de rénovation ou d'aménagement ? Contactez Laurine Fourcherot, architecte d'intérieur à Baden, au 06 89 40 85 66 ou par message.",
    ogImage: DEFAULT_OG_IMAGE,
    canonical: `${SITE_URL}/contact`,
  },
  '/rendez-vous': {
    title: withSuffix('Prendre rendez-vous'),
    description:
      "Réservez un appel découverte gratuit de 20 minutes ou une visite conseil à domicile avec Maison Mikasa, architecte d'intérieur.",
    ogImage: DEFAULT_OG_IMAGE,
    canonical: `${SITE_URL}/rendez-vous`,
  },
  '/mentions-legales': {
    title: withSuffix('Mentions légales'),
    description:
      'Mentions légales de maisonmikasa.fr : éditeur, hébergement, propriété intellectuelle, données personnelles et cookies. Maison Mikasa, Baden (56).',
    ogImage: DEFAULT_OG_IMAGE,
    canonical: `${SITE_URL}/mentions-legales`,
  },
};

function projectRouteMeta(projectId: string): RouteMeta | null {
  const project = projectsData.find((p) => p.id === projectId);
  if (!project) return null;

  const path = `/realisations/${project.id}`;
  const ogImage = project.coverImage.startsWith('http')
    ? project.coverImage
    : `${SITE_URL}/og/${project.id}.jpg`;

  return {
    title: withSuffix(project.metaTitle ?? project.title),
    description: truncateDescription(project.metaDescription ?? project.description ?? ''),
    ogImage,
    canonical: `${SITE_URL}${path}`,
  };
}

function locationRouteMeta(path: string): RouteMeta | null {
  const location = locationsData.find((l) => l.path === path);
  if (!location) return null;

  const ogProject = location.ogImageProjectId
    ? projectsData.find((p) => p.id === location.ogImageProjectId)
    : undefined;
  const ogImage =
    ogProject && !ogProject.coverImage.startsWith('http')
      ? `${SITE_URL}/og/${ogProject.id}.jpg`
      : DEFAULT_OG_IMAGE;

  return {
    title: withSuffix(location.metaTitle),
    description: location.metaDescription,
    ogImage,
    canonical: `${SITE_URL}${location.path}`,
  };
}

export function getRouteMeta(path: string): RouteMeta {
  const staticMeta = staticRouteMeta[path];
  if (staticMeta) return staticMeta;

  const projectMatch = path.match(/^\/realisations\/([^/]+)$/);
  if (projectMatch) {
    const meta = projectRouteMeta(projectMatch[1]);
    if (meta) return meta;
  }

  const locationMeta = locationRouteMeta(path);
  if (locationMeta) return locationMeta;

  return staticRouteMeta['/'];
}

export function getAllPrerenderRoutes(): string[] {
  const staticRoutes = Object.keys(staticRouteMeta).filter((r) => r !== '/mentions-legales');
  const projectRoutes = projectsData.filter((p) => !p.hidden).map((p) => `/realisations/${p.id}`);
  const locationRoutes = locationsData.map((l) => l.path);
  return [...staticRoutes, ...locationRoutes, ...projectRoutes, '/mentions-legales'];
}
