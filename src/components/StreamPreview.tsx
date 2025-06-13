
import React, { useState } from 'react';
import { Eye, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useLongPress } from '@/hooks/useLongPress';
import { useNavigate } from 'react-router-dom';

interface StreamPreviewProps {
  stream: {
    id: string;
    sellerName: string;
    sellerAvatar: string;
    viewerCount: number;
    category: string;
    title: string;
    thumbnail: string;
    isLive: boolean;
  };
  onPreview?: (stream: any) => void;
}

export const StreamPreview: React.FC<StreamPreviewProps> = ({ stream, onPreview }) => {
  const navigate = useNavigate();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleLongPress = () => {
    console.log('Long press triggered for:', stream.sellerName);
    setIsPreviewOpen(true);
    onPreview?.(stream);
  };

  const handleClick = (event: React.MouseEvent) => {
    // Only navigate if it wasn't a long press
    if (!isPreviewOpen) {
      console.log('Navigating to stream:', stream.sellerName);
      navigate(`/live/${stream.sellerName}`);
    }
  };

  const longPressHandlers = useLongPress({
    onLongPress: handleLongPress,
    delay: 300
  });

  return (
    <>
      <Card 
        className={`bg-card border-border overflow-hidden cursor-pointer rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 ${
          isPreviewOpen ? 'ring-2 ring-destructive' : ''
        }`}
        onClick={handleClick}
        {...longPressHandlers}
      >
        <div className="relative aspect-[4/5]">
          <img 
            src={stream.thumbnail} 
            alt={`Canal de ${stream.sellerName}`}
            className="w-full h-full object-cover"
          />
          
          {/* Live indicator */}
          {stream.isLive && (
            <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded flex items-center">
              <div className="w-1.5 h-1.5 bg-destructive-foreground rounded-full mr-1 animate-pulse"></div>
              Live • {stream.viewerCount}
            </div>
          )}

          {/* Preview indicator */}
          <div className="absolute top-2 right-2 bg-background/80 text-foreground text-xs px-2 py-1 rounded flex items-center">
            <Eye className="w-3 h-3 mr-1" />
            Hold
          </div>

          {/* Seller info overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-3">
            <div className="flex items-center space-x-2 mb-1">
              <img 
                src={stream.sellerAvatar} 
                alt={stream.sellerName}
                className="w-6 h-6 rounded-full object-cover border border-border"
              />
              <span className="text-foreground font-medium text-sm">{stream.sellerName}</span>
            </div>
            <h3 className="text-foreground font-bold text-sm leading-tight mb-1 line-clamp-2">{stream.title}</h3>
            <p className="text-muted-foreground text-xs">{stream.category}</p>
          </div>
        </div>
      </Card>

      {/* Preview Modal */}
      {isPreviewOpen && (
        <div 
          className="fixed inset-0 bg-background/80 z-50 flex items-end"
          onClick={() => setIsPreviewOpen(false)}
        >
          <div className="w-full bg-card rounded-t-lg p-4 animate-slide-in-bottom border-t border-border">
            <div className="w-12 h-1 bg-muted rounded mx-auto mb-4"></div>
            <div className="flex items-center space-x-3 mb-3">
              <img 
                src={stream.sellerAvatar} 
                alt={stream.sellerName}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-bold text-lg text-card-foreground">{stream.sellerName}</h3>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{stream.viewerCount} viewers</span>
                  <span>•</span>
                  <span>{stream.category}</span>
                </div>
              </div>
            </div>
            <p className="text-sm mb-4 text-card-foreground">{stream.title}</p>
            <button 
              onClick={() => {
                setIsPreviewOpen(false);
                navigate(`/live/${stream.sellerName}`);
              }}
              className="w-full bg-destructive text-destructive-foreground py-3 rounded-lg font-medium hover:bg-destructive/90 transition-colors"
            >
              Join Stream
            </button>
          </div>
        </div>
      )}
    </>
  );
};
