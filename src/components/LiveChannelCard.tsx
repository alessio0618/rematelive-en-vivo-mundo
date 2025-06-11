
import React from 'react';
import { Eye } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface LiveChannelCardProps {
  sellerName: string;
  sellerAvatar: string;
  viewerCount: number;
  category: string;
  thumbnail: string;
  title: string;
  isLive?: boolean;
}

const LiveChannelCard = ({ 
  sellerName, 
  sellerAvatar, 
  viewerCount, 
  category, 
  thumbnail,
  title,
  isLive = true 
}: LiveChannelCardProps) => {
  return (
    <Card className="bg-card border-none overflow-hidden hover:bg-card/80 transition-colors cursor-pointer rounded-lg">
      {/* Thumbnail with live indicator */}
      <div className="relative aspect-[4/5]">
        <img 
          src={thumbnail} 
          alt={`Canal de ${sellerName}`}
          className="w-full h-full object-cover"
        />
        
        {/* Live indicator */}
        {isLive && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full mr-1 animate-pulse"></div>
            Live • {viewerCount}
          </div>
        )}

        {/* Seller info overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <div className="flex items-center space-x-2 mb-1">
            <img 
              src={sellerAvatar} 
              alt={sellerName}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-white font-medium text-sm">{sellerName}</span>
          </div>
          <h3 className="text-white font-bold text-sm leading-tight mb-1">{title}</h3>
          <p className="text-white text-xs">{category}</p>
        </div>
      </div>
    </Card>
  );
};

export default LiveChannelCard;
