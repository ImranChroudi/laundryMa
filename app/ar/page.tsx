import AboutUsSection from "@/app/components/sections/homeSectionsAr/aboutus";
import HeroValeurs from "@/app/components/sections/homeSectionsAr/Hero";
import OurComitements from "@/app/components/sections/homeSectionsAr/OurComitements";
import Testimonials from "@/app/components/common/TestimonialCard";
import HowWeWork from "@/app/components/sections/homeSectionsAr/howWeWork";
import OurServicesShort from "@/app/components/sections/homeSectionsAr/OurServicesShort";
import FAQ from "@/app/components/common/FAQItem";
import PricingSection from "@/app/components/sections/homeSectionsAr/PricingSection";
import PromotionSection from "@/app/components/sections/homeSectionsAr/PromotionSection";
import ExpertArticlesSection from "../components/sections/values/ExpertArticlesSection";

const Home = () => {
  return (
    <>
        <HeroValeurs />
        <PromotionSection />
        <AboutUsSection /> 
        <OurServicesShort />
        <HowWeWork />
        <PricingSection />
        <OurComitements />
        <Testimonials />
        <ExpertArticlesSection />
        <FAQ />
    </>
  );
};

export default Home;







