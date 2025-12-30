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
    // Check if user has already accepted cookies
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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl p-4 md:p-6" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Left Side: Icon and Text */}
        <div className={`flex items-start gap-4 flex-1 ${isArabic ? 'flex-row-reverse' : ''}`}>
          <div className="bg-primary/10 rounded-full p-3 flex-shrink-0">
            <Cookie className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className={`text-lg font-semibold text-tertiary mb-2 ${isArabic ? 'text-right' : 'text-left'}`}>
              {isArabic ? 'نستخدم ملفات تعريف الارتباط' : 'Nous utilisons des cookies'}
            </h3>
            <p className={`text-sm text-gray-600 leading-relaxed ${isArabic ? 'text-right' : 'text-left'}`}>
              {isArabic ? (
                <>
                  يستخدم هذا الموقع ملفات تعريف الارتباط لتحسين تجربة التصفح وتحليل حركة المرور لدينا. 
                  من خلال الاستمرار في استخدام هذا الموقع، فإنك تقبل استخدامنا لملفات تعريف الارتباط.{' '}
                  <Link href="/ar/privacy" className="text-tertiary hover:text-primary hover:underline">
                    معرفة المزيد
                  </Link>
                </>
              ) : (
                <>
                  Ce site utilise des cookies pour améliorer votre expérience de navigation et analyser notre trafic. 
                  En continuant à utiliser ce site, vous acceptez notre utilisation des cookies.{' '}
                  <Link href="/privacy" className="text-tertiary hover:text-primary hover:underline">
                    En savoir plus
                  </Link>
                </>
              )}
            </p>
          </div>
        </div>

        {/* Right Side: Buttons */}
        <div className={`flex items-center gap-3 flex-shrink-0 ${isArabic ? 'flex-row-reverse' : ''}`}>
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            {isArabic ? 'رفض' : 'Refuser'}
          </button>
          <button
            onClick={handleAccept}
            className="px-6 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors"
          >
            {isArabic ? 'قبول' : 'Accepter'}
          </button>
          <button
            onClick={handleAccept}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={isArabic ? 'إغلاق' : 'Fermer'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;








