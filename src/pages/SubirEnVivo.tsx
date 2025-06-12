
import React from 'react';
import { Plus, Calendar, DollarSign, Package, CreditCard, ShoppingBag, Settings, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SimpleHeader from '@/components/SimpleHeader';
import BottomNavBar from '@/components/BottomNavBar';

const SubirEnVivo = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SimpleHeader />
      
      <main className="mobile-padding pb-24">
        {/* Header with action buttons */}
        <div className="flex flex-col space-y-3 mb-6 mt-4">
          <div className="flex space-x-3">
            <Button className="flex-1 bg-foreground text-background hover:bg-foreground/90">
              <Plus className="w-4 h-4 mr-2" />
              Crear Producto
            </Button>
            <Button variant="outline" className="flex-1 border-border text-foreground hover:bg-accent/20">
              <Calendar className="w-4 h-4 mr-2" />
              Programar Show
            </Button>
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
                <div className="text-sm text-muted-foreground">Ganancias del Mes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">156</div>
                <div className="text-sm text-muted-foreground">Productos Vendidos</div>
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
                <Calendar className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm">No tienes shows programados</p>
              <Button variant="outline" className="mt-3 border-border text-foreground hover:bg-accent/20">
                Programar tu primer show
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-card border-border card-hover cursor-pointer">
            <CardContent className="p-4 text-center">
              <CreditCard className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <div className="text-sm font-medium text-foreground">Pagos</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border card-hover cursor-pointer">
            <CardContent className="p-4 text-center">
              <ShoppingBag className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <div className="text-sm font-medium text-foreground">Pedidos</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border card-hover cursor-pointer">
            <CardContent className="p-4 text-center">
              <Package className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <div className="text-sm font-medium text-foreground">Inventario</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border card-hover cursor-pointer">
            <CardContent className="p-4 text-center">
              <Play className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <div className="text-sm font-medium text-foreground">Modo Ensayo</div>
            </CardContent>
          </Card>
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
};

export default SubirEnVivo;
