import React from 'react';
import { cn } from '../../lib/utils';
import { SOCIALS } from '../../lib/site';

// lucide-react a déprécié les icônes de marques : SVG inline, même trait que lucide.
const svgProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className: 'h-full w-full',
  'aria-hidden': true,
};

const IconInstagram = () => (
  <svg {...svgProps}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

const IconFacebook = () => (
  <svg {...svgProps}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const IconLinkedin = () => (
  <svg {...svgProps}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const links = [
  { href: SOCIALS.instagram, label: 'Instagram', Icon: IconInstagram },
  { href: SOCIALS.facebook, label: 'Facebook', Icon: IconFacebook },
  { href: SOCIALS.linkedin, label: 'LinkedIn', Icon: IconLinkedin },
];

interface SocialLinksProps {
  className?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ className }) => (
  <ul className={cn('flex items-center gap-5', className)}>
    {links.map(({ href, label, Icon }) => (
      <li key={label}>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Maison Mikasa sur ${label}`}
          className="block h-5 w-5 text-stone-500 transition-colors duration-300 hover:text-stone-900"
        >
          <Icon />
        </a>
      </li>
    ))}
  </ul>
);

export default SocialLinks;
