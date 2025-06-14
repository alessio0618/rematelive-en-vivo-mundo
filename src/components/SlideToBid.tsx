
import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBidIncrement } from '@/hooks/useBidIncrement';

interface SlideToBidProps {
  currentBid: number;
  onBid: (amount: number) => void;
  onOpenAutoBid?: () => void;
}

export const SlideToBid = ({ currentBid, onBid, onOpenAutoBid }: SlideToBidProps) => {
  const [isSliding, setIsSliding] = useState(false);
  const [slideProgress, setSlideProgress] = useState(0);
  const [hasBid, setHasBid] = useState(false);
  const [lockedBidAmount, setLockedBidAmount] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { getNextBidAmount } = useBidIncrement();
  
  const nextBidAmount = getNextBidAmount(currentBid);
  
  // Get the display price - locked when sliding starts
  const getDisplayPrice = () => {
    if (hasBid) return '✓ Bid Placed!';
    if (lockedBidAmount !== null) return `$${lockedBidAmount}`;
    return `Slide to bid $${nextBidAmount}`;
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isSliding || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const progress = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
      setSlideProgress(progress);

      // Must be 100% to complete the bid
      if (progress >= 1) {
        completeBid();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isSliding || !containerRef.current) return;
      e.preventDefault();

      const rect = containerRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      const progress = Math.min(Math.max((touch.clientX - rect.left) / rect.width, 0), 1);
      setSlideProgress(progress);

      // Must be 100% to complete the bid
      if (progress >= 1) {
        completeBid();
      }
    };

    const handleMouseUp = () => {
      if (isSliding && slideProgress < 1) {
        // Reset if not slid to 100%
        setSlideProgress(0);
        setLockedBidAmount(null);
      }
      setIsSliding(false);
    };

    if (isSliding) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [isSliding, slideProgress]);

  const completeBid = () => {
    const bidAmount = lockedBidAmount || nextBidAmount;
    setHasBid(true);
    setSlideProgress(1);
    setIsSliding(false);
    onBid(bidAmount);
    
    // Reset after 2 seconds to allow new bids
    setTimeout(() => {
      setHasBid(false);
      setSlideProgress(0);
      setLockedBidAmount(null);
    }, 2000);
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (hasBid) return;
    e.preventDefault();
    setIsSliding(true);
    // Lock the bid amount when sliding starts
    setLockedBidAmount(nextBidAmount);
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-4">
      {/* Main Slide to Bid - Enhanced with consistent colors */}
      <div className="w-full">
        <div
          ref={containerRef}
          className="relative h-14 bg-muted rounded-full overflow-hidden cursor-pointer select-none border border-border touch-none transition-shadow duration-300 hover:shadow-md"
          onMouseDown={handleStart}
          onTouchStart={handleStart}
        >
          {/* Background track */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <span className="text-foreground text-sm font-medium px-4 text-center">
              {getDisplayPrice()}
            </span>
          </div>

          {/* Progress fill with app-consistent colors */}
          <div
            className="absolute left-0 top-0 h-full transition-all duration-75 ease-out rounded-full z-10"
            style={{ 
              width: `${slideProgress * 100}%`,
              backgroundColor: slideProgress >= 1 ? 'rgb(34, 197, 94)' : hasBid ? 'rgb(34, 197, 94)' : 'hsl(var(--foreground))'
            }}
          />

          {/* Slider button with app-consistent styling */}
          <div
            ref={sliderRef}
            className="absolute left-1 top-1 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-75 ease-out border-2 border-background z-30"
            style={{
              transform: `translateX(${slideProgress * (containerRef.current ? containerRef.current.offsetWidth - 56 : 200)}px)`,
              backgroundColor: hasBid ? 'rgb(34, 197, 94)' : slideProgress >= 1 ? 'rgb(34, 197, 94)' : 'hsl(var(--foreground))'
            }}
          >
            {hasBid ? (
              <span className="text-white font-bold text-lg">✓</span>
            ) : (
              <ChevronRight className="w-6 h-6 text-background" />
            )}
          </div>

          {/* Success state overlay */}
          {hasBid && (
            <div className="absolute inset-0 rounded-full flex items-center justify-center z-40 bg-green-500">
              <span className="text-white text-sm font-bold">✓ Bid Placed!</span>
            </div>
          )}
        </div>
      </div>

      {/* Auto-Bid Button with improved styling */}
      {onOpenAutoBid && (
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenAutoBid}
          className="w-full h-10 text-sm bg-background border-border text-foreground hover:bg-muted transition-colors"
        >
          <Zap className="w-4 h-4 mr-2" />
          Auto-Bid
        </Button>
      )}
    </div>
  );
};
