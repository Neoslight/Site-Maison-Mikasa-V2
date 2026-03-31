import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Section from '../components/ui/Section';
import StaggerReveal from '../components/ui/StaggerReveal';
import { projectsData } from '../data/projects';
import { ArrowRight } from 'lucide-react';
import { ProjectType } from '../types';
import { resolveAssetPath } from '../lib/resolveAssetPath';
import { usePageMeta } from '../lib/usePageMeta';

interface ProjectsPageProps {
  initialType?: ProjectType | 'Tous';
}

const Projects: React.FC<ProjectsPageProps> = ({ initialType = 'Tous' }) => {
  const [filter, setFilter] = useState<ProjectType | 'Tous'>(initialType);

  useEffect(() => {
    setFilter(initialType);
  }, [initialType]);

  const categories: (ProjectType | 'Tous')[] = ['Tous', 'Maison', 'Appartement', 'Professionnel'];

  const visibleProjects = projectsData.filter((p) => !p.hidden);
  const filteredProjects =
    filter === 'Tous' ? visibleProjects : visibleProjects.filter((p) => p.projectType === filter);

  const getTitle = () => {
    switch (filter) {
      case 'Maison':
        return 'Nos Maisons';
      case 'Appartement':
        return 'Nos Appartements';
      case 'Professionnel':
        return 'Espaces Professionnels';
      default:
        return 'Toutes nos Réalisations';
    }
  };

  const getPath = (cat: ProjectType | 'Tous') => {
    switch (cat) {
      case 'Maison':
        return '/realisations/maison';
      case 'Appartement':
        return '/realisations/appartement';
      case 'Professionnel':
        return '/realisations/professionnel';
      default:
        return '/realisations';
    }
  };

  usePageMeta(
    getTitle(),
    "Découvrez les réalisations d'architecture et décoration d'intérieur de Maison Mikasa."
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <Section bgColor="bg-stone-50" className="text-center" py="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <span className="text-sage-600 uppercase tracking-widest text-xs font-bold mb-4 block">
            Portfolio
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-stone-800 mb-6">{getTitle()}</h1>
          <p className="text-stone-600 font-light max-w-2xl mx-auto">
            Découvrez une sélection de projets d'architecture et de décoration d'intérieur. Chaque
            lieu raconte une histoire unique, la vôtre.
          </p>
        </div>
      </Section>

      {/* Filters */}
      <div className="sticky top-20 z-30 bg-white/90 backdrop-blur-sm border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto">
          <div className="flex justify-center space-x-2 md:space-x-6 min-w-max">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={getPath(cat)}
                className={`
                  text-xs uppercase tracking-widest px-4 py-2 rounded-sm transition-all duration-300
                  ${
                    filter === cat
                      ? 'bg-sage-600 text-white'
                      : 'text-stone-500 hover:text-sage-600 hover:bg-sage-50'
                  }
                `}
              >
                {cat === 'Tous' ? 'Tous' : cat === 'Professionnel' ? 'Professionnels' : cat + 's'}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery */}
      <Section className="max-w-7xl mx-auto px-6">
        {filteredProjects.length > 0 ? (
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {filteredProjects.map((project) => (
              <Link key={project.id} to={`/realisations/${project.id}`} className="group block">
                <div className="relative overflow-hidden aspect-[4/5] mb-6 bg-stone-100 rounded-sm">
                  <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/20 transition-colors duration-500 z-10" />
                  <img
                    src={resolveAssetPath(project.coverImage)}
                    alt={project.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute bottom-6 left-6 z-20">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-3 rounded-sm transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="flex items-center text-xs uppercase tracking-widest text-stone-800 font-bold">
                        Voir le projet <ArrowRight className="w-3 h-3 ml-2" />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-xl text-stone-800 group-hover:text-sage-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-stone-500 uppercase tracking-widest">
                    {project.location} • {project.category}
                  </p>
                </div>
              </Link>
            ))}
          </StaggerReveal>
        ) : (
          <div className="text-center py-20 text-stone-500 font-light italic">
            Aucun projet pour le moment dans cette catégorie.
          </div>
        )}
      </Section>
    </div>
  );
};

export default Projects;
