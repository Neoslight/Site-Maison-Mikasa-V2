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
      "Laurine Fourcherot, architecte d'intérieur et décoratrice à Baden, Vannes et dans tout le Golfe du Morbihan (Auray, Arradon...). Conception sur-mesure et suivi de chantier.",
    ogImage: DEFAULT_OG_IMAGE,
    canonical: `${SITE_URL}/`,
  },
  '/a-propos': {
    title: withSuffix('À propos'),
    description:
      "Laurine Fourcherot, architecte d'intérieur et décoratrice à Baden (56), Golfe du Morbihan.",
    ogImage: DEFAULT_OG_IMAGE,
    canonical: `${SITE_URL}/a-propos`,
  },
  '/prestations': {
    title: withSuffix('Prestations'),
    description:
      "Conseil, conception et suivi de chantier pour vos projets d'aménagement intérieur dans le Golfe du Morbihan.",
    ogImage: DEFAULT_OG_IMAGE,
    canonical: `${SITE_URL}/prestations`,
  },
  '/realisations': {
    title: withSuffix('Réalisations'),
    description:
      "Découvrez les réalisations d'architecture et décoration d'intérieur de Maison Mikasa.",
    ogImage: DEFAULT_OG_IMAGE,
    canonical: `${SITE_URL}/realisations`,
  },
  '/realisations/maison': {
    title: withSuffix('Réalisations Maisons'),
    description:
      'Rénovations complètes et aménagements de maisons par Maison Mikasa dans le Golfe du Morbihan.',
    ogImage: DEFAULT_OG_IMAGE,
    canonical: `${SITE_URL}/realisations/maison`,
  },
  '/realisations/appartement': {
    title: withSuffix('Réalisations Appartements'),
    description:
      "Rénovations et réaménagements d'appartements en Bretagne — portfolio Maison Mikasa.",
    ogImage: DEFAULT_OG_IMAGE,
    canonical: `${SITE_URL}/realisations/appartement`,
  },
  '/realisations/professionnel': {
    title: withSuffix('Réalisations Professionnelles'),
    description: 'Aménagements de locaux professionnels et tertiaires conçus par Maison Mikasa.',
    ogImage: DEFAULT_OG_IMAGE,
    canonical: `${SITE_URL}/realisations/professionnel`,
  },
  '/contact': {
    title: withSuffix('Contact'),
    description: "Contactez Maison Mikasa pour votre projet d'architecture d'intérieur.",
    ogImage: DEFAULT_OG_IMAGE,
    canonical: `${SITE_URL}/contact`,
  },
  '/rendez-vous': {
    title: withSuffix('Prendre Rendez-vous'),
    description:
      "Réservez un appel découverte gratuit de 20 minutes ou une visite conseil à domicile avec Maison Mikasa, architecte d'intérieur.",
    ogImage: DEFAULT_OG_IMAGE,
    canonical: `${SITE_URL}/rendez-vous`,
  },
  '/mentions-legales': {
    title: withSuffix('Mentions légales'),
    description: 'Mentions légales et informations éditeur du site Maison Mikasa.',
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
    title: withSuffix(project.title),
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
