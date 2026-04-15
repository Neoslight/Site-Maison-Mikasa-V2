import { projectsData } from './projects';

export const SITE_URL = 'https://www.maisonmikasa.fr';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/homepage-photo-accueil.webp`;

export interface RouteMeta {
  title: string;
  description: string;
  ogImage: string;
  canonical: string;
}

const withSuffix = (title: string) => `${title} | Maison Mikasa`;

const staticRouteMeta: Record<string, RouteMeta> = {
  '/': {
    title: "Maison Mikasa | Architecte d'intérieur à Baden, Morbihan",
    description:
      "Laurine Fourcherot, architecte d'intérieur à Baden (56). Projets sur-mesure dans le Golfe du Morbihan : Vannes, Île-aux-Moines, Saint-Armel. Prenez rendez-vous.",
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
      "Réservez directement un créneau de consultation avec Maison Mikasa, architecte d'intérieur.",
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
  const absoluteImage = project.coverImage.startsWith('http')
    ? project.coverImage
    : `${SITE_URL}${project.coverImage}`;

  return {
    title: withSuffix(project.title),
    description: (project.description ?? '').slice(0, 155),
    ogImage: absoluteImage,
    canonical: `${SITE_URL}${path}`,
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

  return staticRouteMeta['/'];
}

export function getAllPrerenderRoutes(): string[] {
  const staticRoutes = Object.keys(staticRouteMeta).filter((r) => r !== '/mentions-legales');
  const projectRoutes = projectsData.filter((p) => !p.hidden).map((p) => `/realisations/${p.id}`);
  return [...staticRoutes, ...projectRoutes, '/mentions-legales'];
}
