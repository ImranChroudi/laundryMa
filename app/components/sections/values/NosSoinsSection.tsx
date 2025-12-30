'use client'
import React from 'react';
import SectionWrapper from '@/app/components/common/SectionWrapper';
import SectionMargin from '@/app/components/common/SectionMargin';
import SectionBadge from '@/app/components/common/SectionBadge';
import CTAButton from '@/app/components/common/CTAButton';
import { 
  Sparkles, 
  Shirt, 
  Umbrella, 
  Star, 
  Scissors,
  Droplet
} from 'lucide-react';

export default function NosSoinsSection() {
  const services = [
    {
      icon: <Droplet className="w-12 h-12 text-white" />,
      iconBg: "bg-red-500",
      title: "Désinfection",
      description: "Traitement de nettoyage vert efficace pour éliminer les germes et les bactéries. Offre un traitement en profondeur pour les articles nécessitant une hygiène particulière, tels que les couettes, la literie et les vêtements d'enfants."
    },
    {
      icon: <Sparkles className="w-12 h-12 text-white" />,
      iconBg: "bg-gray-800",
      title: "Super blanc",
      description: "Processus de blanchiment écologique utilisant un agent oxygéné sans chlore ni odeur. Traite le grisonnement ou le jaunissement causé par le lavage, l'utilisation et les UV, redonnant de la jeunesse aux vieux articles blancs et éliminant les taches de teinture."
    },
    {
      icon: <Shirt className="w-12 h-12 text-white" />,
      iconBg: "bg-blue-500",
      title: "Apprêt",
      description: "Technologie de nettoyage qui applique un film fin sur les vêtements pour améliorer leur maintien et leur forme. Les nettoyeurs verts appliquent cette finition pour restaurer le maintien initial et la souplesse, en utilisant un produit 100% écologique efficace sur les fibres naturelles comme le lin ou le coton."
    },
    {
      icon: <Umbrella className="w-12 h-12 text-white" />,
      iconBg: "bg-yellow-400",
      title: "Imperméabilisation",
      description: "Film fin appliqué par les nettoyeurs verts sur les vêtements (comme les manteaux) pour améliorer la résistance à la pluie légère et à la neige. Le coefficient d'imperméabilisation initial diminue avec l'utilisation quotidienne et les nettoyages à sec successifs, et ce traitement aide à le restaurer ou à offrir une imperméabilisation temporaire aux articles qui n'étaient pas initialement imperméables."
    },
    {
      icon: <Star className="w-12 h-12 text-white" />,
      iconBg: "bg-gray-500",
      title: "Maxima",
      description: "Processus innovant pour traiter toutes les fibres, en particulier les délicates, avec douceur et efficacité. Confiez-nous vos articles exceptionnels, Maxima ravive les blancs et les couleurs, et restaure la beauté, la fraîcheur et la souplesse des fibres."
    },
    {
      icon: <Scissors className="w-12 h-12 text-white" />,
      iconBg: "bg-red-400",
      title: "Couture",
      description: "The Quick Laundry va plus loin dans le soin des vêtements en offrant des solutions de retouche pour embellir, réparer ou adapter les articles aux mesures. Services incluant : ourlets, ajustements de toutes sortes, réparations, fermetures, boutons et couture générale."
    }
  ];

  return (
    <>
      {/* Introduction Section */}
      

      {/* Services Grid */}
      <SectionWrapper className="py-16 md:py-24 bg-gray-50">
        <SectionMargin>
            <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="mb-6 flex justify-center">
                <SectionBadge text="Nos" highlightText="soins" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-tertiary mb-4">
                Découvrez nos soins &{' '}
                <span className="text-primary">services</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Nous offrons des soins et services experts pour restaurer et prolonger la vie de vos vêtements et textiles, 
                offrant des solutions pour tous vos besoins et types de textiles.
              </p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    boxShadow: '0 10px 25px rgba(77, 175, 239, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(77, 175, 239, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(77, 175, 239, 0.2)';
                  }}
                >
                  <div className="flex items-start gap-6">
                    {/* Icon */}
                    <div className={`${service.iconBg} rounded-full p-4 flex-shrink-0`}>
                      {service.icon}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-tertiary mb-4">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionMargin>
      </SectionWrapper>

      {/* CTA Section */}
      <SectionWrapper className="py-16 md:py-24 bg-primary/5">
        <SectionMargin>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-tertiary mb-4">
              Prêt à prendre soin de vos vêtements ?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Découvrez nos services de soins professionnels et bénéficiez d'un traitement de qualité pour tous vos textiles
            </p>
            <CTAButton text="Demander une ramassage" href="/checkout" />
          </div>
        </SectionMargin>
      </SectionWrapper>
    </>
  );
}







