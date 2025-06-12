
import React, { useState } from 'react';
import { Package, DollarSign, Camera } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface CreateProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateProductModal: React.FC<CreateProductModalProps> = ({
  isOpen,
  onClose
}) => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const { toast } = useToast();

  const handleCreateProduct = () => {
    if (!productName.trim() || !price.trim()) {
      toast({
        title: "Error",
        description: "Por favor completa el nombre y precio del producto",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "¡Producto creado!",
      description: `"${productName}" ha sido agregado a tu inventario`
    });
    onClose();
    setProductName('');
    setPrice('');
    setDescription('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="w-5 h-5 text-blue-500" />
            Crear Nuevo Producto
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="productName">Nombre del Producto</Label>
            <Input
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Ej: Camisa Vintage"
            />
          </div>

          <div>
            <Label htmlFor="price">Precio</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Descripción</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe tu producto..."
            />
          </div>

          <Button variant="outline" className="w-full">
            <Camera className="w-4 h-4 mr-2" />
            Agregar Fotos
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button onClick={handleCreateProduct} className="flex-1">
              Crear Producto
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
