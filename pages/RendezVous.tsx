import React, { Suspense, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Section from '../components/ui/Section';
import { CalendarDays, Phone, ArrowLeft, PhoneCall, Home, Check } from 'lucide-react';
import { useRouteMeta } from '../lib/useRouteMeta';

const Cal = React.lazy(() => import('@calcom/embed-react'));

type MeetingId = 'appel' | 'conseil';

const isConfigured = (link?: string): boolean =>
  Boolean(link) && link !== 'your_calcom_username/your_event_slug';

type Meeting = {
  id: MeetingId;
  calLink?: string;
  namespace: string;
  icon: React.ElementType;
  title: string;
  duration: string;
  price: string;
  priceNote: string;
  description: string;
  bullets: string[];
};

const MEETINGS: Meeting[] = [
  {
    id: 'appel',
    calLink: import.meta.env.VITE_CALCOM_LINK_APPEL,
    namespace: 'rdv-mikasa-appel',
    icon: PhoneCall,
    title: 'Appel découverte',
    duration: '20 min · par téléphone',
    price: 'Gratuit',
    priceNote: 'Sans engagement',
    description:
      'Un premier échange pour me raconter votre projet, valider vos idées et savoir si nous sommes faits pour travailler ensemble.',
    bullets: [
      'Vos envies, votre calendrier, votre budget',
      'Mon avis à chaud sur la faisabilité',
      'Les prochaines étapes possibles, sans obligation',
    ],
  },
  {
    id: 'conseil',
    calLink: import.meta.env.VITE_CALCOM_LINK,
    namespace: 'rdv-mikasa',
    icon: Home,
    title: 'Le Rendez-vous Conseil',
    duration: '2 h · chez vous',
    price: '320 €',
    priceNote: 'Déduit si nous poursuivons ensemble',
    description:
      'Une immersion sur place pour analyser le potentiel du lieu, suivie d’un book de recommandations envoyé sous 48h.',
    bullets: [
      'Diagnostic complet : volumes, lumière, circulation',
      'Pistes d’agencement et regard technique',
      'Book personnalisé sous 48h (couleurs, matériaux…)',
    ],
  },
];

const AVAILABLE = MEETINGS.filter((m) => isConfigured(m.calLink));

const getMeetingFromSearch = (search: string): MeetingId | null => {
  const param = new URLSearchParams(search).get('type');
  return param === 'appel' || param === 'conseil' ? param : null;
};

const CalSkeleton: React.FC = () => (
  <div
    className="w-full bg-stone-50 border border-gray-200 rounded-sm animate-pulse flex items-center justify-center"
    style={{ height: '700px' }}
  >
    <div className="text-stone-400 text-xs uppercase tracking-widest">
      Chargement du calendrier…
    </div>
  </div>
);

const MeetingCard: React.FC<{
  meeting: Meeting;
  active: boolean;
  onSelect: () => void;
}> = ({ meeting, active, onSelect }) => {
  const Icon = meeting.icon;

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`group flex flex-col text-left rounded-sm border p-8 transition-all duration-300 ${
        active
          ? 'border-sage-400 bg-white shadow-lg ring-1 ring-sage-200'
          : 'border-stone-200 bg-stone-50/60 hover:border-sage-300 hover:bg-white hover:shadow-md'
      }`}
    >
      <div className="flex items-start justify-between mb-6">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
            active ? 'bg-sage-600 text-white' : 'bg-sage-50 text-sage-600'
          }`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div className="text-right">
          <span className="font-serif text-xl text-stone-800 block">{meeting.price}</span>
          <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">
            {meeting.priceNote}
          </span>
        </div>
      </div>

      <h2 className="font-serif text-2xl text-stone-800 mb-1">{meeting.title}</h2>
      <p className="text-sage-600 text-[10px] uppercase tracking-widest font-bold mb-5">
        {meeting.duration}
      </p>

      <p className="text-sm text-stone-600 font-light leading-relaxed mb-6">
        {meeting.description}
      </p>

      <ul className="space-y-2.5 mb-8">
        {meeting.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start">
            <Check className="w-3.5 h-3.5 text-sage-400 mr-2.5 mt-0.5 flex-shrink-0" />
            <span className="text-xs text-stone-600 font-light leading-relaxed">{bullet}</span>
          </li>
        ))}
      </ul>

      <span
        className={`mt-auto block w-full text-center text-[10px] uppercase tracking-widest font-bold py-3.5 rounded-sm transition-colors ${
          active
            ? 'bg-sage-600 text-white'
            : 'border border-stone-300 text-stone-600 group-hover:border-sage-400 group-hover:text-sage-600'
        }`}
      >
        {active ? 'Créneaux affichés ci-dessous' : 'Choisir ce rendez-vous'}
      </span>
    </button>
  );
};

const RendezVous: React.FC = () => {
  useRouteMeta();
  const location = useLocation();

  const requested = getMeetingFromSearch(location.search);
  const initial =
    (requested && AVAILABLE.some((m) => m.id === requested) ? requested : AVAILABLE[0]?.id) ??
    'appel';
  const [selected, setSelected] = useState<MeetingId>(initial);

  const active = AVAILABLE.find((m) => m.id === selected);

  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    (async () => {
      const { getCalApi } = await import('@calcom/embed-react');
      const cal = await getCalApi({ namespace: active.namespace });
      if (cancelled) return;
      cal('ui', {
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [active]);

  return (
    <div className="bg-white">
      {/* Header */}
      <Section bgColor="bg-stone-50" className="text-center" py="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <span className="text-sage-600 uppercase tracking-widest text-xs font-bold mb-4 block">
            Rendez-vous
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-stone-800 mb-6">
            Choisissez votre créneau
          </h1>
          <p className="text-stone-600 font-light max-w-2xl mx-auto leading-relaxed">
            {AVAILABLE.length > 1
              ? 'Deux façons de commencer : un appel découverte gratuit pour explorer votre projet, ou la visite conseil complète chez vous. Sélectionnez la formule qui vous convient, puis un horaire dans mon agenda.'
              : 'Sélectionnez directement un horaire disponible dans mon agenda pour échanger sur votre projet.'}
          </p>
        </div>
      </Section>

      {/* Choix de la formule */}
      {AVAILABLE.length > 1 && (
        <Section className="max-w-5xl mx-auto px-6" py="pt-16 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {AVAILABLE.map((meeting) => (
              <MeetingCard
                key={meeting.id}
                meeting={meeting}
                active={meeting.id === selected}
                onSelect={() => setSelected(meeting.id)}
              />
            ))}
          </div>
          <p className="text-center text-xs text-stone-400 font-light mt-8">
            Pas encore sûr·e ? Commencez par l’appel découverte — il ne vous engage à rien.
          </p>
        </Section>
      )}

      {/* Cal.com embed ou fallback */}
      <Section className="max-w-5xl mx-auto px-6" py="py-16">
        {active ? (
          <Suspense fallback={<CalSkeleton />}>
            <Cal
              key={active.namespace}
              namespace={active.namespace}
              calLink={active.calLink as string}
              style={{ width: '100%', height: '700px', overflow: 'scroll' }}
              config={{ layout: 'month_view' }}
            />
          </Suspense>
        ) : (
          /* Fallback si aucun lien Cal.com n'est configuré */
          <div className="bg-stone-50 rounded-sm border border-gray-200 p-12 text-center shadow-sm">
            <div className="w-16 h-16 rounded-full bg-sage-50 flex items-center justify-center text-sage-600 mx-auto mb-6">
              <CalendarDays className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl text-stone-800 mb-4">
              Réservation en ligne bientôt disponible
            </h2>
            <p className="text-stone-500 font-light max-w-md mx-auto mb-8 leading-relaxed">
              Le calendrier en ligne est en cours de configuration. En attendant, contactez-moi
              directement par téléphone ou via le formulaire de contact.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:0689408566"
                className="inline-flex items-center bg-sage-600 text-white px-8 py-3.5 uppercase tracking-widest text-[10px] font-bold hover:bg-sage-700 transition-colors rounded-sm shadow-sm"
              >
                <Phone className="w-3 h-3 mr-2" /> 06 89 40 85 66
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center border border-stone-300 text-stone-700 px-8 py-3.5 uppercase tracking-widest text-[10px] font-bold hover:border-sage-400 hover:text-sage-600 transition-colors rounded-sm"
              >
                Formulaire de contact
              </Link>
            </div>
          </div>
        )}
      </Section>

      {/* Lien retour */}
      <Section bgColor="bg-stone-50" py="py-10">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between flex-wrap gap-4">
          <Link
            to="/contact"
            className="inline-flex items-center text-xs uppercase tracking-widest text-stone-500 hover:text-sage-600 transition-colors"
          >
            <ArrowLeft className="w-3 h-3 mr-2" /> Formulaire de contact
          </Link>
          <p className="text-xs text-stone-400 font-light">
            Un problème avec la réservation ?{' '}
            <a href="tel:0689408566" className="hover:text-sage-600 transition-colors underline">
              Appelez-nous
            </a>
          </p>
        </div>
      </Section>
    </div>
  );
};

export default RendezVous;
