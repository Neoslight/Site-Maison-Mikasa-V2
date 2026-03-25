import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import {
  Menu,
  X,
  Phone,
  Mail,
  Instagram,
  Linkedin,
  Facebook,
  ChevronDown,
} from 'lucide-react';
import { cn } from '../../lib/utils';

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
  const Component = isHash ? HashLink : Link;

  return (
    <Component
      to={to}
      onClick={onClick}
      className={cn(
        'uppercase tracking-wider text-sm transition-colors duration-300',
        mobile
          ? 'block py-3 border-b border-gray-100 text-stone-700'
          : 'text-stone-700 hover:text-sage-600'
      )}
    >
      {children}
    </Component>
  );
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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
              href="#"
              onClick={(e) => e.preventDefault()}
              className="hover:text-sage-600"
              aria-label="Visiter la page Facebook de Maison Mikasa"
            >
              <Facebook className="w-3 h-3" aria-hidden="true" />
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="hover:text-sage-600"
              aria-label="Visiter la page Instagram de Maison Mikasa"
            >
              <Instagram className="w-3 h-3" aria-hidden="true" />
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="hover:text-sage-600"
              aria-label="Visiter la page LinkedIn de Maison Mikasa"
            >
              <Linkedin className="w-3 h-3" aria-hidden="true" />
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
                  className="flex items-center text-stone-700 hover:text-sage-600 uppercase tracking-wider text-sm transition-colors duration-300 py-4"
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
            isMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
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
          </div>
        </div>
      </header>

      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="font-serif text-sm italic text-stone-700 mb-6">
            Suivez Maison Mikasa sur les réseaux !
          </p>
          <div className="flex justify-center space-x-6 mb-12">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-stone-600 hover:text-sage-600 transition-transform hover:-translate-y-1 duration-300"
              aria-label="Visiter la page Facebook de Maison Mikasa"
            >
              <Facebook className="w-5 h-5" aria-hidden="true" />
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-stone-600 hover:text-sage-600 transition-transform hover:-translate-y-1 duration-300"
              aria-label="Visiter la page Instagram de Maison Mikasa"
            >
              <Instagram className="w-5 h-5" aria-hidden="true" />
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-stone-600 hover:text-sage-600 transition-transform hover:-translate-y-1 duration-300"
              aria-label="Visiter la page LinkedIn de Maison Mikasa"
            >
              <Linkedin className="w-5 h-5" aria-hidden="true" />
            </a>
          </div>

          <nav
            aria-label="Navigation secondaire"
            className="grid grid-cols-1 md:grid-cols-4 gap-8 text-xs text-stone-600 uppercase tracking-widest border-t border-gray-100 pt-8"
          >
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-stone-800">
              Mentions légales
            </a>
            <a href="tel:0689408566" className="hover:text-stone-800">
              06 89 40 85 66
            </a>
            <a href="mailto:maisonmikasa@gmail.com" className="hover:text-stone-800 lowercase">
              maisonmikasa@gmail.com
            </a>
            <span>56870 Baden</span>
          </nav>

          <div className="mt-8 text-[10px] text-stone-500">© 2025 • Maison Mikasa</div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
