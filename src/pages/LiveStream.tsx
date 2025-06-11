
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MoreHorizontal, Users, Heart, MessageCircle, Share, Wallet, ShoppingBag, Zap, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const LiveStream = () => {
  const { sellerId } = useParams();
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  // Mock data - in real app this would come from API
  const streamData = {
    sellerName: 'dailydeal',
    sellerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    viewerCount: 93,
    rating: 4.8,
    isLive: true,
    streamTitle: 'GRAN SHOW DE GOLF QUE NO TE QUIERES PERDER',
    thumbnail: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=500&fit=crop'
  };

  const products = [
    {
      id: 1,
      name: 'Golf Club Set Premium',
      currentBid: 150,
      timeLeft: '2:45',
      image: 'https://images.unsplash.com/photo-1551524164-6cf6ac6928df?w=100&h=100&fit=crop'
    },
    {
      id: 2,
      name: 'Professional Golf Balls',
      currentBid: 45,
      timeLeft: '5:12',
      image: 'https://images.unsplash.com/photo-1587174147853-e61b9d1e4d3a?w=100&h=100&fit=crop'
    }
  ];

  const chatMessages = [
    { id: 1, user: 'user123', message: '¡Excelente producto!' },
    { id: 2, user: 'golfpro', message: 'Me interesa el set completo' },
    { id: 3, user: 'maria_g', message: '¿Cuál es el precio final?' }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
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
          
          <Button variant="ghost" size="icon" className="text-foreground hover:bg-transparent">
            <MoreHorizontal className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Video Stream Area */}
      <div className="relative aspect-[9/16] bg-black">
        <img 
          src={streamData.thumbnail} 
          alt="Live stream"
          className="w-full h-full object-cover"
        />
        
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
                  <span className="text-yellow-400 text-sm">★ {streamData.rating}</span>
                  <span className="text-white text-sm">•</span>
                  <span className="text-white text-sm">Live</span>
                </div>
              </div>
            </div>
            
            <Button
              variant={isFollowing ? "secondary" : "default"}
              size="sm"
              onClick={() => setIsFollowing(!isFollowing)}
              className="bg-white text-black hover:bg-gray-200"
            >
              {isFollowing ? 'Following' : 'Follow'}
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-4 right-4 flex flex-col space-y-3">
          <Button variant="ghost" size="icon" className="bg-black/50 text-white hover:bg-black/70 rounded-full">
            <Heart className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="bg-black/50 text-white hover:bg-black/70 rounded-full">
            <MessageCircle className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="bg-black/50 text-white hover:bg-black/70 rounded-full">
            <Share className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="bg-black/50 text-white hover:bg-black/70 rounded-full">
            <Zap className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="bg-black/50 text-white hover:bg-black/70 rounded-full">
            <Camera className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex-1 flex flex-col">
        {/* Products Section */}
        <div className="p-4 border-b border-border">
          <h4 className="text-foreground font-semibold mb-3">Productos en Vivo</h4>
          <div className="space-y-3">
            {products.map((product) => (
              <Card key={product.id} className="bg-card border-border p-3">
                <div className="flex items-center space-x-3">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h5 className="text-foreground font-medium text-sm">{product.name}</h5>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-green-400 font-bold">${product.currentBid}</span>
                      <span className="text-yellow-400 text-sm">{product.timeLeft}</span>
                    </div>
                  </div>
                  <Button size="sm" className="bg-yellow-400 text-black hover:bg-yellow-500">
                    Pujar
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Chat Section */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-4 space-y-2 overflow-y-auto">
            {chatMessages.map((msg) => (
              <div key={msg.id} className="flex space-x-2">
                <span className="text-yellow-400 font-medium text-sm">{msg.user}:</span>
                <span className="text-foreground text-sm">{msg.message}</span>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <Input
                placeholder="Escribe un mensaje..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="flex-1 bg-card border-border text-foreground placeholder:text-gray-400"
              />
              <Button 
                size="icon"
                className="bg-yellow-400 text-black hover:bg-yellow-500"
              >
                <MessageCircle className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="p-4 border-t border-border bg-card">
          <div className="flex items-center justify-around">
            <Button variant="ghost" size="sm" className="flex flex-col items-center text-foreground hover:bg-transparent">
              <MoreHorizontal className="w-5 h-5 mb-1" />
              <span className="text-xs">More</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col items-center text-foreground hover:bg-transparent">
              <Zap className="w-5 h-5 mb-1" />
              <span className="text-xs">Boost</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col items-center text-foreground hover:bg-transparent">
              <Camera className="w-5 h-5 mb-1" />
              <span className="text-xs">Clip</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col items-center text-foreground hover:bg-transparent">
              <Share className="w-5 h-5 mb-1" />
              <span className="text-xs">Share</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col items-center text-foreground hover:bg-transparent">
              <Wallet className="w-5 h-5 mb-1" />
              <span className="text-xs">Wallet</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col items-center text-foreground hover:bg-transparent">
              <ShoppingBag className="w-5 h-5 mb-1" />
              <span className="text-xs">Shop</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveStream;
