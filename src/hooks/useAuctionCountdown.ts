
import { useState, useEffect, useRef } from 'react';

interface UseAuctionCountdownProps {
  initialTime: number; // in seconds
  onTimeUp: () => void;
  onExtension?: (newTime: number) => void;
  onUrgentState?: (isUrgent: boolean) => void;
}

export const useAuctionCountdown = ({ 
  initialTime, 
  onTimeUp, 
  onExtension, 
  onUrgentState 
}: UseAuctionCountdownProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(true);
  const [hasExtended, setHasExtended] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Audio feedback
  const playTickSound = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContextRef.current.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.1);
    
    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + 0.1);
  };

  // Haptic feedback
  const triggerHaptic = (intensity: 'light' | 'medium' | 'heavy') => {
    if ('vibrate' in navigator) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [30, 10, 30]
      };
      navigator.vibrate(patterns[intensity]);
    }
  };

  useEffect(() => {
    if (!isActive) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 0.1;
        
        // Urgent state detection - changed from 30 to 7 seconds
        if (newTime <= 7 && newTime > 4) {
          onUrgentState?.(true);
        }
        
        // Final countdown effects - changed from 10 to 4 seconds
        if (newTime <= 4 && newTime > 0) {
          if (Math.floor(newTime) !== Math.floor(prev)) {
            playTickSound();
            triggerHaptic('medium');
          }
        }
        
        // Time up
        if (newTime <= 0) {
          setIsActive(false);
          onTimeUp();
          triggerHaptic('heavy');
          return 0;
        }
        
        return newTime;
      });
    }, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, onTimeUp, onUrgentState]);

  const extendTime = (additionalSeconds: number) => {
    if (!hasExtended && timeLeft <= 4) { // Changed from 10 to 4 seconds
      const newTime = timeLeft + additionalSeconds;
      setTimeLeft(newTime);
      setHasExtended(true);
      onExtension?.(newTime);
      triggerHaptic('light');
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const milliseconds = Math.floor((time % 1) * 10);
    
    if (time <= 10) {
      return `${seconds.toString().padStart(2, '0')}.${milliseconds}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const getUrgencyLevel = () => {
    if (timeLeft <= 4) return 'critical'; // Changed from 10 to 4 seconds
    if (timeLeft <= 7) return 'urgent';   // Changed from 30 to 7 seconds
    if (timeLeft <= 60) return 'warning';
    return 'normal';
  };

  return {
    timeLeft,
    formattedTime: formatTime(timeLeft),
    urgencyLevel: getUrgencyLevel(),
    isActive,
    hasExtended,
    extendTime,
    stop: () => setIsActive(false),
    restart: (newTime: number) => {
      setTimeLeft(newTime);
      setIsActive(true);
      setHasExtended(false);
    }
  };
};
