import type { Offer } from '../components/ui/OfferRow';

/**
 * Contenu de la page /professionnels. Une seule source pour la page, son formulaire de
 * devis et ses données structurées.
 *
 * À faire valider par Laurine avant mise en ligne : PRO_DIAGNOSTIC_PRICE, le forfait
 * « Dossiers réglementaires » (périmètre ERP compris), la réponse sur les honoraires
 * et la mention de TVA (HT, ou « TVA non applicable, art. 293 B du CGI »).
 */

/** Tarif HT du Diagnostic Pro, déduit si la conception suit. */
export const PRO_DIAGNOSTIC_PRICE = 390;
/** Forfait HT d'entrée des dossiers réglementaires (déclaration préalable façade/enseigne). */
export const PRO_DOSSIER_PRICE = 350;

export interface ProSector {
  /** Ancre sur /professionnels aujourd'hui, slug d'une future page /professionnels/:id. */
  id: string;
  label: string;
  examples: string[];
  challenges: string;
  /** Projets du portfolio à mettre en avant pour ce secteur. */
  projectIds?: string[];
}

export const PRO_SECTORS: ProSector[] = [
  {
    id: 'restauration',
    label: 'Restauration & bars',
    examples: ['Restaurant', 'Brasserie', 'Crêperie', 'Bar, licence IV', 'Café', 'Bar à vins'],
    challenges:
      "Une salle où l'on se sent bien et que l'on a envie de photographier, une circulation de service fluide, une acoustique maîtrisée, un comptoir pensé pour le travail et une cuisine organisée en marche en avant.",
    projectIds: ['pro-1'],
  },
  {
    id: 'hebergement',
    label: 'Hôtellerie & hébergement',
    examples: ['Hôtel', "Chambres d'hôtes", 'Gîte', 'Camping', 'Meublé de tourisme'],
    challenges:
      'Des chambres qui donnent envie de réserver, des matériaux qui résistent aux rotations et se nettoient vite, un accueil soigné, et un aménagement qui tient compte du classement visé.',
  },
  {
    id: 'commerce',
    label: 'Commerces & boutiques',
    examples: ['Boutique', 'Épicerie fine', 'Cave', 'Concept store', 'Showroom'],
    challenges:
      'Une devanture qui arrête le regard, un parcours client clair, des produits mis en valeur par la lumière et un mobilier de présentation qui évolue avec les saisons.',
    projectIds: ['pro-1'],
  },
  {
    id: 'beaute',
    label: 'Beauté & bien-être',
    examples: ['Salon de coiffure', 'Institut de beauté', 'Spa', 'Barbier', 'Onglerie'],
    challenges:
      "Des postes de travail ergonomiques, des points d'eau et une ventilation bien placés, l'intimité des cabines et une ambiance apaisante, avec des matériaux faciles à entretenir.",
  },
  {
    id: 'sante',
    label: 'Santé & cabinets',
    examples: ['Cabinet médical', 'Cabinet dentaire', 'Kinésithérapeute', 'Paramédical'],
    challenges:
      "Un accès conforme pour les personnes à mobilité réduite, une salle d'attente rassurante, la confidentialité acoustique des consultations et des surfaces adaptées aux exigences d'hygiène.",
  },
  {
    id: 'investisseurs',
    label: 'Location meublée & SCI',
    examples: ['Location meublée (LMNP)', 'Location saisonnière', 'SCI', 'Immeuble de rapport'],
    challenges:
      'Un bien qui se loue vite et au bon prix : agencement optimisé, équipements obligatoires du meublé, matériaux durables et une décoration qui ressort sur les photos des annonces.',
  },
];

export const PRO_CHALLENGES: string[] = [
  "Tenir la date d'ouverture : le planning se construit à rebours, et chaque semaine de fermeture compte.",
  "Intégrer la réglementation des établissements recevant du public (accessibilité, sécurité incendie) dès les premiers plans, plutôt qu'à la fin.",
  'Traduire votre identité en lieu : une ambiance cohérente avec votre carte, vos produits ou vos soins, et que vos clients reconnaissent.',
  "Organiser les flux : ceux des clients, ceux de l'équipe, ceux des livraisons, pour travailler vite et sans se gêner.",
  'Choisir des matériaux à la hauteur : passage, nettoyage quotidien, humidité, durée de vie.',
  'Maîtriser le budget : investir là où vos clients le voient et le ressentent, rester sobre ailleurs.',
];

const offerCta = (id: string) => `/professionnels?prestation=${id}#devis`;

export const PRO_OFFERS: Offer[] = [
  {
    id: 'diagnostic',
    title: 'Le Diagnostic Pro',
    tagline: 'Savoir où vous allez avant de signer les devis.',
    description:
      'Une visite de 2 heures dans votre local, actuel ou pressenti, pour évaluer son potentiel et ses contraintes. Idéal avant un bail, un rachat de fonds ou une rénovation. Vous recevez sous 48h un book de recommandations pour décider en connaissance de cause.',
    missions: [
      {
        label: 'Visite et analyse',
        desc: 'Vos besoins, votre clientèle, vos flux de travail ; les volumes, la lumière, les réseaux et les points techniques du local.',
      },
      {
        label: 'Premier point réglementaire',
        desc: 'Accessibilité, sécurité incendie, démarches à prévoir en mairie (autorisation de travaux, devanture, enseigne).',
      },
      {
        label: 'Book sous 48h',
        desc: "Pistes d'agencement, ambiance, priorités de travaux et première estimation budgétaire.",
      },
    ],
    priceLabel: 'Tarif',
    price: `${PRO_DIAGNOSTIC_PRICE} € HT`,
    note: 'Ce montant est intégralement déduit de la prestation si nous poursuivons ensemble sur la conception.',
    cta: 'Demander mon diagnostic',
    ctaTo: offerCta('diagnostic'),
  },
  {
    id: 'conception',
    title: "Conception de l'établissement",
    tagline: 'Un lieu à votre image, pensé pour bien travailler.',
    description:
      "Je conçois l'aménagement complet de votre établissement : l'agencement, l'ambiance, le mobilier sur-mesure et les plans techniques nécessaires aux artisans. Votre identité devient un lieu cohérent, de la devanture au dernier luminaire.",
    missionsLabel: 'Missions à la carte, complètes ou partielles',
    missions: [
      {
        label: 'Étude & Esquisse (APS)',
        desc: "Relevé de l'existant, propositions d'aménagement 2D/3D, planches d'ambiance et estimation budgétaire.",
      },
      {
        label: 'Conception (APD)',
        desc: 'Plan définitif, plans techniques (électricité, plomberie, éclairage) et intégration des règles ERP.',
      },
      {
        label: 'Mobilier sur-mesure',
        desc: "Comptoir, bar, banque d'accueil, présentoirs, rangements : dessinés pour vos usages et fabriqués par des artisans.",
      },
      {
        label: 'Sourcing',
        desc: 'Matériaux, revêtements, assises, luminaires et décoration, choisis pour durer en usage intensif.',
      },
    ],
    priceLabel: 'Tarif',
    price: 'Sur devis',
    cta: 'Demander un devis',
    ctaTo: offerCta('conception'),
  },
  {
    id: 'chantier',
    title: 'Suivi de chantier & ouverture',
    tagline: "Des travaux coordonnés jusqu'au jour J.",
    description:
      "Je pilote les entreprises pour que vous puissiez vous concentrer sur votre activité. Le planning part de votre date d'ouverture, et les travaux peuvent être organisés pendant vos périodes de fermeture.",
    missionsLabel: 'Missions à la carte, complètes ou partielles',
    missions: [
      {
        label: 'Consultation des artisans',
        desc: 'Appel aux entreprises locales, comparaison des devis et aide au choix.',
      },
      {
        label: 'Planning à rebours',
        desc: "Calendrier construit depuis la date d'ouverture, phasage si l'activité continue pendant les travaux.",
      },
      {
        label: 'Coordination et réunions de chantier',
        desc: 'Réunions hebdomadaires, suivi de la qualité et du budget, compte-rendu après chaque visite.',
      },
      {
        label: 'Réception et mise en place',
        desc: 'Réception des travaux, levée des réserves, installation du mobilier et de la décoration avant l’ouverture.',
      },
    ],
    priceLabel: 'Tarif',
    price: 'Sur devis',
    cta: 'Planifier mon ouverture',
    ctaTo: offerCta('chantier'),
  },
  {
    id: 'ameublement',
    title: 'Ameublement & mise en location',
    tagline: 'Un hébergement prêt à accueillir, clés en main.',
    description:
      "Pour les hôtels, chambres d'hôtes, gîtes et locations meublées : je sélectionne, commande et installe tout ce qu'il faut pour accueillir vos premiers clients, avec une décoration qui fait la différence sur les plateformes de réservation.",
    missions: [
      {
        label: 'Liste d’équipement complète',
        desc: 'Mobilier, literie, linge, vaisselle, luminaires : tout ce qu’exige un meublé ou le classement visé.',
      },
      {
        label: 'Commandes et réception',
        desc: 'Commandes groupées, suivi des livraisons et réception sur place, même en votre absence.',
      },
      {
        label: 'Installation et mise en scène',
        desc: 'Montage, accrochage, décoration : le lieu est prêt pour les photos des annonces.',
      },
    ],
    priceLabel: 'Tarif',
    price: 'Sur devis',
    cta: 'Équiper mon hébergement',
    ctaTo: offerCta('ameublement'),
  },
  {
    id: 'dossiers',
    title: 'Dossiers réglementaires',
    tagline: 'Des démarches en règle, sans y passer vos soirées.',
    description:
      "Je prépare les pièces graphiques et les formulaires des démarches liées à votre local : modification de devanture ou de façade, enseigne, et autorisation de travaux pour l'aménagement d'un établissement recevant du public.",
    missions: [
      {
        label: 'Déclaration préalable',
        desc: 'Modification de façade ou de devanture : plans, insertions et formulaires Cerfa pour la mairie.',
      },
      {
        label: 'Autorisation de travaux ERP',
        desc: "Plans et notices d'accessibilité et de sécurité incendie pour l'aménagement de votre établissement.",
      },
      {
        label: 'Suivi du dossier',
        desc: "Échanges avec les services instructeurs jusqu'à l'obtention de l'accord.",
      },
    ],
    priceLabel: 'Forfait',
    price: `Dès ${PRO_DOSSIER_PRICE} € HT`,
    note: "Autorisation de travaux ERP : sur devis, selon la surface et la catégorie de l'établissement.",
    cta: 'Confier mon dossier',
    ctaTo: offerCta('dossiers'),
  },
];

export const PRO_STEPS = [
  {
    title: 'Appel découverte',
    desc: '20 minutes, gratuit : votre activité, votre local, votre calendrier.',
  },
  {
    title: 'Diagnostic sur place',
    desc: 'Visite du local et book de recommandations sous 48h.',
  },
  {
    title: 'Conception & devis',
    desc: 'Plans, ambiance, mobilier sur-mesure et consultation des artisans.',
  },
  {
    title: 'Travaux',
    desc: 'Coordination des entreprises, planning tenu, budget suivi.',
  },
  {
    title: 'Ouverture',
    desc: 'Installation, derniers réglages et accueil de vos premiers clients.',
  },
];

export const PRO_FAQ: { q: string; a: string }[] = [
  {
    q: 'Comment sont calculés vos honoraires pour un local professionnel ?',
    a: "Après l'appel découverte ou le Diagnostic Pro, je vous remets un devis détaillé au forfait, établi selon la surface, la nature du projet et les missions retenues (conception seule, ou conception et suivi de chantier). Vous savez dès le départ ce que vous payez, sans surprise en fin de chantier.",
  },
  {
    q: 'Combien de temps faut-il prévoir avant l’ouverture ?',
    a: "Cela dépend de la surface et de l'ampleur des travaux. À titre d'exemple, la rénovation complète d'une cave et bar à vins de 60 m² à Plumelec a pris 3 mois, et le client a pu ouvrir à la date prévue. Contactez-moi le plus tôt possible : idéalement avant de signer le bail ou l'acte de cession.",
  },
  {
    q: 'Mon local reçoit du public : quelles règles s’appliquent ?',
    a: "Un commerce, un restaurant, un hébergement ou un cabinet est un établissement recevant du public (ERP). Son aménagement doit respecter les règles d'accessibilité aux personnes handicapées et de sécurité incendie, et les travaux sont soumis à une autorisation déposée en mairie. J'intègre ces contraintes dès les premiers plans et je peux préparer le dossier.",
  },
  {
    q: 'Peut-on faire les travaux sans fermer mon établissement ?',
    a: "Souvent, oui. Les travaux peuvent être phasés, regroupés sur une fermeture annuelle ou hors saison, ou organisés pour que les interventions bruyantes aient lieu en dehors des heures d'ouverture. On en parle dès le diagnostic pour construire le planning.",
  },
  {
    q: 'Puis-je vous confier seulement la conception ?',
    a: 'Oui. Les missions sont à la carte : vous pouvez me confier uniquement les plans et la sélection des matériaux et du mobilier, puis mener les travaux avec vos propres artisans. Je peux aussi intervenir ponctuellement en cours de chantier.',
  },
  {
    q: "Vous occupez-vous de la licence IV ou de l'identité visuelle ?",
    a: "La licence et le permis d'exploitation relèvent de vos démarches, et le logo d'un graphiste. Mon rôle est de traduire votre concept et votre identité dans le lieu : le bar, la salle, la lumière, les matériaux, la devanture. Je travaille volontiers avec votre graphiste.",
  },
  {
    q: 'Accompagnez-vous les investisseurs en location meublée ?',
    a: "Oui : pour une location meublée, un gîte ou un bien détenu en SCI, je conçois un aménagement optimisé et durable, je fournis la liste complète de l'équipement obligatoire et je peux tout commander et installer, même si vous ne vivez pas sur place.",
  },
  {
    q: 'Où intervenez-vous ?',
    a: "Je suis basée à Baden et j'interviens à Vannes, Auray, dans tout le Golfe du Morbihan et plus largement dans le Morbihan. Pour un projet professionnel plus éloigné en Bretagne, parlons-en lors de l'appel découverte.",
  },
];
