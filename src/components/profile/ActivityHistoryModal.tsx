
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Video, MessageSquare, Star } from 'lucide-react';

interface ActivityHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ActivityHistoryModal: React.FC<ActivityHistoryModalProps> = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState('purchases');

  const purchases = [
    {
      id: 1,
      item: 'Zapatos deportivos Nike',
      price: '$120',
      date: '2024-11-15',
      status: 'Entregado'
    },
    {
      id: 2,
      item: 'Camiseta casual',
      price: '$35',
      date: '2024-11-10',
      status: 'En camino'
    }
  ];

  const sales = [
    {
      id: 1,
      item: 'Reloj vintage',
      price: '$85',
      date: '2024-11-12',
      buyer: 'Usuario123'
    }
  ];

  const liveStreams = [
    {
      id: 1,
      title: 'Venta de ropa de invierno',
      date: '2024-11-14',
      duration: '45 min',
      viewers: 23
    },
    {
      id: 2,
      title: 'Subasta de electrónicos',
      date: '2024-11-08',
      duration: '1h 20min',
      viewers: 67
    }
  ];

  const reviews = [
    {
      id: 1,
      item: 'Zapatos deportivos',
      rating: 5,
      comment: 'Excelente calidad y envío rápido',
      date: '2024-11-16'
    },
    {
      id: 2,
      item: 'Camiseta casual',
      rating: 4,
      comment: 'Buena calidad, talla correcta',
      date: '2024-11-11'
    }
  ];

  const navigationItems = [
    { id: 'purchases', label: 'Compras', icon: ShoppingBag },
    { id: 'sales', label: 'Ventas', icon: ShoppingBag },
    { id: 'streams', label: 'Shows', icon: Video },
    { id: 'reviews', label: 'Reseñas', icon: Star }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'purchases':
        return (
          <div className="space-y-3">
            {purchases.map((purchase) => (
              <Card key={purchase.id} className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                        <ShoppingBag className="w-5 h-5 text-foreground" />
                      </div>
                      <div>
                        <h3 className="text-foreground font-medium text-sm">{purchase.item}</h3>
                        <p className="text-muted-foreground text-xs">{purchase.date}</p>
                        <p className="text-foreground font-semibold text-sm">{purchase.price}</p>
                      </div>
                    </div>
                    <Badge 
                      variant={purchase.status === 'Entregado' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {purchase.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      case 'sales':
        return (
          <div className="space-y-3">
            {sales.map((sale) => (
              <Card key={sale.id} className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-foreground font-medium text-sm">{sale.item}</h3>
                      <p className="text-muted-foreground text-xs">Vendido a {sale.buyer}</p>
                      <p className="text-muted-foreground text-xs">{sale.date}</p>
                      <p className="text-green-600 font-semibold text-sm">{sale.price}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      case 'streams':
        return (
          <div className="space-y-3">
            {liveStreams.map((stream) => (
              <Card key={stream.id} className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      <Video className="w-5 h-5 text-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-foreground font-medium text-sm">{stream.title}</h3>
                      <p className="text-muted-foreground text-xs">{stream.date}</p>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className="text-muted-foreground text-xs">⏱️ {stream.duration}</span>
                        <span className="text-muted-foreground text-xs">👥 {stream.viewers} viewers</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      case 'reviews':
        return (
          <div className="space-y-3">
            {reviews.map((review) => (
              <Card key={review.id} className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      <Star className="w-5 h-5 text-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-foreground font-medium text-sm">{review.item}</h3>
                      <div className="flex items-center space-x-1 my-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground text-xs">{review.comment}</p>
                      <p className="text-muted-foreground text-xs">{review.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Mi Actividad</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Custom Navigation */}
          <div className="flex space-x-1 bg-muted rounded-lg p-1">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveSection(item.id)}
                  className="flex-1 text-xs"
                >
                  <IconComponent className="w-3 h-3 mr-1" />
                  {item.label}
                </Button>
              );
            })}
          </div>

          {/* Content */}
          <div className="mt-4">
            {renderContent()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ActivityHistoryModal;
