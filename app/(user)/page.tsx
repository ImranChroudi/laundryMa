import type { Metadata } from 'next';
import AboutUsSection from "@/app/components/sections/homeSections/aboutus";
import HeroValeurs from "@/app/components/sections/homeSections/Hero";
import OurComitements from "@/app/components/sections/homeSections/OurComitements";
import TestimonialsSection from "@/app/components/sections/homeSections/TestimonialsSection";
import HowWeWork from "@/app/components/sections/homeSections/howWeWork";
import OurServicesShort from "@/app/components/sections/homeSections/OurServicesShort";
import B2BSection from "@/app/components/sections/homeSections/B2BSection";
import FAQ from "@/app/components/common/FAQItem";
import PricingSection from "@/app/components/sections/homeSections/PricingSection";
import PromotionSection from "@/app/components/sections/homeSections/PromotionSection";
import ExpertArticlesSection from "../components/sections/values/ExpertArticlesSection";
import { WebSiteSchema, LocalBusinessSchema, OrganizationSchema } from '@/app/lib/schema';

export const metadata: Metadata = {
  title: "Laundry.ma - Pressing à domicile de haute qualité à Tanger",
  description: "Laundry.ma - Service de pressing et nettoyage professionnel à domicile. Collecte, lavage et livraison gratuites 7j/7. Service express en 24h. ⭐ 5/5 - 6 avis clients",
  keywords: "pressing, nettoyage à sec, blanchisserie, Tanger, service à domicile, repassage, nettoyage tapis",
  openGraph: {
    title: "Laundry.ma - Pressing à domicile de haute qualité",
    description: "Service de pressing et nettoyage professionnel à domicile à Tanger",
    images: ["/images/laundry-tanger.avif"],
    type: "website",
  },
};

const Home = () => {
  return (
    <>
      {/* Schema.org JSON-LD */}
      <WebSiteSchema 
        name="Laundry.ma"
        url="https://laundry.ma"
        description="Service de pressing et nettoyage professionnel à domicile à Tanger"
      />
      <LocalBusinessSchema
        name="Laundry.ma"
        description="Service de pressing et nettoyage professionnel à domicile à Tanger"
        rating={{
          ratingValue: 5,
          bestRating: 5,
          worstRating: 1,
          reviewCount: 6,
        }}
      />
      <OrganizationSchema
        name="Laundry.ma"
        url="https://laundry.ma"
        description="Service de pressing et nettoyage professionnel à domicile"
      />

      <HeroValeurs />
      <PromotionSection />
      <AboutUsSection /> 
      <OurServicesShort />
      <HowWeWork />
      <PricingSection />
      <OurComitements />
      <TestimonialsSection />
      <ExpertArticlesSection />
      <FAQ />
    </>
  );
};

export default Home;
