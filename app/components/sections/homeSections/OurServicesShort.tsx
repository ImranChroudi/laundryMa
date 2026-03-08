'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Truck, ArrowRight, ArrowLeft } from 'lucide-react';
import SectionWrapper from '@/app/components/common/SectionWrapper';
import SectionMargin from '@/app/components/common/SectionMargin';
import SectionBadge from '@/app/components/common/SectionBadge';
import SectionTitle from '@/app/components/common/SectionTitle';
import SpanText from '@/app/components/common/SpanText';

const OurServicesShort = () => {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');

  return (
    <SectionWrapper className="py-20 md:py-28 bg-white">
      <SectionMargin>
        <div className="max-w-4xl mx-auto text-center" dir={isArabic ? 'rtl' : 'ltr'}>

          {/* Header */}
          <div className="mb-5 flex justify-center">
            <SectionBadge
              text={isArabic ? "خدماتنا" : "Nos"}
              highlightText={isArabic ? "" : "Services"}
            />
          </div>
          <SectionTitle>
            {isArabic ? (
              <>خدماتنا</>
            ) : (
              <>Nos <SpanText text="Services" className="" /></>
            )}
          </SectionTitle>

          {/* Description */}
          <div className="mt-6 space-y-4 text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
            <p>
              {isArabic
                ? 'نقدّم لك خدمة شاملة في التنظيف والكيّ الاحترافي داخل المنزل.'
                : 'Découvrez un service complet de pressing et de nettoyage professionnel à domicile.'}
            </p>
            <p>
              {isArabic
                ? 'من الملابس الحساسة إلى السجاد والأرائك والمفروشات — Laundry.ma تهتم بكل التفاصيل بعناية وسرعة وبمنتجات صديقة للبيئة.'
                : 'De vos vêtements délicats à vos tapis, canapés ou couettes — Laundry.ma s\'occupe de tout avec soin, rapidité et respect de l\'environnement.'}
            </p>
          </div>

          {/* Delivery highlight */}
          <div className="mt-8 inline-flex items-center gap-2 bg-primary/5 border border-primary/15 text-primary font-semibold px-5 py-3 rounded-full text-sm">
            <Truck className="w-4.5 h-4.5" />
            <span>
              {isArabic
                ? '🚚 استلام وتوصيل مجاني – 7 أيام في الأسبوع – خدمة سريعة خلال 24 ساعة'
                : '🚚 Collecte & livraison gratuites – 7j/7 – Service express en 24h'}
            </span>
          </div>

          {/* CTA Button */}
          <div className="mt-10">
            <Link
              href={isArabic ? '/ar/services/' : '/services/'}
              className="inline-flex items-center gap-2 bg-tertiary text-white font-bold px-8 py-4 rounded-xl hover:bg-tertiary/90 transition-all duration-200 text-base"
            >
              <span>{isArabic ? 'عرض جميع خدماتنا' : 'Voir tous nos services'}</span>
              {isArabic ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </Link>
          </div>
        </div>
      </SectionMargin>
    </SectionWrapper>
  );
};

export default OurServicesShort;
