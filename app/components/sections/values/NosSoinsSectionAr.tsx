'use client'
import React from 'react';
import SectionWrapper from '@/app/components/common/SectionWrapper';
import SectionMargin from '@/app/components/common/SectionMargin';
import SectionBadge from '@/app/components/common/SectionBadge';
import CTAButton from '@/app/components/common/CTAButton';
import { 
  Sparkles, 
  Shirt, 
  Umbrella, 
  Star, 
  Scissors,
  Droplet
} from 'lucide-react';

export default function NosSoinsSectionAr() {
  const services = [
    {
      icon: <Droplet className="w-12 h-12 text-white" />,
      iconBg: "bg-red-500",
      title: "التعقيم",
      description: "علاج تنظيف أخضر فعال لإزالة الجراثيم والبكتيريا. يوفر علاجاً عميقاً للمواد التي تتطلب نظافة خاصة، مثل الألحفة، الفراش وملابس الأطفال."
    },
    {
      icon: <Sparkles className="w-12 h-12 text-white" />,
      iconBg: "bg-gray-800",
      title: "الأبيض الفائق",
      description: "عملية تبييض بيئية تستخدم عامل أكسجين بدون كلور أو رائحة. يعالج الشحوب أو الاصفرار الناجم عن الغسيل والاستخدام والأشعة فوق البنفسجية، مما يعيد الشباب للمواد البيضاء القديمة ويزيل بقع الصبغة."
    },
    {
      icon: <Shirt className="w-12 h-12 text-white" />,
      iconBg: "bg-blue-500",
      title: "التشطيب",
      description: "تقنية تنظيف تطبق فيلماً رفيعاً على الملابس لتحسين شكلها ومظهرها. يطبق المنظفون الأخضر هذه النهاية لاستعادة الشكل الأولي والمرونة، باستخدام منتج 100% بيئي فعال على الألياف الطبيعية مثل الكتان أو القطن."
    },
    {
      icon: <Umbrella className="w-12 h-12 text-white" />,
      iconBg: "bg-yellow-400",
      title: "المقاومة للماء",
      description: "فيلم رفيع يطبقه المنظفون الأخضر على الملابس (مثل المعاطف) لتحسين مقاومة المطر الخفيف والثلج. معامل المقاومة للماء الأولي ينخفض مع الاستخدام اليومي والتنظيفات الجافة المتتالية، وهذا العلاج يساعد على استعادته أو تقديم مقاومة مؤقتة للماء للمواد التي لم تكن مقاومة للماء في البداية."
    },
    {
      icon: <Star className="w-12 h-12 text-white" />,
      iconBg: "bg-gray-500",
      title: "ماكسima",
      description: "عملية مبتكرة لمعالجة جميع الألياف، خاصة الحساسة منها، بلطف وفعالية. ائتمننا على موادك الاستثنائية، ماكسima ينعش الأبيض والألوان، ويعيد الجمال والنضارة والمرونة للألياف."
    },
    {
      icon: <Scissors className="w-12 h-12 text-white" />,
      iconBg: "bg-red-400",
      title: "الخياطة",
      description: "Laundry.ma تذهب أبعد في العناية بالملابس من خلال تقديم حلول التعديل لتجميل وإصلاح أو تكييف المواد حسب المقاسات. الخدمات تشمل: الحواشي، التعديلات من جميع الأنواع، الإصلاحات، السحابات، الأزرار والخياطة العامة."
    }
  ];

  return (
    <>
      {/* Introduction Section */}
      <SectionWrapper className="py-16 md:py-24 bg-white">
        <SectionMargin>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="mb-6 flex justify-center">
                <SectionBadge text="خدماتنا" highlightText="ورعايتنا" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-tertiary mb-4">
                اكتشف <span className="text-primary">خدماتنا</span> ورعايتنا
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                نقدم خدمات ورعاية خبيرة لاستعادة وإطالة عمر ملابسك والمنسوجات، 
                مما يوفر حلولاً لجميع احتياجاتك وأنواع المنسوجات.
              </p>
            </div>
          </div>
        </SectionMargin>
      </SectionWrapper>

      {/* Services Grid */}
      <SectionWrapper className="py-16 md:py-24 bg-gray-50">
        <SectionMargin>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(77,175,239,0.25)]"
                  style={{ boxShadow: '0 4px 20px rgba(77,175,239,0.12)' }}
                >
                  <div className="flex items-start gap-6" dir="rtl">
                    {/* Icon */}
                    <div className={`${service.iconBg} rounded-2xl p-4 shrink-0`}>
                      {service.icon}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 text-right">
                      <h3 className="text-2xl font-bold text-tertiary mb-4">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionMargin>
      </SectionWrapper>

      {/* CTA Section */}
      <SectionWrapper className="py-16 md:py-24 bg-primary/5">
        <SectionMargin>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-tertiary mb-4">
              مستعد للعناية بملابسك؟
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              اكتشف خدمات الرعاية المهنية لدينا واستفد من معالجة عالية الجودة لجميع منسوجاتك
            </p>
            <CTAButton text="طلب استلام" href="/ar/checkout" />
          </div>
        </SectionMargin>
      </SectionWrapper>
    </>
  );
}








