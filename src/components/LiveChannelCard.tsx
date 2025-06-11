
import React from 'react';
import { Eye, Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface LiveChannelCardProps {
  sellerName: string;
  sellerAvatar: string;
  viewerCount: number;
  category: string;
  thumbnail: string;
  isLive?: boolean;
}

const LiveChannelCard = ({ 
  sellerName, 
  sellerAvatar, 
  viewerCount, 
  category, 
  thumbnail, 
  isLive = true 
}: LiveChannelCardProps) => {
  return (
    <Card className="bg-card border-border overflow-hidden hover:bg-card/80 transition-colors cursor-pointer">
      {/* Thumbnail with live indicator */}
      <div className="relative aspect-video">
        <img 
          src={thumbnail} 
          alt={`Canal de ${sellerName}`}
          className="w-full h-full object-cover"
        />
        
        {/* Live indicator */}
        {isLive && (
          <div className="absolute top-2 left-2 live-indicator animate-pulse-live">
            EN VIVO
          </div>
        )}
        
        {/* Viewer count */}
        <div className="absolute top-2 right-2 viewer-count">
          <Eye className="w-3 h-3 inline mr-1" />
          {viewerCount.toLocaleString()}
        </div>

        {/* Category tag */}
        <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {category}
        </div>
      </div>

      {/* Seller info */}
      <div className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img 
              src={sellerAvatar} 
              alt={sellerName}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-sm text-foreground">{sellerName}</p>
              <p className="text-xs text-muted-foreground">
                {viewerCount} viendo ahora
              </p>
            </div>
          </div>
          
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Heart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default LiveChannelCard;
