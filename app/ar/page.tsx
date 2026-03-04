import AboutUsSection from "@/app/components/sections/homeSectionsAr/aboutus";
import HeroValeurs from "@/app/components/sections/homeSectionsAr/Hero";
import OurComitements from "@/app/components/sections/homeSectionsAr/OurComitements";
import TestimonialsSection from "@/app/components/sections/homeSections/TestimonialsSection";
import HowWeWork from "@/app/components/sections/homeSectionsAr/howWeWork";
import OurServicesShort from "@/app/components/sections/homeSectionsAr/OurServicesShort";
import FAQ from "@/app/components/common/FAQItem";
import CategoryShowcase from "@/app/components/sections/homeSections/CategoryShowcase";
import PromotionSection from "@/app/components/sections/homeSectionsAr/PromotionSection";
import ExpertArticlesSection from "../components/sections/values/ExpertArticlesSection";

const Home = () => {
  return (
    <>
        <HeroValeurs />
        <PromotionSection />
        <AboutUsSection /> 
        <OurServicesShort />
        <CategoryShowcase />
        <HowWeWork />
        <OurComitements />
        <TestimonialsSection theme="ar" />
        <ExpertArticlesSection />
        <FAQ />
    </>
  );
};

export default Home;







