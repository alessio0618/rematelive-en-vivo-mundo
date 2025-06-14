
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trophy, ThumbsDown } from 'lucide-react';

interface AuctionResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  isWinner: boolean;
  productName: string;
  finalBid: number;
  winnerName?: string;
}

export const AuctionResultModal = ({ 
  isOpen, 
  onClose, 
  isWinner, 
  productName, 
  finalBid,
  winnerName 
}: AuctionResultModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            {isWinner ? (
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <Trophy className="w-8 h-8 text-white" />
              </div>
            ) : (
              <div className="w-16 h-16 bg-gray-500 rounded-full flex items-center justify-center">
                <ThumbsDown className="w-8 h-8 text-white" />
              </div>
            )}
          </div>
          
          <DialogTitle className="text-xl font-bold">
            {isWinner ? '¡Felicidades!' : 'Subasta Finalizada'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center space-y-4">
          {isWinner ? (
            <div>
              <p className="text-lg font-semibold text-green-600 mb-2">
                ¡Has ganado la subasta!
              </p>
              <p className="text-sm text-muted-foreground mb-1">
                Producto: {productName}
              </p>
              <p className="text-lg font-bold">
                Precio final: ${finalBid}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Recibirás un email con los detalles de pago y envío.
              </p>
            </div>
          ) : (
            <div>
              <p className="text-lg font-semibold text-gray-600 mb-2">
                La subasta ha terminado
              </p>
              <p className="text-sm text-muted-foreground mb-1">
                Producto: {productName}
              </p>
              <p className="text-lg font-bold">
                Precio final: ${finalBid}
              </p>
              {winnerName && (
                <p className="text-sm text-muted-foreground">
                  Ganador: {winnerName}
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-2">
                ¡No te desanimes! Hay más subastas esperándote.
              </p>
            </div>
          )}
          
          <Button 
            onClick={onClose}
            variant="ghost"
            className="w-full mt-4 text-foreground hover:bg-accent/20 border border-border"
          >
            {isWinner ? 'Continuar' : 'Ver más subastas'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
