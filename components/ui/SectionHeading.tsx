import React from 'react';
import { cn } from '../../lib/utils';

interface SectionHeadingProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  /** Lien ou bouton aligné à droite du titre (desktop). */
  action?: React.ReactNode;
  align?: 'left' | 'center';
  as?: 'h2' | 'h3';
  className?: string;
}

/** Titre de section unique : eyebrow, h2, chapeau optionnel. */
const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  lead,
  action,
  align = 'left',
  as: Heading = 'h2',
  className,
}) => {
  const centered = align === 'center';
  return (
    <div
      className={cn(
        'mb-12 md:mb-16',
        action && !centered && 'md:flex md:items-end md:justify-between md:gap-12',
        centered && 'mx-auto max-w-2xl text-center',
        className
      )}
    >
      <div className={cn(!centered && 'max-w-2xl')}>
        {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
        <Heading className="type-title">{title}</Heading>
        {lead && <p className="mt-5 text-base leading-relaxed text-stone-600 md:text-lg">{lead}</p>}
      </div>
      {action && <div className={cn('mt-6 shrink-0', !centered && 'md:mt-0')}>{action}</div>}
    </div>
  );
};

export default SectionHeading;
