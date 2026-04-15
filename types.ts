export type ProjectType = 'Maison' | 'Appartement' | 'Professionnel';

export interface Project {
  id: string;
  hidden?: boolean;
  title: string;
  projectType: ProjectType;
  category: string;
  location: string;
  year?: string;
  surface?: string;
  duration?: string;
  coverImage: string;
  coverImageAlt?: string;
  gallery: string[];
  galleryAlts?: string[];
  beforeAfterGallery?: { before: string; after: string }[];
  description: string;
  challenge: string;
  solution: string;
}
