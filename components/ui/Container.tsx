import React from 'react';
import { cn } from '../../lib/utils';

type ContainerSize = 'wide' | 'medium' | 'prose';

const sizes: Record<ContainerSize, string> = {
  wide: 'max-w-7xl',
  medium: 'max-w-5xl',
  prose: 'max-w-3xl',
};

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
}

/** Largeur de contenu + gouttières — les trois seules largeurs du site. */
const Container: React.FC<ContainerProps> = ({ size = 'wide', className, ...rest }) => (
  <div className={cn('mx-auto w-full px-6 md:px-10', sizes[size], className)} {...rest} />
);

export default Container;
