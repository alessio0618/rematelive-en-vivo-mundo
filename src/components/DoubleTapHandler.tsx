
import React, { useRef } from 'react';
import { useDoubleTap } from '@/hooks/useDoubleTap';
import { useFloatingHearts } from '@/hooks/useFloatingHearts';
import { FloatingHeart } from './FloatingHeart';

interface DoubleTapHandlerProps {
  children: React.ReactNode;
  onLike: () => void;
}

export const DoubleTapHandler: React.FC<DoubleTapHandlerProps> = ({ children, onLike }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { hearts, addHeart, removeHeart } = useFloatingHearts();

  const handleDoubleTap = (event: React.TouchEvent | React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    let clientX: number, clientY: number;

    if ('touches' in event && event.touches.length > 0) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else if ('clientX' in event) {
      clientX = event.clientX;
      clientY = event.clientY;
    } else {
      return;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    addHeart(x, y);
    onLike();
  };

  const doubleTapHandlers = useDoubleTap({
    onDoubleTap: handleDoubleTap,
    delay: 300
  });

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full"
      {...doubleTapHandlers}
    >
      {children}
      
      {/* Floating Hearts */}
      {hearts.map((heart) => (
        <FloatingHeart
          key={heart.id}
          x={heart.x}
          y={heart.y}
          onAnimationEnd={() => removeHeart(heart.id)}
        />
      ))}
    </div>
  );
};
