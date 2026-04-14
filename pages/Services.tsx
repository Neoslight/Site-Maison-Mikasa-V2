import React from 'react';
import { Link } from 'react-router-dom';
import Section from '../components/ui/Section';
import { usePageMeta } from '../lib/usePageMeta';
import {
  Sparkles,
  Home,
  Ship,
  FileText,
  ArrowRight,
  CheckCircle2,
  PenTool,
  LayoutTemplate,
  HardHat,
  ShoppingBag,
  Info,
} from 'lucide-react';

const Services: React.FC = () => {
  usePageMeta(
    'Prestations',
    "Conseil, conception et suivi de chantier pour vos projets d'aménagement intérieur dans le Golfe du Morbihan."
  );

  return (
    <div className="bg-white">
      {/* Hero Header */}
      <Section bgColor="bg-stone-50" className="text-center" py="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <span className="text-sage-600 uppercase tracking-widest text-[10px] font-bold mb-6 block">
            Offres & Services
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-800 mb-10">
            Mes prestations
          </h1>

          <div className="flex justify-center">
            <p className="text-stone-700 font-serif italic text-lg md:text-2xl leading-relaxed max-w-3xl">
              De l’analyse de potentiel au suivi complet de vos travaux, j’imagine des espaces
              fluides où l’esthétique se met au service de votre bien-être pour simplifier votre
              quotidien et valoriser durablement votre patrimoine.
            </p>
          </div>
          <div className="w-12 h-px bg-sage-300 mx-auto mt-12"></div>
        </div>
      </Section>

      {/* Main Offers Grid - Horizontal Layout */}
      <Section className="max-w-[1600px] mx-auto px-6" py="py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Offer 1: Le Rendez-vous Conseil */}
          <div className="group flex flex-col bg-white border border-stone-100 rounded-sm shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden">
            <div className="p-8 flex-grow">
              <div className="w-12 h-12 bg-sage-50 rounded-full flex items-center justify-center text-sage-600 mb-6 group-hover:bg-sage-600 group-hover:text-white transition-colors duration-500">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-stone-800 mb-2">Le Rendez-vous Conseil</h3>
              <p className="text-sage-600 text-xs uppercase tracking-widest font-bold mb-6 italic">
                L'étincelle pour débloquer votre projet. ✨
              </p>

              <p className="text-sm text-stone-600 font-light leading-relaxed mb-6">
                Profitez d'une immersion de 2 heures chez vous (ou dans votre futur bien) pour
                clarifier votre projet. Mes recommandations et conseils sont ensuite synthétisés
                dans un book personnalisé, envoyé sous 48h.
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-sage-400 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-stone-700 font-light">
                    <strong>Diagnostic et échange :</strong> Analyse de vos besoins et du potentiel
                    du lieu sur-place : volumes, lumière, circulation, regard technique, vos
                    habitudes etc.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-sage-400 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-stone-700 font-light">
                    <strong>Votre Compte-Rendu :</strong> Envoi sous 48 heures d'un book pour lancer
                    votre projet sereinement (conseils, piste d'agencement, planche couleurs et
                    matériaux et d'aménagement…).
                  </p>
                </li>
              </ul>
            </div>

            <div className="p-8 pt-0 mt-auto">
              <div className="flex items-center justify-between py-4 border-t border-stone-50 mb-6">
                <span className="text-xs uppercase tracking-widest text-stone-400 font-bold">
                  Tarif
                </span>
                <span className="font-serif text-xl text-stone-800">320 €</span>
              </div>
              <div className="flex items-start bg-sage-50/50 p-3 rounded-sm mb-6">
                <Info className="w-3.5 h-3.5 text-sage-600 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-[10px] text-sage-700 leading-tight">
                  Ce montant est intégralement déduit de la prestation si nous poursuivons ensemble
                  sur un projet de conception complète.
                </p>
              </div>
              <Link
                to="/contact?service=conseil"
                className="block w-full text-center bg-stone-800 text-white text-[10px] uppercase tracking-widest font-bold py-4 hover:bg-sage-600 transition-colors rounded-sm shadow-sm"
              >
                Réserver mon rendez-vous conseil
              </Link>
            </div>
          </div>

          {/* Offer 2: Résidence Principale */}
          <div className="group flex flex-col bg-stone-50 border border-stone-100 rounded-sm shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden">
            <div className="p-8 flex-grow">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-sage-600 mb-6 group-hover:bg-sage-600 group-hover:text-white transition-colors duration-500 shadow-sm">
                <Home className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-stone-800 mb-2">Résidence Principale</h3>
              <p className="text-sage-600 text-xs uppercase tracking-widest font-bold mb-6 italic">
                Un intérieur qui vous ressemble. 🪴
              </p>

              <p className="text-sm text-stone-600 font-light leading-relaxed mb-6">
                Transformons votre lieu de vie quotidien pour en révéler tout le potentiel. Mon
                objectif : créer un intérieur qui vous ressemble, faciliter votre routine et
                optimiser votre confort avec une conception axée sur l'ergonomie, la fluidité des
                espaces, les rangements intelligents et une ambiance chaleureuse.
              </p>

              <div className="space-y-4 mb-8">
                <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block">
                  Missions à la carte (complète ou partielle)
                </span>
                <ul className="space-y-3">
                  {[
                    {
                      label: 'Étude & Esquisse (APS)',
                      desc: "Relevé de l'existant, 3 propositions d'aménagement 2D/3D, planches d'ambiance et estimation budgétaire.",
                    },
                    {
                      label: 'Conception (APD)',
                      desc: 'Plan définitif, plans techniques (électricité, plomberie) et création de mobilier sur-mesure (cuisine, dressing).',
                    },
                    {
                      label: 'Sourcing',
                      desc: 'Choix définitifs des matériaux, couleurs, mobilier et décoration.',
                    },
                    {
                      label: 'Suivi de chantier',
                      desc: "Consultation des artisans, coordination et réunions hebdomadaires jusqu'à la réception.",
                    },
                    {
                      label: 'Aménagement final',
                      desc: 'Commandes, réception et installation complète (mobilier, luminaires, textiles).',
                    },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 className="w-3 h-3 text-sage-500 mr-2 mt-0.5 flex-shrink-0" />
                      <p className="text-[10px] text-stone-700 font-light leading-relaxed">
                        <strong>{item.label} :</strong> {item.desc}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-8 pt-0 mt-auto">
              <div className="flex items-center justify-between py-4 border-t border-stone-200/50 mb-6">
                <span className="text-xs uppercase tracking-widest text-stone-400 font-bold">
                  Tarif
                </span>
                <span className="font-serif text-xl text-stone-800">Sur devis</span>
              </div>
              <Link
                to="/contact?service=principale"
                className="block w-full text-center bg-sage-600 text-white text-[10px] uppercase tracking-widest font-bold py-4 hover:bg-sage-700 transition-colors rounded-sm shadow-sm"
              >
                Demander un devis
              </Link>
            </div>
          </div>

          {/* Offer 3: Résidence Secondaire & Investissement Locatif */}
          <div className="group flex flex-col bg-white border border-stone-100 rounded-sm shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden">
            <div className="p-8 flex-grow">
              <div className="w-12 h-12 bg-sage-50 rounded-full flex items-center justify-center text-sage-600 mb-6 group-hover:bg-sage-600 group-hover:text-white transition-colors duration-500">
                <Ship className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-stone-800 mb-2">
                Résidence Secondaire & Investissement Locatif
              </h3>
              <p className="text-sage-600 text-xs uppercase tracking-widest font-bold mb-6 italic">
                Votre refuge en bord de mer, géré en toute sérénité. ⛵
              </p>

              <p className="text-sm text-stone-600 font-light leading-relaxed mb-6">
                Rénovez et décorez votre bien à distance, sans avoir à toujours vous déplacer. Je
                conçois pour vous un cocon ressourçant, parfaitement adapté aux exigences d'une
                maison de vacances (durabilité, accueil, déconnexion) et à vos habitudes. Profitez
                d'une gestion « clés en main », de la conception à l'installation finale.
              </p>

              <div className="space-y-4 mb-8">
                <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block">
                  Missions à la carte (complète ou partielle)
                </span>
                <ul className="space-y-3">
                  {[
                    {
                      label: 'Étude & Esquisse (APS)',
                      desc: "Relevé, 3 propositions d'aménagement 2D/3D, planches d'ambiance et estimation budgétaire.",
                    },
                    {
                      label: 'Conception (APD)',
                      desc: 'Plans techniques (électricité, plomberie) et mobilier sur-mesure (cuisine, dressing, rangements).',
                    },
                    {
                      label: 'Sourcing',
                      desc: 'Sélection définitive des matériaux, couleurs, mobilier et décoration.',
                    },
                    {
                      label: 'Relais local',
                      desc: 'Gestion et pilotage des entreprises locales en votre absence.',
                    },
                    {
                      label: 'Suivi de chantier',
                      desc: "Consultation des artisans, coordination et réunions hebdomadaires jusqu'à la réception.",
                    },
                    {
                      label: 'Aménagement final',
                      desc: 'Commandes, réception et installation complète (mobilier, luminaires, textiles).',
                    },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 className="w-3 h-3 text-sage-400 mr-2 mt-0.5 flex-shrink-0" />
                      <p className="text-[10px] text-stone-700 font-light leading-relaxed">
                        <strong>{item.label} :</strong> {item.desc}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-8 pt-0 mt-auto">
              <div className="flex items-center justify-between py-4 border-t border-stone-50 mb-6">
                <span className="text-xs uppercase tracking-widest text-stone-400 font-bold">
                  Tarif
                </span>
                <span className="font-serif text-xl text-stone-800">Sur devis</span>
              </div>
              <Link
                to="/contact?service=secondaire"
                className="block w-full text-center bg-stone-800 text-white text-[10px] uppercase tracking-widest font-bold py-4 hover:bg-sage-600 transition-colors rounded-sm shadow-sm"
              >
                Discuter de mon projet
              </Link>
            </div>
          </div>

          {/* Offer 4: Dossier Mairie */}
          <div className="group flex flex-col bg-stone-50 border border-stone-100 rounded-sm shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden">
            <div className="p-8 flex-grow">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-sage-600 mb-6 group-hover:bg-sage-600 group-hover:text-white transition-colors duration-500 shadow-sm">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-stone-800 mb-2">
                Dossier Mairie - Déclaration Préalable de travaux
              </h3>
              <p className="text-sage-600 text-xs uppercase tracking-widest font-bold mb-6 italic">
                Sécuriser vos démarches. 🏡
              </p>

              <p className="text-sm text-stone-600 font-light leading-relaxed mb-6">
                Je réalise des dossiers administratifs de Déclaration Préalable (DP) pour vos
                modifications de façade, extensions/vérandas de &lt;20m², aménagements extérieurs
                etc.
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-sage-400 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-stone-700 font-light">
                    <strong>Dossier Graphique :</strong> Création des plans de masse, des façades et
                    des insertions paysagères obligatoires pour l'administration.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-sage-400 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-stone-700 font-light">
                    <strong>Gestion Administrative :</strong> Rédaction des formulaires Cerfa et
                    constitution du dossier complet pour dépôt en mairie.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-sage-400 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-stone-700 font-light">
                    <strong>Suivi du Dossier :</strong> Accompagnement et échanges avec les services
                    instructeurs jusqu'à l'obtention de l'accord.
                  </p>
                </li>
              </ul>
            </div>

            <div className="p-8 pt-0 mt-auto">
              <div className="flex items-center justify-between py-4 border-t border-stone-200/50 mb-6">
                <span className="text-xs uppercase tracking-widest text-stone-400 font-bold">
                  Forfait
                </span>
                <span className="font-serif text-xl text-stone-800">Dès 350 €</span>
              </div>
              <Link
                to="/contact?service=mairie"
                className="block w-full text-center bg-stone-800 text-white text-[10px] uppercase tracking-widest font-bold py-4 hover:bg-sage-600 transition-colors rounded-sm shadow-sm"
              >
                Confier mon dossier
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Process Visualization Section */}
      <Section bgColor="bg-stone-900" className="text-white" py="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">Un accompagnement serein</h2>
            <p className="text-stone-400 font-light uppercase tracking-[0.2em] text-xs">
              Le déroulement de notre collaboration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: PenTool,
                title: 'Ébauche',
                desc: 'Étude de faisabilité et premières esquisses 3D.',
              },
              {
                icon: LayoutTemplate,
                title: 'Conception',
                desc: 'Plans techniques détaillés et choix des matériaux.',
              },
              {
                icon: HardHat,
                title: 'Travaux',
                desc: 'Coordination rigoureuse des entreprises locales.',
              },
              {
                icon: ShoppingBag,
                title: 'Finalisation',
                desc: 'Mise en place de la décoration et livraison.',
              },
            ].map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center group">
                {idx < 3 && (
                  <div className="hidden md:block absolute top-10 left-[70%] w-full h-[1px] bg-stone-800"></div>
                )}
                <div className="w-20 h-20 rounded-full border border-stone-700 flex items-center justify-center mb-6 group-hover:border-sage-500 transition-colors duration-500">
                  <step.icon className="w-8 h-8 text-sage-500" strokeWidth={1} />
                </div>
                <h4 className="font-serif text-xl mb-3">{step.title}</h4>
                <p className="text-stone-400 text-sm font-light leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* FAQ / Final CTA */}
      <Section className="text-center" py="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="inline-block p-4 bg-sage-50 rounded-full mb-8">
            <Info className="w-6 h-6 text-sage-600" />
          </div>
          <h2 className="font-serif text-3xl text-stone-800 mb-6">
            Vous hésitez entre ces prestations ?
          </h2>
          <p className="text-stone-600 font-light text-lg mb-10 leading-relaxed">
            Chaque projet est unique et mérite une approche adaptée. Contactez-moi pour discuter de
            vos besoins, je vous orienterais vers la solution la plus pertinente pour votre habitat.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link
              to="/contact"
              className="inline-flex items-center bg-sage-600 text-white px-10 py-4 uppercase tracking-widest text-[10px] font-bold hover:bg-sage-700 transition-all rounded-sm shadow-md hover:-translate-y-1"
            >
              Demander un devis personnalisé <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <a
              href="tel:0689408566"
              className="inline-flex items-center text-stone-800 px-10 py-4 uppercase tracking-widest text-[10px] font-bold border border-stone-200 hover:border-sage-600 transition-all rounded-sm"
            >
              06 89 40 85 66
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Services;
