
import { useCallback, useRef } from 'react';

interface UseLongPressProps {
  onLongPress: (event: React.TouchEvent | React.MouseEvent) => void;
  delay?: number;
}

export const useLongPress = ({ onLongPress, delay = 500 }: UseLongPressProps) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isLongPressRef = useRef(false);
  const startPositionRef = useRef({ x: 0, y: 0 });
  const startTimeRef = useRef<number>(0);
  const hasMovedRef = useRef(false);

  const start = useCallback((event: React.TouchEvent | React.MouseEvent) => {
    // Reset states
    isLongPressRef.current = false;
    hasMovedRef.current = false;
    startTimeRef.current = Date.now();
    
    // Store initial position to detect movement
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
    startPositionRef.current = { x: clientX, y: clientY };
    
    // Start long press timer
    timeoutRef.current = setTimeout(() => {
      if (!hasMovedRef.current) {
        isLongPressRef.current = true;
        onLongPress(event);
        
        // Add haptic feedback if available
        if ('vibrate' in navigator) {
          navigator.vibrate(50);
        }
      }
    }, delay);
  }, [onLongPress, delay]);

  const move = useCallback((event: React.TouchEvent | React.MouseEvent) => {
    if (!timeoutRef.current) return;
    
    // Check if mouse/finger has moved significantly
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
    
    const deltaX = Math.abs(clientX - startPositionRef.current.x);
    const deltaY = Math.abs(clientY - startPositionRef.current.y);
    
    // If moved more than 10px, cancel long press
    if (deltaX > 10 || deltaY > 10) {
      hasMovedRef.current = true;
      clear();
    }
  }, []);

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const end = useCallback(() => {
    clear();
    // Don't reset isLongPressRef immediately to allow click handler to check it
    setTimeout(() => {
      isLongPressRef.current = false;
    }, 100);
  }, [clear]);

  // Only prevent click if it was actually a completed long press
  const clickHandler = useCallback((event: React.MouseEvent) => {
    if (isLongPressRef.current) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, []);

  return {
    onMouseDown: start,
    onTouchStart: start,
    onMouseMove: move,
    onTouchMove: move,
    onMouseUp: end,
    onMouseLeave: clear,
    onTouchEnd: end,
    onClick: clickHandler
  };
};
