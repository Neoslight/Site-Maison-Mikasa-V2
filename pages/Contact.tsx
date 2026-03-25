import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Section from '../components/ui/Section';
import { Mail, Phone, MapPin, Send, Instagram, Linkedin, Facebook, Clock } from 'lucide-react';

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
  const location = useLocation();

  const [formData, setFormData] = useState(() => {
    const selectedService = getServiceFromSearch(location.search);

    return {
      name: '',
      email: '',
      phone: '',
      projectType: selectedService,
      message: '',
    };
  });

  // Remove the useEffect that was causing set-state-in-effect
  React.useEffect(() => {
    const selectedService = getServiceFromSearch(location.search);

    // Keep user inputs and only sync prefilled service.
    setFormData((prev) => ({ ...prev, projectType: selectedService }));
  }, [location.search]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation d'envoi
    alert(
      `Merci ${formData.name}, votre message pour le projet "${formData.projectType}" a bien été envoyé ! (Simulation)`
    );
    setFormData({ name: '', email: '', phone: '', projectType: '', message: '' });
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <Section bgColor="bg-stone-50" className="text-center" py="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <span className="text-sage-600 uppercase tracking-widest text-xs font-bold mb-4 block">
            Contact
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-stone-800 mb-6">
            Parlons de votre projet
          </h1>
          <p className="text-stone-600 font-light max-w-2xl mx-auto leading-relaxed">
            Une question, une envie de changement ou un projet précis ? N'hésitez pas à m'écrire. Je
            serai ravie d'échanger avec vous sur vos besoins en architecture et décoration.
          </p>
        </div>
      </Section>

      <Section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Informations de contact (Gauche) */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <h2 className="font-serif text-2xl text-stone-800 mb-6">Coordonnées</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-sage-50 flex items-center justify-center text-sage-600 flex-shrink-0 mr-4">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-widest text-stone-500 mb-1">
                      Téléphone
                    </span>
                    <a
                      href="tel:0689408566"
                      className="text-stone-800 hover:text-sage-600 transition-colors font-medium"
                    >
                      06 89 40 85 66
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-sage-50 flex items-center justify-center text-sage-600 flex-shrink-0 mr-4">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-widest text-stone-500 mb-1">
                      Email
                    </span>
                    <a
                      href="mailto:maisonmikasa@gmail.com"
                      className="text-stone-800 hover:text-sage-600 transition-colors font-medium"
                    >
                      maisonmikasa@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-sage-50 flex items-center justify-center text-sage-600 flex-shrink-0 mr-4">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-widest text-stone-500 mb-1">
                      Localisation
                    </span>
                    <p className="text-stone-800">
                      56870 Baden, Morbihan
                      <br />
                      <span className="text-sm text-stone-500 font-light">
                        Intervention dans tout le Golfe du Morbihan
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-sage-50 flex items-center justify-center text-sage-600 flex-shrink-0 mr-4">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-widest text-stone-500 mb-1">
                      Horaires
                    </span>
                    <p className="text-stone-800 text-sm">Lundi - Vendredi : 9h00 - 18h00</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-stone-800 mb-6">Réseaux Sociaux</h2>
              <div className="flex space-x-4">
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="w-12 h-12 border border-gray-200 rounded-sm flex items-center justify-center text-stone-600 hover:text-sage-600 hover:border-sage-200 transition-all group shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                  <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="w-12 h-12 border border-gray-200 rounded-sm flex items-center justify-center text-stone-600 hover:text-sage-600 hover:border-sage-200 transition-all group shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                  <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="w-12 h-12 border border-gray-200 rounded-sm flex items-center justify-center text-stone-600 hover:text-sage-600 hover:border-sage-200 transition-all group shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                  <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Formulaire (Droite) */}
          <div className="lg:col-span-7 bg-stone-50 p-8 md:p-12 rounded-sm shadow-sm">
            <h2 className="font-serif text-2xl text-stone-800 mb-8">Envoyez-nous un message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-xs uppercase tracking-widest text-stone-600 font-bold"
                  >
                    Nom & Prénom
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-gray-200 px-4 py-3 text-stone-800 focus:outline-none focus:border-sage-400 focus:ring-1 focus:ring-sage-400 transition-colors rounded-sm shadow-sm"
                    placeholder="Votre nom"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="text-xs uppercase tracking-widest text-stone-600 font-bold"
                  >
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-200 px-4 py-3 text-stone-800 focus:outline-none focus:border-sage-400 focus:ring-1 focus:ring-sage-400 transition-colors rounded-sm shadow-sm"
                    placeholder="Votre numéro"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-xs uppercase tracking-widest text-stone-600 font-bold"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-gray-200 px-4 py-3 text-stone-800 focus:outline-none focus:border-sage-400 focus:ring-1 focus:ring-sage-400 transition-colors rounded-sm shadow-sm"
                  placeholder="votre@email.com"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="projectType"
                  className="text-xs uppercase tracking-widest text-stone-600 font-bold"
                >
                  Type de projet
                </label>
                <div className="relative">
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-200 px-4 py-3 text-stone-800 focus:outline-none focus:border-sage-400 focus:ring-1 focus:ring-sage-400 transition-colors rounded-sm appearance-none shadow-sm"
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
                    <option value="Dossier Mairie - Déclaration">
                      Dossier Mairie - Déclaration
                    </option>
                    <option value="Autre">Autre demande</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-stone-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-xs uppercase tracking-widest text-stone-600 font-bold"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-white border border-gray-200 px-4 py-3 text-stone-800 focus:outline-none focus:border-sage-400 focus:ring-1 focus:ring-sage-400 transition-colors rounded-sm resize-none shadow-sm"
                  placeholder="Racontez-moi votre projet..."
                ></textarea>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center w-full md:w-auto bg-sage-600 text-white px-10 py-4 uppercase tracking-widest text-xs font-bold transition-all duration-300 rounded-sm shadow-md hover:bg-sage-700 hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:shadow-sm"
                >
                  Envoyer ma demande <Send className="w-4 h-4 ml-2" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Contact;
