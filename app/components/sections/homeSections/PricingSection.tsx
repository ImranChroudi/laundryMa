"use client";

import { useState, useEffect, useRef } from "react";
import SectionWrapper from "@/app/components/common/SectionWrapper";
import SectionMargin from "@/app/components/common/SectionMargin";
import SectionBadge from "@/app/components/common/SectionBadge";
import CTAButton from "@/app/components/common/CTAButton";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { categories, tarifsData, type CategoryKey } from "@/app/data/tarifs";
import SectionTitle from "@/app/components/common/SectionTitle";

const PricingSection = () => {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith("/ar");
  const tarifsText = isArabic ? "عرض جميع الأسعار" : "Voir tous les tarifs";
  const tarifsHref = isArabic ? "/ar/tarifs" : "/tarifs";

  const [activeCategory, setActiveCategory] = useState<CategoryKey>("Pressing");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Get featured items for active category (max 6 for desktop)
  const categoryItems = tarifsData
    .filter((t) => t.category === activeCategory)
    .slice(0, 6);

  const activeCategoryInfo = categories.find((c) => c.key === activeCategory);

  // Reset carousel on category change
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  // Auto-play carousel on mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % categoryItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [categoryItems.length, activeCategory]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % categoryItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + categoryItems.length) % categoryItems.length
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
  };

  // Scroll category tabs
  const scrollTabs = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className="py-16 md:py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 40%, #bae6fd 100%)",
      }}
    >
      <SectionWrapper className="relative">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #1e3a5f 1.5px, transparent 1.5px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Floating decorative elements */}
        <div className="absolute top-10 right-20 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-10 left-20 w-40 h-40 bg-violet-400/10 rounded-full blur-2xl" />

        <SectionMargin>
          <div className="relative z-10 max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10 md:mb-14">
              <div className="mb-5 flex justify-center">
                <SectionBadge
                  text={isArabic ? "أسعارنا" : "Nos tarifs"}
                  highlightText={isArabic ? "الشفافة" : "transparents"}
                />
              </div>
              <SectionTitle>
                {isArabic ? (
                  <>
                    أسعار{" "}
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-[#2B6CB0]">
                      واضحة
                    </span>{" "}
                    وعادلة
                  </>
                ) : (
                  <>
                    Des Prix{" "}
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-[#2B6CB0]">
                      Clairs
                    </span>{" "}
                    et Justes
                  </>
                )}
              </SectionTitle>
            </div>

            {/* Category Tabs */}
            <div className="relative mb-10">
              {/* Scroll buttons for mobile */}
              <button
                onClick={() => scrollTabs("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-md md:hidden"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={() => scrollTabs("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-md md:hidden"
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>

              <div
                ref={scrollRef}
                className="flex gap-3 overflow-x-auto scrollbar-hide px-8 md:px-0 md:justify-center md:flex-wrap"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.key;
                  return (
                    <button
                      key={cat.key}
                      onClick={() => setActiveCategory(cat.key)}
                      className={`shrink-0 flex items-center gap-2.5 px-5 py-3 rounded-full font-semibold text-sm transition-all duration-300 border-2 ${
                        isActive
                          ? "text-white shadow-lg scale-105"
                          : "bg-white/70 backdrop-blur-sm text-gray-600 border-white/50 hover:bg-white hover:border-gray-200 hover:shadow-md"
                      }`}
                      style={
                        isActive
                          ? {
                              backgroundColor: cat.color,
                              borderColor: cat.color,
                              boxShadow: `0 8px 25px ${cat.color}40`,
                            }
                          : {}
                      }
                    >
                      <span className="text-lg">{cat.icon}</span>
                      <span>{isArabic ? cat.labelAr : cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Desktop Grid View */}
            <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categoryItems.map((item, index) => (
                <Link
                  href={
                    isArabic
                      ? `/ar/tarifs/${item.id}`
                      : `/tarifs/${item.id}`
                  }
                  key={item.id}
                  className="group"
                >
                  <div
                    className="bg-white rounded-2xl p-5 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 border border-transparent hover:border-opacity-20 h-full"
                    style={{
                      boxShadow: "0 4px 20px rgba(77,175,239,0.10)",
                      animationDelay: `${index * 80}ms`,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 40px ${activeCategoryInfo?.color || "#4DAFEF"}25`;
                      (e.currentTarget as HTMLElement).style.borderColor = `${activeCategoryInfo?.color || "#4DAFEF"}30`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(77,175,239,0.10)";
                      (e.currentTarget as HTMLElement).style.borderColor = "transparent";
                    }}
                  >
                    {/* Product Image */}
                    <div className="relative mb-4 w-full h-36 flex items-center justify-center overflow-hidden rounded-xl bg-gray-50">
                      <Image
                        src={item.image}
                        alt={isArabic ? (item.nameAr || item.name) : item.name}
                        width={150}
                        height={150}
                        className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-110 p-2"
                        unoptimized
                      />
                    </div>

                    {/* Service Name */}
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 line-clamp-2 min-h-8">
                      {isArabic ? (item.nameAr || item.name) : item.name}
                    </h3>

                    {/* Price */}
                    <div
                      className="mt-auto inline-flex items-baseline gap-1 rounded-xl px-4 py-1.5"
                      style={{
                        backgroundColor: `${activeCategoryInfo?.color || "#4DAFEF"}12`,
                      }}
                    >
                      {item.priceFrom && (
                        <span
                          className="text-[10px] font-medium mr-0.5"
                          style={{ color: `${activeCategoryInfo?.color || "#4DAFEF"}90` }}
                        >
                          {isArabic ? "من" : "Dès"}
                        </span>
                      )}
                      <span
                        className="text-xl font-extrabold leading-none"
                        style={{ color: activeCategoryInfo?.color || "#4DAFEF" }}
                      >
                        {item.price}
                      </span>
                      <span
                        className="text-sm font-semibold"
                        style={{ color: `${activeCategoryInfo?.color || "#4DAFEF"}80` }}
                      >
                        DH
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile Carousel View */}
            <div className="md:hidden relative">
              <div
                className="overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                  }}
                >
                  {categoryItems.map((item, index) => (
                    <div key={item.id} className="min-w-full px-4">
                      <div
                        className="bg-white rounded-2xl p-6 flex flex-col items-center text-center h-full border"
                        style={{
                          borderColor: `${activeCategoryInfo?.color || "#4DAFEF"}15`,
                          boxShadow: "0 4px 20px rgba(77,175,239,0.12)",
                        }}
                      >
                        {/* Product Image */}
                        <div className="relative mb-5 w-full h-48 flex items-center justify-center rounded-xl bg-gray-50 overflow-hidden">
                          <Image
                            src={item.image}
                            alt={isArabic ? (item.nameAr || item.name) : item.name}
                            width={200}
                            height={200}
                            className="object-contain w-full h-full p-3"
                            unoptimized
                          />
                        </div>

                        {/* Service Name */}
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                          {isArabic ? (item.nameAr || item.name) : item.name}
                        </h3>

                        {/* Price */}
                        <div
                          className="mt-auto inline-flex items-baseline gap-1 rounded-xl px-5 py-2"
                          style={{
                            backgroundColor: `${activeCategoryInfo?.color || "#4DAFEF"}12`,
                          }}
                        >
                          {item.priceFrom && (
                            <span
                              className="text-xs font-medium mr-1"
                              style={{ color: `${activeCategoryInfo?.color || "#4DAFEF"}90` }}
                            >
                              {isArabic ? "من" : "Dès"}
                            </span>
                          )}
                          <span
                            className="text-2xl font-extrabold leading-none"
                            style={{ color: activeCategoryInfo?.color || "#4DAFEF" }}
                          >
                            {item.price}
                          </span>
                          <span
                            className="text-sm font-semibold"
                            style={{ color: `${activeCategoryInfo?.color || "#4DAFEF"}80` }}
                          >
                            DH
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors z-10"
                aria-label="Previous price"
              >
                <ChevronLeft className="w-6 h-6 text-primary" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors z-10"
                aria-label="Next price"
              >
                <ChevronRight className="w-6 h-6 text-primary" />
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-6">
                {categoryItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: index === currentIndex ? "2rem" : "0.5rem",
                      backgroundColor:
                        index === currentIndex
                          ? activeCategoryInfo?.color || "#4DAFEF"
                          : "#D1D5DB",
                    }}
                    aria-label={`Go to price ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Central CTA Button */}
            <div className="flex justify-center mt-12 md:mt-16">
              <CTAButton
                text={tarifsText}
                href={tarifsHref}
                className="max-w-max"
              />
            </div>
          </div>
        </SectionMargin>
      </SectionWrapper>
    </div>
  );
};

export default PricingSection;

