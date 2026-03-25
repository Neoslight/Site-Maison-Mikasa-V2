import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
}

export interface PromiseItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export type ProjectType = 'Maison' | 'Appartement' | 'Professionnel';

export interface Project {
  id: string;
  title: string;
  projectType: ProjectType; // New field for macro-categorization
  category: string; // Descriptive category (e.g., "Rénovation complète")
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
