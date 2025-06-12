
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
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextBidAmount = currentBid + 1; // Increment by $1

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
    onBid(nextBidAmount);
    
    // Reset after 2 seconds to allow new bids
    setTimeout(() => {
      setHasBid(false);
      setSlideProgress(0);
    }, 2000);
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (hasBid) return;
    e.preventDefault();
    setIsSliding(true);
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
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-foreground text-sm font-medium">
            {hasBid ? '¡Bid!' : `$${nextBidAmount}`}
          </span>
        </div>

        {/* Progress fill */}
        <div
          className="absolute left-0 top-0 h-full bg-accent transition-all duration-75 ease-out rounded-full"
          style={{ width: `${slideProgress * 100}%` }}
        />

        {/* Slider button */}
        <div
          ref={sliderRef}
          className="absolute left-0.5 top-0.5 w-9 h-9 bg-accent rounded-full flex items-center justify-center shadow-md transition-all duration-75 ease-out border border-accent z-10"
          style={{
            transform: `translateX(${slideProgress * maxTranslation}px)`,
            backgroundColor: hasBid ? '#22c55e' : 'rgb(115, 115, 115)'
          }}
        >
          {hasBid ? (
            <div className="w-2 h-2 bg-white rounded-full" />
          ) : (
            <ChevronRight className="w-4 h-4 text-background" />
          )}
        </div>

        {/* Success state overlay */}
        {hasBid && (
          <div className="absolute inset-0 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">✓</span>
          </div>
        )}
      </div>
    </div>
  );
};
