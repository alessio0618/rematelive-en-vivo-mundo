
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo = ({ size = 'md', className = '' }: LogoProps) => {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-12'
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/lovable-uploads/6636aad6-ea29-4ab6-b155-ea8654fd70c1.png" 
        alt="RemateLive" 
        className={`${sizeClasses[size]} w-auto`}
      />
    </div>
  );
};

export default Logo;
