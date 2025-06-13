
import { useState, useEffect, useRef } from 'react';

interface SwipeState {
  startY: number;
  currentY: number;
  isDragging: boolean;
  startTime: number;
}

interface UseSwipeNavigationProps {
  onSwipeUp: () => void;
  onSwipeDown: () => void;
  threshold?: number;
  velocityThreshold?: number;
}

export const useSwipeNavigation = ({
  onSwipeUp,
  onSwipeDown,
  threshold = 50,
  velocityThreshold = 0.3
}: UseSwipeNavigationProps) => {
  const [swipeState, setSwipeState] = useState<SwipeState>({
    startY: 0,
    currentY: 0,
    isDragging: false,
    startTime: 0
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      setSwipeState({
        startY: touch.clientY,
        currentY: touch.clientY,
        isDragging: true,
        startTime: Date.now()
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!swipeState.isDragging) return;
      
      const touch = e.touches[0];
      setSwipeState(prev => ({
        ...prev,
        currentY: touch.clientY
      }));

      // Prevent default scrolling
      e.preventDefault();
    };

    const handleTouchEnd = () => {
      if (!swipeState.isDragging) return;

      const deltaY = swipeState.startY - swipeState.currentY;
      const deltaTime = Date.now() - swipeState.startTime;
      const velocity = Math.abs(deltaY) / deltaTime;

      // Check if swipe meets criteria
      if (Math.abs(deltaY) > threshold || velocity > velocityThreshold) {
        if (deltaY > 0) {
          // Swiped up - go to next stream
          onSwipeUp();
        } else {
          // Swiped down - go to previous stream
          onSwipeDown();
        }
      }

      setSwipeState(prev => ({
        ...prev,
        isDragging: false
      }));
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [swipeState.isDragging, swipeState.startY, swipeState.startTime, onSwipeUp, onSwipeDown, threshold, velocityThreshold]);

  return { containerRef, isDragging: swipeState.isDragging };
};
