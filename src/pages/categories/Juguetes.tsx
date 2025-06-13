import React from 'react';
import CategoryHeader from '@/components/CategoryHeader';
import BottomNavBar from '@/components/BottomNavBar';
import LiveChannelCard from '@/components/LiveChannelCard';

const Juguetes = () => {
  // Mock data for toys category live channels
  const juguetesChannels = [
    {
      id: '1',
      sellerName: 'toycollector',
      sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      viewerCount: 112,
      category: 'Figuras de Acción',
      title: 'FIGURAS DE ACCIÓN VINTAGE Y EDICIONES ESPECIALES',
      thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop',
      isLive: true
    },
    {
      id: '2',
      sellerName: 'legomaster',
      sellerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      viewerCount: 87,
      category: 'LEGO',
      title: 'Sets LEGO Exclusivos y Descontinuados',
      thumbnail: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=500&fit=crop',
      isLive: true
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CategoryHeader title="Juguetes" />
      <div className="p-3 border-b border-border">
        <p className="text-sm text-muted-foreground">Encuentra juguetes únicos y coleccionables</p>
      </div>
      <main className="mobile-padding pb-24">
        <div className="grid grid-cols-2 gap-3 mt-2">
          {juguetesChannels.map((channel) => (
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

export default Juguetes;
