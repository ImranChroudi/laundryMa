'use client'
import React from 'react';
import SectionWrapper from '@/app/components/common/SectionWrapper';
import SectionMargin from '@/app/components/common/SectionMargin';

export default function ConditionsGeneralesPage() {
  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Hero Section */}
      <section className="relative bg-primary py-12 md:py-16">
        <SectionMargin>
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              الشروط العامة للخدمات
            </h1>
            <p className="text-base md:text-lg text-white/90 tracking-wide">
              الرئيسية / الشروط العامة
            </p>
          </div>
        </SectionMargin>
      </section>

      {/* Content Section */}
      <SectionWrapper className="py-16 md:py-24 bg-white">
        <SectionMargin>
          <div className="max-w-4xl mx-auto prose prose-lg max-w-none">
            {/* Intro */}
            <div className="mb-12 text-right">
              <h2 className="text-3xl md:text-4xl font-bold text-tertiary mb-4">
                الشروط العامة للخدمات
              </h2>
              <p className="text-lg font-semibold text-primary">Laundry.ma</p>
              <p className="text-gray-700 text-lg">طنجة – المغرب</p>
              <p className="text-gray-700 text-lg leading-relaxed font-semibold mt-4">
                تسليم أي قطعة للشركة يعني الموافقة الكاملة وغير المشروطة على هذه الشروط.
              </p>
            </div>

            {/* Section أولاً */}
            <div className="mb-12 text-right">
              <h2 className="text-3xl md:text-4xl font-bold text-tertiary mb-6">
                أولاً: المصبنة والغسيل
              </h2>
              <ul className="list-disc list-inside text-gray-700 text-lg space-y-3 mr-4">
                <li>لا تتحمل الشركة مسؤولية العيوب السابقة أو ضعف النسيج.</li>
                <li>الملابس التي تطلق الألوان تكون على مسؤولية الزبون.</li>
                <li>البقع القديمة قد لا تزول كلياً.</li>
                <li>بعد مرور 3 أشهر دون استلام، لا تتحمل الشركة أي مسؤولية قانونية.</li>
              </ul>

              <div className="mt-8">
                <h3 className="text-xl md:text-2xl font-bold text-tertiary mb-4">
                  التعويض
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-3 font-semibold">
                  في حالة ثبوت خطأ مهني:
                </p>
                <ul className="list-disc list-inside text-gray-700 text-lg space-y-2 mr-4 mb-4">
                  <li>التعويض لا يتجاوز 5 مرات ثمن الخدمة</li>
                  <li>أو نسبة من القيمة الحالية.</li>
                </ul>
                <p className="text-gray-700 text-lg leading-relaxed mb-3 font-semibold">
                  في حالة ضياع قطعة:
                </p>
                <ul className="list-disc list-inside text-gray-700 text-lg space-y-2 mr-4">
                  <li>يتم التعويض بعد التحقق، في حدود لا تتجاوز 10 مرات قيمة خدمة التنظيف المؤداة عن القطعة المعنية.</li>
                </ul>
              </div>
            </div>

            {/* Section ثانياً */}
            <div className="mb-12 text-right">
              <h2 className="text-3xl md:text-4xl font-bold text-tertiary mb-6">
                ثانياً: تنظيف الزرابي
              </h2>
              <ul className="list-disc list-inside text-gray-700 text-lg space-y-3 mr-4">
                <li>الزرابي التي تطلق الألوان أو القديمة تنظف على مسؤولية صاحبها.</li>
                <li>احتمال تغير طفيف في اللون أو انكماش بسيط وارد.</li>
                <li>بعد 3 أشهر دون استلام لا تتحمل الشركة أي مسؤولية.</li>
              </ul>

              <div className="mt-8">
                <h3 className="text-xl md:text-2xl font-bold text-tertiary mb-4">
                  التعويض
                </h3>
                <ul className="list-disc list-inside text-gray-700 text-lg space-y-2 mr-4">
                  <li>حد أقصى 5 مرات ثمن الخدمة في حالة الخطأ المهني.</li>
                  <li>في حالة الضياع: تعويض لا يتجاوز 10 مرات قيمة خدمة التنظيف.</li>
                </ul>
              </div>
            </div>

            {/* Section ثالثاً */}
            <div className="mb-12 text-right">
              <h2 className="text-3xl md:text-4xl font-bold text-tertiary mb-6">
                ثالثاً: تنظيف الأحذية
              </h2>
              <ul className="list-disc list-inside text-gray-700 text-lg space-y-3 mr-4">
                <li>الأحذية الحساسة أو القديمة تكون على مسؤولية الزبون.</li>
                <li>احتمال تغير طفيف في اللون وارد.</li>
                <li>بعد 3 أشهر لا تتحمل الشركة أي مسؤولية.</li>
              </ul>

              <div className="mt-8">
                <h3 className="text-xl md:text-2xl font-bold text-tertiary mb-4">
                  التعويض
                </h3>
                <ul className="list-disc list-inside text-gray-700 text-lg space-y-2 mr-4">
                  <li>في حالة الخطأ المثبت: 5 مرات ثمن الخدمة كحد أقصى.</li>
                  <li>في حالة الضياع: تعويض لا يتجاوز 10 مرات قيمة خدمة التنظيف المؤداة.</li>
                </ul>
              </div>
            </div>

            {/* البند العام */}
            <div className="mb-12 p-6 bg-gray-50 rounded-lg border border-gray-200 text-right">
              <h2 className="text-3xl md:text-4xl font-bold text-tertiary mb-6">
                البند العام
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                تلتزم Laundry.ma بتقديم خدماتها وفقاً للمعايير المهنية المعمول بها في المغرب.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                يجب تقديم أي شكوى في أجل أقصاه 48 ساعة بعد استلام المواد.
              </p>
            </div>
          </div>
        </SectionMargin>
      </SectionWrapper>
    </div>
  );
}
