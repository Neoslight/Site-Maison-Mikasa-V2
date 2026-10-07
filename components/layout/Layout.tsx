import React, { useEffect, useState } from 'react';
import { Link, NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import { locationsData } from '../../data/locations';
import { WEBSITE_SCHEMA } from '../../data/schema';
import { ADDRESS, EMAIL, EMAIL_HREF, GOOGLE_BUSINESS, PHONE, PHONE_HREF } from '../../lib/site';
import JsonLd from '../seo/JsonLd';
import Button from '../ui/Button';
import Container from '../ui/Container';
import SocialLinks from '../ui/SocialLinks';
import CtaBand from './CtaBand';

interface LayoutProps {
  children: React.ReactNode;
}

const PROJECT_CATEGORIES = [
  { to: '/realisations/maison', label: 'Maisons' },
  { to: '/realisations/appartement', label: 'Appartements' },
  { to: '/realisations/professionnel', label: 'Professionnels' },
];

const NAV_ITEMS = [
  { to: '/prestations', label: 'Prestations' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/contact', label: 'Contact' },
];

/** Pages qui portent déjà leur propre appel à l'action de prise de contact. */
const PAGES_WITHOUT_CTA = ['/contact', '/rendez-vous'];

const navLinkClass = (isActive: boolean) =>
  cn(
    'relative py-2 text-[0.8125rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300',
    'after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:bg-sage-600 after:transition-transform after:duration-300',
    isActive
      ? 'text-stone-900 after:scale-x-100'
      : 'text-stone-600 after:scale-x-0 hover:text-stone-900 hover:after:scale-x-100'
  );

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 8);
        ticking = false;
      });
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Menu mobile : bloque le scroll de la page et ferme à Échap
  useEffect(() => {
    if (!isMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isMenuOpen]);

  const projectsActive = pathname.startsWith('/realisations');
  // Normalise un éventuel slash final (/contact/) pour rester identique au rendu SSR
  const showCta = !PAGES_WITHOUT_CTA.includes(pathname.replace(/\/+$/, '') || '/');

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <JsonLd schema={WEBSITE_SCHEMA} />

      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-surface focus:px-4 focus:py-2 focus:text-sm"
      >
        Aller au contenu
      </a>

      <header
        className={cn(
          'sticky top-0 z-50 h-20 border-b bg-canvas transition-colors duration-300',
          scrolled || isMenuOpen ? 'border-line' : 'border-transparent'
        )}
      >
        <Container className="flex h-full items-center justify-between">
          <Link to="/" onClick={closeMenu} className="flex flex-col leading-none">
            <span className="font-serif text-2xl text-sage-700 md:text-[1.75rem]">
              Maison Mikasa
            </span>
            <span className="mt-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.24em] text-stone-500">
              Architecte d'intérieur
            </span>
          </Link>

          <nav aria-label="Navigation principale" className="hidden items-center gap-9 lg:flex">
            <div className="group relative">
              <Link
                to="/realisations"
                className={cn(navLinkClass(projectsActive), 'inline-flex items-center gap-1')}
                aria-haspopup="true"
              >
                Réalisations
                <ChevronDown
                  className="h-3.5 w-3.5 transition-transform duration-300 group-focus-within:rotate-180 group-hover:rotate-180"
                  aria-hidden="true"
                />
              </Link>
              <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-4 opacity-0 transition-all duration-300 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <ul className="w-56 rounded-soft border border-line bg-canvas py-3">
                  {PROJECT_CATEGORIES.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className="block px-6 py-2.5 text-sm text-stone-600 transition-colors hover:text-stone-900"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  <li className="mx-6 mt-2 border-t border-line pt-2">
                    <Link
                      to="/realisations"
                      className="block py-2.5 text-sm text-sage-700 transition-colors hover:text-sage-800"
                    >
                      Tous les projets
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {NAV_ITEMS.map((item) => (
              <RouterNavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => navLinkClass(isActive)}
              >
                {item.label}
              </RouterNavLink>
            ))}

            <Button to="/rendez-vous" className="px-5 py-3">
              Prendre rendez-vous
            </Button>
          </nav>

          <button
            type="button"
            className="-mr-2 p-2 text-stone-900 lg:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
            )}
          </button>
        </Container>

        {/* Menu mobile plein écran */}
        <div
          id="mobile-navigation"
          inert={!isMenuOpen}
          className={cn(
            'fixed inset-x-0 bottom-0 top-20 overflow-y-auto bg-canvas transition-opacity duration-300 lg:hidden',
            isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'
          )}
        >
          <Container className="flex min-h-full flex-col py-10">
            <nav aria-label="Navigation mobile">
              <ul className="space-y-1">
                <li>
                  <Link
                    to="/realisations"
                    onClick={closeMenu}
                    className="block py-2 font-serif text-3xl text-stone-900"
                  >
                    Réalisations
                  </Link>
                  <ul className="mb-3 mt-1 flex flex-wrap gap-x-5 gap-y-1">
                    {PROJECT_CATEGORIES.map((item) => (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          onClick={closeMenu}
                          className="block py-1 text-sm text-stone-500"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                {NAV_ITEMS.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      onClick={closeMenu}
                      className="block py-2 font-serif text-3xl text-stone-900"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <Button to="/rendez-vous" onClick={closeMenu} className="mt-10 w-full">
              Prendre rendez-vous
            </Button>

            <div className="mt-auto space-y-2 border-t border-line pt-8 text-sm text-stone-600">
              <a href={PHONE_HREF} className="block">
                {PHONE}
              </a>
              <a href={EMAIL_HREF} className="block">
                {EMAIL}
              </a>
            </div>
          </Container>
        </div>
      </header>

      <main id="contenu" className="flex-grow">
        {children}
      </main>

      {showCta && <CtaBand />}

      <footer className="border-t border-line bg-canvas">
        <Container className="grid gap-12 py-16 md:grid-cols-12 md:py-20">
          <div className="md:col-span-4">
            <Link to="/" className="font-serif text-2xl text-sage-700">
              Maison Mikasa
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone-600">
              Architecture d'intérieur et décoration sur-mesure à Baden, Vannes et dans le Golfe du
              Morbihan.
            </p>
            <SocialLinks className="mt-6" />
          </div>

          <nav aria-label="Plan du site" className="md:col-span-2">
            <p className="eyebrow mb-5 text-stone-500">Le studio</p>
            <ul className="space-y-3 text-sm">
              {[{ to: '/realisations', label: 'Réalisations' }, ...NAV_ITEMS].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-stone-700 hover:text-stone-900">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/rendez-vous" className="text-stone-700 hover:text-stone-900">
                  Rendez-vous
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Zones d'intervention" className="md:col-span-3">
            <p className="eyebrow mb-5 text-stone-500">Zones d'intervention</p>
            <ul className="space-y-3 text-sm">
              {locationsData.map((location) => (
                <li key={location.slug}>
                  <Link to={location.path} className="text-stone-700 hover:text-stone-900">
                    Architecte d'intérieur {location.city}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="eyebrow mb-5 text-stone-500">Contact</p>
            <ul className="space-y-3 text-sm text-stone-700">
              <li>
                <a href={PHONE_HREF} className="hover:text-stone-900">
                  {PHONE}
                </a>
              </li>
              <li>
                <a href={EMAIL_HREF} className="hover:text-stone-900">
                  {EMAIL}
                </a>
              </li>
              <li>{ADDRESS}</li>
              {GOOGLE_BUSINESS.profileUrl && (
                <li>
                  <a
                    href={GOOGLE_BUSINESS.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-stone-900"
                  >
                    Nos avis Google
                  </a>
                </li>
              )}
            </ul>
          </div>
        </Container>

        <Container className="flex flex-col gap-2 border-t border-line py-6 text-xs text-stone-500 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Maison Mikasa — Laurine Fourcherot</p>
          <Link to="/mentions-legales" className="hover:text-stone-900">
            Mentions légales
          </Link>
        </Container>
      </footer>
    </div>
  );
};

export default Layout;
