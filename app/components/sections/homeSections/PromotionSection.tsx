"use client";

import { useState, useEffect } from "react";
import { useGetActivePromotionQuery } from "@/app/hooks/use-promotions";
import Image from "next/image";
import SectionWrapper from "@/app/components/common/SectionWrapper";
import SectionMargin from "@/app/components/common/SectionMargin";
import SectionBadge from "@/app/components/common/SectionBadge";
import CTAButton from "@/app/components/common/CTAButton";
import { Percent, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const PromotionSectionContent = () => {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');
  
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
    <div className="py-16 md:py-24 relative overflow-hidden bg-yellow-100">
      <SectionWrapper className="relative z-10">
        <SectionMargin>
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left Side - Text Content */}
              <div className={`space-y-6 ${isArabic ? 'text-right md:order-2' : 'text-left'}`}>
                {/* Badge */}
                <div className="mb-6">
                  <SectionBadge 
                    text={isArabic ? "عرض خاص" : "Promotion"} 
                    highlightText={isArabic ? "خاص" : "spéciale"}
                  />
                </div>

                {/* Title */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-tertiary">
                  {isArabic ? promotion.titleAr || promotion.title : promotion.title}
                </h2>

                {/* Discount Value */}
                <div className="flex items-center gap-4" style={{ flexDirection: isArabic ? 'row-reverse' : 'row' }}>
                  <div className="bg-primary/10 rounded-full p-4">
                    <Percent className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <span className="text-5xl md:text-6xl font-bold text-primary">
                      {discountText}
                    </span>
                    {promotion.discountType === 'percentage' && (
                      <span className={`text-2xl text-gray-600 ml-2 ${isArabic ? 'mr-2 ml-0' : ''}`}>
                        {isArabic ? 'خصم' : 'de réduction'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                {promotion.description && (
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {isArabic ? promotion.descriptionAr || promotion.description : promotion.description}
                  </p>
                )}

                {/* CTA Button */}
                {promotion.buttonLink ? (
                  <Link href={promotion.buttonLink}>
                    <div className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors text-lg cursor-pointer" style={{
                      boxShadow: '0 4px 6px -1px rgba(77, 175, 239, 0.3), 0 2px 4px -1px rgba(77, 175, 239, 0.2)'
                    }}>
                      <span>
                        {isArabic 
                          ? promotion.buttonTextAr || promotion.buttonText || 'شاهد العرض'
                          : promotion.buttonText || 'Voir l\'offre'
                        }
                      </span>
                      {!isArabic && <ArrowRight className="w-5 h-5" />}
                    </div>
                  </Link>
                ) : (
                  <CTAButton 
                    text={isArabic ? promotion.buttonTextAr || 'شاهد العرض' : promotion.buttonText || 'Voir l\'offre'}
                    href={promotion.buttonLink}
                  />
                )}
              </div>

              {/* Right Side - Image */}
              <div className={`relative ${isArabic ? 'md:order-1' : ''}`}>
                {promotion.imageUrl ? (
                  <div className="relative h-64 md:h-96 rounded-xl overflow-hidden shadow-2xl">
                    <Image
                      src={promotion.imageUrl}
                      alt={isArabic ? promotion.titleAr || promotion.title : promotion.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="relative h-64 md:h-96 rounded-xl overflow-hidden shadow-2xl bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No image</span>
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

