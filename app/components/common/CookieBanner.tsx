'use client'
import React, { useState, useEffect } from 'react';
import { X, Cookie, Shield } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // Small delay so the banner slides in
      const timer = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(timer);
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

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[60] transition-transform duration-500 ease-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Desktop layout */}
      <div className="hidden md:block bg-white border-t-2 border-primary/20 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-6">
          <div className={`flex items-center gap-3 flex-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <div className="bg-primary/10 rounded-full p-2 flex-shrink-0">
              <Cookie className="w-5 h-5 text-primary" />
            </div>
            <p className={`text-sm text-gray-700 ${isArabic ? 'text-right' : 'text-left'}`}>
              {isArabic ? (
                <>
                  نستخدم ملفات تعريف الارتباط لتحسين تجربتك.{' '}
                  <Link href="/ar/conditions-generales" className="text-primary font-medium hover:underline">المزيد</Link>
                </>
              ) : (
                <>
                  Nous utilisons des cookies pour améliorer votre expérience.{' '}
                  <Link href="/conditions-generales" className="text-primary font-medium hover:underline">En savoir plus</Link>
                </>
              )}
            </p>
          </div>
          <div className={`flex items-center gap-3 flex-shrink-0 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={handleDecline}
              className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors"
            >
              {isArabic ? 'رفض' : 'Refuser'}
            </button>
            <button
              onClick={handleAccept}
              className="px-5 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors shadow-sm"
            >
              {isArabic ? 'قبول' : 'Accepter'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile layout — full card */}
      <div className="md:hidden bg-white border-t-2 border-primary/20 shadow-[0_-4px_24px_rgba(0,0,0,0.12)] px-4 py-5">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className={`flex items-center justify-between ${isArabic ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-2.5 ${isArabic ? 'flex-row-reverse' : ''}`}>
              <div className="bg-primary/10 rounded-full p-2">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-bold text-gray-900">
                {isArabic ? 'سياسة الخصوصية' : 'Vie privée'}
              </h3>
            </div>
            <button
              onClick={handleAccept}
              className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label={isArabic ? 'إغلاق' : 'Fermer'}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Text */}
          <p className={`text-sm text-gray-600 leading-relaxed ${isArabic ? 'text-right' : 'text-left'}`}>
            {isArabic ? (
              <>
                نستخدم ملفات تعريف الارتباط لتحسين تجربتك وتحليل حركة المرور.{' '}
                <Link href="/ar/conditions-generales" className="text-primary font-medium hover:underline">المزيد</Link>
              </>
            ) : (
              <>
                Ce site utilise des cookies pour améliorer votre expérience et analyser notre trafic.{' '}
                <Link href="/conditions-generales" className="text-primary font-medium hover:underline">En savoir plus</Link>
              </>
            )}
          </p>

          {/* Buttons */}
          <div className={`flex gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={handleDecline}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 rounded-xl transition-colors"
            >
              {isArabic ? 'رفض' : 'Refuser'}
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-xl transition-colors shadow-sm"
            >
              {isArabic ? 'قبول الكل' : 'Tout accepter'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;








