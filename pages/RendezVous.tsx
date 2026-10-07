import React, { Suspense, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { useRouteMeta } from '../lib/useRouteMeta';
import { cn } from '../lib/utils';
import { PHONE, PHONE_HREF } from '../lib/site';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import PageHeader from '../components/ui/PageHeader';

const Cal = React.lazy(() => import('@calcom/embed-react'));

type MeetingId = 'appel' | 'conseil';

const isConfigured = (link?: string): boolean =>
  Boolean(link) && link !== 'your_calcom_username/your_event_slug';

type Meeting = {
  id: MeetingId;
  calLink?: string;
  namespace: string;
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
    title: 'Le Rendez-vous Conseil',
    duration: '2 h · chez vous',
    price: '320 €',
    priceNote: "Déduit d'une conception complète",
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
    className="flex w-full animate-pulse items-center justify-center rounded-soft border border-line bg-surface"
    style={{ height: '700px' }}
  >
    <p className="text-sm text-stone-400">Chargement du calendrier…</p>
  </div>
);

const MeetingCard: React.FC<{
  meeting: Meeting;
  active: boolean;
  onSelect: () => void;
}> = ({ meeting, active, onSelect }) => (
  <button
    type="button"
    onClick={onSelect}
    aria-pressed={active}
    className={cn(
      'group flex flex-col rounded-soft border bg-surface p-8 text-left transition-colors duration-300 md:p-10',
      active ? 'border-sage-600 ring-1 ring-sage-600' : 'border-line hover:border-stone-400'
    )}
  >
    <div className="flex items-start justify-between gap-6">
      <div>
        <h2 className="text-2xl">{meeting.title}</h2>
        <p className="mt-1.5 text-sm text-stone-500">{meeting.duration}</p>
      </div>
      <div className="text-right">
        <span className="block font-serif text-2xl text-stone-900">{meeting.price}</span>
        <span className="mt-1 block text-xs text-stone-500">{meeting.priceNote}</span>
      </div>
    </div>

    <p className="mt-6 text-[0.9375rem] leading-relaxed text-stone-600">{meeting.description}</p>

    <ul className="mb-8 mt-6 space-y-2.5">
      {meeting.bullets.map((bullet) => (
        <li key={bullet} className="flex items-start gap-3 text-sm text-stone-700">
          <span className="mt-2.5 h-px w-3 shrink-0 bg-sage-600" aria-hidden="true" />
          {bullet}
        </li>
      ))}
    </ul>

    <span
      className={cn(
        'mt-auto inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em]',
        active ? 'text-sage-700' : 'text-stone-900'
      )}
    >
      {active ? (
        <>
          <Check className="h-3.5 w-3.5" aria-hidden="true" /> Créneaux affichés ci-dessous
        </>
      ) : (
        <>
          Choisir ce rendez-vous
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </>
      )}
    </span>
  </button>
);

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
    <>
      <PageHeader
        eyebrow="Rendez-vous"
        title="Choisissez votre créneau"
        intro={
          AVAILABLE.length > 1
            ? 'Deux façons de commencer : un appel découverte gratuit pour explorer votre projet, ou la visite conseil complète chez vous. Sélectionnez la formule qui vous convient, puis un horaire dans mon agenda.'
            : 'Sélectionnez directement un horaire disponible dans mon agenda pour échanger sur votre projet.'
        }
      />

      <section className="bg-canvas pb-20 md:pb-32">
        <Container>
          <div className="max-w-5xl">
            {AVAILABLE.length > 1 && (
              <div className="mb-12 md:mb-16">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {AVAILABLE.map((meeting) => (
                    <MeetingCard
                      key={meeting.id}
                      meeting={meeting}
                      active={meeting.id === selected}
                      onSelect={() => setSelected(meeting.id)}
                    />
                  ))}
                </div>
                <p className="mt-6 text-sm text-stone-500">
                  Pas encore sûr·e ? Commencez par l’appel découverte — il ne vous engage à rien.
                </p>
              </div>
            )}

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
              <div className="rounded-soft border border-line bg-surface p-10 text-center md:p-16">
                <h2 className="type-subtitle">Réservation en ligne bientôt disponible</h2>
                <p className="mx-auto mt-4 max-w-md leading-relaxed text-stone-600">
                  Le calendrier en ligne est en cours de configuration. En attendant, contactez-moi
                  directement par téléphone ou via le formulaire de contact.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Button href={PHONE_HREF}>{PHONE}</Button>
                  <Button to="/contact" variant="secondary">
                    Formulaire de contact
                  </Button>
                </div>
              </div>
            )}

            <p className="mt-8 text-sm text-stone-500">
              Un problème avec la réservation ? Appelez le{' '}
              <a href={PHONE_HREF} className="text-stone-900 underline underline-offset-4">
                {PHONE}
              </a>{' '}
              ou utilisez le{' '}
              <Link to="/contact" className="text-stone-900 underline underline-offset-4">
                formulaire de contact
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>
    </>
  );
};

export default RendezVous;
