
import React, { useState } from 'react';
import { CreditCard, MapPin, Bell, HelpCircle, FileText, LogOut, Star, Gift, ChevronRight, User, Shield, Activity, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import SimpleHeader from '@/components/SimpleHeader';
import BottomNavBar from '@/components/BottomNavBar';
import ProfileEditModal from '@/components/profile/ProfileEditModal';
import PaymentMethodsModal from '@/components/profile/PaymentMethodsModal';
import AddressManagerModal from '@/components/profile/AddressManagerModal';
import NotificationSettingsModal from '@/components/profile/NotificationSettingsModal';
import RewardsModal from '@/components/profile/RewardsModal';
import ActivityHistoryModal from '@/components/profile/ActivityHistoryModal';
import SecuritySettingsModal from '@/components/profile/SecuritySettingsModal';
import HelpCenterModal from '@/components/profile/HelpCenterModal';

const Perfil = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión exitosamente",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo cerrar la sesión",
        variant: "destructive",
      });
    }
  };

  const openModal = (modalName: string) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const generalMenuItems = [
    {
      icon: CreditCard,
      title: 'Pagos y Envíos',
      description: 'Métodos de pago y direcciones',
      action: () => openModal('payments')
    },
    {
      icon: MapPin,
      title: 'Direcciones',
      description: 'Gestionar direcciones de envío',
      action: () => openModal('addresses')
    },
    {
      icon: Bell,
      title: 'Configuración de Notificaciones',
      description: 'Personalizar alertas y mensajes',
      action: () => openModal('notifications')
    }
  ];

  const sellerMenuItems = [
    {
      icon: Store,
      title: 'Mi Tienda',
      description: 'Configurar perfil de vendedor',
      action: () => openModal('seller')
    },
    {
      icon: Activity,
      title: 'Estadísticas de Ventas',
      description: 'Ver ingresos y métricas',
      action: () => openModal('sales')
    }
  ];

  const securityMenuItems = [
    {
      icon: Shield,
      title: 'Seguridad de Cuenta',
      description: 'Contraseña y autenticación',
      action: () => openModal('security')
    },
    {
      icon: User,
      title: 'Privacidad',
      description: 'Configurar privacidad del perfil',
      action: () => openModal('privacy')
    }
  ];

  const helpItems = [
    {
      icon: HelpCircle,
      title: 'Centro de Ayuda',
      action: () => openModal('help')
    },
    {
      icon: FileText,
      title: 'Términos y Condiciones',
      action: () => openModal('terms')
    },
    {
      icon: FileText,
      title: 'Política de Privacidad',
      action: () => openModal('policy')
    }
  ];

  const renderMenuItems = (items: typeof generalMenuItems) => (
    <div className="space-y-3">
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <Card key={index} className="bg-card border-border card-hover cursor-pointer" onClick={item.action}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <Icon className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <div className="text-foreground font-medium text-sm">{item.title}</div>
                    <div className="text-foreground text-xs">{item.description}</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-foreground" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SimpleHeader />
      
      <main className="mobile-padding pb-24">
        {/* Profile header */}
        <div className="flex items-center space-x-4 mb-6 mt-4">
          <Avatar className="w-20 h-20 cursor-pointer" onClick={() => openModal('editProfile')}>
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="bg-muted text-foreground text-2xl font-bold">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-foreground text-xl font-bold">{user?.name || 'Usuario'}</h1>
            <p className="text-foreground text-sm">Miembro desde 2024</p>
            <div className="flex items-center space-x-1 mt-1">
              <Star className="w-4 h-4 text-foreground" />
              <span className="text-foreground text-sm font-medium">4.8</span>
              <span className="text-foreground text-sm">(24 reseñas)</span>
            </div>
            {user?.isVerified && (
              <div className="flex items-center space-x-1 mt-1">
                <Shield className="w-4 h-4 text-green-500" />
                <span className="text-green-500 text-xs">Verificado</span>
              </div>
            )}
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => openModal('editProfile')}
            className="border-border text-foreground hover:bg-accent/30"
          >
            Editar
          </Button>
        </div>

        {/* Quick stats cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="bg-card border-border cursor-pointer" onClick={() => openModal('rewards')}>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Gift className="w-6 h-6 text-foreground" />
              </div>
              <div className="text-foreground font-semibold">Mis Recompensas</div>
              <div className="text-foreground text-sm">3 disponibles</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border cursor-pointer" onClick={() => openModal('activity')}>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Activity className="w-6 h-6 text-foreground" />
              </div>
              <div className="text-foreground font-semibold">Mi Actividad</div>
              <div className="text-foreground text-sm">Ver historial</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for organizing content */}
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="seller">Vendedor</TabsTrigger>
            <TabsTrigger value="security">Seguridad</TabsTrigger>
            <TabsTrigger value="help">Ayuda</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            {renderMenuItems(generalMenuItems)}
          </TabsContent>

          <TabsContent value="seller" className="space-y-6">
            {renderMenuItems(sellerMenuItems)}
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            {renderMenuItems(securityMenuItems)}
          </TabsContent>

          <TabsContent value="help" className="space-y-6">
            <div className="space-y-2">
              {helpItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card key={index} className="bg-card border-border card-hover cursor-pointer" onClick={item.action}>
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Icon className="w-5 h-5 text-foreground" />
                          <span className="text-foreground text-sm">{item.title}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>

        {/* Logout button */}
        <div className="mt-6">
          <Button 
            variant="outline" 
            className="w-full border-border text-foreground hover:bg-accent/30"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>
      </main>

      <BottomNavBar />

      {/* Modals */}
      <ProfileEditModal isOpen={activeModal === 'editProfile'} onClose={closeModal} />
      <PaymentMethodsModal isOpen={activeModal === 'payments'} onClose={closeModal} />
      <AddressManagerModal isOpen={activeModal === 'addresses'} onClose={closeModal} />
      <NotificationSettingsModal isOpen={activeModal === 'notifications'} onClose={closeModal} />
      <RewardsModal isOpen={activeModal === 'rewards'} onClose={closeModal} />
      <ActivityHistoryModal isOpen={activeModal === 'activity'} onClose={closeModal} />
      <SecuritySettingsModal isOpen={activeModal === 'security'} onClose={closeModal} />
      <HelpCenterModal isOpen={activeModal === 'help'} onClose={closeModal} />
    </div>
  );
};

export default Perfil;
