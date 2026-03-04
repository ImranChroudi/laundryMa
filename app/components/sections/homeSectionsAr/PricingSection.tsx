"use client";

import { useState, useEffect } from "react";
import SectionWrapper from "@/app/components/common/SectionWrapper";
import SectionMargin from "@/app/components/common/SectionMargin";
import SectionBadge from "@/app/components/common/SectionBadge";
import CTAButton from "@/app/components/common/CTAButton";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PricingSection = () => {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');
  const tarifsText = isArabic ? "عرض جميع الأسعار" : "Voir tous les tarifs";
  const tarifsHref = isArabic ? "/ar/tarifs" : "/tarifs";
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  const pricingPlans = [
    {
      image: "/images/pantalon.avif",
      serviceName: "PANTALON",
      price: "20 DH"
    },
    {
      image: "/images/chemise-sur-cintre.avif",
      serviceName: "CHEMISE SUR CINTRE",
      price: "22 DH"
    },
    {
      image: "/images/costume.avif",
      serviceName: "COSTUME",
      price: "50 DH"
    },
    {
      image: "/images/polo.avif",
      serviceName: "POLO",
      price: "18 DH"
    },
    {
      image: "/images/djellaba.avif",
      serviceName: "DJELLABA",
      price: "30 DH"
    }
  ];

  // Auto-play carousel on mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % pricingPlans.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [pricingPlans.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % pricingPlans.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + pricingPlans.length) % pricingPlans.length);
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
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <div className="py-16 md:py-24 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)'
    }}>
      <SectionWrapper className="relative">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, #1e3a5f 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />
      
      <SectionMargin>
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="mb-6">
              <SectionBadge text="أسعارنا" highlightText="التنظيف الجاف" />
            </h2>
          </div>

          {/* Desktop Grid View */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-5 gap-5">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(77,175,239,0.22)] border border-transparent hover:border-primary/20"
                style={{ boxShadow: '0 4px 20px rgba(77,175,239,0.10)' }}
              >
                {/* Product Image */}
                <div className="relative mb-5 w-full h-44 flex items-center justify-center overflow-hidden">
                  <Image
                    src={plan.image}
                    alt={plan.serviceName}
                    width={200}
                    height={200}
                    className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Service Name */}
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                  {plan.serviceName}
                </h3>

                {/* Price */}
                <div className="mt-auto inline-flex items-baseline gap-1 bg-primary/8 rounded-xl px-4 py-1.5">
                  <span className="text-2xl font-extrabold text-primary leading-none">{plan.price.replace(' DH', '')}</span>
                  <span className="text-sm font-semibold text-primary/70">DH</span>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Carousel View */}
          <div className="md:hidden relative" dir="rtl">
            <div
              className="overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`
                }}
              >
                {pricingPlans.map((plan, index) => (
                  <div
                    key={index}
                    className="min-w-full px-4"
                  >
                    <div
                      className="bg-white rounded-2xl p-6 flex flex-col items-center text-center h-full border border-primary/10"
                      style={{ boxShadow: '0 4px 20px rgba(77,175,239,0.12)' }}
                    >
                      {/* Product Image */}
                      <div className="relative mb-5 w-full h-48 flex items-center justify-center">
                        <Image
                          src={plan.image}
                          alt={plan.serviceName}
                          width={200}
                          height={200}
                          className="object-contain w-full h-full"
                        />
                      </div>

                      {/* Service Name */}
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                        {plan.serviceName}
                      </h3>

                      {/* Price */}
                      <div className="mt-auto inline-flex items-baseline gap-1 bg-primary/8 rounded-xl px-4 py-1.5">
                        <span className="text-2xl font-extrabold text-primary leading-none">{plan.price.replace(' DH', '')}</span>
                        <span className="text-sm font-semibold text-primary/70">DH</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors z-10"
              aria-label="السعر السابق"
            >
              <ChevronRight className="w-6 h-6 text-primary" />
            </button>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors z-10"
              aria-label="السعر التالي"
            >
              <ChevronLeft className="w-6 h-6 text-primary" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {pricingPlans.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-primary w-8'
                      : 'bg-gray-300 w-2'
                  }`}
                  aria-label={`انتقل إلى السعر ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Central CTA Button */}
          <div className="flex justify-center mt-12 md:mt-16">
            <CTAButton text={tarifsText} href={tarifsHref} className="max-w-max" />
          </div>
        </div>
      </SectionMargin>
      </SectionWrapper>
    </div>
  );
};

export default PricingSection;

