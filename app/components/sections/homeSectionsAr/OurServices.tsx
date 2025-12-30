'use client';

import React from 'react';
import { Sparkles, Shirt, Zap, ShirtIcon, ShirtIcon as Iron, Home } from 'lucide-react';
import SectionBadge from '@/app/components/common/SectionBadge';

interface Service {
  title: string;
  titleHighlight: string; // الجزء المميز من العنوان باللون الأخضر
  description: string;
  highlightedText?: string[]; // الكلمات/العبارات لتكون بالخط العريض
  icon: React.ReactNode;
}

const services: Service[] = [
  {
    title: "غسيل",
    titleHighlight: "مطوي & منظف",
    description:
      "يتم احتساب السعر بالكيلوغرام، خدمتنا لغسل الملابس بالكيلو مناسبة تمامًا لملابسكم اليومية. سيتم غسل جميع القطع معًا عند 30°C، تجفيفها في المجفف ثم طيها. كل حقيبة غسيل يتم احتسابها بالكيلو مع حد أدنى 3 كغ لكل طلب.",
    highlightedText: ["30°C", "حد أدنى 3 كغ"],
    icon: <Shirt className="text-primary" size={28} />,
  },
  {
    title: "تنظيف جاف &",
    titleHighlight: "كي الملابس",
    description:
      "يتم احتساب السعر حسب القطعة، خدمة التنظيف الجاف والكي تتم لكل قطعة على حدة. كل قطعة يتم تنظيفها جافًا، كيها وتسليمها على شماعة بشكل فردي.",
    highlightedText: ["تنظيف جاف", "على شماعة"],
    icon: <Sparkles className="text-primary" size={28} />,
  },
  {
    title: "تنظيف",
    titleHighlight: "سريع",
    description:
      "مدة الخدمة 30 دقيقة، الغسيل والكي بالكيلو يتم تسليمه خلال أقل من 24 ساعة. خدمة سريعة وموثوقة لتلبية احتياجاتكم العاجلة.",
    highlightedText: ["30 دقيقة", "أقل من 24 ساعة"],
    icon: <Zap className="text-primary" size={28} />,
  },
  {
    title: "كي الملابس",
    titleHighlight: "قطع صغيرة",
    description:
      "كي احترافي للملابس التالية: قميص، بنطال، فستان قصير، بولو، سترة، كنزة، جاكيت، سترة قصيرة…",
    highlightedText: ["قميص", "بنطال", "فستان قصير"],
    icon: <ShirtIcon className="text-primary" size={28} />,
  },
  {
    title: "كي الملابس",
    titleHighlight: "قطع كبيرة",
    description:
      "كي احترافي للملابس التالية: بدلة، بدلة رسمية للنساء، معطف، فستان طويل، جلابة، قندورة، قفطان (قطعة واحدة)، جبدور…",
    highlightedText: ["بدلة", "جلابة", "قندورة", "قفطان"],
    icon: <Iron className="text-primary" size={28} />,
  },
  {
    title: "تنظيف",
    titleHighlight: "السجاد",
    description:
      "تنظيف احترافي لجميع أنواع السجاد (صوفي، صناعي، كليم، إلخ): شفط عميق، إزالة البقع، غسيل بالشامبو وتجفيف مضبوط لاستعادة اللون ونعومة النسيج دون إتلاف الألياف.",
    highlightedText: ["شفط عميق", "إزالة البقع", "غسيل بالشامبو"],
    icon: <Home className="text-primary" size={28} />,
  },
];

export default function ServicesCards() {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-6 flex justify-center">
            <SectionBadge text="مغسلة" highlightText="طنجة" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-tertiary mb-4 text-center">
            خدماتنا <span className="text-primary">المميزة</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto text-center">
            حلول متكاملة للتنظيف والصيانة الاحترافية
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => {
            const formatDescription = (text: string, highlights?: string[]) => {
              if (!highlights || highlights.length === 0) return text;
              
              let formattedText = text;
              highlights.forEach((highlight) => {
                const regex = new RegExp(`(${highlight})`, 'gi');
                formattedText = formattedText.replace(regex, '<strong>$1</strong>');
              });
              
              return formattedText;
            };

            return (
              <div
                key={index}
                className="bg-white rounded-xl p-8 transition-all duration-300 border border-gray-100"
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
                <div className="flex justify-start mb-6">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                    {service.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-right">
                  <span className="text-tertiary">{service.title}</span>{' '}
                  <span className="text-primary">{service.titleHighlight}</span>
                </h3>

                {/* Description */}
                <p 
                  className="text-gray-700 text-sm md:text-base leading-relaxed text-right"
                  dangerouslySetInnerHTML={{ 
                    __html: formatDescription(service.description, service.highlightedText) 
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
