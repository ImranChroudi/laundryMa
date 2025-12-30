import SectionWrapper from "@/app/components/common/SectionWrapper";
import CTAButton from "@/app/components/common/CTAButton";
import SectionBadge from "@/app/components/common/SectionBadge";
import WhatsAppButton from "@/app/components/common/WhatsAppButton";
import Image from "next/image";

const Hero = () => {
  return (
    <SectionWrapper className="relative h-[90vh] p-0">
        
     
        {/* <div className="absolute inset-0 z-20 bg-black/40"></div> */}

      <div
        className="absolute inset-0  w-full h-full"
        style={{
          backgroundImage: "url(/images/laundry-tanger.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 0,
        }}
      />
      {/* Overlay with transparent primary background */}
      <div className="flex items-center justify-center relative overflow-hidden z-0">
        {/* Overlay */}
        <div className="z-20 py-[130px] relative w-full">
          {/* Text section */}
          <div className="">
            <div className="sm:mr-auto  place-self-center  text-center sm:text-left">
              <h1 className="mb-6">
                <SectionBadge text="Blanchisserie" highlightText="Tanger" />
              </h1>

              <div className="mb-6">
                <p className="text-4xl uppercase md:text-[54px] font-bold text-tertiary">
                  Nous prenons le linge.
                </p>
                <p className="text-4xl uppercase md:text-[54px] font-bold text-primary">
                  Vous prenez le temps.
                </p>
                <p className="text-[24px] md:text-[28px] text-tertiary/80 mt-4">
                  LE PRESSING À DOMICILE OU <br />
                  AU BUREAU EN 3 CLICS !
                </p>
              </div>

              <div className="flex flex-wrap gap-3"></div>
              <div className="flex flex-col md:mx-0 mx-auto  gap-3 max-w-max justify-center sm:justify-start">
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
