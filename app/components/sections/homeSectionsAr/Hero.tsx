import SectionWrapper from "@/app/components/common/SectionWrapper";
import CTAButton from "@/app/components/common/CTAButton";
import SectionBadge from "@/app/components/common/SectionBadge";
import WhatsAppButton from "@/app/components/common/WhatsAppButton";

const Hero = () => {
  return (
    <SectionWrapper className="relative h-[90vh] p-0">
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/images/laundry-tanger-arabe.avif)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0
        }}
      />
      {/* Overlay with transparent primary background */}
      <div className="flex items-center justify-center relative overflow-hidden z-10">
        {/* Overlay */}
        <div className="z-20 py-[130px] relative w-full">
          {/* Text section */}
          <div className="flex justify-start">
            <div className=" title-animate  ">
              <h1 className="mb-6">
                <SectionBadge text="الغسيل" highlightText="طنجة" />
              </h1>

              <div className="mb-6">
               
                <p className="text-2xl uppercase md:text-[54px] font-bold text-tertiary">
                    نحن نأخذ الغسيل.
                </p>
                <p className="text-2xl uppercase md:text-[54px] font-bold text-primary">
                  أنت تأخذ الوقت.
                </p>
                <p className="text-base md:text-[28px] text-tertiary/80 mt-4">
                اطلب التنظيف الجاف إلى منزلك أو مكتبك بثلاث نقرات!
                </p>
              </div>

              <div className="flex flex-wrap gap-3"></div>
              <div className="flex flex-col gap-3 max-w-max justify-center sm:justify-start">
                  <CTAButton />
                  <WhatsAppButton />
              </div>
            </div>
          </div>
        </div>
      
      </div>
    </SectionWrapper>
  );
};

export default Hero;