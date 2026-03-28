import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Section from '../components/ui/Section';
import BeforeAfterSlider from '../components/ui/BeforeAfterSlider';
import { projectsData } from '../data/projects';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Ruler,
  Clock,
  X,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { resolveAssetPath } from '../lib/resolveAssetPath';

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectsData.find((p) => p.id === projectId);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [triggerIndex, setTriggerIndex] = useState<number | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Navigation between projects (circular)
  const currentIndex = projectsData.findIndex((p) => p.id === projectId);
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];
  const prevProject = projectsData[(currentIndex - 1 + projectsData.length) % projectsData.length];

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
    return <div className="min-h-screen flex items-center justify-center">Projet introuvable</div>;
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Lightbox Overlay */}
      {lightboxOpen && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Visionneuse de photos"
        >
          {/* Top Controls */}
          <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50 pointer-events-none">
            <div className="text-white/80 text-sm font-medium tracking-widest pointer-events-auto bg-black/20 px-4 py-2 rounded-full backdrop-blur-md">
              {photoIndex + 1} / {project.gallery.length}
            </div>
            <button
              className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all pointer-events-auto"
              onClick={closeLightbox}
              aria-label="Fermer la visionneuse"
            >
              <X className="w-8 h-8" aria-hidden="true" />
            </button>
          </div>

          {/* Navigation Buttons (hidden when zoomed) */}
          {!isZoomed && (
            <>
              <button
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-all p-4 z-50 hover:bg-white/10 rounded-full group"
                onClick={prevPhoto}
                aria-label="Image précédente"
              >
                <ChevronLeft
                  className="w-8 h-8 md:w-10 md:h-10 group-hover:-translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </button>

              <button
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-all p-4 z-50 hover:bg-white/10 rounded-full group"
                onClick={nextPhoto}
                aria-label="Image suivante"
              >
                <ChevronRight
                  className="w-8 h-8 md:w-10 md:h-10 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </button>
            </>
          )}

          {/* Image Container */}
          <div
            className={cn(
              'relative w-full h-full flex items-center justify-center p-4 md:p-12 transition-all duration-300',
              isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
            )}
            onClick={toggleZoom}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
          >
            <img
              ref={imageRef}
              src={resolveAssetPath(project.gallery[photoIndex])}
              alt={`Vue ${photoIndex + 1}`}
              className="max-w-full max-h-full object-contain transition-transform duration-200 ease-out shadow-2xl"
              style={
                isZoomed
                  ? { transform: 'scale(2.5)' }
                  : { transform: 'scale(1)', transformOrigin: 'center' }
              }
            />
          </div>

          {/* Mobile hint */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-[10px] uppercase tracking-widest md:hidden pointer-events-none">
            {isZoomed ? 'Glisser pour explorer' : 'Toucher pour zoomer'}
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="fixed top-24 left-6 z-40 hidden xl:block">
        <Link
          to="/realisations"
          className="flex items-center text-xs uppercase tracking-widest text-stone-500 hover:text-sage-600 transition-all bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-100 hover:shadow-md hover:-translate-x-1"
        >
          <ArrowLeft className="w-3 h-3 mr-2" /> Retour aux réalisations
        </Link>
      </div>

      {/* Hero Image */}
      <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
        <img
          src={resolveAssetPath(project.coverImage)}
          alt={project.title}
          className="w-full h-full object-cover fade-in-section is-visible"
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <span className="uppercase tracking-[0.2em] text-sm md:text-base font-medium mb-4 block opacity-90">
              {project.category}
            </span>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-6 shadow-sm">
              {project.title}
            </h1>
            <div className="flex items-center justify-center space-x-2 text-sm md:text-base font-light opacity-90">
              <MapPin className="w-4 h-4" />
              <span>{project.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Project Info Bar */}
      <div className="bg-stone-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-wrap justify-center md:justify-start gap-8 md:gap-16 text-center md:text-left">
            {project.location && (
              <div className="space-y-1">
                <div className="flex items-center justify-center md:justify-start text-sage-600 text-xs uppercase tracking-widest font-bold">
                  <MapPin className="w-3 h-3 mr-2" /> Lieu
                </div>
                <p className="text-stone-800 font-serif">{project.location}</p>
              </div>
            )}
            {project.year && (
              <div className="space-y-1">
                <div className="flex items-center justify-center md:justify-start text-sage-600 text-xs uppercase tracking-widest font-bold">
                  <Calendar className="w-3 h-3 mr-2" /> Année
                </div>
                <p className="text-stone-800 font-serif">{project.year}</p>
              </div>
            )}
            {project.surface && (
              <div className="space-y-1">
                <div className="flex items-center justify-center md:justify-start text-sage-600 text-xs uppercase tracking-widest font-bold">
                  <Ruler className="w-3 h-3 mr-2" /> Surface
                </div>
                <p className="text-stone-800 font-serif">{project.surface}</p>
              </div>
            )}
            {project.duration && (
              <div className="space-y-1">
                <div className="flex items-center justify-center md:justify-start text-sage-600 text-xs uppercase tracking-widest font-bold">
                  <Clock className="w-3 h-3 mr-2" /> Durée
                </div>
                <p className="text-stone-800 font-serif">{project.duration}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12">
            <div>
              <h2 className="font-serif text-2xl text-stone-800 mb-6">Le Projet</h2>
              <p className="text-stone-700 font-light leading-relaxed text-lg whitespace-pre-line">
                {project.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-100">
              <div>
                <h3 className="font-serif text-xl text-stone-800 mb-4">Le Défi</h3>
                <p className="text-stone-600 font-light text-sm leading-relaxed">
                  {project.challenge}
                </p>
              </div>
              <div>
                <h3 className="font-serif text-xl text-stone-800 mb-4">La Solution</h3>
                <p className="text-stone-600 font-light text-sm leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar (Contact CTA) */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 bg-stone-50 p-8 rounded-sm border border-stone-100">
              <h3 className="font-serif text-xl text-stone-800 mb-4">Un projet similaire ?</h3>
              <p className="text-stone-600 font-light text-sm mb-6">
                Vous avez un projet de rénovation ou de décoration ? Discutons-en ensemble.
              </p>
              <Link
                to="/contact"
                className="block w-full text-center bg-sage-600 text-white text-xs uppercase tracking-widest py-3 px-6 hover:bg-sage-700 transition-all duration-300 rounded-sm hover:-translate-y-1 hover:shadow-lg active:translate-y-0 shadow-sm"
              >
                Contactez-nous
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Before/After Gallery */}
      {project.beforeAfterGallery && project.beforeAfterGallery.length > 0 && (
        <Section className="max-w-7xl mx-auto px-6 pb-16">
          <h2 className="font-serif text-3xl text-stone-800 mb-12 text-center">Avant / Après</h2>
          <div className="grid grid-cols-1 gap-12">
            {project.beforeAfterGallery.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <BeforeAfterSlider beforeImage={item.before} afterImage={item.after} />
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Gallery Grid */}
      <Section className="max-w-7xl mx-auto px-6 pb-24">
        <h2 className="font-serif text-3xl text-stone-800 mb-12 text-center">Galerie photos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {project.gallery.map((img, index) => (
            <div
              key={index}
              ref={(el) => { thumbnailRefs.current[index] = el; }}
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
                'relative overflow-hidden rounded-sm cursor-zoom-in group shadow-sm hover:shadow-xl transition-all duration-500',
                index % 3 === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/5]'
              )}
            >
              <img
                src={resolveAssetPath(img)}
                alt={`Vue ${index + 1} - ${project.title}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/20 transition-colors duration-300 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full opacity-0 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center shadow-lg">
                  <ZoomIn className="w-4 h-4 text-stone-800 mr-2" />
                  <span className="text-xs uppercase tracking-widest text-stone-800 font-bold">
                    Agrandir
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Navigation Footer */}
      <div className="border-t border-gray-100">
        <div className="grid grid-cols-2 divide-x divide-gray-100">
          <Link
            to={`/realisations/${prevProject.id}`}
            className="group block p-8 md:p-12 hover:bg-stone-50 transition-colors text-right"
          >
            <span className="block text-xs uppercase tracking-widest text-stone-400 mb-2 group-hover:text-sage-600 transition-colors">
              Projet Précédent
            </span>
            <span className="font-serif text-lg md:text-2xl text-stone-800 group-hover:translate-x-1 inline-block transition-transform duration-300">
              {prevProject.title}
            </span>
          </Link>
          <Link
            to={`/realisations/${nextProject.id}`}
            className="group block p-8 md:p-12 hover:bg-stone-50 transition-colors text-left"
          >
            <span className="block text-xs uppercase tracking-widest text-stone-400 mb-2 group-hover:text-sage-600 transition-colors">
              Projet Suivant
            </span>
            <span className="font-serif text-lg md:text-2xl text-stone-800 group-hover:-translate-x-1 inline-block transition-transform duration-300">
              {nextProject.title}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
