import type { Metadata } from 'next';
import HeroSection from '@/app/components/common/HeroSection';
import OurServicesShort from '@/app/components/sections/homeSections/OurServicesShort';
import CategoryShowcase from '@/app/components/sections/homeSections/CategoryShowcase';
import B2BCTA from '@/app/components/sections/homeSections/B2BCTA';
import FAQ from '@/app/components/common/FAQItem';

export const metadata: Metadata = {
  title: 'Nos Services - Laundry.ma | Pressing & Blanchisserie à Tanger',
  description: 'Découvrez tous nos services : pressing, blanchisserie, nettoyage express, repassage professionnel. Collecte et livraison gratuites à Tanger.',
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection
        title="NOS SERVICES"
        subtitle="HOME / NOS SERVICES"
        backgroundImage="/images/services-laundry.png"
      />

      <OurServicesShort />
      <CategoryShowcase />
      <B2BCTA />
      <FAQ />
    </div>
  );
}




