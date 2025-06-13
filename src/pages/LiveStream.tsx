
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSwipeNavigation } from '@/hooks/useSwipeNavigation';
import { useLiveStreamData } from '@/hooks/useLiveStreamData';
import { LiveStreamSlide } from '@/components/LiveStreamSlide';
import BottomNavBar from '@/components/BottomNavBar';

const LiveStream = () => {
  const { sellerId } = useParams<{ sellerId: string }>();
  
  const {
    currentStream,
    goToNextStream,
    goToPreviousStream
  } = useLiveStreamData(sellerId || '');

  const { containerRef, isDragging } = useSwipeNavigation({
    onSwipeUp: goToNextStream,
    onSwipeDown: goToPreviousStream,
    threshold: 50,
    velocityThreshold: 0.3
  });

  if (!currentStream) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Stream not found</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <div 
        ref={containerRef}
        className={`flex-1 relative overflow-hidden ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ touchAction: 'none' }}
      >
        <LiveStreamSlide 
          streamData={currentStream}
          isActive={true}
        />
        
        {/* Swipe indicator */}
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex flex-col items-center space-y-2 opacity-50 pointer-events-none">
          <div className="w-1 h-8 bg-white/30 rounded-full"></div>
          <div className="text-white/50 text-xs rotate-90 whitespace-nowrap">Swipe up</div>
          <div className="w-1 h-8 bg-white/30 rounded-full"></div>
        </div>
      </div>
      
      <BottomNavBar />
    </div>
  );
};

export default LiveStream;
