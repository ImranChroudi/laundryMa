"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface GradientButtonProps {
  text: string;
  href: string;
  className?: string;
  iconLeft?: React.ReactNode;
}

const GradientButton = ({
  text,
  href,
  className = "",
  iconLeft,
}: GradientButtonProps) => {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith("/ar");

  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  return (
    <Link href={href} className={`inline-block ${className}`}>
      <div
        className="shrink-0 flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-white rounded-xl transition-all duration-200 hover:opacity-90 active:scale-95 cursor-pointer"
        style={{
          background: "linear-gradient(135deg, #4dafef 0%, #1e3a5f 100%)",
          boxShadow: "0 4px 16px rgba(77, 175, 239, 0.35)",
        }}
      >
        {iconLeft && <span className="shrink-0">{iconLeft}</span>}
        <span>{text}</span>
        <ArrowIcon className="w-4 h-4" />
      </div>
    </Link>
  );
};

export default GradientButton;
