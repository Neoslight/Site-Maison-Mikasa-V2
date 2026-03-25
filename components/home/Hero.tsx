import React from 'react';
import { Leaf } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div
      id="home"
      className="relative pt-12 pb-16 md:pt-24 md:pb-32 flex flex-col items-center justify-center text-center px-4"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-6">
          <p className="text-stone-700 font-serif italic text-xl md:text-2xl leading-relaxed">
            Des projets qui améliorent votre habitat, et surtout votre quotidien
          </p>
          <div className="flex items-center justify-center text-sage-700 text-sm font-medium">
            <span>Secteur golfe du Morbihan et Bretagne</span>
            <Leaf className="w-4 h-4 ml-2" />
          </div>

          <div className="flex justify-center space-x-8 pt-4 text-xs font-bold text-stone-700 uppercase tracking-widest">
            <span>Architecture</span>
            <span>Décoration</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
