"use client";

import { useState, useEffect } from "react";
import { useGetActivePromotionQuery } from "@/app/hooks/use-promotions";
import Image from "next/image";
import SectionWrapper from "@/app/components/common/SectionWrapper";
import SectionMargin from "@/app/components/common/SectionMargin";
import SectionBadge from "@/app/components/common/SectionBadge";
import CTAButton from "@/app/components/common/CTAButton";
import { Percent, ArrowLeft } from "lucide-react";
import Link from "next/link";

const PromotionSectionContent = () => {
  const { data, isLoading } = useGetActivePromotionQuery() as {
    data: { promotion: any } | null;
    isLoading: boolean;
  };

  // Don't render if no active promotion
  if (isLoading || !data?.promotion) {
    return null;
  }

  const promotion = data.promotion;
  const discountText = promotion.discountType === 'percentage' 
    ? `${promotion.discountValue}%`
    : `${promotion.discountValue} DH`;

  return (
    <div className="py-16 md:py-24 relative overflow-hidden bg-yellow-100" dir="rtl">
      <SectionWrapper className="relative z-10">
        <SectionMargin>
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Right Side - Text Content (appears on left in RTL) */}
              <div className="space-y-6 text-right md:order-2">
                {/* Badge */}
                <div className="mb-6">
                  <SectionBadge 
                    text="عرض خاص" 
                    highlightText="خاص"
                  />
                </div>

                {/* Title */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-tertiary">
                  {promotion.titleAr || promotion.title}
                </h2>

                {/* Discount Value */}
                <div className="flex items-center gap-4 flex-row-reverse">
                  <div className="bg-primary/10 rounded-full p-4">
                    <Percent className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <span className="text-5xl md:text-6xl font-bold text-primary">
                      {discountText}
                    </span>
                    {promotion.discountType === 'percentage' && (
                      <span className="text-2xl text-gray-600 mr-2">
                        خصم
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                {promotion.description && (
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {promotion.descriptionAr || promotion.description}
                  </p>
                )}

                {/* CTA Button */}
                {promotion.buttonLink ? (
                  <Link href={promotion.buttonLink}>
                    <div className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors text-lg cursor-pointer flex-row-reverse" style={{
                      boxShadow: '0 4px 6px -1px rgba(77, 175, 239, 0.3), 0 2px 4px -1px rgba(77, 175, 239, 0.2)'
                    }}>
                      <span>
                        {promotion.buttonTextAr || promotion.buttonText || 'شاهد العرض'}
                      </span>
                      <ArrowLeft className="w-5 h-5" />
                    </div>
                  </Link>
                ) : (
                  <CTAButton 
                    text={promotion.buttonTextAr || 'شاهد العرض'}
                    href={promotion.buttonLink}
                  />
                )}
              </div>

              {/* Left Side - Image (appears on right in RTL) */}
              <div className="relative md:order-1">
                {promotion.imageUrl ? (
                  <div className="relative h-64 md:h-96 rounded-xl overflow-hidden shadow-2xl">
                    <Image
                      src={promotion.imageUrl}
                      alt={promotion.titleAr || promotion.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="relative h-64 md:h-96 rounded-xl overflow-hidden shadow-2xl bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">لا توجد صورة</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </SectionMargin>
      </SectionWrapper>
    </div>
  );
};

const PromotionSection = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only render after mount to ensure QueryClientProvider is available
  if (!mounted) {
    return null;
  }

  return <PromotionSectionContent />;
};

export default PromotionSection;

