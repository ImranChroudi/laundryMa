"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

interface CTAButtonProps {
  text?: string;
  className?: string;
  href?: string;
}

const CTAButton = ({ text, className = "", href }: CTAButtonProps) => {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');
  
  const defaultText = isArabic ? "اطلب الاستلام الآن" : "Demander une ramassage";
  const defaultHref = isArabic ? "/ar/checkout" : "/checkout";
  
  const buttonText = text || defaultText;
  const buttonHref = href || defaultHref;

  const buttonContent = (
    <div
      className={`relative overflow-hidden flex rounded-xl cursor-pointer items-center justify-center gap-2 bg-secondary px-3 sm:px-7 py-4 hover:bg-secondary/90 active:scale-95 transition-all duration-200 group sm:max-w-auto max-w-max ${className}`}
      style={{
        boxShadow: '0 4px 20px -2px rgba(229, 74, 51, 0.35), 0 2px 8px -2px rgba(229, 74, 51, 0.2)'
      }}
    >
      {/* Hover-only shine sweep */}
      <span className="absolute top-0 -left-full w-1/3 h-full bg-white/20 skew-x-[-15deg] pointer-events-none transition-all duration-700 ease-in-out group-hover:left-[150%]" />
      <p className="font-semibold text-white text-base relative z-10">{buttonText}</p>
      <ArrowRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform duration-200 relative z-10" />
    </div>
  );

  if (buttonHref) {
    return (
      <Link href={buttonHref}>
        {buttonContent}
      </Link>
    );
  }

  return buttonContent;
};

export default CTAButton;
