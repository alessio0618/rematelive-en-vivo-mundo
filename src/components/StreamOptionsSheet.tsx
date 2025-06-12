
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Flag, Settings, VolumeX, UserX, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StreamOptionsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  sellerName: string;
}

export const StreamOptionsSheet: React.FC<StreamOptionsSheetProps> = ({
  isOpen,
  onClose,
  sellerName
}) => {
  const { toast } = useToast();

  const handleReport = () => {
    toast({
      title: "Reporte enviado",
      description: `Tu reporte sobre ${sellerName} ha sido enviado`
    });
    onClose();
  };

  const handleMute = () => {
    toast({
      title: "Stream silenciado",
      description: "Has silenciado este stream"
    });
    onClose();
  };

  const handleBlock = () => {
    toast({
      title: "Usuario bloqueado",
      description: `Has bloqueado a ${sellerName}`
    });
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-auto">
        <SheetHeader>
          <SheetTitle>Opciones del Stream</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-3 mt-4">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3"
            onClick={() => onClose()}
          >
            <Info className="w-4 h-4" />
            Información del vendedor
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start gap-3"
            onClick={() => onClose()}
          >
            <Settings className="w-4 h-4" />
            Configuración de calidad
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start gap-3"
            onClick={handleMute}
          >
            <VolumeX className="w-4 h-4" />
            Silenciar stream
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-orange-500"
            onClick={handleBlock}
          >
            <UserX className="w-4 h-4" />
            Bloquear usuario
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-red-500"
            onClick={handleReport}
          >
            <Flag className="w-4 h-4" />
            Reportar stream
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
