import React from 'react';

const SectionMargin: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <div className={`max-w-7xl mx-auto ${className}`}>
      {children}
    </div>
  );
};

export default SectionMargin;














