# Audit SEO — Maison Mikasa

**Site audité :** https://www.maisonmikasa.fr
**Activité :** Architecte d'intérieur (Laurine Fourcherot), Baden (56), Golfe du Morbihan
**Stack :** Vite 6 + React 19 + React Router 7, rendu statique (SSG / prerender)
**Date de l'audit :** Juin 2026
**Objectif principal :** comprendre pourquoi le site est bien positionné sur « Baden » mais
quasi invisible sur les requêtes régionales plus larges (**Vannes, Auray, Golfe du Morbihan**),
et définir un plan d'action pour capter ce trafic.

---

## 1. Résumé exécutif

Le site est **techniquement excellent** : rendu statique propre, métadonnées par page, données
structurées, NAP cohérent, images WebP optimisées. Sur le plan **purement SEO local**, il souffre
toutefois d'un déséquilibre majeur : il est **construit autour des projets** (project-centric) et
non **autour des zones géographiques** (geography-centric).

Conséquence directe : Google dispose de signaux de pertinence forts pour **Baden** (siège,
mentionné partout) mais de **très peu de signaux pour les villes voisines** où l'agence n'est pas
physiquement implantée. Sans page dédiée, sans contenu textuel ciblé et avec un `<title>` d'accueil
mono-ville, le site ne peut pas rivaliser sur « architecte d'intérieur Vannes » ou
« …Auray », pourtant bien plus recherchés.

### Diagnostic en bref

| Domaine | État | Commentaire |
|---|---|---|
| SEO technique | 🟢 Très bon | SSG, canonicals, robots, schema, perf |
| SEO on-page (Baden) | 🟢 Bon | Bien ciblé sur la ville d'implantation |
| **SEO local élargi** | 🔴 **Faible** | **Aucune page par ville, Auray absent** |
| Contenu éditorial | 🟠 Moyen | Pas de blog, contenu géo surtout dans les `alt` |
| Données structurées | 🟢 Bon | À enrichir (`areaServed`, `Service`, `FAQPage`) |
| Google Business Profile | 🟠 À optimiser | Bien référencé mais sous-exploité |

### Top priorités (Impact / Effort)

| # | Action | Impact | Effort |
|---|---|---|---|
| 1 | Créer des **pages locales dédiées** (Vannes, Golfe du Morbihan, Arradon, Larmor-Baden, Auray) | 🔥🔥🔥 | Moyen |
| 2 | Élargir le `<title>` + H1 de l'accueil au-delà de Baden | 🔥🔥🔥 | Faible |
| 3 | Optimiser le **profil Google Business** (zone de chalandise, posts, avis géolocalisés) | 🔥🔥🔥 | Faible |
| 4 | Ajouter un **bloc « Zones d'intervention »** maillant les pages locales | 🔥🔥 | Faible |
| 5 | Compléter `areaServed` + ajouter schema `Service` / `FAQPage` | 🔥🔥 | Faible |
| 6 | Générer le **sitemap dynamiquement** au build | 🔥 | Faible |
| 7 | Lancer un **blog** de conseils localisés (longue traîne) | 🔥🔥 | Élevé |

---

## 2. Méthodologie & périmètre

Audit réalisé par lecture directe du code source du dépôt. Éléments examinés :

- **Architecture & rendu** : `App.tsx`, `scripts/prerender.ts`, `vite.config.ts`, `entry-server.tsx`.
- **Métadonnées** : `data/routeMeta.ts`, `lib/usePageMeta.ts`, `index.html`.
- **Données structurées** : `pages/Home.tsx`, `pages/ProjectDetails.tsx`, `components/seo/JsonLd.tsx`.
- **Contenu & maillage** : `pages/*`, `components/home/*`, `components/layout/Layout.tsx`.
- **Données projets** : `data/projects.ts`.
- **Fichiers SEO** : `public/sitemap.xml`, `public/robots.txt`.

> Cet audit est un **livrable écrit**. Les implémentations décrites en section 5/6 sont des
> **recommandations** : aucun code applicatif n'a été modifié.

---

## 3. Audit technique

### 3.1 Points forts confirmés

- **Rendu statique (SSG)** — `scripts/prerender.ts` génère un `index.html` par route avec le
  HTML pré-rendu **et** les balises `<head>` correctes injectées (`injectMeta`). Les crawlers
  voient le bon contenu **sans exécuter de JS** : excellent pour l'indexation.
- **Métadonnées centralisées** — `data/routeMeta.ts` (`staticRouteMeta`, `getRouteMeta`,
  `getAllPrerenderRoutes`) : source unique pour title/description/OG/canonical, facile à étendre.
- **Canonicals** — présents sur chaque page (injectés au prerender + `usePageMeta` côté client).
- **`robots.txt`** — `public/robots.txt` autorise tout et référence le sitemap. ✅
- **Performance** — images **WebP**, `loading="lazy"` généralisé, hero en `loading="eager"` +
  `fetchPriority="high"` + `<link rel="preload">` (bon pour le LCP), polices en `display=swap`,
  suivi Vercel Analytics + Speed Insights.

### 3.2 Points à corriger

| Sujet | Constat | Recommandation |
|---|---|---|
| **Sitemap statique** | `public/sitemap.xml` est maintenu **à la main** : 15 URLs figées, sans `<lastmod>`, désynchronisé des projets réellement publiés et **n'inclura pas** les futures pages locales. | Générer le sitemap **au build** depuis `getAllPrerenderRoutes()` (voir §3.3), avec `<lastmod>`. |
| **`<lastmod>` absent** | Aucune date de dernière modification dans le sitemap. | Ajouter `<lastmod>` (date de build ou par page). |
| **Images responsives** | Pas de `srcset`/`sizes` ni de variantes de tailles — une seule résolution servie à tous les écrans. | Générer plusieurs largeurs + `srcset` pour réduire le poids sur mobile (gain CWV/LCP). |
| **`mentions-legales` hors sitemap** | Page prérendue mais absente du sitemap (acceptable, page légale). | Optionnel : la garder hors sitemap, ou l'ajouter en `priority` basse. |

### 3.3 Sitemap dynamique (reco d'implémentation)

Le script de prerender connaît déjà **toutes les routes** via `getAllPrerenderRoutes()`
(`data/routeMeta.ts:115`). Il suffit d'y ajouter une étape d'écriture de `dist/sitemap.xml` à la
fin de `prerender()` (`scripts/prerender.ts`), en réutilisant la liste de routes (+ futures pages
locales). Bénéfice : le sitemap reste **toujours synchronisé** avec les pages réellement publiées,
projets et pages-villes compris.

---

## 4. Audit on-page / contenu

### 4.1 Titles & descriptions par route

Source : `data/routeMeta.ts`. Globalement bien rédigés, mais **trop centrés sur Baden / le Golfe**
et **jamais sur Vannes ou Auray en tant que cible principale**.

| Route | `<title>` actuel | Observation SEO |
|---|---|---|
| `/` | *Maison Mikasa \| Architecte d'intérieur à Baden, Morbihan* | **Mono-ville.** Ne capte pas « Vannes » / « Auray ». |
| `/a-propos` | *À propos \| Maison Mikasa* | OK |
| `/prestations` | *Prestations \| Maison Mikasa* | Pourrait inclure une ville/zone. |
| `/realisations` | *Réalisations \| Maison Mikasa* | OK |
| `/realisations/maison` | *Réalisations Maisons \| Maison Mikasa* | OK |
| `/realisations/appartement` | *Réalisations Appartements \| …* | OK |
| `/realisations/professionnel` | *Réalisations Professionnelles \| …* | OK |
| `/contact` | *Contact \| Maison Mikasa* | OK |
| `/rendez-vous` | *Prendre Rendez-vous \| Maison Mikasa* | OK |

> ⚠️ Le `<title>` de l'accueil est le **mot-clé le plus précieux du site**. Le restreindre à
> « Baden » est la principale raison de l'invisibilité régionale.

### 4.2 Structure des titres (H1/H2)

- **Accueil** : le `<h1>` est en **`sr-only`** (`components/home/Introduction.tsx:26`) —
  *« Maison Mikasa - Architecte d'intérieur à Baden, Golfe du Morbihan »*. Le H1 visible est en
  réalité un `<h2>` (slogan). Ce n'est pas pénalisant en soi, mais un H1 **visible et riche en
  mots-clés géographiques** (incluant Vannes/Auray) renforcerait le signal.
- Les autres pages ont un H1 unique et pertinent (`About`, `Services`, `Projects`, `Contact`).

### 4.3 Couverture géographique du contenu

**Villes présentes** (texte, meta et/ou `alt`) : Baden, Vannes, Île-aux-Moines, Larmor-Baden,
Saint-Armel, Plumelec, Golfe du Morbihan, Morbihan, Bretagne.

**Villes absentes / quasi absentes** (opportunités) :
**Auray (0 occurrence)**, **Arradon**, Theix-Noyalo, Saint-Avé, Sarzeau, Locmariaquer,
Le Bono, Ploeren, Séné, Crac'h…

**Problème de fond :** hors Baden, le contenu géographique est porté surtout par les **`alt`
d'images** (`data/projects.ts`) et non par du **texte de page indexable**. Or les `alt` sont un
signal faible comparé à un vrai contenu rédactionnel ciblant la ville.

### 4.4 Maillage interne

Maillage solide entre accueil → réalisations → projets → contact, et services → contact.
**Manque** : aucun maillage **géographique** (pas de bloc « Zones d'intervention », pas de pages
villes vers lesquelles pointer). C'est précisément ce maillage qui transmettrait de l'autorité
vers les futures pages locales.

---

## 5. Audit SEO local (cœur du sujet)

### 5.1 Pourquoi le site ne rank pas hors Baden

Le classement local de Google repose sur trois piliers :

1. **Pertinence** — le site parle-t-il de la ville recherchée ? → Aujourd'hui **oui pour Baden**,
   **non pour Vannes/Auray** (pas de page dédiée, peu de texte ciblé).
2. **Proximité** — distance entre l'internaute et l'établissement. Baden est proche mais pas
   *dans* Vannes/Auray → désavantage naturel **que seul un contenu très pertinent peut compenser**.
3. **Notoriété** — avis, citations, backlinks, activité du profil Google. → Profil existant mais
   sous-optimisé, peu de signaux géographiques diversifiés.

Maison Mikasa ne peut pas agir sur la proximité physique. **Le levier maîtrisable est la
pertinence** (contenu + pages locales) **et la notoriété** (Google Business + citations). C'est là
que se trouve tout le potentiel de clients supplémentaires.

### 5.2 Recommandation A — Pages locales dédiées *(levier n°1)*

Créer une **landing page par zone cible**, chacune avec un **contenu unique** (jamais dupliqué) :

| Page (URL proposée) | Cible | Statut |
|---|---|---|
| `/architecte-interieur-vannes` | « architecte d'intérieur Vannes » | 2 projets locaux à valoriser |
| `/architecte-interieur-golfe-du-morbihan` | requête large du secteur | page « ombrelle » |
| `/architecte-interieur-arradon` | « …Arradon » | à créer |
| `/architecte-interieur-larmor-baden` | « …Larmor-Baden » | 1 projet (mai-7, à publier) |
| `/architecte-interieur-auray` | « …Auray » (demandé) | **priorité, 0 contenu actuel** |

**Modèle de contenu par page (≥ 400–600 mots, unique) :**

1. **H1** ciblé : *« Architecte d'intérieur à Vannes »*.
2. Intro contextualisée (mention de quartiers/spécificités locales : le port, l'intra-muros…).
3. Les **prestations** appliquées à cette ville (lien vers `/prestations`).
4. **Projets réalisés à proximité** (cartes liées vers `/realisations/...`), ex. pour Vannes :
   `app-1` (Port) et `app-2` (Centre-ville) — réutiliser `data/projects.ts` (champ `location`).
5. **Bloc « Pourquoi faire appel… à [Ville] »** + zones limitrophes desservies.
6. **FAQ locale** (2–4 questions) → éligible au schema `FAQPage` (rich result).
7. **CTA** vers `/rendez-vous` et `/contact`.

**Implémentation suggérée (réutilise l'existant, à faire valider/chiffrer) :**

- Créer `data/locations.ts` : tableau de zones `{ slug, ville, h1, intro, paragraphes, projets[], faq[], meta }`.
- Une route paramétrée dans `App.tsx`, ex. `/architecte-interieur-:zone`, rendue par une nouvelle
  page `pages/Localite.tsx`.
- Étendre `staticRouteMeta` **ou** générer dynamiquement les meta de ces pages dans
  `getRouteMeta()` (`data/routeMeta.ts`), et les ajouter à `getAllPrerenderRoutes()` pour qu'elles
  soient **prérendues** (donc indexables sans JS) — la mécanique existe déjà, identique aux pages projet.
- Réutiliser `components/seo/JsonLd.tsx` pour un schema `Service` (voir §6) par page.

> 💡 Ces pages s'intègrent **sans refonte** : elles suivent exactement le pattern déjà en place
> pour les routes statiques et les pages projet.

### 5.3 Recommandation B — Enrichir l'existant

À mener **en parallèle** des pages locales :

1. **`<title>` accueil multi-villes** — ex. *« Architecte d'intérieur à Baden, Vannes & Golfe du
   Morbihan | Maison Mikasa »* (`data/routeMeta.ts:17` + `pages/Home.tsx:55`). Garder ≤ 60 car. visibles.
2. **Description accueil** — y intégrer Vannes **et** Auray (`routeMeta.ts:18`, `Home.tsx:56`).
3. **H1 visible et géo-riche** sur l'accueil (`components/home/Introduction.tsx`).
4. **Bloc « Zones d'intervention »** sur l'accueil et/ou en footer (`components/layout/Layout.tsx`) :
   liste cliquable Baden · Vannes · Auray · Arradon · Larmor-Baden · Golfe du Morbihan → **maille**
   les pages locales (transmet l'autorité).
5. **Ajouter Auray & Arradon** dans le texte des pages pertinentes (About, Prestations).

---

## 6. Données structurées (Schema.org)

L'existant est bon (`HomeAndConstructionBusiness` complet sur l'accueil — `pages/Home.tsx:10`,
`CreativeWork` + `BreadcrumbList` sur les projets — `pages/ProjectDetails.tsx`). À enrichir :

1. **Compléter `areaServed`** (`pages/Home.tsx:31`) — ajouter au minimum **Auray, Arradon, Theix,
   Sarzeau, Le Bono** et l'entité **« Golfe du Morbihan »**. Liste actuelle : Baden, Vannes,
   Île-aux-Moines, Larmor-Baden, Saint-Armel, Morbihan, Bretagne.
2. **Schema `Service`** sur les pages prestations & pages locales (type de service + `areaServed` +
   `provider`) → renforce la pertinence ville × service.
3. **Schema `FAQPage`** sur les pages locales et `/prestations` (FAQ) → éligibilité aux *rich results*.
4. **`aggregateRating` / `Review`** — si des avis Google existent, les exposer en JSON-LD
   (cohérence avec le profil GBP) pour les étoiles dans les SERP.
5. **`Organization` + `logo`** — ajouter un logo (`image`/`logo`) pour le *Knowledge Panel*.

---

## 7. Google Business Profile (profil Google)

Le profil est **bien référencé** mais peut gagner en visibilité sur la zone élargie. Leviers
(tous gratuits, fort impact sur le *local pack*) :

1. **Catégorie principale** : « Architecte d'intérieur » ; **catégories secondaires** :
   « Décorateur d'intérieur », « Service de rénovation », « Architecte ».
2. **Zone de chalandise** : déclarer explicitement **Vannes, Auray, Arradon, Larmor-Baden,
   Golfe du Morbihan** comme zones desservies (profil de type *service-area business*).
3. **Posts réguliers** (1–2 / mois) : nouveaux projets, conseils, en citant la **ville** concernée.
4. **Photos géolocalisées** : ajouter régulièrement des photos de chantiers, nommées/légendées
   avec la ville (« rénovation appartement Vannes port »…).
5. **Stratégie d'avis** : solliciter les clients et **les inviter à mentionner leur ville** dans
   l'avis (« superbe rénovation à Vannes ») → signal local très fort. Répondre à chaque avis.
6. **Cohérence NAP** stricte (Name / Address / Phone) entre le site (`components/layout/Layout.tsx`,
   `pages/Contact.tsx`, schema accueil), Google et les annuaires. Le NAP du site est déjà cohérent ✅.
7. **Produits/Services** : lister les prestations (du fichier `pages/Services.tsx`) dans le profil.

---

## 8. Off-site & notoriété

- **Citations / annuaires locaux** : s'inscrire (NAP identique) sur PagesJaunes, annuaires du
  Morbihan, Houzz, plateformes de déco/archi, CCI/réseaux locaux.
- **Backlinks locaux** : presse déco régionale, blogs locaux, **partenaires artisans**
  (échanges de liens naturels), offices de tourisme/réseaux pro du Golfe.
- **Réseaux sociaux** (déjà liés en `sameAs`) : publications géolocalisées, renvoi vers les pages
  villes du site pour nourrir le trafic et les signaux.

---

## 9. Feuille de route priorisée

### Quick wins — Semaines 1–2 *(effort faible, impact fort)*

- [ ] Élargir `<title>` + description de l'accueil (Baden **+** Vannes **+** Golfe/Auray).
- [ ] Rendre le H1 de l'accueil visible et géo-riche.
- [ ] Compléter `areaServed` (Auray, Arradon, Golfe du Morbihan…).
- [ ] Optimiser le profil Google : zone de chalandise, catégories, 1er post, photos.
- [ ] Lancer une campagne d'avis Google avec mention de ville.

### Court terme — Mois 1

- [ ] Créer les **pages locales** Vannes, Golfe du Morbihan, Auray (contenu unique + FAQ + projets liés).
- [ ] Ajouter le bloc **« Zones d'intervention »** (maillage interne).
- [ ] Ajouter les schemas `Service` + `FAQPage`.
- [ ] Passer le **sitemap en génération dynamique** au build.

### Moyen terme — Mois 2–3

- [ ] Pages locales **Arradon** & **Larmor-Baden** (+ publier les projets `mai-7`, `mai-5`…).
- [ ] Démarrer un **blog** de conseils localisés (longue traîne : « rénover une maison de pêcheur
      dans le Golfe », « aménager un appartement à Vannes »…).
- [ ] `srcset`/images responsives.
- [ ] Citations & backlinks locaux.

### KPIs de suivi (Google Search Console + GA / Vercel)

- Positions moyennes sur « architecte d'intérieur **Vannes** / **Auray** / **Golfe du Morbihan** ».
- Impressions & clics par requête géographique (GSC).
- Pages locales indexées & trafic organique entrant par page.
- Appels/itinéraires/vues du profil Google (GBP Insights).
- **Conversions** : prises de RDV (`/rendez-vous`) et formulaires (`/contact`).

---

## 10. Annexes

### A. Routes actuellement prérendues

`/`, `/a-propos`, `/prestations`, `/realisations` (+ `/maison`, `/appartement`, `/professionnel`),
`/contact`, `/rendez-vous`, `/mentions-legales`, et les projets visibles
(`/realisations/app-1`, `app-2`, `mai-1`, `mai-3`, `mai-4`, `pro-1`).
Source : `getAllPrerenderRoutes()` — `data/routeMeta.ts:115`.

### B. Villes cibles prioritaires

**Prioritaires :** Vannes · Golfe du Morbihan · Auray · Arradon · Larmor-Baden.
**Secondaires :** Theix-Noyalo · Sarzeau · Le Bono · Ploeren · Séné · Saint-Avé · Locmariaquer.

### C. Checklist condensée

- [ ] Title/H1/description accueil élargis
- [ ] `areaServed` complété
- [ ] Pages locales (Vannes, Golfe, Auray, Arradon, Larmor-Baden)
- [ ] Bloc « Zones d'intervention » + maillage
- [ ] Schema `Service` + `FAQPage` + `aggregateRating`/`logo`
- [ ] Sitemap dynamique + `<lastmod>`
- [ ] Images `srcset`
- [ ] Google Business : zone, catégories, posts, photos, avis géolocalisés
- [ ] Citations & backlinks locaux
- [ ] Blog de conseils localisés

---

*Fin de l'audit. Document de recommandations — aucune modification du code applicatif n'a été
effectuée dans le cadre de ce livrable.*
