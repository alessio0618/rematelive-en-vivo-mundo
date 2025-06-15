
import React, { useState } from 'react';
import { Calendar, Clock, Video } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface ScheduleShowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule?: () => void;
}

export const ScheduleShowModal: React.FC<ScheduleShowModalProps> = ({
  isOpen,
  onClose,
  onSchedule
}) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const { toast } = useToast();

  const handleScheduleShow = () => {
    if (!title.trim() || !date || !time) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "¡Show programado!",
      description: `"${title}" programado para ${date} a las ${time}`
    });
    
    if (onSchedule) {
      onSchedule();
    }
    
    onClose();
    setTitle('');
    setDate('');
    setTime('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-green-500" />
            Programar Show
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="showTitle">Título del Show</Label>
            <Input
              id="showTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Venta de Ropa de Invierno"
            />
          </div>

          <div>
            <Label htmlFor="date">Fecha</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="time">Hora</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className="bg-muted p-3 rounded-md">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Video className="w-4 h-4" />
              Recibirás una notificación 15 minutos antes del show
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button onClick={handleScheduleShow} className="flex-1">
              Programar Show
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
