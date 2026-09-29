import React from 'react';
import { cn } from '../../lib/utils';
import Container from './Container';

interface PageHeaderProps {
  eyebrow?: React.ReactNode;
  /** Contenu du h1 — conserver le texte existant des pages pour le SEO. */
  title: React.ReactNode;
  intro?: React.ReactNode;
  /** Élément au-dessus de l'eyebrow (fil d'Ariane…). */
  before?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

/** En-tête commun des pages internes : eyebrow, h1, chapeau. */
const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  title,
  intro,
  before,
  children,
  className,
}) => (
  <header className={cn('bg-canvas pt-14 pb-12 md:pt-24 md:pb-20', className)}>
    <Container>
      {before}
      {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
      <h1 className="type-display max-w-4xl">{title}</h1>
      {intro && <div className="type-lead mt-6 max-w-2xl text-stone-600 md:mt-8">{intro}</div>}
      {children}
    </Container>
  </header>
);

export default PageHeader;
