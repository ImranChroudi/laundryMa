'use client'
import React from 'react';
import HeroSection from '@/app/components/common/HeroSection';
import ServicesCards from '@/app/components/sections/homeSections/OurServices';
import WhyChooseUs from '@/app/components/sections/homeSections/WhyChooseUs';
import HowWeWork from '@/app/components/sections/homeSections/howWeWork';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection
        title="NOS SERVICES"
        subtitle="HOME / NOS SERVICES"
        backgroundImage="/images/services-laundry.png"
       
      />

      {/* Main Services Section */}
      <ServicesCards />

      {/* Why Choose Our Services Section */}
      <WhyChooseUs />

      <HowWeWork />

      
    </div>
  );
}




