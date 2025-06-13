
import React from 'react';
import SearchBar from '@/components/SearchBar';
import BottomNavBar from '@/components/BottomNavBar';
import LiveChannelCard from '@/components/LiveChannelCard';

const Coleccionables = () => {
  // Mock data for collectibles category live channels
  const coleccionablesChannels = [
    {
      id: '1',
      sellerName: 'vintagehunter',
      sellerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      viewerCount: 156,
      category: 'Antigüedades',
      title: 'ANTIGÜEDADES RARAS Y OBJETOS HISTÓRICOS',
      thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop',
      isLive: true
    },
    {
      id: '2',
      sellerName: 'coinmaster',
      sellerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b112b008?w=150&h=150&fit=crop&crop=face',
      viewerCount: 93,
      category: 'Monedas',
      title: 'Monedas Antiguas y Billetes Coleccionables',
      thumbnail: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=500&fit=crop',
      isLive: true
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SearchBar placeholder="Buscar en Coleccionables" />
      <div className="p-3 border-b border-border">
        <h1 className="text-xl font-semibold">Coleccionables</h1>
        <p className="text-sm text-muted-foreground">Tesoros únicos y piezas de colección exclusivas</p>
      </div>
      <main className="mobile-padding pb-24">
        <div className="grid grid-cols-2 gap-3 mt-2">
          {coleccionablesChannels.map((channel) => (
            <LiveChannelCard
              key={channel.id}
              sellerName={channel.sellerName}
              sellerAvatar={channel.sellerAvatar}
              viewerCount={channel.viewerCount}
              category={channel.category}
              title={channel.title}
              thumbnail={channel.thumbnail}
              isLive={channel.isLive}
            />
          ))}
        </div>
      </main>
      <BottomNavBar />
    </div>
  );
};

export default Coleccionables;
