import React from 'react';
import { StreamPreview } from './StreamPreview';
import { PullToRefresh } from './PullToRefresh';
import { FloatingActionButton } from './FloatingActionButton';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

const HomeFeed = () => {
  // Mock data for live channels with Spanish content
  const liveChannels = [
    {
      id: 'dailydeal',
      sellerName: 'dailydeal',
      sellerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      viewerCount: 93,
      category: 'Golf',
      title: 'GRAN SHOW DE GOLF QUE NO TE QUIERES PERDER',
      thumbnail: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=500&fit=crop',
      isLive: true
    },
    {
      id: 'lifeluxury',
      sellerName: 'lifeluxury',
      sellerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b112b008?w=150&h=150&fit=crop&crop=face',
      viewerCount: 63,
      category: 'Fragancias y Perfumes',
      title: 'Twist of Scent Tuesday — Selecciones Únicas e Inesperadas',
      thumbnail: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop',
      isLive: true
    },
    {
      id: 'giftexpress',
      sellerName: 'giftexpress',
      sellerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      viewerCount: 142,
      category: 'Perfumes',
      title: 'Perfumes de Lujo y Fragancias Exclusivas',
      thumbnail: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=500&fit=crop',
      isLive: true
    },
    {
      id: 'perfumesstop',
      sellerName: 'perfumesstop',
      sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      viewerCount: 66,
      category: 'Perfumes',
      title: 'Colección Premium de Perfumes Importados',
      thumbnail: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=500&fit=crop',
      isLive: true
    },
    {
      id: 'sneakerqueen',
      sellerName: 'sneakerqueen',
      sellerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      viewerCount: 89,
      category: 'Sneakers',
      title: 'Sneakers Exclusivos y Ediciones Limitadas',
      thumbnail: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=500&fit=crop',
      isLive: true
    },
    {
      id: 'vintagetreasures',
      sellerName: 'vintagetreasures',
      sellerAvatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face',
      viewerCount: 124,
      category: 'Coleccionables',
      title: 'Tesoros Vintage y Artículos Únicos',
      thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop',
      isLive: true
    }
  ];

  const loadMoreStreams = async (page: number) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return paginated mock data
    const startIndex = (page - 1) * 6;
    const endIndex = startIndex + 6;
    return liveChannels.slice(startIndex, endIndex);
  };

  const { data: streams, loading, hasMore, loadingRef, refresh } = useInfiniteScroll({
    loadMore: loadMoreStreams,
    initialData: liveChannels.slice(0, 6)
  });

  const handleRefresh = async () => {
    await refresh();
  };

  const handleStreamPreview = (stream: any) => {
    console.log('Previewing stream:', stream.sellerName);
  };

  return (
    <div className="relative">
      <PullToRefresh onRefresh={handleRefresh}>
        <div className="mobile-padding pb-24 min-h-screen">
          <div className="grid grid-cols-2 gap-3 mt-2">
            {streams.map((channel) => (
              <StreamPreview
                key={channel.id}
                stream={channel}
                onPreview={handleStreamPreview}
              />
            ))}
          </div>

          {/* Loading indicator for infinite scroll */}
          {hasMore && (
            <div ref={loadingRef} className="flex justify-center py-4">
              {loading && (
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <div className="w-4 h-4 animate-spin rounded-full border-2 border-foreground border-r-transparent"></div>
                  <span className="text-sm">Loading more streams...</span>
                </div>
              )}
            </div>
          )}
        </div>
      </PullToRefresh>

      <FloatingActionButton />
    </div>
  );
};

export default HomeFeed;
