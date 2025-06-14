
import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, Zap, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBidIncrement } from '@/hooks/useBidIncrement';

interface SlideToBidProps {
  currentBid: number;
  onBid: (amount: number) => void;
  onOpenAutoBid?: () => void;
  onOpenCustomBid?: () => void;
}

export const SlideToBid = ({ currentBid, onBid, onOpenAutoBid, onOpenCustomBid }: SlideToBidProps) => {
  const [isSliding, setIsSliding] = useState(false);
  const [slideProgress, setSlideProgress] = useState(0);
  const [hasBid, setHasBid] = useState(false);
  const [lockedBidAmount, setLockedBidAmount] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { getNextBidAmount, getQuickBidOptions } = useBidIncrement();
  
  const nextBidAmount = getNextBidAmount(currentBid);
  const quickBidOptions = getQuickBidOptions(currentBid);
  
  // Get the display price - locked when sliding starts
  const getDisplayPrice = () => {
    if (hasBid) return '✓ Bid!';
    if (lockedBidAmount !== null) return `$${lockedBidAmount}`;
    return `$${nextBidAmount}`;
  };

  // Enhanced visual effects based on urgency
  const getSliderGlowEffect = () => {
    if (hasBid) return '';
    return 'hover:shadow-lg hover:shadow-blue-500/20 transition-shadow duration-300';
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
      e.preventDefault(); // Prevent scrolling

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

  const handleQuickBid = (amount: number) => {
    if (hasBid) return;
    onBid(amount);
    setHasBid(true);
    
    // Reset after 2 seconds
    setTimeout(() => {
      setHasBid(false);
    }, 2000);
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-3">
      {/* Quick Bid Options */}
      <div className="flex space-x-2">
        {quickBidOptions.slice(1).map((amount, index) => (
          <Button
            key={amount}
            variant="outline"
            size="sm"
            onClick={() => handleQuickBid(amount)}
            disabled={hasBid}
            className="flex-1 text-xs h-8 bg-muted border-accent hover:bg-accent/20"
          >
            ${amount}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenCustomBid}
          disabled={hasBid}
          className="h-8 px-2 bg-muted border-accent hover:bg-accent/20"
        >
          <DollarSign className="w-3 h-3" />
        </Button>
      </div>

      {/* Enhanced Main Slide to Bid */}
      <div className="w-full">
        <div
          ref={containerRef}
          className={`relative h-12 bg-secondary rounded-full overflow-hidden cursor-pointer select-none border border-accent touch-none ${getSliderGlowEffect()}`}
          onMouseDown={handleStart}
          onTouchStart={handleStart}
        >
          {/* Background track */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <span className="text-foreground text-sm font-medium drop-shadow-md">
              {getDisplayPrice()}
            </span>
          </div>

          {/* Progress fill */}
          <div
            className="absolute left-0 top-0 h-full transition-all duration-75 ease-out rounded-full z-10"
            style={{ 
              width: `${slideProgress * 100}%`,
              backgroundColor: slideProgress >= 1 ? '#22c55e' : hasBid ? '#22c55e' : 'rgb(99, 102, 241)'
            }}
          />

          {/* Slider button */}
          <div
            ref={sliderRef}
            className="absolute left-1 top-1 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-75 ease-out border-2 border-white z-30"
            style={{
              transform: `translateX(${slideProgress * (containerRef.current ? containerRef.current.offsetWidth - 48 : 200)}px)`,
              backgroundColor: hasBid ? '#22c55e' : slideProgress >= 1 ? '#22c55e' : '#6366f1'
            }}
          >
            {hasBid ? (
              <span className="text-white font-bold text-lg">✓</span>
            ) : (
              <ChevronRight className="w-5 h-5 text-white" />
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

      {/* Auto-Bid Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onOpenAutoBid}
        className="w-full h-8 text-xs text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
      >
        <Zap className="w-3 h-3 mr-1" />
        Auto-Bid
      </Button>
    </div>
  );
};
