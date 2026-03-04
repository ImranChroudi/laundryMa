"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Leaf,
  Truck,
  Zap,
  ShieldCheck,
  Clock,
  Sparkles,
  Star,
  Users,
  Award,
  MapPin,
  ArrowRight,
  Phone,
} from "lucide-react";
import HeroSection from "@/app/components/common/HeroSection";
import SectionWrapper from "@/app/components/common/SectionWrapper";
import SectionMargin from "@/app/components/common/SectionMargin";
import SectionBadge from "@/app/components/common/SectionBadge";
import CTAButton from "@/app/components/common/CTAButton";
import WhatsAppButton from "@/app/components/common/WhatsAppButton";

/* ───────── Animated counter hook ───────── */
function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            // ease-out quad
            const eased = 1 - (1 - progress) * (1 - progress);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

/* ───────── Stats bar ───────── */
const stats = [
  { label: "Années d'expérience", value: 5, suffix: "+", icon: <Award className="w-6 h-6" /> },
  { label: "Clients satisfaits", value: 3000, suffix: "+", icon: <Users className="w-6 h-6" /> },
  { label: "Commandes livrées", value: 15000, suffix: "+", icon: <Truck className="w-6 h-6" /> },
  { label: "Villes couvertes", value: 10, suffix: "+", icon: <MapPin className="w-6 h-6" /> },
];

function StatItem({ stat }: { stat: (typeof stats)[0] }) {
  const { count, ref } = useCountUp(stat.value);
  return (
    <div ref={ref} className="flex flex-col items-center text-center gap-2 px-4 py-6">
      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-2">
        {stat.icon}
      </div>
      <span className="text-3xl md:text-4xl font-extrabold text-tertiary tabular-nums">
        {count.toLocaleString("fr-FR")}
        {stat.suffix}
      </span>
      <span className="text-gray-500 text-sm font-medium">{stat.label}</span>
    </div>
  );
}

/* ───────── Values data ───────── */
const values = [
  {
    icon: <Heart className="w-7 h-7" />,
    title: "Satisfaction client",
    text: "Votre bonheur est notre priorité nᵒ1. Chaque vêtement est traité avec le même soin que s'il était le nôtre.",
    color: "from-red-500 to-rose-500",
  },
  {
    icon: <Leaf className="w-7 h-7" />,
    title: "Éco-responsabilité",
    text: "Nous utilisons des produits écologiques et des procédés respectueux de l'environnement pour protéger la planète.",
    color: "from-emerald-500 to-green-500",
  },
  {
    icon: <ShieldCheck className="w-7 h-7" />,
    title: "Qualité garantie",
    text: "Chaque pièce passe par un contrôle rigoureux : nettoyage, repassage et vérification avant livraison.",
    color: "from-primary to-blue-600",
  },
  {
    icon: <Zap className="w-7 h-7" />,
    title: "Rapidité",
    text: "Service express en moins de 24h. Créneau de 30 minutes pour la collecte. Votre temps est précieux.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: <Sparkles className="w-7 h-7" />,
    title: "Transparence",
    text: "Tarifs clairs, suivi en temps réel et communication directe. Pas de surprises, juste de la confiance.",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: <Clock className="w-7 h-7" />,
    title: "Disponibilité",
    text: "De 9h à 21h, 7 jours sur 7. Nous nous adaptons à votre emploi du temps, pas l'inverse.",
    color: "from-cyan-500 to-teal-500",
  },
];

/* ═══════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════ */
export default function QuiSommesNousPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ─── HERO ─── */}
      <HeroSection
        title="Qui sommes-nous"
        subtitle="Découvrez l'histoire, les valeurs et l'équipe derrière Laundry.ma"
        backgroundImage="/images/qui-laundry.png"
        className="min-h-[55vh]"
        titleColor="text-primary"
      />

      {/* ─── STATS BAR ─── */}
      <div className="relative -mt-16 z-30">
        <SectionWrapper>
          <SectionMargin>
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
              {stats.map((s, i) => (
                <StatItem key={i} stat={s} />
              ))}
            </div>
          </SectionMargin>
        </SectionWrapper>
      </div>

      {/* ─── QUI SOMMES-NOUS (INTRO) ─── */}
      <SectionWrapper className="py-20 md:py-28">
        <SectionMargin>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text */}
            <div className="space-y-6">
              <SectionBadge text="À propos" />
              <h2 className="text-4xl sm:text-5xl font-extrabold text-tertiary leading-tight">
                Votre partenaire{" "}
                <span className="relative inline-block text-primary">
                  de confiance
                  <span className="absolute -bottom-1 left-0 right-0 h-1 rounded-full bg-primary/30" />
                </span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                <strong>Laundry.ma</strong> est né d&apos;une conviction simple : prendre
                soin de votre linge ne devrait jamais être une corvée. Depuis notre
                création à Tanger, nous avons bâti un service de pressing et de
                blanchisserie moderne, fiable et respectueux de vos textiles.
              </p>
              <p className="text-gray-500 text-base leading-relaxed">
                Notre équipe de professionnels passionnés s&apos;engage chaque jour à
                vous offrir un service impeccable — du ramassage à votre porte
                jusqu&apos;à la livraison de vos vêtements parfaitement nettoyés,
                repassés et emballés.
              </p>
              <div className="flex flex-wrap gap-3 pt-3">
                <CTAButton />
                <WhatsAppButton />
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/laundry.avif"
                  alt="Équipe Laundry.ma en action"
                  width={700}
                  height={500}
                  className="w-full h-[350px] md:h-[450px] object-cover"
                />
              </div>
              {/* Decorative floating card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg p-4 hidden md:flex items-center gap-3 border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                  <Star className="w-6 h-6 text-white fill-white" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-tertiary">4.9/5</p>
                  <p className="text-xs text-gray-500">Avis clients</p>
                </div>
              </div>
            </div>
          </div>
        </SectionMargin>
      </SectionWrapper>

      {/* ─── NOS VALEURS ─── */}
      <SectionWrapper className="py-20 md:py-28">
        <SectionMargin>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionBadge text="Nos Valeurs" />
            <h2 className="text-4xl sm:text-5xl font-extrabold text-tertiary mt-5 leading-tight">
              Ce qui nous{" "}
              <span className="text-primary">anime</span>
            </h2>
            <p className="text-gray-500 text-lg mt-4">
              Six piliers fondamentaux qui guident chaque action et chaque décision chez Laundry.ma.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="group relative bg-white border border-gray-100 rounded-2xl p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${v.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center text-white mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold text-tertiary mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </SectionMargin>
      </SectionWrapper>

      {/* ─── CTA FINAL ─── */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-primary/8" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

        <SectionWrapper>
          <SectionMargin>
            <div className="relative z-10 text-center max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-tertiary leading-tight">
                Prêt à nous faire{" "}
                <span className="text-primary">confiance</span> ?
              </h2>
              <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-xl mx-auto">
                Commandez votre première collecte et découvrez le service pressing le plus pratique du Maroc.
                Livraison gratuite, qualité garantie.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center pt-4">
                <CTAButton text="Commander maintenant" />
                <WhatsAppButton />
                <Link
                  href="tel:+212677777724"
                  className="group flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl border-2 border-gray-200 bg-white text-tertiary font-semibold hover:border-tertiary hover:bg-tertiary hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg"
                >
                  <Phone className="w-4 h-4" />
                  Nous appeler
                </Link>
              </div>
            </div>
          </SectionMargin>
        </SectionWrapper>
      </section>
    </div>
  );
}

