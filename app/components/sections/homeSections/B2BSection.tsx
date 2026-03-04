'use client'
import React, { useState } from 'react';
import SectionWrapper from '@/app/components/common/SectionWrapper';
import SectionMargin from '@/app/components/common/SectionMargin';
import SectionBadge from '@/app/components/common/SectionBadge';
import SpanText from '@/app/components/common/SpanText';
import { Phone } from 'lucide-react';

interface FormData {
  companyName: string;
  responsibleName: string;
  phone: string;
  email: string;
  address: string;
  activityType: string;
  services: string[];
  frequency: string;
  message: string;
}

export default function B2BSection() {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    responsibleName: '',
    phone: '',
    email: '',
    address: '',
    activityType: '',
    services: [],
    frequency: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleServiceChange = (service: string) => {
    setFormData({
      ...formData,
      services: formData.services.includes(service)
        ? formData.services.filter(s => s !== service)
        : [...formData.services, service],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact/professional', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          companyName: '',
          responsibleName: '',
          phone: '',
          email: '',
          address: '',
          activityType: '',
          services: [],
          frequency: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceOptions = [
    'Pressing',
    'Linge',
    'Tapis',
    'Canapé',
    'Literie',
  ];

  return (
    <SectionWrapper className="py-16 md:py-24 bg-gray-50">
      <SectionMargin>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mb-6 flex justify-center">
              <SectionBadge text="Espace" highlightText="Professionnels" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-tertiary mb-4">
              Solutions sur mesure pour{' '}
              <SpanText text="votre entreprise" className="" />
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
              Vous êtes un hôtel, restaurant, bureau, salon de beauté ou autre entreprise ? 
              Laundry.ma vous propose des solutions sur mesure pour l'entretien de votre linge professionnel.
            </p>
            <p className="text-base text-primary font-semibold">
              💬 Nous vous répondrons rapidement pour vous proposer une solution adaptée à vos besoins.
            </p>
          </div>

          {/* Form Section */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-tertiary mb-6 text-center">
                🧾 Formulaire de contact professionnel
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nom de l'entreprise */}
                <div>
                  <label htmlFor="companyName" className="block text-sm font-semibold text-tertiary mb-2">
                    Nom de l'entreprise *
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Nom de votre entreprise"
                  />
                </div>

                {/* Nom et prénom du responsable */}
                <div>
                  <label htmlFor="responsibleName" className="block text-sm font-semibold text-tertiary mb-2">
                    Nom et prénom du responsable *
                  </label>
                  <input
                    type="text"
                    id="responsibleName"
                    name="responsibleName"
                    value={formData.responsibleName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Nom et prénom"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Téléphone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-tertiary mb-2">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="+212 6 XX XX XX XX"
                    />
                  </div>

                  {/* E-mail */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-tertiary mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="email@exemple.com"
                    />
                  </div>
                </div>

                {/* Adresse */}
                <div>
                  <label htmlFor="address" className="block text-sm font-semibold text-tertiary mb-2">
                    Adresse *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Adresse complète"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Type d'activité */}
                  <div>
                    <label htmlFor="activityType" className="block text-sm font-semibold text-tertiary mb-2">
                      Type d'activité *
                    </label>
                    <select
                      id="activityType"
                      name="activityType"
                      value={formData.activityType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Sélectionnez un type</option>
                      <option value="hotel">Hôtel</option>
                      <option value="restaurant">Restaurant</option>
                      <option value="bureau">Bureau</option>
                      <option value="salon-beaute">Salon de beauté</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>

                  {/* Fréquence souhaitée */}
                  <div>
                    <label htmlFor="frequency" className="block text-sm font-semibold text-tertiary mb-2">
                      Fréquence souhaitée *
                    </label>
                    <select
                      id="frequency"
                      name="frequency"
                      value={formData.frequency}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Sélectionnez une fréquence</option>
                      <option value="quotidienne">Quotidienne</option>
                      <option value="hebdomadaire">Hebdomadaire</option>
                      <option value="mensuelle">Mensuelle</option>
                      <option value="ponctuelle">Ponctuelle</option>
                    </select>
                  </div>
                </div>

                {/* Services souhaités */}
                <div>
                  <label className="block text-sm font-semibold text-tertiary mb-3">
                    Services souhaités *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {serviceOptions.map((service) => (
                      <label
                        key={service}
                        className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-primary/5 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={formData.services.includes(service)}
                          onChange={() => handleServiceChange(service)}
                          className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-tertiary mb-2">
                    Message ou demande spécifique
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    placeholder="Votre message ou demande spécifique..."
                  />
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                    Message envoyé avec succès ! Notre équipe vous contactera rapidement.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                    Une erreur s'est produite. Veuillez réessayer ou nous contacter directement.
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || formData.services.length === 0}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer la demande'}
                </button>

                {/* Catchphrase After */}
                <div className="mt-6 text-center space-y-2">
                  <p className="text-gray-700 text-base">
                    💬 Nous vous répondrons dans les plus brefs délais pour vous proposer une solution adaptée à vos besoins.
                  </p>
                  <p className="text-gray-600 text-sm">
                    👉 Votre satisfaction est notre priorité.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </SectionMargin>
    </SectionWrapper>
  );
}



