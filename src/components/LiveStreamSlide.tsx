import React from 'react';
import { ShareModal } from '@/components/ShareModal';
import { BoostModal } from '@/components/BoostModal';
import { StreamOptionsSheet } from '@/components/StreamOptionsSheet';
import { AuctionResultModal } from '@/components/AuctionResultModal';
import { LiveStreamHeader } from '@/components/LiveStreamHeader';
import { StreamVideo } from '@/components/StreamVideo';
import { AuctionSection } from '@/components/AuctionSection';
import { ChatInput } from '@/components/ChatInput';
import { useLiveStreamState } from '@/hooks/useLiveStreamState';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  
  const {
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
    getBidderStatus,
    handleTimerExtend,
    handleTimeUpdate
  } = useLiveStreamState();

  // Event handlers
  const handleBid = (productId: number, bidAmount: number) => {
    console.log(`Bid placed for product ${productId}: $${bidAmount}`);
    toast({
      title: "¡Puja realizada!",
      description: `Has pujado $${bidAmount} por ${currentProduct.name}`
    });
    
    setCurrentProduct(prev => ({
      ...prev,
      currentBid: bidAmount,
      auctionStatus: prev.timeLeft <= 10 ? 'extended' : 'active'
    }));
    
    setCurrentWinningBidder('you');
    setIsUserWinning(true);
    
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 50, 50]);
    }
  };

  const handleAuctionEnd = () => {
    setCurrentProduct(prev => ({
      ...prev,
      auctionStatus: 'sold',
      timeLeft: 0
    }));
    
    if (isUserWinning) {
      setShowAuctionResult(true);
    }
    
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100, 50, 100]);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    
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
    
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 30, 50]);
    }
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    
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
      
      const newMessage = {
        id: Date.now(),
        user: currentUser.username,
        message: chatMessage.trim(),
        avatar: currentUser.avatar,
        timestamp: Date.now()
      };

      setChatMessages(prev => [...prev, newMessage]);
      
      toast({
        title: "Mensaje enviado",
        description: "Tu mensaje se ha enviado al chat"
      });
      setChatMessage('');
      
      const chatInput = document.querySelector('input[placeholder="Escribe un mensaje..."]') as HTMLInputElement;
      if (chatInput) {
        chatInput.blur();
      }
    }
  };

  const handleFocusChat = () => {
    setShowComments(true);
    setTimeout(() => {
      const chatInput = document.querySelector('input[placeholder="Escribe un mensaje..."]') as HTMLInputElement;
      if (chatInput) {
        chatInput.focus();
        chatInput.click();
      }
    }, 100);
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
      <LiveStreamHeader 
        streamData={streamData}
        onShowOptions={() => setShowOptionsSheet(true)}
      />

      <StreamVideo
        streamData={streamData}
        chatMessages={chatMessages}
        showComments={showComments}
        isFollowing={isFollowing}
        isLiked={isLiked}
        likeCount={likeCount}
        onDoubleTapLike={handleDoubleTapLike}
        onFollow={handleFollow}
        onLike={handleLike}
        onFocusChat={handleFocusChat}
        onShare={() => setShowShareModal(true)}
        onBoost={() => setShowBoostModal(true)}
        onScreenshot={handleScreenshot}
      />

      <div className="bg-background border-t border-border pb-4">
        <AuctionSection
          currentProduct={currentProduct}
          bidderStatus={getBidderStatus()}
          onBid={handleBid}
          onAuctionEnd={handleAuctionEnd}
          onTimerExtend={handleTimerExtend}
          onTimeUpdate={handleTimeUpdate}
        />

        <ChatInput
          chatMessage={chatMessage}
          setChatMessage={setChatMessage}
          onSendMessage={handleSendMessage}
          onFocus={() => setShowComments(true)}
        />
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

      <AuctionResultModal
        isOpen={showAuctionResult}
        onClose={() => setShowAuctionResult(false)}
        isWinner={isUserWinning}
        productName={currentProduct.name}
        finalBid={currentProduct.currentBid}
        winnerName={!isUserWinning ? currentWinningBidder : undefined}
      />
    </div>
  );
};
