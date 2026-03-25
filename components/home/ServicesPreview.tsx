import React from 'react';
import { Link } from 'react-router-dom';
import Section from '../ui/Section';
import Promises from './Promises';
import { ArrowRight, Check, Sparkles, Home, Ship, FileText } from 'lucide-react';

const ServicesPreview: React.FC = () => {
  return (
    <>
      {/* 1. Promises Section - Reusing the dedicated component */}
      <Promises />

      {/* 2. Services List (Prestations) */}
      <Section id="services" className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="font-serif text-3xl text-stone-800 mb-4">Les prestations</h2>
        <p className="text-stone-600 mb-12 italic font-serif">
          Découvrez comment je peux vous accompagner :
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            to="/prestations"
            className="group p-8 border border-gray-100 hover:border-sage-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-sm bg-white flex flex-col items-center"
          >
            <Sparkles className="w-8 h-8 text-sage-400 group-hover:text-sage-600 mb-4 transition-colors" />
            <span className="uppercase tracking-widest text-xs text-stone-700 group-hover:text-sage-700 mb-3 transition-colors font-bold">
              Rendez-vous Conseil
            </span>
            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-sage-500 group-hover:translate-x-1 transition-all duration-300 mt-auto" />
          </Link>

          <Link
            to="/prestations"
            className="group p-8 border border-gray-100 hover:border-sage-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-sm bg-white flex flex-col items-center"
          >
            <Home className="w-8 h-8 text-sage-400 group-hover:text-sage-600 mb-4 transition-colors" />
            <span className="uppercase tracking-widest text-xs text-stone-700 group-hover:text-sage-700 mb-3 transition-colors font-bold">
              Résidence Principale
            </span>
            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-sage-500 group-hover:translate-x-1 transition-all duration-300 mt-auto" />
          </Link>

          <Link
            to="/prestations"
            className="group p-8 border border-gray-100 hover:border-sage-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-sm bg-white flex flex-col items-center"
          >
            <Ship className="w-8 h-8 text-sage-400 group-hover:text-sage-600 mb-4 transition-colors" />
            <span className="uppercase tracking-widest text-xs text-stone-700 group-hover:text-sage-700 mb-3 transition-colors font-bold">
              Résidence Secondaire
            </span>
            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-sage-500 group-hover:translate-x-1 transition-all duration-300 mt-auto" />
          </Link>

          <Link
            to="/prestations"
            className="group p-8 border border-gray-100 hover:border-sage-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-sm bg-white flex flex-col items-center"
          >
            <FileText className="w-8 h-8 text-sage-400 group-hover:text-sage-600 mb-4 transition-colors" />
            <span className="uppercase tracking-widest text-xs text-stone-700 group-hover:text-sage-700 mb-3 transition-colors font-bold">
              Dossier Mairie
            </span>
            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-sage-500 group-hover:translate-x-1 transition-all duration-300 mt-auto" />
          </Link>
        </div>
      </Section>

      {/* 3. Why Us Section */}
      <Section id="why-us" bgColor="bg-stone-50" className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <h3 className="font-serif text-3xl text-stone-800 mb-6">
              Pourquoi faire appel à Maison Mikasa ?
            </h3>
            <p className="font-serif italic text-stone-600 text-lg mb-8">
              Investir dans son intérieur, c'est investir durablement dans son bien-être.
            </p>

            <div className="space-y-6">
              <p className="text-stone-700 font-light leading-relaxed mb-6">
                Que ce soit pour votre résidence principale ou secondaire, je vous accompagne pour
                transformer votre habitat en un lieu ressourçant, esthétique et parfaitement
                optimisé.
              </p>

              <ul className="space-y-4">
                {[
                  'Optimisation des volumes pour un gain de place et de fluidité',
                  'Valorisation financière et esthétique de votre patrimoine immobilier',
                  'Sérénité absolue grâce à la maîtrise du budget et du planning',
                  'Un intérieur unique qui reflète votre personnalité et vos besoins',
                  'Bien-être au quotidien : apaisement, clarté et confort de vie',
                ].map((item, index) => (
                  <li key={index} className="flex items-start group">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-sage-200 flex items-center justify-center text-sage-700 mr-4 mt-0.5 group-hover:bg-sage-300 transition-colors duration-300">
                      <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    </span>
                    <span className="text-stone-700 font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-xl group">
              <div className="absolute inset-0 border-[12px] border-white/30 z-10 pointer-events-none"></div>
              <img
                src="https://picsum.photos/id/366/800/1000"
                alt="Intérieur Mikasa"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default ServicesPreview;
