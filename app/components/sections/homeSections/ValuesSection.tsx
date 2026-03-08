'use client';

import React from 'react';
import {
  Heart,
  Leaf,
  ShieldCheck,
  Zap,
  Sparkles,
  Clock,
} from 'lucide-react';
import SectionWrapper from '@/app/components/common/SectionWrapper';
import SectionTitle from '@/app/components/common/SectionTitle';
import SectionMargin from '@/app/components/common/SectionMargin';
import SectionBadge from '@/app/components/common/SectionBadge';

const values = [
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Qualité',
    text: "Nous garantissons un nettoyage irréprochable pour tous vos vêtements et textiles, du plus délicat au plus volumineux.",
    iconBg: 'bg-sky-50',
    iconColor: 'text-sky-500',
    hoverBorder: 'hover:border-sky-200',
    hoverShadow: 'hover:shadow-sky-100/60',
  },
  {
    icon: <Leaf className="w-6 h-6" />,
    title: "Respect de l'environnement",
    text: "Nos produits et méthodes sont écologiques, sans danger pour votre peau ni pour la planète.",
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-500',
    hoverBorder: 'hover:border-emerald-200',
    hoverShadow: 'hover:shadow-emerald-100/60',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Rapidité & Fiabilité',
    text: "Nous savons que votre temps est précieux : collecte et livraison rapides, service express disponible.",
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-500',
    hoverBorder: 'hover:border-amber-200',
    hoverShadow: 'hover:shadow-amber-100/60',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Confiance & Transparence',
    text: "Nous mettons un point d'honneur à respecter vos objets et à vous proposer des prix clairs et transparents.",
    iconBg: 'bg-red-50',
    iconColor: 'text-red-500',
    hoverBorder: 'hover:border-red-200',
    hoverShadow: 'hover:shadow-red-100/60',
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'Innovation & Service',
    text: "Nous améliorons constamment nos services pour vous offrir une expérience simple, pratique et adaptée à vos besoins.",
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-500',
    hoverBorder: 'hover:border-violet-200',
    hoverShadow: 'hover:shadow-violet-100/60',
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Disponibilité',
    text: "De 8h à 22h, 7 jours sur 7. Nous nous adaptons à votre emploi du temps, pas l'inverse.",
    iconBg: 'bg-teal-50',
    iconColor: 'text-teal-500',
    hoverBorder: 'hover:border-teal-200',
    hoverShadow: 'hover:shadow-teal-100/60',
  },
];

const ValuesSection = () => {
  return (
    <SectionWrapper className="py-20 md:py-28 bg-white">
      <SectionMargin>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="mb-5 flex justify-center">
              <SectionBadge text="Nos" highlightText="Valeurs" />
            </div>
            <SectionTitle>
              Ce qui nous{' '}
              <span className="text-primary">anime</span>
            </SectionTitle>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Six piliers fondamentaux qui guident chaque action et chaque décision chez Laundry.ma.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className={`group relative bg-white border border-gray-100 rounded-2xl p-7 transition-all duration-300 overflow-hidden hover:-translate-y-1 hover:shadow-xl ${v.hoverBorder} ${v.hoverShadow}`}
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl ${v.iconBg} ${v.iconColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  {v.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-tertiary mb-2">
                  {v.title}
                </h3>

                {/* Text */}
                <p className="text-gray-500 text-sm leading-relaxed">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionMargin>
    </SectionWrapper>
  );
};

export default ValuesSection;
