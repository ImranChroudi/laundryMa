import {
  Clock,
  Truck,
  Calendar,
  Zap,
  DollarSign,
  ShieldCheck,
} from "lucide-react";
import SectionBadge from "@/app/components/common/SectionBadge";
import SectionWrapper from "@/app/components/common/SectionWrapper";
import SectionMargin from "@/app/components/common/SectionMargin";
import SpanText from "@/app/components/common/SpanText";

interface InfoItem {
  icon: React.ReactNode;
  text: string;
  highlight: string;
}

const OurComitements = () => {

  const infoItems: InfoItem[] = [
    { icon: <Clock className="w-6 h-6" />, text: "Collecte & livraison de", highlight: "9h à 21h" },
    { icon: <Truck className="w-6 h-6" />, text: "Service gratuit", highlight: "à domicile" },
    { icon: <Calendar className="w-6 h-6" />, text: "Disponible", highlight: "7j/7" },
    { icon: <Zap className="w-6 h-6" />, text: "Service express en", highlight: "moins de 24h" },
    { icon: <DollarSign className="w-6 h-6" />, text: "Tarifs transparents", highlight: "et attractifs" },
    { icon: <ShieldCheck className="w-6 h-6" />, text: "Qualité professionnelle", highlight: "garantie" },
  ];

  return (
    <SectionWrapper className="py-20 md:py-28 relative overflow-hidden">
      {/* Light gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-50 via-indigo-50/60 to-sky-50" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 right-0 w-120 h-120 bg-sky-300/15 rounded-full blur-3xl translate-x-1/4 translate-y-1/4" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-160 h-160 bg-violet-200/10 rounded-full blur-3xl" />
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'radial-gradient(circle, #3B82F6 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <SectionMargin>
        <div className="max-w-7xl mx-auto relative z-10">
          {/* --- Layout --- */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-20">
            {/* --- Title (Left) --- */}
            <div className="flex flex-col justify-start md:mb-0 mb-4 lg:max-w-sm">
              <div className="mb-5">
                <SectionBadge text="Nos" highlightText="Engagements" />
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-tertiary leading-tight mb-4">
                Votre linge,{" "}
                <SpanText text="notre" className="" />
                <br />priorité.
              </h2>
              <p className="text-gray-500 text-base leading-relaxed">
                Des engagements concrets pour un service à la hauteur de vos attentes — chaque commande, chaque jour.
              </p>
            </div>

            {/* --- Commitments Grid (Right) --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
              {infoItems.map((item, index) => (
                <div
                  key={index}
                  className="group relative flex items-center gap-4 p-5 rounded-2xl bg-white/80 backdrop-blur-sm border border-white shadow-sm transition-all duration-300 hover:bg-white hover:border-primary/20 hover:shadow-lg hover:shadow-primary/8 hover:-translate-y-0.5 cursor-default overflow-hidden"
                >
                  {/* Subtle gradient accent on hover */}
                  <div className="absolute inset-0 bg-linear-to-br from-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative shrink-0 w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary flex items-center justify-center text-primary group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:shadow-primary/20">
                    {item.icon}
                  </div>
                  <div className="relative">
                    <p className="text-gray-800 text-sm font-semibold leading-snug">
                      {item.text}{" "}
                      <span className="text-primary font-bold">{item.highlight}</span>
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

export default OurComitements;
