
import React from 'react';
import SearchBar from '@/components/SearchBar';
import BottomNavBar from '@/components/BottomNavBar';
import LiveChannelCard from '@/components/LiveChannelCard';

const Sneakers = () => {
  // Mock data for sneakers category live channels
  const sneakersChannels = [
    {
      id: '1',
      sellerName: 'sneakerhead',
      sellerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      viewerCount: 267,
      category: 'Jordan',
      title: 'AIR JORDAN RETRO COLLECTION - EDICIONES LIMITADAS',
      thumbnail: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=500&fit=crop',
      isLive: true
    },
    {
      id: '2',
      sellerName: 'nikecollector',
      sellerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      viewerCount: 134,
      category: 'Nike',
      title: 'Nike Dunk SB Exclusivos y Colaboraciones',
      thumbnail: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop',
      isLive: true
    },
    {
      id: '3',
      sellerName: 'yeezystore',
      sellerAvatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face',
      viewerCount: 189,
      category: 'Yeezy',
      title: 'Adidas Yeezy Boost - Modelos Raros',
      thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop',
      isLive: true
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SearchBar placeholder="Buscar en Sneakers" />
      <div className="p-3 border-b border-border">
        <h1 className="text-xl font-semibold">Sneakers</h1>
        <p className="text-sm text-muted-foreground">Encuentra los sneakers más exclusivos y ediciones limitadas</p>
      </div>
      <main className="mobile-padding pb-24">
        <div className="grid grid-cols-2 gap-3 mt-2">
          {sneakersChannels.map((channel) => (
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

export default Sneakers;
