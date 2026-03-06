'use client'
import React, { useState } from 'react';
import HeroSection from '@/app/components/common/HeroSection';
import SectionWrapper from '@/app/components/common/SectionWrapper';
import SectionMargin from '@/app/components/common/SectionMargin';
import SectionBadge from '@/app/components/common/SectionBadge';
import SectionTitle from '@/app/components/common/SectionTitle';
import {
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Sparkles,
  CalendarClock,
  MessageSquare,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Send,
  XCircle,
  Shield,
} from 'lucide-react';

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

const TOTAL_STEPS = 4;

const ProfessionalContact = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
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
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: '' });
    }
  };

  const handleServiceChange = (service: string) => {
    const updated = formData.services.includes(service)
      ? formData.services.filter(s => s !== service)
      : [...formData.services, service];
    setFormData({ ...formData, services: updated });
    if (fieldErrors['services']) {
      setFieldErrors({ ...fieldErrors, services: '' });
    }
  };

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};
    switch (step) {
      case 1:
        if (!formData.companyName.trim()) errors.companyName = 'Ce champ est requis';
        if (!formData.responsibleName.trim()) errors.responsibleName = 'Ce champ est requis';
        break;
      case 2:
        if (!formData.phone.trim()) errors.phone = 'Ce champ est requis';
        if (!formData.email.trim()) errors.email = 'Ce champ est requis';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Email invalide';
        if (!formData.address.trim()) errors.address = 'Ce champ est requis';
        break;
      case 3:
        if (!formData.activityType) errors.activityType = 'Ce champ est requis';
        if (formData.services.length === 0) errors.services = 'S\u00e9lectionnez au moins un service';
        if (!formData.frequency) errors.frequency = 'Ce champ est requis';
        break;
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const goToStep = (step: number) => {
    if (step > currentStep) {
      if (!validateStep(currentStep)) return;
    }
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(step);
      setIsAnimating(false);
    }, 200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact/professional', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceOptions = [
    { label: 'Pressing', icon: '\ud83d\udc54' },
    { label: 'Linge', icon: '\ud83e\uddf2' },
    { label: 'Tapis', icon: '\ud83e\udea1' },
    { label: 'Canap\u00e9', icon: '\ud83d\udecb\ufe0f' },
    { label: 'Literie', icon: '\ud83d\udecf\ufe0f' },
  ];

  const activityOptions = [
    { value: 'hotel', label: 'H\u00f4tel', icon: '\ud83c\udfe8' },
    { value: 'restaurant', label: 'Restaurant', icon: '\ud83c\udf7d\ufe0f' },
    { value: 'bureau', label: 'Bureau', icon: '\ud83c\udfe2' },
    { value: 'salon-beaute', label: 'Salon de beaut\u00e9', icon: '\ud83d\udc87' },
    { value: 'autre', label: 'Autre', icon: '\ud83c\udfea' },
  ];

  const frequencyOptions = [
    { value: 'quotidienne', label: 'Quotidienne', desc: 'Tous les jours' },
    { value: 'hebdomadaire', label: 'Hebdomadaire', desc: 'Une fois par semaine' },
    { value: 'mensuelle', label: 'Mensuelle', desc: 'Une fois par mois' },
    { value: 'ponctuelle', label: 'Ponctuelle', desc: 'Sur demande' },
  ];

  const steps = [
    { number: 1, title: 'Entreprise', icon: Building2 },
    { number: 2, title: 'Contact', icon: Phone },
    { number: 3, title: 'Services', icon: Sparkles },
    { number: 4, title: 'Message', icon: MessageSquare },
  ];

  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen bg-white">
        <HeroSection title="ESPACE PROFESSIONNELS" subtitle="HOME / PROFESSIONNELS" className="bg-primary" />
        <SectionWrapper className="py-16 md:py-24 bg-white">
          <SectionMargin>
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-12 shadow-xl border border-green-100">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-14 h-14 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-tertiary mb-4">
                  Demande envoy&eacute;e avec succ&egrave;s !
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Notre &eacute;quipe commerciale vous contactera dans les 24 heures pour discuter de vos besoins et vous proposer un devis personnalis&eacute;.
                </p>
                <button
                  onClick={() => { setSubmitStatus('idle'); setCurrentStep(1); }}
                  className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:shadow-lg"
                >
                  Nouvelle demande
                </button>
              </div>
            </div>
          </SectionMargin>
        </SectionWrapper>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <HeroSection title="ESPACE PROFESSIONNELS" subtitle="HOME / PROFESSIONNELS" className="bg-primary" />

      <SectionWrapper className="py-16 md:py-24 bg-gradient-to-b from-gray-50/50 to-white">
        <SectionMargin>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="mb-6 flex justify-center">
                <SectionBadge text="Espace" highlightText="Professionnels" />
              </div>
              <SectionTitle>
                Solutions sur mesure pour{' '}
                <span className="text-primary">votre entreprise</span>
              </SectionTitle>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                H&ocirc;tel, restaurant, bureau ou salon de beaut&eacute; &mdash; obtenez un devis personnalis&eacute; en quelques &eacute;tapes.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              {/* Step Progress Bar */}
              <div className="mb-10">
                <div className="flex items-center justify-between relative">
                  <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200 z-0 hidden sm:block" />
                  <div
                    className="absolute top-6 left-0 h-0.5 bg-primary z-0 transition-all duration-500 ease-out hidden sm:block"
                    style={{ width: `${((currentStep - 1) / (TOTAL_STEPS - 1)) * 100}%` }}
                  />
                  {steps.map((step) => {
                    const Icon = step.icon;
                    const isActive = currentStep === step.number;
                    const isCompleted = currentStep > step.number;
                    return (
                      <button
                        key={step.number}
                        type="button"
                        onClick={() => {
                          if (step.number < currentStep) goToStep(step.number);
                        }}
                        className={`relative z-10 flex flex-col items-center transition-all duration-300 ${
                          step.number < currentStep ? 'cursor-pointer' : 'cursor-default'
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-sm ${
                            isActive
                              ? 'bg-primary border-primary text-white scale-110 shadow-primary/30 shadow-lg'
                              : isCompleted
                              ? 'bg-green-500 border-green-500 text-white'
                              : 'bg-white border-gray-300 text-gray-400'
                          }`}
                        >
                          {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                        </div>
                        <span
                          className={`mt-2 text-xs font-semibold hidden sm:block transition-colors duration-300 ${
                            isActive ? 'text-primary' : isCompleted ? 'text-green-600' : 'text-gray-400'
                          }`}
                        >
                          {step.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="sm:hidden text-center mt-4">
                  <span className="text-sm font-semibold text-primary">
                    &Eacute;tape {currentStep} sur {TOTAL_STEPS}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">&mdash; {steps[currentStep - 1].title}</span>
                </div>
              </div>

              {/* Form Card */}
              <form onSubmit={handleSubmit}>
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-tertiary to-tertiary/90 px-8 py-5">
                    <div className="flex items-center gap-3">
                      {React.createElement(steps[currentStep - 1].icon, { className: "w-6 h-6 text-primary" })}
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          {currentStep === 1 && "Informations de l\u2019entreprise"}
                          {currentStep === 2 && "Coordonn\u00e9es de contact"}
                          {currentStep === 3 && "Services & Fr\u00e9quence"}
                          {currentStep === 4 && "Message compl\u00e9mentaire"}
                        </h3>
                        <p className="text-sm text-white/70">
                          {currentStep === 1 && "Dites-nous en plus sur votre entreprise"}
                          {currentStep === 2 && "Comment pouvons-nous vous joindre ?"}
                          {currentStep === 3 && "Quels services vous int\u00e9ressent ?"}
                          {currentStep === 4 && "Des d\u00e9tails \u00e0 nous communiquer ?"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={`p-8 transition-all duration-200 ${isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                    {/* STEP 1 */}
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <div>
                          <label className="flex items-center gap-2 text-sm font-semibold text-tertiary mb-2">
                            <Building2 className="w-4 h-4 text-primary" />
                            Nom de l'entreprise <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            className={`w-full px-4 py-3.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${fieldErrors.companyName ? 'border-red-400 bg-red-50/50' : 'border-gray-200 hover:border-gray-300'}`}
                            placeholder="Ex: H\u00f4tel Royal Mansour"
                          />
                          {fieldErrors.companyName && (
                            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> {fieldErrors.companyName}</p>
                          )}
                        </div>
                        <div>
                          <label className="flex items-center gap-2 text-sm font-semibold text-tertiary mb-2">
                            <User className="w-4 h-4 text-primary" />
                            Nom et pr&eacute;nom du responsable <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            name="responsibleName"
                            value={formData.responsibleName}
                            onChange={handleChange}
                            className={`w-full px-4 py-3.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${fieldErrors.responsibleName ? 'border-red-400 bg-red-50/50' : 'border-gray-200 hover:border-gray-300'}`}
                            placeholder="Ex: Ahmed Bennani"
                          />
                          {fieldErrors.responsibleName && (
                            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> {fieldErrors.responsibleName}</p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* STEP 2 */}
                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <div>
                          <label className="flex items-center gap-2 text-sm font-semibold text-tertiary mb-2">
                            <Phone className="w-4 h-4 text-primary" />
                            T&eacute;l&eacute;phone <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full px-4 py-3.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${fieldErrors.phone ? 'border-red-400 bg-red-50/50' : 'border-gray-200 hover:border-gray-300'}`}
                            placeholder="+212 6 XX XX XX XX"
                          />
                          {fieldErrors.phone && (
                            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> {fieldErrors.phone}</p>
                          )}
                        </div>
                        <div>
                          <label className="flex items-center gap-2 text-sm font-semibold text-tertiary mb-2">
                            <Mail className="w-4 h-4 text-primary" />
                            E-mail <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-3.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${fieldErrors.email ? 'border-red-400 bg-red-50/50' : 'border-gray-200 hover:border-gray-300'}`}
                            placeholder="email@exemple.com"
                          />
                          {fieldErrors.email && (
                            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> {fieldErrors.email}</p>
                          )}
                        </div>
                        <div>
                          <label className="flex items-center gap-2 text-sm font-semibold text-tertiary mb-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            Adresse <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className={`w-full px-4 py-3.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${fieldErrors.address ? 'border-red-400 bg-red-50/50' : 'border-gray-200 hover:border-gray-300'}`}
                            placeholder="Adresse compl\u00e8te de votre \u00e9tablissement"
                          />
                          {fieldErrors.address && (
                            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> {fieldErrors.address}</p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* STEP 3 */}
                    {currentStep === 3 && (
                      <div className="space-y-8">
                        <div>
                          <label className="flex items-center gap-2 text-sm font-semibold text-tertiary mb-3">
                            <Briefcase className="w-4 h-4 text-primary" />
                            Type d'activit&eacute; <span className="text-red-400">*</span>
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {activityOptions.map((opt) => (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => {
                                  setFormData({ ...formData, activityType: opt.value });
                                  if (fieldErrors.activityType) setFieldErrors({ ...fieldErrors, activityType: '' });
                                }}
                                className={`p-4 rounded-xl border-2 text-center transition-all duration-200 hover:shadow-md ${formData.activityType === opt.value ? 'border-primary bg-primary/5 shadow-md shadow-primary/10' : 'border-gray-200 hover:border-primary/30'}`}
                              >
                                <span className="text-2xl block mb-1">{opt.icon}</span>
                                <span className={`text-sm font-medium ${formData.activityType === opt.value ? 'text-primary' : 'text-gray-700'}`}>{opt.label}</span>
                              </button>
                            ))}
                          </div>
                          {fieldErrors.activityType && (
                            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> {fieldErrors.activityType}</p>
                          )}
                        </div>

                        <div>
                          <label className="flex items-center gap-2 text-sm font-semibold text-tertiary mb-3">
                            <Sparkles className="w-4 h-4 text-primary" />
                            Services souhait&eacute;s <span className="text-red-400">*</span>
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {serviceOptions.map((service) => {
                              const isSelected = formData.services.includes(service.label);
                              return (
                                <button
                                  key={service.label}
                                  type="button"
                                  onClick={() => handleServiceChange(service.label)}
                                  className={`p-4 rounded-xl border-2 text-center transition-all duration-200 hover:shadow-md relative ${isSelected ? 'border-primary bg-primary/5 shadow-md shadow-primary/10' : 'border-gray-200 hover:border-primary/30'}`}
                                >
                                  {isSelected && <CheckCircle2 className="w-4 h-4 text-primary absolute top-2 right-2" />}
                                  <span className="text-2xl block mb-1">{service.icon}</span>
                                  <span className={`text-sm font-medium ${isSelected ? 'text-primary' : 'text-gray-700'}`}>{service.label}</span>
                                </button>
                              );
                            })}
                          </div>
                          {fieldErrors.services && (
                            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> {fieldErrors.services}</p>
                          )}
                        </div>

                        <div>
                          <label className="flex items-center gap-2 text-sm font-semibold text-tertiary mb-3">
                            <CalendarClock className="w-4 h-4 text-primary" />
                            Fr&eacute;quence souhait&eacute;e <span className="text-red-400">*</span>
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            {frequencyOptions.map((opt) => (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => {
                                  setFormData({ ...formData, frequency: opt.value });
                                  if (fieldErrors.frequency) setFieldErrors({ ...fieldErrors, frequency: '' });
                                }}
                                className={`p-4 rounded-xl border-2 text-left transition-all duration-200 hover:shadow-md ${formData.frequency === opt.value ? 'border-primary bg-primary/5 shadow-md shadow-primary/10' : 'border-gray-200 hover:border-primary/30'}`}
                              >
                                <span className={`text-sm font-semibold block ${formData.frequency === opt.value ? 'text-primary' : 'text-tertiary'}`}>{opt.label}</span>
                                <span className="text-xs text-gray-500">{opt.desc}</span>
                              </button>
                            ))}
                          </div>
                          {fieldErrors.frequency && (
                            <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> {fieldErrors.frequency}</p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* STEP 4 */}
                    {currentStep === 4 && (
                      <div className="space-y-6">
                        <div>
                          <label className="flex items-center gap-2 text-sm font-semibold text-tertiary mb-2">
                            <MessageSquare className="w-4 h-4 text-primary" />
                            Message ou demande sp&eacute;cifique
                          </label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={6}
                            className="w-full px-4 py-3.5 border border-gray-200 hover:border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                            placeholder="D\u00e9crivez vos besoins, volume estim\u00e9, contraintes particuli\u00e8res..."
                          />
                        </div>

                        <div className="bg-gradient-to-br from-gray-50 to-primary/5 rounded-xl p-6 border border-gray-100">
                          <h4 className="text-sm font-bold text-tertiary mb-4 flex items-center gap-2">
                            <Shield className="w-4 h-4 text-primary" />
                            R&eacute;capitulatif de votre demande
                          </h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500 block text-xs">Entreprise</span>
                              <span className="text-tertiary font-medium">{formData.companyName || '\u2014'}</span>
                            </div>
                            <div>
                              <span className="text-gray-500 block text-xs">Responsable</span>
                              <span className="text-tertiary font-medium">{formData.responsibleName || '\u2014'}</span>
                            </div>
                            <div>
                              <span className="text-gray-500 block text-xs">T&eacute;l&eacute;phone</span>
                              <span className="text-tertiary font-medium">{formData.phone || '\u2014'}</span>
                            </div>
                            <div>
                              <span className="text-gray-500 block text-xs">E-mail</span>
                              <span className="text-tertiary font-medium">{formData.email || '\u2014'}</span>
                            </div>
                            <div>
                              <span className="text-gray-500 block text-xs">Activit&eacute;</span>
                              <span className="text-tertiary font-medium capitalize">{formData.activityType || '\u2014'}</span>
                            </div>
                            <div>
                              <span className="text-gray-500 block text-xs">Fr&eacute;quence</span>
                              <span className="text-tertiary font-medium capitalize">{formData.frequency || '\u2014'}</span>
                            </div>
                            <div className="col-span-2">
                              <span className="text-gray-500 block text-xs">Services</span>
                              <div className="flex flex-wrap gap-1.5 mt-1">
                                {formData.services.length > 0 ? formData.services.map(s => (
                                  <span key={s} className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full">{s}</span>
                                )) : <span className="text-tertiary font-medium">\u2014</span>}
                              </div>
                            </div>
                          </div>
                        </div>

                        {submitStatus === 'error' && (
                          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
                            <XCircle className="w-5 h-5 shrink-0" />
                            Une erreur s'est produite. Veuillez r&eacute;essayer ou nous contacter directement.
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Navigation */}
                  <div className="px-8 py-5 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between">
                    {currentStep > 1 ? (
                      <button
                        type="button"
                        onClick={() => goToStep(currentStep - 1)}
                        className="flex items-center gap-2 text-gray-600 hover:text-tertiary font-medium py-2.5 px-5 rounded-xl hover:bg-gray-100 transition-all"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Pr&eacute;c&eacute;dent
                      </button>
                    ) : <div />}

                    {currentStep < TOTAL_STEPS ? (
                      <button
                        type="button"
                        onClick={() => goToStep(currentStep + 1)}
                        className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
                      >
                        Suivant
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-green-600/25 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Envoi en cours...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Envoyer la demande
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </form>

              {/* Trust badges */}
              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                  <div className="text-2xl mb-1">\u26a1</div>
                  <p className="text-xs font-semibold text-tertiary">R&eacute;ponse sous 24h</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                  <div className="text-2xl mb-1">\ud83d\udccb</div>
                  <p className="text-xs font-semibold text-tertiary">Devis gratuit</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                  <div className="text-2xl mb-1">\ud83e\udd1d</div>
                  <p className="text-xs font-semibold text-tertiary">Service 7j/7</p>
                </div>
              </div>
            </div>
          </div>
        </SectionMargin>
      </SectionWrapper>
    </div>
  );
};

export default ProfessionalContact;
