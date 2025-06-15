
import React from 'react';
import { ArrowLeft, MoreHorizontal, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface LiveStreamHeaderProps {
  streamData: {
    viewerCount: number;
  };
  onShowOptions: () => void;
}

export const LiveStreamHeader: React.FC<LiveStreamHeaderProps> = ({ 
  streamData, 
  onShowOptions 
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between p-4 border-b border-border">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate('/')}
        className="text-foreground hover:bg-transparent"
      >
        <ArrowLeft className="w-6 h-6" />
      </Button>
      
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-1 bg-red-500 text-white px-2 py-1 rounded-full">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <Users className="w-4 h-4" />
          <span className="text-sm font-medium">{streamData.viewerCount}</span>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-foreground hover:bg-transparent"
          onClick={onShowOptions}
        >
          <MoreHorizontal className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};
