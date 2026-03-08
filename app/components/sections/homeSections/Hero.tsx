import SectionWrapper from "@/app/components/common/SectionWrapper";
import CTAButton from "@/app/components/common/CTAButton";
import SectionBadge from "@/app/components/common/SectionBadge";
import WhatsAppButton from "@/app/components/common/WhatsAppButton";
import { Section } from "lucide-react";
import SectionMargin from "@/app/components/common/SectionMargin";

const Hero = () => {
  return (
    <SectionWrapper className="relative min-h-[80vh] p-0 overflow-hidden">
      <SectionMargin>
      {/* Background image */}
      <div
        className="sm:block hidden absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url(/images/laundry-tanger.avif)",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          zIndex: 0,
        }}
      />

      <div
        className="absolute sm:hidden inset-0 w-full h-full"
        style={{
          backgroundImage: "url(/images/laundry-tanger.avif)",
          backgroundSize: "cover",
          backgroundPosition: "-365px top",
          backgroundRepeat: "no-repeat",
          zIndex: 0,
        }}
      />

      {/* Multi-layer gradient overlay for depth */}
      <div className="absolute inset-0 z-10"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.88) 40%, rgba(77,175,239,0.12) 70%, rgba(30,58,95,0.08) 100%)"
        }}
      />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-10"
        style={{ background: "linear-gradient(to top, rgba(255,255,255,1), transparent)" }}
      />

      {/* Decorative blur circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20 blur-3xl z-10"
        style={{ background: "radial-gradient(circle, #4dafef 0%, transparent 70%)" }}
      />
      <div className="absolute -bottom-12 -left-12 w-72 h-72 rounded-full opacity-15 blur-3xl z-10"
        style={{ background: "radial-gradient(circle, #1e3a5f 0%, transparent 70%)" }}
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-center min-h-[70vh] ">

        <div className="max-w-full animate-fade-in-up sm:text-left text-center">

          {/* Badge */}
          {/* <div className="mb-6">
            <SectionBadge text="Blanchisserie N°1" highlightText="Tanger" />
          </div> */}

          {/* Urgency strip */}
          {/* <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/30 rounded-full px-4 py-2 mb-6 animate-glow-pulse">
            <span className="w-2 h-2 rounded-full bg-secondary animate-ping inline-block"></span>
            <span className="text-secondary font-semibold text-sm">Livraison en moins de 24h • Collecte GRATUITE</span>
          </div> */}

          {/* Headline */}
          <div className="mb-6 space-y-1">
            <h1 className="text-4xl md:text-[58px]  font-extrabold leading-tight tracking-tight text-tertiary uppercase">
              Nous prenons{" "}
              <span className="relative inline-block">
                le linge.
                <span className="absolute -bottom-1 left-0 right-0 h-1 rounded-full bg-primary/50"></span>
              </span>
            </h1>
            <h1 className="text-4xl md:text-[58px] font-extrabold leading-tight tracking-tight text-primary uppercase">
              Vous prenez le temps.
            </h1>
          </div>

          <p className="text-lg  md:text-xl text-tertiary/70 mb-8 font-medium max-w-lg">
            Le pressing à domicile ou au bureau — collecte, nettoyage et livraison en{" "}
            <span className="text-tertiary font-bold">3 clics</span>.
          </p>

          {/* CTA group — last on mobile */}
          <div className="flex flex-col sm:items-start items-center sm:flex-row gap-3 mt-8  sm:order-none order-last">
            <CTAButton />
            <WhatsAppButton />
          </div>
        </div>

        
      </div>
      </SectionMargin>
    </SectionWrapper>
  );
};

export default Hero;
