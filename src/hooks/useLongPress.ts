
import { useCallback, useRef } from 'react';

interface UseLongPressProps {
  onLongPress: (event: React.TouchEvent | React.MouseEvent) => void;
  delay?: number;
}

export const useLongPress = ({ onLongPress, delay = 500 }: UseLongPressProps) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isLongPress = useRef(false);
  const startTime = useRef<number>(0);

  const start = useCallback((event: React.TouchEvent | React.MouseEvent) => {
    isLongPress.current = false;
    startTime.current = Date.now();
    
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
  }, []);

  const clickHandler = useCallback((event: React.MouseEvent) => {
    // Only prevent click if it was actually a long press
    const pressDuration = Date.now() - startTime.current;
    if (isLongPress.current || pressDuration >= 500) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, []);

  return {
    onMouseDown: start,
    onTouchStart: start,
    onMouseUp: clear,
    onMouseLeave: clear,
    onTouchEnd: clear,
    onClick: clickHandler
  };
};
