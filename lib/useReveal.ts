import { useEffect, useRef } from 'react';

/**
 * Ajoute .is-visible à l'élément quand il entre dans le viewport (une seule fois).
 * Passe par classList plutôt que par un state React : aucun re-render et
 * le markup hydraté reste identique au HTML prérendu.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible');
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
