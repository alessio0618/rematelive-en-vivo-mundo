
import React, { useState } from 'react';
import { Bell, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { StartLiveModal } from '@/components/StartLiveModal';

const SimpleHeader = () => {
  const navigate = useNavigate();
  const [isStartLiveModalOpen, setIsStartLiveModalOpen] = useState(false);

  const handleNotificationsClick = () => {
    navigate('/notificaciones');
  };

  const handleVideoClick = () => {
    setIsStartLiveModalOpen(true);
  };

  return (
    <>
      <div className="bg-background border-b border-border mobile-header">
        <div className="flex items-center justify-end p-3">
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-foreground h-10 w-10 hover:bg-accent/20"
              onClick={handleNotificationsClick}
            >
              <Bell className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-foreground h-10 w-10 hover:bg-accent/20"
              onClick={handleVideoClick}
            >
              <Video className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <StartLiveModal 
        isOpen={isStartLiveModalOpen}
        onClose={() => setIsStartLiveModalOpen(false)}
      />
    </>
  );
};

export default SimpleHeader;
