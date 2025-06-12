
import React, { useState } from 'react';
import { ShoppingBag, MessageSquare, Heart, BookmarkCheck, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SimpleHeader from '@/components/SimpleHeader';
import BottomNavBar from '@/components/BottomNavBar';

const Notificaciones = () => {
  const [activeTab, setActiveTab] = useState('Compras');
  const [activeFilter, setActiveFilter] = useState('Todos');
  
  const tabs = ['Compras', 'Pujas', 'Ofertas', 'Mensajes', 'Guardados'];
  const filters = ['Todos', 'En Progreso', 'Completados', 'Reembolsos'];
  
  const notifications = [
    {
      id: 1,
      type: 'purchase',
      title: 'Compra completada',
      description: 'Set de Golf Premium - Vendedor: dailydeal',
      amount: '$45.99',
      image: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=100&h=100&fit=crop',
      status: 'Completado',
      time: 'Hace 2 horas'
    },
    {
      id: 2,
      type: 'bid',
      title: 'Puja superada',
      description: 'Perfume Collection - Vendedor: lifeluxury',
      amount: '$28.50',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop',
      status: 'En Progreso',
      time: 'Hace 1 día'
    },
    {
      id: 3,
      type: 'offer',
      title: 'Oferta especial',
      description: 'Sneakers Limited Edition - Vendedor: sneakerqueen',
      amount: '$89.99',
      image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=100&h=100&fit=crop',
      status: 'Disponible',
      time: 'Hace 2 días'
    }
  ];

  const getStatusColor = (status: string) => {
    // Cambiado: todos los estados usan solo gris claro, sin colores vibrantes
    return 'text-muted-foreground';
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SimpleHeader />
      
      <main className="mobile-padding pb-24">
        {/* Tab navigation */}
        <div className="flex space-x-1 mb-4 mt-4 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap text-sm font-medium transition-colors ${
                activeTab === tab 
                  ? 'bg-foreground text-background' 
                  : 'text-muted-foreground hover:bg-accent/20'
              }`}
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Filter buttons */}
        <div className="flex space-x-2 mb-6 overflow-x-auto scrollbar-hide">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setActiveFilter(filter)}
              className={`whitespace-nowrap text-xs transition-colors ${
                activeFilter === filter 
                  ? 'bg-secondary text-foreground' 
                  : 'text-muted-foreground hover:bg-accent/20'
              }`}
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Notifications list */}
        <div className="space-y-3">
          {notifications.map((notification) => (
            <Card key={notification.id} className="bg-card border-border card-hover cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <img 
                    src={notification.image} 
                    alt={notification.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="text-foreground font-semibold text-sm">{notification.title}</h3>
                      <span className="text-foreground font-bold text-sm">{notification.amount}</span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{notification.description}</p>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-medium ${getStatusColor(notification.status)}`}>
                        {notification.status}
                      </span>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty state */}
        {notifications.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm">No tienes notificaciones</p>
          </div>
        )}
      </main>

      <BottomNavBar />
    </div>
  );
};

export default Notificaciones;
