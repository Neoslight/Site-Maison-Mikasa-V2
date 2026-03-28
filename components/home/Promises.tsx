import React, { useState } from 'react';
import Section from '../ui/Section';
import { HeartHandshake, Leaf, Users, Plus, Minus } from 'lucide-react';

const promisesData = [
  {
    id: '1',
    title: 'Quotidien amélioré',
    icon: HeartHandshake,
    content:
      'Un intérieur pensé pour vous simplifier la vie, réduire votre charge mentale et augmenter votre bien-être au quotidien. Chaque espace est optimisé pour servir vos habitudes.',
  },
  {
    id: '2',
    title: 'Investissement durable',
    icon: Leaf,
    content:
      "Des matériaux de qualité, des choix intemporels et des solutions éco-responsables pour un intérieur qui dure dans le temps et respecte l'environnement.",
  },
  {
    id: '3',
    title: 'Chantier serein',
    icon: Users,
    content:
      'Un accompagnement complet et rigoureux. Je gère les artisans, le planning et les imprévus pour que vous viviez vos travaux en toute tranquillité.',
  },
];

const Promises: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <Section id="promises" bgColor="bg-stone-50" className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="font-serif text-3xl text-stone-800/80">
          Les 3 promesses de Maison Mikasa
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {promisesData.map((item) => {
          const Icon = item.icon;
          const isOpen = openId === item.id;

          return (
            <div key={item.id} className="flex flex-col items-center">
              <div
                className={`mb-6 text-sage-600 transition-transform duration-500 ${isOpen ? 'scale-110' : 'scale-100'}`}
              >
                <Icon className="w-12 h-12" strokeWidth={1.5} />
              </div>

              <button
                onClick={() => toggle(item.id)}
                className="w-full bg-white border border-gray-100 p-6 rounded-sm shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-stone-800 text-sm md:text-lg group-hover:text-sage-700 transition-colors">
                    {item.title}
                  </span>
                  <div
                    className={`transition-transform duration-500 ease-out ${isOpen ? 'rotate-180 text-sage-600' : 'text-stone-400'}`}
                  >
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </div>

                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <div className="pt-4 mt-2 border-t border-dashed border-gray-100">
                      <p className="text-left text-sm text-stone-600 font-light leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default Promises;
