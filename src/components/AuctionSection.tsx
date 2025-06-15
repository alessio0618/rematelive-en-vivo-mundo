
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
}

export const AuctionSection: React.FC<AuctionSectionProps> = ({
  currentProduct,
  bidderStatus,
  onBid,
  onAuctionEnd
}) => {
  return (
    <div className="p-4 pb-6">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-foreground font-semibold">Subasta Actual</h4>
        <div className="flex items-center space-x-3">
          <span className="text-lg font-bold text-foreground">${currentProduct.currentBid}</span>
          <AuctionCountdownTimer
            initialTime={currentProduct.timeLeft}
            onTimeUp={onAuctionEnd}
            onBidPlaced={currentProduct.auctionStatus === 'extended' ? () => {} : undefined}
            auctionStatus={currentProduct.auctionStatus}
          />
        </div>
      </div>

      {/* Bidder Status Banner */}
      <div className="text-center py-2 px-4 rounded-lg mb-3 font-bold text-sm bg-muted hover:bg-accent/20 text-foreground transition-colors">
        {bidderStatus}
      </div>
      
      <Card className={`bg-card border-border p-4 transition-all duration-300 ${
        currentProduct.auctionStatus === 'ending' ? 'ring-2 ring-orange-500 ring-opacity-50' :
        currentProduct.auctionStatus === 'extended' ? 'ring-2 ring-yellow-500 ring-opacity-50' :
        currentProduct.auctionStatus === 'sold' ? 'ring-2 ring-green-500 ring-opacity-50' : ''
      }`}>
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
            {currentProduct.auctionStatus === 'extended' && (
              <div className="mt-2 flex items-center space-x-2">
                <Zap className="w-3 h-3 text-yellow-500" />
                <span className="text-xs text-yellow-600 font-medium">¡Subasta Extendida!</span>
              </div>
            )}
            
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
              onBid={(amount) => onBid(currentProduct.id, amount)}
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
