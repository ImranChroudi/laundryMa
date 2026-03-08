import type { Metadata } from 'next';
import HeroSection from '@/app/components/common/HeroSection';
import ServicesDetailed from '@/app/components/sections/homeSections/ServicesDetailed';
import CategoryShowcase from '@/app/components/sections/homeSections/CategoryShowcase';
import B2BCTA from '@/app/components/sections/homeSections/B2BCTA';
import FAQ from '@/app/components/common/FAQItem';

export const metadata: Metadata = {
  title: 'Nos Services | Pressing & Blanchisserie à Tanger',
  description: 'Découvrez tous nos services : pressing, nettoyage à sec, nettoyage de tapis, canapés, literie, repassage professionnel. Collecte et livraison gratuites à Tanger.',
  alternates: { canonical: 'https://www.laundry.ma/services/' },
  openGraph: {
    title: 'Nos Services - Laundry.ma | Pressing & Blanchisserie à Tanger',
    description: 'Pressing, nettoyage à sec, tapis, canapés, literie, service express. Collecte et livraison gratuites à Tanger.',
    url: 'https://www.laundry.ma/services/',
    images: ['/images/services-main.avif'],
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection
        title="NOS SERVICES"
        subtitle="HOME / NOS SERVICES"
        backgroundImage="/images/services-laundry.png"
      />

      <ServicesDetailed />
      <CategoryShowcase />
      <B2BCTA />
      <FAQ />
    </div>
  );
}




