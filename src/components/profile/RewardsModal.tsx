
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gift, Star, Zap, Crown, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RewardsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RewardsModal: React.FC<RewardsModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [userPoints] = useState(1250);
  
  const availableRewards = [
    {
      id: 1,
      title: '10% de descuento',
      description: 'En tu próxima compra',
      points: 500,
      icon: Gift,
      available: true,
      expiresAt: '2024-12-31'
    },
    {
      id: 2,
      title: 'Envío gratis',
      description: 'En compras superiores a $50',
      points: 300,
      icon: Zap,
      available: true,
      expiresAt: '2024-12-15'
    },
    {
      id: 3,
      title: 'Acceso VIP',
      description: 'A transmisiones exclusivas',
      points: 1000,
      icon: Crown,
      available: true,
      expiresAt: '2025-01-31'
    }
  ];

  const redeemedRewards = [
    {
      id: 4,
      title: '5% de descuento',
      description: 'Canjeado el 15 Nov 2024',
      points: 250,
      icon: Gift,
      redeemedAt: '2024-11-15'
    }
  ];

  const handleRedeemReward = (rewardId: number, points: number) => {
    if (userPoints >= points) {
      toast({
        title: "¡Recompensa canjeada!",
        description: "La recompensa ha sido añadida a tu cuenta",
      });
    } else {
      toast({
        title: "Puntos insuficientes",
        description: `Necesitas ${points - userPoints} puntos más`,
        variant: "destructive",
      });
    }
  };

  const renderRewardCard = (reward: any, isRedeemed = false) => {
    const IconComponent = reward.icon;
    return (
      <Card key={reward.id} className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                <IconComponent className="w-6 h-6 text-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="text-foreground font-medium">{reward.title}</h3>
                <p className="text-muted-foreground text-sm">{reward.description}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    <Star className="w-3 h-3 mr-1" />
                    {reward.points} puntos
                  </Badge>
                  {!isRedeemed && reward.expiresAt && (
                    <Badge variant="secondary" className="text-xs">
                      <Calendar className="w-3 h-3 mr-1" />
                      Expira {new Date(reward.expiresAt).toLocaleDateString()}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            {!isRedeemed && (
              <Button
                size="sm"
                onClick={() => handleRedeemReward(reward.id, reward.points)}
                disabled={userPoints < reward.points}
              >
                Canjear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Mis Recompensas</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Points Balance */}
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold">{userPoints.toLocaleString()}</h2>
              <p className="text-sm opacity-90">Puntos disponibles</p>
            </CardContent>
          </Card>

          {/* Rewards Tabs */}
          <Tabs defaultValue="available" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="available">Disponibles</TabsTrigger>
              <TabsTrigger value="redeemed">Canjeadas</TabsTrigger>
            </TabsList>

            <TabsContent value="available" className="space-y-3 mt-4">
              {availableRewards.map(reward => renderRewardCard(reward, false))}
            </TabsContent>

            <TabsContent value="redeemed" className="space-y-3 mt-4">
              {redeemedRewards.length > 0 ? (
                redeemedRewards.map(reward => renderRewardCard(reward, true))
              ) : (
                <div className="text-center py-8">
                  <Gift className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No has canjeado recompensas aún</p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* How to earn points */}
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <h3 className="text-foreground font-medium mb-3">¿Cómo ganar puntos?</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Compra completada</span>
                  <span>+10 puntos</span>
                </div>
                <div className="flex justify-between">
                  <span>Reseña de producto</span>
                  <span>+25 puntos</span>
                </div>
                <div className="flex justify-between">
                  <span>Referir un amigo</span>
                  <span>+100 puntos</span>
                </div>
                <div className="flex justify-between">
                  <span>Primera compra del mes</span>
                  <span>+50 puntos</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RewardsModal;
