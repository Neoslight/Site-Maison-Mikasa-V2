import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRouteMeta } from '../lib/useRouteMeta';
import { ADDRESS, EMAIL, EMAIL_HREF, OPENING_HOURS, PHONE, PHONE_HREF } from '../lib/site';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import { InputField, SelectField, TextareaField } from '../components/ui/Field';
import PageHeader from '../components/ui/PageHeader';
import SocialLinks from '../components/ui/SocialLinks';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const getServiceFromSearch = (search: string): string => {
  const searchParams = new URLSearchParams(search);
  const serviceParam = searchParams.get('service');

  switch (serviceParam) {
    case 'conseil':
      return 'Le Rendez-vous Conseil';
    case 'principale':
      return 'Rénovation Résidence Principale';
    case 'secondaire':
      return 'Rénovation Résidence Secondaire';
    case 'mairie':
      return 'Dossier Mairie - Déclaration';
    default:
      return '';
  }
};

const Contact: React.FC = () => {
  useRouteMeta();
  const location = useLocation();
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const [formData, setFormData] = useState(() => ({
    name: '',
    email: '',
    phone: '',
    projectType: getServiceFromSearch(location.search),
    message: '',
    _gotcha: '',
  }));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    const formspreeId = import.meta.env.VITE_FORMSPREE_ID;
    if (!formspreeId || formspreeId === 'your_formspree_id_here') {
      if (import.meta.env.DEV) {
        console.info('[Contact] Formspree not configured. Form data:', formData);
        setFormStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: '',
          message: '',
          _gotcha: '',
        });
      } else {
        setFormStatus('error');
      }
      return;
    }

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: '',
          message: '',
          _gotcha: '',
        });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  const details = [
    { label: 'Téléphone', value: <a href={PHONE_HREF}>{PHONE}</a> },
    { label: 'Email', value: <a href={EMAIL_HREF}>{EMAIL}</a> },
    {
      label: 'Localisation',
      value: (
        <>
          {ADDRESS}
          <span className="block text-sm text-stone-500">
            Intervention dans tout le Golfe du Morbihan
          </span>
        </>
      ),
    },
    { label: 'Horaires', value: OPENING_HOURS },
  ];

  return (
    <>
      <PageHeader
        title={
          <>
            <span className="eyebrow mb-6">Architecte d'intérieur à Baden &amp; Vannes</span>
            Parlons de votre projet
          </>
        }
        intro="Une question, une envie de changement ou un projet précis ? N'hésitez pas à m'écrire. Je serai ravie d'échanger avec vous sur vos besoins en architecture et décoration."
      />

      <section className="bg-canvas pb-20 md:pb-32">
        <Container className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <aside className="space-y-12 lg:col-span-4">
            <div>
              <h2 className="sr-only">Coordonnées</h2>
              <dl className="space-y-6">
                {details.map((item) => (
                  <div key={item.label} className="border-t border-line pt-5">
                    <dt className="text-xs uppercase tracking-[0.16em] text-stone-500">
                      {item.label}
                    </dt>
                    <dd className="mt-2 text-base text-stone-900 [&_a:hover]:text-sage-700 [&_a]:transition-colors">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <SocialLinks className="mt-8" />
            </div>

            <div className="rounded-soft bg-sand p-8">
              <h2 className="text-2xl">Prendre rendez-vous</h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-stone-600">
                Vous préférez choisir directement un créneau ? Réservez un appel découverte de 20
                minutes, gratuit et sans engagement.
              </p>
              <Button to="/rendez-vous" variant="link" className="mt-6">
                Voir les créneaux disponibles
              </Button>
            </div>
          </aside>

          <div className="rounded-soft bg-surface p-8 md:rounded-panel md:p-12 lg:col-span-7 lg:col-start-6">
            <h2 className="type-subtitle">Envoyez-moi un message</h2>

            {formStatus === 'success' ? (
              <div className="py-16" role="status">
                <p className="type-subtitle text-sage-700">Message envoyé.</p>
                <p className="mt-4 max-w-sm leading-relaxed text-stone-600">
                  Merci pour votre message. Je vous répondrai dans les plus brefs délais.
                </p>
                <Button variant="link" className="mt-8" onClick={() => setFormStatus('idle')}>
                  Envoyer un autre message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-10 space-y-8">
                <input
                  type="text"
                  name="_gotcha"
                  value={formData._gotcha}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: '-9999px',
                    width: '1px',
                    height: '1px',
                    opacity: 0,
                  }}
                />
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <InputField
                    label="Nom & Prénom"
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    placeholder="Votre nom"
                  />
                  <InputField
                    label="Téléphone"
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    placeholder="Votre numéro"
                  />
                </div>

                <InputField
                  label="Email"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  placeholder="votre@email.com"
                />

                <SelectField
                  label="Type de projet"
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Sélectionnez une option
                  </option>
                  <option value="Le Rendez-vous Conseil">Le Rendez-vous Conseil</option>
                  <option value="Rénovation Résidence Principale">
                    Rénovation Résidence Principale
                  </option>
                  <option value="Rénovation Résidence Secondaire">
                    Rénovation Résidence Secondaire
                  </option>
                  <option value="Dossier Mairie - Déclaration">Dossier Mairie - Déclaration</option>
                  <option value="Autre">Autre demande</option>
                </SelectField>

                <TextareaField
                  label="Message"
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  minLength={10}
                  rows={5}
                  placeholder="Racontez-moi votre projet..."
                />

                {formStatus === 'error' && (
                  <p className="text-sm text-error" role="alert">
                    Une erreur est survenue. Veuillez réessayer ou me contacter par téléphone.
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  arrow={formStatus !== 'submitting'}
                  className="w-full md:w-auto"
                >
                  {formStatus === 'submitting' ? 'Envoi en cours…' : 'Envoyer ma demande'}
                </Button>
              </form>
            )}
          </div>
        </Container>
      </section>
    </>
  );
};

export default Contact;
