import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Smartphone, ShoppingBasket, WashingMachine, Truck } from "lucide-react";

interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const steps: Step[] = [
  {
    icon: <Smartphone className="w-12 h-12 text-[#00BFFF] mb-4" />,
    title: "Vous Commandez",
    description:
      "Planifiez en moins de 30 secondes un rendez-vous avec un de nos livreurs.",
    delay: 0.2,
  },
  {
    icon: <ShoppingBasket className="w-12 h-12 text-[#00BFFF] mb-4" />,
    title: "Nous Collectons",
    description:
      "Un de nos livreurs se présente à votre domicile ou bureau pour récupérer vos vêtements.",
    delay: 0.4,
  },
  {
    icon: <WashingMachine className="w-12 h-12 text-[#00BFFF] mb-4" />,
    title: "Nous Nettoyons",
    description:
      "Nos partenaires sélectionnés se chargent du nettoyage et du repassage de votre linge.",
    delay: 0.6,
  },
  {
    icon: <Truck className="w-12 h-12 text-[#00BFFF] mb-4" />,
    title: "Nous Livrons",
    description:
      "Moins de 24h plus tard, votre livreur vous rend vos vêtements propres.",
    delay: 0.8,
  },
];

const StepsSection: React.FC = () => {
  // Détecter mobile et prefers-reduced-motion
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Mémoïser les steps
  const memoizedSteps = useMemo(() => steps, []);

  // Fonction pour les animations
  const getAnimationProps = (delay: number = 0) => ({
    initial: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 },
    whileInView: prefersReducedMotion ? {} : { opacity: 1, y: 0 },
    transition: {
      duration: isMobile ? 0.4 : 0.6,
      delay: isMobile ? 0 : delay,
    },
    viewport: { once: true },
  });

  return (
    <section className="bg-gradient-to-b from-white to-blue-50 text-gray-800 py-20 px-6 md:px-16">
      <motion.h2
        className="text-3xl md:text-5xl font-bold text-center mb-16"
        {...getAnimationProps(0)}
      >
        Le Pressing à domicile ou au bureau en{" "}
        <span className="text-[#00BFFF]">3 CLICS !</span>
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
        {memoizedSteps.map((step, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center text-center bg-white rounded-2xl p-8 shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300"
            {...getAnimationProps(step.delay)}
            whileHover={isMobile || prefersReducedMotion ? {} : { scale: 1.05 }} // Désactivé sur mobile
          >
            {step.icon}
            <h3 className="text-xl font-semibold mb-2 text-gray-900">{step.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default React.memo(StepsSection);
