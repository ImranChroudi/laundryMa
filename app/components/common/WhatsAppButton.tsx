"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
  showPhoneNumber?: boolean;
}

const WhatsAppButton = ({ 
  phoneNumber = "212677777724", 
  message,
  className = "",
  showPhoneNumber = true
}: WhatsAppButtonProps) => {
  const [clientName, setClientName] = useState<string>("");

  useEffect(() => {
    // Try to get client name from localStorage
    if (typeof window !== 'undefined') {
      try {
        const userData = localStorage.getItem("userLaundryMa");
        if (userData) {
          const user = JSON.parse(userData);
          if (user?.name) {
            setClientName(user.name);
          }
        }
      } catch (error) {
        console.error("Error reading user data from localStorage:", error);
      }
    }
  }, []);

  // Build the message with "Bonjour" and client name
  const defaultMessage = clientName 
    ? `Bonjour, je suis ${clientName}. Je souhaite en savoir plus sur vos services de blanchisserie.`
    : "Bonjour, je souhaite en savoir plus sur vos services de blanchisserie.";
  
  const finalMessage = message || defaultMessage;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`;

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#22c55e] active:scale-95 text-white px-7 py-4 rounded-xl font-bold text-base transition-all duration-200 sm:max-w-auto max-w-max ${className}`}
      style={{ boxShadow: '0 4px 16px -2px rgba(37, 211, 102, 0.40)' }}
    >
      <Image 
        src="/images/wathsapIcon.avif" 
        alt="WhatsApp" 
        width={20} 
        height={20}
        className="w-5 h-5"
      />
      {showPhoneNumber && <span>+212 6 77 77 77 24</span>}
    </Link>
  );
};

export default WhatsAppButton;

