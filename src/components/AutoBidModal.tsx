
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Zap, DollarSign } from 'lucide-react';

interface AutoBidModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBid: number;
  onSetAutoBid: (maxBid: number) => void;
}

export const AutoBidModal: React.FC<AutoBidModalProps> = ({
  isOpen,
  onClose,
  currentBid,
  onSetAutoBid
}) => {
  const [maxBid, setMaxBid] = useState(currentBid + 10);
  const [isAutoBidEnabled, setIsAutoBidEnabled] = useState(false);

  const handleSubmit = () => {
    if (isAutoBidEnabled && maxBid > currentBid) {
      onSetAutoBid(maxBid);
      onClose();
    }
  };

  const presetAmounts = [
    currentBid + 5,
    currentBid + 10,
    currentBid + 20,
    currentBid + 50
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-background border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            <span>Auto-Bid Setup</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-bid-toggle">Enable Auto-Bid</Label>
            <Switch
              id="auto-bid-toggle"
              checked={isAutoBidEnabled}
              onCheckedChange={setIsAutoBidEnabled}
            />
          </div>

          {isAutoBidEnabled && (
            <>
              <div className="space-y-2">
                <Label>Maximum Bid Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="number"
                    value={maxBid}
                    onChange={(e) => setMaxBid(Number(e.target.value))}
                    className="pl-8"
                    min={currentBid + 1}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Current bid: ${currentBid}
                </p>
              </div>

              <div className="space-y-2">
                <Label>Quick Presets</Label>
                <div className="grid grid-cols-2 gap-2">
                  {presetAmounts.map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      onClick={() => setMaxBid(amount)}
                      className="text-sm"
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Auto-bid will automatically place bids up to your maximum amount when others bid against you.
                </p>
              </div>
            </>
          )}

          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={!isAutoBidEnabled || maxBid <= currentBid}
              className="flex-1"
            >
              {isAutoBidEnabled ? 'Set Auto-Bid' : 'Disable Auto-Bid'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
