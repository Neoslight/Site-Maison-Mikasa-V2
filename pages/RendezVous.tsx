import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cal, { getCalApi } from '@calcom/embed-react';
import Section from '../components/ui/Section';
import { CalendarDays, Phone, ArrowLeft } from 'lucide-react';
import { usePageMeta } from '../lib/usePageMeta';

const CAL_LINK = import.meta.env.VITE_CALCOM_LINK;
const CAL_NAMESPACE = 'rdv-mikasa';

const RendezVous: React.FC = () => {
  usePageMeta(
    'Prendre Rendez-vous',
    "Réservez directement un créneau de consultation avec Maison Mikasa, architecte d'intérieur."
  );

  useEffect(() => {
    if (!CAL_LINK || CAL_LINK === 'your_calcom_username/your_event_slug') return;
    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal('ui', {
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, []);

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
            Sélectionnez directement un horaire disponible dans mon agenda. La consultation est
            gratuite et sans engagement — un premier échange pour explorer votre projet ensemble.
          </p>
        </div>
      </Section>

      {/* Cal.com embed ou fallback */}
      <Section className="max-w-5xl mx-auto px-6" py="py-16">
        {CAL_LINK && CAL_LINK !== 'your_calcom_username/your_event_slug' ? (
          <Cal
            namespace={CAL_NAMESPACE}
            calLink={CAL_LINK}
            style={{ width: '100%', height: '700px', overflow: 'scroll' }}
            config={{ layout: 'month_view' }}
          />
        ) : (
          /* Fallback si VITE_CALCOM_LINK non configuré */
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
