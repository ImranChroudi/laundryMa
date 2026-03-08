'use client';

import React from 'react';
import Link from 'next/link';
import { Truck, ArrowLeft } from 'lucide-react';
import SectionWrapper from '@/app/components/common/SectionWrapper';
import SectionMargin from '@/app/components/common/SectionMargin';
import SectionBadge from '@/app/components/common/SectionBadge';

const OurServicesShort = () => {
  return (
    <SectionWrapper className="py-20 md:py-28 bg-white">
      <SectionMargin>
        <div className="max-w-4xl mx-auto text-center" dir="rtl">

          {/* Header */}
          <div className="mb-5 flex justify-center">
            <SectionBadge text="خدماتنا" highlightText="" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-tertiary mb-3">
            خدماتنا
          </h2>

          {/* Description */}
          <div className="mt-6 space-y-4 text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
            <p>نقدّم لك خدمة شاملة في التنظيف والكيّ الاحترافي داخل المنزل.</p>
            <p>من الملابس الحساسة إلى السجاد والأرائك والمفروشات — Laundry.ma تهتم بكل التفاصيل بعناية وسرعة وبمنتجات صديقة للبيئة.</p>
          </div>

          {/* Delivery highlight */}
          <div className="mt-8 inline-flex items-center gap-2 bg-primary/5 border border-primary/15 text-primary font-semibold px-5 py-3 rounded-full text-sm">
            <Truck className="w-4.5 h-4.5" />
            <span>🚚 استلام وتوصيل مجاني – 7 أيام في الأسبوع – خدمة سريعة خلال 24 ساعة</span>
          </div>

          {/* CTA Button */}
          <div className="mt-10">
            <Link
              href="/ar/services/"
              className="inline-flex items-center gap-2 bg-tertiary text-white font-bold px-8 py-4 rounded-xl hover:bg-tertiary/90 transition-all duration-200 text-base"
            >
              <span>عرض جميع خدماتنا</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </SectionMargin>
    </SectionWrapper>
  );
};

export default OurServicesShort;
