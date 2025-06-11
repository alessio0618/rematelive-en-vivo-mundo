
import React from 'react';
import LiveChannelCard from './LiveChannelCard';

const HomeFeed = () => {
  // Mock data for live channels with Spanish content
  const liveChannels = [
    {
      id: '1',
      sellerName: 'dailydeal',
      sellerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      viewerCount: 93,
      category: 'Golf',
      title: 'GRAN SHOW DE GOLF QUE NO TE QUIERES PERDER',
      thumbnail: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=500&fit=crop',
      isLive: true
    },
    {
      id: '2',
      sellerName: 'lifeluxury',
      sellerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b112b008?w=150&h=150&fit=crop&crop=face',
      viewerCount: 63,
      category: 'Fragancias y Perfumes',
      title: 'Twist of Scent Tuesday — Selecciones Únicas e Inesperadas',
      thumbnail: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop',
      isLive: true
    },
    {
      id: '3',
      sellerName: 'giftexpress',
      sellerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      viewerCount: 142,
      category: 'Perfumes',
      title: 'Perfumes de Lujo y Fragancias Exclusivas',
      thumbnail: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=500&fit=crop',
      isLive: true
    },
    {
      id: '4',
      sellerName: 'perfumesstop',
      sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      viewerCount: 66,
      category: 'Perfumes',
      title: 'Colección Premium de Perfumes Importados',
      thumbnail: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=500&fit=crop',
      isLive: true
    },
    {
      id: '5',
      sellerName: 'sneakerqueen',
      sellerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      viewerCount: 89,
      category: 'Sneakers',
      title: 'Sneakers Exclusivos y Ediciones Limitadas',
      thumbnail: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=500&fit=crop',
      isLive: true
    },
    {
      id: '6',
      sellerName: 'vintagetreasures',
      sellerAvatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face',
      viewerCount: 124,
      category: 'Coleccionables',
      title: 'Tesoros Vintage y Artículos Únicos',
      thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop',
      isLive: true
    }
  ];

  return (
    <div className="mobile-padding pb-24 min-h-screen">
      <div className="grid grid-cols-2 gap-2 mt-2">
        {liveChannels.map((channel) => (
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
    </div>
  );
};

export default HomeFeed;
