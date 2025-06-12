
import React, { useState } from 'react';
import { Video, Settings, Users, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface StartLiveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StartLiveModal: React.FC<StartLiveModalProps> = ({
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Video className="w-5 h-5 text-red-500" />
            Iniciar Stream en Vivo
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Título del Stream</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="¿Qué vas a mostrar hoy?"
            />
          </div>

          <div>
            <Label htmlFor="description">Descripción (opcional)</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe tu stream..."
            />
          </div>

          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              id="private"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="private" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Stream privado (solo para practicar)
            </Label>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button onClick={handleStartLive} className="flex-1 bg-red-500 hover:bg-red-600">
              <Video className="w-4 h-4 mr-2" />
              Ir en Vivo
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
