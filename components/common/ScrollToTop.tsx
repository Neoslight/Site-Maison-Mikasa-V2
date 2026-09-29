import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Au changement de route : remonte en haut de page, ou fait défiler jusqu'à
 * l'ancre (#…) si l'URL en contient une. Le décalage du header fixe est géré
 * par scroll-padding-top (index.css).
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }
    // Laisse la nouvelle page se rendre avant de chercher la cible
    const frame = requestAnimationFrame(() => {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}
