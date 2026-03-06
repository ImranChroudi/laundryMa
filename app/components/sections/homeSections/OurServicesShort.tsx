'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Shirt, Sparkles, Zap, Wind, MapPin, ArrowRight, Check, Phone } from 'lucide-react';
import SectionWrapper from '@/app/components/common/SectionWrapper';
import SectionMargin from '@/app/components/common/SectionMargin';
import SectionBadge from '@/app/components/common/SectionBadge';
import SpanText from '@/app/components/common/SpanText';
import SectionTitle from '@/app/components/common/SectionTitle';

interface Service {
  id: number;
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
  bgColor: string;
}

const services: Service[] = [
  {
    id: 1,
    name: 'Linge Nettoyé & Plié',
    nameAr: 'غسيل منظف ومطوي',
    tag: 'Au kilo',
    tagAr: 'بالكيلو',
    tagColor: 'bg-primary/10 text-primary',
    description: 'Idéal pour votre linge quotidien. Collecté, lavé, séché et plié soigneusement, prêt à ranger directement.',
    descriptionAr: 'مثالي لغسيلك اليومي. يُستلم ويُغسل ويُجفف ويُطوى بعناية، جاهزاً للتخزين مباشرة.',
    perks: ['Facturé au kilogramme', 'Livraison sous 24h', 'Linge plié & emballé'],
    perksAr: ['يُحسب بالكيلوغرام', 'توصيل في 24 ساعة', 'مطوي ومعبأ'],
    icon: <Shirt className="w-6 h-6" />,
    accentColor: '#4dafef',
    bgColor: 'from-blue-50 to-white',
  },
  {
    id: 2,
    name: 'Pressing & Repassage',
    nameAr: 'تنظيف جاف وكي',
    tag: 'À la pièce',
    tagAr: 'بالقطعة',
    tagColor: 'bg-purple-100 text-purple-600',
    description: 'Nettoyage à sec professionnel pour vos vêtements délicats, costumes, robes et tenues de cérémonie.',
    descriptionAr: 'تنظيف جاف احترافي لملابسك الحساسة والبدلات والفساتين وملابس المناسبات.',
    perks: ['Traitement pièce par pièce', 'Produits professionnels', 'Costumes, robes, djellabas'],
    perksAr: ['معالجة قطعة بقطعة', 'منتجات احترافية', 'بدلات، فساتين، جلابيب'],
    icon: <Sparkles className="w-6 h-6" />,
    accentColor: '#9333ea',
    bgColor: 'from-purple-50 to-white',
  },
  {
    id: 3,
    name: 'Nettoyage EXPRESS',
    nameAr: 'تنظيف سريع',
    tag: '⚡ Moins de 24h',
    tagAr: '⚡ أقل من 24 ساعة',
    tagColor: 'bg-secondary/10 text-secondary',
    description: 'Besoin urgent ? Créneau de 30 min, collecte rapide et retour de votre linge en moins de 24 heures.',
    descriptionAr: 'هل تحتاج خدمة عاجلة؟ نافذة 30 دقيقة، استلام سريع وإعادة غسيلك في أقل من 24 ساعة.',
    perks: ['Collecte en 30 min', 'Retour garanti < 24h', 'Disponible 7j/7'],
    perksAr: ['استلام في 30 دقيقة', 'إعادة مضمونة < 24 ساعة', 'متاح 7 أيام'],
    icon: <Zap className="w-6 h-6" />,
    accentColor: '#e54a33',
    bgColor: 'from-orange-50 to-white',
  },
  {
    id: 4,
    name: 'Repassage',
    nameAr: 'كي الملابس',
    tag: 'À la pièce',
    tagAr: 'بالقطعة',
    tagColor: 'bg-green-100 text-green-600',
    description: 'Repassage professionnel avec finitions impeccables. Chemises, pantalons, robes — chaque pli est parfait.',
    descriptionAr: 'كي احترافي بلمسات نهائية لا تشوبها شائبة. قمصان، بنطلونات، فساتين — كل طية مثالية.',
    perks: ['Finition anti-plis', 'Sur cintre ou plié', 'Chemises & costumes'],
    perksAr: ['تشطيب مضاد للتجعد', 'على شماعة أو مطوي', 'قمصان وبدلات'],
    icon: <Wind className="w-6 h-6" />,
    accentColor: '#16a34a',
    bgColor: 'from-green-50 to-white',
  },
];

const OurServicesShort = () => {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');

  return (
    <SectionWrapper className="py-20 md:py-28 bg-white">
      <SectionMargin>
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-14" dir={isArabic ? 'rtl' : 'ltr'}>
            <div className="mb-5 flex justify-center">
              <SectionBadge
                text={isArabic ? "خدماتنا" : "Nos services"}
                highlightText={isArabic ? "الرئيسية" : "principaux"}
              />
            </div>
            <SectionTitle>
              {isArabic ? (
                <>خدماتنا <span className="text-primary">المهنية</span></>
              ) : (
                <>Nos Services <SpanText text="Professionnels" className="" /></>
              )}
            </SectionTitle>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              {isArabic
                ? 'اختر الخدمة المناسبة لك واستمتع بتجربة لا تشوبها شائبة'
                : 'Sélectionnez un service et découvrez ce que nous faisons pour vous'}
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6" dir={isArabic ? 'rtl' : 'ltr'}>
            {services.map((service) => (
              <div
                key={service.id}
                className="group relative bg-white rounded-3xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                style={{
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                }}
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
                      style={{
                        background: `${service.accentColor}12`,
                        color: service.accentColor,
                      }}
                    >
                      {service.icon}
                    </div>
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${service.tagColor}`}>
                      {isArabic ? service.tagAr : service.tag}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="text-lg font-bold text-tertiary mb-2">
                    {isArabic ? service.nameAr : service.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-500 leading-relaxed mb-5 line-clamp-3">
                    {isArabic ? service.descriptionAr : service.description}
                  </p>

                  {/* Perks */}
                  <div className="space-y-2">
                    {(isArabic ? service.perksAr : service.perks).map((perk, i) => (
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
                </div>
              </div>
            ))}
          </div>

          {/* Contact + CTA */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-5 p-5 rounded-2xl border border-primary/15 bg-primary/5" dir={isArabic ? 'rtl' : 'ltr'}>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-sm font-semibold text-tertiary">
                  {isArabic ? 'أعطنا موقعك ونحن نهتم بالباقي' : 'Donnez-nous votre adresse, on s\'occupe du reste'}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {isArabic ? 'خدمة مجانية للاستلام والتسليم في جميع أنحاء طنجة' : 'Collecte & livraison gratuites partout à Tanger'}
                </p>
              </div>
            </div>
            <div className="flex sm:flex-row flex-col items-center gap-3">
              <a
                href="tel:+212677777724"
                className="shrink-0 flex items-center gap-2 px-5 py-3.5 text-sm font-bold text-tertiary rounded-xl border border-tertiary/20 bg-white hover:bg-gray-50 transition-all duration-200"
              >
                <Phone className={`w-4 h-4 ${isArabic ? 'rotate-270' : ''}`} />
                <span>+212 6 77 77 77 24</span>
              </a>
              <Link href={isArabic ? '/ar/checkout/' : '/checkout/'}>
                <button
                  className="shrink-0 flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-white rounded-xl transition-all duration-200 hover:opacity-90 active:scale-95"
                  style={{
                    background: 'linear-gradient(135deg, #4dafef 0%, #1e3a5f 100%)',
                    boxShadow: '0 4px 16px rgba(77, 175, 239, 0.35)'
                  }}
                >
                  <span>{isArabic ? 'طلب استلام' : 'Demander un ramassage'}</span>
                  <ArrowRight className={`w-4 h-4 ${isArabic ? 'rotate-180' : ''}`} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </SectionMargin>
    </SectionWrapper>
  );
};

export default OurServicesShort;
