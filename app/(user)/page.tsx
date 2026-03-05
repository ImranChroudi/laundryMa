import type { Metadata } from 'next';
import AboutUsSection from "@/app/components/sections/homeSections/aboutus";
import HeroValeurs from "@/app/components/sections/homeSections/Hero";
import OurComitements from "@/app/components/sections/homeSections/OurComitements";
import TestimonialsSection from "@/app/components/sections/homeSections/TestimonialsSection";
import HowWeWork from "@/app/components/sections/homeSections/howWeWork";
import OurServicesShort from "@/app/components/sections/homeSections/OurServicesShort";
import ValuesSection from "@/app/components/sections/homeSections/ValuesSection";
import B2BCTA from "@/app/components/sections/homeSections/B2BCTA";
import FAQ from "@/app/components/common/FAQItem";
import CategoryShowcase from "@/app/components/sections/homeSections/CategoryShowcase";
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
      
      <AboutUsSection /> 
      <OurServicesShort />
      <CategoryShowcase />
      <HowWeWork />
      <ValuesSection />
      <OurComitements />
      <TestimonialsSection />
      <B2BCTA />
      <FAQ />
    </>
  );
};

export default Home;
