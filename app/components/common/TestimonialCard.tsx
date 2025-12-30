'use client'
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import SectionBadge from '@/app/components/common/SectionBadge';

interface Testimonial {
  id: number;
  text: string;
  name: string;
  image: string;
}

const Testimonials  = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      text: "J'ai utilisé Laundry.ma dans toutes les villes où j'ai vécu et je suis FAN. C'est tellement pratique, le parfum de leur lessive est incroyable et tous mes livreurs ont été très sympathiques. Je recommande vivement !",
      name: "Henna M.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Henna"
    },
    {
      id: 2,
      text: "Laundry.ma est le service de lavage et pliage le plus fiable et pratique à Tanger. Les vêtements reviennent toujours parfaitement propres. Je leur confie également mon nettoyage à sec, même mes plus beaux habits.",
      name: "Brandon G.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Brandon"
    },
    {
      id: 3,
      text: "C'est le seul service de blanchisserie et nettoyage à sec que j'utiliserai jamais en ville. Une expérience professionnelle et VIP, avec une collecte et une livraison rapides. J'adore ce service !",
      name: "Isabelle S.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Isabelle"
    },
    {
      id: 4,
      text: "Je suis totalement pour Laundry.ma. J'ai maintenant ma lessive dans l'immeuble, mais je ne peux pas ignorer à quel point Laundry.ma simplifie la vie. Super service – je ne comprends pas pourquoi les gens font encore leur propre lessive.",
      name: "Dylan A.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dylan"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="mb-6 flex justify-center">
              <SectionBadge text="Témoignages" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-tertiary mb-4">
            Ce que nos <span className="text-primary">clients</span> disent
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez les expériences de nos clients satisfaits
          </p>
        </div>

        {/* Desktop View */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between min-h-[350px]"
            >
              <div>
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Quote className="w-6 h-6 text-primary" />
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-6">"{testimonial.text}"</p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div>
                  <div className='rouneded-full bg-gray-100 w-10 h-10 flex items-center justify-center'>
                    <span className='text-sm font-bold'>{testimonial.name.charAt(0)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View */}
        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-2">
                  <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex flex-col justify-between min-h-[400px]">
                    <div>
                      <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                        <Quote className="w-6 h-6 text-primary" />
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed mb-6">"{testimonial.text}"</p>
                    </div>
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full bg-gray-100"
                      />
                      <span className="font-semibold text-sm text-tertiary">{testimonial.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="bg-primary/10 rounded-full p-3 hover:bg-primary/20 transition-colors"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft className="w-5 h-5 text-primary" />
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex ? 'bg-primary w-8' : 'bg-gray-300 w-2'
                  }`}
                  aria-label={`Aller au témoignage ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="bg-primary/10 rounded-full p-3 hover:bg-primary/20 transition-colors"
              aria-label="Témoignage suivant"
            >
              <ChevronRight className="w-5 h-5 text-primary" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
