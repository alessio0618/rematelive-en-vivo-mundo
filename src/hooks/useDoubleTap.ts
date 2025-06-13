
import { useState, useCallback, useRef } from 'react';

interface UseDoubleTapProps {
  onDoubleTap: (event: React.TouchEvent | React.MouseEvent) => void;
  delay?: number;
}

export const useDoubleTap = ({ onDoubleTap, delay = 300 }: UseDoubleTapProps) => {
  const [tapCount, setTapCount] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTap = useCallback((event: React.TouchEvent | React.MouseEvent) => {
    event.preventDefault();
    
    setTapCount(prev => prev + 1);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (tapCount === 0) {
        // Single tap - trigger double tap
        onDoubleTap(event);
      }
      setTapCount(0);
    }, delay);
  }, [tapCount, onDoubleTap, delay]);

  return {
    onTouchEnd: handleTap,
    onMouseUp: handleTap
  };
};
