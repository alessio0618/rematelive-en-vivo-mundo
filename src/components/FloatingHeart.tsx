
import React from 'react';
import { Heart } from 'lucide-react';

interface FloatingHeartProps {
  x: number;
  y: number;
  onAnimationEnd: () => void;
}

export const FloatingHeart: React.FC<FloatingHeartProps> = ({ x, y, onAnimationEnd }) => {
  return (
    <div
      className="absolute pointer-events-none z-50"
      style={{
        left: x - 20,
        top: y - 20,
        animation: 'floatHeart 2s ease-out forwards'
      }}
      onAnimationEnd={onAnimationEnd}
    >
      <Heart 
        className="w-10 h-10 text-red-500 fill-current drop-shadow-lg" 
        style={{
          filter: 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.6))'
        }}
      />
    </div>
  );
};
