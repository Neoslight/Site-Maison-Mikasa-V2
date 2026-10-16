import React from 'react';
import { NavLink } from 'react-router-dom';
import { SERVICE_CATEGORIES } from '../../data/navigation';
import { cn } from '../../lib/utils';

/** Onglets Particuliers / Professionnels en tête des pages de prestations. */
const ServicesTabs: React.FC<{ className?: string }> = ({ className }) => (
  <nav aria-label="Prestations" className={cn('mb-10 md:mb-14 print:hidden', className)}>
    <ul className="flex gap-8 border-b border-line">
      {SERVICE_CATEGORIES.map((item) => (
        <li key={item.to}>
          <NavLink
            to={item.to}
            end
            className={({ isActive }) =>
              cn(
                '-mb-px block border-b py-3 text-[0.8125rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300',
                isActive
                  ? 'border-sage-600 text-stone-900'
                  : 'border-transparent text-stone-500 hover:text-stone-900'
              )
            }
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

export default ServicesTabs;
