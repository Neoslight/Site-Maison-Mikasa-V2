import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'link';

const base =
  'inline-flex items-center justify-center gap-2.5 text-xs sm:whitespace-nowrap font-medium uppercase tracking-[0.16em] transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-sage-600 px-7 py-4 text-center text-white hover:bg-sage-700',
  secondary:
    'border border-stone-900/25 px-7 py-4 text-center text-stone-900 hover:border-stone-900 hover:bg-stone-900 hover:text-white',
  link: 'group justify-start text-left border-b border-stone-900/25 pb-1.5 text-stone-900 hover:border-stone-900',
};

interface CommonProps {
  variant?: ButtonVariant;
  /** Flèche en fin de libellé (par défaut sur la variante link). */
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
}

type ButtonProps = CommonProps &
  (
    | ({ to: string; href?: never } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>)
    | ({ href: string; to?: never } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({ to?: never; href?: never } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  );

/** Bouton unique du site : lien interne (to), lien externe (href) ou <button>. */
const Button: React.FC<ButtonProps> = (props) => {
  const { variant = 'primary', arrow, className, children, ...rest } = props;
  const showArrow = arrow ?? variant === 'link';
  const classes = cn(base, variants[variant], className);
  const content = (
    <>
      {children}
      {showArrow && (
        <ArrowRight
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </>
  );

  if ('to' in rest && rest.to !== undefined) {
    const { to, ...anchorProps } = rest;
    return (
      <Link
        to={to}
        className={cn(classes, showArrow && 'group')}
        {...(anchorProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </Link>
    );
  }

  if ('href' in rest && rest.href !== undefined) {
    return (
      <a
        className={cn(classes, showArrow && 'group')}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={cn(classes, showArrow && 'group')}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
};

export default Button;
