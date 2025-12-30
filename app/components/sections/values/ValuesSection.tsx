'use client'
import React from 'react';
import SectionWrapper from '@/app/components/common/SectionWrapper';
import SectionMargin from '@/app/components/common/SectionMargin';
import SectionBadge from '@/app/components/common/SectionBadge';

interface Value {
  title: string;
  description: string;
  bgColor: 'primary' | 'secondary';
  image: string;
}

const ValuesSection: React.FC = () => {
  const values: Value[] = [
    {
      title: " Rapidité & Fiabilité",
      description: "Nous savons que votre temps est précieux : collecte et livraison rapides, service express disponible.",
      bgColor: 'primary',
      image: '/images/rapidite.png',
    },
    {
      title: "La Qualité",
      description: "Laundry.ma garantit un nettoyage impressionnant et une finition minutieuse de tous les textiles, même les plus délicats.",
      bgColor: 'secondary',
      image: '/images/quality.png',
    },
    {
      title: "Innovation",
      description: "Expert en Aquanettoyage, Laundry.ma propose une gamme de services innovants et personnalisés pour répondre aux besoins les plus particuliers.",
      bgColor: 'secondary',
      image: '/images/innovation.png',
    },
    {
      title: "Responsabilité",
      description: "Nous utilisons des produits 100% écologiques certifiés, respectueuse de l'environnement et de la santé de nos clients et nos employés",
      bgColor: 'primary',
      image: '/images/responsabilite.png',
    },
    {
      title: "Confiance & Transparence",
      description: "Nous mettons un point d’honneur à respecter vos objets et à vous proposer des prix clairs et transparents.",
      bgColor: 'secondary',
      image: '/images/rapidite.png',
    },
  ];

  return (
    <SectionWrapper className="py-16 md:py-24 bg-white">
      <SectionMargin>
        <div className="max-w-7xl mx-auto">
          {/* Header with Badge and Title */}
          <div className="text-center mb-16">
            <div className="mb-6 flex justify-center">
              <SectionBadge text="Nos" highlightText="valeurs" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-tertiary mb-4">
              Ce qui nous{' '}
              <span className="text-primary">distingue</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Des valeurs fortes qui guident notre engagement envers l'excellence et la satisfaction client
            </p>
          </div>

          {/* Values Grid */}
          <div className="space-y-6 md:space-y-8">
            {values.map((value, index) => {
              const isEven = index % 2 === 0;
              const isImageLeft = isEven;
              
              return (
                <div
                  key={index}
                  className={`rounded-xl overflow-hidden flex flex-col md:flex-row transition-all duration-300 hover:shadow-2xl ${
                    value.bgColor === 'primary' ? 'bg-primary' : 'bg-secondary'
                  }`}
                  style={{
                    boxShadow: '0 10px 25px rgba(77, 175, 239, 0.15)'
                  }}
                >
                  {/* Image Section */}
                  <div className={`w-full md:w-1/2 ${isImageLeft ? 'order-1' : 'order-2'}`}>
                    <div
                      className="w-full h-full min-h-[300px] md:min-h-[400px]"
                      style={{
                        backgroundImage: `url(${value.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                      }}
                    />
                  </div>
                  
                  {/* Text Section */}
                  <div className={`w-full md:w-1/2 p-8 md:p-12 text-white flex flex-col justify-center ${
                    isImageLeft ? 'order-2' : 'order-1'
                  }`}>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                      {value.title}
                    </h3>
                    <p className="text-lg md:text-xl leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </SectionMargin>
    </SectionWrapper>
  );
};

export default ValuesSection;

