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
  description: "Laundry.ma - Pressing à domicile de haute qualité. Collecte, Lavage, Livraison de votre linge et tapis à domicile sur Tanger et Régions. 100% à sec.",
  keywords: "pressing, nettoyage à sec, blanchisserie, Tanger, service à domicile, repassage, nettoyage tapis",
  alternates: {
    canonical: "https://www.laundry.ma/",
  },
  openGraph: {
    title: "Laundry.ma - Pressing à domicile de haute qualité à Tanger",
    description: "Laundry.ma - Pressing à domicile de haute qualité. Collecte, Lavage, Livraison de votre linge et tapis à domicile sur Tanger et Régions. 100% à sec.",
    url: "https://www.laundry.ma/",
    images: ["/images/laundry-tanger.avif"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Laundry.ma - Pressing à domicile de haute qualité à Tanger",
    description: "Laundry.ma - Pressing à domicile de haute qualité. Collecte, Lavage, Livraison de votre linge et tapis à domicile sur Tanger et Régions. 100% à sec.",
    images: ["/images/laundry-tanger.avif"],
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
