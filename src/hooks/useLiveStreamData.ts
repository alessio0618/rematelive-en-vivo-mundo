
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface LiveStreamData {
  id: string;
  sellerName: string;
  sellerAvatar: string;
  viewerCount: number;
  category: string;
  title: string;
  thumbnail: string;
  isLive: boolean;
  rating: number;
}

export const useLiveStreamData = (currentStreamId: string) => {
  const navigate = useNavigate();

  // Mock data - in real app this would come from API
  const [streams] = useState<LiveStreamData[]>([
    {
      id: 'dailydeal',
      sellerName: 'dailydeal',
      sellerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      viewerCount: 93,
      category: 'Golf',
      title: 'GRAN SHOW DE GOLF QUE NO TE QUIERES PERDER',
      thumbnail: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=500&fit=crop',
      isLive: true,
      rating: 4.8
    },
    {
      id: 'lifeluxury',
      sellerName: 'lifeluxury',
      sellerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b112b008?w=150&h=150&fit=crop&crop=face',
      viewerCount: 63,
      category: 'Fragancias y Perfumes',
      title: 'Twist of Scent Tuesday — Selecciones Únicas e Inesperadas',
      thumbnail: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop',
      isLive: true,
      rating: 4.6
    },
    {
      id: 'giftexpress',
      sellerName: 'giftexpress',
      sellerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      viewerCount: 142,
      category: 'Perfumes',
      title: 'Perfumes de Lujo y Fragancias Exclusivas',
      thumbnail: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=500&fit=crop',
      isLive: true,
      rating: 4.9
    },
    {
      id: 'perfumesstop',
      sellerName: 'perfumesstop',
      sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      viewerCount: 66,
      category: 'Perfumes',
      title: 'Colección Premium de Perfumes Importados',
      thumbnail: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=500&fit=crop',
      isLive: true,
      rating: 4.5
    },
    {
      id: 'sneakerqueen',
      sellerName: 'sneakerqueen',
      sellerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      viewerCount: 89,
      category: 'Sneakers',
      title: 'Sneakers Exclusivos y Ediciones Limitadas',
      thumbnail: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=500&fit=crop',
      isLive: true,
      rating: 4.7
    },
    {
      id: 'vintagetreasures',
      sellerName: 'vintagetreasures',
      sellerAvatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face',
      viewerCount: 124,
      category: 'Coleccionables',
      title: 'Tesoros Vintage y Artículos Únicos',
      thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop',
      isLive: true,
      rating: 4.8
    }
  ]);

  const currentIndex = streams.findIndex(stream => stream.id === currentStreamId);

  const goToNextStream = () => {
    const nextIndex = (currentIndex + 1) % streams.length;
    const nextStream = streams[nextIndex];
    navigate(`/live/${nextStream.id}`);
  };

  const goToPreviousStream = () => {
    const prevIndex = currentIndex === 0 ? streams.length - 1 : currentIndex - 1;
    const prevStream = streams[prevIndex];
    navigate(`/live/${prevStream.id}`);
  };

  const getCurrentStream = () => {
    return streams[currentIndex] || streams[0];
  };

  return {
    streams,
    currentIndex,
    currentStream: getCurrentStream(),
    goToNextStream,
    goToPreviousStream,
    hasNext: currentIndex < streams.length - 1,
    hasPrevious: currentIndex > 0
  };
};
