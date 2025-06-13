
import React, { useState } from 'react';
import { Video, Eye } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface StartLiveDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StartLiveDrawer: React.FC<StartLiveDrawerProps> = ({
  isOpen,
  onClose
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const { toast } = useToast();

  const handleStartLive = () => {
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresa un título para tu stream",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "¡Stream iniciado!",
      description: `Tu stream "${title}" está ahora en vivo`
    });
    onClose();
    setTitle('');
    setDescription('');
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="text-center pb-4">
          <DrawerTitle className="flex items-center justify-center gap-2 text-lg">
            <Video className="w-5 h-5 text-red-500" />
            Iniciar Stream en Vivo
          </DrawerTitle>
        </DrawerHeader>
        
        <div className="px-6 space-y-6">
          <div className="space-y-3">
            <Label htmlFor="title" className="text-base font-medium">
              Título del Stream
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="¿Qué vas a mostrar hoy?"
              className="h-12 text-base"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="description" className="text-base font-medium">
              Descripción (opcional)
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe tu stream..."
              className="h-12 text-base"
            />
          </div>

          <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
            <input 
              type="checkbox" 
              id="private"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              className="w-5 h-5 rounded"
            />
            <Label htmlFor="private" className="flex items-center gap-3 text-base cursor-pointer">
              <Eye className="w-5 h-5" />
              Stream privado (solo para practicar)
            </Label>
          </div>
        </div>

        <DrawerFooter className="pt-6 pb-8 px-6">
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={onClose} 
              className="flex-1 h-12 text-base"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleStartLive} 
              className="flex-1 h-12 text-base bg-red-500 hover:bg-red-600"
            >
              <Video className="w-5 h-5 mr-2" />
              Ir en Vivo
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
