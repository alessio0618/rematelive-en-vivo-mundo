
import React from 'react';
import { useViewportDetection } from '@/hooks/useViewportDetection';
import MobileActivityView from './MobileActivityView';
import DesktopActivityView from './DesktopActivityView';

interface ActivityHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ActivityHistoryModal: React.FC<ActivityHistoryModalProps> = ({ isOpen, onClose }) => {
  const { isMobile } = useViewportDetection();

  if (!isOpen) return null;

  // Mobile full-screen view
  if (isMobile) {
    return <MobileActivityView onClose={onClose} />;
  }

  // Desktop modal view
  return <DesktopActivityView isOpen={isOpen} onClose={onClose} />;
};

export default ActivityHistoryModal;
