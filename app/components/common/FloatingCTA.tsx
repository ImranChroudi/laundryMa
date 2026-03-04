'use client'
import React from 'react';
import Image from 'next/image';
import CTAButton from './CTAButton';

const FloatingCTA = () => {
  const whatsappNumber = "212612345678";
  const whatsappMessage = "Bonjour, je souhaite en savoir plus sur vos services de blanchisserie.";

  return (
    <>
      {/* Desktop: CTA Button + urgency badge */}
      <div className="hidden md:block fixed bottom-6 left-6 z-50">
        <div className="relative flex flex-col items-start gap-2">
          {/* Urgency nudge */}
          <div className="flex items-center gap-1.5 bg-white border border-secondary/30 rounded-full px-3 py-1 shadow-md animate-glow-pulse">
            <span className="w-2 h-2 rounded-full bg-secondary animate-ping inline-block"></span>
            <span className="text-secondary text-xs font-semibold">Livraison en 24h garantie</span>
          </div>
          <div className="relative z-10">
            <CTAButton text="Demander une ramassage" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-secondary/30 rounded-xl blur-2xl animate-ping-slow h-12"></div>
          <div className="absolute bottom-0 left-0 right-0 bg-secondary/15 rounded-xl blur-xl animate-pulse-shadow h-12"></div>
        </div>
      </div>

      {/* Mobile: Bottom CTA Banner */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 shadow-2xl">
        {/* Top accent line */}
        <div className="h-0.5 bg-linear-to-r from-secondary via-primary to-secondary"></div>
        <div className="bg-white/95 backdrop-blur-md px-4 py-3 flex items-center justify-between gap-3">
          {/* Left: WhatsApp contact */}
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white rounded-xl px-4 py-2.5 font-bold text-sm transition-all duration-200 flex-1 justify-center"
          >
            <Image 
              src="/images/wathsapIcon.avif" 
              alt="WhatsApp" 
              width={18} 
              height={18}
              className="w-4.5 h-4.5"
            />
            <span>WhatsApp</span>
          </a>
          {/* Right: Main CTA */}
          <div className="flex-1">
            <CTAButton text="Commander" className="w-full justify-center" />
          </div>
        </div>
      </div>

    </>
  );
};

export default FloatingCTA;

