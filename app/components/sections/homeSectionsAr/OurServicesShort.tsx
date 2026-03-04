'use client';

import React from 'react';
import Link from 'next/link';
import { Shirt, Sparkles, Zap, MapPin, ArrowLeft, ShirtIcon, Check } from 'lucide-react';
import SectionWrapper from '@/app/components/common/SectionWrapper';
import SectionMargin from '@/app/components/common/SectionMargin';
import SectionBadge from '@/app/components/common/SectionBadge';

interface Service {
  name: string;
  nameAr: string;
  tag: string;
  tagAr: string;
  tagColor: string;
  description: string;
  descriptionAr: string;
  perks: string[];
  perksAr: string[];
  icon: React.ReactNode;
  accentColor: string;
}

const services: Service[] = [
  {
    name: 'Linge Nettoyé & Plié',
    nameAr: 'غسيل منظف ومطوي',
    tag: 'Au kilo',
    tagAr: 'بالكيلو',
    tagColor: 'bg-primary/10 text-primary',
    description: 'Idéal pour votre linge quotidien. Collecté, lavé, séché et plié soigneusement.',
    descriptionAr: 'مثالي لغسيلك اليومي. يُستلم ويُغسل ويُجفف ويُطوى بعناية، جاهزاً للتخزين مباشرة.',
    perks: ['Facturé au kilogramme', 'Livraison sous 24h', 'Linge plié & emballé'],
    perksAr: ['يُحسب بالكيلوغرام', 'توصيل في 24 ساعة', 'مطوي ومعبأ'],
    icon: <Shirt className="w-6 h-6" />,
    accentColor: '#4dafef',
  },
  {
    name: 'Pressing & Repassage',
    nameAr: 'تنظيف جاف وكي',
    tag: 'À la pièce',
    tagAr: 'بالقطعة',
    tagColor: 'bg-purple-100 text-purple-600',
    description: 'Nettoyage à sec professionnel pour vos vêtements délicats.',
    descriptionAr: 'تنظيف جاف احترافي لملابسك الحساسة والبدلات والفساتين وملابس المناسبات.',
    perks: ['Traitement pièce par pièce', 'Produits professionnels', 'Costumes, robes, djellabas'],
    perksAr: ['معالجة قطعة بقطعة', 'منتجات احترافية', 'بدلات، فساتين، جلابيب'],
    icon: <Sparkles className="w-6 h-6" />,
    accentColor: '#9333ea',
  },
  {
    name: 'Nettoyage EXPRESS',
    nameAr: 'تنظيف سريع',
    tag: '⚡ Moins de 24h',
    tagAr: '⚡ أقل من 24 ساعة',
    tagColor: 'bg-secondary/10 text-secondary',
    description: 'Besoin urgent ? Collecte rapide et retour en moins de 24 heures.',
    descriptionAr: 'هل تحتاج خدمة عاجلة؟ نافذة 30 دقيقة، استلام سريع وإعادة غسيلك في أقل من 24 ساعة.',
    perks: ['Collecte en 30 min', 'Retour garanti < 24h', 'Disponible 7j/7'],
    perksAr: ['استلام في 30 دقيقة', 'إعادة مضمونة < 24 ساعة', 'متاح 7 أيام'],
    icon: <Zap className="w-6 h-6" />,
    accentColor: '#e54a33',
  },
  {
    name: 'Repassage',
    nameAr: 'كي الملابس',
    tag: 'À la pièce',
    tagAr: 'بالقطعة',
    tagColor: 'bg-green-100 text-green-600',
    description: 'Repassage professionnel avec finitions impeccables.',
    descriptionAr: 'كي احترافي بلمسات نهائية لا تشوبها شائبة. قمصان، بنطلونات، فساتين — كل طية مثالية.',
    perks: ['Finition anti-plis', 'Sur cintre ou plié', 'Chemises & costumes'],
    perksAr: ['تشطيب مضاد للتجعد', 'على شماعة أو مطوي', 'قمصان وبدلات'],
    icon: <ShirtIcon className="w-6 h-6" />,
    accentColor: '#16a34a',
  },
];

const OurServicesShort = () => {
  return (
    <SectionWrapper className="py-20 md:py-28 bg-white">
      <SectionMargin>
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-14" dir="rtl">
            <div className="mb-5 flex justify-center">
              <SectionBadge
                text="خدماتنا"
                highlightText="الرئيسية"
              />
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-tertiary mb-3">
              خدماتنا <span className="text-primary">المهنية</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              اختر الخدمة المناسبة لك واستمتع بتجربة لا تشوبها شائبة
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6" dir="rtl">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 40px ${service.accentColor}20`;
                  (e.currentTarget as HTMLElement).style.borderColor = `${service.accentColor}30`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)';
                  (e.currentTarget as HTMLElement).style.borderColor = '#f3f4f6';
                }}
              >
                {/* Colored top accent */}
                <div
                  className="h-1.5 w-full"
                  style={{ background: `linear-gradient(90deg, ${service.accentColor}, ${service.accentColor}99)` }}
                />

                <div className="p-6">
                  {/* Icon + Tag */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="rounded-xl p-3 transition-all duration-300"
                      style={{ background: `${service.accentColor}12`, color: service.accentColor }}
                    >
                      {service.icon}
                    </div>
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${service.tagColor}`}>
                      {service.tagAr}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="text-lg font-bold text-tertiary mb-2">
                    {service.nameAr}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-500 leading-relaxed mb-5 line-clamp-3">
                    {service.descriptionAr}
                  </p>

                  {/* Perks */}
                  <div className="space-y-2 mb-5">
                    {service.perksAr.map((perk, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: `${service.accentColor}15` }}
                        >
                          <Check className="w-2.5 h-2.5" style={{ color: service.accentColor }} />
                        </div>
                        <span className="text-xs font-medium text-gray-600">{perk}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA link */}
                  <Link
                    href="/ar/services/"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 group-hover:gap-2.5"
                    style={{ color: service.accentColor }}
                  >
                    <span>المزيد</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Location note + CTA */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-5 p-5 rounded-2xl border border-primary/15 bg-primary/5" dir="rtl">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-sm font-semibold text-tertiary">
                  أعطنا موقعك ونحن نهتم بالباقي
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  خدمة مجانية للاستلام والتسليم في جميع أنحاء طنجة
                </p>
              </div>
            </div>
            <Link href="/ar/services/">
              <button
                className="shrink-0 flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-white rounded-xl transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #4dafef 0%, #1e3a5f 100%)',
                  boxShadow: '0 4px 16px rgba(77, 175, 239, 0.35)'
                }}
              >
                <span>عرض جميع الخدمات</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </SectionMargin>
    </SectionWrapper>
  );
};

export default OurServicesShort;
