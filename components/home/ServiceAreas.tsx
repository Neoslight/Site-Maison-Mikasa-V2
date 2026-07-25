import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import Section from '../ui/Section';
import { locationsData } from '../../data/locations';

const ServiceAreas: React.FC = () => {
  return (
    <Section bgColor="bg-stone-50" className="max-w-4xl mx-auto px-6 text-center">
      <span className="text-sage-600 uppercase tracking-widest text-xs font-bold mb-4 block">
        Zones d'intervention
      </span>
      <h2 className="font-serif text-2xl md:text-3xl text-stone-800 mb-8">
        Architecte d'intérieur dans le Golfe du Morbihan
      </h2>
      <div className="flex flex-wrap justify-center gap-3">
        {locationsData.map((location) => (
          <Link
            key={location.slug}
            to={location.path}
            className="inline-flex items-center text-xs uppercase tracking-widest text-stone-600 bg-white border border-stone-200 px-4 py-2 rounded-sm hover:border-sage-400 hover:text-sage-600 transition-colors shadow-sm"
          >
            <MapPin className="w-3 h-3 mr-2" />
            {location.city}
          </Link>
        ))}
      </div>
    </Section>
  );
};

export default ServiceAreas;
