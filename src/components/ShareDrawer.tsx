
import React from 'react';
import { Share, Copy, Facebook, Twitter, MessageCircle } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ShareDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  streamUrl: string;
  streamTitle: string;
}

export const ShareDrawer: React.FC<ShareDrawerProps> = ({
  isOpen,
  onClose,
  streamUrl,
  streamTitle
}) => {
  const { toast } = useToast();

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(streamUrl);
      toast({
        title: "¡Enlace copiado!",
        description: "El enlace del stream se ha copiado al portapapeles"
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo copiar el enlace",
        variant: "destructive"
      });
    }
  };

  const handleSocialShare = (platform: string) => {
    const encodedTitle = encodeURIComponent(streamTitle);
    const encodedUrl = encodeURIComponent(streamUrl);
    
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
      onClose();
    }
  };

  const shareOptions = [
    {
      icon: Copy,
      label: 'Copiar enlace',
      action: handleCopyLink,
      color: 'text-blue-500'
    },
    {
      icon: Twitter,
      label: 'Twitter',
      action: () => handleSocialShare('twitter'),
      color: 'text-blue-400'
    },
    {
      icon: Facebook,
      label: 'Facebook',
      action: () => handleSocialShare('facebook'),
      color: 'text-blue-600'
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      action: () => handleSocialShare('whatsapp'),
      color: 'text-green-500'
    }
  ];

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[70vh]">
        <DrawerHeader className="text-center pb-4">
          <DrawerTitle className="flex items-center justify-center gap-2 text-lg">
            <Share className="w-5 h-5" />
            Compartir Stream
          </DrawerTitle>
        </DrawerHeader>
        
        <div className="px-6 pb-8 space-y-3">
          {shareOptions.map((option, index) => {
            const IconComponent = option.icon;
            return (
              <Button
                key={index}
                onClick={option.action}
                variant="outline"
                className="w-full h-14 justify-start gap-4 text-base hover:bg-accent transition-colors"
              >
                <IconComponent className={`w-6 h-6 ${option.color}`} />
                {option.label}
              </Button>
            );
          })}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
