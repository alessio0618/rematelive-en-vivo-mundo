
import React from 'react';
import { Video, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const FloatingActionButton: React.FC = () => {
  const navigate = useNavigate();

  const handleGoLive = () => {
    // Add haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    navigate('/subir-en-vivo');
  };

  return (
    <Button
      onClick={handleGoLive}
      className="fixed bottom-20 right-4 w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg z-40 transition-all duration-300 hover:scale-110 active:scale-95"
      size="icon"
    >
      <div className="relative">
        <Video className="w-6 h-6" />
        <Plus className="w-3 h-3 absolute -top-1 -right-1 bg-white text-red-500 rounded-full" />
      </div>
    </Button>
  );
};
