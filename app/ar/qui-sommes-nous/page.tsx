import SectionWrapper from "@/app/components/common/SectionWrapper";
import SectionMargin from "@/app/components/common/SectionMargin";
import SectionBadge from "@/app/components/common/SectionBadge";
import AboutMission from "@/app/components/sections/homeSectionsAr/AboutMission";
import HeroSection from "@/app/components/common/HeroSection";
import AboutUsSection from "@/app/components/sections/homeSectionsAr/aboutus";


export default function QuiSommesNousPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection
        title="من نحن"
        subtitle="اكتشف تاريخنا وقيمنا"
        backgroundImage="/images/qui-laundry.png"
        className="min-h-[50vh]"
        titleColor="text-primary"
      />

      <AboutUsSection />
      {/* About Mission Section */}

      {/* Mission/Vision/Goal Section */}
      <AboutMission />

      {/* Additional Content Section */}
    </div>
  );
}

