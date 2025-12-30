'use client'
import Image from 'next/image';
import Link from 'next/link';
import SectionWrapper from '@/app/components/common/SectionWrapper';
import SectionMargin from '@/app/components/common/SectionMargin';
import SectionBadge from '@/app/components/common/SectionBadge';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

const ExpertArticlesSection = () => {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');

  return (
    <SectionWrapper className="py-16 md:py-24 bg-white">
      <SectionMargin>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center" dir={isArabic ? 'rtl' : 'ltr'}>
            {/* Image Section */}
            <div className={`flex justify-center ${isArabic ? 'order-2' : 'order-2 lg:order-1'}`}>
              <div className="w-full max-w-lg">
                <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden">
                  <Image
                    src="/images/expert.png"
                    alt={isArabic ? "خبراؤنا في التنظيف" : "Nos experts en nettoyage"}
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* Text Section */}
            <div className={`space-y-6 ${isArabic ? 'order-1 lg:order-1 text-right' : 'order-1 lg:order-2 text-left'}`}>
              <div className={`mb-6 flex ${isArabic ? 'justify-end' : 'justify-start'}`}>
                <SectionBadge text={isArabic ? "المدونة" : "Blog"} highlightText={isArabic ? "& نصائح" : "& Conseils"} />
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-tertiary mb-4">
                {isArabic ? (
                  <>
                    اكتشف النصائح من{' '}
                    <span className="text-primary">Laundry.ma</span>
                  </>
                ) : (
                  <>
                    Découvrez les Conseils Chez{' '}
                    <span className="text-primary">Laundry.ma</span>
                  </>
                )}
              </h2>

              <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8">
                {isArabic
                  ? "احصل على نصائحنا وإرشاداتنا المهنية للعناية بمنسوجاتك. يشارك خبراؤنا معرفتهم لمساعدتك على إطالة عمر ملابسك والحفاظ على جودتها الأصلية."
                  : "Accédez à nos conseils professionnels et astuces pour prendre soin de vos textiles. Nos experts partagent leurs connaissances pour vous aider à prolonger la vie de vos vêtements et maintenir leur qualité d'origine."
                }
              </p>

              {/* Button */}
              <Link href={isArabic ? "/ar/blog" : "/blog"}>
                <div
                  className={`inline-flex cursor-pointer items-center gap-3 bg-primary text-white px-8 py-4 rounded-md font-semibold hover:bg-primary/90 transition-all duration-300 group ${isArabic ? 'flex-row-reverse' : ''}`}
                  style={{
                    boxShadow: '0 4px 6px -1px rgba(77, 175, 239, 0.3), 0 2px 4px -1px rgba(77, 175, 239, 0.2)'
                  }}
                >
                  <span>{isArabic ? "عرض المقالات" : "Voir les articles"}</span>
                  {isArabic ? (
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  ) : (
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  )}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </SectionMargin>
    </SectionWrapper>
  );
};

export default ExpertArticlesSection;

