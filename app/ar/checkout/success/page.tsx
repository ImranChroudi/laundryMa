"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SectionWrapper from "@/app/components/common/SectionWrapper";
import SectionMargin from "@/app/components/common/SectionMargin";
import { CheckCircle } from "lucide-react";

export default function CheckoutSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page after 2 seconds
    const timer = setTimeout(() => {
      router.push('/ar');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

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
            تم إرسال طلبك بنجاح!
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            شكراً لك! تم استلام طلبك وسنتواصل معك قريباً.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <p className="text-gray-700">
              سيتم إعادة توجيهك إلى الصفحة الرئيسية في بضع ثوانٍ...
            </p>
          </div>
          
          <button
            onClick={() => router.push('/ar')}
            className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition"
          >
            العودة إلى الصفحة الرئيسية
          </button>
        </div>
      </SectionMargin>
    </SectionWrapper>
  );
}








