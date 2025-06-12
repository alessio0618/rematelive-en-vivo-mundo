
import React, { useState } from 'react';
import { ShoppingBag, MessageSquare, Heart, BookmarkCheck, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SimpleHeader from '@/components/SimpleHeader';
import BottomNavBar from '@/components/BottomNavBar';
import { DMWindow } from '@/components/DMWindow';
import { useToast } from '@/hooks/use-toast';

const Notificaciones = () => {
  const [activeTab, setActiveTab] = useState('Compras');
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [isDMOpen, setIsDMOpen] = useState(false);
  const { toast } = useToast();
  
  const tabs = ['Compras', 'Pujas', 'Ofertas', 'Mensajes', 'Guardados'];
  const filters = ['Todos', 'En Progreso', 'Completados', 'Reembolsos'];
  
  // Different notifications for each tab
  const allNotifications = {
    'Compras': [
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
        type: 'purchase',
        title: 'Envío en camino',
        description: 'Smartphone Pro Max - Vendedor: techstore',
        amount: '$899.99',
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop',
        status: 'En tránsito',
        time: 'Hace 1 día'
      }
    ],
    'Pujas': [
      {
        id: 3,
        type: 'bid',
        title: 'Puja superada',
        description: 'Perfume Collection - Vendedor: lifeluxury',
        amount: '$28.50',
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop',
        status: 'Superada',
        time: 'Hace 1 día'
      },
      {
        id: 4,
        type: 'bid',
        title: 'Ganaste la puja',
        description: 'Reloj Vintage - Vendedor: antiquedeals',
        amount: '$156.00',
        image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=100&h=100&fit=crop',
        status: 'Ganada',
        time: 'Hace 3 horas'
      }
    ],
    'Ofertas': [
      {
        id: 5,
        type: 'offer',
        title: 'Oferta especial',
        description: 'Sneakers Limited Edition - Vendedor: sneakerqueen',
        amount: '$89.99',
        image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=100&h=100&fit=crop',
        status: 'Disponible',
        time: 'Hace 2 días'
      },
      {
        id: 6,
        type: 'offer',
        title: 'Descuento del 50%',
        description: 'Auriculares Bluetooth - Vendedor: audiostore',
        amount: '$49.99',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
        status: 'Activa',
        time: 'Hace 5 horas'
      }
    ],
    'Mensajes': [
      {
        id: 7,
        type: 'message',
        title: 'Nuevo mensaje',
        description: 'dailydeal: "¡Gracias por tu compra! Tu producto está en camino."',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
        status: 'No leído',
        time: 'Hace 30 min'
      },
      {
        id: 8,
        type: 'message',
        title: 'Respuesta del vendedor',
        description: 'sneakerqueen: "¿Te interesa este nuevo modelo que acaba de llegar?"',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=100&h=100&fit=crop',
        status: 'No leído',
        time: 'Hace 2 horas'
      }
    ],
    'Guardados': [
      {
        id: 9,
        type: 'saved',
        title: 'Precio reducido',
        description: 'Laptop Gaming - Vendedor: gamerstore',
        amount: '$1,299.99',
        image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=100&h=100&fit=crop',
        status: 'Precio bajo',
        time: 'Hace 1 hora'
      },
      {
        id: 10,
        type: 'saved',
        title: 'Vuelve disponible',
        description: 'Cámara Profesional - Vendedor: photostore',
        amount: '$799.99',
        image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=100&h=100&fit=crop',
        status: 'Disponible',
        time: 'Hace 4 horas'
      }
    ]
  };

  const notifications = allNotifications[activeTab] || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completado':
      case 'Ganada':
      case 'Disponible':
        return 'text-green-600';
      case 'En tránsito':
      case 'En Progreso':
      case 'Activa':
        return 'text-blue-600';
      case 'Superada':
      case 'No leído':
        return 'text-red-600';
      case 'Precio bajo':
        return 'text-orange-600';
      default:
        return 'text-foreground';
    }
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    
    if (tab === 'Mensajes') {
      setIsDMOpen(true);
    }
  };

  const handleNotificationClick = (notification: any) => {
    if (activeTab === 'Mensajes') {
      setIsDMOpen(true);
    } else {
      toast({
        title: "Notificación abierta",
        description: `Viendo detalles de: ${notification.title}`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SimpleHeader />
      
      <main className="mobile-padding pb-24">
        {/* Tab navigation with consistent styling */}
        <div className="flex space-x-1 mb-4 mt-4 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`tab-button ${
                activeTab === tab 
                  ? 'tab-button-active' 
                  : 'tab-button-inactive'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Filter buttons - only show for non-message tabs */}
        {activeTab !== 'Mensajes' && (
          <div className="flex space-x-2 mb-6 overflow-x-auto scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`whitespace-nowrap text-xs transition-colors px-3 py-1.5 rounded-md hover:bg-accent/20 ${
                  activeFilter === filter 
                    ? 'text-foreground border-b-2 border-foreground bg-muted' 
                    : 'text-foreground bg-muted border-b-2 border-transparent'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        )}

        {/* Notifications list */}
        <div className="space-y-3">
          {notifications.map((notification) => (
            <Card 
              key={notification.id} 
              className="bg-card border-border hover:bg-accent/20 transition-colors cursor-pointer"
              onClick={() => handleNotificationClick(notification)}
            >
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
                      {notification.amount && (
                        <span className="text-foreground font-bold text-sm">{notification.amount}</span>
                      )}
                    </div>
                    <p className="text-foreground text-sm mb-2 line-clamp-2">{notification.description}</p>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-medium ${getStatusColor(notification.status)}`}>
                        {notification.status}
                      </span>
                      <span className="text-xs text-foreground">{notification.time}</span>
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
              <ShoppingBag className="w-8 h-8 text-foreground" />
            </div>
            <p className="text-foreground text-sm">No tienes notificaciones en {activeTab.toLowerCase()}</p>
          </div>
        )}
      </main>

      <BottomNavBar />

      {/* DM Window */}
      <DMWindow 
        isOpen={isDMOpen}
        onClose={() => setIsDMOpen(false)}
      />
    </div>
  );
};

export default Notificaciones;
