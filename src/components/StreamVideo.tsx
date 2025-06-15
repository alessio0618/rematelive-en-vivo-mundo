
import React from 'react';
import { Button } from '@/components/ui/button';
import { DoubleTapHandler } from '@/components/DoubleTapHandler';
import { CommentOverlay } from '@/components/CommentOverlay';
import { usePinchZoom } from '@/hooks/usePinchZoom';

interface StreamVideoProps {
  streamData: {
    thumbnail: string;
    sellerName: string;
    sellerAvatar: string;
    rating: number;
  };
  chatMessages: Array<{
    id: number;
    user: string;
    message: string;
    avatar: string;
    timestamp: number;
  }>;
  showComments: boolean;
  isFollowing: boolean;
  onDoubleTapLike: () => void;
  onFollow: () => void;
}

export const StreamVideo: React.FC<StreamVideoProps> = ({
  streamData,
  chatMessages,
  showComments,
  isFollowing,
  onDoubleTapLike,
  onFollow
}) => {
  const { containerRef: zoomRef, scale, resetZoom, transform } = usePinchZoom({
    minZoom: 1,
    maxZoom: 3
  });

  return (
    <div className="relative flex-1 bg-black overflow-hidden">
      <div ref={zoomRef} className="w-full h-full">
        <DoubleTapHandler onLike={onDoubleTapLike}>
          <div 
            className="w-full h-full transition-transform duration-200 origin-center"
            style={{ transform }}
          >
            <img 
              src={streamData.thumbnail} 
              alt="Live stream"
              className="w-full h-full object-cover"
            />
          </div>
        </DoubleTapHandler>
      </div>

      {/* Zoom indicator and reset button */}
      {scale > 1 && (
        <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
          {scale.toFixed(1)}x
        </div>
      )}

      {scale > 1 && (
        <Button
          onClick={resetZoom}
          className="absolute bottom-4 left-4 bg-black/50 text-white hover:bg-black/70"
          size="sm"
        >
          Reset Zoom
        </Button>
      )}
      
      {/* Seller Profile Overlay */}
      <div className="absolute top-4 left-4 right-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src={streamData.sellerAvatar} 
              alt={streamData.sellerName}
              className="w-12 h-12 rounded-full border-2 border-white"
            />
            <div>
              <h3 className="text-white font-bold text-lg">{streamData.sellerName}</h3>
              <div className="flex items-center space-x-2">
                <span className="text-foreground text-sm">★ {streamData.rating}</span>
                <span className="text-white text-sm">•</span>
                <span className="text-white text-sm">Live</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={onFollow}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent/20 ${
              isFollowing 
                ? 'text-foreground border border-foreground' 
                : 'text-foreground border border-transparent'
            }`}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </button>
        </div>
      </div>

      <CommentOverlay comments={chatMessages} isVisible={showComments} />
    </div>
  );
};
