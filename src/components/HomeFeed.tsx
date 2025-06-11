
import React from 'react';
import LiveChannelCard from './LiveChannelCard';

const HomeFeed = () => {
  // Mock data for live channels
  const liveChannels = [
    {
      id: '1',
      sellerName: 'Carlos_Cartas',
      sellerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      viewerCount: 1247,
      category: 'Cartas',
      thumbnail: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=225&fit=crop',
      isLive: true
    },
    {
      id: '2',
      sellerName: 'SneakerQueen',
      sellerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b112b008?w=150&h=150&fit=crop&crop=face',
      viewerCount: 892,
      category: 'Sneakers',
      thumbnail: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=225&fit=crop',
      isLive: true
    },
    {
      id: '3',
      sellerName: 'Moda_Maria',
      sellerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      viewerCount: 634,
      category: 'Moda',
      thumbnail: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=225&fit=crop',
      isLive: true
    },
    {
      id: '4',
      sellerName: 'TechGuru_MX',
      sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      viewerCount: 1056,
      category: 'Electrónicos',
      thumbnail: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=225&fit=crop',
      isLive: true
    },
    {
      id: '5',
      sellerName: 'JuguetesJuan',
      sellerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      viewerCount: 423,
      category: 'Juguetes',
      thumbnail: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=225&fit=crop',
      isLive: true
    },
    {
      id: '6',
      sellerName: 'Vintage_Treasures',
      sellerAvatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face',
      viewerCount: 789,
      category: 'Coleccionables',
      thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=225&fit=crop',
      isLive: true
    }
  ];

  return (
    <div className="p-4 pb-20"> {/* Extra padding for bottom nav */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Canales en Vivo</h2>
        <p className="text-muted-foreground">
          Descubre vendedores transmitiendo ahora mismo
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {liveChannels.map((channel) => (
          <LiveChannelCard
            key={channel.id}
            sellerName={channel.sellerName}
            sellerAvatar={channel.sellerAvatar}
            viewerCount={channel.viewerCount}
            category={channel.category}
            thumbnail={channel.thumbnail}
            isLive={channel.isLive}
          />
        ))}
      </div>

      {/* Featured section */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-foreground mb-4">Vendedores Destacados</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {liveChannels.slice(0, 2).map((channel) => (
            <LiveChannelCard
              key={`featured-${channel.id}`}
              sellerName={channel.sellerName}
              sellerAvatar={channel.sellerAvatar}
              viewerCount={channel.viewerCount}
              category={channel.category}
              thumbnail={channel.thumbnail}
              isLive={channel.isLive}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeFeed;
