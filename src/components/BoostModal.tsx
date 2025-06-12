
import React, { useState } from 'react';
import { Zap, DollarSign } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface BoostModalProps {
  isOpen: boolean;
  onClose: () => void;
  sellerName: string;
}

export const BoostModal: React.FC<BoostModalProps> = ({
  isOpen,
  onClose,
  sellerName
}) => {
  const [customAmount, setCustomAmount] = useState('');
  const { toast } = useToast();
  
  const presetAmounts = [1, 5, 10, 25, 50];

  const handleBoost = (amount: number) => {
    toast({
      title: "¡Boost enviado!",
      description: `Has enviado $${amount} a ${sellerName}`
    });
    onClose();
    setCustomAmount('');
  };

  const handleCustomBoost = () => {
    const amount = parseFloat(customAmount);
    if (amount && amount > 0) {
      handleBoost(amount);
    } else {
      toast({
        title: "Error",
        description: "Por favor ingresa un monto válido",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            Boost a {sellerName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {presetAmounts.map((amount) => (
              <Button
                key={amount}
                onClick={() => handleBoost(amount)}
                variant="outline"
                className="flex flex-col items-center py-3 h-auto"
              >
                <DollarSign className="w-4 h-4 mb-1" />
                ${amount}
              </Button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Monto personalizado"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              min="1"
              step="0.01"
            />
            <Button onClick={handleCustomBoost} className="bg-yellow-400 text-black hover:bg-yellow-500">
              <Zap className="w-4 h-4" />
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground text-center">
            Los boosts ayudan a promover el stream y apoyar al vendedor
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
