import Image from "next/image";
import SectionBadge from "../../common/SectionBadge";
import SpanText from "../../common/SpanText";


const AboutMission =() => {


  return (
    <section className="py-24 px-4 md:px-12 lg:px-24 bg-[#fcfbfe] max-w-8xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* COLONNE GAUCHE - Texte & Onglets */}
        <div className="space-y-6">
          

         

          {/* Contenu de l'onglet actif */}
          <div
            
            className="mt-6 text-gray-800"
          >
            <div className="mb-6 flex ">
              <SectionBadge text="À propos" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-tertiary mb-4">
              Notre <SpanText text="objectif" className="" />
            </h2>
            <p className="text-base leading-relaxed">
                Notre objectif principal est de satisfaire les clients locaux  en travaillant dans tout le Maroc. Nous visons à garantir la satisfaction de nos clients à chaque étape, de la collecte à la livraison, en maintenant la qualité, la fiabilité et la confiance dans tous nos services, tout en étendant notre présence à travers toutes les régions du Maroc.
            </p>
          </div>
        </div>

        {/* COLONNE DROITE - Image */}
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <Image
              src="/images/mission-team.png"
              alt="Équipe travaillant ensemble"
              width={600}
              height={400}
              className="w-full transform scale-130 "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMission;

