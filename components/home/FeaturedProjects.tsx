import React from 'react';
import { Link } from 'react-router-dom';
import Section from '../ui/Section';
import StaggerReveal from '../ui/StaggerReveal';
import { ArrowRight } from 'lucide-react';
import { projectsData } from '../../data/projects';
import { resolveAssetPath } from '../../lib/resolveAssetPath';

const FeaturedProjects: React.FC = () => {
  // Select first 3 projects for featured section
  const featured = projectsData.slice(0, 3);

  return (
    <Section id="featured-projects" className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="font-serif text-3xl text-stone-800 mb-4">Dernières réalisations</h2>
        <div className="w-12 h-0.5 bg-sage-400 mx-auto"></div>
      </div>

      <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featured.map((project) => (
          <Link
            to={`/realisations/${project.id}`}
            key={project.id}
            className="group block cursor-pointer"
          >
            <div className="relative overflow-hidden aspect-[4/5] mb-5 bg-stone-100 rounded-sm">
              <div className="absolute inset-0 bg-stone-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

              <img
                src={resolveAssetPath(project.coverImage)}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute bottom-6 left-6 z-20 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75">
                <span className="inline-flex items-center text-white text-xs uppercase tracking-widest border border-white/50 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-sm">
                  Voir le projet <ArrowRight className="w-3 h-3 ml-2" />
                </span>
              </div>
            </div>

            <div className="text-center md:text-left space-y-1">
              <h3 className="font-serif text-xl text-stone-800 group-hover:text-sage-600 transition-colors duration-300">
                {project.title}
              </h3>
              <div className="flex items-center justify-center md:justify-start text-xs text-stone-500 uppercase tracking-widest font-light">
                <span>{project.location}</span>
                <span className="mx-2">•</span>
                <span>{project.category}</span>
              </div>
            </div>
          </Link>
        ))}
      </StaggerReveal>

      <div className="mt-12 text-center">
        <Link
          to="/realisations"
          className="inline-block border-b border-stone-800 pb-1 text-sm uppercase tracking-widest text-stone-800 hover:text-sage-600 hover:border-sage-600 transition-colors"
        >
          Voir toutes les réalisations
        </Link>
      </div>
    </Section>
  );
};

export default FeaturedProjects;
