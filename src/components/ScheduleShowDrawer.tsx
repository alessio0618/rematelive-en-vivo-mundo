
import React, { useState } from 'react';
import { Calendar, Clock, Video } from 'lucide-react';
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

interface ScheduleShowDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleShowDrawer: React.FC<ScheduleShowDrawerProps> = ({
  isOpen,
  onClose
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
    onClose();
    setTitle('');
    setDate('');
    setTime('');
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="text-center pb-4">
          <DrawerTitle className="flex items-center justify-center gap-2 text-lg">
            <Calendar className="w-5 h-5 text-green-500" />
            Programar Show
          </DrawerTitle>
        </DrawerHeader>
        
        <div className="px-6 space-y-6">
          <div className="space-y-3">
            <Label htmlFor="showTitle" className="text-base font-medium">
              Título del Show
            </Label>
            <Input
              id="showTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Venta de Ropa de Invierno"
              className="h-12 text-base"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="date" className="text-base font-medium">
              Fecha
            </Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-12 text-base"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="time" className="text-base font-medium">
              Hora
            </Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="h-12 text-base"
            />
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Video className="w-5 h-5" />
              Recibirás una notificación 15 minutos antes del show
            </div>
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
              variant="outline"
              onClick={handleScheduleShow} 
              className="flex-1 h-12 text-base !bg-yellow-400 !hover:bg-yellow-500 !text-black !font-bold !border-yellow-400"
            >
              Programar Show
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
