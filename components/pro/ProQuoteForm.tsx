import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { submitToFormspree } from '../../lib/formspree';
import { useHydrated } from '../../lib/useHydrated';
import { PRO_OFFERS, PRO_SECTORS } from '../../data/professionals';
import Button from '../ui/Button';
import { InputField, SelectField, TextareaField } from '../ui/Field';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const PROJECT_NATURES = [
  "Création d'un établissement",
  "Reprise d'un fonds de commerce",
  'Rénovation complète',
  'Rafraîchissement / décoration',
];

const BUDGETS = [
  'Moins de 20 000 €',
  '20 000 à 50 000 €',
  '50 000 à 100 000 €',
  'Plus de 100 000 €',
  'Je ne sais pas encore',
];

const UNDECIDED = 'Je ne sais pas encore';

const offerTitle = (id: string | null) => PRO_OFFERS.find((o) => o.id === id)?.title ?? '';

const emptyForm = () => ({
  name: '',
  company: '',
  email: '',
  phone: '',
  businessType: '',
  city: '',
  surface: '',
  nature: '',
  openingDate: '',
  budget: '',
  prestation: '',
  message: '',
  _gotcha: '',
});

/** Demande de devis professionnel, envoyée au même Formspree que le contact. */
const ProQuoteForm: React.FC = () => {
  const location = useLocation();
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [formData, setFormData] = useState(emptyForm);

  // Pré-remplissage via ?prestation=, appliqué après l'hydratation (voir useHydrated)
  const hydrated = useHydrated();
  const prestation =
    formData.prestation ||
    (hydrated ? offerTitle(new URLSearchParams(location.search).get('prestation')) : '');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    const ok = await submitToFormspree({
      ...formData,
      prestation,
      projectType: `Professionnel — ${formData.businessType}`,
      _subject: `Demande de devis pro — ${formData.company || formData.name}`,
    });
    if (ok) {
      setFormStatus('success');
      setFormData(emptyForm());
    } else {
      setFormStatus('error');
    }
  };

  if (formStatus === 'success') {
    return (
      <div className="py-16" role="status">
        <p className="type-subtitle text-sage-700">Demande envoyée.</p>
        <p className="mt-4 max-w-sm leading-relaxed text-stone-600">
          Merci, je reviens vers vous sous 48h ouvrées pour échanger sur votre projet et vous
          proposer un devis.
        </p>
        <Button variant="link" className="mt-8" onClick={() => setFormStatus('idle')}>
          Envoyer une autre demande
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-8">
      <input
        type="text"
        name="_gotcha"
        value={formData._gotcha}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
      />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <InputField
          label="Nom & Prénom"
          type="text"
          id="pro-name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          autoComplete="name"
          placeholder="Votre nom"
        />
        <InputField
          label="Établissement"
          type="text"
          id="pro-company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          autoComplete="organization"
          placeholder="Nom ou projet d'établissement"
        />
        <InputField
          label="Email"
          type="email"
          id="pro-email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="email"
          placeholder="votre@email.com"
        />
        <InputField
          label="Téléphone"
          type="tel"
          id="pro-phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          autoComplete="tel"
          placeholder="Votre numéro"
        />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <SelectField
          label="Type d'établissement"
          id="pro-businessType"
          name="businessType"
          value={formData.businessType}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Sélectionnez une activité
          </option>
          {PRO_SECTORS.map((sector) => (
            <optgroup key={sector.id} label={sector.label}>
              {sector.examples.map((example) => (
                <option key={example} value={example}>
                  {example}
                </option>
              ))}
            </optgroup>
          ))}
          <option value="Autre activité">Autre activité</option>
        </SelectField>
        <InputField
          label="Ville du local"
          type="text"
          id="pro-city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          autoComplete="address-level2"
          placeholder="Ex. : Vannes"
        />
        <InputField
          label="Surface approximative"
          type="text"
          id="pro-surface"
          name="surface"
          value={formData.surface}
          onChange={handleChange}
          placeholder="Ex. : 80 m²"
        />
        <SelectField
          label="Nature du projet"
          id="pro-nature"
          name="nature"
          value={formData.nature}
          onChange={handleChange}
        >
          <option value="" disabled>
            Sélectionnez une option
          </option>
          {PROJECT_NATURES.map((nature) => (
            <option key={nature} value={nature}>
              {nature}
            </option>
          ))}
        </SelectField>
        <InputField
          label="Ouverture visée"
          type="text"
          id="pro-openingDate"
          name="openingDate"
          value={formData.openingDate}
          onChange={handleChange}
          placeholder="Ex. : avril 2027"
        />
        <SelectField
          label="Budget travaux"
          id="pro-budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
        >
          <option value="" disabled>
            Sélectionnez une fourchette
          </option>
          {BUDGETS.map((budget) => (
            <option key={budget} value={budget}>
              {budget}
            </option>
          ))}
        </SelectField>
      </div>

      <SelectField
        label="Prestation souhaitée"
        id="pro-prestation"
        name="prestation"
        value={prestation}
        onChange={handleChange}
      >
        <option value="" disabled>
          Sélectionnez une option
        </option>
        {PRO_OFFERS.map((offer) => (
          <option key={offer.id} value={offer.title}>
            {offer.title}
          </option>
        ))}
        <option value={UNDECIDED}>{UNDECIDED}</option>
      </SelectField>

      <TextareaField
        label="Votre projet"
        id="pro-message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        required
        minLength={10}
        rows={5}
        placeholder="Votre activité, votre clientèle, l'état du local, vos envies…"
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
        {formStatus === 'submitting' ? 'Envoi en cours…' : 'Demander mon devis'}
      </Button>
    </form>
  );
};

export default ProQuoteForm;
