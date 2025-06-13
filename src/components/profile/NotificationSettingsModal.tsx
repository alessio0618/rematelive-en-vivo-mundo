
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Bell, Mail, MessageSquare, ShoppingBag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NotificationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationSettingsModal: React.FC<NotificationSettingsModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: false,
    orderUpdates: true,
    newMessages: true,
    promotions: false,
    liveStreams: true,
    newsletters: false,
    soundEnabled: true
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    
    toast({
      title: "Configuración actualizada",
      description: "Tus preferencias han sido guardadas",
    });
  };

  const notificationGroups = [
    {
      title: 'Notificaciones generales',
      icon: Bell,
      items: [
        {
          key: 'pushNotifications' as keyof typeof settings,
          label: 'Notificaciones push',
          description: 'Recibir notificaciones en el dispositivo'
        },
        {
          key: 'emailNotifications' as keyof typeof settings,
          label: 'Notificaciones por email',
          description: 'Recibir notificaciones en tu correo'
        },
        {
          key: 'soundEnabled' as keyof typeof settings,
          label: 'Sonidos',
          description: 'Reproducir sonidos para notificaciones'
        }
      ]
    },
    {
      title: 'Actividad de compras',
      icon: ShoppingBag,
      items: [
        {
          key: 'orderUpdates' as keyof typeof settings,
          label: 'Actualizaciones de pedidos',
          description: 'Estado de envíos y entregas'
        },
        {
          key: 'liveStreams' as keyof typeof settings,
          label: 'Transmisiones en vivo',
          description: 'Cuando inicien shows que sigues'
        }
      ]
    },
    {
      title: 'Comunicación',
      icon: MessageSquare,
      items: [
        {
          key: 'newMessages' as keyof typeof settings,
          label: 'Mensajes nuevos',
          description: 'Mensajes directos de vendedores'
        }
      ]
    },
    {
      title: 'Marketing',
      icon: Mail,
      items: [
        {
          key: 'promotions' as keyof typeof settings,
          label: 'Promociones y ofertas',
          description: 'Descuentos y ofertas especiales'
        },
        {
          key: 'newsletters' as keyof typeof settings,
          label: 'Boletín informativo',
          description: 'Noticias y actualizaciones de la plataforma'
        }
      ]
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Configuración de Notificaciones</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {notificationGroups.map((group, groupIndex) => {
            const IconComponent = group.icon;
            return (
              <Card key={groupIndex} className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <IconComponent className="w-5 h-5 text-foreground" />
                    <h3 className="text-sm font-medium text-foreground">{group.title}</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {group.items.map((item) => (
                      <div key={item.key} className="flex items-center justify-between">
                        <div className="flex-1">
                          <Label htmlFor={item.key} className="text-sm font-medium cursor-pointer">
                            {item.label}
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                        <Switch
                          id={item.key}
                          checked={settings[item.key]}
                          onCheckedChange={() => handleToggle(item.key)}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationSettingsModal;
