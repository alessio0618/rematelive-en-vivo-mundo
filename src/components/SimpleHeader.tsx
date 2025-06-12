
import React from 'react';
import { Bell, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SimpleHeader = () => {
  return (
    <div className="bg-background border-b border-border mobile-header">
      <div className="flex items-center justify-end p-3">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-foreground h-10 w-10 hover:bg-accent/20">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-foreground h-10 w-10 hover:bg-accent/20">
            <Video className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SimpleHeader;
