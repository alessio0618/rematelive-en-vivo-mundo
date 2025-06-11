
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

  const nextBidAmount = currentBid + 5; // Increment by $5

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isSliding || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const progress = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
      setSlideProgress(progress);

      // If slid 80% or more, complete the bid
      if (progress >= 0.8) {
        completeBid();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isSliding || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      const progress = Math.min(Math.max((touch.clientX - rect.left) / rect.width, 0), 1);
      setSlideProgress(progress);

      // If slid 80% or more, complete the bid
      if (progress >= 0.8) {
        completeBid();
      }
    };

    const handleMouseUp = () => {
      if (isSliding && slideProgress < 0.8) {
        // Reset if not slid far enough
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

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="relative h-12 bg-gray-700 rounded-full overflow-hidden cursor-pointer select-none"
        onMouseDown={handleStart}
        onTouchStart={handleStart}
      >
        {/* Background track */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-sm font-medium">
            {hasBid ? '¡Pujaste!' : `Desliza para pujar $${nextBidAmount}`}
          </span>
        </div>

        {/* Progress fill */}
        <div
          className="absolute left-0 top-0 h-full bg-yellow-400 transition-all duration-100 ease-out rounded-full"
          style={{ width: `${slideProgress * 100}%` }}
        />

        {/* Slider button */}
        <div
          ref={sliderRef}
          className="absolute left-1 top-1 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg transition-all duration-100 ease-out"
          style={{
            transform: `translateX(${slideProgress * (containerRef.current?.offsetWidth - 48 || 0)}px)`,
            backgroundColor: hasBid ? '#22c55e' : '#fbbf24'
          }}
        >
          {hasBid ? (
            <div className="w-2 h-2 bg-white rounded-full" />
          ) : (
            <ChevronRight className="w-5 h-5 text-black" />
          )}
        </div>

        {/* Success state overlay */}
        {hasBid && (
          <div className="absolute inset-0 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">¡Puja exitosa!</span>
          </div>
        )}
      </div>
    </div>
  );
};
