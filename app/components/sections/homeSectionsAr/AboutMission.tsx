import Image from "next/image";
import SectionBadge from "../../common/SectionBadge";

const AboutMission =() => {
  return (
    <section className="py-24 px-4 md:px-12 lg:px-24 bg-[#fcfbfe] max-w-8xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* COLONNE GAUCHE - Texte & Onglets */}
        <div className="space-y-6">
          {/* Contenu de l'onglet actif */}
          <div className="mt-6 text-gray-800">
            <div className="mb-6 flex ">
              <SectionBadge text="عنّا" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-tertiary mb-4">
              هدفنا <span className="text-primary">الرئيسي</span>
            </h2>
            <p className="text-base leading-relaxed">
              هدفنا الرئيسي هو رضا العملاء المحليين من خلال العمل في جميع أنحاء المغرب. نحن نسعى لضمان رضا عملائنا في كل مرحلة، من الاستلام إلى التسليم، مع الحفاظ على الجودة والموثوقية والثقة في جميع خدماتنا، مع توسيع حضورنا ليشمل جميع مناطق المغرب.
            </p>
          </div>
        </div>

        {/* COLONNE DROITE - Image */}
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <Image
              src="/images/mission-team.png"
              alt="Équipe travaillant ensemble"
              width={1000}
              height={1000}
              className="w-full transform scale-110 "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMission;
