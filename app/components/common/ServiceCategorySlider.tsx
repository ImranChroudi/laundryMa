"use client";

import Image from "next/image";

export interface SliderItem {
  id: string;
  name: string;
  nameAr?: string;
  image: string;
  price: number;
  priceFrom?: boolean;
}

interface ServiceCategorySliderProps {
  items: SliderItem[];
  accentColor: string;
  isArabic?: boolean;
  maxItems?: number;
}

const ServiceCategorySlider = ({
  items,
  accentColor,
  isArabic = false,
  maxItems = 6,
}: ServiceCategorySliderProps) => {
  const displayItems = items.slice(0, maxItems);

  return (
    <div className="relative">
      {/* Grid showing all items */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
        {displayItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center"
          >
            {/* Image container */}
            <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-50">
              <Image
                src={item.image}
                alt={isArabic ? item.nameAr || item.name : item.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 30vw, 10vw"
                unoptimized
              />
            </div>

            {/* Price clearly below image */}
            <div className="mt-2 text-center">
              <span
                className="inline-flex items-center gap-0.5 text-xs font-bold rounded-full px-2.5 py-0.5"
                style={{
                  color: accentColor,
                  backgroundColor: `${accentColor}10`,
                }}
              >
                {item.priceFrom && (
                  <span className="text-[10px] font-semibold">
                    {isArabic ? "من " : "Dès "}
                  </span>
                )}
                {item.price}
                <span className="text-[10px] font-semibold">DH</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceCategorySlider;
