'use client'
import React, { useMemo } from "react";
import {
    Smartphone,
    ShoppingBasket,
    WashingMachine,
    Truck,
  } from "lucide-react";
import CTAButton from "@/app/components/common/CTAButton";
import Image from "next/image";
import SectionBadge from "@/app/components/common/SectionBadge";
import WhatsAppButton from "@/app/components/common/WhatsAppButton";
import SpanText from "@/app/components/common/SpanText";
import SectionWrapper from "@/app/components/common/SectionWrapper";
import SectionMargin from "@/app/components/common/SectionMargin";
import { usePathname } from "next/navigation";

const HowWeWork: React.FC = () => {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');

  // Mémoïser les steps pour éviter les re-renders
  const steps = useMemo(() => isArabic ? [
    {
      icon: <Smartphone className="text-white" size={28} />,
      title: "أنت تطلب",
      text: "حدد موعداً في أقل من 30 ثانية مع أحد سائقينا.",
    },
    {
      icon: <ShoppingBasket className="text-white" size={28} />,
      title: "نحن نجمع",
      text: "يأتي أحد سائقينا إلى منزلك أو مكتبك لاستلام ملابسك.",
    },
    {
      icon: <WashingMachine className="text-white" size={28} />,
      title: "نحن ننظف",
      text: "شركاؤنا المختارون يتولون تنظيف وكي غسيلك.",
    },
    {
      icon: <Truck className="text-white" size={28} />,
      title: "نحن نسلم",
      text: "في أقل من 24 ساعة، يعيد لك سائقك ملابسك نظيفة.",
    },
  ] : [
    {
      icon: <Smartphone className="text-white" size={28} />,
      title: "Vous Commandez",
      text: "Planifiez en moins de 30 secondes un rendez-vous avec un de nos livreurs.",
    },
    {
      icon: <ShoppingBasket className="text-white" size={28} />,
      title: "Nous Collectons",
      text: "Un de nos livreurs se présente à votre domicile ou bureau pour récupérer vos vêtements.",
    },
    {
      icon: <WashingMachine className="text-white" size={28} />,
      title: "Nous Nettoyons",
      text: "Nos partenaires sélectionnés se chargent du nettoyage et du repassage de votre linge.",
    },
    {
      icon: <Truck className="text-white" size={28} />,
      title: "Nous Livrons",
      text: "Moins de 24h plus tard, votre livreur vous rend vos vêtements propres.",
    },
  ], [isArabic]);

  return (
    <SectionWrapper className="py-20 md:py-28">
      <SectionMargin>
    <div
      id="howwework"
      className="flex flex-col lg:flex-row items-start justify-center relative"
    >
      {/* LEFT TEXT + CTA */}
      <div className="w-full lg:w-1/2 space-y-6 lg:space-y-8 pt-10 lg:pt-24 sticky lg:top-20 self-start">
        <div className="mb-6">
            <SectionBadge text={isArabic ? "العملية" : "Processus"} />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-tertiary leading-tight">
            {isArabic ? (
              <>
                كيف <br/><span className="text-primary font-extrabold">يعمل؟</span>
              </>
            ) : (
              <>
                Comment <br/><SpanText text="ça marche ?" className="font-extrabold" />
              </>
            )}
          </h1>
        </div>

        <p className="text-gray-600 text-base sm:text-lg md:max-w-md">
          {isArabic 
            ? "خدمة بسيطة وسريعة وفعالة. Laundry.ma يرافقك في كل خطوة، من الطلب إلى التسليم، للحصول على غسيل دائماً لا تشوبه شائبة."
            : "Un service simple, rapide et efficace. Laundry.ma vous accompagne à chaque étape, de la commande à la livraison, pour un linge toujours impeccable."
          }
        </p>

        <div className="hidden lg:flex flex-wrap gap-3">
          <CTAButton />
          <WhatsAppButton />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 mt-12 lg:mt-0 space-y-12 lg:space-y-16 px-2">
        <div className="rounded-2xl overflow-hidden shadow-lg">
          {/* Image optimisée avec srcset pour mobile */}
          <Image
            src="/images/img1.avif"
            alt="Service Laundry.ma"
            className="w-full h-55 sm:h-75 md:h-95 lg:h-105 object-cover"
            loading="lazy"
            width={1920}
            height={420}
          />
        </div>

        <div className="relative">
          {steps.map((step, index) => (
            <div key={index} className="relative flex items-start mb-8 sm:mb-10 last:mb-0">
              {/* Icon with connecting line */}
              <div className="relative flex flex-col items-center mr-4 sm:mr-6">
                <div className="p-3 bg-primary rounded-full shrink-0 z-10">
                  {step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute top-full left-1/2 w-0.5 bg-primary/30 transform -translate-x-1/2" style={{ top: '100%', height: 'calc(100% + 2rem + 0.5rem)' }}></div>
                )}
              </div>
              
              {/* Content */}
              <div className="flex-1 pt-1">
                <h3 className="text-lg sm:text-xl font-semibold text-tertiary mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

      {/* CTA group — last on mobile */}
      <div className="flex flex-wrap gap-3 pt-6 lg:hidden">
        <CTAButton />
        <WhatsAppButton />
      </div>
      </SectionMargin>
    </SectionWrapper>
  );
};

export default React.memo(HowWeWork);
