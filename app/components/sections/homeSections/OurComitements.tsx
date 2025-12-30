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

const OurComitements = () => {

  const infoItems = [
    { icon: <Clock className="w-5 h-5" />, text: "Collecte & livraison de 9h à 21h" },
    { icon: <Truck className="w-5 h-5" />, text: "Service gratuit à domicile" },
    { icon: <Calendar className="w-5 h-5" />, text: "Disponible 7j/7" },
    { icon: <Zap className="w-5 h-5" />, text: "Service express en moins de 24h" },
    { icon: <DollarSign className="w-5 h-5" />, text: "Tarifs transparents et attractifs" },
    { icon: <ShieldCheck className="w-5 h-5" />, text: "Qualité professionnelle garantie" },
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
                  <SectionBadge text="Nos" highlightText="Engagements" />
                </div>
                <BigTitle>
                  <h1 className="font-light text-left text-tertiary leading-tight">
                    
                        Votre premier
                        <br />
                        nettoyage
                        <br />
                        <span className="text-primary font-extrabold">essentiels.</span>
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
                      className="text-gray-700 text-lg pt-2"
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
                   
                      <>
                        Nos <span className="text-primary">chiffres</span>
                      </>
                  
                  </h2>
                  <p className="text-gray-600 text-sm md:text-base">
                    Our confidence measured by results
                    
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
                    <div className="text-sm md:text-base text-gray-600">Clients satisfaits</div>
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
                    <div className="text-sm md:text-base text-gray-600">Livraisons</div>
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
                    <div className="text-sm md:text-base text-gray-600">Satisfaction</div>
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
                    <div className="text-sm md:text-base text-gray-600">Service express</div>
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
