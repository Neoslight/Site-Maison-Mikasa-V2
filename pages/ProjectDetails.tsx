import React, { useEffect, useState, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useParams, Link } from 'react-router-dom';
import BeforeAfterSlider from '../components/ui/BeforeAfterSlider';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import Reveal from '../components/ui/Reveal';
import Section from '../components/ui/Section';
import SectionHeading from '../components/ui/SectionHeading';
import { projectsData } from '../data/projects';
import { ArrowLeft, ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { resolveAssetPath } from '../lib/resolveAssetPath';
import Img from '../components/ui/Img';
import { useRouteMeta } from '../lib/useRouteMeta';
import { getLocationForProjectLocation } from '../data/locations';
import JsonLd from '../components/seo/JsonLd';
import { BUSINESS_REF, PERSON_REF } from '../data/schema';

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectsData.find((p) => p.id === projectId);

  const BASE_URL = 'https://www.maisonmikasa.fr';
  const projectUrl = `${BASE_URL}/realisations/${projectId}`;
  const ogImage = project?.coverImage?.startsWith('/')
    ? `${BASE_URL}${project.coverImage}`
    : project?.coverImage;

  useRouteMeta();

  const creativeWorkSchema = project
    ? {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: project.title,
        description: project.description,
        locationCreated: {
          '@type': 'Place',
          name: project.location,
          address: {
            '@type': 'PostalAddress',
            addressRegion: 'Morbihan',
            addressCountry: 'FR',
          },
        },
        ...(project.year ? { dateCreated: project.year } : {}),
        image: ogImage,
        author: PERSON_REF,
        publisher: BUSINESS_REF,
        url: projectUrl,
      }
    : null;

  const nearbyLocation = project ? getLocationForProjectLocation(project.location) : undefined;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [triggerIndex, setTriggerIndex] = useState<number | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Navigation between projects (circular, visible only)
  const visibleProjects = projectsData.filter((p) => !p.hidden);
  const currentIndex = visibleProjects.findIndex((p) => p.id === projectId);
  const navList = currentIndex !== -1 ? visibleProjects : projectsData;
  const navIndex =
    currentIndex !== -1 ? currentIndex : projectsData.findIndex((p) => p.id === projectId);
  const nextProject = navList[(navIndex + 1) % navList.length];
  const prevProject = navList[(navIndex - 1 + navList.length) % navList.length];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [projectId]);

  // Lightbox Handlers
  const openLightbox = (index: number) => {
    setPhotoIndex(index);
    setTriggerIndex(index);
    setLightboxOpen(true);
    setIsZoomed(false);
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    setIsZoomed(false);

    // Return focus to the thumbnail that opened the lightbox
    if (triggerIndex !== null && thumbnailRefs.current[triggerIndex]) {
      thumbnailRefs.current[triggerIndex]?.focus();
    }
  }, [triggerIndex]);

  useEffect(() => {
    if (lightboxOpen) {
      // Fix Layout Shift: Compensate for scrollbar width
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [lightboxOpen]);

  const nextPhoto = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (!project) return;
      setIsZoomed(false);
      setPhotoIndex((prev) => (prev + 1) % project.gallery.length);
    },
    [project]
  );

  const prevPhoto = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (!project) return;
      setIsZoomed(false);
      setPhotoIndex((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
    },
    [project]
  );

  const applyZoomOrigin = (clientX: number, clientY: number) => {
    if (!imageRef.current) return;
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((clientX - left) / width) * 100;
    const y = ((clientY - top) / height) * 100;
    imageRef.current.style.transformOrigin = `${x}% ${y}%`;
  };

  const toggleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isZoomed) applyZoomOrigin(e.clientX, e.clientY);
    setIsZoomed(!isZoomed);
  };

  // Mouse pan while zoomed (desktop)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isZoomed) return;
    applyZoomOrigin(e.clientX, e.clientY);
  };

  // Touch pan while zoomed (mobile) — DOM mutation to avoid re-renders
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isZoomed || !e.touches[0]) return;
    applyZoomOrigin(e.touches[0].clientX, e.touches[0].clientY);
  };

  // Preload adjacent images
  useEffect(() => {
    if (lightboxOpen && project) {
      const prevIndex = (photoIndex - 1 + project.gallery.length) % project.gallery.length;
      const nextIndex = (photoIndex + 1) % project.gallery.length;

      const imgPrev = new Image();
      imgPrev.src = resolveAssetPath(project.gallery[prevIndex]);

      const imgNext = new Image();
      imgNext.src = resolveAssetPath(project.gallery[nextIndex]);
    }
  }, [lightboxOpen, photoIndex, project]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (!isZoomed) {
        if (e.key === 'ArrowRight') nextPhoto();
        if (e.key === 'ArrowLeft') prevPhoto();
      }

      // Focus Trap
      if (e.key === 'Tab') {
        if (!lightboxRef.current) return;
        const focusableElements = lightboxRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (!lightboxRef.current.contains(document.activeElement)) {
          firstElement.focus();
          e.preventDefault();
          return;
        }

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Focus close button when lightbox opens
    if (lightboxRef.current) {
      const closeBtn = lightboxRef.current.querySelector('button');
      if (closeBtn) closeBtn.focus();
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, isZoomed, nextPhoto, prevPhoto, closeLightbox]);

  if (!project) {
    return (
      <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
        <p className="type-subtitle">Projet introuvable</p>
        <Button to="/realisations" variant="link">
          Toutes les réalisations
        </Button>
      </Container>
    );
  }

  const facts = [
    { label: 'Lieu', value: project.location },
    { label: 'Année', value: project.year },
    { label: 'Surface', value: project.surface },
    { label: 'Durée', value: project.duration },
  ].filter((fact) => fact.value);

  const story = [
    { title: 'Le Projet', text: project.description },
    { title: 'Le Défi', text: project.challenge },
    { title: 'La Solution', text: project.solution },
  ].filter((block) => block.text);

  return (
    <>
      {creativeWorkSchema && <JsonLd schema={creativeWorkSchema} />}

      {/* Visionneuse — rendue via Portal sur document.body */}
      {lightboxOpen &&
        createPortal(
          <div
            ref={lightboxRef}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-950/95"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Visionneuse de photos"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 z-50 flex items-center justify-between p-4 md:p-6">
              <span className="pointer-events-auto text-sm tabular-nums text-white/70">
                {photoIndex + 1} / {project.gallery.length}
              </span>
              <button
                className="pointer-events-auto p-2 text-white/70 transition-colors hover:text-white"
                onClick={closeLightbox}
                aria-label="Fermer la visionneuse"
              >
                <X className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>

            {!isZoomed && (
              <>
                <button
                  className="absolute left-2 top-1/2 z-50 -translate-y-1/2 p-3 text-white/60 transition-colors hover:text-white md:left-6"
                  onClick={prevPhoto}
                  aria-label="Image précédente"
                >
                  <ChevronLeft
                    className="h-8 w-8 md:h-10 md:w-10"
                    strokeWidth={1.25}
                    aria-hidden="true"
                  />
                </button>
                <button
                  className="absolute right-2 top-1/2 z-50 -translate-y-1/2 p-3 text-white/60 transition-colors hover:text-white md:right-6"
                  onClick={nextPhoto}
                  aria-label="Image suivante"
                >
                  <ChevronRight
                    className="h-8 w-8 md:h-10 md:w-10"
                    strokeWidth={1.25}
                    aria-hidden="true"
                  />
                </button>
              </>
            )}

            <div
              className={cn(
                'absolute inset-0 flex items-center justify-center',
                isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
              )}
              onClick={toggleZoom}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
            >
              <img
                ref={imageRef}
                src={resolveAssetPath(project.gallery[photoIndex])}
                alt={
                  project.galleryAlts?.[photoIndex] ?? `Vue ${photoIndex + 1} - ${project.title}`
                }
                className="block transition-transform duration-200 ease-out"
                style={{
                  maxWidth: 'calc(100vw - 4rem)',
                  maxHeight: 'calc(100vh - 6rem)',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  ...(isZoomed
                    ? { transform: 'scale(2.5)' }
                    : { transform: 'scale(1)', transformOrigin: 'center' }),
                }}
              />
            </div>

            <p className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/50 md:hidden">
              {isZoomed ? 'Glisser pour explorer' : 'Toucher pour zoomer'}
            </p>
          </div>,
          document.body
        )}

      <header className="bg-canvas pt-8 md:pt-12">
        <Container>
          <nav aria-label="Fil d'Ariane" className="mb-10 text-sm text-stone-500 md:mb-14">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link to="/" className="hover:text-stone-900">
                  Accueil
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to="/realisations" className="hover:text-stone-900">
                  Réalisations
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-stone-900">
                {project.title}
              </li>
            </ol>
          </nav>

          <div className="grid gap-10 pb-10 md:pb-14 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow mb-5">{project.category}</p>
              <h1 className="type-display">{project.title}</h1>
            </div>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-6 lg:col-span-4 lg:col-start-9">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-xs uppercase tracking-[0.16em] text-stone-500">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 text-stone-900">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>

        <div className="mx-auto max-w-[1600px] px-4 md:px-10">
          <div className="aspect-[4/5] overflow-hidden rounded-soft bg-sand sm:aspect-[3/2] md:rounded-panel lg:aspect-[16/9]">
            <Img
              src={project.coverImage}
              alt={project.coverImageAlt ?? project.title}
              sizes="(max-width: 1600px) 100vw, 1600px"
              loading="eager"
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </header>

      <Section>
        <Container>
          {story.map((block) => (
            <Reveal
              key={block.title}
              className="grid gap-4 border-t border-line py-10 first:border-t-0 first:pt-0 md:grid-cols-12 md:gap-8 md:py-14"
            >
              <h2 className="type-subtitle md:col-span-4">{block.title}</h2>
              <p className="text-base leading-relaxed text-stone-600 md:col-span-7 md:col-start-6 md:text-lg">
                {block.text}
              </p>
            </Reveal>
          ))}

          {nearbyLocation && (
            <div className="border-t border-line pt-10 md:grid md:grid-cols-12 md:gap-8">
              <div className="md:col-span-7 md:col-start-6">
                <Button to={nearbyLocation.path} variant="link">
                  Voir nos réalisations{' '}
                  {nearbyLocation.city === 'Golfe du Morbihan' ? 'dans le' : 'à'}{' '}
                  {nearbyLocation.city}
                </Button>
              </div>
            </div>
          )}
        </Container>
      </Section>

      <Section spacing="none" className="pb-20 md:pb-32">
        <Container>
          <SectionHeading eyebrow="Galerie" title="Le projet en images" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            {project.gallery.map((img, index) => {
              // Une photo sur trois en pleine largeur ; la dernière aussi si elle resterait seule
              const wide =
                index % 3 === 0 || (index === project.gallery.length - 1 && index % 3 === 1);
              return (
                <div
                  key={index}
                  ref={(el) => {
                    thumbnailRefs.current[index] = el;
                  }}
                  onClick={() => openLightbox(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openLightbox(index);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Agrandir la vue ${index + 1}`}
                  className={cn(
                    'group isolate cursor-zoom-in overflow-hidden rounded-soft bg-sand',
                    wide ? 'aspect-[3/2] md:col-span-2 md:aspect-[16/9]' : 'aspect-[4/3]'
                  )}
                >
                  <Img
                    src={img}
                    alt={project.galleryAlts?.[index] ?? `Vue ${index + 1} - ${project.title}`}
                    sizes={
                      wide ? '(max-width: 1280px) 100vw, 1200px' : '(max-width: 768px) 100vw, 50vw'
                    }
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.02]"
                  />
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {project.beforeAfterGallery && project.beforeAfterGallery.length > 0 && (
        <Section tone="sand">
          <Container size="medium">
            <SectionHeading eyebrow="Transformation" title="Avant / Après" align="center" />
            <div className="grid grid-cols-1 gap-12">
              {project.beforeAfterGallery.map((item, index) => (
                <BeforeAfterSlider
                  key={index}
                  beforeImage={item.before}
                  afterImage={item.after}
                  beforeAlt={`${project.title} à ${project.location} - Avant rénovation (${index + 1})`}
                  afterAlt={`${project.title} à ${project.location} - Après rénovation (${index + 1})`}
                />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <nav aria-label="Autres projets" className="border-t border-line bg-canvas">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-line">
          <Link
            to={`/realisations/${prevProject.id}`}
            className="group block px-6 py-10 md:px-10 md:py-14"
          >
            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-stone-500">
              <ArrowLeft
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1"
                aria-hidden="true"
              />
              Projet précédent
            </span>
            <span className="mt-3 block font-serif text-lg text-stone-900 md:text-2xl">
              {prevProject.title}
            </span>
          </Link>
          <Link
            to={`/realisations/${nextProject.id}`}
            className="group block px-6 py-10 text-right md:px-10 md:py-14"
          >
            <span className="flex items-center justify-end gap-2 text-xs uppercase tracking-[0.16em] text-stone-500">
              Projet suivant
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </span>
            <span className="mt-3 block font-serif text-lg text-stone-900 md:text-2xl">
              {nextProject.title}
            </span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default ProjectDetails;
