import React from 'react';
import CategoryHeader from '@/components/CategoryHeader';
import BottomNavBar from '@/components/BottomNavBar';
import LiveChannelCard from '@/components/LiveChannelCard';

const Moda = () => {
  // Mock data for fashion category live channels
  const modaChannels = [
    {
      id: '1',
      sellerName: 'fashionista',
      sellerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b112b008?w=150&h=150&fit=crop&crop=face',
      viewerCount: 145,
      category: 'Ropa Vintage',
      title: 'MODA VINTAGE Y PIEZAS ÚNICAS DE DISEÑADOR',
      thumbnail: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=500&fit=crop',
      isLive: true
    },
    {
      id: '2',
      sellerName: 'luxurystyle',
      sellerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      viewerCount: 98,
      category: 'Bolsos',
      title: 'Bolsos de Lujo - Hermès, Chanel, Louis Vuitton',
      thumbnail: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=500&fit=crop',
      isLive: true
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CategoryHeader title="Moda" />
      <div className="p-3 border-b border-border">
        <p className="text-sm text-muted-foreground">Descubre moda exclusiva y piezas de diseñador únicas</p>
      </div>
      <main className="mobile-padding pb-24">
        <div className="grid grid-cols-2 gap-3 mt-2">
          {modaChannels.map((channel) => (
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

export default Moda;
