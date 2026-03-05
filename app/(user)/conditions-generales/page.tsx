'use client'
import React from 'react';
import SectionWrapper from '@/app/components/common/SectionWrapper';
import SectionMargin from '@/app/components/common/SectionMargin';

export default function ConditionsGeneralesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-primary py-12 md:py-16">
        <SectionMargin>
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 uppercase">
              CONDITIONS GÉNÉRALES DE SERVICE
            </h1>
            <p className="text-base md:text-lg text-white/90 uppercase tracking-wide">
              HOME / CONDITIONS GÉNÉRALES
            </p>
          </div>
        </SectionMargin>
      </section>

      {/* Content Section */}
      <SectionWrapper className="py-16 md:py-24 bg-white">
        <SectionMargin>
          <div className="max-w-4xl mx-auto prose prose-lg max-w-none">
            {/* Intro */}
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-tertiary mb-4">
                CONDITIONS GÉNÉRALES DE SERVICE
              </h2>
              <p className="text-lg font-semibold text-primary">Laundry.ma</p>
              <p className="text-gray-700 text-lg">Ville : Tanger – Maroc</p>
              <p className="text-gray-700 text-lg leading-relaxed mt-4">
                Les présentes Conditions Générales de Service régissent l'ensemble des prestations fournies par Laundry.ma (Pressing, Blanchisserie, Nettoyage de tapis, Sneakers Spa).
              </p>
              <p className="text-gray-700 text-lg leading-relaxed font-semibold mt-2">
                Toute remise d&apos;article implique l&apos;acceptation pleine, entière et sans réserve des présentes conditions.
              </p>
            </div>

            {/* Section I */}
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-tertiary mb-6">
                I. PRESSING & BLANCHISSERIE
              </h2>

              <div className="mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-tertiary mb-4">
                  1. Réception et contrôle
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-3">
                  Les articles sont inspectés lors de la réception.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed mb-2">
                  Laundry.ma décline toute responsabilité concernant :
                </p>
                <ul className="list-disc list-inside text-gray-700 text-lg space-y-2 ml-4">
                  <li>Défauts préexistants</li>
                  <li>Usure normale</li>
                  <li>Déchirures, coutures fragiles</li>
                  <li>Altération antérieure des couleurs</li>
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-tertiary mb-4">
                  2. Articles susceptibles de déteindre
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-2">
                  Les vêtements contenant des teintures non fixées ou susceptibles de déteindre sont traités sous la responsabilité exclusive du client.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Aucune responsabilité ne pourra être engagée en cas de transfert ou variation de couleur.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-tertiary mb-4">
                  3. Taches et résultats
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Les taches anciennes, oxydées ou incrustées peuvent ne pas disparaître totalement malgré un traitement professionnel.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-tertiary mb-4">
                  4. Délai de retrait
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-2">
                  Les articles doivent être récupérés dans un délai de 30 jours après notification.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Au-delà de 3 mois, Laundry.ma décline toute responsabilité légale.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-tertiary mb-4">
                  5. Responsabilité et indemnisation
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-3 font-semibold">
                  En cas de faute technique prouvée :
                </p>
                <ul className="list-disc list-inside text-gray-700 text-lg space-y-2 ml-4 mb-4">
                  <li>L&apos;indemnisation est limitée à un maximum de 5 fois le montant du service payé</li>
                  <li>ou à un pourcentage de la valeur actuelle estimée de l&apos;article.</li>
                </ul>
                <p className="text-gray-700 text-lg leading-relaxed mb-3 font-semibold">
                  En cas de perte avérée :
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  L&apos;indemnisation ne pourra en aucun cas dépasser un plafond équivalent à dix (10) fois le montant du service de nettoyage payé pour l&apos;article concerné.
                </p>
              </div>
            </div>

            {/* Section II */}
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-tertiary mb-6">
                II. NETTOYAGE DES TAPIS
              </h2>

              <div className="mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-tertiary mb-4">
                  1. Inspection
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  L&apos;état du tapis est constaté lors de la réception (usure, fragilité, décoloration).
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-tertiary mb-4">
                  2. Tapis délicats
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Les tapis artisanaux, anciens ou en fibres naturelles sont nettoyés après information du client quant aux risques potentiels (variation de couleur, léger rétrécissement).
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-tertiary mb-4">
                  3. Décoloration
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Les tapis susceptibles de déteindre sont traités sous la responsabilité du client.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-tertiary mb-4">
                  4. Délai de retrait
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Au-delà de 3 mois sans retrait, Laundry.ma décline toute responsabilité.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-tertiary mb-4">
                  5. Indemnisation
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-3 font-semibold">
                  En cas de faute prouvée :
                </p>
                <ul className="list-disc list-inside text-gray-700 text-lg space-y-2 ml-4 mb-4">
                  <li>Maximum 5 fois le montant du service</li>
                  <li>ou pourcentage de la valeur actuelle estimée.</li>
                </ul>
                <p className="text-gray-700 text-lg leading-relaxed mb-3 font-semibold">
                  En cas de perte avérée :
                </p>
                <ul className="list-disc list-inside text-gray-700 text-lg space-y-2 ml-4">
                  <li>Indemnisation plafonnée à 10 fois le montant du service de nettoyage payé.</li>
                </ul>
              </div>
            </div>

            {/* Section III */}
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-tertiary mb-6">
                III. SNEAKERS SPA – NETTOYAGE DE CHAUSSURES
              </h2>

              <div className="mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-tertiary mb-4">
                  1. Inspection
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-2">
                  Les chaussures sont examinées à la réception (usure, fissures, fragilité des colles).
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Laundry.ma n'est pas responsable des défauts antérieurs.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-tertiary mb-4">
                  2. Matières sensibles
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Les chaussures en daim, nubuck, cuir délicat ou matériaux techniques sont traitées sous réserve des risques liés à la nature du produit.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-tertiary mb-4">
                  3. Décoloration et décollement
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Laundry.ma décline toute responsabilité liée à la faiblesse des matériaux ou au vieillissement naturel.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-tertiary mb-4">
                  4. Délai de retrait
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Après 3 mois sans retrait, aucune responsabilité ne pourra être engagée.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-tertiary mb-4">
                  5. Indemnisation
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-3 font-semibold">
                  En cas de faute technique prouvée :
                </p>
                <ul className="list-disc list-inside text-gray-700 text-lg space-y-2 ml-4 mb-4">
                  <li>Maximum 5 fois le montant du service</li>
                  <li>ou pourcentage de la valeur actuelle.</li>
                </ul>
                <p className="text-gray-700 text-lg leading-relaxed mb-3 font-semibold">
                  En cas de perte avérée :
                </p>
                <ul className="list-disc list-inside text-gray-700 text-lg space-y-2 ml-4">
                  <li>Indemnisation plafonnée à 10 fois le montant du service payé.</li>
                </ul>
              </div>
            </div>

            {/* Clause Générale */}
            <div className="mb-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h2 className="text-3xl md:text-4xl font-bold text-tertiary mb-6">
                Clause Générale
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Laundry.ma s'engage à fournir ses services selon les standards professionnels en vigueur au Maroc.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Toute réclamation doit être formulée dans un délai maximum de 48 heures après réception des articles.
              </p>
            </div>
          </div>
        </SectionMargin>
      </SectionWrapper>
    </div>
  );
}
