
import React from 'react';
import { Clock, Zap } from 'lucide-react';
import { useAuctionCountdown } from '@/hooks/useAuctionCountdown';

interface AuctionCountdownTimerProps {
  initialTime: number;
  onTimeUp: () => void;
  onBidPlaced?: () => void;
  auctionStatus?: 'active' | 'ending' | 'extended' | 'sold';
  className?: string;
}

export const AuctionCountdownTimer: React.FC<AuctionCountdownTimerProps> = ({
  initialTime,
  onTimeUp,
  onBidPlaced,
  auctionStatus = 'active',
  className = ''
}) => {
  const {
    timeLeft,
    formattedTime,
    urgencyLevel,
    isActive,
    hasExtended,
    extendTime
  } = useAuctionCountdown({
    initialTime,
    onTimeUp,
    onExtension: (newTime) => {
      console.log(`Auction extended to ${newTime} seconds`);
    },
    onUrgentState: (isUrgent) => {
      console.log(`Auction urgency state: ${isUrgent}`);
    }
  });

  // Handle bid placed - extend time if in final moments
  React.useEffect(() => {
    if (onBidPlaced && timeLeft <= 10) {
      extendTime(30);
    }
  }, [onBidPlaced, timeLeft, extendTime]);

  const getTimerStyles = () => {
    const baseStyles = "font-mono font-bold transition-all duration-200 flex items-center space-x-1";
    
    switch (urgencyLevel) {
      case 'critical':
        return `${baseStyles} text-red-500 text-xl animate-pulse`;
      case 'urgent':
        return `${baseStyles} text-orange-500 text-lg`;
      case 'warning':
        return `${baseStyles} text-yellow-500 text-base`;
      default:
        return `${baseStyles} text-foreground text-base`;
    }
  };

  const getBackgroundEffect = () => {
    if (urgencyLevel === 'critical') {
      return 'animate-pulse bg-red-500/10 border-red-500/30';
    }
    if (urgencyLevel === 'urgent') {
      return 'bg-orange-500/5 border-orange-500/20';
    }
    return 'bg-card border-border';
  };

  // Check if auction has ended
  const isAuctionEnded = auctionStatus === 'sold' || timeLeft <= 0;

  return (
    <div className={`relative ${className}`}>
      {/* Main Timer */}
      <div className={`px-3 py-2 rounded-lg border ${getBackgroundEffect()}`}>
        <div className={getTimerStyles()}>
          <Clock className="w-4 h-4" />
          <span>{formattedTime}</span>
          {hasExtended && (
            <Zap className="w-3 h-3 text-yellow-500" />
          )}
        </div>
      </div>

      {/* Urgency Indicators */}
      {urgencyLevel === 'urgent' && !isAuctionEnded && (
        <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full animate-bounce">
          ¡Última Oportunidad!
        </div>
      )}

      {urgencyLevel === 'critical' && !isAuctionEnded && (
        <>
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-bounce">
            ¡TERMINANDO!
          </div>
          
          {/* Screen edge pulsing effect */}
          <div className="fixed inset-0 pointer-events-none z-50">
            <div className="absolute inset-0 border-4 border-red-500 animate-pulse opacity-30" />
          </div>

          {/* Floating warning text */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-40">
            <div className="text-red-500 text-2xl font-bold animate-bounce opacity-80">
              ¡TERMINANDO PRONTO!
            </div>
          </div>
        </>
      )}

      {/* Show TERMINADA when auction has ended */}
      {isAuctionEnded && (
        <>
          <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            ¡TERMINADA!
          </div>
          
          {/* Floating ended text */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-40">
            <div className="text-green-500 text-2xl font-bold opacity-80">
              ¡TERMINADA!
            </div>
          </div>
        </>
      )}

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
