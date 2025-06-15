
import React from 'react';
import { Heart, MessageCircle, Share, Zap, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StreamActionsProps {
  isLiked: boolean;
  likeCount: number;
  onLike: () => void;
  onFocusChat: () => void;
  onShare: () => void;
  onBoost: () => void;
  onScreenshot: () => void;
}

export const StreamActions: React.FC<StreamActionsProps> = ({
  isLiked,
  likeCount,
  onLike,
  onFocusChat,
  onShare,
  onBoost,
  onScreenshot
}) => {
  return (
    <div className="absolute bottom-4 right-4 flex flex-col space-y-3">
      <div className="flex flex-col items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className={`bg-black/50 hover:bg-black/70 rounded-full ${isLiked ? 'text-red-500' : 'text-white'}`}
          onClick={onLike}
        >
          <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
        </Button>
        <span className={`text-white text-xs mt-1 ${likeCount !== 234 ? 'animate-bounceCount' : ''}`}>
          {likeCount}
        </span>
      </div>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="bg-black/50 text-white hover:bg-black/70 rounded-full"
        onClick={onFocusChat}
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="bg-black/50 text-white hover:bg-black/70 rounded-full"
        onClick={onShare}
      >
        <Share className="w-6 h-6" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="bg-black/50 text-white hover:bg-black/70 rounded-full"
        onClick={onBoost}
      >
        <Zap className="w-6 h-6" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="bg-black/50 text-white hover:bg-black/70 rounded-full"
        onClick={onScreenshot}
      >
        <Camera className="w-6 h-6" />
      </Button>
    </div>
  );
};
