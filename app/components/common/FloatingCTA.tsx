'use client'
import React from 'react';
import { Phone } from 'lucide-react';
import Image from 'next/image';
import CTAButton from './CTAButton';

const FloatingCTA = () => {
  const phoneNumber = "212612345678"; // Remplacez par votre numéro de téléphone
  const whatsappNumber = "212612345678"; // Remplacez par votre numéro WhatsApp
  const whatsappMessage = "Bonjour, je souhaite en savoir plus sur vos services de blanchisserie.";

  return (
    <>
      {/* Desktop: CTA Button */}
      <div className="hidden md:block fixed bottom-6 left-6 z-50">
        <div className="relative">
          <div className="relative z-10">
            <CTAButton text="Demander une ramassage" />
          </div>
          {/* Animated shadow ring with secondary color */}
          <div className="absolute inset-0 bg-secondary/40 rounded-md blur-2xl animate-ping-slow"></div>
          <div className="absolute inset-0 bg-secondary/20 rounded-md blur-xl animate-pulse-shadow"></div>
        </div>
      </div>

      {/* Mobile: Green Banner with WhatsApp */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-primary via-primary to-primary/90 shadow-2xl">
        <div className="px-4 py-3 flex items-center justify-between">
          {/* Left Side: WhatsApp Icon and Info */}
          <div className="flex items-center gap-3 flex-1">
            <div className="bg-white/20 rounded-full p-2 flex-shrink-0">
              <Image 
                src="/images/wathsapIcon.avif" 
                alt="WhatsApp" 
                width={20} 
                height={20}
                className="w-5 h-5"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-white text-xs font-medium">Contacter via WhatsApp</span>
              <span className="text-white text-sm">Disponible 24H/24 • 7J/7</span>
            </div>
          </div>

          {/* Right Side: WhatsApp Button */}
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/20 hover:bg-white/30 text-white rounded-lg px-4 py-2.5 flex items-center gap-2 font-semibold transition-all duration-300 flex-shrink-0"
          >
            <Image 
              src="/images/wathsapIcon.avif" 
              alt="WhatsApp" 
              width={20} 
              height={20}
              className="w-5 h-5"
            />
            <span>Demander</span>
          </a>
        </div>
      </div>

    </>
  );
};

export default FloatingCTA;

