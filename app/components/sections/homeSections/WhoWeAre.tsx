import React from "react";
import Image from "next/image";
import SectionWrapper from "@/app/components/common/SectionWrapper";
import SectionMargin from "@/app/components/common/SectionMargin";
import { CardHeading } from "@/app/components/common/Titles";
import { MessageCircle, Puzzle, Target, Sprout, Factory } from "lucide-react";

const whoWeAre = [
  {
    title: "À l'écoute de vos besoins",
    description:
      "Nous plaçons vos attentes au cœur de notre service, avec une équipe disponible et attentive pour répondre à chacune de vos demandes.",
  },
  {
    title: "Des solutions sur mesure",
    description:
      "Chaque vêtement est unique. Nous adaptons nos techniques de nettoyage pour offrir un traitement personnalisé et optimal.",
  },
  {
    title: "Un engagement qualité",
    description:
      "Nous visons l'excellence à chaque étape, du ramassage à la livraison, pour garantir votre entière satisfaction.",
  },
  {
    title: "Respect de l'environnement",
    description:
      "Nous utilisons des produits écologiques et des procédés respectueux de l'environnement pour un nettoyage responsable.",
  },
  {
    title: "Un savoir-faire artisanal",
    description:
      "Fort de notre expérience, nous allions tradition et modernité pour prendre soin de vos textiles avec le plus grand professionnalisme.",
  },
];

const icons = [
  { icon: <MessageCircle /> },
  { icon: <Puzzle /> },
  { icon: <Target /> },
  { icon: <Sprout /> },
  { icon: <Factory /> },
];

const WhoWeAre: React.FC = () => {
  return (
    <SectionWrapper>
      <SectionMargin>
        <div className="max-w-6xl ml-6 pt-8 pb-16">
          {/* Sections Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Sticky Image */}
            <div className="md:col-span-1 sticky w-full h-[200px] col-span-2 top-[200px] ml-0">
              <Image
                className="sticky min-h-2 mt-6 rounded-2xl"
                src="https://images.unsplash.com/photo-1604335398980-ededcadcc37d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2340"
                alt="Sticky"
                width={2340}
                height={1560}
              />
            </div>

            {/* Scrollable Content */}
            <div className="space-y-8">
              {whoWeAre.map((section, index) => (
                <div key={index} className="flex gap-2">
                  <div className="text-primary p-3 border-2 max-h-max rounded-xl border-primary">
                    {icons[index].icon}
                  </div>
                  <div className="title-animate text-left">
                    <CardHeading className="mb-3">
                      {section.title}
                    </CardHeading>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {section.description}
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

export default WhoWeAre;
