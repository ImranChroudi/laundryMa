'use client'
import React from 'react';
import { usePathname } from 'next/navigation';
import SectionWrapper from '@/app/components/common/SectionWrapper';
import SectionMargin from '@/app/components/common/SectionMargin';
import SectionBadge from '@/app/components/common/SectionBadge';
import CTAButton from '@/app/components/common/CTAButton';
import { Zap, Sparkles, Lightbulb, Leaf, ShieldCheck } from 'lucide-react';

const valuesData = [
  {
    icon: <Sparkles className="w-7 h-7" />,
    color: '#9333ea',
    bg: 'from-purple-50 to-white',
    fr: {
      title: 'Qualité',
      description: "Nous garantissons un nettoyage irréprochable pour tous vos vêtements et textiles, du plus délicat au plus volumineux.",
      tag: '✅ Qualité',
    },
    ar: {
      title: 'الجودة',
      description: 'نضمن لك تنظيفًا مثاليًا لجميع ملابسك ومفروشاتك، من الأدق إلى الأكبر حجمًا.',
      tag: '✅ الجودة',
    },
    image: '/images/quality.png',
  },
  {
    icon: <Leaf className="w-7 h-7" />,
    color: '#16a34a',
    bg: 'from-green-50 to-white',
    fr: {
      title: "Respect de l'environnement",
      description: "Nos produits et méthodes sont écologiques, sans danger pour votre peau ni pour la planète.",
      tag: '🌱 Éco-responsable',
    },
    ar: {
      title: 'احترام البيئة',
      description: 'منتجاتنا وطرقنا صديقة للبيئة وآمنة لبشرتك والكوكب.',
      tag: '🌱 صديق للبيئة',
    },
    image: '/images/responsabilite.png',
  },
  {
    icon: <Zap className="w-7 h-7" />,
    color: '#4dafef',
    bg: 'from-blue-50 to-white',
    fr: {
      title: 'Rapidité & Fiabilité',
      description: "Nous savons que votre temps est précieux : collecte et livraison rapides, service express disponible.",
      tag: '⏱ Express',
    },
    ar: {
      title: 'السرعة والموثوقية',
      description: 'نعرف أن وقتك ثمين: استلام وتسليم سريع، وخدمة سريعة متاحة عند الطلب.',
      tag: '⏱ سريع',
    },
    image: '/images/rapidite.png',
  },
  {
    icon: <ShieldCheck className="w-7 h-7" />,
    color: '#1e3a5f',
    bg: 'from-slate-50 to-white',
    fr: {
      title: 'Confiance & Transparence',
      description: "Nous mettons un point d'honneur à respecter vos objets et à vous proposer des prix clairs et transparents.",
      tag: '🤝 Confiance',
    },
    ar: {
      title: 'الثقة والشفافية',
      description: 'نحرص على احترام أغراضك وتقديم أسعار واضحة وشفافة دائمًا.',
      tag: '🤝 الثقة',
    },
    image: '/images/rapidite.png',
  },
  {
    icon: <Lightbulb className="w-7 h-7" />,
    color: '#e54a33',
    bg: 'from-orange-50 to-white',
    fr: {
      title: 'Innovation & Service',
      description: "Nous améliorons constamment nos services pour vous offrir une expérience simple, pratique et adaptée à vos besoins.",
      tag: '💡 Innovation',
    },
    ar: {
      title: 'الابتكار والخدمة',
      description: 'نطور خدماتنا باستمرار لتوفير تجربة سهلة، عملية، ومناسبة لاحتياجاتك.',
      tag: '💡 الابتكار',
    },
    image: '/images/innovation.png',
  },
];

const ValuesSection: React.FC = () => {
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
                text={isArabic ? 'قيمنا' : 'Nos'}
                highlightText={isArabic ? 'الأساسية' : 'valeurs'}
              />
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-tertiary mb-4 leading-tight">
              {isArabic ? (
                <>ما الذي <span className="text-primary">يميزنا</span></>
              ) : (
                <>Ce qui nous <span className="text-primary">distingue</span></>
              )}
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              {isArabic
                ? 'قيم راسخة توجه التزامنا نحو التميز ورضا العملاء في كل خطوة'
                : "Des valeurs fortes qui guident notre engagement envers l'excellence et la satisfaction client"}
            </p>
          </div>

          {/* Values — alternating layout */}
          <div className="space-y-8">
            {valuesData.map((v, index) => {
              const content = isArabic ? v.ar : v.fr;
              const isReversed = isArabic ? index % 2 === 0 : index % 2 !== 0;
              return (
                <div
                  key={index}
                  className={`group flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300`}
                  style={{ boxShadow: `0 4px 24px ${v.color}14` }}
                >
                  {/* Image */}
                  <div className="lg:w-2/5 min-h-60 relative overflow-hidden">
                    <div
                      className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105"
                      style={{
                        backgroundImage: `url(${v.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: `linear-gradient(135deg, ${v.color}50 0%, transparent 60%)` }}
                    />
                    <div className="absolute top-4 left-4">
                      <span
                        className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-xs font-bold px-3 py-1.5 rounded-full shadow-sm"
                        style={{ color: v.color }}
                      >
                        {content.tag}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`lg:w-3/5 p-8 md:p-12 flex flex-col justify-center bg-linear-to-br ${v.bg}`}>
                    <div className="flex items-center gap-4 mb-5">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                        style={{ background: `${v.color}18`, color: v.color }}
                      >
                        {v.icon}
                      </div>
                      <span
                        className="text-6xl font-black opacity-[0.06] select-none leading-none"
                        style={{ color: v.color }}
                      >
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-tertiary mb-3">
                      {content.title}
                    </h3>
                    <p className="text-gray-500 text-base leading-relaxed mb-7">
                      {content.description}
                    </p>
                    <div className="max-w-max">
                      <CTAButton />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA banner */}
          <div
            className="mt-16 rounded-3xl px-8 py-12 text-center"
            style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #2c5282 55%, #4dafef 100%)' }}
          >
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
              {isArabic ? 'مستعد لتجربة الفرق؟' : 'Prêt à vivre la différence ?'}
            </h3>
            <p className="text-white/70 text-base mb-7 max-w-xl mx-auto">
              {isArabic
                ? 'انضم إلى أكثر من 1000 عميل راضٍ ودعنا نهتم بغسيلك.'
                : 'Rejoignez plus de 1 000 clients satisfaits et laissez-nous prendre soin de votre linge.'}
            </p>
            <div className='mx-auto max-w-max' >
              <CTAButton />
            </div>
          </div>
 
        </div>
      </SectionMargin>
    </SectionWrapper>
  );
};

export default ValuesSection;
