
import { useState, useCallback, useRef, useEffect } from 'react';

interface UsePinchZoomProps {
  minZoom?: number;
  maxZoom?: number;
  initialZoom?: number;
}

export const usePinchZoom = ({ minZoom = 1, maxZoom = 3, initialZoom = 1 }: UsePinchZoomProps = {}) => {
  const [scale, setScale] = useState(initialZoom);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const lastDistance = useRef(0);
  const lastCenter = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const getDistance = (touches: TouchList) => {
    if (touches.length < 2) return 0;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const getCenter = (touches: TouchList) => {
    if (touches.length < 2) return { x: 0, y: 0 };
    return {
      x: (touches[0].clientX + touches[1].clientX) / 2,
      y: (touches[0].clientY + touches[1].clientY) / 2
    };
  };

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      lastDistance.current = getDistance(e.touches);
      lastCenter.current = getCenter(e.touches);
    }
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      
      const distance = getDistance(e.touches);
      const center = getCenter(e.touches);

      if (lastDistance.current > 0) {
        const scaleChange = distance / lastDistance.current;
        const newScale = Math.min(Math.max(scale * scaleChange, minZoom), maxZoom);
        
        setScale(newScale);
        
        // Adjust translation to zoom towards the center point
        const deltaX = center.x - lastCenter.current.x;
        const deltaY = center.y - lastCenter.current.y;
        
        setTranslateX(prev => prev + deltaX);
        setTranslateY(prev => prev + deltaY);
      }

      lastDistance.current = distance;
      lastCenter.current = center;
    }
  }, [scale, minZoom, maxZoom]);

  const handleTouchEnd = useCallback(() => {
    lastDistance.current = 0;
  }, []);

  const resetZoom = useCallback(() => {
    setScale(initialZoom);
    setTranslateX(0);
    setTranslateY(0);
  }, [initialZoom]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return {
    containerRef,
    scale,
    translateX,
    translateY,
    resetZoom,
    transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`
  };
};
