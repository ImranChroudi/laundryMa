import React from 'react';

interface HeroSectionProps {
  backgroundImage?: string;
  mobileBackgroundImage?: string;
  title: string;
  subtitle?: string;
  className?: string;
  overlay?: boolean;
  titleColor?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  backgroundImage ,
  mobileBackgroundImage ,
  title,
  subtitle,
  className = '',
  overlay = true,
  titleColor = 'text-white',
}) => {
  return (
    <section
      className={`relative min-h-[40vh] flex items-center justify-center ${className}`}
    >

      <div className="absolute inset-0 w-full h-full bg-black/50 z-10"></div>
      {/* Desktop Background */}
      <div
        className="hidden md:block absolute inset-0 w-full h-full"
        style={{
          backgroundImage: backgroundImage && `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* Mobile Background */}
      <div
        className="md:hidden absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${mobileBackgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* Overlay */}
      {/* {overlay && (
        <div className="absolute inset-0 bg-black/40"></div>
      )} */}
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 md:px-8 max-w-4xl mx-auto">
        <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold ${titleColor} mb-4 uppercase`}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-base md:text-lg text-white/90 uppercase tracking-wide">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default HeroSection;

