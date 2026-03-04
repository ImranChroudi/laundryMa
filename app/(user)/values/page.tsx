'use client'
import React from 'react';
import HeroSection from '@/app/components/common/HeroSection';
import ValuesSection from '@/app/components/sections/values/ValuesSection';

export default function ValuesPage() {
  return (
    <div className="min-h-screen">
      <HeroSection
        title="NOS VALEURS"
        subtitle="HOME / NOS VALEURS"
        backgroundImage="/images/nos-valeurs.png"
        className="min-h-[50vh]"
        titleColor="text-primary"
      />
      <ValuesSection />
    </div>
  );
}
