import {
  Clock,
  Truck,
  Calendar,
  Zap,
  DollarSign,
  ShieldCheck,
    Users,
    Award,
} from "lucide-react";
import SectionBadge from "@/app/components/common/SectionBadge";
import SectionWrapper from "@/app/components/common/SectionWrapper";
import SectionMargin from "@/app/components/common/SectionMargin";
import { BigTitle } from "@/app/components/common/Titles";
import CTAButton from "@/app/components/common/CTAButton";

interface InfoItem {
  icon: React.ReactNode;
  text: string;
}

interface StatItem {
  icon: React.ReactNode;
  number: string;
  label: string;
}

const OurComitements: React.FC = () => {

  const infoItems: InfoItem[] = [
    { icon: <Clock className="w-5 h-5" />, text: "الاستلام والتسليم من 9 صباحاً إلى 9 مساءً" },
    { icon: <Truck className="w-5 h-5" />, text: "خدمة مجانية في المنزل" },
    { icon: <Calendar className="w-5 h-5" />, text: "متاح 7 أيام في الأسبوع" },
    { icon: <Zap className="w-5 h-5" />, text: "خدمة سريعة في أقل من 24 ساعة" },
    { icon: <DollarSign className="w-5 h-5" />, text: "أسعار شفافة وجذابة" },
    { icon: <ShieldCheck className="w-5 h-5" />, text: "جودة مهنية مضمونة" },
  ];

  return (
    <SectionWrapper>
      <SectionMargin>
        <div className="bg-white mt-4 pt-4 pb-16">
          <div className="max-w-6xl ml-6">
            {/* --- Top Section --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
              {/* --- Title --- */}
              <div className="flex flex-col title-animate justify-start md:mb-0 mb-6">
                <div className="mb-6">
                  <SectionBadge text="التزاماتنا" />
                </div>
                <BigTitle>
                  <h1 className="font-bold text-right text-tertiary leading-tight">
                    تنظيفك الأول
                    <br />
                    الأساسيات
                    <br />
                    <span className="text-primary font-extrabold">.</span>
                  </h1>
                </BigTitle>
              </div>

              {/* --- Commitments --- */}
              <div className="space-y-6 flex flex-col w-full md:max-w-lg">
                {infoItems.map((itemData, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-6 p-4 rounded-xl bg-gray-50 border border-gray-100 shadow-sm cursor-pointer transition-all hover:shadow-md"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                      {itemData.icon}
                    </div>

                    <p
                      className="text-gray-700 text-lg pt-2 text-right"
                      style={{ letterSpacing: "1px" }}
                    >
                      {itemData.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* --- Statistics Section --- */}
            <div className="mt-16 w-full">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12">
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-tertiary mb-2">
                    <span className="text-primary">أرقامنا</span>
                  </h2>
                  <p className="text-gray-600 text-sm md:text-base">
                    ثقة تُقاس بالنتائج
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                  <div className="text-center">
                    <div 
                      className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
                      style={{
                        boxShadow: '0 4px 14px rgba(77, 175, 239, 0.4)'
                      }}
                    >
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">1000+</div>
                    <div className="text-sm md:text-base text-gray-600">عملاء راضون</div>
                  </div>

                  <div className="text-center">
                    <div 
                      className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
                      style={{
                        boxShadow: '0 4px 14px rgba(77, 175, 239, 0.4)'
                      }}
                    >
                      <Truck className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">5000+</div>
                    <div className="text-sm md:text-base text-gray-600">تسليمات</div>
                  </div>

                  <div className="text-center">
                    <div 
                      className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
                      style={{
                        boxShadow: '0 4px 14px rgba(77, 175, 239, 0.4)'
                      }}
                    >
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">98%</div>
                    <div className="text-sm md:text-base text-gray-600">رضا</div>
                  </div>

                  <div className="text-center">
                    <div 
                      className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
                      style={{
                        boxShadow: '0 4px 14px rgba(77, 175, 239, 0.4)'
                      }}
                    >
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24h</div>
                    <div className="text-sm md:text-base text-gray-600">خدمة سريعة</div>
                  </div>
                </div>

                <div className="mt-8 flex justify-center">
                  <CTAButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionMargin>
    </SectionWrapper>
  );
};

export default OurComitements;

// import React, { useState } from "react";
// import {
//   Clock,
//   Truck,
//   Calendar,
//   Zap,
//   DollarSign,
//   ShieldCheck,
//   Play,
// } from "lucide-react";
// import { BigTitle, Title1 } from "@/user/components/common/Titles";
// import SectionWrapper from "../SectionWrapper";
// import SectionMargin from "../SectionMargin";

// interface InfoItem {
//   icon: React.ReactNode;
//   text: string;
// }

// const OurComitements: React.FC = () => {
//   const [showVideo, setShowVideo] = useState(false);

//   const infoItems: InfoItem[] = [
//     {
//       icon: <Clock className="w-5 h-5" />,
//       text: "Collecte & livraison de 9h à 21h",
//     },
//     {
//       icon: <Truck className="w-5 h-5" />,
//       text: "Service gratuit à domicile",
//     },
//     {
//       icon: <Calendar className="w-5 h-5" />,
//       text: "Disponible 7j/7",
//     },
//     {
//       icon: <Zap className="w-5 h-5" />,
//       text: "Service express en moins de 24h",
//     },
//     {
//       icon: <DollarSign className="w-5 h-5" />,
//       text: "Tarifs transparents et attractifs",
//     },
//     {
//       icon: <ShieldCheck className="w-5 h-5" />,
//       text: "Qualité professionnelle garantie",
//     },
//   ];

//   return (
//     <SectionWrapper>
//       <SectionMargin>
//         <div className=" bg-white mt-16 pt-16 pb-16">
//           <div className="max-w-6xl ml-6 ">
//             <div className="flex flex-col md:flex-row  justify-between  items-center">
//               {/* Left Section - Title */}
//               <div className="flex title-animate col-span-1 md:mb-0 mb-3 justify-start">
//                 <BigTitle>
//                   <h1 className="font-bold text-center text-gray-900 leading-tight">
//                     Votre premier
//                     <br />
//                     nettoyage
//                     <br />
//                     <span className="text-primary">essentiels.</span>
//                   </h1>
//                 </BigTitle>
//               </div>

//               {/* Right Section - Info Items */}
//               <div className="space-y-6 col-span-1 flex flex-col">
//                 {infoItems.map((item, index) => (
//                   <div key={index} className="flex items-start card-animate gap-7">
//                     <div className="flex-shrink-0 sm:w-12 sm:h-12 w-8 h-8 rounded-full bg-primary-transparent flex items-center justify-center text-white">
//                       {item.icon}
//                     </div>
//                     <p
//                       style={{ letterSpacing: "2px" }}
//                       className="text-gray-700 text-lg pt-2"
//                     >
//                       {item.text}
//                     </p>
//                   </div>
//                 ))}

//                 {/* Video Section */}
//                 {/* <div className="mt-8">
//               <div
//                 className="bg-teal-900 rounded-2xl p-6 flex items-center gap-4 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
//                 onClick={() => setShowVideo(!showVideo)}
//               >
//                 <div className="flex-shrink-0">
//                   <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-colors">
//                     <Play className="w-8 h-8 text-white ml-1" fill="white" />
//                   </div>
//                 </div>
//                 <div className="text-white">
//                   <h3 className="font-semibold text-lg mb-1">
//                     À quoi s'attendre lors de votre premier nettoyage
//                   </h3>
//                   <p className="text-teal-200 text-sm">
//                     Nous vous expliquons tout, de la collecte à la livraison.
//                   </p>
//                 </div>
//               </div>
//             </div> */}

//                 {/* Video Modal/Placeholder */}
//                 {/* {showVideo && (
//               <div className="mt-4 bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
//                 <div className="aspect-video bg-gradient-to-br from-teal-900 to-teal-700 flex items-center justify-center">
//                   <p className="text-white text-lg">Vidéo de présentation</p>
//                 </div>
//               </div>
//             )} */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </SectionMargin>
//     </SectionWrapper>
//   );
// };

// export default OurComitements;
