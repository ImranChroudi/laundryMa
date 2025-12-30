'use client'
import React from 'react';
import SectionWrapper from '@/app/components/common/SectionWrapper';
import SectionMargin from '@/app/components/common/SectionMargin';

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-primary py-12 md:py-16">
        <SectionMargin>
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 uppercase">
              MENTIONS LÉGALES
            </h1>
            <p className="text-base md:text-lg text-white/90 uppercase tracking-wide">
              HOME / MENTIONS LÉGALES
            </p>
          </div>
        </SectionMargin>
      </section>

      {/* Content Section */}
      <SectionWrapper className="py-16 md:py-24 bg-white">
        <SectionMargin>
          <div className="max-w-4xl mx-auto prose prose-lg max-w-none">
            {/* Section 1 */}
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-tertiary mb-6">
                1. Éditeur du site
              </h2>
              <div className="space-y-3 text-gray-700">
                <p className="text-lg font-semibold text-primary">Laundry.ma</p>
                <p><strong>Adresse :</strong> Casablanca, Maroc</p>
                <p>
                  <strong>Email :</strong>{' '}
                  <a href="mailto:contact@laundry.ma" className="text-primary hover:underline">
                    contact@laundry.ma
                  </a>
                </p>
                <p>
                  <strong>Téléphone :</strong>{' '}
                  <a href="tel:+212677777724" className="text-primary hover:underline">
                    +212 6 77 77 77 24
                  </a>
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-tertiary mb-6">
                2. Directeur de la publication
              </h2>
              <p className="text-gray-700 text-lg">
                Laundry.ma
              </p>
            </div>

            {/* Section 3 */}
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-tertiary mb-6">
                3. Hébergement du site
              </h2>
              <p className="text-gray-700 text-lg">
                Le site est hébergé par notre prestataire d'hébergement web.
              </p>
            </div>

            {/* Section 4 */}
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-tertiary mb-6">
                4. Propriété intellectuelle
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Tous les contenus présents sur ce site (textes, images, logos, vidéos) sont la propriété exclusive de Laundry.ma. Toute reproduction, même partielle, est interdite sans autorisation écrite.
              </p>
            </div>

            {/* Section 5 */}
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-tertiary mb-6">
                5. Données personnelles
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Les informations collectées via les formulaires (nom, email, téléphone, adresse) sont utilisées uniquement pour traiter vos demandes et améliorer nos services.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Conformément à la loi 09-08, vous disposez d'un droit d'accès, de modification et de suppression de vos données.
              </p>
            </div>

            {/* Section 6 */}
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-tertiary mb-6">
                6. Responsabilité
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Laundry.ma décline toute responsabilité pour les dommages résultant de l'utilisation du site, des liens externes ou d'une mauvaise utilisation des services.
              </p>
            </div>

            {/* Section 7 */}
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-tertiary mb-6">
                7. Cookies
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Le site utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez configurer votre navigateur pour les refuser.
              </p>
            </div>
          </div>
        </SectionMargin>
      </SectionWrapper>
    </div>
  );
}

