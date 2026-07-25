export interface Testimonial {
  id: number;
  text: string;
  author: string;
  project: string;
}

// Sourced from real reviews on the Maison Mikasa Google Business Profile.
export const testimonialsData: Testimonial[] = [
  {
    id: 1,
    text: 'Toute jeune architecte est déjà très compétente. N’hésite pas à tout faire pour rentrer dans les délais. Elle est d’excellents conseils et à l’écoute de sa clientèle. J’ai pu ouvrir à temps grâce à son travail et les artisans avec lesquels elle travaille. Merci pour le travail effectué au comptoir à pétards.',
    author: 'Thibaud',
    project: 'Rénovation bar/cave à vin, Plumelec (56)',
  },
  {
    id: 2,
    text: 'Merci à Laurine pour l’année que nous venons de passer à rénover une petite maison bretonne. Collaboration très efficace, conseils judicieux et surtout merci pour le sourire et la bonne humeur. Résultats largement conformes à nos espérances.',
    author: 'Marie',
    project: 'Rénovation maison, Île d’Arz (56)',
  },
  {
    id: 3,
    text: 'J’ai fait appel à Laurine pour le suivi d’un chantier de transformation d’un appartement. Les délais étaient courts et malgré les aléas dûs à des causes extérieures, les travaux ont été menés à bien dans les délais impartis. Très agréable, force de proposition, sérieuse. Je la recommande !',
    author: 'Marie-José',
    project: 'Rénovation appartement, Vannes (56)',
  },
  {
    id: 4,
    text: 'Notre projet était de repenser notre intérieur. Laurine nous a guidé en nous proposant des plans avec plusieurs propositions, ce qui nous a permis de nous projeter, elle a suivi notre chantier et nous sommes ravis du résultat. Merci.',
    author: 'Claire',
    project: 'Rénovation maison, Baden (56)',
  },
  {
    id: 5,
    text: 'Merci à Laurine. Elle a été de très bons conseils pour nous aider à aménager et décorer une mezzanine/chambre d’amis/bureau. Elle prend en compte toutes nos envies et demandes et peut se charger du projet de A à Z ou juste l\'étape de conception du projet au choix. Elle fournit alors une "liste de courses" et on peut mener à bien notre projet petit à petit selon le temps et le budget dont on dispose. Nous recommandons vivement !',
    author: 'Ulrich',
    project: 'Aménagement maison, Baden (56)',
  },
  {
    id: 6,
    text: "Nous avons fait appel à Laurine pour notre projet d’aménagement d’une extension, existante mais à l'état brut. Laurine est très à l'écoute des souhaits et contraintes. Elle nous a soumis plusieurs plans possibles, ce qui nous permet de nous projeter et de démarcher auprès d'entrepreneurs. Ravis de son intervention, elle est souriante et efficace, nous recommandons !",
    author: 'Dorothée et Benjamin',
    project: 'Aménagement d’extension, Saint-Donan (22)',
  },
];
