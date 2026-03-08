'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Sparkles, Layers, Sofa, BedDouble, Shirt, Home, Truck, Scissors } from 'lucide-react';
import SectionWrapper from '@/app/components/common/SectionWrapper';
import SectionMargin from '@/app/components/common/SectionMargin';
import SectionBadge from '@/app/components/common/SectionBadge';
import SectionTitle from '@/app/components/common/SectionTitle';
import SpanText from '@/app/components/common/SpanText';

const services = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    accentColor: '#9333ea',
    fr: {
      title: 'Pressing & Nettoyage à sec',
      description: "Confiez-nous vos vêtements délicats : costumes, robes, chemises, manteaux, soie, laine, cachemire… Nous utilisons des solvants et procédés écologiques qui préservent les fibres, les couleurs et la douceur des tissus.",
    },
    ar: {
      title: 'التنظيف الجاف والكيّ الاحترافي',
      description: 'سلّم ملابسك الحساسة إلينا: البدل، الفساتين، القمصان، المعاطف، الحرير، الصوف والكشمير… نستخدم مواد وطرق صديقة للبيئة تحفظ نسيج وقيمة الأقمشة وألوانها.',
    },
  },
  {
    icon: <Layers className="w-6 h-6" />,
    accentColor: '#e54a33',
    fr: {
      title: 'Nettoyage de tapis',
      description: "Nettoyage professionnel de tous types de tapis (laine, synthétique, kilim, etc.) : aspiration en profondeur, détachage, shampooing et séchage contrôlé pour retrouver la couleur et la texture d'origine sans abîmer les fibres.",
    },
    ar: {
      title: 'تنظيف السجاد',
      description: 'تنظيف احترافي لجميع أنواع السجاد (صوف، صناعي، كيلم، إلخ): شفط عميق، إزالة البقع، غسيل بالشامبو وتجفيف مراقب لاستعادة اللون ونعومة النسيج دون تلف الألياف.',
    },
  },
  {
    icon: <Sofa className="w-6 h-6" />,
    accentColor: '#4dafef',
    fr: {
      title: 'Nettoyage et rénovation de canapés & fauteuils',
      description: "Traitement en profondeur des revêtements textiles et cuir, extraction des taches, désinfection et protection anti-tache pour prolonger la durée de vie de vos meubles.",
    },
    ar: {
      title: 'تنظيف الأرائك والكراسي وتجديدها',
      description: 'معالجة عميقة لمواد التنجيد والجلد، إزالة البقع، التعقيم، وحماية ضد البقع لتمديد عمر قطع الأثاث.',
    },
  },
  {
    icon: <BedDouble className="w-6 h-6" />,
    accentColor: '#16a34a',
    fr: {
      title: 'Nettoyage de literie & couettes',
      description: "Lavage hygiénique des draps, housses, oreillers, couettes et surmatelas avec cycles adaptés et désinfection pour un sommeil sain et frais.",
    },
    ar: {
      title: 'تنظيف المفروشات والأغطية واللحف',
      description: 'غسيل صحي للشراشف، الأغطية، الوسائد والمراتب مع دورات ملائمة وتعقيم لضمان نوم صحي ومنعش.',
    },
  },
  {
    icon: <Shirt className="w-6 h-6" />,
    accentColor: '#1e3a5f',
    fr: {
      title: 'Entretien du linge quotidien',
      description: "Service complet : lavage, séchage, repassage et pliage selon vos préférences (température, lessive hypoallergénique, pliage spécifique, etc.).",
    },
    ar: {
      title: 'غسيل الملابس اليومية',
      description: 'خدمة شاملة: غسيل، تجفيف، كي وطيّ حسب تفضيلاتك (درجة الحرارة، منظفات مضادة للحساسية، طرق طيّ خاصة، إلخ).',
    },
  },
  {
    icon: <Home className="w-6 h-6" />,
    accentColor: '#0891b2',
    fr: {
      title: 'Nettoyage à domicile (sur site)',
      description: "Interventions chez vous pour tapis, canapés, matelas et rideaux avec matériel professionnel — sans déplacement d'objets volumineux.",
    },
    ar: {
      title: 'التنظيف في المنزل (خدمات بالموقع)',
      description: 'نقدّم عمليات تنظيف عندك للسجاد، الأرائك، المراتب والستائر باستخدام معدات احترافية — دون الحاجة لنقل الأغراض الكبيرة.',
    },
  },
  {
    icon: <Truck className="w-6 h-6" />,
    accentColor: '#f59e0b',
    fr: {
      title: 'Service Express & Livraison gratuite',
      description: "Collecte et livraison gratuites de 9h à 21h. Option express disponible : traitement et retour en moins de 24 heures si nécessaire.",
    },
    ar: {
      title: 'خدمة سريعة وتوصيل مجاني',
      description: 'الاستلام والتوصيل المجاني من 9 صباحًا حتى 9 مساءً. خيار الخدمة السريعة: التسليم خلال أقل من 24 ساعة عند الحاجة.',
    },
  },
  {
    icon: <Scissors className="w-6 h-6" />,
    accentColor: '#be185d',
    fr: {
      title: 'Service professionnel pour textiles délicats & retouches',
      description: "Prise en charge des articles très fragiles (soie, broderie, pièces haute couture) et service de petites retouches/ourlets.",
    },
    ar: {
      title: 'خدمات خاصة للأقمشة الحساسة وتصليح الملابس',
      description: 'نعتني بالقطع الهشة جدًا (الحرير، التطريز، قطع الأزياء الراقية) ونقدّم خدمات تعديل وخياطة صغيرة.',
    },
  },
];

const ServicesDetailed: React.FC = () => {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');

  return (
    <SectionWrapper className="py-20 md:py-28 bg-white">
      <SectionMargin>
        <div className="max-w-7xl mx-auto" dir={isArabic ? 'rtl' : 'ltr'}>

          {/* Header */}
          <div className="text-center mb-16">
            <div className="mb-5 flex justify-center">
              <SectionBadge
                text={isArabic ? 'خدماتنا' : 'Nos'}
                highlightText={isArabic ? '' : 'Services'}
              />
            </div>
            <SectionTitle>
              {isArabic ? (
                <>خدماتنا <span className="text-primary">المهنية</span></>
              ) : (
                <>Nos Services <SpanText text="Professionnels" className="" /></>
              )}
            </SectionTitle>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => {
              const content = isArabic ? service.ar : service.fr;
              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl border border-gray-100 p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden"
                  style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
                >
                  {/* Number badge */}
                  <span
                    className="absolute top-5 font-black text-6xl opacity-[0.04] select-none leading-none"
                    style={{ color: service.accentColor, ...(isArabic ? { left: '1.25rem' } : { right: '1.25rem' }) }}
                  >
                    0{index + 1}
                  </span>

                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${service.accentColor}12`, color: service.accentColor }}
                  >
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-tertiary mb-3">
                    {content.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {content.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </SectionMargin>
    </SectionWrapper>
  );
};

export default ServicesDetailed;
