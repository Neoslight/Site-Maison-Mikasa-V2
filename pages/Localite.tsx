import React from 'react';
import { Link } from 'react-router-dom';
import { useRouteMeta } from '../lib/useRouteMeta';
import { locationsData } from '../data/locations';
import { projectsData } from '../data/projects';
import { faqPageSchema, SITE_URL } from '../data/schema';
import JsonLd from '../components/seo/JsonLd';
import Container from '../components/ui/Container';
import PageHeader from '../components/ui/PageHeader';
import ProjectCard from '../components/ui/ProjectCard';
import Reveal from '../components/ui/Reveal';
import Section from '../components/ui/Section';
import SectionHeading from '../components/ui/SectionHeading';

interface LocaliteProps {
  slug: string;
}

const Localite: React.FC<LocaliteProps> = ({ slug }) => {
  const location = locationsData.find((l) => l.slug === slug);

  useRouteMeta();

  if (!location) {
    return (
      <Container className="flex min-h-[60vh] items-center justify-center">
        <p className="type-subtitle">Page introuvable</p>
      </Container>
    );
  }

  const otherLocations = locationsData.filter((l) => l.slug !== location.slug);
  const projects = location.projectIds
    .map((id) => projectsData.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: location.h1,
        item: `${SITE_URL}${location.path}`,
      },
    ],
  };

  const editorial = [location.archi, location.deco];

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={faqPageSchema(location.faq)} />

      <PageHeader
        before={
          <nav aria-label="Fil d'Ariane" className="mb-10 text-sm text-stone-500 md:mb-14">
            <Link to="/" className="hover:text-stone-900">
              Accueil
            </Link>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <span className="text-stone-900">{location.city}</span>
          </nav>
        }
        eyebrow="Zone d'intervention"
        title={location.h1}
        intro={location.intro}
      />

      {/* Architecture et décoration */}
      <Section spacing="none" className="pb-20 md:pb-32">
        <Container>
          {editorial.map((block) => (
            <Reveal
              key={block.heading}
              className="grid gap-6 border-t border-line py-12 md:grid-cols-12 md:gap-8 md:py-16"
            >
              <h2 className="type-subtitle md:col-span-4">{block.heading}</h2>
              <div className="space-y-4 text-base leading-relaxed text-stone-600 md:col-span-7 md:col-start-6 md:text-lg">
                {block.body.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
          ))}
        </Container>
      </Section>

      {projects.length > 0 && (
        <Section tone="surface">
          <Container>
            <SectionHeading title={location.projectsHeading} />
            <div className="grid gap-12 md:grid-cols-2 md:gap-x-10 lg:grid-cols-3">
              {projects.map((project, index) => (
                <Reveal key={project.id} delay={(index % 3) * 100}>
                  <ProjectCard
                    project={project}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Pourquoi */}
      <Section>
        <Container className="grid gap-10 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-5">
            <h2 className="type-title">{location.why.heading}</h2>
            <p className="mt-5 text-base leading-relaxed text-stone-600">{location.why.intro}</p>
          </Reveal>
          <ul className="md:col-span-6 md:col-start-7">
            {location.why.items.map((item, i) => (
              <li
                key={i}
                className="flex gap-5 border-t border-line py-5 text-base leading-relaxed text-stone-700 last:border-b"
              >
                <span className="pt-0.5 text-sm tabular-nums text-sage-700">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* FAQ — contenu visible (cohérent avec le JSON-LD FAQPage) */}
      <Section tone="surface">
        <Container>
          <SectionHeading eyebrow="FAQ" title="Questions fréquentes" />
          <div>
            {location.faq.map((item, i) => (
              <div
                key={i}
                className="grid gap-3 border-t border-line py-8 md:grid-cols-12 md:gap-8 md:py-10"
              >
                <h3 className="text-xl md:col-span-5">{item.q}</h3>
                <p className="text-base leading-relaxed text-stone-600 md:col-span-6 md:col-start-7">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Maillage interne vers les autres zones */}
      <Section spacing="tight">
        <Container>
          <h2 className="type-subtitle">Zones d'intervention autour de {location.city}</h2>
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {otherLocations.map((l) => (
              <li key={l.slug}>
                <Link
                  to={l.path}
                  className="border-b border-stone-900/25 pb-1 text-sm text-stone-900 transition-colors hover:border-stone-900"
                >
                  Architecte d'intérieur {l.city}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
};

export default Localite;
