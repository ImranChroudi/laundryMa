'use client'

import Image from 'next/image';

export default function ConditionalFloatingCTA() {
  const whatsappNumber = "212677777724";
  const whatsappMessage = "Bonjour, je souhaite en savoir plus sur vos services de blanchisserie.";

  return (
    <div className="md:hidden fixed bottom-20 right-4 z-50">
      {/* Ping ring — expanding pulse */}
      <span className="absolute inset-0 rounded-full bg-[#25D366]/30 animate-wa-ping" />
      {/* Soft glow ring */}
      <span className="absolute -inset-1 rounded-full bg-[#25D366]/20 animate-wa-glow blur-sm" />

      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactez-nous sur WhatsApp"
        className="relative flex items-center justify-center w-16 h-16 rounded-full bg-[#25D366] shadow-[0_4px_20px_rgba(37,211,102,0.45)] active:scale-90 transition-transform duration-150"
      >
        <Image
          src="/images/wathsapIcon.avif"
          alt="WhatsApp"
          width={32}
          height={32}
          className="w-8 h-8 animate-wa-bounce"
        />
      </a>

      <style jsx>{`
        @keyframes wa-ping {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          70%, 100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }
        @keyframes wa-glow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.3);
          }
        }
        @keyframes wa-bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }
        .animate-wa-ping {
          animation: wa-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-wa-glow {
          animation: wa-glow 2.5s ease-in-out infinite;
        }
        .animate-wa-bounce {
          animation: wa-bounce 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}



