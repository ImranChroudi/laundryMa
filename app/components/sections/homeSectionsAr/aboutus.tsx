import { Heart, Leaf, Truck, Zap } from "lucide-react";
import CTAButton from "@/app/components/common/CTAButton";
import SectionBadgqe from "@/app/components/common/SectionBadge";
import WhatsAppButton from "@/app/components/common/WhatsAppButton";
import SectionWrapper from "@/app/components/common/SectionWrapper";
import SectionMargin from "@/app/components/common/SectionMargin";
import Image from "next/image";

const AboutUsSection: React.FC = () => {
  // Parallax image movement

  const values = [
    {
      icon: <Heart className="text-white" size={28} />,
      title: "تجربة بسيطة وممتعة",
      text: "في Laundry.ma، نحول مهمة غسل الملابس إلى تجربة بسيطة وسريعة وممتعة. مهمتنا: تحريركم من ضغط المغسلة مع ضمان نتيجة مثالية تحترم ملابسكم والبيئة.",
    },
    {
      icon: <Leaf className="text-white" size={28} />,
      title: "عناية احترافية وبيئية",
      text: "باعتبارنا خبراء في التنظيف والغسيل الاحترافي، نعتني بملابسكم الأكثر حساسية — مثل الحرير، الكشمير، الألبكة أو الكتان — بنفس الدقة كما لو كانت ملكنا. كما نعالج أغطية الأسرة، السجاد والأرائك بمواد صديقة للبيئة ولطيفة على الألياف.",
    },
    {
      icon: <Truck className="text-white" size={28} />,
      title: "خدمة عملية ومرنة",
      text: "مع Laundry.ma، وداعًا للتنقل والانتظار الطويل: نحن نأتي إليكم في الوقت الذي يناسبكم. يتم استلام ملابسكم وتسليمها حسب احتياجاتكم، بعناية ودقة في المواعيد.",
    },
    {
      icon: <Zap className="text-white" size={28} />,
      title: "تنظيف سريع",
      text: "موعد 30 دقيقة، الغسيل والكي حسب الوزن وتسليم أقل من 24 ساعة. خدمة سريعة وموثوقة لتلبية احتياجاتكم العاجلة.",
    },
  ];

  return (
    <SectionWrapper>
      <SectionMargin>
        <div className="grid grid-cols-1 lg:my-[80px] my-[50px] lg:grid-cols-2 lg:gap-16 gap-8 items-center">
          <div className=" w-full lg:sticky lg:top-28 self-start space-y-5 pt-10 md:pt-20">
            <div className="mb-6 sm:block flex justify-center">
              <SectionBadgqe text="حول" />
            </div>
            <div className="flex items-center space-x-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-tertiary text-center lg:text-left">
                 من{" "}
                <span className="text-primary font-extrabold">
                  نحن؟
                </span>
              </h1>
            </div>

            <p className="text-gray-600 text-base sm:text-lg max-w-md mx-auto lg:mx-0 text-center lg:text-right">
                Laundry.ma – شريكك الموثوق به للحصول على غسيل لا تشوبه شائبة، نظيف ومُسلم بعناية.
            </p>

            <div className="mt-6 md:mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
              <CTAButton />
              <WhatsAppButton />
            </div>
          </div>

          {/* RIGHT SCROLLABLE SECTION */}
          <div className=" w-full mt-12 lg:mt-0 space-y-12 md:space-y-16 lg:h-[150vh] overflow-y-auto no-scrollbar px-2">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/laundry.avif"
                alt="Équipe Laundry.ma en action"
                className="w-full h-[220px] sm:h-[280px] md:h-[350px] lg:h-[400px] object-cover"
                loading="lazy"
                width={1000}
                height={1000}
              />
            </div>

            <div className="space-y-10 md:space-y-14">
              {values.map((v, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-start sm:space-x-6 text-center sm:text-left"
                >
                  <div className="p-3 bg-primary  rounded-full flex justify-center sm:flex-shrink-0 ml-3 mb-4 sm:mb-0">
                    {v.icon}
                  </div>
                  <div className="flex-1 pl-2">
                    <h3 className="text-lg sm:text-xl font-semibold text-right text-tertiary mb-3">
                      {v.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base px-2 sm:px-0 leading-relaxed text-right">
                      {v.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionMargin>
    </SectionWrapper>
  );
};

export default AboutUsSection;
