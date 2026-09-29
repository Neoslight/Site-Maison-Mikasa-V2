import React from 'react';
import { cn } from '../../lib/utils';

type SectionTone = 'canvas' | 'surface' | 'sand';
type SectionSpacing = 'default' | 'tight' | 'none';

const tones: Record<SectionTone, string> = {
  canvas: 'bg-canvas',
  surface: 'bg-surface',
  sand: 'bg-sand',
};

const spacings: Record<SectionSpacing, string> = {
  default: 'py-20 md:py-32',
  tight: 'py-12 md:py-20',
  none: '',
};

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  tone?: SectionTone;
  spacing?: SectionSpacing;
}

/** Bloc vertical de page : fond + rythme vertical. Le contenu gère sa largeur via <Container>. */
const Section: React.FC<SectionProps> = ({
  tone = 'canvas',
  spacing = 'default',
  className,
  ...rest
}) => <section className={cn(tones[tone], spacings[spacing], className)} {...rest} />;

export default Section;
