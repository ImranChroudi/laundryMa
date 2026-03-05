'use client'
import React, { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg px-4 py-2.5" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Icon + Text */}
        <div className={`flex items-center gap-2.5 flex-1 min-w-0 ${isArabic ? 'flex-row-reverse' : ''}`}>
          <Cookie className="w-4 h-4 text-primary flex-shrink-0" />
          <p className={`text-xs text-gray-600 truncate ${isArabic ? 'text-right' : 'text-left'}`}>
            {isArabic ? (
              <>
                نستخدم ملفات تعريف الارتباط لتحسين تجربتك.{' '}
                <Link href="/ar/conditions-generales" className="text-primary hover:underline">المزيد</Link>
              </>
            ) : (
              <>
                Ce site utilise des cookies pour améliorer votre expérience.{' '}
                <Link href="/conditions-generales" className="text-primary hover:underline">En savoir plus</Link>
              </>
            )}
          </p>
        </div>

        {/* Right: Buttons */}
        <div className={`flex items-center gap-2 flex-shrink-0 ${isArabic ? 'flex-row-reverse' : ''}`}>
          <button
            onClick={handleDecline}
            className="px-3 py-1 text-xs font-medium text-gray-600 hover:text-gray-800 transition-colors"
          >
            {isArabic ? 'رفض' : 'Refuser'}
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-1 text-xs font-medium text-white bg-primary hover:bg-primary/90 rounded-full transition-colors"
          >
            {isArabic ? 'قبول' : 'Accepter'}
          </button>
          <button
            onClick={handleAccept}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={isArabic ? 'إغلاق' : 'Fermer'}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;








