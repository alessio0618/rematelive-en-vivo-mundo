
import React from 'react';
import { ShoppingBag, Package, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';

interface OrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrdersModal: React.FC<OrdersModalProps> = ({
  isOpen,
  onClose
}) => {
  const orders = [
    { id: '001', product: 'Camisa Vintage', price: '$45.00', status: 'Enviado', date: '2024-06-10' },
    { id: '002', product: 'Jeans Azules', price: '$65.00', status: 'Procesando', date: '2024-06-12' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-purple-500" />
            Pedidos Recientes
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium">{order.product}</div>
                    <div className="text-sm text-muted-foreground">Pedido #{order.id}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{order.price}</div>
                    <div className="text-sm text-muted-foreground">{order.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {order.status === 'Enviado' ? (
                    <Package className="w-4 h-4 text-green-500" />
                  ) : (
                    <Clock className="w-4 h-4 text-orange-500" />
                  )}
                  <span className="text-sm">{order.status}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
