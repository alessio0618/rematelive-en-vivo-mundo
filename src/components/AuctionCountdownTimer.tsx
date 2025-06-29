import React, { useCallback, useState, useEffect } from 'react';
import { Clock, Zap } from 'lucide-react';
import { useAuctionCountdown } from '@/hooks/useAuctionCountdown';

interface AuctionCountdownTimerProps {
  initialTime: number;
  onTimeUp: () => void;
  onBidPlaced?: () => void;
  onBidExtension?: (extendFn: (seconds?: number) => void) => void;
  onTimeUpdate?: (currentTime: number) => void; // New prop for time updates
  auctionStatus?: 'active' | 'ending' | 'extended' | 'sold';
  className?: string;
}

export const AuctionCountdownTimer: React.FC<AuctionCountdownTimerProps> = ({
  initialTime,
  onTimeUp,
  onBidPlaced,
  onBidExtension,
  onTimeUpdate,
  auctionStatus = 'active',
  className = ''
}) => {
  const [extensionAmount, setExtensionAmount] = useState<number | null>(null);

  const onExtensionCallback = useCallback((newTime: number) => {
    console.log(`Auction extended to ${newTime} seconds`);
  }, []);

  const onUrgentStateCallback = useCallback((isUrgent: boolean) => {
    console.log(`Auction urgency state: ${isUrgent}`);
  }, []);

  const handleExtensionPopup = useCallback((seconds: number) => {
    setExtensionAmount(seconds);
  }, []);
  
  const {
    timeLeft,
    formattedTime,
    urgencyLevel,
    isActive,
    hasExtended,
    extendTime,
    extendOnBid
  } = useAuctionCountdown({
    initialTime,
    onTimeUp,
    onTimeUpdate, // Pass the callback to the hook
    onExtension: onExtensionCallback,
    onUrgentState: onUrgentStateCallback,
    onExtensionPopup: handleExtensionPopup,
  });

  useEffect(() => {
    if (extensionAmount !== null) {
      const timer = setTimeout(() => {
        setExtensionAmount(null);
      }, 1500); // The popup will disappear after 1.5s
      return () => clearTimeout(timer);
    }
  }, [extensionAmount]);

  // Expose the extendOnBid function to parent components
  React.useEffect(() => {
    if (onBidExtension) {
      onBidExtension(extendOnBid);
    }
  }, [onBidExtension, extendOnBid]);


  const getTimerStyles = () => {
    const baseStyles = "font-mono font-bold transition-all duration-200 flex items-center space-x-1 text-foreground";
    
    switch (urgencyLevel) {
      case 'critical':
        return `${baseStyles} text-xl animate-heartbeat`;
      case 'urgent':
        return `${baseStyles} text-lg`;
      default:
        return `${baseStyles} text-base`;
    }
  };

  const getBackgroundEffect = () => {
    switch (urgencyLevel) {
      case 'critical':
        return 'border-red-500/30 animate-border-pulse';
      case 'urgent':
        return 'border-orange-500/20';
      case 'warning':
        return 'border-yellow-500/20';
      default:
        return 'border-border';
    }
  };

  // Check if auction has ended
  const isAuctionEnded = auctionStatus === 'sold' || timeLeft <= 0;

  return (
    <div className={`relative ${className}`}>
      {/* Main Timer */}
      <div className={`px-3 py-2 rounded-lg border bg-card ${getBackgroundEffect()}`}>
        <div className={getTimerStyles()}>
          <Clock className="w-4 h-4" />
          <div className="flex items-baseline">
            <span>{isAuctionEnded ? '¡VENDIDO!' : formattedTime}</span>
            {/* Extension Popup */}
            {extensionAmount !== null && (
              <span
                key={Date.now()}
                className="ml-2 font-bold text-orange-500"
              >
                +{extensionAmount}s
              </span>
            )}
          </div>
          {hasExtended && !isAuctionEnded && (
            <Zap className="w-3 h-3 text-yellow-500" />
          )}
        </div>
      </div>

      {/* Particle effects for critical state */}
      {urgencyLevel === 'critical' && !isAuctionEnded && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-red-500 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
