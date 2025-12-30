import React, { useState } from "react";
import {
  Sparkles,
  MessageSquare,
  MapPin,
  Cpu,
  Heart,
  Users,
} from "lucide-react";
import { useAuth } from "@/context/AdminProvider";
import SectionWrapper from "../SectionWrapper";
import SectionMargin from "../SectionMargin";
import { CardHeading } from "@/user/components/common/Titles";
import { MessageCircle, Puzzle, Target, Sprout, Factory } from "lucide-react";



const WhoWeAre: React.FC = () => {
  const [language, setLanguage] = useState<"fr" | "ar">("fr");
  const { t } = useAuth();

  const whoWeAre = t("whoWeAre.sections", { returnObjects: true }) as {
    title: string;
    description: string;
  }[];

  const icons = [
  { icon: <MessageCircle /> },
  { icon: <Puzzle /> },
  { icon: <Target /> },
  { icon: <Sprout /> },
  { icon: <Factory /> },
];



  const renderIcon = (iconType: string) => {
    const iconClass = "w-full h-full";

    switch (iconType) {
      case "bookmark":
        return (
          <svg viewBox="0 0 100 100" className={iconClass} fill="currentColor">
            <path d="M25 10 L75 10 C77 10 80 12 80 15 L80 95 L50 75 L20 95 L20 15 C20 12 22 10 25 10 Z" />
          </svg>
        );
      case "users":
        return <Users className={iconClass} />;
      case "heart":
        return <Heart className={iconClass} fill="currentColor" />;
      case "leaf":
        return (
          <svg viewBox="0 0 100 100" className={iconClass} fill="currentColor">
            <path d="M50 10 Q80 20 85 50 Q80 70 60 80 L50 95 Q45 85 42 80 Q30 70 25 50 Q30 25 50 10 M45 30 Q35 40 35 50 Q40 60 50 65" />
          </svg>
        );
      case "home":
        return (
          <svg viewBox="0 0 100 100" className={iconClass} fill="currentColor">
            <path d="M50 15 L85 45 L85 85 L60 85 L60 60 L40 60 L40 85 L15 85 L15 45 Z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (

   
    <SectionWrapper>
      
      <SectionMargin>
            

        <div className="max-w-6xl ml-6  pt-8 pb-16">
          {/* About Section */}
          <div
            className={`mb-20 ${
              language === "ar" ? "text-right" : "text-left"
            }`}
            dir={language === "ar" ? "rtl" : "ltr"}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8"></h1>
            {/* <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-4">
            {currentContent.aboutText.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div> */}
          </div>

          


          {/* Sections Grid */}
          <div className="grid md:grid-cols-2 gap-8 ">
            {/* Sticky Image */}
            <div className="md:col-span-1 sticky w-full h-[200px] col-span-2 top-[200px] ml-0">
              <img
                className="sticky  min-h-2 mt-6 rounded-2xl"
                src="https://images.unsplash.com/photo-1604335398980-ededcadcc37d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2340"
                alt="Sticky"
              />
            </div>

            {/* Scrollable Content */}
            <div className="space-y-8">
              {whoWeAre.map((section, index) => (
                
                <div
                  key={index}
                  className={` flex gap-2 `}
                >
                  <div className="text-primary p-3 border-2 max-h-max rounded-xl border-primary">
                     {icons[index].icon}
                  </div>
                  <div
                    className={`title-animate ${
                      language === "ar" ? "text-right" : "text-left"
                    }`}
                    dir={language === "ar" ? "rtl" : "ltr"}
                  >
                    <CardHeading className ="mb-3">
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

        {/* Footer decoration */}
      </SectionMargin>
    </SectionWrapper>
  );
};

export default WhoWeAre;
