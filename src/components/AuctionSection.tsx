import React from 'react';
import { Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { SlideToBid } from '@/components/SlideToBid';
import { AuctionCountdownTimer } from '@/components/AuctionCountdownTimer';

interface Product {
  id: number;
  name: string;
  description: string;
  currentBid: number;
  timeLeft: number;
  shipping: number;
  image: string;
  auctionStatus: 'active' | 'ending' | 'extended' | 'sold';
}

interface AuctionSectionProps {
  currentProduct: Product;
  bidderStatus: string;
  onBid: (productId: number, bidAmount: number) => void;
  onAuctionEnd: () => void;
  onTimerExtend?: (extendFn: (seconds?: number) => void) => void;
  onTimeUpdate?: (currentTime: number) => void; // New prop for time updates
}

export const AuctionSection: React.FC<AuctionSectionProps> = ({
  currentProduct,
  bidderStatus,
  onBid,
  onAuctionEnd,
  onTimerExtend,
  onTimeUpdate
}) => {
  const [timerExtendFn, setTimerExtendFn] = React.useState<((seconds?: number) => void) | null>(null);

  // Store the timer extension function when received from countdown timer
  const handleTimerExtension = React.useCallback((extendFn: (seconds?: number) => void) => {
    setTimerExtendFn(() => extendFn);
    if (onTimerExtend) {
      onTimerExtend(extendFn);
    }
  }, [onTimerExtend]);

  // Handle bid and extend timer
  const handleBid = React.useCallback((productId: number, bidAmount: number) => {
    // Only extend timer if this is a winning bid (higher than current bid)
    if (bidAmount > currentProduct.currentBid && timerExtendFn) {
      timerExtendFn(2); // Extend by 2 seconds for winning bids
    }
    
    onBid(productId, bidAmount);
  }, [currentProduct.currentBid, timerExtendFn, onBid]);

  // Wrapper function to adapt handleBid for SlideToBid component
  const handleSlideToBid = React.useCallback((amount: number) => {
    handleBid(currentProduct.id, amount);
  }, [handleBid, currentProduct.id]);

  const getCardUrgencyClass = () => {
    const { timeLeft, auctionStatus } = currentProduct;

    if (auctionStatus === 'sold') {
      return 'ring-2 ring-green-500/50';
    }
    // Pulsing extended state
    if (auctionStatus === 'extended') {
      return 'ring-2 ring-yellow-500/70 animate-pulse';
    }
    
    if (timeLeft <= 5) return 'ring-2 ring-red-500/80 animate-border-pulse';
    if (timeLeft <= 10) return 'ring-2 ring-orange-500/70';
    if (timeLeft <= 30) return 'ring-2 ring-yellow-500/50';
    return '';
  };

  return (
    <div className="p-4 pb-6">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-foreground font-semibold">Subasta Actual</h4>
        <div className="flex items-center space-x-3">
          <span className="text-lg font-bold text-foreground">${currentProduct.currentBid}</span>
          <AuctionCountdownTimer
            initialTime={currentProduct.timeLeft}
            onTimeUp={onAuctionEnd}
            onBidExtension={handleTimerExtension}
            onTimeUpdate={onTimeUpdate}
            auctionStatus={currentProduct.auctionStatus}
          />
        </div>
      </div>

      {/* Bidder Status Banner */}
      <div className="text-center py-2 px-4 rounded-lg mb-3 font-bold text-sm bg-muted hover:bg-accent/20 text-foreground transition-colors">
        {bidderStatus}
      </div>
      
      <Card className={`bg-card border-border p-4 transition-all duration-300 ${getCardUrgencyClass()}`}>
        <div className="flex items-start space-x-3 mb-4">
          <img 
            src={currentProduct.image} 
            alt={currentProduct.name}
            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h5 className="text-foreground font-bold text-sm mb-1 truncate">{currentProduct.name}</h5>
            <p className="text-foreground/70 text-xs mb-2 line-clamp-2">{currentProduct.description}</p>
            <p className="text-foreground/60 text-xs">${currentProduct.shipping.toFixed(2)} Envío + Impuestos</p>
            
            {/* Auction Status Indicators */}
            {currentProduct.auctionStatus === 'sold' && (
              <div className="mt-2 flex items-center space-x-2">
                <span className="text-xs text-green-600 font-bold">¡VENDIDO!</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-center">
          {currentProduct.auctionStatus !== 'sold' ? (
            <SlideToBid
              currentBid={currentProduct.currentBid}
              onBid={handleSlideToBid}
            />
          ) : (
            <div className="w-full text-center py-4">
              <span className="text-green-600 font-bold text-lg">¡Subasta Terminada!</span>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
