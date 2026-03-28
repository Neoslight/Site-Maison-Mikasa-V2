import { Project } from '../types';

export const projectsData: Project[] = [
  // ─── APPARTEMENTS ──────────────────────────────────────────────────────────
  {
    id: 'app-1',
    title: 'Appartement sur le Port',
    projectType: 'Appartement',
    category: 'Rénovation complète',
    location: 'Vannes - Le Port',
    year: '2022',
    surface: '72m²',
    duration: '4 mois',
    coverImage: '/tassigny/tassigny-cover.webp',
    gallery: [
      '/tassigny/tassigny-cover.webp',
      '/tassigny/tassigny-planche-d-inspiration.webp',
      '/tassigny/tassigny-panorama.webp',
      '/tassigny/tassigny-zoom-1.webp',
      '/tassigny/tassigny-zoom-2.webp',
      '/tassigny/tassigny-zoom-3.webp',
      '/tassigny/tassigny-zoom-4.webp',
      '/tassigny/tassigny-zoom-5.webp',
    ],
    beforeAfterGallery: [
      { before: '/tassigny/tassigny-avant-1.webp', after: '/tassigny/tassigny-apres-1.webp' },
      { before: '/tassigny/tassigny-avant-2.webp', after: '/tassigny/tassigny-apres-2.webp' },
      { before: '/tassigny/tassigny-avant-3.webp', after: '/tassigny/tassigny-apres-3.webp' },
      { before: '/tassigny/tassigny-avant-4.webp', after: '/tassigny/tassigny-apres-4.webp' },
      { before: '/tassigny/tassigny-avant-5.webp', after: '/tassigny/tassigny-apres-5.webp' },
    ],
    description:
      "Rénovation complète et ameublement d'un T4 sur le port de Vannes pour un couple de retraités. L'objectif était de transformer un intérieur daté en un lieu de vie chaleureux, fonctionnel et baigné de lumière.",
    challenge:
      "L'appartement d'origine était très cloisonné : une cuisine \"couloir\" isolée, trois chambres en enfilade peu pratiques et une unique salle de bain pour l'ensemble du logement.",
    solution:
      "Nous avons abattu la cloison entre la cuisine et le séjour pour créer une vaste pièce de vie traversante, offrant une circulation fluide et une vue dégagée sur le port. La fusion de deux chambres a permis l'aménagement d'une véritable suite parentale avec dressing et salle d'eau privative. Enfin, l'installation d'un parquet massif et d'un nouveau mobilier apporte une chaleur naturelle et une identité visuelle cohérente à l'ensemble du projet.",
  },
  // TODO: Remplacer les images picsum.photos et le contenu placeholder
  {
    id: 'app-2',
    title: 'Appartement de caractère',
    projectType: 'Appartement',
    category: 'Rénovation complète',
    location: 'Vannes - Centre-Ville',
    year: '2025',
    surface: '86m²',
    duration: '6 mois',
    coverImage: 'https://picsum.photos/id/42/1920/1080',
    gallery: [
      'https://picsum.photos/id/42/800/1000',
      'https://picsum.photos/id/48/800/600',
      'https://picsum.photos/id/56/800/1000',
      'https://picsum.photos/id/60/800/600',
    ],
    description:
      "Rénovation, optimisation et ameublement d'un appartement sous les toits en centre-ville pour un jeune couple. L'objectif : repenser l'accès à la mezzanine, maximiser les rangements dans ce volume atypique et créer un espace de vie lumineux et convivial.",
    challenge:
      "Une configuration complexe marquée par des chambres en enfilade, un escalier mal positionné et des dénivelés de sol qui fragmentaient l'espace. L'omniprésence de teintes sombres venait également étouffer les volumes sous pente.",
    solution:
      "Nous avons restructuré la circulation en créant un nouvel escalier avec rangements intégrés et un palier desservant désormais les chambres de manière indépendante. Le sol a été entièrement mis à niveau et unifié par un revêtement aspect bois, tandis qu'un îlot dînatoire et un bureau sur mesure ont été dessinés pour optimiser chaque angle baigné de lumière naturelle. L'ensemble a été traité dans des teintes claires et des matières naturelles pour transformer cet espace sous les toits en un cocon cosy, fonctionnel et parfaitement adapté pour recevoir.",
  },
  // TODO: Remplacer les images picsum.photos et le contenu placeholder
  {
    id: 'app-3',
    title: 'Cocon sur le Port',
    projectType: 'Appartement',
    category: 'Optimisation',
    location: 'Vannes - Le Port',
    year: '2025',
    surface: '39m²',
    duration: '1 mois',
    coverImage: 'https://picsum.photos/id/78/1920/1080',
    gallery: [
      'https://picsum.photos/id/78/800/600',
      'https://picsum.photos/id/80/800/1000',
      'https://picsum.photos/id/82/800/600',
      'https://picsum.photos/id/85/800/1000',
    ],
    description:
      "Optimisation et aménagement d'une cuisine sur mesure pour créer un espace de vie fonctionnel et cosy.",
    challenge:
      "Une surface très restreinte et mal agencée, rendant l'installation d'une cuisine équipée initialement complexe.",
    solution:
      "Nous avons conçu une implantation en L, optimisée au millimètre pour intégrer tout l'électroménager et un maximum de rangements. Cet agencement sur mesure libère la circulation tout en apportant une ambiance chaleureuse, transformant ce petit espace technique en un coin pratique et agréable au quotidien.",
  },

  // ─── MAISONS ───────────────────────────────────────────────────────────────
  // TODO: Remplacer les images picsum.photos et le contenu placeholder
  {
    id: 'mai-1',
    title: 'Maison de Famille',
    projectType: 'Maison',
    category: 'Aménagement et décoration',
    location: 'Baden',
    coverImage: 'https://picsum.photos/id/120/1920/1080',
    gallery: [
      'https://picsum.photos/id/120/800/600',
      'https://picsum.photos/id/126/800/1000',
      'https://picsum.photos/id/129/800/600',
      'https://picsum.photos/id/132/800/1000',
    ],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.',
    challenge: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    solution:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor.',
  },
  // TODO: Remplacer les images picsum.photos et le contenu placeholder
  {
    id: 'mai-2',
    title: 'Ancienne ferme de campagne',
    projectType: 'Maison',
    category: 'Aménagement et décoration',
    location: 'Sérent',
    year: '2026',
    duration: '1 mois',
    coverImage: 'https://picsum.photos/id/164/1920/1080',
    gallery: [
      'https://picsum.photos/id/164/800/1000',
      'https://picsum.photos/id/175/800/600',
      'https://picsum.photos/id/180/800/1000',
      'https://picsum.photos/id/190/800/600',
    ],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.',
    challenge: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    solution:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor.',
  },
  // TODO: Remplacer les images picsum.photos et le contenu placeholder
  {
    id: 'mai-3',
    title: "Maison de pêcheur sur l'Île-aux-Moines",
    projectType: 'Maison',
    category: 'Rénovation partielle',
    location: 'Île-aux-Moines',
    year: '2024',
    surface: '120m²',
    duration: '3 mois',
    coverImage: 'https://picsum.photos/id/201/1920/1080',
    gallery: [
      'https://picsum.photos/id/201/800/600',
      'https://picsum.photos/id/203/800/1000',
      'https://picsum.photos/id/204/800/600',
      'https://picsum.photos/id/206/800/1000',
    ],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.',
    challenge: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    solution:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor.',
  },
  // TODO: Remplacer les images picsum.photos et le contenu placeholder
  {
    id: 'mai-4',
    title: "Maison bretonne sur l'Île d'Arz",
    projectType: 'Maison',
    category: 'Rénovation complète',
    location: 'Baden',
    year: '2023',
    duration: '5 mois',
    coverImage: 'https://picsum.photos/id/210/1920/1080',
    gallery: [
      'https://picsum.photos/id/210/800/600',
      'https://picsum.photos/id/211/800/1000',
      'https://picsum.photos/id/212/800/600',
      'https://picsum.photos/id/213/800/1000',
    ],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.',
    challenge: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    solution:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor.',
  },
  // TODO: Remplacer les images picsum.photos et le contenu placeholder
  {
    id: 'mai-5',
    title: 'Maison du Bonheur',
    projectType: 'Maison',
    category: 'Optimisation et aménagement',
    location: 'Baden',
    year: '2023',
    surface: '130m²',
    duration: '2 mois',
    coverImage: 'https://picsum.photos/id/220/1920/1080',
    gallery: [
      'https://picsum.photos/id/220/800/600',
      'https://picsum.photos/id/221/800/1000',
      'https://picsum.photos/id/222/800/600',
      'https://picsum.photos/id/223/800/1000',
    ],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.',
    challenge: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    solution:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor.',
  },
  // TODO: Remplacer les images picsum.photos et le contenu placeholder
  {
    id: 'mai-6',
    title: 'Maison de pêcheur rénovée',
    projectType: 'Maison',
    category: 'Optimisation et aménagement',
    location: 'Saint-Armel',
    year: '2025',
    surface: '25m²',
    duration: '4 mois',
    coverImage: 'https://picsum.photos/id/230/1920/1080',
    gallery: [
      'https://picsum.photos/id/230/800/600',
      'https://picsum.photos/id/231/800/1000',
      'https://picsum.photos/id/232/800/600',
      'https://picsum.photos/id/233/800/1000',
    ],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.',
    challenge: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    solution:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor.',
  },
  // TODO: Remplacer les images picsum.photos et le contenu placeholder
  {
    id: 'mai-7',
    title: 'Maison au Coeur du Marais',
    projectType: 'Maison',
    category: 'Rénovation complète',
    location: 'Larmor-Baden',
    surface: '70m²',
    duration: '1 an',
    coverImage: 'https://picsum.photos/id/240/1920/1080',
    gallery: [
      'https://picsum.photos/id/240/800/600',
      'https://picsum.photos/id/241/800/1000',
      'https://picsum.photos/id/242/800/600',
      'https://picsum.photos/id/243/800/1000',
    ],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.',
    challenge: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    solution:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor.',
  },
  // TODO: Remplacer les images picsum.photos et le contenu placeholder
  {
    id: 'mai-8',
    title: 'Cocon dans le Golfe',
    projectType: 'Maison',
    category: 'Aménagement et décoration',
    location: 'Saint-Avé',
    year: '2026',
    surface: '180m²',
    duration: '3 mois',
    coverImage: 'https://picsum.photos/id/250/1920/1080',
    gallery: [
      'https://picsum.photos/id/250/800/600',
      'https://picsum.photos/id/251/800/1000',
      'https://picsum.photos/id/252/800/600',
      'https://picsum.photos/id/253/800/1000',
    ],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.',
    challenge: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    solution:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor.',
  },
  // TODO: Remplacer les images picsum.photos et le contenu placeholder
  {
    id: 'mai-9',
    title: 'Villa Familiale',
    projectType: 'Maison',
    category: 'Rénovation complète',
    location: 'Caen',
    year: '2023',
    surface: '290m²',
    duration: '8 mois',
    coverImage: 'https://picsum.photos/id/260/1920/1080',
    gallery: [
      'https://picsum.photos/id/260/800/600',
      'https://picsum.photos/id/261/800/1000',
      'https://picsum.photos/id/262/800/600',
      'https://picsum.photos/id/263/800/1000',
    ],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.',
    challenge: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    solution:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor.',
  },

  // ─── PROFESSIONNEL ─────────────────────────────────────────────────────────
  {
    id: 'pro-1',
    title: 'Cave & Bar à Vin',
    projectType: 'Professionnel',
    category: 'Rénovation complète',
    location: 'Plumelec',
    year: '2024',
    surface: '60m²',
    duration: '3 mois',
    coverImage: '/petard/petard-zoom-2.webp',
    gallery: [
      '/petard/petard-zoom-1.webp',
      '/petard/petard-zoom-2.webp',
      '/petard/petard-zoom-3.webp',
      '/petard/petard-zoom-4.webp',
      '/petard/petard-zoom-5.webp',
      '/petard/petard-zoom-6.webp',
      '/petard/petard-zoom-7.webp',
      '/petard/petard-zoom-8.webp',
      '/petard/petard-zoom-9.webp',
    ],
    beforeAfterGallery: [
      { before: '/petard/petard-avant-1.webp', after: '/petard/petard-apres-1.webp' },
      { before: '/petard/petard-avant-2.webp', after: '/petard/petard-apres-2.webp' },
      { before: '/petard/petard-avant-3.webp', after: '/petard/petard-apres-3.webp' },
      { before: '/petard/petard-avant-4.webp', after: '/petard/petard-apres-4.webp' },
      { before: '/petard/petard-avant-5.webp', after: '/petard/petard-apres-5.webp' },
      { before: '/petard/petard-avant-6.webp', after: '/petard/petard-apres-6.webp' },
    ],
    description:
      "Rénovation d'un ancien bar pour le transformer en cave et bar à vins, avec la volonté de préserver l'authenticité et le cachet des lieux.",
    challenge:
      "Un espace qui avait perdu son identité et dont l'atmosphère était devenue impersonnelle et austère, manquant de la chaleur nécessaire à un lieu de dégustation.",
    solution:
      "Nous avons redonné vie au bar d'origine par un ponçage minutieux pour révéler sa patine naturelle, tout en réchauffant l'espace avec des matériaux nobles et des teintes ambrées. L'intégration d'un mobilier style brocante vient parfaire cette métamorphose, créant un cadre feutré et convivial qui invite désormais au partage et à la découverte.",
  },
];
