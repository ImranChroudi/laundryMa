"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface CTAButtonProps {
  text?: string;
  className?: string;
  href?: string;
}

const CTAButton = ({ text, className = "", href }: CTAButtonProps) => {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');
  
  // Default text based on language
  const defaultText = isArabic ? "اطلب الاستلام الآن" : "Demander une ramassage";
  const defaultHref = isArabic ? "/ar/checkout" : "/checkout";
  
  const buttonText = text || defaultText;
  const buttonHref = href || defaultHref;

  const buttonContent = (
    <div
      className={`flex rounded-md cursor-pointer items-center justify-center bg-secondary px-6 py-4 hover:bg-secondary/90 transition ${className}`}
      style={{
        boxShadow: '0 4px 6px -1px rgba(77, 175, 239, 0.3), 0 2px 4px -1px rgba(77, 175, 239, 0.2)'
      }}
    >
      <p className="font-semibold text-white">{buttonText}</p>
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
