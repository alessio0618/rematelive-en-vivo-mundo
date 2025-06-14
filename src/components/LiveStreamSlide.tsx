import React, { useState } from 'react';
import { ArrowLeft, MoreHorizontal, Users, Heart, MessageCircle, Share, Wallet, ShoppingBag, Zap, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { SlideToBid } from '@/components/SlideToBid';
import { AutoBidModal } from '@/components/AutoBidModal';
import { CustomBidModal } from '@/components/CustomBidModal';
import { ShareModal } from '@/components/ShareModal';
import { BoostModal } from '@/components/BoostModal';
import { StreamOptionsSheet } from '@/components/StreamOptionsSheet';
import { DoubleTapHandler } from '@/components/DoubleTapHandler';
import { CommentOverlay } from '@/components/CommentOverlay';
import { usePinchZoom } from '@/hooks/usePinchZoom';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface LiveStreamSlideProps {
  streamData: {
    id: string;
    sellerName: string;
    sellerAvatar: string;
    viewerCount: number;
    category: string;
    title: string;
    thumbnail: string;
    isLive: boolean;
    rating: number;
  };
  isActive: boolean;
}

export const LiveStreamSlide: React.FC<LiveStreamSlideProps> = ({ streamData, isActive }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State management
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(234);
  const [chatMessage, setChatMessage] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showBoostModal, setShowBoostModal] = useState(false);
  const [showOptionsSheet, setShowOptionsSheet] = useState(false);
  const [showComments, setShowComments] = useState(true);
  const [showAutoBidModal, setShowAutoBidModal] = useState(false);
  const [showCustomBidModal, setShowCustomBidModal] = useState(false);
  const [autoBidMaxAmount, setAutoBidMaxAmount] = useState<number | null>(null);

  // Pinch zoom for video
  const { containerRef: zoomRef, scale, resetZoom, transform } = usePinchZoom({
    minZoom: 1,
    maxZoom: 3
  });

  // Mock product data
  const currentProduct = {
    id: 1,
    name: 'Enamel pins and buttons #1',
    description: 'Single pin on screen ur bidding on! Unless stated during video',
    currentBid: 5,
    timeLeft: '00:05',
    shipping: 4.74,
    image: 'https://images.unsplash.com/photo-1551524164-6cf6ac6928df?w=100&h=100&fit=crop'
  };

  const chatMessages = [
    { id: 1, user: 'user123', message: '¡Excelente producto!', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop', timestamp: Date.now() - 5000 },
    { id: 2, user: 'golfpro', message: 'Me interesa el set completo', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b112b008?w=32&h=32&fit=crop', timestamp: Date.now() - 3000 },
    { id: 3, user: 'maria_g', message: '¿Cuál es el precio final?', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop', timestamp: Date.now() - 1000 }
  ];

  // Event handlers
  const handleBid = (productId: number, bidAmount: number) => {
    console.log(`Bid placed for product ${productId}: $${bidAmount}`);
    toast({
      title: "¡Puja realizada!",
      description: `Has pujado $${bidAmount} por ${currentProduct.name}`
    });
    
    // Update the current bid in the product (in real app, this would update via API)
    currentProduct.currentBid = bidAmount;
    
    // Add haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 50, 50]);
    }
  };

  const handleSetAutoBid = (maxAmount: number) => {
    setAutoBidMaxAmount(maxAmount);
    toast({
      title: "Auto-Bid Activado",
      description: `Auto-bid configurado hasta $${maxAmount}`
    });
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    
    // Add haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(25);
    }
    
    toast({
      title: isLiked ? "Like removido" : "¡Te gusta este stream!",
      description: isLiked ? "Has removido tu like" : "Has dado like al stream"
    });
  };

  const handleDoubleTapLike = () => {
    if (!isLiked) {
      setIsLiked(true);
    }
    setLikeCount(prev => prev + 1);
    
    // Add stronger haptic feedback for double tap
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 30, 50]);
    }
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    
    // Add haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    
    toast({
      title: isFollowing ? "Dejaste de seguir" : "¡Ahora sigues a este vendedor!",
      description: isFollowing ? `Ya no sigues a ${streamData.sellerName}` : `Ahora sigues a ${streamData.sellerName}`
    });
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      console.log('Sending message:', chatMessage);
      toast({
        title: "Mensaje enviado",
        description: "Tu mensaje se ha enviado al chat"
      });
      setChatMessage('');
    }
  };

  const handleClip = () => {
    toast({
      title: "Clip creado",
      description: "Se ha creado un clip de este momento"
    });
  };

  const handleWallet = () => {
    navigate('/perfil');
    toast({
      title: "Navegando a wallet",
      description: "Abriendo tu wallet..."
    });
  };

  const handleShop = () => {
    toast({
      title: "Tienda del vendedor",
      description: `Abriendo la tienda de ${streamData.sellerName}`
    });
  };

  const handleFocusChat = () => {
    setShowComments(true);
    const chatInput = document.querySelector('input[placeholder="Escribe un mensaje..."]') as HTMLInputElement;
    if (chatInput) {
      chatInput.focus();
    }
  };

  const handleScreenshot = () => {
    toast({
      title: "Captura realizada",
      description: "Se ha capturado una imagen del stream"
    });
  };

  const currentUrl = `${window.location.origin}/live/${streamData.id}`;

  return (
    <div className="h-full bg-background text-foreground flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/')}
          className="text-foreground hover:bg-transparent"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 bg-red-500 text-white px-2 py-1 rounded-full">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium">{streamData.viewerCount}</span>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-foreground hover:bg-transparent"
            onClick={() => setShowOptionsSheet(true)}
          >
            <MoreHorizontal className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Video Stream Area with Pinch Zoom and Double Tap */}
      <div className="relative flex-1 bg-black overflow-hidden">
        <div ref={zoomRef} className="w-full h-full">
          <DoubleTapHandler onLike={handleDoubleTapLike}>
            <div 
              className="w-full h-full transition-transform duration-200 origin-center"
              style={{ transform }}
            >
              <img 
                src={streamData.thumbnail} 
                alt="Live stream"
                className="w-full h-full object-cover"
              />
            </div>
          </DoubleTapHandler>
        </div>

        {/* Zoom indicator */}
        {scale > 1 && (
          <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
            {scale.toFixed(1)}x
          </div>
        )}

        {/* Reset zoom button */}
        {scale > 1 && (
          <Button
            onClick={resetZoom}
            className="absolute bottom-4 left-4 bg-black/50 text-white hover:bg-black/70"
            size="sm"
          >
            Reset Zoom
          </Button>
        )}
        
        {/* Seller Profile Overlay */}
        <div className="absolute top-4 left-4 right-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src={streamData.sellerAvatar} 
                alt={streamData.sellerName}
                className="w-12 h-12 rounded-full border-2 border-white"
              />
              <div>
                <h3 className="text-white font-bold text-lg">{streamData.sellerName}</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-foreground text-sm">★ {streamData.rating}</span>
                  <span className="text-white text-sm">•</span>
                  <span className="text-white text-sm">Live</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleFollow}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent/20 ${
                isFollowing 
                  ? 'text-foreground border border-foreground' 
                  : 'text-foreground border border-transparent'
              }`}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>
        </div>

        {/* Comment Overlay */}
        <CommentOverlay comments={chatMessages} isVisible={showComments} />

        {/* Action Buttons */}
        <div className="absolute bottom-4 right-4 flex flex-col space-y-3">
          <div className="flex flex-col items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className={`bg-black/50 hover:bg-black/70 rounded-full ${isLiked ? 'text-red-500' : 'text-white'}`}
              onClick={handleLike}
            >
              <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
            </Button>
            <span className={`text-white text-xs mt-1 ${likeCount !== 234 ? 'animate-bounceCount' : ''}`}>
              {likeCount}
            </span>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="bg-black/50 text-white hover:bg-black/70 rounded-full"
            onClick={handleFocusChat}
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="bg-black/50 text-white hover:bg-black/70 rounded-full"
            onClick={() => setShowShareModal(true)}
          >
            <Share className="w-6 h-6" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="bg-black/50 text-white hover:bg-black/70 rounded-full"
            onClick={() => setShowBoostModal(true)}
          >
            <Zap className="w-6 h-6" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="bg-black/50 text-white hover:bg-black/70 rounded-full"
            onClick={handleScreenshot}
          >
            <Camera className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Bottom Section - Auction and Chat Input */}
      <div className="h-80 flex flex-col bg-background">
        {/* Current Product Section */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-foreground font-semibold">Current Auction</h4>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-foreground">${currentProduct.currentBid}</span>
              <span className="text-red-500 font-mono text-lg">{currentProduct.timeLeft}</span>
            </div>
          </div>
          
          <Card className="bg-card border-border p-4">
            <div className="flex items-start space-x-3 mb-3">
              <img 
                src={currentProduct.image} 
                alt={currentProduct.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h5 className="text-foreground font-bold text-lg mb-1">{currentProduct.name}</h5>
                <p className="text-foreground/70 text-sm mb-2">{currentProduct.description}</p>
                <p className="text-foreground/60 text-sm">${currentProduct.shipping.toFixed(2)} Shipping + Taxes</p>
                {autoBidMaxAmount && (
                  <div className="mt-2 flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-yellow-600">Auto-bid: up to ${autoBidMaxAmount}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <SlideToBid
                currentBid={currentProduct.currentBid}
                onBid={(amount) => handleBid(currentProduct.id, amount)}
                onOpenAutoBid={() => setShowAutoBidModal(true)}
                onOpenCustomBid={() => setShowCustomBidModal(true)}
              />
            </div>
          </Card>
        </div>

        {/* Chat Input */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <Input
                placeholder="Escribe un mensaje..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 bg-card border-border text-foreground placeholder:text-gray-400"
                onFocus={() => setShowComments(true)}
              />
              <Button 
                size="icon"
                className="bg-foreground text-background hover:bg-foreground/90"
                onClick={handleSendMessage}
              >
                <MessageCircle className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals and Sheets */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        streamUrl={currentUrl}
        streamTitle={streamData.title}
      />
      
      <BoostModal
        isOpen={showBoostModal}
        onClose={() => setShowBoostModal(false)}
        sellerName={streamData.sellerName}
      />
      
      <StreamOptionsSheet
        isOpen={showOptionsSheet}
        onClose={() => setShowOptionsSheet(false)}
        sellerName={streamData.sellerName}
      />

      <AutoBidModal
        isOpen={showAutoBidModal}
        onClose={() => setShowAutoBidModal(false)}
        currentBid={currentProduct.currentBid}
        onSetAutoBid={handleSetAutoBid}
      />

      <CustomBidModal
        isOpen={showCustomBidModal}
        onClose={() => setShowCustomBidModal(false)}
        currentBid={currentProduct.currentBid}
        onBid={(amount) => handleBid(currentProduct.id, amount)}
      />
    </div>
  );
};
