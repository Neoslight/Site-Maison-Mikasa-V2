import React from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projects';
import { ProjectType } from '../types';
import { useRouteMeta } from '../lib/useRouteMeta';
import { cn } from '../lib/utils';
import Container from '../components/ui/Container';
import PageHeader from '../components/ui/PageHeader';
import ProjectCard from '../components/ui/ProjectCard';
import Reveal from '../components/ui/Reveal';

type Filter = ProjectType | 'Tous';

interface ProjectsPageProps {
  initialType?: Filter;
}

const FILTERS: { type: Filter; label: string; path: string; title: string }[] = [
  {
    type: 'Tous',
    label: 'Tous les projets',
    path: '/realisations',
    title: "Réalisations d'architecture et décoration — Golfe du Morbihan",
  },
  { type: 'Maison', label: 'Maisons', path: '/realisations/maison', title: 'Nos Maisons' },
  {
    type: 'Appartement',
    label: 'Appartements',
    path: '/realisations/appartement',
    title: 'Nos Appartements',
  },
  {
    type: 'Professionnel',
    label: 'Professionnels',
    path: '/realisations/professionnel',
    title: 'Espaces Professionnels',
  },
];

const Projects: React.FC<ProjectsPageProps> = ({ initialType = 'Tous' }) => {
  useRouteMeta();

  const visibleProjects = projectsData.filter((p) => !p.hidden);
  const countFor = (type: Filter) =>
    type === 'Tous'
      ? visibleProjects.length
      : visibleProjects.filter((p) => p.projectType === type).length;
  const filteredProjects =
    initialType === 'Tous'
      ? visibleProjects
      : visibleProjects.filter((p) => p.projectType === initialType);
  const current = FILTERS.find((f) => f.type === initialType) ?? FILTERS[0];

  // Première carte en grand format uniquement sur la vue "Tous"
  const showFeaturedFirst = initialType === 'Tous' && filteredProjects.length > 1;
  const [featured, ...rest] = showFeaturedFirst
    ? filteredProjects
    : [undefined, ...filteredProjects];

  return (
    <>
      <PageHeader
        eyebrow="Réalisations"
        title={current.title}
        intro="Une sélection de projets d'architecture et de décoration d'intérieur. Chaque lieu raconte une histoire unique, la vôtre."
      />

      {/* Filtres — de vraies routes, indexables */}
      <nav
        aria-label="Filtrer les réalisations"
        className="sticky top-20 z-30 border-y border-line bg-canvas"
      >
        <Container className="overflow-x-auto">
          <ul className="flex min-w-max gap-8">
            {FILTERS.map((item) => {
              const active = item.type === initialType;
              return (
                <li key={item.type}>
                  <Link
                    to={item.path}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative block py-4 text-sm transition-colors duration-300',
                      'after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-stone-900 after:transition-transform after:duration-300',
                      active
                        ? 'text-stone-900 after:scale-x-100'
                        : 'text-stone-500 after:scale-x-0 hover:text-stone-900'
                    )}
                  >
                    {item.label}
                    <sup className="ml-1 text-[0.6875rem] text-stone-400">
                      {countFor(item.type)}
                    </sup>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </nav>

      <section className="bg-canvas py-14 md:py-20">
        <Container>
          {filteredProjects.length === 0 ? (
            <p className="py-20 text-center text-stone-500">
              Aucun projet pour le moment dans cette catégorie.
            </p>
          ) : (
            <>
              {featured && (
                <ProjectCard
                  project={featured}
                  featured
                  as="h2"
                  sizes="(max-width: 1280px) 100vw, 1200px"
                  className="mb-16 md:mb-24"
                />
              )}
              <div className="grid gap-16 md:grid-cols-2 md:gap-x-10 md:gap-y-24">
                {rest.map(
                  (project, index) =>
                    project && (
                      <Reveal
                        key={project.id}
                        delay={(index % 2) * 120}
                        className={index % 2 === 1 ? 'md:mt-24' : ''}
                      >
                        <ProjectCard
                          project={project}
                          as="h2"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </Reveal>
                    )
                )}
              </div>
            </>
          )}
        </Container>
      </section>
    </>
  );
};

export default Projects;
