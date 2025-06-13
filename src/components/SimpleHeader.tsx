
import React, { useState } from 'react';
import { Bell, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { StartLiveDrawer } from '@/components/StartLiveDrawer';

const SimpleHeader = () => {
  const navigate = useNavigate();
  const [isStartLiveDrawerOpen, setIsStartLiveDrawerOpen] = useState(false);

  const handleNotificationsClick = () => {
    navigate('/notificaciones');
  };

  const handleVideoClick = () => {
    setIsStartLiveDrawerOpen(true);
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

      <StartLiveDrawer 
        isOpen={isStartLiveDrawerOpen}
        onClose={() => setIsStartLiveDrawerOpen(false)}
      />
    </>
  );
};

export default SimpleHeader;
