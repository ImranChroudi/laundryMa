'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Shield, Clock, Truck, Award, Heart, Zap } from 'lucide-react';
import SectionWrapper from '@/app/components/common/SectionWrapper';
import SectionMargin from '@/app/components/common/SectionMargin';
import SectionBadge from '@/app/components/common/SectionBadge';

interface Feature {
  icon: React.ReactNode;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
}

const features: Feature[] = [
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Qualité Professionnelle',
    titleAr: 'جودة احترافية',
    description: 'Nos experts utilisent des techniques et produits de pointe pour garantir un résultat impeccable.',
    descriptionAr: 'يستخدم خبراؤنا تقنيات ومنتجات متطورة لضمان نتيجة لا تشوبها شائبة.',
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: 'Service Express',
    titleAr: 'خدمة سريعة',
    description: 'Livraison en moins de 24h pour répondre à vos besoins urgents.',
    descriptionAr: 'تسليم في أقل من 24 ساعة للاستجابة لاحتياجاتك العاجلة.',
  },
  {
    icon: <Truck className="w-8 h-8" />,
    title: 'Collecte & Livraison Gratuites',
    titleAr: 'استلام وتسليم مجاني',
    description: 'Service de collecte et livraison à domicile gratuit partout à Tanger.',
    descriptionAr: 'خدمة استلام وتسليم مجانية في المنزل في جميع أنحاء طنجة.',
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: 'Satisfaction Garantie',
    titleAr: 'ضمان الرضا',
    description: 'Nous garantissons votre satisfaction à 100% ou nous refaisons le travail.',
    descriptionAr: 'نضمن رضاك بنسبة 100% أو نعيد العمل.',
  },
];

const WhyChooseUs = () => {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');

  return (
    <SectionWrapper className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <SectionMargin>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className={`text-center mb-12 ${isArabic ? 'text-right' : 'text-left'}`} dir={isArabic ? 'rtl' : 'ltr'}>
            <div className="mb-6 flex justify-center">
              <SectionBadge 
                text={isArabic ? "لماذا" : "Pourquoi"} 
                highlightText={isArabic ? "تختارنا" : "nous choisir"} 
              />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-tertiary mb-4">
              {isArabic ? (
                <>
                  حلول احترافية <span className="text-primary">مخصصة</span>
                </>
              ) : (
                <>
                  Des Solutions Professionnelles <span className="text-primary">Adaptées</span>
                </>
              )}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {isArabic
                ? 'نقدم خدمات تنظيف عالية الجودة مصممة خصيصاً لاحتياجاتك'
                : 'Nous offrons des services de nettoyage de haute qualité conçus spécialement pour vos besoins'
              }
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-2"
                style={{
                  boxShadow: '0 10px 25px rgba(77, 175, 239, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(77, 175, 239, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(77, 175, 239, 0.2)';
                }}
              >
                {/* Icon */}
                <div className={`mb-6 ${isArabic ? 'flex justify-end' : 'flex justify-start'}`}>
                  <div className="bg-primary/10 rounded-full p-4">
                    <div className="text-primary">
                      {feature.icon}
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className={`text-xl md:text-2xl font-bold text-tertiary mb-4 ${isArabic ? 'text-right' : 'text-left'}`}>
                  {isArabic ? feature.titleAr : feature.title}
                </h3>

                {/* Description */}
                <p className={`text-gray-600 leading-relaxed ${isArabic ? 'text-right' : 'text-left'}`}>
                  {isArabic ? feature.descriptionAr : feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionMargin>
    </SectionWrapper>
  );
};

export default WhyChooseUs;
