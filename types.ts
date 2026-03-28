export type ProjectType = 'Maison' | 'Appartement' | 'Professionnel';

export interface Project {
  id: string;
  title: string;
  projectType: ProjectType;
  category: string;
  location: string;
  year?: string;
  surface?: string;
  duration?: string;
  coverImage: string;
  gallery: string[];
  beforeAfterGallery?: { before: string; after: string }[];
  description: string;
  challenge: string;
  solution: string;
}
