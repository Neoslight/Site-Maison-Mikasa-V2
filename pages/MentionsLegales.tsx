import React from 'react';
import { useRouteMeta } from '../lib/useRouteMeta';
import { EMAIL, EMAIL_HREF } from '../lib/site';
import Container from '../components/ui/Container';
import PageHeader from '../components/ui/PageHeader';

const MentionsLegales: React.FC = () => {
  useRouteMeta();

  return (
    <>
      <PageHeader eyebrow="Informations légales" title="Mentions légales" />

      <section className="bg-canvas pb-20 md:pb-32">
        <Container>
          <div className="max-w-3xl space-y-12 text-base leading-relaxed text-stone-600 [&_a]:text-stone-900 [&_a]:underline [&_a]:decoration-stone-900/30 [&_a]:underline-offset-4 [&_a:hover]:decoration-stone-900 [&_h2]:type-subtitle [&_h2]:mb-4 [&_strong]:text-stone-900">
            {/* Éditeur */}
            <div>
              <h2>Éditeur du site</h2>
              <p>
                <strong className="font-medium">Maison Mikasa</strong>
                <br />
                Architecte d'intérieur et décoratrice
                <br />
                SIREN : 883320194
                <br />
                Responsable de publication : Laurine Fourcherot
                <br />
                Adresse : 56870 Baden, Morbihan, France
                <br />
                Email : <a href={EMAIL_HREF}>{EMAIL}</a>
              </p>
            </div>

            {/* Hébergement */}
            <div>
              <h2>Hébergement</h2>
              <p>
                Ce site est hébergé par :
                <br />
                <strong className="font-medium">Vercel Inc.</strong>
                <br />
                340 S Lemon Ave #4133 — Walnut, CA 91789, États-Unis
                <br />
                <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
                  vercel.com
                </a>
              </p>
            </div>

            {/* Propriété intellectuelle */}
            <div>
              <h2>Propriété intellectuelle</h2>
              <p>
                L'ensemble du contenu de ce site (textes, photographies, illustrations, mise en
                page) est la propriété exclusive de Maison Mikasa, sauf mention contraire. Toute
                reproduction, représentation, modification ou adaptation, même partielle, est
                strictement interdite sans autorisation écrite préalable.
              </p>
            </div>

            {/* Données personnelles */}
            <div>
              <h2>Données personnelles</h2>
              <p>
                Ce site ne collecte aucune donnée personnelle à des fins commerciales ou
                publicitaires.
              </p>
              <p className="mt-4">
                Le formulaire de contact transmet vos informations (nom, email, message) via le
                service tiers{' '}
                <a href="https://formspree.io" target="_blank" rel="noopener noreferrer">
                  Formspree
                </a>{' '}
                dans le seul but de vous répondre. Ces données ne sont pas conservées au-delà de la
                durée nécessaire au traitement de votre demande.
              </p>
              <p className="mt-4">
                Conformément au Règlement Général sur la Protection des Données (RGPD), vous
                disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour
                exercer ce droit, contactez-nous à <a href={EMAIL_HREF}>{EMAIL}</a>.
              </p>
            </div>

            {/* Cookies */}
            <div>
              <h2>Cookies</h2>
              <p>
                Ce site utilise Vercel Analytics et Vercel Speed Insights, des outils de mesure
                d'audience et de performance qui ne déposent aucun cookie et ne collectent aucune
                donnée personnelle identifiable. Aucun cookie de traçage publicitaire ou de
                profilage n'est utilisé sur ce site.
              </p>
            </div>

            {/* Loi applicable */}
            <div>
              <h2>Droit applicable</h2>
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
        </Container>
      </section>
    </>
  );
};

export default MentionsLegales;
