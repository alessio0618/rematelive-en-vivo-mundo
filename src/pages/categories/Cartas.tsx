import React from 'react';
import CategoryHeader from '@/components/CategoryHeader';
import BottomNavBar from '@/components/BottomNavBar';
import LiveChannelCard from '@/components/LiveChannelCard';

const Cartas = () => {
  // Mock data for cards category live channels
  const cartasChannels = [
    {
      id: '1',
      sellerName: 'cardmaster',
      sellerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      viewerCount: 156,
      category: 'Cartas Pokemon',
      title: 'APERTURA DE SOBRES POKEMON - CARTAS RARAS',
      thumbnail: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=500&fit=crop',
      isLive: true
    },
    {
      id: '2',
      sellerName: 'yugiohking',
      sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      viewerCount: 89,
      category: 'Yu-Gi-Oh!',
      title: 'Cartas Yu-Gi-Oh Vintage y Ediciones Especiales',
      thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop',
      isLive: true
    },
    {
      id: '3',
      sellerName: 'magicdealer',
      sellerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b112b008?w=150&h=150&fit=crop&crop=face',
      viewerCount: 203,
      category: 'Magic: The Gathering',
      title: 'Magic The Gathering - Cartas Black Lotus',
      thumbnail: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop',
      isLive: true
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CategoryHeader title="Cartas" />
      <div className="p-3 border-b border-border">
        <p className="text-sm text-muted-foreground">Descubre las mejores subastas de cartas coleccionables</p>
      </div>
      <main className="mobile-padding pb-24">
        <div className="grid grid-cols-2 gap-3 mt-2">
          {cartasChannels.map((channel) => (
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

export default Cartas;
