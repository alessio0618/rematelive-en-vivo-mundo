
import { useState, useCallback } from 'react';

interface HeartData {
  id: string;
  x: number;
  y: number;
  timestamp: number;
}

export const useFloatingHearts = () => {
  const [hearts, setHearts] = useState<HeartData[]>([]);

  const addHeart = useCallback((x: number, y: number) => {
    const newHeart: HeartData = {
      id: `heart-${Date.now()}-${Math.random()}`,
      x,
      y,
      timestamp: Date.now()
    };

    setHearts(prev => [...prev, newHeart]);

    // Remove heart after animation completes
    setTimeout(() => {
      setHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
    }, 2000);
  }, []);

  const removeHeart = useCallback((id: string) => {
    setHearts(prev => prev.filter(heart => heart.id !== id));
  }, []);

  return {
    hearts,
    addHeart,
    removeHeart
  };
};
