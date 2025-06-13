import React from 'react';
import CategoryHeader from '@/components/CategoryHeader';
import BottomNavBar from '@/components/BottomNavBar';
import LiveChannelCard from '@/components/LiveChannelCard';

const Electronicos = () => {
  // Mock data for electronics category live channels
  const electronicosChannels = [
    {
      id: '1',
      sellerName: 'techdeals',
      sellerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      viewerCount: 234,
      category: 'Smartphones',
      title: 'IPHONES Y SMARTPHONES ÚLTIMA GENERACIÓN',
      thumbnail: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop',
      isLive: true
    },
    {
      id: '2',
      sellerName: 'gamerstore',
      sellerAvatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face',
      viewerCount: 178,
      category: 'Gaming',
      title: 'Consolas y Accesorios Gaming - PS5, Xbox',
      thumbnail: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=500&fit=crop',
      isLive: true
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CategoryHeader title="Electrónicos" />
      <div className="p-3 border-b border-border">
        <p className="text-sm text-muted-foreground">Tecnología de última generación y gadgets exclusivos</p>
      </div>
      <main className="mobile-padding pb-24">
        <div className="grid grid-cols-2 gap-3 mt-2">
          {electronicosChannels.map((channel) => (
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

export default Electronicos;
