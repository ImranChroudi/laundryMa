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
    icon: <Zap className="w-7 h-7" />,
    color: '#4dafef',
    bg: 'from-blue-50 to-white',
    fr: {
      title: 'Rapidité & Fiabilité',
      description: "Votre temps est précieux. Collecte et livraison rapides, service express disponible — nous nous adaptons à votre emploi du temps, pas l'inverse.",
      tag: 'Express 24h',
    },
    ar: {
      title: 'السرعة والموثوقية',
      description: 'وقتك ثمين. استلام وتوصيل سريع، خدمة سريعة متاحة — نحن نتكيف مع جدولك الزمني، وليس العكس.',
      tag: 'سريع 24 ساعة',
    },
    image: '/images/rapidite.png',
  },
  {
    icon: <Sparkles className="w-7 h-7" />,
    color: '#9333ea',
    bg: 'from-purple-50 to-white',
    fr: {
      title: 'La Qualité',
      description: "Nettoyage impressionnant et finition minutieuse de tous les textiles, même les plus délicats — soie, cachemire, alpaga. Chaque pièce traitée avec soin.",
      tag: 'Résultat impeccable',
    },
    ar: {
      title: 'الجودة',
      description: 'تنظيف رائع وتشطيب دقيق لجميع المنسوجات، حتى الأكثر حساسية — حرير، كشمير، ألباكا. كل قطعة تُعامَل بعناية.',
      tag: 'نتيجة لا تشوبها شائبة',
    },
    image: '/images/quality.png',
  },
  {
    icon: <Lightbulb className="w-7 h-7" />,
    color: '#e54a33',
    bg: 'from-orange-50 to-white',
    fr: {
      title: 'Innovation',
      description: "Expert en Aquanettoyage, Laundry.ma propose des services innovants et personnalisés — technologie de pointe pour répondre aux besoins les plus particuliers.",
      tag: 'Technologie avancée',
    },
    ar: {
      title: 'الابتكار',
      description: 'خبير في تقنية الأكوانيتيكليننج، تقدم Laundry.ma خدمات مبتكرة ومخصصة — تقنية متطورة لتلبية أكثر الاحتياجات خصوصية.',
      tag: 'تقنية متقدمة',
    },
    image: '/images/innovation.png',
  },
  {
    icon: <Leaf className="w-7 h-7" />,
    color: '#16a34a',
    bg: 'from-green-50 to-white',
    fr: {
      title: 'Responsabilité',
      description: "Produits 100% écologiques certifiés, respectueux de l'environnement et de la santé de nos clients et employés. Propre pour vous, propre pour la planète.",
      tag: '100% Éco-responsable',
    },
    ar: {
      title: 'المسؤولية',
      description: 'منتجات بيئية 100% معتمدة، تحترم البيئة وصحة عملائنا وموظفينا. نظيف لك، نظيف للكوكب.',
      tag: '100% صديق للبيئة',
    },
    image: '/images/responsabilite.png',
  },
  {
    icon: <ShieldCheck className="w-7 h-7" />,
    color: '#1e3a5f',
    bg: 'from-slate-50 to-white',
    fr: {
      title: 'Confiance & Transparence',
      description: "Respect absolu de vos objets et tarifs clairs, sans surprise. Nous tenons nos engagements — chaque commande, sans exception.",
      tag: 'Garantie satisfaction',
    },
    ar: {
      title: 'الثقة والشفافية',
      description: 'احترام مطلق لممتلكاتك وأسعار واضحة بدون مفاجآت. نلتزم بتعهداتنا — مع كل طلب، بدون استثناء.',
      tag: 'ضمان الرضا',
    },
    image: '/images/rapidite.png',
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
