
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ActivityNavigation from './ActivityNavigation';
import ActivitySections from './ActivitySections';
import { useActivityData } from '@/hooks/useActivityData';

interface DesktopActivityViewProps {
  isOpen: boolean;
  onClose: () => void;
}

const DesktopActivityView: React.FC<DesktopActivityViewProps> = ({ isOpen, onClose }) => {
  const { activeSection, setActiveSection, purchases, sales, liveStreams, reviews } = useActivityData();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Mi Actividad</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Desktop Navigation */}
          <ActivityNavigation 
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            isMobile={false}
          />

          {/* Desktop Content */}
          <div className="mt-4">
            <ActivitySections
              activeSection={activeSection}
              purchases={purchases}
              sales={sales}
              liveStreams={liveStreams}
              reviews={reviews}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DesktopActivityView;
