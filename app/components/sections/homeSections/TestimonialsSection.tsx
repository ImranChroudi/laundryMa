'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionWrapper from '@/app/components/common/SectionWrapper';
import SectionMargin from '@/app/components/common/SectionMargin';
import SectionBadge from '@/app/components/common/SectionBadge';
import SpanText from '@/app/components/common/SpanText';
import SectionTitle from '@/app/components/common/SectionTitle';

interface Testimonial {
  id: number;
  text: string;
  name: string;
  rating: number;
}

interface TestimonialsSectionProps {
  theme?: 'fr' | 'ar';
}

const testimonialsFR: Testimonial[] = [
  {
    id: 1,
    text: "J'ai utilisé Laundry.ma dans toutes les villes où j'ai vécu et je suis FAN. C'est tellement pratique, le parfum de leur lessive est incroyable et tous mes livreurs ont été très sympathiques. Je recommande vivement !",
    name: "Imran Cheroud",
    rating: 5
  },
  {
    id: 2,
    text: "Laundry.ma est le service de lavage et pliage le plus fiable et pratique à Tanger. Les vêtements reviennent toujours parfaitement propres. Je leur confie également mon nettoyage à sec, même mes plus beaux habits.",
    name: "Abdelhak El Haddad",
    rating: 5
  },
  {
    id: 3,
    text: "C'est le seul service de blanchisserie et nettoyage à sec que j'utiliserai jamais en ville. Une expérience professionnelle et VIP, avec une collecte et une livraison rapides. J'adore ce service !",
    name: "Mohamed Bouchaib",
    rating: 5
  }
];

const testimonialsAR: Testimonial[] = [
  {
    id: 1,
    text: "استخدمت Laundry.ma في جميع المدن التي عشت فيها وأنا معجب جداً. إنه مريح للغاية، رائحة المنظفات رائعة وجميع عمال التوصيل كانوا لطفاء جداً. أنصح به بشدة!",
    name: "عمران الشروقي",
    rating: 5
  },
  {
    id: 2,
    text: "Laundry.ma هو خدمة الغسيل والطي الأكثر موثوقية وراحة في طنجة. الملابس تعود دائماً نظيفة تماماً. أعهد إليهم أيضاً بتنظيفي الجاف، حتى أجمل ملابسي.",
    name: "عبد الحق الحداد",
    rating: 5
  },
  {
    id: 3,
    text: "هذه هي خدمة الغسيل والتنظيف الجاف الوحيدة التي سأستخدمها في المدينة. تجربة احترافية وفاخرة، مع استلام وتسليم سريع. أحب هذه الخدمة!",
    name: "محمد بوشعيب",
    rating: 5
  }
];

const i18n = {
  fr: {
    badgeText: "Témoignages",
    badgeHighlight: "clients",
    title: "Ce que nos",
    titleHighlight: "clients",
    titleEnd: "disent",
    subtitle: "Avis clients particuliers et professionnels",
  },
  ar: {
    badgeText: "شهادات",
    badgeHighlight: "العملاء",
    title: "ماذا يقول",
    titleHighlight: "عملاؤنا",
    titleEnd: "",
    subtitle: "آراء العملاء الخاصين والمهنيين",
  }
};

const TestimonialCard = ({ testimonial, isRTL }: { testimonial: Testimonial; isRTL: boolean }) => (
  <div className="flex-shrink-0 w-[340px] md:w-[380px]">
    <div
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full mx-3"
      style={{ boxShadow: '0 10px 25px rgba(77, 175, 239, 0.1)' }}
    >
      <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
        <Quote className="w-6 h-6 text-primary" />
      </div>

      <div className={`mb-4 flex ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>

      <p className={`text-gray-700 text-sm leading-relaxed mb-6 flex-grow ${isRTL ? 'text-right' : ''}`}>
        &ldquo;{testimonial.text}&rdquo;
      </p>

      <div className={`flex items-center gap-3 pt-4 border-t border-gray-100 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className="rounded-full bg-gray-100 w-10 h-10 flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-bold">{testimonial.name.charAt(0)}</span>
        </div>
        <div>
          <p className={`text-sm font-semibold text-gray-900 ${isRTL ? 'text-right' : ''}`}>{testimonial.name}</p>
        </div>
      </div>
    </div>
  </div>
);

const TestimonialsSection = ({ theme = 'fr' }: TestimonialsSectionProps) => {
  const isRTL = theme === 'ar';
  const testimonials = theme === 'ar' ? testimonialsAR : testimonialsFR;
  const texts = i18n[theme];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number | null>(null);
  const scrollPositionRef = useRef(0);
  const speed = 0.5;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  const animate = useCallback(() => {
    if (!scrollRef.current || isPaused) return;

    const container = scrollRef.current;
    const singleSetWidth = container.scrollWidth / 3;

    scrollPositionRef.current += isRTL ? -speed : speed;

    if (!isRTL && scrollPositionRef.current >= singleSetWidth) {
      scrollPositionRef.current -= singleSetWidth;
    } else if (isRTL && Math.abs(scrollPositionRef.current) >= singleSetWidth) {
      scrollPositionRef.current += singleSetWidth;
    }

    container.style.transform = `translateX(${-scrollPositionRef.current}px)`;
    animationRef.current = requestAnimationFrame(animate);
  }, [isPaused, isRTL]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [animate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
  };

  return (
    <SectionWrapper className="py-16 md:py-24 bg-gray-50">
      <SectionMargin>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div className="mb-6 flex justify-center">
              <SectionBadge text={texts.badgeText} highlightText={texts.badgeHighlight} />
            </div>
            <SectionTitle>
              {texts.title} <SpanText text={texts.titleHighlight} className="" /> {texts.titleEnd}
            </SectionTitle>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              {texts.subtitle}
            </p>
          </div>

          {/* Desktop: Infinite auto-scrolling slider, pause on hover */}
          <div
            className="hidden md:block overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              ref={scrollRef}
              className="flex will-change-transform"
              style={{ width: 'max-content' }}
            >
              {duplicatedTestimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={`${testimonial.id}-${index}`}
                  testimonial={testimonial}
                  isRTL={isRTL}
                />
              ))}
            </div>
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
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="min-w-full px-2">
                    <div
                      className="bg-white rounded-xl p-6 shadow-lg flex flex-col h-full"
                      style={{ boxShadow: '0 10px 25px rgba(77, 175, 239, 0.15)' }}
                    >
                      <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                        <Quote className="w-6 h-6 text-primary" />
                      </div>
                      <div className={`mb-4 flex ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className={`text-gray-700 text-sm leading-relaxed mb-6 flex-grow ${isRTL ? 'text-right' : ''}`}>
                        &ldquo;{testimonial.text}&rdquo;
                      </p>
                      <div className={`flex items-center gap-3 pt-4 border-t border-gray-100 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className="rounded-full bg-gray-100 w-10 h-10 flex items-center justify-center">
                          <span className="text-sm font-bold">{testimonial.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className={`text-sm font-semibold text-gray-900 ${isRTL ? 'text-right' : ''}`}>{testimonial.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors z-10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-primary" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors z-10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-primary" />
            </button>

            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex ? 'bg-primary w-8' : 'bg-gray-300 w-2'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </SectionMargin>
    </SectionWrapper>
  );
};

export default TestimonialsSection;


