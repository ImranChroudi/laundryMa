'use client';

import React from 'react';
import { Wrench } from 'lucide-react';
import { usePathname } from 'next/navigation';

const TrustBar = () => {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) return null;

  return (
    <div className="w-full bg-amber-500 text-white overflow-hidden py-2.5 z-40 relative">
      <div className="flex flex-col items-center justify-center gap-1 text-sm font-semibold">
        <div className="flex items-center gap-2">
          <Wrench className="w-4 h-4 shrink-0" />
          <span>
            {isArabic
              ? 'الموقع تحت الصيانة حاليًا. سنعود قريبًا!'
              : 'Site en maintenance !'}
          </span>
          <Wrench className="w-4 h-4 shrink-0" />
        </div>
        <span className="text-xs font-medium opacity-90">
          {isArabic
            ? 'يمكنكم طلب استلام الملابس عبر الواتساب'
            : 'Vous pouvez demander un ramassage'}
        </span>
      </div>
    </div>
  );
};

export default TrustBar;
