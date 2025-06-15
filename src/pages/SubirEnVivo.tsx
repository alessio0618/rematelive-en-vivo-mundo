
import React, { useState } from 'react';
import { Plus, Calendar, DollarSign, Package, CreditCard, ShoppingBag, Settings, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SimpleHeader from '@/components/SimpleHeader';
import BottomNavBar from '@/components/BottomNavBar';
import { CreateProductModal } from '@/components/CreateProductModal';
import { ScheduleShowModal } from '@/components/ScheduleShowModal';
import { PaymentsModal } from '@/components/PaymentsModal';
import { OrdersModal } from '@/components/OrdersModal';
import { InventoryModal } from '@/components/InventoryModal';
import { StartLiveModal } from '@/components/StartLiveModal';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { BecomeSellerPrompt } from '@/components/BecomeSellerPrompt';

const SubirEnVivo = () => {
  const { user, updateProfile } = useAuth();
  const [isCreateProductModalOpen, setIsCreateProductModalOpen] = useState(false);
  const [isScheduleShowModalOpen, setIsScheduleShowModalOpen] = useState(false);
  const [isPaymentsModalOpen, setIsPaymentsModalOpen] = useState(false);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);
  const [isPracticeModalOpen, setIsPracticeModalOpen] = useState(false);
  const { toast } = useToast();

  const handleSellerOnboarding = async () => {
    if (user?.role === 'buyer') {
      await updateProfile({ role: 'seller' });
      toast({
        title: "¡Felicidades, ya eres vendedor!",
        description: "Tu panel de vendedor ha sido activado. ¡Bienvenido!",
      });
    }
  };

  if (user?.role !== 'seller') {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SimpleHeader />
        <main className="mobile-padding pb-24">
          <BecomeSellerPrompt onScheduleShow={() => setIsScheduleShowModalOpen(true)} />
        </main>
        <BottomNavBar />
        <ScheduleShowModal
          isOpen={isScheduleShowModalOpen}
          onClose={() => setIsScheduleShowModalOpen(false)}
          onSchedule={handleSellerOnboarding}
        />
      </div>
    );
  }

  // Seller View
  const handleCreateProduct = () => setIsCreateProductModalOpen(true);
  const handleScheduleShow = () => setIsScheduleShowModalOpen(true);
  const handlePayments = () => setIsPaymentsModalOpen(true);
  const handleOrders = () => setIsOrdersModalOpen(true);
  const handleInventory = () => setIsInventoryModalOpen(true);
  const handlePracticeMode = () => setIsPracticeModalOpen(true);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SimpleHeader />
      
      <main className="mobile-padding pb-24">
        {/* Header with action buttons */}
        <div className="flex flex-col space-y-3 mb-6 mt-4">
          <div className="flex space-x-3">
            <button 
              onClick={handleCreateProduct}
              className="flex-1 bg-muted text-foreground hover:bg-accent/20 transition-colors rounded-md h-10 px-4 py-2 text-sm font-medium flex items-center justify-center border border-border"
            >
              <Plus className="w-4 h-4 mr-2" />
              Crear Producto
            </button>
            <button 
              onClick={handleScheduleShow}
              className="flex-1 bg-card border border-border text-foreground hover:bg-accent/20 transition-colors rounded-md h-10 px-4 py-2 text-sm font-medium flex items-center justify-center"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Programar Show
            </button>
          </div>
        </div>

        {/* Account status */}
        <Card className="bg-card border-border mb-6">
          <CardHeader>
            <CardTitle className="text-foreground text-lg">Estado de la Cuenta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">$1,234</div>
                <div className="text-sm text-foreground">Ganancias del Mes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">156</div>
                <div className="text-sm text-foreground">Productos Vendidos</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming shows */}
        <Card className="bg-card border-border mb-6">
          <CardHeader>
            <CardTitle className="text-foreground text-lg">Próximos Shows</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-foreground" />
              </div>
              <p className="text-foreground text-sm">No tienes shows programados</p>
              <button 
                onClick={handleScheduleShow}
                className="mt-3 border border-border text-foreground hover:bg-accent/20 transition-colors rounded-md h-10 px-4 py-2 text-sm font-medium bg-card"
              >
                Programar tu primer show
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3">
          <Card 
            className="bg-card border-border hover:bg-accent/20 transition-colors cursor-pointer"
            onClick={handlePayments}
          >
            <CardContent className="p-4 text-center">
              <CreditCard className="w-8 h-8 text-foreground mx-auto mb-2" />
              <div className="text-sm font-medium text-foreground">Pagos</div>
            </CardContent>
          </Card>
          <Card 
            className="bg-card border-border hover:bg-accent/20 transition-colors cursor-pointer"
            onClick={handleOrders}
          >
            <CardContent className="p-4 text-center">
              <ShoppingBag className="w-8 h-8 text-foreground mx-auto mb-2" />
              <div className="text-sm font-medium text-foreground">Pedidos</div>
            </CardContent>
          </Card>
          <Card 
            className="bg-card border-border hover:bg-accent/20 transition-colors cursor-pointer"
            onClick={handleInventory}
          >
            <CardContent className="p-4 text-center">
              <Package className="w-8 h-8 text-foreground mx-auto mb-2" />
              <div className="text-sm font-medium text-foreground">Inventario</div>
            </CardContent>
          </Card>
          <Card 
            className="bg-card border-border hover:bg-accent/20 transition-colors cursor-pointer"
            onClick={handlePracticeMode}
          >
            <CardContent className="p-4 text-center">
              <Play className="w-8 h-8 text-foreground mx-auto mb-2" />
              <div className="text-sm font-medium text-foreground">Modo Ensayo</div>
            </CardContent>
          </Card>
        </div>
      </main>

      <BottomNavBar />

      {/* Modales */}
      <CreateProductModal 
        isOpen={isCreateProductModalOpen}
        onClose={() => setIsCreateProductModalOpen(false)}
      />
      <ScheduleShowModal 
        isOpen={isScheduleShowModalOpen}
        onClose={() => setIsScheduleShowModalOpen(false)}
      />
      <PaymentsModal 
        isOpen={isPaymentsModalOpen}
        onClose={() => setIsPaymentsModalOpen(false)}
      />
      <OrdersModal 
        isOpen={isOrdersModalOpen}
        onClose={() => setIsOrdersModalOpen(false)}
      />
      <InventoryModal 
        isOpen={isInventoryModalOpen}
        onClose={() => setIsInventoryModalOpen(false)}
      />
      <StartLiveModal 
        isOpen={isPracticeModalOpen}
        onClose={() => setIsPracticeModalOpen(false)}
      />
    </div>
  );
};

export default SubirEnVivo;
