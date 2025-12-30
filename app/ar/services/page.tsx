'use client'
import React from 'react';
import HeroSection from '@/app/components/common/HeroSection';
import ServicesCards from '@/app/components/sections/homeSectionsAr/OurServices';
import WhyChooseUs from '@/app/components/sections/homeSections/WhyChooseUs';
import HowWeWork from '@/app/components/sections/homeSectionsAr/howWeWork';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection
        title="خدماتنا"
        subtitle="الرئيسية / خدماتنا"
        backgroundImage="/images/services-laundry.png"
        className="min-h-[70vh]"
      />

      {/* Main Services Section */}
      <ServicesCards />

      {/* Why Choose Our Services Section */}
      <WhyChooseUs />

      <HowWeWork />
    </div>
  );
}
