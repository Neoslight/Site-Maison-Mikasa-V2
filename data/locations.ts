export interface LocationFaq {
  q: string;
  a: string;
}

export interface LocationSection {
  heading: string;
  body: string[];
}

export interface LocationPage {
  slug: string;
  path: string;
  city: string;
  /** Bare title, suffixed with " | Maison Mikasa" by data/routeMeta.ts. */
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  archi: LocationSection;
  deco: LocationSection;
  why: { heading: string; intro: string; items: string[] };
  /** Project ids from data/projects.ts to feature, whether truly local or nearby. */
  projectIds: string[];
  projectsHeading: string;
  faq: LocationFaq[];
  /** Project id whose cover image is reused for this page's OG image. Falls back to "home". */
  ogImageProjectId?: string;
}

/**
 * Maps a project's free-text `location` (e.g. "Vannes - Le Port", "Île-aux-Moines")
 * to the most relevant location page. Only Vannes has its own dedicated page today;
 * everything else in the Golfe falls back to the umbrella "Golfe du Morbihan" page.
 */
export function getLocationForProjectLocation(location: string): LocationPage | undefined {
  const normalized = location.toLowerCase();
  if (normalized.startsWith('vannes')) {
    return locationsData.find((l) => l.slug === 'vannes');
  }
  return locationsData.find((l) => l.slug === 'golfe-du-morbihan');
}

export const locationsData: LocationPage[] = [
  {
    slug: 'vannes',
    path: '/architecte-interieur-vannes',
    city: 'Vannes',
    metaTitle: "Architecte d'intérieur à Vannes",
    metaDescription:
      "Laurine Fourcherot, architecte d'intérieur et décoratrice à Vannes (56) : appartements du Port, centre historique, copropriétés. Conception sur-mesure.",
    h1: "Architecte d'intérieur à Vannes",
    intro:
      "Basée à Baden, à quelques minutes de Vannes, j'accompagne depuis plusieurs années des propriétaires du Port, de l'intra-muros et des quartiers résidentiels dans la rénovation de leur appartement ou de leur maison de ville. Vannes a ses contraintes propres — immeubles anciens, copropriétés, volumes parfois cloisonnés — que je connais bien pour les avoir déjà résolues.",
    archi: {
      heading: "Architecte d'intérieur à Vannes : conception et suivi de travaux",
      body: [
        "En centre-ville comme sur le Port, les appartements vannetais partagent souvent les mêmes défauts : cuisines fermées, chambres en enfilade, salles de bain sous-dimensionnées. Mon travail commence toujours par un relevé précis de l'existant et une étude de faisabilité qui tient compte des contraintes de copropriété (règlement, façades classées, réseaux communs).",
        "Je conçois ensuite des plans d'aménagement qui redistribuent la circulation, ouvrent les pièces de vie et créent du rangement sur-mesure — dressing, cuisine, bureau — pour des volumes souvent atypiques (sous les toits, en duplex, avec dénivelés). Je pilote enfin le chantier de A à Z : consultation des artisans locaux, coordination hebdomadaire et suivi jusqu'à la remise des clés.",
      ],
    },
    deco: {
      heading: "Décoration d'intérieur à Vannes",
      body: [
        "Au-delà des travaux, je m'occupe du sourcing complet : matériaux, mobilier, luminaires et textiles, sélectionnés pour composer une ambiance chaleureuse et cohérente, qu'il s'agisse de réveiller le charme de l'ancien ou de réchauffer un appartement récent.",
        "Pour les propriétaires qui n'ont pas besoin de travaux lourds, je propose aussi un accompagnement décoration seule : planches d'ambiance, choix des teintes et des matières, mise en valeur de la lumière et des volumes existants.",
      ],
    },
    why: {
      heading: 'Pourquoi faire appel à un architecte d’intérieur à Vannes ?',
      intro:
        "Entre le marché locatif tendu du centre-ville, les résidences secondaires du Port et les familles qui s'agrandissent, chaque projet vannetais a des enjeux différents. Un accompagnement sur-mesure permet de :",
      items: [
        'Optimiser des surfaces contraintes sans perdre en fonctionnalité',
        'Valoriser un bien avant une mise en location ou une revente sur un marché vannetais dynamique',
        'Composer avec le règlement de copropriété et les contraintes du bâti ancien',
        'Gagner du temps en centralisant la coordination des artisans',
      ],
    },
    projectIds: ['app-1', 'app-2'],
    projectsHeading: 'Nos réalisations à Vannes',
    faq: [
      {
        q: 'Intervenez-vous dans tous les quartiers de Vannes ?',
        a: "Oui, du Port à l'intra-muros en passant par Conleau et les quartiers résidentiels. Basée à Baden, je suis à moins de 15 minutes du centre-ville.",
      },
      {
        q: 'Travaillez-vous avec les règlements de copropriété ?',
        a: "Systématiquement. Avant toute esquisse, j'étudie le règlement de copropriété et, si nécessaire, je prépare les documents nécessaires à une déclaration préalable en mairie.",
      },
      {
        q: 'Proposez-vous un accompagnement pour un appartement locatif ou secondaire ?',
        a: "Oui. Pour les propriétaires qui ne vivent pas sur place, je peux piloter l'intégralité du projet à distance, du sourcing à la réception de chantier.",
      },
    ],
    ogImageProjectId: 'app-1',
  },
  {
    slug: 'golfe-du-morbihan',
    path: '/architecte-interieur-golfe-du-morbihan',
    city: 'Golfe du Morbihan',
    metaTitle: "Architecte d'intérieur dans le Golfe du Morbihan",
    metaDescription:
      "Laurine Fourcherot, architecte d'intérieur dans le Golfe du Morbihan : maisons de pêcheur, résidences secondaires, îles. Gestion de chantier à distance.",
    h1: "Architecte d'intérieur dans le Golfe du Morbihan",
    intro:
      "Le Golfe du Morbihan est mon terrain de jeu depuis la création de Maison Mikasa : maisons de pêcheur sur les îles, résidences secondaires en bord d'eau, longères rénovées dans les communes du pourtour. Basée à Baden, au cœur du Golfe, j'interviens sur l'ensemble du bassin — Vannes, Auray, Arradon, Larmor-Baden, Île-aux-Moines, Île d'Arz, Saint-Armel, Sarzeau — avec une même exigence : respecter l'âme des lieux tout en les rendant confortables au quotidien.",
    archi: {
      heading: 'Architecture d’intérieur dans le Golfe : composer avec le bâti littoral',
      body: [
        "Les maisons du Golfe partagent souvent une histoire commune : anciennes maisons de pêcheur ou de vacances, murs en pierre, charpentes basses, combles à investir. Mon rôle est de révéler leur potentiel sans en effacer le caractère — abattre une cloison pour faire entrer la lumière, ouvrir des combles avec une fenêtre de toit tournée vers l'eau, créer une suite parentale là où il n'y avait qu'un grenier.",
        "Pour les propriétaires d'une résidence secondaire ou d'un bien sur une île, je pilote l'ensemble du chantier à distance : sélection et coordination des artisans locaux, réunions de suivi, réception des travaux — pour que vous n'ayez pas à multiplier les allers-retours.",
      ],
    },
    deco: {
      heading: 'Décoration d’intérieur dans le Golfe du Morbihan',
      body: [
        "L'ambiance d'une maison du Golfe se construit avec des matières naturelles — bois brut, pierre apparente, lin, osier — et des teintes qui dialoguent avec le paysage : bleu-gris, sable, blanc cassé. Je compose des intérieurs qui donnent envie de déconnecter, tout en restant fonctionnels pour un usage de résidence secondaire ou de location saisonnière.",
        "Le sourcing (mobilier, luminaires, linge de maison) est pensé pour résister au rythme des séjours et des locations, sans sacrifier l'élégance.",
      ],
    },
    why: {
      heading: 'Pourquoi faire appel à un architecte d’intérieur du Golfe ?',
      intro:
        'Rénover une maison de vacances ou un bien insulaire pose des questions spécifiques : accès chantier, disponibilité des artisans, contraintes littorales. Un accompagnement local permet de :',
      items: [
        'Confier la gestion de chantier à quelqu’un qui connaît les artisans du secteur',
        'Valoriser durablement un bien secondaire, y compris pour la location saisonnière',
        'Adapter la rénovation aux spécificités du bâti breton (humidité, matériaux anciens, petites surfaces)',
        'Limiter vos déplacements grâce à un relais local sur toute la durée du chantier',
      ],
    },
    projectIds: ['mai-3', 'mai-1', 'app-1'],
    projectsHeading: 'Nos réalisations dans le Golfe du Morbihan',
    faq: [
      {
        q: 'Intervenez-vous sur les îles du Golfe (Île-aux-Moines, Île d’Arz) ?',
        a: "Oui, j'ai déjà mené des chantiers sur l'Île-aux-Moines et l'Île d'Arz, avec une organisation adaptée aux contraintes d'accès et de logistique insulaire.",
      },
      {
        q: 'Quelles communes du Golfe couvrez-vous ?',
        a: "Baden, Vannes, Auray, Arradon, Larmor-Baden, Île-aux-Moines, Île d'Arz, Saint-Armel, Sarzeau et l'ensemble du pourtour du Golfe.",
      },
      {
        q: 'Peut-on vous confier une résidence secondaire sans être présent sur place ?',
        a: "C'est une grande partie de mon activité : je pilote le chantier, coordonne les artisans locaux et vous envoie des comptes-rendus réguliers, jusqu'à la remise des clés.",
      },
    ],
    ogImageProjectId: 'mai-3',
  },
  {
    slug: 'auray',
    path: '/architecte-interieur-auray',
    city: 'Auray',
    metaTitle: "Architecte d'intérieur à Auray",
    metaDescription:
      "Laurine Fourcherot, architecte d'intérieur à Auray (56) : maisons de bourg, Saint-Goustan, secteur protégé. Conception sur-mesure et suivi de chantier.",
    h1: "Architecte d'intérieur à Auray",
    intro:
      "À une vingtaine de minutes de Baden, Auray fait partie des communes du Golfe où j'interviens régulièrement — pour des maisons de bourg à réagencer, des intérieurs à rénover à Saint-Goustan ou aux alentours, et des familles qui cherchent à optimiser un bien existant plutôt qu'à déménager.",
    archi: {
      heading: "Architecte d'intérieur à Auray : conception et suivi de travaux",
      body: [
        "Le centre historique d'Auray, autour du quartier de Saint-Goustan, comprend un bâti ancien parfois protégé, où toute intervention en façade nécessite une déclaration préalable de travaux. Je réalise ces dossiers administratifs en plus de la conception intérieure, pour sécuriser votre projet du premier coup de crayon jusqu'à l'accord de la mairie.",
        "Pour les maisons de bourg comme pour les pavillons plus récents des alentours, je conçois des plans qui redonnent de la fluidité à la circulation, créent du rangement sur-mesure et adaptent l'espace au rythme d'une famille — chambres, espace de travail, rangements de vie quotidienne.",
      ],
    },
    deco: {
      heading: "Décoration d'intérieur à Auray",
      body: [
        "Je compose des intérieurs qui respectent le cachet des maisons anciennes du secteur — pierre, colombages, poutres — tout en y intégrant un confort contemporain : matériaux nobles, teintes chaleureuses, mobilier sur-mesure quand la configuration l'exige.",
        'Chaque sélection de matières et de couleurs est pensée pour durer, avec une attention particulière portée aux artisans et fournisseurs du secteur.',
      ],
    },
    why: {
      heading: 'Pourquoi faire appel à un architecte d’intérieur à Auray ?',
      intro: 'Rénover une maison de bourg ou familiale à Auray implique souvent :',
      items: [
        'De sécuriser les démarches administratives dans un secteur au bâti protégé',
        'D’optimiser des volumes existants pour une famille qui s’agrandit',
        'De valoriser durablement un bien ancien sans en perdre le caractère',
        'De centraliser la coordination des artisans pour un chantier serein',
      ],
    },
    projectIds: ['mai-1', 'app-2'],
    projectsHeading: 'Réalisations à proximité d’Auray',
    faq: [
      {
        q: 'Avez-vous déjà réalisé un projet à Auray ?',
        a: "Mes réalisations les plus proches se situent à Baden et à Vannes, à une vingtaine de minutes d'Auray. Je me déplace régulièrement sur le secteur pour des rendez-vous conseil et des chantiers.",
      },
      {
        q: 'Gérez-vous les démarches en mairie pour une extension ou une modification de façade ?',
        a: "Oui, je réalise les dossiers de déclaration préalable (plans de masse, façades, insertions paysagères, formulaires Cerfa) et j'assure le suivi jusqu'à l'accord des services instructeurs.",
      },
      {
        q: 'Proposez-vous un premier rendez-vous sur place ?',
        a: 'Oui, le Rendez-vous Conseil se déroule directement chez vous : 2 heures pour évaluer le potentiel du lieu et clarifier votre projet.',
      },
    ],
    ogImageProjectId: 'mai-1',
  },
  {
    slug: 'arradon',
    path: '/architecte-interieur-arradon',
    city: 'Arradon',
    metaTitle: "Architecte d'intérieur à Arradon",
    metaDescription:
      "Laurine Fourcherot, architecte d'intérieur à Arradon (56) : villas en bord de mer, extensions, vue sur le Golfe. Conception sur mesure, suivi de chantier.",
    h1: "Architecte d'intérieur à Arradon",
    intro:
      "Presqu'île résidentielle du Golfe, Arradon accueille des villas contemporaines comme des maisons plus anciennes, souvent tournées vers l'eau. À une vingtaine de minutes de Baden, j'y accompagne des propriétaires qui souhaitent ouvrir leur intérieur sur le paysage, agrandir un séjour ou repenser une extension existante.",
    archi: {
      heading: "Architecte d'intérieur à Arradon : conception et suivi de travaux",
      body: [
        "Les maisons d'Arradon offrent souvent une vue à valoriser — sur le Golfe, sur un jardin, sur la pointe. Mon approche consiste à réorganiser les volumes pour maximiser les ouvertures et la lumière naturelle, tout en conservant l'intimité des pièces de vie.",
        "Extension, véranda, aménagement de combles ou restructuration complète du rez-de-chaussée : j'étudie la faisabilité technique et budgétaire du projet, prépare les plans nécessaires (y compris les dossiers de déclaration préalable pour les extensions inférieures à 20m²) et coordonne le chantier jusqu'à la réception.",
      ],
    },
    deco: {
      heading: "Décoration d'intérieur à Arradon",
      body: [
        "Pour une maison tournée vers le Golfe, je privilégie des matières et des teintes qui prolongent le paysage à l'intérieur : bois clair, lin, blanc cassé, touches de bleu-gris. L'objectif est de créer une continuité entre l'espace de vie et la vue, sans jamais surcharger le regard.",
        'Le sourcing du mobilier et des luminaires est adapté à des volumes généreux, avec une attention portée à la lumière naturelle très présente sur ce secteur.',
      ],
    },
    why: {
      heading: 'Pourquoi faire appel à un architecte d’intérieur à Arradon ?',
      intro:
        'Sur ce secteur particulièrement recherché du Golfe, un accompagnement sur-mesure permet de :',
      items: [
        'Valoriser une vue ou une exposition en repensant l’implantation des pièces de vie',
        'Sécuriser une extension ou une véranda sur le plan administratif et technique',
        'Optimiser un budget de rénovation sur une maison de standing',
        'Coordonner des artisans locaux habitués aux spécificités du bâti du secteur',
      ],
    },
    projectIds: ['mai-3', 'app-1'],
    projectsHeading: 'Réalisations à proximité d’Arradon',
    faq: [
      {
        q: 'Avez-vous déjà réalisé un projet à Arradon ?',
        a: "Mes réalisations les plus proches se situent à Baden et sur l'Île-aux-Moines, à quelques minutes d'Arradon. Je me déplace sur le secteur pour des rendez-vous conseil et des chantiers.",
      },
      {
        q: 'Pouvez-vous gérer une extension ou une véranda ?',
        a: "Oui, de l'étude de faisabilité au dossier de déclaration préalable en mairie, jusqu'au suivi du chantier avec les artisans.",
      },
      {
        q: 'Travaillez-vous sur des maisons contemporaines comme sur du bâti ancien ?',
        a: "Les deux : Arradon mêle villas récentes et maisons plus anciennes, et mon approche s'adapte à chaque configuration.",
      },
    ],
    ogImageProjectId: 'mai-3',
  },
  {
    slug: 'larmor-baden',
    path: '/architecte-interieur-larmor-baden',
    city: 'Larmor-Baden',
    metaTitle: "Architecte d'intérieur à Larmor-Baden",
    metaDescription:
      "Laurine Fourcherot, architecte d'intérieur à Larmor-Baden (56) : maisons littorales, rénovation énergétique, secteur protégé. Basée à Baden, à 5 minutes.",
    h1: "Architecte d'intérieur à Larmor-Baden",
    intro:
      "Larmor-Baden, porte d'embarquement vers Gavrinis et les îles du Golfe, est ma commune voisine — je suis basée à Baden, à cinq minutes. J'y accompagne actuellement un projet de rénovation complète d'une maison au cœur du marais, et j'interviens plus largement sur les maisons littorales du secteur, souvent anciennes et proches de l'eau.",
    archi: {
      heading: "Architecte d'intérieur à Larmor-Baden : conception et suivi de travaux",
      body: [
        "Les maisons de Larmor-Baden, proches du littoral, cumulent souvent plusieurs enjeux : humidité, isolation à reprendre, volumes anciens à moderniser sans dénaturer le bâti. Je conçois des projets de rénovation qui traitent ces contraintes en profondeur — reprise de l'isolation, réagencement des espaces, création d'ouvertures pour la lumière — tout en respectant les règles d'urbanisme du secteur, parfois proche de zones protégées.",
        'Je prépare, si nécessaire, les dossiers de déclaration préalable pour toute modification de façade ou extension, et je pilote le chantier de bout en bout avec des artisans du secteur.',
      ],
    },
    deco: {
      heading: "Décoration d'intérieur à Larmor-Baden",
      body: [
        "Pour ces maisons littorales, je privilégie des matériaux sains et durables, adaptés au climat marin : bois traité, peintures respirantes, textiles naturels. L'ambiance recherchée est celle d'un cocon lumineux et apaisant, en résonance avec le cadre du Golfe.",
        "Chaque projet est aussi l'occasion de repenser le confort thermique — une priorité pour les maisons anciennes du secteur exposées aux embruns.",
      ],
    },
    why: {
      heading: 'Pourquoi faire appel à un architecte d’intérieur à Larmor-Baden ?',
      intro: 'Rénover une maison littorale à Larmor-Baden demande une attention particulière à :',
      items: [
        'La performance énergétique, souvent à reprendre sur du bâti ancien',
        'Les règles d’urbanisme locales, notamment en zone littorale',
        'La résistance des matériaux au climat marin',
        'La coordination d’artisans expérimentés sur ce type de rénovation',
      ],
    },
    projectIds: ['mai-1', 'mai-3'],
    projectsHeading: 'Réalisations à proximité de Larmor-Baden',
    faq: [
      {
        q: 'Avez-vous un projet en cours à Larmor-Baden ?',
        a: "Oui, une rénovation complète d'une maison au cœur du marais est actuellement en chantier. Les photos seront publiées à sa livraison.",
      },
      {
        q: 'Intervenez-vous rapidement, étant basée à Baden ?',
        a: 'Larmor-Baden est à environ cinq minutes de mon atelier à Baden : je peux me déplacer facilement pour un premier rendez-vous ou un suivi de chantier régulier.',
      },
      {
        q: 'Gérez-vous la rénovation énergétique en plus de la décoration ?',
        a: "Oui, la reprise de l'isolation et du confort thermique fait partie intégrante de mes projets de rénovation complète, en coordination avec les artisans concernés.",
      },
    ],
    ogImageProjectId: 'mai-1',
  },
];
