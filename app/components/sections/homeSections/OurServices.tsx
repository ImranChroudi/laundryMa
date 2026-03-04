'use client';

import React from 'react';
import { Sparkles, Shirt, Zap, ShirtIcon, ShirtIcon as Iron, Home } from 'lucide-react';
import SectionBadge from '@/app/components/common/SectionBadge';
import SpanText from '@/app/components/common/SpanText';
import { usePathname } from 'next/navigation';

interface Service {
  title: string;
  titleHighlight: string; // Partie du titre à mettre en vert
  description: string;
  highlightedText?: string[]; // Mots/phrases à mettre en gras
  icon: React.ReactNode;
}

export default function ServicesCards() {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');

  const services: Service[] = isArabic ? [
    {
      title: "الغسيل",
      titleHighlight: "منظف ومطوي",
      description:
        "يُحسب بالكيلو، خدمة الغسيل بالكيلو لدينا مناسبة تماماً لغسيلك اليومي. سيتم غسل عناصرك معاً عند 30°C، تجفيفها في المجفف ثم طيها. كل كيس غسيل يُحسب بالكيلو مع حد أدنى 3 كيلو لكل طلب.",
      highlightedText: ["30°C", "حد أدنى 3 كيلو"],
      icon: <Shirt className="text-primary" size={28} />,
    },
    {
      title: "التنظيف الجاف &",
      titleHighlight: "الكي",
      description:
        "يُحسب بالقطعة، خدمة التنظيف الجاف والكي لدينا تتم لكل قطعة. كل قطعة تُنظف جافاً، تُكوى وتُعاد على شماعة بشكل فردي.",
      highlightedText: ["التنظيف الجاف", "على شماعة"],
      icon: <Sparkles className="text-primary" size={28} />,
    },
    {
      title: "تنظيف",
      titleHighlight: "سريع",
      description:
        "نافذة زمنية مدتها 30 دقيقة، التنظيف الجاف والغسيل بالكيلو يتم تسليمه في أقل من 24 ساعة. خدمة سريعة وموثوقة لاحتياجاتك العاجلة.",
      highlightedText: ["30 دقيقة", "أقل من 24 ساعة"],
      icon: <Zap className="text-primary" size={28} />,
    },
    {
      title: "كي",
      titleHighlight: "قطعة صغيرة",
      description:
        "كي مهني لـ: قميص، بنطلون، فستان قصير، بولو، سترة، كنزة، جاكيت، سترة قصيرة…",
      highlightedText: ["قميص", "بنطلون", "فستان قصير"],
      icon: <ShirtIcon className="text-primary" size={28} />,
    },
    {
      title: "كي",
      titleHighlight: "قطعة كبيرة",
      description:
        "كي مهني لـ: بدلة، طقم، معطف، فستان طويل، جلابة، قندورة، قفطان (قطعة واحدة)، جبدور…",
      highlightedText: ["بدلة", "جلابة", "قندورة", "قفطان"],
      icon: <Iron className="text-primary" size={28} />,
    },
    {
      title: "تنظيف",
      titleHighlight: "السجاد",
      description:
        "تنظيف مهني لجميع أنواع السجاد (صوف، صناعي، كيلم، إلخ): شفط عميق، إزالة البقع، غسيل بالشامبو وتجفيف مراقب لاستعادة اللون ونعومة النسيج دون تلف الألياف.",
      highlightedText: ["شفط عميق", "إزالة البقع", "غسيل بالشامبو"],
      icon: <Home className="text-primary" size={28} />,
    },
  ] : [
    {
      title: "Linge",
      titleHighlight: "Nettoyé & Plié",
      description:
        "Facturé au kilo, notre service de linge au kilo convient parfaitement pour votre linge quotidien. Vos articles seront lavés ensemble à 30°C, séchés au sèche-linge puis pliés. Chaque sac de linge est facturé au kilo avec un minimum de 3 kg par commande.",
      highlightedText: ["30°C", "minimum de 3 kg"],
      icon: <Shirt className="text-primary" size={28} />,
    },
    {
      title: "Pressing &",
      titleHighlight: "Repassage",
      description:
        "Facturé à la pièce, notre service de nettoyage à sec et repassage s'effectue par article. Chaque article est nettoyé à sec, repassé et rendu sur cintre individuellement.",
      highlightedText: ["nettoyage à sec", "sur cintre"],
      icon: <Sparkles className="text-primary" size={28} />,
    },
    {
      title: "Nettoyage",
      titleHighlight: "EXPRESS",
      description:
        "Créneau horaire de 30 min, pressing et linge au kilo livré en moins de 24 heures. Service rapide et fiable pour vos besoins urgents.",
      highlightedText: ["30 min", "moins de 24 heures"],
      icon: <Zap className="text-primary" size={28} />,
    },
    {
      title: "Repassage",
      titleHighlight: "Petite Pièce",
      description:
        "Repassage professionnel de : Chemise, Pantalon, Robe courte, Polo, Pull, Tricot, Veste, Blouson court…",
      highlightedText: ["Chemise", "Pantalon", "Robe courte"],
      icon: <ShirtIcon className="text-primary" size={28} />,
    },
    {
      title: "Repassage",
      titleHighlight: "Grande Pièce",
      description:
        "Repassage professionnel de : Costume, Tailleur, Manteau, Robe longue, Jellaba, Gandoura, Caftan (1 pièce), Jabadour…",
      highlightedText: ["Costume", "Jellaba", "Gandoura", "Caftan"],
      icon: <Iron className="text-primary" size={28} />,
    },
    {
      title: "Nettoyage de",
      titleHighlight: "Tapis",
      description:
        "Nettoyage professionnel de tous types de tapis (laine, synthétique, kilim, etc.) : aspiration profonde, détachage, shampooing et séchage contrôlé pour restaurer la couleur et la douceur du tissu sans endommager les fibres.",
      highlightedText: ["aspiration profonde", "détachage", "shampooing"],
      icon: <Home className="text-primary" size={28} />,
    },
  ];
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-6 flex justify-center">
            <SectionBadge text={isArabic ? "الغسيل" : "Blanchisserie"} highlightText={isArabic ? "طنجة" : "Tanger"} />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-tertiary mb-4">
            {isArabic ? (
              <>
                <span className="text-primary">خدماتنا</span>
              </>
            ) : (
              <>
                Nos <SpanText text="services" className="" />
              </>
            )}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            {isArabic 
              ? "حلول شاملة للتنظيف والصيانة المهنية"
              : "Des solutions complètes de nettoyage et d'entretien professionnels"
            }
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => {
            // Fonction pour mettre en gras les mots/phrases à souligner
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
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-left">
                  <span className="text-tertiary">{service.title}</span>{' '}
                  <span className="text-primary">{service.titleHighlight}</span>
                </h3>

                {/* Description */}
                <p 
                  className="text-gray-700 text-sm md:text-base leading-relaxed text-left"
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