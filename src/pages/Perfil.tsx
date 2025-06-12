
import React from 'react';
import { CreditCard, MapPin, Bell, HelpCircle, FileText, LogOut, Star, Gift, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SimpleHeader from '@/components/SimpleHeader';
import BottomNavBar from '@/components/BottomNavBar';

const Perfil = () => {
  const menuItems = [
    {
      icon: CreditCard,
      title: 'Pagos y Envíos',
      description: 'Métodos de pago y direcciones',
      action: () => {}
    },
    {
      icon: MapPin,
      title: 'Direcciones',
      description: 'Gestionar direcciones de envío',
      action: () => {}
    },
    {
      icon: Bell,
      title: 'Configuración de Notificaciones',
      description: 'Personalizar alertas y mensajes',
      action: () => {}
    }
  ];

  const helpItems = [
    {
      icon: HelpCircle,
      title: 'Centro de Ayuda',
      action: () => {}
    },
    {
      icon: FileText,
      title: 'Términos y Condiciones',
      action: () => {}
    },
    {
      icon: FileText,
      title: 'Política de Privacidad',
      action: () => {}
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SimpleHeader />
      
      <main className="mobile-padding pb-24">
        {/* Profile header */}
        <div className="flex items-center space-x-4 mb-6 mt-4">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
            <span className="text-foreground text-2xl font-bold">U</span>
          </div>
          <div className="flex-1">
            <h1 className="text-foreground text-xl font-bold">Usuario123</h1>
            <p className="text-muted-foreground text-sm">Miembro desde 2024</p>
            <div className="flex items-center space-x-1 mt-1">
              <Star className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground text-sm font-medium">4.8</span>
              <span className="text-muted-foreground text-sm">(24 reseñas)</span>
            </div>
          </div>
        </div>

        {/* Quick stats cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-6 h-6 text-muted-foreground" />
              </div>
              <div className="text-foreground font-semibold">Referencias y Crédito</div>
              <div className="text-muted-foreground text-sm">Ver detalles</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Gift className="w-6 h-6 text-muted-foreground" />
              </div>
              <div className="text-foreground font-semibold">Mis Recompensas</div>
              <div className="text-muted-foreground text-sm">3 disponibles</div>
            </CardContent>
          </Card>
        </div>

        {/* Settings menu */}
        <div className="space-y-3 mb-6">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="bg-card border-border card-hover cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                        <Icon className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="text-foreground font-medium text-sm">{item.title}</div>
                        <div className="text-muted-foreground text-xs">{item.description}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Help and legal section */}
        <div className="mb-6">
          <h2 className="text-foreground font-semibold text-lg mb-3">Ayuda y Legal</h2>
          <div className="space-y-2">
            {helpItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="bg-card border-border card-hover cursor-pointer">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5 text-muted-foreground" />
                        <span className="text-foreground text-sm">{item.title}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Logout button */}
        <Button 
          variant="outline" 
          className="w-full border-border text-muted-foreground hover:bg-accent/20"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Cerrar Sesión
        </Button>
      </main>

      <BottomNavBar />
    </div>
  );
};

export default Perfil;
