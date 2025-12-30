import { Heart, Leaf, Truck, Zap } from "lucide-react";
import CTAButton from "@/app/components/common/CTAButton";
import SectionBadgqe from "@/app/components/common/SectionBadge";
import WhatsAppButton from "@/app/components/common/WhatsAppButton";
import SectionWrapper from "@/app/components/common/SectionWrapper";
import SectionMargin from "@/app/components/common/SectionMargin";

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

      <SectionWrapper>
          <SectionMargin>
          <div className="grid grid-cols-1 lg:my-[80px] my-[50px] lg:grid-cols-2 lg:gap-16 gap-8 items-center">
        <div
        className=" w-full lg:sticky lg:top-28 self-start space-y-5 pt-10 md:pt-20"
      
      >
        <div className="mb-6 sm:block flex justify-center">
          <SectionBadgqe text="À propos" />
        </div>
        <div className="flex items-center justify-center sm:justify-start space-x-3">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-tertiary text-center lg:text-left"
            
          >
            Qui <span className="text-primary font-extrabold">sommes-nous&nbsp;?</span>
          </h1>
        </div>

        <p
          className="text-gray-600 text-base sm:text-lg max-w-md mx-auto lg:mx-0 text-center lg:text-left"
        
        >
          Laundry.ma – Votre partenaire de confiance pour un linge impeccable,
          propre et livré avec soin.
        </p>

        <div className="mt-6 md:mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
          <CTAButton />
          <WhatsAppButton />
        </div>
      </div>

      {/* RIGHT SCROLLABLE SECTION */}
      <div
        className=" w-full mt-12 lg:mt-0 space-y-12 md:space-y-16 lg:h-[150vh] overflow-y-auto no-scrollbar px-2"
      >
        <div
          className="rounded-2xl overflow-hidden shadow-lg"
          
        >
          <img
            src="/images/laundry.avif"
            alt="Équipe Laundry.ma en action"
            className="w-full h-[220px] sm:h-[280px] md:h-[350px] lg:h-[400px] object-cover"
            loading="lazy"
          />
        </div>

        <div className="space-y-10 md:space-y-14">
          {values.map((v, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-start sm:space-x-6 text-center sm:text-left"
             
            >
              <div className="p-3  bg-primary sm:mr-3 rounded-full flex justify-center sm:flex-shrink-0 mx-auto sm:mx-0 mb-4 sm:mb-0">
                {v.icon}
              </div>
              <div className="flex-1 pl-2">
                <h3 className="text-lg  sm:text-xl font-semibold text-tertiary mb-3">
                  {v.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base sm:px-2 sm:px-0 leading-relaxed">
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
}

export default AboutUsSection;
