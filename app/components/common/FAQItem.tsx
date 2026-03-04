"use client"
import React, { useState } from "react";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import SectionBadge from "@/app/components/common/SectionBadge";
import SectionWrapper from "@/app/components/common/SectionWrapper";
import SectionMargin from "@/app/components/common/SectionMargin";
import SpanText from "@/app/components/common/SpanText";
import { usePathname } from "next/navigation";

interface FAQItemData {
  question: string;
  answer: string;
}

// FAQ data in French
const faqDataFr: FAQItemData[] = [
  {
    question: "Quels types de vêtements pouvez-vous nettoyer ?",
    answer: "Nous prenons en charge tous types de vêtements, y compris les tissus délicats : soie, cachemire, alpaga, lin, ainsi que les vêtements du quotidien."
  },
  {
    question: "Proposez-vous un service de collecte et livraison ?",
    answer: "Oui, nous assurons la collecte et la livraison gratuites de 9h à 21h, 7 jours sur 7."
  },
  {
    question: "Quels produits utilisez-vous pour le nettoyage ?",
    answer: "Nous utilisons uniquement des solvants et produits écologiques, non irritants et sûrs pour vos vêtements et la peau."
  },
  {
    question: "En combien de temps puis-je récupérer mon linge ?",
    answer: "La plupart des services sont prêts en 24 heures. Pour les tapis 48 heures et plus selon le type du tapis et la quantité du travail qu'on a. Un service express est disponible pour vos urgences."
  },
  {
    question: "Traitez-vous également les tapis, canapés et literie ?",
    answer: "Oui, nous proposons des services spécialisés pour tapis, canapés, matelas, couettes et rideaux, directement à domicile si nécessaire."
  },
  {
    question: "Comment puis-je passer une commande ?",
    answer: "Vous pouvez passer commande facilement via notre site web laundry.ma en 3 clics : sélectionnez vos articles, indiquez votre adresse et confirmez votre commande. Vous pouvez également nous appeler au +212 6 77 77 77 24 ou nous contacter via WhatsApp."
  },
  {
    question: "Quels sont vos tarifs ?",
    answer: "Nos tarifs varient selon le type de service et la quantité. Consultez notre page tarifs pour voir tous nos prix détaillés. La collecte et la livraison sont toujours gratuites, et la livraison est gratuite pour les commandes supérieures à 100 DH."
  },
  {
    question: "Acceptez-vous les paiements en ligne ?",
    answer: "Oui, nous acceptons les paiements en ligne par carte bancaire ainsi que les paiements à la livraison en espèces. Tous nos modes de paiement sont sécurisés."
  },
  {
    question: "Que faire si un article est endommagé ?",
    answer: "Laundry.ma garantit tous ses services. En cas de problème, contactez-nous immédiatement et nous trouverons une solution satisfaisante. Nous assurons une garantie complète sur tous nos services de nettoyage."
  },
  {
    question: "Proposez-vous des services pour les professionnels ?",
    answer: "Oui, nous proposons des services dédiés aux professionnels (hôtels, restaurants, entreprises) avec des tarifs préférentiels et des solutions sur mesure. Contactez-nous pour un devis personnalisé."
  },
  {
    question: "Quelle est votre zone de livraison ?",
    answer: "Nous livrons dans toute la région de Tanger et ses environs. Pour connaître si nous couvrons votre zone, contactez-nous ou consultez notre site web. Nous étendons régulièrement notre zone de couverture."
  },
  {
    question: "Puis-je suivre ma commande en temps réel ?",
    answer: "Oui, une fois votre commande passée, vous recevrez un numéro de suivi par SMS et email. Vous pouvez suivre l'état de votre commande en ligne sur notre site dans la section 'Suivi de commande'."
  }
];

// FAQ data in Arabic
const faqDataAr: FAQItemData[] = [
  {
    question: "ما أنواع الملابس التي يمكن تنظيفها؟",
    answer: "نتعامل مع جميع أنواع الملابس، بما في ذلك الأقمشة الحساسة: الحرير، الكشمير، الألباكا، الكتان، وكذلك الملابس اليومية."
  },
  {
    question: "هل تقدّمون خدمة الاستلام والتوصيل؟",
    answer: "نعم، نحن نوفر الاستلام والتوصيل المجاني من 9 صباحًا حتى 9 مساءً، طوال الأسبوع."
  },
  {
    question: "ما المنتجات التي تستخدمونها للتنظيف؟",
    answer: "نستخدم فقط منتجات ومواد صديقة للبيئة، غير مهيّجة للبشرة وآمنة على الملابس."
  },
  {
    question: "كم من الوقت يستغرق تجهيز الملابس؟",
    answer: "معظم الخدمات جاهزة خلال 24 ساعة. بالنسبة للسجاد 48 ساعة وأكثر حسب نوعية السجاد وكمية العمل وهناك خدمة سريعة متاحة للطوارئ."
  },
  {
    question: "هل تعالجون أيضاً السجاد والأرائك والفراش؟",
    answer: "نعم، نقدم خدمات متخصصة للسجاد، الأرائك، المراتب، الألحفة والستائر، مباشرة في المنزل إذا لزم الأمر."
  },
  {
    question: "كيف يمكنني تقديم طلب؟",
    answer: "يمكنك تقديم الطلب بسهولة عبر موقعنا الإلكتروني laundry.ma بثلاث نقرات: اختر منتجاتك، حدد عنوانك وأكد طلبك. يمكنك أيضاً الاتصال بنا على +212 6 77 77 77 24 أو التواصل معنا عبر واتساب."
  },
  {
    question: "ما هي أسعاركم؟",
    answer: "تختلف أسعارنا حسب نوع الخدمة والكمية. راجع صفحة الأسعار لرؤية جميع أسعارنا التفصيلية. الاستلام والتوصيل مجانيان دائماً، والتوصيل مجاني للطلبات التي تزيد عن 100 درهم."
  },
  {
    question: "هل تقبلون الدفع عبر الإنترنت؟",
    answer: "نعم، نقبل الدفع عبر الإنترنت بالبطاقة المصرفية وكذلك الدفع عند التسليم نقداً. جميع طرق الدفع لدينا آمنة."
  },
  {
    question: "ماذا لو تضررت قطعة؟",
    answer: "Laundry.ma يضمن جميع خدماته. في حالة وجود مشكلة، اتصل بنا فوراً وسنجد حلاً مرضياً. نضمن ضماناً كاملاً على جميع خدمات التنظيف لدينا."
  },
  {
    question: "هل تقدّمون خدمات للمهنيين؟",
    answer: "نعم، نقدم خدمات مخصصة للمهنيين (الفنادق، المطاعم، الشركات) بأسعار تفضيلية وحلول مخصصة. اتصل بنا للحصول على عرض أسعار مخصص."
  },
  {
    question: "ما هي منطقة التوصيل الخاصة بكم؟",
    answer: "نوصل في جميع أنحاء منطقة طنجة وضواحيها. لمعرفة ما إذا كنا نغطي منطقتك، اتصل بنا أو راجع موقعنا الإلكتروني. نوسع منطقة التغطية لدينا بانتظام."
  },
  {
    question: "هل يمكنني تتبع طلبي في الوقت الفعلي؟",
    answer: "نعم، بمجرد تقديم طلبك، ستحصل على رقم تتبع عبر الرسائل النصية والبريد الإلكتروني. يمكنك تتبع حالة طلبك عبر الإنترنت على موقعنا في قسم 'تتبع الطلب'."
  }
];

const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(1);
  const pathname = usePathname();
  
  // Determine current language from pathname
  const currentLang = pathname.startsWith("/ar") ? "ar" : "fr";
  
  // Get FAQ items based on current language
  const safeFaqItems: FAQItemData[] = currentLang === "ar" ? faqDataAr : faqDataFr;

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };
  
  const isRTL = currentLang === "ar";

  return (
    <SectionWrapper className="py-16 md:py-24">
      <SectionMargin>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Left Side - Title */}
            <div className="lg:sticky lg:top-20 self-start">
              <div className="mb-6">
                <SectionBadge text={currentLang === 'ar' ? 'الأسئلة' : 'Questions'} highlightText={currentLang === 'ar' ? 'الشائعة' : 'fréquentes'} />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-tertiary leading-tight mb-4">
                {currentLang === 'ar' ? (
                  <>
                    أسئلتكم،<br />إجاباتنا
                  </>
                ) : (
                  <>
                    Vos questions,<br /><SpanText text="répondues" className="" />
                  </>
                )}
              </h2>
              <p className="text-gray-500 text-base leading-relaxed max-w-sm">
                {currentLang === 'ar'
                  ? 'كل ما تريد معرفته عن خدماتنا في مكان واحد.'
                  : 'Tout ce que vous devez savoir sur nos services, au même endroit.'}
              </p>
            </div>

            {/* Right Side - FAQ Items */}
            <div className="space-y-3">
              {safeFaqItems.length > 0 ? (
                safeFaqItems.map((item, index) => (
                  <div
                    key={index}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      openId === index
                        ? "bg-white border-primary/20 shadow-lg shadow-primary/5"
                        : "bg-gray-50/50 border-gray-100 hover:bg-white hover:border-gray-200 hover:shadow-md"
                    }`}
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full flex items-center justify-between gap-4 p-5 transition-colors"
                      style={{ textAlign: isRTL ? "right" : "left" }}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                          openId === index ? "bg-primary text-white" : "bg-primary/10 text-primary"
                        }`}>
                          <MessageCircleQuestion className="w-4 h-4" />
                        </div>
                        <h3 className={`text-base md:text-lg font-semibold transition-colors duration-300 flex-1 ${
                          openId === index ? "text-tertiary" : "text-gray-700"
                        } ${isRTL ? 'text-right' : 'text-left'}`}>
                          {item.question}
                        </h3>
                      </div>
                      <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        openId === index ? "bg-primary/10 rotate-180" : "bg-gray-100"
                      }`}>
                        <ChevronDown
                          className={`w-4 h-4 transition-colors duration-300 ${
                            openId === index ? "text-primary" : "text-gray-400"
                          }`}
                        />
                      </div>
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openId === index
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-5 pb-5 pl-16">
                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  Loading FAQs...
                </div>
              )}
            </div>
          </div>
        </div>
      </SectionMargin>
    </SectionWrapper>
  );
};

export default FAQ;
