"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import SectionWrapper from "@/app/components/common/SectionWrapper";
import SectionMargin from "@/app/components/common/SectionMargin";
import { CheckCircle } from "lucide-react";

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');

  useEffect(() => {
    // Redirect to home page after 2 seconds
    const timer = setTimeout(() => {
      router.push(isArabic ? '/ar' : '/');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router, isArabic]);

  return (
    <SectionWrapper className="py-16 md:py-24 bg-white min-h-screen flex items-center">
      <SectionMargin>
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <div className="bg-green-100 rounded-full p-6">
              <CheckCircle className="w-24 h-24 text-green-600" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {isArabic ? "تم إرسال طلبك بنجاح!" : "Commande réussie !"}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            {isArabic 
              ? "شكراً لك! تم استلام طلبك وسنتواصل معك قريباً." 
              : "Merci pour votre commande ! Nous avons bien reçu votre demande et nous vous contacterons bientôt."}
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <p className="text-gray-700">
              {isArabic 
                ? "سيتم إعادة توجيهك إلى الصفحة الرئيسية في بضع ثوانٍ..." 
                : "Vous allez être redirigé vers la page d'accueil dans quelques secondes..."}
            </p>
          </div>
          
          <button
            onClick={() => router.push(isArabic ? '/ar' : '/')}
            className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition"
          >
            {isArabic ? "العودة إلى الصفحة الرئيسية" : "Retour à l'accueil"}
          </button>
        </div>
      </SectionMargin>
    </SectionWrapper>
  );
}







