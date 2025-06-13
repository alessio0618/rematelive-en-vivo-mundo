import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Plus, Trash2, Edit, Smartphone, Wallet } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PaymentMethodsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentMethodsModal: React.FC<PaymentMethodsModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState('methods');
  const [newCardData, setNewCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

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
    setActiveSection('add-card');
  };

  const handleGooglePay = () => {
    toast({
      title: "Google Pay",
      description: "Configurando Google Pay...",
    });
  };

  const handleApplePay = () => {
    const isAppleDevice = /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);
    if (!isAppleDevice) {
      toast({
        title: "Apple Pay no disponible",
        description: "Apple Pay solo está disponible en dispositivos Apple",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Apple Pay",
      description: "Configurando Apple Pay...",
    });
  };

  const handleStripe = () => {
    setActiveSection('add-card');
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

  const handleSaveCard = () => {
    if (!newCardData.number || !newCardData.expiry || !newCardData.cvv || !newCardData.name) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Tarjeta agregada",
      description: "Tu método de pago ha sido agregado exitosamente",
    });
    
    setNewCardData({ number: '', expiry: '', cvv: '', name: '' });
    setActiveSection('methods');
  };

  const renderAddCardForm = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setActiveSection('methods')}
        >
          ← Volver
        </Button>
        <h3 className="text-foreground font-medium">Agregar nueva tarjeta</h3>
      </div>

      <div className="space-y-3">
        <div>
          <Label htmlFor="cardName">Nombre del titular</Label>
          <Input
            id="cardName"
            placeholder="Juan Pérez"
            value={newCardData.name}
            onChange={(e) => setNewCardData(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>

        <div>
          <Label htmlFor="cardNumber">Número de tarjeta</Label>
          <Input
            id="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={newCardData.number}
            onChange={(e) => setNewCardData(prev => ({ ...prev, number: e.target.value }))}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="expiry">MM/AA</Label>
            <Input
              id="expiry"
              placeholder="12/26"
              value={newCardData.expiry}
              onChange={(e) => setNewCardData(prev => ({ ...prev, expiry: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="cvv">CVV</Label>
            <Input
              id="cvv"
              placeholder="123"
              type="password"
              value={newCardData.cvv}
              onChange={(e) => setNewCardData(prev => ({ ...prev, cvv: e.target.value }))}
            />
          </div>
        </div>

        <Button onClick={handleSaveCard} className="w-full">
          Guardar tarjeta
        </Button>
      </div>
    </div>
  );

  const renderPaymentMethods = () => (
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

      {/* Digital Payment Options */}
      <div className="pt-4 border-t">
        <h4 className="text-sm font-medium text-foreground mb-3">Métodos digitales</h4>
        <div className="grid grid-cols-1 gap-2">
          <Button variant="outline" onClick={handleGooglePay} className="justify-start">
            <Smartphone className="w-4 h-4 mr-2" />
            Google Pay
          </Button>
          <Button variant="outline" onClick={handleApplePay} className="justify-start">
            <Smartphone className="w-4 h-4 mr-2" />
            Apple Pay
          </Button>
          <Button variant="outline" onClick={handleStripe} className="justify-start">
            <CreditCard className="w-4 h-4 mr-2" />
            Stripe
          </Button>
        </div>
      </div>

      {/* Other Payment Options */}
      <div className="pt-4 border-t">
        <h4 className="text-sm font-medium text-foreground mb-3">Otros métodos</h4>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" onClick={handleAddPaymentMethod}>
            <Wallet className="w-4 h-4 mr-1" />
            PayPal
          </Button>
          <Button variant="outline" size="sm" onClick={handleAddPaymentMethod}>
            <CreditCard className="w-4 h-4 mr-1" />
            Transferencia
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Métodos de Pago</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {activeSection === 'methods' ? renderPaymentMethods() : renderAddCardForm()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentMethodsModal;
