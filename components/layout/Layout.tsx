import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Menu, X, Phone, Mail, ChevronDown, ArrowRight, CalendarDays } from 'lucide-react';
import { cn } from '../../lib/utils';

// TODO: Remplacer par les vraies icônes de marque (lucide-react a déprécié les icônes de marques tierces)
// Option recommandée : react-icons (ri) ou SVGs inline
const IconInstagram = () => (
  <svg
    className="w-full h-full"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

const IconFacebook = () => (
  <svg
    className="w-full h-full"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const IconLinkedin = () => (
  <svg
    className="w-full h-full"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface LayoutProps {
  children: React.ReactNode;
}

const NavLink: React.FC<{
  to: string;
  children: React.ReactNode;
  mobile?: boolean;
  onClick?: () => void;
}> = ({ to, children, mobile, onClick }) => {
  const isHash = to.includes('#');
  const { pathname } = useLocation();
  const Component = isHash ? HashLink : Link;

  // Exact match pour la home, préfixe pour les autres
  const isActive = !isHash && (to === '/' ? pathname === '/' : pathname.startsWith(to));

  return (
    <Component
      to={to}
      onClick={onClick}
      className={cn(
        'uppercase tracking-wider text-sm transition-colors duration-300',
        mobile
          ? cn(
              'block py-3 border-b border-gray-100',
              isActive ? 'text-sage-600 font-medium' : 'text-stone-700'
            )
          : cn(
              isActive
                ? 'text-sage-600 border-b border-sage-400 pb-0.5'
                : 'text-stone-700 hover:text-sage-600'
            )
      )}
    >
      {children}
    </Component>
  );
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Bar - Contact Info */}
      <div className="bg-white border-b border-gray-100 py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-xs text-stone-600 font-sans tracking-wide">
          <div className="flex space-x-6">
            <a
              href="tel:0689408566"
              className="flex items-center hover:text-sage-600 transition-colors"
            >
              <Phone className="w-3 h-3 mr-2" /> 06 89 40 85 66
            </a>
            <a
              href="mailto:maisonmikasa@gmail.com"
              className="flex items-center hover:text-sage-600 transition-colors"
            >
              <Mail className="w-3 h-3 mr-2" /> maisonmikasa@gmail.com
            </a>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/maisonmikasa/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-3 h-3 hover:text-sage-600"
              aria-label="Visiter la page Facebook de Maison Mikasa"
            >
              <IconFacebook />
            </a>
            <a
              href="https://www.instagram.com/maisonmikasa/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-3 h-3 hover:text-sage-600"
              aria-label="Visiter la page Instagram de Maison Mikasa"
            >
              <IconInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/laurine-fourcherot/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-3 h-3 hover:text-sage-600"
              aria-label="Visiter la page LinkedIn de Maison Mikasa"
            >
              <IconLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header
        className={cn(
          'sticky top-0 z-50 bg-white transition-all duration-300',
          scrolled ? 'shadow-md py-2' : 'py-6'
        )}
      >
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center justify-between" aria-label="Navigation principale">
            {/* Logo Left */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex flex-col items-start group">
                <div
                  className={cn(
                    'flex flex-col items-start transition-all duration-300 origin-left',
                    scrolled ? 'scale-90' : 'scale-100'
                  )}
                >
                  <div className="font-serif text-sage-600 font-bold leading-none">
                    <span className="text-2xl md:text-3xl">Maison Mikasa</span>
                  </div>
                  <span
                    className={cn(
                      'text-[0.6rem] md:text-[0.65rem] font-bold uppercase tracking-[0.25em] text-sage-600 mt-1.5 font-sans pl-0.5 transition-all duration-300',
                      scrolled ? 'opacity-0 h-0 overflow-hidden mt-0' : 'opacity-100'
                    )}
                  >
                    Architecte d'intérieur
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Menu - Right */}
            <div className="hidden lg:flex items-center space-x-8">
              <NavLink to="/">Accueil</NavLink>
              <NavLink to="/a-propos">À propos</NavLink>
              <NavLink to="/prestations">Prestations</NavLink>

              {/* Dropdown for Réalisations */}
              <div className="relative group">
                <Link
                  to="/realisations"
                  className={cn(
                    'flex items-center uppercase tracking-wider text-sm transition-colors duration-300 py-4',
                    pathname.startsWith('/realisations')
                      ? 'text-sage-600'
                      : 'text-stone-700 hover:text-sage-600'
                  )}
                >
                  Réalisations{' '}
                  <ChevronDown className="w-3 h-3 ml-1 group-hover:rotate-180 transition-transform duration-300" />
                </Link>
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-48">
                  <div className="bg-white shadow-lg border-t-2 border-sage-500 rounded-b-sm py-2 flex flex-col">
                    <Link
                      to="/realisations/maison"
                      className="px-6 py-3 text-sm text-stone-600 hover:text-sage-600 hover:bg-stone-50 transition-colors text-center uppercase tracking-wider"
                    >
                      Maisons
                    </Link>
                    <Link
                      to="/realisations/appartement"
                      className="px-6 py-3 text-sm text-stone-600 hover:text-sage-600 hover:bg-stone-50 transition-colors text-center uppercase tracking-wider"
                    >
                      Appartements
                    </Link>
                    <Link
                      to="/realisations/professionnel"
                      className="px-6 py-3 text-sm text-stone-600 hover:text-sage-600 hover:bg-stone-50 transition-colors text-center uppercase tracking-wider"
                    >
                      Professionnels
                    </Link>
                    <div className="border-t border-gray-100 mt-1 mx-4"></div>
                    <Link
                      to="/realisations"
                      className="px-6 py-3 text-xs text-stone-400 hover:text-sage-600 transition-colors text-center uppercase tracking-widest"
                    >
                      Tout voir
                    </Link>
                  </div>
                </div>
              </div>

              <NavLink to="/contact">Contact</NavLink>
              <Link
                to="/rendez-vous"
                className={cn(
                  'inline-flex items-center bg-sage-600 text-white px-4 py-2 uppercase tracking-widest text-[10px] font-bold hover:bg-sage-700 transition-colors rounded-sm shadow-sm',
                  'whitespace-nowrap'
                )}
              >
                <CalendarDays className="w-3 h-3 mr-1.5" />
                Rendez-vous
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-stone-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </nav>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          id="mobile-navigation"
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300 ease-in-out',
            isMenuOpen ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="px-6 py-4 bg-white border-t border-gray-100 flex flex-col">
            <NavLink to="/" mobile onClick={() => setIsMenuOpen(false)}>
              Accueil
            </NavLink>
            <NavLink to="/a-propos" mobile onClick={() => setIsMenuOpen(false)}>
              À propos
            </NavLink>
            <NavLink to="/prestations" mobile onClick={() => setIsMenuOpen(false)}>
              Prestations
            </NavLink>

            <div className="border-b border-gray-100 py-3">
              <span className="block uppercase tracking-wider text-sm text-stone-700 mb-3">
                Réalisations
              </span>
              <div className="pl-4 flex flex-col space-y-3">
                <Link
                  to="/realisations/maison"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm text-stone-500 hover:text-sage-600 uppercase tracking-widest flex items-center"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-sage-200 mr-2"></span>Maisons
                </Link>
                <Link
                  to="/realisations/appartement"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm text-stone-500 hover:text-sage-600 uppercase tracking-widest flex items-center"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-sage-200 mr-2"></span>Appartements
                </Link>
                <Link
                  to="/realisations/professionnel"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm text-stone-500 hover:text-sage-600 uppercase tracking-widest flex items-center"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-sage-200 mr-2"></span>Professionnels
                </Link>
                <Link
                  to="/realisations"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-xs text-stone-400 hover:text-stone-600 uppercase tracking-widest pl-3.5"
                >
                  Tout voir
                </Link>
              </div>
            </div>

            <NavLink to="/contact" mobile onClick={() => setIsMenuOpen(false)}>
              Contact
            </NavLink>

            <Link
              to="/rendez-vous"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center py-3 border-b border-gray-100 uppercase tracking-wider text-sm text-sage-600 font-medium"
            >
              <CalendarDays className="w-4 h-4 mr-2" />
              Rendez-vous
            </Link>

            {/* Infos contact dans le menu mobile */}
            <div className="pt-4 mt-2 border-t border-gray-100 space-y-3">
              <a
                href="tel:0689408566"
                className="flex items-center text-xs text-stone-500 hover:text-sage-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Phone className="w-3 h-3 mr-2" /> 06 89 40 85 66
              </a>
              <a
                href="mailto:maisonmikasa@gmail.com"
                className="flex items-center text-xs text-stone-500 hover:text-sage-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Mail className="w-3 h-3 mr-2" /> maisonmikasa@gmail.com
              </a>
            </div>
          </div>
        </div>
      </header>

      <main key={pathname} className="flex-grow page-transition-enter">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="font-serif text-sm italic text-stone-700 mb-6">
            Suivez Maison Mikasa sur les réseaux !
          </p>
          <div className="flex justify-center space-x-6 mb-12">
            <a
              href="https://www.facebook.com/maisonmikasa/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-5 h-5 text-stone-600 hover:text-sage-600 transition-transform hover:-translate-y-1 duration-300"
              aria-label="Visiter la page Facebook de Maison Mikasa"
            >
              <IconFacebook />
            </a>
            <a
              href="https://www.instagram.com/maisonmikasa/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-5 h-5 text-stone-600 hover:text-sage-600 transition-transform hover:-translate-y-1 duration-300"
              aria-label="Visiter la page Instagram de Maison Mikasa"
            >
              <IconInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/laurine-fourcherot/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-5 h-5 text-stone-600 hover:text-sage-600 transition-transform hover:-translate-y-1 duration-300"
              aria-label="Visiter la page LinkedIn de Maison Mikasa"
            >
              <IconLinkedin />
            </a>
          </div>

          {/* Footer CTA */}
          <div className="mb-12 pt-10 border-t border-gray-100">
            <p className="font-serif text-2xl md:text-3xl text-stone-800 mb-3 leading-snug">
              Envie de transformer votre intérieur&nbsp;?
            </p>
            <p className="text-stone-500 font-light text-sm mb-8 max-w-md mx-auto">
              Discutons de votre projet. Premier échange gratuit et sans engagement.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center bg-sage-600 text-white px-8 py-3.5 uppercase tracking-widest text-[10px] font-bold hover:bg-sage-700 transition-colors rounded-sm shadow-sm"
            >
              Prendre contact <ArrowRight className="w-3 h-3 ml-2" />
            </Link>
          </div>

          <nav
            aria-label="Navigation secondaire"
            className="grid grid-cols-1 md:grid-cols-4 gap-8 text-xs text-stone-600 uppercase tracking-widest border-t border-gray-100 pt-8"
          >
            <Link to="/mentions-legales" className="hover:text-stone-800">
              Mentions légales
            </Link>
            <a href="tel:0689408566" className="hover:text-stone-800">
              06 89 40 85 66
            </a>
            <a href="mailto:maisonmikasa@gmail.com" className="hover:text-stone-800 lowercase">
              maisonmikasa@gmail.com
            </a>
            <span>56870 Baden</span>
          </nav>

          <div className="mt-8 text-[10px] text-stone-500">
            © {new Date().getFullYear()} • Maison Mikasa
          </div>
        </div>
      </footer>

      {/* Bouton scroll-to-top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Retour en haut de page"
        className={cn(
          'scroll-to-top-btn fixed bottom-8 right-6 z-50 w-10 h-10 bg-stone-800 text-white rounded-sm flex items-center justify-center hover:bg-sage-600 transition-colors shadow-lg',
          showScrollTop ? 'visible-btn' : 'hidden-btn'
        )}
      >
        <ChevronDown className="w-5 h-5 rotate-180" aria-hidden="true" />
      </button>
    </div>
  );
};

export default Layout;
