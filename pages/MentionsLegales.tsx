import React from 'react';
import Section from '../components/ui/Section';
import { usePageMeta } from '../lib/usePageMeta';

const MentionsLegales: React.FC = () => {
  usePageMeta('Mentions légales');

  return (
    <div className="bg-white">
      <Section bgColor="bg-stone-50" className="text-center" py="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <span className="text-sage-600 uppercase tracking-widest text-xs font-bold mb-4 block">
            Informations légales
          </span>
          <h1 className="font-serif text-4xl text-stone-800">Mentions légales</h1>
        </div>
      </Section>

      <Section className="max-w-3xl mx-auto px-6">
        <div className="space-y-10 text-stone-700 font-light leading-relaxed">

          {/* Éditeur */}
          <div>
            <h2 className="font-serif text-xl text-stone-800 mb-4">Éditeur du site</h2>
            <p>
              <strong className="font-normal text-stone-900">Maison Mikasa</strong>
              <br />
              Architecte d'intérieur et décoratrice
              <br />
              SIREN : <span className="text-stone-500">[À compléter avant mise en ligne]</span>
              <br />
              Responsable de publication : Laurine Fourcherot
              <br />
              Adresse : Rue Monseigneur de Pancemont, 56000 Vannes, France
              <br />
              Email :{' '}
              <a
                href="mailto:maisonmikasa@gmail.com"
                className="text-sage-600 hover:underline"
              >
                maisonmikasa@gmail.com
              </a>
            </p>
          </div>

          {/* Hébergement */}
          <div>
            <h2 className="font-serif text-xl text-stone-800 mb-4">Hébergement</h2>
            <p>
              Ce site est hébergé par :
              <br />
              <strong className="font-normal text-stone-900">OVH SAS</strong>
              <br />
              2 rue Kellermann — 59100 Roubaix, France
              <br />
              <a
                href="https://www.ovh.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sage-600 hover:underline"
              >
                www.ovh.com
              </a>
            </p>
          </div>

          {/* Propriété intellectuelle */}
          <div>
            <h2 className="font-serif text-xl text-stone-800 mb-4">Propriété intellectuelle</h2>
            <p>
              L'ensemble du contenu de ce site (textes, photographies, illustrations, mise en page)
              est la propriété exclusive de Maison Mikasa, sauf mention contraire. Toute
              reproduction, représentation, modification ou adaptation, même partielle, est
              strictement interdite sans autorisation écrite préalable.
            </p>
          </div>

          {/* Données personnelles */}
          <div>
            <h2 className="font-serif text-xl text-stone-800 mb-4">Données personnelles</h2>
            <p>
              Ce site ne collecte aucune donnée personnelle à des fins commerciales ou publicitaires.
            </p>
            <p className="mt-4">
              Le formulaire de contact transmet vos informations (nom, email, message) via le service
              tiers{' '}
              <a
                href="https://formspree.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sage-600 hover:underline"
              >
                Formspree
              </a>{' '}
              dans le seul but de vous répondre. Ces données ne sont pas conservées au-delà de la
              durée nécessaire au traitement de votre demande.
            </p>
            <p className="mt-4">
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez
              d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ce
              droit, contactez-nous à{' '}
              <a
                href="mailto:maisonmikasa@gmail.com"
                className="text-sage-600 hover:underline"
              >
                maisonmikasa@gmail.com
              </a>
              .
            </p>
          </div>

          {/* Cookies */}
          <div>
            <h2 className="font-serif text-xl text-stone-800 mb-4">Cookies</h2>
            <p>
              Ce site n'utilise pas de cookies de traçage ou de profilage. Aucun cookie tiers à des
              fins publicitaires n'est déposé sur votre appareil.
            </p>
          </div>

          {/* Loi applicable */}
          <div>
            <h2 className="font-serif text-xl text-stone-800 mb-4">Droit applicable</h2>
            <p>
              Le présent site est soumis au droit français. Tout litige relatif à son utilisation
              relève de la compétence des tribunaux français.
            </p>
            <p className="mt-4 text-sm text-stone-500">
              Conformément à la loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l'Économie
              Numérique (LCEN).
            </p>
          </div>

        </div>
      </Section>
    </div>
  );
};

export default MentionsLegales;
