
import { useState, useEffect, useRef, useCallback } from 'react';

interface UseAuctionCountdownProps {
  initialTime: number; // in seconds
  onTimeUp: () => void;
  onExtension?: (newTime: number) => void;
  onUrgentState?: (isUrgent: boolean) => void;
  onTimeUpdate?: (currentTime: number) => void; // New callback for time updates
  onExtensionPopup?: (seconds: number) => void;
}

export const useAuctionCountdown = ({ 
  initialTime, 
  onTimeUp, 
  onExtension, 
  onUrgentState,
  onTimeUpdate,
  onExtensionPopup
}: UseAuctionCountdownProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(true);
  const [hasExtended, setHasExtended] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Audio feedback
  const playTickSound = (type: 'normal' | 'urgent' | 'final' = 'normal') => {
    if (!audioContextRef.current) {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch(e) {
        console.error("Web Audio API is not supported in this browser");
        return;
      }
    }
    
    const context = audioContextRef.current;
    if (context.state === 'suspended') {
      context.resume();
    }
    
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    
    let frequency = 800, gain = 0.1;
    if (type === 'urgent') { frequency = 1200; gain = 0.15; }
    if (type === 'final') { frequency = 1500; gain = 0.2; }

    oscillator.frequency.setValueAtTime(frequency, context.currentTime);
    gainNode.gain.setValueAtTime(gain, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.1);
    
    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.1);
  };

  // Haptic feedback
  const triggerHaptic = (intensity: 'light' | 'medium' | 'heavy' | 'heartbeat' | 'celebration') => {
    if ('vibrate' in navigator) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [30, 10, 30],
        heartbeat: [0, 40, 40, 40, 40, 150, 40, 40, 40, 40, 350],
        celebration: [100, 30, 100, 30, 100],
      };
      navigator.vibrate(patterns[intensity]);
    }
  };

  useEffect(() => {
    if (!isActive) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 0.1;
        
        // Update parent component with current time
        onTimeUpdate?.(newTime);
        
        // Urgent state detection
        if (newTime <= 30) {
          onUrgentState?.(true);
        } else {
          onUrgentState?.(false);
        }
        
        const prevSecond = Math.floor(prev);
        const newSecond = Math.floor(newTime);
        
        // Final countdown effects
        if (newTime <= 10 && newTime > 0) {
          if (newSecond !== prevSecond) {
            if (newTime <= 3) {
              playTickSound('final');
              triggerHaptic('heavy');
            } else {
              playTickSound('urgent');
              triggerHaptic('medium');
            }
          }
          // Heartbeat haptic for the last 5 seconds
          if (newTime <= 5 && (Math.floor(newTime * 2) !== Math.floor(prev * 2))) {
            triggerHaptic('heartbeat');
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
  }, [isActive, onTimeUp, onUrgentState, onTimeUpdate]);

  const extendTime = (additionalSeconds: number) => {
    if (!hasExtended && timeLeft <= 10) {
      const newTime = timeLeft + additionalSeconds;
      setTimeLeft(newTime);
      setHasExtended(true);
      onExtension?.(newTime);
      onTimeUpdate?.(newTime); // Update parent when extending
      triggerHaptic('light');
    }
  };

  // New method specifically for bid extensions - no hasExtended limitation
  const extendOnBid = useCallback((additionalSeconds: number = 2) => {
    setTimeLeft(currentTime => {
      const newTime = currentTime + additionalSeconds;
      onExtension?.(newTime);
      onTimeUpdate?.(newTime); // Update parent when extending
      onExtensionPopup?.(additionalSeconds);
      triggerHaptic('light'); // A 'celebration' haptic might be too much for every extension
      console.log(`Timer extended by ${additionalSeconds} seconds due to winning bid`);
      return newTime;
    });
  }, [onExtension, onTimeUpdate, onExtensionPopup]);

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
    if (timeLeft <= 5) return 'critical';
    if (timeLeft <= 10) return 'urgent';
    if (timeLeft <= 30) return 'warning';
    return 'normal';
  };

  return {
    timeLeft,
    formattedTime: formatTime(timeLeft),
    urgencyLevel: getUrgencyLevel(),
    isActive,
    hasExtended,
    extendTime,
    extendOnBid, // New method for bid extensions
    stop: () => setIsActive(false),
    restart: (newTime: number) => {
      setTimeLeft(newTime);
      setIsActive(true);
      setHasExtended(false);
    }
  };
};
