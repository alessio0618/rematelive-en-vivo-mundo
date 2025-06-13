
import { useCallback, useRef } from 'react';

interface UseLongPressProps {
  onLongPress: (event: React.TouchEvent | React.MouseEvent) => void;
  delay?: number;
}

export const useLongPress = ({ onLongPress, delay = 500 }: UseLongPressProps) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isLongPress = useRef(false);
  const startTimeRef = useRef<number>(0);

  const start = useCallback((event: React.TouchEvent | React.MouseEvent) => {
    isLongPress.current = false;
    startTimeRef.current = Date.now();
    
    timeoutRef.current = setTimeout(() => {
      isLongPress.current = true;
      onLongPress(event);
      
      // Add haptic feedback if available
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }
    }, delay);
  }, [onLongPress, delay]);

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    // Reset the long press flag after a short delay to allow normal clicks
    setTimeout(() => {
      isLongPress.current = false;
    }, 50);
  }, []);

  const clickHandler = useCallback((event: React.MouseEvent) => {
    const clickDuration = Date.now() - startTimeRef.current;
    
    // Only prevent click if it was actually a long press AND sufficient time has passed
    if (isLongPress.current && clickDuration >= delay - 100) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, [delay]);

  return {
    onMouseDown: start,
    onTouchStart: start,
    onMouseUp: clear,
    onMouseLeave: clear,
    onTouchEnd: clear,
    onClick: clickHandler
  };
};
