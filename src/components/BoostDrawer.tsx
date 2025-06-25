
import React, { useState } from 'react';
import { Zap, DollarSign } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface BoostDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  sellerName: string;
}

export const BoostDrawer: React.FC<BoostDrawerProps> = ({
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
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader className="text-center pb-4">
          <DrawerTitle className="flex items-center justify-center gap-2 text-lg">
            <Zap className="w-5 h-5 text-yellow-500" />
            Boost a {sellerName}
          </DrawerTitle>
        </DrawerHeader>
        
        <div className="px-6 space-y-6">
          <div className="grid grid-cols-3 gap-3">
            {presetAmounts.map((amount) => (
              <Button
                key={amount}
                onClick={() => handleBoost(amount)}
                variant="outline"
                className="flex flex-col items-center py-6 h-auto text-base font-semibold hover:bg-accent transition-colors"
              >
                <DollarSign className="w-6 h-6 mb-2" />
                ${amount}
              </Button>
            ))}
          </div>
          
          <div className="space-y-3">
            <div className="flex gap-3">
              <Input
                type="number"
                placeholder="Monto personalizado"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                min="1"
                step="0.01"
                className="h-12 text-base"
              />
              <Button 
                variant="outline"
                onClick={handleCustomBoost} 
                className="h-12 px-6 !bg-yellow-400 !hover:bg-yellow-500 !text-black !font-bold !border-yellow-400"
              >
                <Zap className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              Los boosts ayudan a promover el stream y apoyar al vendedor
            </p>
          </div>
        </div>

        <DrawerFooter className="pt-4 pb-8" />
      </DrawerContent>
    </Drawer>
  );
};
