'use client';

import React from 'react';
import { Star, Truck, Clock, Shield, Leaf, Phone } from 'lucide-react';
import { usePathname } from 'next/navigation';

const items = [
  { icon: <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 shrink-0" />, fr: "⭐ 5/5 · 6 avis Google vérifiés", ar: "⭐ 5/5 · 6 تقييمات جوجل" },
  { icon: <Truck className="w-3.5 h-3.5 text-primary shrink-0" />, fr: "Collecte & livraison GRATUITE", ar: "استلام وتوصيل مجاني" },
  { icon: <Clock className="w-3.5 h-3.5 text-primary shrink-0" />, fr: "Livraison express en 24h", ar: "توصيل سريع في 24 ساعة" },
  { icon: <Shield className="w-3.5 h-3.5 text-primary shrink-0" />, fr: "100% Nettoyage à sec professionnel", ar: "100% تنظيف جاف احترافي" },
  { icon: <Leaf className="w-3.5 h-3.5 text-green-500 shrink-0" />, fr: "Produits éco-responsables", ar: "منتجات صديقة للبيئة" },
  { icon: <Phone className="w-3.5 h-3.5 text-primary shrink-0" />, fr: "Disponible 7j/7 · 8h–22h", ar: "متاح 7 أيام من 8 صباحاً حتى 10 مساءً" },
];

const TrustBar = () => {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) return null;

  // Duplicate items for seamless loop
  const allItems = [...items, ...items];

  return (
    <div className="w-full bg-tertiary text-white overflow-hidden py-2 z-40 relative" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="flex whitespace-nowrap animate-trust-scroll gap-0">
        {allItems.map((item, idx) => (
          <span key={idx} className="inline-flex items-center gap-2 px-8 text-xs font-medium opacity-90">
            {item.icon}
            <span>{isArabic ? item.ar : item.fr}</span>
            <span className="text-white/30 mx-2">•</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TrustBar;
