"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SectionWrapper from "@/app/components/common/SectionWrapper";
import SectionMargin from "@/app/components/common/SectionMargin";
import SectionBadge from "@/app/components/common/SectionBadge";
import { categories, tarifsData } from "@/app/data/tarifs";
import { ArrowRight, Sparkles } from "lucide-react";
import SpanText from "@/app/components/common/SpanText";

const CategoryShowcase = () => {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith("/ar");
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Show only selected categories
  const selectedKeys = ["Pressing", "Cloth Spa Femme", "Blanchisserie", "Sneakers Spa"];
  const mainCategories = categories.filter(c => selectedKeys.includes(c.key));

  return (
    <div className="py-16 md:py-24 relative overflow-hidden bg-linear-to-b from-white via-gray-50/50 to-white">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-violet-500/3 rounded-full blur-3xl" />

      <SectionWrapper className="relative z-10">
        <SectionMargin>
          {/* Header */}
          <div className="text-center mb-14 md:mb-20">
            <div className="mb-6 flex justify-center">
              <SectionBadge
                text={isArabic ? "خدماتنا" : "Nos Spécialités"}
                highlightText={isArabic ? "المتميزة" : "Premium"}
              />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-tertiary mb-5 leading-tight">
              {isArabic ? (
                <>
                  اكتشف{" "}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-[#2B6CB0]">
                    عالم النظافة
                  </span>
                </>
              ) : (
                <>
                  Découvrez Nos{" "}
                  <SpanText text="Univers" className="" />
                </>
              )}
            </h2>
            <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              {isArabic
                ? "جميع فئاتنا المتخصصة لتلبية احتياجاتكم في التنظيف والعناية"
                : "Tous nos univers spécialisés pour répondre à vos besoins de nettoyage et d'entretien"}
            </p>
          </div>

          {/* Category Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {mainCategories.map((category, index) => {
              const categoryItems = tarifsData.filter(
                (t) => t.category === category.key
              );
              const isHovered = hoveredCategory === category.key;
              const tarifsLink = isArabic
                ? `/ar/tarifs?category=${encodeURIComponent(category.key)}`
                : `/tarifs?category=${encodeURIComponent(category.key)}`;

              return (
                <Link
                  href={tarifsLink}
                  key={category.key}
                  className="group relative"
                  onMouseEnter={() => setHoveredCategory(category.key)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <div
                    className="relative overflow-hidden rounded-3xl transition-all duration-500 cursor-pointer border border-gray-100 hover:border-transparent"
                    style={{
                      boxShadow: isHovered
                        ? `0 25px 60px -12px ${category.color}30, 0 0 0 1px ${category.color}20`
                        : "0 4px 24px rgba(0,0,0,0.06)",
                    }}
                  >
                    {/* Background gradient overlay */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                      style={{
                        background: `linear-gradient(135deg, ${category.bgColor} 0%, white 50%, ${category.bgColor}80 100%)`,
                      }}
                    />

                    <div className="relative z-10 p-6 sm:p-8">
                      {/* Top Row: Icon + Category Info */}
                      <div className="flex items-start gap-5 mb-6">
                        {/* Icon Circle */}
                        <div
                          className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                          style={{
                            backgroundColor: `${category.color}15`,
                            boxShadow: isHovered
                              ? `0 8px 30px ${category.color}25`
                              : "none",
                          }}
                        >
                          {category.icon}
                        </div>

                        {/* Title + Description */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl sm:text-2xl font-bold text-tertiary mb-1.5 group-hover:text-gray-900 transition-colors">
                            {isArabic ? category.labelAr : category.label}
                          </h3>
                          <p className="text-sm sm:text-base text-gray-500 leading-relaxed line-clamp-2">
                            {isArabic
                              ? category.descriptionAr
                              : category.description}
                          </p>
                        </div>
                      </div>

                      {/* Image Gallery Row */}
                      <div className="flex gap-3 mb-6 overflow-hidden">
                        {category.showcaseImages
                          .slice(0, 4)
                          .map((img, imgIdx) => {
                            // Find matching tarif item by image to show its price
                            const matchedItem = tarifsData.find(t => t.image === img);
                            return (
                            <div
                              key={imgIdx}
                              className="relative flex-1 aspect-square rounded-xl overflow-hidden bg-gray-100 transition-all duration-500"
                              style={{
                                transitionDelay: `${imgIdx * 75}ms`,
                                transform: isHovered
                                  ? "translateY(-4px)"
                                  : "translateY(0)",
                              }}
                            >
                              <Image
                                src={img}
                                alt={`${category.label} ${imgIdx + 1}`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width: 768px) 25vw, 15vw"
                                unoptimized
                              />
                              <div
                                className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent"
                              />
                              {/* Price overlay - always visible */}
                              {matchedItem && (
                                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-0.5 shadow-sm">
                                  <span className="text-xs font-bold" style={{ color: category.color }}>
                                    {matchedItem.priceFrom ? "Dès " : ""}{matchedItem.price}<span className="text-[10px] ml-0.5">DH</span>
                                  </span>
                                </div>
                              )}
                            </div>
                            );
                          })}
                      </div>

                      {/* Bottom CTA */}
                      <div className="flex items-center justify-end">
                        <div
                          className="flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3"
                          style={{ color: category.color }}
                        >
                          <span className="hidden sm:inline">
                            {isArabic ? "عرض الكل" : "Voir tout"}
                          </span>
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                            style={{
                              backgroundColor: `${category.color}15`,
                            }}
                          >
                            <ArrowRight
                              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5"
                              style={{ color: category.color }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12 md:mt-16">
            <Link
              href={isArabic ? "/ar/tarifs" : "/tarifs"}
              className="inline-flex items-center gap-3 bg-tertiary text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-tertiary/90 transition-all duration-300 group hover:shadow-[0_8px_30px_rgba(30,58,95,0.35)]"
            >
              <Sparkles className="w-5 h-5 text-primary" />
              <span>
                {isArabic
                  ? "استكشف جميع الأسعار والخدمات"
                  : "Explorer tous nos tarifs & services"}
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </SectionMargin>
      </SectionWrapper>
    </div>
  );
};

export default CategoryShowcase;
