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
      className={`relative min-h-[50vh] flex items-center justify-center ${className}`}
    >
      {/* Layered gradient overlay */}
      <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(135deg, rgba(30,58,95,0.75) 0%, rgba(30,58,95,0.45) 50%, rgba(77,175,239,0.25) 100%)' }} />
      <div className="absolute inset-0 z-10 bg-black/20" />
      {/* Desktop Background */}
      <div
        className="hidden md:block  absolute inset-0 w-full h-full"
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
          backgroundPosition: ' -364px top',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* Overlay */}
      {/* {overlay && (
        <div className="absolute inset-0 bg-black/40"></div>
      )} */}
      
      {/* Content */}
      <div className="relative z-20 text-center px-4 md:px-8 max-w-4xl mx-auto">
        <h1 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold ${titleColor} mb-4 leading-tight tracking-tight drop-shadow-lg`}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-base md:text-lg text-white/80 tracking-wide max-w-xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default HeroSection;

