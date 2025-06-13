
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, MessageSquare, HelpCircle, Phone, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HelpCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpCenterModal: React.FC<HelpCenterModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      id: 1,
      question: '¿Cómo puedo hacer una devolución?',
      answer: 'Puedes solicitar una devolución dentro de los 30 días posteriores a la compra. Ve a tu historial de pedidos y selecciona "Solicitar devolución".',
      category: 'Compras'
    },
    {
      id: 2,
      question: '¿Cómo inicio una transmisión en vivo?',
      answer: 'Ve a la sección "Subir en Vivo" en la app, selecciona tus productos y presiona "Iniciar transmisión".',
      category: 'Vendedor'
    },
    {
      id: 3,
      question: '¿Cómo cambio mi método de pago?',
      answer: 'Ve a Perfil > Pagos y Envíos > Métodos de pago para agregar, editar o eliminar tus métodos de pago.',
      category: 'Cuenta'
    },
    {
      id: 4,
      question: '¿Por qué no recibo notificaciones?',
      answer: 'Verifica que las notificaciones estén habilitadas en Perfil > Configuración de Notificaciones y en la configuración de tu dispositivo.',
      category: 'Técnico'
    }
  ];

  const contactOptions = [
    {
      title: 'Chat en vivo',
      description: 'Habla con nuestro equipo ahora',
      icon: MessageSquare,
      action: () => {
        toast({
          title: "Próximamente",
          description: "El chat en vivo estará disponible pronto",
        });
      }
    },
    {
      title: 'Llamada telefónica',
      description: 'Lunes a Viernes, 9AM - 6PM',
      icon: Phone,
      action: () => {
        toast({
          title: "Número de soporte",
          description: "📞 +52 55 1234 5678",
        });
      }
    },
    {
      title: 'Enviar email',
      description: 'Te responderemos en 24 horas',
      icon: Mail,
      action: () => {
        toast({
          title: "Email de soporte",
          description: "📧 soporte@tuapp.com",
        });
      }
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Centro de Ayuda</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="faq" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="faq">Preguntas Frecuentes</TabsTrigger>
            <TabsTrigger value="contact">Contacto</TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="space-y-4 mt-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar en preguntas frecuentes..."
                className="pl-10"
              />
            </div>

            {/* FAQs */}
            <div className="space-y-3">
              {filteredFaqs.map((faq) => (
                <Card key={faq.id} className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                        <HelpCircle className="w-4 h-4 text-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-foreground font-medium text-sm mb-2">{faq.question}</h3>
                        <p className="text-muted-foreground text-xs leading-relaxed">{faq.answer}</p>
                        <span className="inline-block mt-2 text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                          {faq.category}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredFaqs.length === 0 && searchQuery && (
              <div className="text-center py-8">
                <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No se encontraron resultados para "{searchQuery}"</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="contact" className="space-y-4 mt-4">
            <div className="text-center mb-6">
              <h3 className="text-foreground font-medium mb-2">¿Necesitas más ayuda?</h3>
              <p className="text-muted-foreground text-sm">Nuestro equipo está aquí para ayudarte</p>
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
                        <div className="flex-1">
                          <h3 className="text-foreground font-medium text-sm">{option.title}</h3>
                          <p className="text-muted-foreground text-xs">{option.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium text-foreground mb-3">Acciones rápidas</h4>
              <div className="grid grid-cols-1 gap-2">
                <Button variant="outline" size="sm" onClick={() => toast({ title: "Próximamente", description: "Esta función estará disponible pronto" })}>
                  Reportar un problema
                </Button>
                <Button variant="outline" size="sm" onClick={() => toast({ title: "Próximamente", description: "Esta función estará disponible pronto" })}>
                  Sugerir una mejora
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default HelpCenterModal;
