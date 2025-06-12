
import React from 'react';
import { Package, Plus, Edit } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface InventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InventoryModal: React.FC<InventoryModalProps> = ({
  isOpen,
  onClose
}) => {
  const products = [
    { id: 1, name: 'Camisa Vintage', price: '$45.00', stock: 12, image: '📷' },
    { id: 2, name: 'Jeans Azules', price: '$65.00', stock: 8, image: '📷' },
    { id: 3, name: 'Zapatos Deportivos', price: '$85.00', stock: 5, image: '📷' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="w-5 h-5 text-orange-500" />
            Mi Inventario
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Button className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Agregar Nuevo Producto
          </Button>

          <div className="space-y-3 max-h-60 overflow-y-auto">
            {products.map((product) => (
              <Card key={product.id} className="bg-card border-border">
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center text-xl">
                      {product.image}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {product.price} • Stock: {product.stock}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
