'use client'
import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionWrapper from '@/app/components/common/SectionWrapper';
import SectionMargin from '@/app/components/common/SectionMargin';
import SectionBadge from '@/app/components/common/SectionBadge';

interface Testimonial {
  id: number;
  text: string;
  name: string;
  rating: number;
}

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const testimonials: Testimonial[] = [
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
    },
    {
      id: 4,
      text: "أنا مؤيد تماماً لـ Laundry.ma. لدي الآن غسالة في المبنى، لكنني لا أستطيع تجاهل مدى سهولة Laundry.ma للحياة. خدمة رائعة - لا أفهم لماذا لا يزال الناس يغسلون ملابسهم بأنفسهم.",
      name: "محمد بوشعيب",
      rating: 5
    },
    {
      id: 5,
      text: "كفندق، نحتاج إلى خدمة غسيل موثوقة واحترافية. Laundry.ma يلبي احتياجاتنا تماماً مع خدمة سريعة وجودة لا تشوبها شائبة. عملاؤنا دائماً راضون عن جودة الملابس.",
      name: "ياسين بنحدو",
      rating: 5
    },
    {
      id: 6,
      text: "مطعمنا يعهد بكل غسيله إلى Laundry.ma منذ عامين. خدمة لا تشوبها شائبة، في الوقت المحدد واحترافية. فريقهم يفهم احتياجاتنا ويتكيف مع جدولنا الزمني. أنصح به دون تردد.",
      name: "أمين العلمي",
      rating: 5
    }
  ];

  // Auto-play carousel on mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
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
    <SectionWrapper className="py-16 md:py-24 bg-gray-50">
      <SectionMargin>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16" dir="rtl">
            <div className="mb-6 flex justify-center">
              <SectionBadge text="الشهادات" highlightText="العملاء" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-tertiary mb-4">
              ما يقوله <span className="text-primary">عملاؤنا</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              آراء العملاء الأفراد والمهنيين
            </p>
          </div>

          {/* Desktop Grid View */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
                style={{
                  boxShadow: '0 10px 25px rgba(77, 175, 239, 0.1)'
                }}
                dir="rtl"
              >
                {/* Quote Icon */}
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Quote className="w-6 h-6 text-primary" />
                </div>

                {/* Rating Stars */}
                <div className="mb-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 text-sm leading-relaxed mb-6 flex-grow text-right">
                  "{testimonial.text}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100 flex-row-reverse">
                  <div className='rounded-full bg-gray-100 w-10 h-10 flex items-center justify-center'>
                    <span className='text-sm font-bold'>{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 text-right">{testimonial.name}</p>
                  </div>
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
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="min-w-full px-2"
                  >
                    <div
                      className="bg-white rounded-xl p-6 shadow-lg flex flex-col h-full"
                      style={{
                        boxShadow: '0 10px 25px rgba(77, 175, 239, 0.15)'
                      }}
                      dir="rtl"
                    >
                      {/* Quote Icon */}
                      <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                        <Quote className="w-6 h-6 text-primary" />
                      </div>

                      {/* Rating Stars */}
                      <div className="mb-4 flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-gray-700 text-sm leading-relaxed mb-6 flex-grow text-right">
                        "{testimonial.text}"
                      </p>

                      {/* Author Info */}
                      <div className="flex items-center gap-3 pt-4 border-t border-gray-100 flex-row-reverse">
                        <div className='rounded-full bg-gray-100 w-10 h-10 flex items-center justify-center'>
                          <span className='text-sm font-bold'>{testimonial.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 text-right">{testimonial.name}</p>
                        </div>
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
              aria-label="الشهادة السابقة"
            >
              <ChevronRight className="w-6 h-6 text-primary" />
            </button>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors z-10"
              aria-label="الشهادة التالية"
            >
              <ChevronLeft className="w-6 h-6 text-primary" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-primary w-8'
                      : 'bg-gray-300 w-2'
                  }`}
                  aria-label={`انتقل إلى الشهادة ${index + 1}`}
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
