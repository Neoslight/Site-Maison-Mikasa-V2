/** Coordonnées affichées sur le site — une seule source pour Layout, Contact, Mentions légales. */
export const PHONE = '06 89 40 85 66';
export const PHONE_HREF = 'tel:0689408566';
export const EMAIL = 'maisonmikasa@gmail.com';
export const EMAIL_HREF = `mailto:${EMAIL}`;
export const ADDRESS = '56870 Baden, Morbihan';
export const OPENING_HOURS = 'Lundi – Vendredi : 9h00 – 18h00';

/**
 * Fiche Google Business Profile. Tant qu'un champ est vide (ou null), l'élément
 * correspondant n'est pas affiché : liens « Avis Google », note sous les témoignages,
 * `sameAs`/`hasMap` du schema.
 */
export const GOOGLE_BUSINESS: {
  /** Lien de la fiche (Google Maps), ex. https://www.google.com/maps?cid=… */
  profileUrl: string;
  /** Lien direct « Laisser un avis » fourni par la fiche, ex. https://g.page/r/…/review */
  reviewUrl: string;
  /** Note moyenne et nombre d'avis affichés sur la fiche, à recopier à la main. */
  rating: number | null;
  reviewCount: number | null;
} = {
  // Lien canonique (cid) plutôt que le lien court maps.app.goo.gl/u6FQJbCUowEz59k36.
  profileUrl: 'https://www.google.com/maps?cid=13131671990571886404',
  reviewUrl: 'https://g.page/r/CUTn-9AZEj22EAE/review',
  // Relevé le 07/10/2026 — à mettre à jour une fois par mois.
  rating: 5,
  reviewCount: 7,
};

export const SOCIALS = {
  instagram: 'https://www.instagram.com/maisonmikasa/',
  facebook: 'https://www.facebook.com/maisonmikasa/',
  linkedin: 'https://www.linkedin.com/in/laurine-fourcherot/',
} as const;
