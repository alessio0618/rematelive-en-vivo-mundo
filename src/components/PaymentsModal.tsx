
import React from 'react';
import { CreditCard, Plus, DollarSign } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface PaymentsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PaymentsModal: React.FC<PaymentsModalProps> = ({
  isOpen,
  onClose
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-blue-500" />
            Métodos de Pago
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-center py-4">
            <div className="text-lg font-semibold text-foreground mb-2">Balance Disponible</div>
            <div className="text-3xl font-bold text-green-600">$1,234.56</div>
          </div>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">**** **** **** 4567</div>
                  <div className="text-sm text-muted-foreground">Visa</div>
                </div>
                <div className="text-sm text-muted-foreground">Principal</div>
              </div>
            </CardContent>
          </Card>

          <Button variant="outline" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Agregar Método de Pago
          </Button>

          <Button className="w-full">
            <DollarSign className="w-4 h-4 mr-2" />
            Retirar Fondos
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
