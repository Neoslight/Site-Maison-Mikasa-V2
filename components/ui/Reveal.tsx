import React from 'react';
import { cn } from '../../lib/utils';
import { useReveal } from '../../lib/useReveal';

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Décalage en ms, pour échelonner des éléments voisins. */
  delay?: number;
}

/** Apparition douce au scroll. À réserver au contenu sous la ligne de flottaison. */
const Reveal: React.FC<RevealProps> = ({ delay, className, style, ...rest }) => {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn('reveal', className)}
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
      {...rest}
    />
  );
};

export default Reveal;
