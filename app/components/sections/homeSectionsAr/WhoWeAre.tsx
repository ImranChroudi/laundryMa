import React from "react";
import Image from "next/image";
import SectionWrapper from "@/app/components/common/SectionWrapper";
import SectionMargin from "@/app/components/common/SectionMargin";
import { CardHeading } from "@/app/components/common/Titles";
import { MessageCircle, Puzzle, Target, Sprout, Factory } from "lucide-react";

const whoWeAre = [
  {
    title: "نستمع لاحتياجاتكم",
    description:
      "نضع توقعاتكم في صميم خدمتنا، مع فريق متاح ومنتبه للاستجابة لكل طلباتكم.",
  },
  {
    title: "حلول مخصصة",
    description:
      "كل قطعة ملابس فريدة. نكيّف تقنيات التنظيف لدينا لتقديم معالجة شخصية ومثالية.",
  },
  {
    title: "التزام بالجودة",
    description:
      "نسعى للتميز في كل مرحلة، من الاستلام إلى التسليم، لضمان رضاكم التام.",
  },
  {
    title: "احترام البيئة",
    description:
      "نستخدم منتجات صديقة للبيئة وعمليات مستدامة من أجل تنظيف مسؤول.",
  },
  {
    title: "خبرة حرفية",
    description:
      "بفضل خبرتنا، نجمع بين التقاليد والحداثة للعناية بأقمشتكم بأعلى مستوى من الاحترافية.",
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
        <div className="max-w-6xl mr-6 pt-8 pb-16">
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
                <div key={index} className="flex gap-2" dir="rtl">
                  <div className="text-primary p-3 border-2 max-h-max rounded-xl border-primary">
                    {icons[index].icon}
                  </div>
                  <div className="title-animate text-right">
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
