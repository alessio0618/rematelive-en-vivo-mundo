
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Plus, Trash2, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PaymentMethodsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentMethodsModal: React.FC<PaymentMethodsModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [paymentMethods] = useState([
    {
      id: 1,
      type: 'Visa',
      last4: '4242',
      expiryMonth: 12,
      expiryYear: 2026,
      isDefault: true
    },
    {
      id: 2,
      type: 'Mastercard',
      last4: '8888',
      expiryMonth: 8,
      expiryYear: 2025,
      isDefault: false
    }
  ]);

  const handleAddPaymentMethod = () => {
    toast({
      title: "Próximamente",
      description: "La función para agregar métodos de pago estará disponible pronto",
    });
  };

  const handleEditPaymentMethod = (id: number) => {
    toast({
      title: "Próximamente",
      description: "La función para editar métodos de pago estará disponible pronto",
    });
  };

  const handleDeletePaymentMethod = (id: number) => {
    toast({
      title: "Próximamente",
      description: "La función para eliminar métodos de pago estará disponible pronto",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Métodos de Pago</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Add New Payment Method */}
          <Button 
            onClick={handleAddPaymentMethod}
            className="w-full"
            variant="outline"
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar método de pago
          </Button>

          {/* Payment Methods List */}
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <Card key={method.id} className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-foreground font-medium">
                            {method.type} •••• {method.last4}
                          </span>
                          {method.isDefault && (
                            <Badge variant="secondary" className="text-xs">
                              Principal
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm">
                          Expira {method.expiryMonth}/{method.expiryYear}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleEditPaymentMethod(method.id)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDeletePaymentMethod(method.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Payment Options */}
          <div className="pt-4 border-t">
            <h4 className="text-sm font-medium text-foreground mb-3">Otros métodos disponibles</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" onClick={handleAddPaymentMethod}>
                PayPal
              </Button>
              <Button variant="outline" size="sm" onClick={handleAddPaymentMethod}>
                Transferencia
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentMethodsModal;
