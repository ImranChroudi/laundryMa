import Link from "next/link";
import { Building2, ArrowRight, Briefcase, Sparkles, ShieldCheck } from "lucide-react";
import SpanText from "@/app/components/common/SpanText";
import SectionTitle from "@/app/components/common/SectionTitle";

const perks = [
  { icon: <Briefcase className="w-5 h-5" />, text: "Tarifs préférentiels" },
  { icon: <Sparkles className="w-5 h-5" />, text: "Solutions sur mesure" },
  { icon: <ShieldCheck className="w-5 h-5" />, text: "Interlocuteur dédié" },
];

export default function B2BCTA() {
  return (
    <div className="relative overflow-hidden bg-linear-to-br from-tertiary via-tertiary to-tertiary py-16 md:py-24 px-6 sm:px-12 md:px-16">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

            <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
              {/* Left content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-6">
                  <Building2 className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-blue-100">Espace Professionnels</span>
                </div>

                <SectionTitle className="text-white">
                  Solutions sur mesure pour{" "}
                  <SpanText text="votre entreprise" className="" />
                </SectionTitle>

                <p className="text-blue-100/80 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                  Hôtels, restaurants, bureaux, salons de beauté — Laundry.ma vous accompagne avec des solutions professionnelles adaptées à vos besoins.
                </p>

                {/* Perks */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
                  {perks.map((perk, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white/[0.07] backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2.5">
                      <span className="text-primary">{perk.icon}</span>
                      <span className="text-sm font-medium text-white/90">{perk.text}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Link
                  href="/professionnels"
                  className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 group hover:shadow-[0_8px_30px_rgba(59,130,246,0.4)]"
                >
                  <span>Contactez-nous</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Right visual */}
              <div className="hidden lg:flex shrink-0 w-56 h-56 items-center justify-center">
                <div className="relative">
                  <div className="w-40 h-40 rounded-3xl bg-white/[0.07] backdrop-blur-sm border border-white/10 flex items-center justify-center rotate-6">
                    <Building2 className="w-20 h-20 text-primary/60" />
                  </div>
                  <div className="absolute -bottom-3 -right-3 w-16 h-16 rounded-2xl bg-primary/20 backdrop-blur-sm border border-primary/20 flex items-center justify-center -rotate-6">
                    <Sparkles className="w-8 h-8 text-primary" />
                  </div>
                </div>
              </div>
            </div>
    </div>
  );
}
