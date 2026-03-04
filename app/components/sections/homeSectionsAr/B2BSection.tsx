'use client'
import React, { useState } from 'react';
import SectionWrapper from '@/app/components/common/SectionWrapper';
import SectionMargin from '@/app/components/common/SectionMargin';
import SectionBadge from '@/app/components/common/SectionBadge';
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

export default function B2BSectionAr() {
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
    'تنظيف',
    'غسيل',
    'سجاد',
    'أرائك',
    'مفروشات',
  ];

  return (
    <SectionWrapper className="py-16 md:py-24 bg-gray-50">
      <SectionMargin>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mb-6 flex justify-center">
              <SectionBadge text="نموذج" highlightText="المهنيين" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-tertiary mb-4">
              حلول مخصصة{' '}
              <span className="text-primary">لمؤسستك</span>
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
              هل أنت فندق أو مطعم أو مكتب أو صالون تجميل أو مؤسسة أخرى؟ 
              توفر لك Laundry.ma حلول تنظيف مخصصة تناسب احتياجاتك المهنية.
            </p>
            <p className="text-base text-primary font-semibold">
              💬 سنتواصل معك قريبًا لتقديم الحل الأنسب لاحتياجاتك.
            </p>
          </div>

          {/* Form Section */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-tertiary mb-6 text-center">
                🧾 نموذج الاتصال المهني
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6 text-right">
                {/* Nom de l'entreprise */}
                <div>
                  <label htmlFor="companyName" className="block text-sm font-semibold text-tertiary mb-2">
                    اسم المؤسسة *
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="اسم مؤسستك"
                  />
                </div>

                {/* Nom et prénom du responsable */}
                <div>
                  <label htmlFor="responsibleName" className="block text-sm font-semibold text-tertiary mb-2">
                    اسم الشخص المسؤول *
                  </label>
                  <input
                    type="text"
                    id="responsibleName"
                    name="responsibleName"
                    value={formData.responsibleName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="الاسم الكامل"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Téléphone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-tertiary mb-2">
                      رقم الهاتف *
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
                      البريد الإلكتروني *
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
                    العنوان *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="العنوان الكامل"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Type d'activité */}
                  <div>
                    <label htmlFor="activityType" className="block text-sm font-semibold text-tertiary mb-2">
                      نوع النشاط *
                    </label>
                    <select
                      id="activityType"
                      name="activityType"
                      value={formData.activityType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">اختر نوع النشاط</option>
                      <option value="hotel">فندق</option>
                      <option value="restaurant">مطعم</option>
                      <option value="bureau">مكتب</option>
                      <option value="salon-beaute">صالون تجميل</option>
                      <option value="autre">أخرى</option>
                    </select>
                  </div>

                  {/* Fréquence souhaitée */}
                  <div>
                    <label htmlFor="frequency" className="block text-sm font-semibold text-tertiary mb-2">
                      التكرار المطلوب *
                    </label>
                    <select
                      id="frequency"
                      name="frequency"
                      value={formData.frequency}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">اختر التكرار</option>
                      <option value="quotidienne">يومي</option>
                      <option value="hebdomadaire">أسبوعي</option>
                      <option value="mensuelle">شهري</option>
                      <option value="ponctuelle">عند الطلب</option>
                    </select>
                  </div>
                </div>

                {/* Services souhaités */}
                <div>
                  <label className="block text-sm font-semibold text-tertiary mb-3">
                    الخدمات المطلوبة *
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
                    ملاحظات أو طلبات خاصة
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    placeholder="ملاحظاتك أو طلباتك الخاصة..."
                  />
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                    تم إرسال الرسالة بنجاح! سيتواصل معك فريقنا قريبًا.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                    حدث خطأ ما. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || formData.services.length === 0}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'جارٍ الإرسال...' : 'إرسال الطلب'}
                </button>

                {/* Catchphrase After */}
                <div className="mt-6 space-y-2 text-right">
                  <p className="text-gray-700 text-base">
                    💬 سنتواصل معك في أقرب وقت لتقديم الحل الأنسب لاحتياجاتك.
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








