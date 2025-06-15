
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  description: string;
  currentBid: number;
  timeLeft: number;
  shipping: number;
  image: string;
  auctionStatus: 'active' | 'ending' | 'extended' | 'sold';
}

interface ChatMessage {
  id: number;
  user: string;
  message: string;
  avatar: string;
  timestamp: number;
}

export const useLiveStreamState = () => {
  const { toast } = useToast();
  
  // Basic state
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(234);
  const [chatMessage, setChatMessage] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showBoostModal, setShowBoostModal] = useState(false);
  const [showOptionsSheet, setShowOptionsSheet] = useState(false);
  const [showComments, setShowComments] = useState(true);
  const [currentWinningBidder, setCurrentWinningBidder] = useState<string | null>(null);
  const [isUserWinning, setIsUserWinning] = useState(false);
  const [showAuctionResult, setShowAuctionResult] = useState(false);

  // Product state
  const [currentProduct, setCurrentProduct] = useState<Product>({
    id: 1,
    name: 'Enamel pins and buttons #1',
    description: 'Single pin on screen ur bidding on! Unless stated during video',
    currentBid: 5,
    timeLeft: 25,
    shipping: 4.74,
    image: 'https://images.unsplash.com/photo-1551524164-6cf6ac6928df?w=100&h=100&fit=crop',
    auctionStatus: 'active'
  });

  // Current user
  const currentUser = {
    username: 'you',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop'
  };

  // Chat messages state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: 1, user: 'user123', message: '¡Excelente producto!', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop', timestamp: Date.now() - 5000 },
    { id: 2, user: 'golfpro', message: 'Me interesa el set completo', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b112b008?w=32&h=32&fit=crop', timestamp: Date.now() - 3000 },
    { id: 3, user: 'maria_g', message: '¿Cuál es el precio final?', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop', timestamp: Date.now() - 1000 }
  ]);

  // Simulate competing bidders
  useEffect(() => {
    if (currentProduct.auctionStatus === 'active') {
      const simulateBids = () => {
        if (Math.random() > 0.7) {
          const competingBidders = ['user123', 'golfpro', 'maria_g', 'sneaker_king', 'collector_pro'];
          const randomBidder = competingBidders[Math.floor(Math.random() * competingBidders.length)];
          
          setCurrentProduct(prev => ({
            ...prev,
            currentBid: prev.currentBid + 2
          }));
          
          setCurrentWinningBidder(randomBidder);
          setIsUserWinning(false);
          
          toast({
            title: "Nueva puja",
            description: `${randomBidder} ha pujado $${currentProduct.currentBid + 2}`
          });
        }
      };

      const interval = setInterval(simulateBids, 8000 + Math.random() * 12000);
      return () => clearInterval(interval);
    }
  }, [currentProduct.auctionStatus, currentProduct.currentBid, toast]);

  const getBidderStatus = () => {
    if (currentProduct.auctionStatus === 'sold') {
      return isUserWinning ? '🏆 ¡HAS GANADO!' : '🏁 TERMINADO';
    }
    if (isUserWinning) {
      return '🥇 ¡ESTÁS GANANDO!';
    }
    if (currentWinningBidder && currentWinningBidder !== 'you') {
      return `😰 ${currentWinningBidder} está ganando`;
    }
    return '🎯 ¡Haz tu primera puja!';
  };

  return {
    // State
    isFollowing,
    setIsFollowing,
    isLiked,
    setIsLiked,
    likeCount,
    setLikeCount,
    chatMessage,
    setChatMessage,
    showShareModal,
    setShowShareModal,
    showBoostModal,
    setShowBoostModal,
    showOptionsSheet,
    setShowOptionsSheet,
    showComments,
    setShowComments,
    currentWinningBidder,
    setCurrentWinningBidder,
    isUserWinning,
    setIsUserWinning,
    showAuctionResult,
    setShowAuctionResult,
    currentProduct,
    setCurrentProduct,
    chatMessages,
    setChatMessages,
    currentUser,
    getBidderStatus
  };
};
