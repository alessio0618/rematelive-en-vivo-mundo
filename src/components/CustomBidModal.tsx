
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DollarSign } from 'lucide-react';
import { useBidIncrement } from '@/hooks/useBidIncrement';

interface CustomBidModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBid: number;
  onBid: (amount: number) => void;
}

export const CustomBidModal: React.FC<CustomBidModalProps> = ({
  isOpen,
  onClose,
  currentBid,
  onBid
}) => {
  const [customAmount, setCustomAmount] = useState(currentBid + 1);
  const { getNextBidAmount } = useBidIncrement();
  
  const minimumBid = getNextBidAmount(currentBid);

  const handleSubmit = () => {
    if (customAmount >= minimumBid) {
      onBid(customAmount);
      onClose();
    }
  };

  const presetAmounts = [
    minimumBid,
    currentBid + 10,
    currentBid + 25,
    currentBid + 50
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-background border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-green-500" />
            <span>Custom Bid</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Bid Amount</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="number"
                value={customAmount}
                onChange={(e) => setCustomAmount(Number(e.target.value))}
                className="pl-8"
                min={minimumBid}
                step="0.01"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Minimum bid: ${minimumBid} (Current: ${currentBid})
            </p>
          </div>

          <div className="space-y-2">
            <Label>Quick Amounts</Label>
            <div className="grid grid-cols-2 gap-2">
              {presetAmounts.map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  onClick={() => setCustomAmount(amount)}
                  className="text-sm"
                >
                  ${amount}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={customAmount < minimumBid}
              className="flex-1"
            >
              Place Bid
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
