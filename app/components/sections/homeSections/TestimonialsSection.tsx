'use client'
import React, { useState, useEffect } from 'react';
import { Star, Quote, Building2, User, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionWrapper from '@/app/components/common/SectionWrapper';
import SectionMargin from '@/app/components/common/SectionMargin';
import SectionBadge from '@/app/components/common/SectionBadge';
import Image from 'next/image';

interface Testimonial {
  id: number;
  text: string;
  name: string;
  image: string;
  rating: number;
}

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const testimonials = [
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
    },
    {
      id: 4,
      text: "Je suis totalement pour Laundry.ma. J'ai maintenant ma lessive dans l'immeuble, mais je ne peux pas ignorer à quel point Laundry.ma simplifie la vie. Super service – je ne comprends pas pourquoi les gens font encore leur propre lessive.",
      name: "Mohamed Bouchaib",
      rating: 5
    },
    {
      id: 5,
      text: "En tant qu'hôtel, nous avons besoin d'un service de blanchisserie fiable et professionnel. Laundry.ma répond parfaitement à nos besoins avec un service rapide et une qualité irréprochable. Nos clients sont toujours satisfaits de la qualité du linge.",
      name: "Yassine Benhaddou",
      rating: 5
    },
    {
      id: 6,
      text: "Notre restaurant confie toute sa blanchisserie à Laundry.ma depuis 2 ans. Service impeccable, ponctuel et professionnel. Leur équipe comprend nos besoins et s'adapte à nos horaires. Je recommande sans hésitation.",
      name: "Amin Alami",
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
          <div className="text-center mb-12 md:mb-16">
            <div className="mb-6 flex justify-center">
              <SectionBadge text="Témoignages" highlightText="clients" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-tertiary mb-4">
              Ce que nos <span className="text-primary">clients</span> disent
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Avis clients particuliers et professionnels
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
                <p className="text-gray-700 text-sm leading-relaxed mb-6 flex-grow">
                  "{testimonial.text}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className='rounded-full bg-gray-100 w-10 h-10 flex items-center justify-center'>
                    <span className='text-sm font-bold'>{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{testimonial.name}</p>
                  </div>
                </div>
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
                      <p className="text-gray-700 text-sm leading-relaxed mb-6 flex-grow">
                        "{testimonial.text}"
                      </p>

                      {/* Author Info */}
                      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                        <div className='rounded-full bg-gray-100 w-10 h-10 flex items-center justify-center'>
                          <span className='text-sm font-bold'>{testimonial.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{testimonial.name}</p>
                        </div>
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


