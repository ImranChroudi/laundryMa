import SectionWrapper from "@/app/components/common/SectionWrapper";
import SectionMargin from "@/app/components/common/SectionMargin";
import SectionBadge from "@/app/components/common/SectionBadge";
import AboutMission from "@/app/components/sections/homeSections/AboutMission";
import HeroSection from "@/app/components/common/HeroSection";
import AboutUsSection from "@/app/components/sections/homeSections/aboutus";
import OurServices from "@/app/components/sections/homeSections/OurServices";
import PricingSection from "@/app/components/sections/homeSections/PricingSection";
import HowWeWork from "@/app/components/sections/homeSections/howWeWork";
import OurComitements from "@/app/components/sections/homeSections/OurComitements";
import Testimonials from "@/app/components/common/TestimonialCard";
import FAQ from "@/app/components/common/FAQItem";

export default function QuiSommesNousPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection
        title="Qui sommes-nous"
        subtitle="Découvrez notre histoire et nos valeurs"
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

