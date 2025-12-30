'use client'
import React from 'react';
import SectionWrapper from '@/app/components/common/SectionWrapper';
import SectionMargin from '@/app/components/common/SectionMargin';

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Hero Section */}
      <section className="relative bg-primary py-12 md:py-16">
        <SectionMargin>
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              السياسات القانونية
            </h1>
            <p className="text-base md:text-lg text-white/90 uppercase tracking-wide">
              الرئيسية / السياسات القانونية
            </p>
          </div>
        </SectionMargin>
      </section>

      {/* Content Section */}
      <SectionWrapper className="py-16 md:py-24 bg-white">
        <SectionMargin>
          <div className="max-w-4xl mx-auto prose prose-lg max-w-none">
            {/* Section 1 */}
            <div className="mb-12 text-right">
              <h2 className="text-3xl md:text-4xl font-bold text-tertiary mb-6">
                1. ناشر الموقع
              </h2>
              <div className="space-y-3 text-gray-700">
                <p className="text-lg font-semibold text-primary">Laundry.ma</p>
                <p><strong>العنوان:</strong> الدار البيضاء، المغرب</p>
                <p>
                  <strong>البريد الإلكتروني:</strong>{' '}
                  <a href="mailto:contact@laundry.ma" className="text-primary hover:underline">
                    contact@laundry.ma
                  </a>
                </p>
                <p>
                  <strong>الهاتف:</strong>{' '}
                  <a href="tel:+212677777724" className="text-primary hover:underline">
                    +212 6 77 77 77 24
                  </a>
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="mb-12 text-right">
              <h2 className="text-3xl md:text-4xl font-bold text-tertiary mb-6">
                2. مدير النشر
              </h2>
              <p className="text-gray-700 text-lg">
                Laundry.ma
              </p>
            </div>

            {/* Section 3 */}
            <div className="mb-12 text-right">
              <h2 className="text-3xl md:text-4xl font-bold text-tertiary mb-6">
                3. استضافة الموقع
              </h2>
              <p className="text-gray-700 text-lg">
                يتم استضافة الموقع من قبل مزود خدمة الاستضافة الخاص بنا.
              </p>
            </div>

            {/* Section 4 */}
            <div className="mb-12 text-right">
              <h2 className="text-3xl md:text-4xl font-bold text-tertiary mb-6">
                4. الملكية الفكرية
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                جميع محتويات هذا الموقع (نصوص، صور، شعارات، فيديوهات) هي ملكية حصرية لـ Laundry.ma. يُمنع أي نسخ جزئي أو كامل بدون إذن خطي.
              </p>
            </div>

            {/* Section 5 */}
            <div className="mb-12 text-right">
              <h2 className="text-3xl md:text-4xl font-bold text-tertiary mb-6">
                5. البيانات الشخصية
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                يتم استخدام المعلومات التي يتم جمعها عبر النماذج (الاسم، البريد الإلكتروني، الهاتف، العنوان) فقط لمعالجة طلباتكم وتحسين خدماتنا.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                وفقًا للقانون 09-08، يحق لك الوصول إلى بياناتك، تعديلها أو حذفها.
              </p>
            </div>

            {/* Section 6 */}
            <div className="mb-12 text-right">
              <h2 className="text-3xl md:text-4xl font-bold text-tertiary mb-6">
                6. المسؤولية
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                لا تتحمل Laundry.ma أي مسؤولية عن الأضرار الناتجة عن استخدام الموقع أو الروابط الخارجية أو سوء استخدام الخدمات.
              </p>
            </div>

            {/* Section 7 */}
            <div className="mb-12 text-right">
              <h2 className="text-3xl md:text-4xl font-bold text-tertiary mb-6">
                7. الكوكيز
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                يستخدم الموقع ملفات تعريف الارتباط (Cookies) لتحسين تجربة التصفح. يمكنك إعداد متصفحك لرفضها.
              </p>
            </div>
          </div>
        </SectionMargin>
      </SectionWrapper>
    </div>
  );
}

