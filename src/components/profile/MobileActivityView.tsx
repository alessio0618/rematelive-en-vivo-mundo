
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import ActivityNavigation from './ActivityNavigation';
import ActivitySections from './ActivitySections';
import { useActivityData } from '@/hooks/useActivityData';

interface MobileActivityViewProps {
  onClose: () => void;
}

const MobileActivityView: React.FC<MobileActivityViewProps> = ({ onClose }) => {
  const { activeSection, setActiveSection, purchases, sales, liveStreams, reviews } = useActivityData();

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col">
      {/* Mobile Header */}
      <div className="flex items-center p-4 border-b border-border bg-background">
        <Button variant="ghost" size="sm" onClick={onClose} className="mr-3 p-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-foreground text-lg font-semibold">Mi Actividad</h1>
      </div>

      {/* Mobile Navigation Tabs */}
      <ActivityNavigation 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isMobile={true}
      />

      {/* Mobile Content */}
      <div className="flex-1 overflow-y-auto p-4 bg-background">
        <ActivitySections
          activeSection={activeSection}
          purchases={purchases}
          sales={sales}
          liveStreams={liveStreams}
          reviews={reviews}
        />
      </div>
    </div>
  );
};

export default MobileActivityView;
