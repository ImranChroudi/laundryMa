'use client';

import React, { useState, useEffect } from 'react';
import { X, Percent, ArrowRight, ArrowLeft } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useGetActivePromotionQuery } from '@/app/hooks/use-promotions';

const PromotionPopupContent = () => {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');
  const isAdmin = pathname?.startsWith('/admin');
  
  const { data, isLoading } = useGetActivePromotionQuery() as {
    data: { promotion: any } | null;
    isLoading: boolean;
  };

  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Don't show on admin pages
    if (isAdmin) {
      return;
    }

    // Check if promotion exists and is active
    if (!isLoading && data?.promotion) {
      // Check if user has already dismissed this promotion
      const dismissedPromotionId = localStorage.getItem('dismissedPromotionId');
      if (dismissedPromotionId !== String(data.promotion._id)) {
        setIsVisible(true);
      }
    }
    
    // Debug logging
    if (!isLoading) {
      console.log('Promotion data:', data);
      console.log('Promotion exists:', !!data?.promotion);
      if (data?.promotion) {
        console.log('Promotion ID:', data.promotion._id);
        console.log('Dismissed ID:', localStorage.getItem('dismissedPromotionId'));
      }
    }
  }, [data, isLoading, isAdmin]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      if (data?.promotion?._id) {
        localStorage.setItem('dismissedPromotionId', String(data.promotion._id));
      }
    }, 300);
  };

  if (!isVisible || !data?.promotion || isAdmin) {
    return null;
  }

  const promotion = data.promotion;
  const discountText = promotion.discountType === 'percentage' 
    ? `${promotion.discountValue}%`
    : `${promotion.discountValue} DH`;


    console.log("this is popup promotion")

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={handleClose}
    >
      <div 
        className={`relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden transition-transform duration-300 ${
          isClosing ? 'scale-95' : 'scale-100'
        }`}
        onClick={(e) => e.stopPropagation()}
        dir={isArabic ? 'rtl' : 'ltr'}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label={isArabic ? 'إغلاق' : 'Fermer'}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image */}
        {promotion.imageUrl && (
          <div className="relative w-full h-48">
            <Image
              src={promotion.imageUrl}
              alt={isArabic ? promotion.titleAr || promotion.title : promotion.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Badge */}
          <div className={`flex items-center gap-2 mb-4 ${isArabic ? 'justify-end flex-row-reverse' : 'justify-start'}`}>
            <div className="bg-primary/10 rounded-full p-2">
              <Percent className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm font-semibold text-primary">
              {isArabic ? 'عرض خاص' : 'Promotion'}
            </span>
          </div>

          {/* Title */}
          <h3 className={`text-2xl font-bold text-tertiary mb-2 ${isArabic ? 'text-right' : 'text-left'}`}>
            {isArabic ? promotion.titleAr || promotion.title : promotion.title}
          </h3>

          {/* Discount Value */}
          <div className={`mb-4 ${isArabic ? 'text-right' : 'text-left'}`}>
            <span className="text-4xl font-bold text-primary">
              {discountText}
            </span>
            {promotion.discountType === 'percentage' && (
              <span className={`text-lg text-gray-600 ml-2 ${isArabic ? 'mr-2 ml-0' : ''}`}>
                {isArabic ? 'خصم' : 'de réduction'}
              </span>
            )}
          </div>

          {/* Description */}
          {promotion.description && (
            <p className={`text-gray-600 mb-6 ${isArabic ? 'text-right' : 'text-left'}`}>
              {isArabic ? promotion.descriptionAr || promotion.description : promotion.description}
            </p>
          )}


          {/* Button */}
          {promotion.buttonLink && (
            <Link href={promotion.buttonLink}>
              <button
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors ${isArabic ? 'flex-row-reverse' : ''}`}
                style={{
                  boxShadow: '0 4px 6px -1px rgba(77, 175, 239, 0.3), 0 2px 4px -1px rgba(77, 175, 239, 0.2)'
                }}
              >
                <span>{isArabic ? promotion.buttonTextAr || promotion.buttonText || 'شاهد العرض' : promotion.buttonText || 'Voir l\'offre'}</span>
                {isArabic ? (
                  <ArrowLeft className="w-5 h-5" />
                ) : (
                  <ArrowRight className="w-5 h-5" />
                )}
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

const PromotionPopup = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only render after mount to ensure QueryClientProvider is available
  if (!mounted) {
    return null;
  }

  return <PromotionPopupContent />;
};

export default PromotionPopup;

