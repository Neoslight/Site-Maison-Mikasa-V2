import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import type { Project } from '../../types';
import Img from './Img';

interface ProjectCardProps {
  project: Project;
  /** Grand format paysage (mise en avant). */
  featured?: boolean;
  sizes: string;
  as?: 'h2' | 'h3';
  className?: string;
}

/** Carte projet unique : photo, titre, lieu et année. */
const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  featured,
  sizes,
  as: Heading = 'h3',
  className,
}) => (
  <Link to={`/realisations/${project.id}`} className={cn('group block', className)}>
    <div
      className={cn(
        'isolate overflow-hidden rounded-soft bg-sand',
        featured ? 'aspect-[4/5] md:aspect-[16/9]' : 'aspect-[4/5]'
      )}
    >
      <Img
        src={project.coverImage}
        alt={project.coverImageAlt ?? project.title}
        sizes={sizes}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
      />
    </div>
    <div className="mt-5 flex items-baseline justify-between gap-6">
      <Heading
        className={cn(
          'transition-colors duration-300 group-hover:text-sage-700',
          featured ? 'type-subtitle' : 'text-xl md:text-[1.375rem]'
        )}
      >
        {project.title}
      </Heading>
      {project.year && (
        <span className="shrink-0 text-xs tracking-[0.14em] text-stone-500">{project.year}</span>
      )}
    </div>
    <p className="mt-1.5 text-sm text-stone-500">
      {project.location} · {project.category}
    </p>
  </Link>
);

export default ProjectCard;
