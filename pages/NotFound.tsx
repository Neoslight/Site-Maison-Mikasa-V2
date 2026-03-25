import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="font-serif text-6xl md:text-8xl text-sage-600 mb-6">404</h1>
      <h2 className="font-serif text-2xl md:text-3xl text-stone-800 mb-4">Page introuvable</h2>
      <p className="text-stone-600 font-light mb-8 max-w-md">
        Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/"
          className="bg-sage-600 text-white px-8 py-3 text-xs uppercase tracking-widest font-bold hover:bg-sage-700 transition-colors rounded-sm shadow-sm"
        >
          Retour à l'accueil
        </Link>
        <Link
          to="/realisations"
          className="bg-white text-stone-800 border border-stone-200 px-8 py-3 text-xs uppercase tracking-widest font-bold hover:bg-stone-50 transition-colors rounded-sm shadow-sm"
        >
          Voir nos réalisations
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
