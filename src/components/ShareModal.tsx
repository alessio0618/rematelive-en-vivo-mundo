
import React from 'react';
import { Share, Copy, Facebook, Twitter, MessageCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  streamUrl: string;
  streamTitle: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share className="w-5 h-5" />
            Compartir Stream
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Button
            onClick={handleCopyLink}
            variant="outline"
            className="w-full justify-start gap-3"
          >
            <Copy className="w-4 h-4" />
            Copiar enlace
          </Button>
          
          <Button
            onClick={() => handleSocialShare('twitter')}
            variant="outline"
            className="w-full justify-start gap-3"
          >
            <Twitter className="w-4 h-4" />
            Compartir en Twitter
          </Button>
          
          <Button
            onClick={() => handleSocialShare('facebook')}
            variant="outline"
            className="w-full justify-start gap-3"
          >
            <Facebook className="w-4 h-4" />
            Compartir en Facebook
          </Button>
          
          <Button
            onClick={() => handleSocialShare('whatsapp')}
            variant="outline"
            className="w-full justify-start gap-3"
          >
            <MessageCircle className="w-4 h-4" />
            Compartir en WhatsApp
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
