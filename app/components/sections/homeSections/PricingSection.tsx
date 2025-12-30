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
              <SectionBadge text="Nos tarifs" highlightText="pressing" />
            </h2>
          </div>

          {/* Desktop Grid View */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 md:p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
                style={{
                  boxShadow: '0 10px 15px -3px rgba(77, 175, 239, 0.15), 0 4px 6px -2px rgba(77, 175, 239, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(77, 175, 239, 0.3), 0 10px 10px -5px rgba(77, 175, 239, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(77, 175, 239, 0.15), 0 4px 6px -2px rgba(77, 175, 239, 0.1)';
                }}
              >
                {/* Product Image */}
                <div className="relative z-10 mb-6 w-full h-48 flex items-center justify-center">
                  <Image
                    src={plan.image}
                    alt={plan.serviceName}
                    width={200}
                    height={200}
                    className="object-contain w-full h-full"
                  />
                </div>

                {/* Service Name */}
                <h3 className="text-sm md:text-base font-bold text-gray-700 uppercase tracking-wide mb-4 relative z-10">
                  {plan.serviceName}
                </h3>

                {/* Price */}
                <p className="text-xl md:text-2xl font-bold text-tertiary relative z-10">
                  {plan.price}
                </p>
              </div>
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
                  transform: `translateX(-${currentIndex * 100}%)`
                }}
              >
                {pricingPlans.map((plan, index) => (
                  <div
                    key={index}
                    className="min-w-full px-4"
                  >
                    <div
                      className="bg-white rounded-xl p-6 flex flex-col items-center text-center h-full"
                      style={{
                        boxShadow: '0 10px 25px rgba(77, 175, 239, 0.2)'
                      }}
                    >
                      {/* Product Image */}
                      <div className="relative z-10 mb-6 w-full h-48 flex items-center justify-center">
                        <Image
                          src={plan.image}
                          alt={plan.serviceName}
                          width={200}
                          height={200}
                          className="object-contain w-full h-full"
                        />
                      </div>

                      {/* Service Name */}
                      <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-4 relative z-10">
                        {plan.serviceName}
                      </h3>

                      {/* Price */}
                      <p className="text-xl font-bold text-tertiary relative z-10">
                        {plan.price}
                      </p>
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
              {pricingPlans.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-primary w-8'
                      : 'bg-gray-300 w-2'
                  }`}
                  aria-label={`Go to price ${index + 1}`}
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

