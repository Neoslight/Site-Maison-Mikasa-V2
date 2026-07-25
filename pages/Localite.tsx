import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, MapPin } from 'lucide-react';
import Section from '../components/ui/Section';
import { useRouteMeta } from '../lib/useRouteMeta';
import { locationsData } from '../data/locations';
import { projectsData } from '../data/projects';
import Img from '../components/ui/Img';
import { faqPageSchema, SITE_URL } from '../data/schema';
import JsonLd from '../components/seo/JsonLd';

interface LocaliteProps {
  slug: string;
}

const Localite: React.FC<LocaliteProps> = ({ slug }) => {
  const location = locationsData.find((l) => l.slug === slug);

  useRouteMeta();

  if (!location) {
    return <div className="min-h-screen flex items-center justify-center">Page introuvable</div>;
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

  return (
    <div className="bg-white">
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={faqPageSchema(location.faq)} />

      {/* Header */}
      <Section bgColor="bg-stone-50" className="text-center" py="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <nav
            aria-label="Fil d'Ariane"
            className="mb-6 text-xs text-stone-400 uppercase tracking-widest"
          >
            <Link to="/" className="hover:text-sage-600 transition-colors">
              Accueil
            </Link>
            <span className="mx-2">/</span>
            <span className="text-stone-600">{location.city}</span>
          </nav>
          <span className="text-sage-600 uppercase tracking-widest text-xs font-bold mb-4 block">
            Zone d'intervention
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-stone-800 mb-6">{location.h1}</h1>
          <p className="text-stone-600 font-light max-w-2xl mx-auto leading-relaxed">
            {location.intro}
          </p>
        </div>
      </Section>

      {/* Architecture section */}
      <Section className="max-w-4xl mx-auto px-6">
        <h2 className="font-serif text-2xl md:text-3xl text-stone-800 mb-6">
          {location.archi.heading}
        </h2>
        <div className="space-y-4 text-stone-600 font-light leading-relaxed">
          {location.archi.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </Section>

      {/* Decoration section */}
      <Section bgColor="bg-stone-50" className="max-w-4xl mx-auto px-6">
        <h2 className="font-serif text-2xl md:text-3xl text-stone-800 mb-6">
          {location.deco.heading}
        </h2>
        <div className="space-y-4 text-stone-600 font-light leading-relaxed">
          {location.deco.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </Section>

      {/* Projects */}
      {projects.length > 0 && (
        <Section className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-2xl md:text-3xl text-stone-800 mb-10 text-center">
            {location.projectsHeading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {projects.map((project) => (
              <Link key={project.id} to={`/realisations/${project.id}`} className="group block">
                <div className="relative overflow-hidden aspect-[4/5] mb-4 bg-stone-100 rounded-sm">
                  <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/20 transition-colors duration-500 z-10" />
                  <Img
                    src={project.coverImage}
                    alt={project.coverImageAlt ?? project.title}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    loading="lazy"
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
                <h3 className="font-serif text-lg text-stone-800 group-hover:text-sage-600 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-xs text-stone-500 uppercase tracking-widest">
                  {project.location} • {project.category}
                </p>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* Why section */}
      <Section bgColor="bg-stone-900" className="text-white" py="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-serif text-2xl md:text-3xl mb-4">{location.why.heading}</h2>
          <p className="text-stone-400 font-light leading-relaxed mb-8">{location.why.intro}</p>
          <ul className="space-y-4">
            {location.why.items.map((item, i) => (
              <li key={i} className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-sage-400 mr-3 mt-1 flex-shrink-0" />
                <span className="text-stone-200 font-light">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Zones d'intervention — internal linking to the other location pages */}
      <Section className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-serif text-2xl text-stone-800 mb-8">
          Zones d'intervention autour de {location.city}
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {otherLocations.map((l) => (
            <Link
              key={l.slug}
              to={l.path}
              className="inline-flex items-center text-xs uppercase tracking-widest text-stone-600 border border-stone-200 px-4 py-2 rounded-sm hover:border-sage-400 hover:text-sage-600 transition-colors"
            >
              <MapPin className="w-3 h-3 mr-2" />
              {l.city}
            </Link>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section bgColor="bg-stone-50" className="max-w-3xl mx-auto px-6">
        <h2 className="font-serif text-2xl md:text-3xl text-stone-800 mb-10 text-center">
          Questions fréquentes
        </h2>
        <div className="space-y-8">
          {location.faq.map((item, i) => (
            <div key={i} className="border-b border-gray-200 pb-6 last:border-0">
              <h3 className="font-serif text-lg text-stone-800 mb-2">{item.q}</h3>
              <p className="text-stone-600 font-light leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="text-center" py="py-16 md:py-20">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-serif text-2xl md:text-3xl text-stone-800 mb-4">
            Un projet à {location.city} ?
          </h2>
          <p className="text-stone-600 font-light mb-8">
            Parlons-en. Le premier échange est gratuit et sans engagement.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/rendez-vous"
              className="inline-flex items-center bg-sage-600 text-white px-8 py-3.5 uppercase tracking-widest text-[10px] font-bold hover:bg-sage-700 transition-colors rounded-sm shadow-sm"
            >
              Prendre rendez-vous <ArrowRight className="w-3 h-3 ml-2" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center border border-stone-300 text-stone-700 px-8 py-3.5 uppercase tracking-widest text-[10px] font-bold hover:border-sage-400 hover:text-sage-600 transition-colors rounded-sm"
            >
              Formulaire de contact
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Localite;
