
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { HelpCircle, MessageSquare, Phone, Mail, Search, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HelpCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpCenterModal: React.FC<HelpCenterModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState('main');
  const [searchQuery, setSearchQuery] = useState('');

  const helpSections = [
    { id: 'faq', title: 'Preguntas Frecuentes', icon: HelpCircle },
    { id: 'contact', title: 'Contactar Soporte', icon: MessageSquare },
    { id: 'guides', title: 'Guías de Usuario', icon: HelpCircle }
  ];

  const faqs = [
    {
      question: '¿Cómo puedo cambiar mi contraseña?',
      answer: 'Ve a Configuración > Seguridad > Contraseña para cambiar tu contraseña.'
    },
    {
      question: '¿Cómo agrego un método de pago?',
      answer: 'En tu perfil, ve a Métodos de Pago y selecciona "Agregar método de pago".'
    },
    {
      question: '¿Cómo inicio una transmisión en vivo?',
      answer: 'Presiona el botón "Subir en Vivo" en la barra de navegación inferior.'
    },
    {
      question: '¿Cómo puedo contactar a un vendedor?',
      answer: 'En la página del producto, presiona "Mensaje" para contactar directamente.'
    }
  ];

  const contactOptions = [
    { 
      title: 'Chat en vivo', 
      description: 'Respuesta inmediata', 
      icon: MessageSquare,
      action: () => toast({ title: "Chat iniciado", description: "Te conectaremos con un agente" })
    },
    { 
      title: 'Email', 
      description: 'soporte@tuapp.com', 
      icon: Mail,
      action: () => toast({ title: "Email", description: "Abriendo cliente de email" })
    },
    { 
      title: 'Teléfono', 
      description: '+52 55 1234 5678', 
      icon: Phone,
      action: () => toast({ title: "Llamada", description: "Iniciando llamada" })
    }
  ];

  const guides = [
    { title: 'Cómo crear tu primera transmisión', category: 'Streaming' },
    { title: 'Configurar tu tienda online', category: 'Ventas' },
    { title: 'Gestionar notificaciones', category: 'Configuración' },
    { title: 'Política de devoluciones', category: 'Compras' }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'main':
        return (
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar ayuda..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Help Sections */}
            <div className="space-y-2">
              {helpSections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <Card key={section.id} className="bg-card border-border cursor-pointer" onClick={() => setActiveSection(section.id)}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <IconComponent className="w-5 h-5 text-foreground" />
                          <span className="text-foreground font-medium">{section.title}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );

      case 'faq':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Button variant="ghost" size="sm" onClick={() => setActiveSection('main')}>
                ← Volver
              </Button>
              <h3 className="text-foreground font-medium">Preguntas Frecuentes</h3>
            </div>
            
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <Card key={index} className="bg-card border-border">
                  <CardContent className="p-4">
                    <h4 className="text-foreground font-medium text-sm mb-2">{faq.question}</h4>
                    <p className="text-muted-foreground text-sm">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Button variant="ghost" size="sm" onClick={() => setActiveSection('main')}>
                ← Volver
              </Button>
              <h3 className="text-foreground font-medium">Contactar Soporte</h3>
            </div>
            
            <div className="space-y-3">
              {contactOptions.map((option, index) => {
                const IconComponent = option.icon;
                return (
                  <Card key={index} className="bg-card border-border cursor-pointer" onClick={option.action}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-foreground" />
                        </div>
                        <div>
                          <h4 className="text-foreground font-medium text-sm">{option.title}</h4>
                          <p className="text-muted-foreground text-sm">{option.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );

      case 'guides':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Button variant="ghost" size="sm" onClick={() => setActiveSection('main')}>
                ← Volver
              </Button>
              <h3 className="text-foreground font-medium">Guías de Usuario</h3>
            </div>
            
            <div className="space-y-3">
              {guides.map((guide, index) => (
                <Card key={index} className="bg-card border-border cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-foreground font-medium text-sm">{guide.title}</h4>
                        <p className="text-muted-foreground text-xs">{guide.category}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Centro de Ayuda</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HelpCenterModal;
