'use client';

import React from 'react';
import Link from 'next/link';
import { Shirt, Sparkles, Zap, Home, MapPin, ChevronLeft, ArrowLeft, ShirtIcon } from 'lucide-react';
import SectionWrapper from '@/app/components/common/SectionWrapper';
import SectionMargin from '@/app/components/common/SectionMargin';
import SectionBadge from '@/app/components/common/SectionBadge';
import CTAButton from '@/app/components/common/CTAButton';

interface Service {
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  icon: React.ReactNode;
}

const services: Service[] = [
  {
    name: 'Linge Nettoyé & Plié',
    nameAr: 'غسيل منظف ومطوي',
    description: 'Facturé au kilo, notre service de linge au kilo convient parfaitement pour votre linge quotidien.',
    descriptionAr: 'يُحسب بالكيلو، خدمة الغسيل بالكيلو لدينا مناسبة تماماً لغسيلك اليومي.',
    icon: <Shirt className="w-6 h-6" />,
  },
  {
    name: 'Pressing & Repassage',
    nameAr: 'تنظيف جاف وكي',
    description: 'Facturé à la pièce, notre service de nettoyage à sec et repassage s\'effectue par article.',
    descriptionAr: 'يُحسب بالقطعة، خدمة التنظيف الجاف والكي لدينا تتم لكل قطعة.',
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    name: 'Nettoyage EXPRESS',
    nameAr: 'تنظيف سريع',
    description: 'Créneau horaire de 30 min, pressing et linge au kilo livré en moins de 24 heures.',
    descriptionAr: 'نافذة زمنية مدتها 30 دقيقة، التنظيف الجاف والغسيل بالكيلو يتم تسليمه في أقل من 24 ساعة.',
    icon: <Zap className="w-6 h-6" />,
  },
  {
    name: 'Repassage',
    nameAr: 'كي الملابس',
    description: 'Repassage professionnel de vos vêtements avec soin et précision.',
    descriptionAr: 'كي مهني لملابسك بعناية ودقة.',
    icon: <ShirtIcon className="w-6 h-6" />,
  },
];

const OurServicesShort = () => {
  return (
    <SectionWrapper className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <SectionMargin>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12" dir="rtl">
          <div className="mb-6 flex justify-center">
              <SectionBadge 
                text="خدماتنا" 
                highlightText="الرئيسية" 
              />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-tertiary mb-4">
              خدماتنا <span className="text-primary">المهنية</span>
            </h2>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Left Side - Service Names */}
            <div className="space-y-4" dir="rtl">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  style={{
                    boxShadow: '0 4px 6px rgba(77, 175, 239, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(77, 175, 239, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(77, 175, 239, 0.1)';
                  }}
                >
                  <div className="flex items-center gap-4 flex-row-reverse">
                    <div className="bg-primary/10 rounded-full p-3">
                      <div className="text-primary">
                        {service.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-tertiary flex-1 text-right">
                      {service.nameAr}
                    </h3>
                    <ChevronLeft className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
              
              {/* Location Message */}
              <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/20 text-right">
                <div className="flex items-start gap-3 flex-row-reverse">
                  <MapPin className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold text-tertiary mb-1">
                      أعطنا موقعك ونحن نهتم بالباقي
                    </p>
                    <p className="text-sm text-gray-600">
                      خدمة مجانية للاستلام والتسليم في جميع أنحاء طنجة
                    </p>
                  </div>
                </div>
              </div>

              {/* Voir plus de détails Button */}
              <div className="mt-8 text-right">
                <Link href="/ar/services">
                  <button className="flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-primary rounded-lg hover:bg-primary/90 transition-all duration-300 w-full flex-row-reverse"
                    style={{
                      boxShadow: '0 4px 6px -1px rgba(77, 175, 239, 0.3), 0 2px 4px -1px rgba(77, 175, 239, 0.2)'
                    }}
                  >
                    <span>عرض المزيد من التفاصيل</span>
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Side - Description Card */}
            <div className="flex items-center" dir="rtl">
              <div 
                className="bg-white rounded-xl p-8 md:p-12 shadow-xl w-full"
                style={{
                  boxShadow: '0 10px 25px rgba(77, 175, 239, 0.3), 0 4px 6px rgba(77, 175, 239, 0.2)'
                }}
              >
                <h3 className="text-2xl md:text-3xl font-bold text-tertiary mb-6 text-right">
                  لماذا تختارنا؟
                </h3>
                <div className="space-y-4 text-gray-700 leading-relaxed text-right">
                  <p className="text-base md:text-lg">
                    نوفر خدمات تنظيف احترافية عالية الجودة مع ضمان الرضا الكامل. فريقنا المدرب يضمن العناية المثالية بملابسك.
                  </p>
                  <p className="text-base md:text-lg">
                    مع خدمة الاستلام والتسليم المجانية والتوفر 7 أيام في الأسبوع، نحن هنا لجعل حياتك أسهل.
                  </p>
                </div>

                {/* CTA Button */}
                <div className="mt-8 text-right">
                  <CTAButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionMargin>
    </SectionWrapper>
  );
};

export default OurServicesShort;
