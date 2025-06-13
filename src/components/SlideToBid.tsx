
import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

interface SlideToBidProps {
  currentBid: number;
  onBid: (amount: number) => void;
}

export const SlideToBid = ({ currentBid, onBid }: SlideToBidProps) => {
  const [isSliding, setIsSliding] = useState(false);
  const [slideProgress, setSlideProgress] = useState(0);
  const [hasBid, setHasBid] = useState(false);
  const [lockedBidAmount, setLockedBidAmount] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextBidAmount = currentBid + 1; // Increment by $1
  
  // Get the display price - locked when sliding starts
  const getDisplayPrice = () => {
    if (hasBid) return 'Bid!';
    if (lockedBidAmount !== null) return `$${lockedBidAmount}`;
    return `$${nextBidAmount}`;
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
      document.addEventListener('touchmove', handleTouchMove);
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
    setHasBid(true);
    setSlideProgress(1);
    setIsSliding(false);
    onBid(lockedBidAmount || nextBidAmount);
    
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

  // Calculate the maximum translation distance (container width minus button width)
  const maxTranslation = containerRef.current ? containerRef.current.offsetWidth - 40 : 140;

  return (
    <div style={{ width: '180px' }}>
      <div
        ref={containerRef}
        className="relative h-10 bg-secondary rounded-full overflow-hidden cursor-pointer select-none border border-accent"
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
            backgroundColor: slideProgress >= 1 ? '#ffc107' : 'rgb(85, 85, 85)'
          }}
        />

        {/* Slider button */}
        <div
          ref={sliderRef}
          className="absolute left-0.5 top-0.5 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-75 ease-out border border-accent z-30"
          style={{
            transform: `translateX(${slideProgress * maxTranslation}px)`,
            backgroundColor: hasBid ? '#ffc107' : slideProgress >= 1 ? '#ffc107' : 'rgb(115, 115, 115)'
          }}
        >
          {hasBid ? (
            <div className="w-2 h-2 bg-black rounded-full" />
          ) : (
            <ChevronRight className="w-4 h-4 text-background" />
          )}
        </div>

        {/* Success state overlay */}
        {hasBid && (
          <div className="absolute inset-0 rounded-full flex items-center justify-center z-40" style={{ backgroundColor: '#ffc107' }}>
            <span className="text-black text-sm font-medium">✓</span>
          </div>
        )}
      </div>
    </div>
  );
};
