'use client'

import Image from 'next/image';

export default function ConditionalFloatingCTA() {
  const whatsappNumber = "212677777724";
  const whatsappMessage = "Bonjour, je souhaite en savoir plus sur vos services de blanchisserie.";

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactez-nous sur WhatsApp"
      className="md:hidden fixed bottom-20 right-4 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg active:scale-95 transition-transform duration-150 animate-whatsapp-glow"
    >
      <Image
        src="/images/wathsapIcon.avif"
        alt="WhatsApp"
        width={28}
        height={28}
        className="w-7 h-7"
      />

      {/* Glow animation styles */}
      <style jsx>{`
        @keyframes whatsapp-glow {
          0%, 100% {
            box-shadow: 0 0 8px rgba(37, 211, 102, 0.4), 0 0 20px rgba(37, 211, 102, 0.2);
          }
          50% {
            box-shadow: 0 0 16px rgba(37, 211, 102, 0.6), 0 0 40px rgba(37, 211, 102, 0.3);
          }
        }
        .animate-whatsapp-glow {
          animation: whatsapp-glow 2s ease-in-out infinite;
        }
      `}</style>
    </a>
  );
}



