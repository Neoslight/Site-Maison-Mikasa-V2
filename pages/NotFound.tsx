import React from 'react';
import { useRouteMeta } from '../lib/useRouteMeta';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';

const NotFound: React.FC = () => {
  useRouteMeta({
    title: 'Page introuvable',
    description: "Désolé, la page que vous recherchez n'existe pas ou a été déplacée.",
    robots: 'noindex, follow',
  });

  return (
    <Container className="flex min-h-[70vh] flex-col justify-center py-20">
      <p className="eyebrow mb-5">Erreur 404</p>
      <h1 className="type-display">Page introuvable</h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-stone-600">
        Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button to="/">Retour à l'accueil</Button>
        <Button to="/realisations" variant="secondary">
          Voir les réalisations
        </Button>
      </div>
    </Container>
  );
};

export default NotFound;
