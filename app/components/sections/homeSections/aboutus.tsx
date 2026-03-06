import { Heart, Leaf, Truck, Zap } from "lucide-react";
import CTAButton from "@/app/components/common/CTAButton";
import SectionBadgqe from "@/app/components/common/SectionBadge";
import WhatsAppButton from "@/app/components/common/WhatsAppButton";
import SectionWrapper from "@/app/components/common/SectionWrapper";
import SectionMargin from "@/app/components/common/SectionMargin";
import Image from "next/image";
import SpanText from "@/app/components/common/SpanText";

const AboutUsSection: React.FC = () => {
  // Parallax image movement

  const values = [
    {
      icon: <Heart className="text-white" size={28} />,
      title: "Une expérience simple et agréable",
      text: "Chez Laundry.ma, nous transformons la corvée du linge en une expérience simple, rapide et agréable. Notre mission : vous libérer du stress du pressing tout en garantissant un résultat impeccable, respectueux de vos vêtements et de l'environnement.",
    },
    {
      icon: <Leaf className="text-white" size={28} />,
      title: "Un soin professionnel et écologique",
      text: "Experts en teinturerie et nettoyage professionnel, nous prenons soin de vos pièces les plus délicates — soie, cachemire, alpaga ou lin — avec la même exigence que si c'étaient les nôtres. Nous traitons également vos articles de literie, tapis et canapés avec des produits écologiques et doux pour les fibres.",
    },
    {
      icon: <Truck className="text-white" size={28} />,
      title: "Service pratique et flexible",
      text: "Avec Laundry.ma, fini les déplacements et les longues attentes : nous venons à vous, quand vous voulez. Votre linge est pris en charge et livré selon vos besoins, avec soin et ponctualité.",
    },
    {
      icon: <Zap className="text-white" size={28} />,
      title: "Nettoyage EXPRESS",
      text: "Créneau horaire de 30 min, pressing et linge au kilo livré en moins de 24 heures. Service rapide et fiable pour vos besoins urgents.",
    },
  ];

  return (
    <SectionWrapper className="py-20 md:py-28 bg-white">
      <SectionMargin>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start max-w-7xl mx-auto">

          {/* LEFT — sticky pitch */}
          <div className="w-full lg:sticky text-center lg:top-28 self-start space-y-6">
            <div className="flex">
              <SectionBadgqe text="À propos" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-tertiary leading-tight">
              Qui{" "}
              <SpanText text="sommes-nous" className="" />
              &nbsp;?
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed max-w-md">
              Laundry.ma — votre partenaire de confiance pour un linge impeccable,
              collecté et livré avec soin, directement chez vous.
            </p>

            <div className="hidden lg:flex flex-wrap gap-3 pt-2">
              <CTAButton />
              <WhatsAppButton />
            </div>
          </div>

          {/* RIGHT — scrollable content */}
          <div className="w-full space-y-8">
            {/* Hero image */}
            <div className="rounded-sm overflow-hidden shadow-xl" style={{ boxShadow: '0 20px 50px rgba(77,175,239,0.15)' }}>
              <Image
                src="/images/laundry.avif"
                alt="Équipe Laundry.ma en action"
                className="w-full h-[260px] sm:h-[320px] md:h-[380px] object-cover"
                loading="lazy"
                width={800}
                height={380}
              />
            </div>

            {/* Values */}
            <div className="space-y-5">
              {values.map((v, index) => (
                <div
                  key={index}
                  className="flex sm:flex-row flex-col items-start gap-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200"
                >
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-primary flex items-center justify-center shadow-sm" style={{ boxShadow: '0 4px 12px rgba(77,175,239,0.3)' }}>
                    {v.icon}
                  </div>
                  <div>
                    <h3 className="sm:text-base text-2xl mr-2 font-bold text-tertiary mb-1">{v.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{v.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA group — last on mobile */}
            <div className="flex flex-wrap gap-3 pt-4 lg:hidden">
              <CTAButton />
              <WhatsAppButton />
            </div>
          </div>
        </div>
      </SectionMargin>
    </SectionWrapper>
  );
}

export default AboutUsSection;
