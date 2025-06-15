
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
    <div className="h-screen bg-background">
      <div 
        ref={containerRef}
        className={`h-full relative overflow-hidden ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} pb-16 box-border`}
        style={{ touchAction: 'none' }}
      >
        <LiveStreamSlide 
          streamData={currentStream}
          isActive={true}
        />
      </div>
      
      <BottomNavBar />
    </div>
  );
};

export default LiveStream;
