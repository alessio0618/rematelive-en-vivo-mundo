
import React, { useState } from 'react';
import { TrendingUp, Hash, Gamepad2, Shirt, Baby, Laptop, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import SearchBar from '@/components/SearchBar';
import BottomNavBar from '@/components/BottomNavBar';

const Explorar = () => {
  const [activeFilter, setActiveFilter] = useState('Recomendado');
  
  const filters = ['Recomendado', 'Popular', 'A-Z'];
  
  const categories = [
    {
      id: 1,
      name: 'Artículos Deportivos',
      icon: TrendingUp,
      viewerCount: 1240,
      liveCount: 23,
      color: 'bg-muted'
    },
    {
      id: 2,
      name: 'Memorabilia Deportiva',
      icon: Star,
      viewerCount: 890,
      liveCount: 15,
      color: 'bg-muted'
    },
    {
      id: 3,
      name: 'Belleza',
      icon: Hash,
      viewerCount: 756,
      liveCount: 12,
      color: 'bg-muted'
    },
    {
      id: 4,
      name: 'Juguetes y Juegos',
      icon: Gamepad2,
      viewerCount: 634,
      liveCount: 18,
      color: 'bg-muted'
    },
    {
      id: 5,
      name: 'Moda',
      icon: Shirt,
      viewerCount: 523,
      liveCount: 9,
      color: 'bg-muted'
    },
    {
      id: 6,
      name: 'Bebés y Niños',
      icon: Baby,
      viewerCount: 412,
      liveCount: 7,
      color: 'bg-muted'
    },
    {
      id: 7,
      name: 'Electrónicos',
      icon: Laptop,
      viewerCount: 398,
      liveCount: 11,
      color: 'bg-muted'
    },
    {
      id: 8,
      name: 'Coleccionables',
      icon: Star,
      viewerCount: 287,
      liveCount: 6,
      color: 'bg-muted'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SearchBar placeholder="Buscar categorías" />
      
      <main className="mobile-padding pb-24">
        {/* Filter tabs */}
        <div className="flex space-x-3 mb-6 mt-4 overflow-x-auto scrollbar-hide">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveFilter(filter)}
              className={`whitespace-nowrap text-sm font-medium transition-colors ${
                activeFilter === filter 
                  ? 'bg-foreground text-background hover:bg-foreground/90' 
                  : 'text-foreground bg-muted hover:bg-accent/30'
              }`}
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card 
                key={category.id}
                className="bg-card border-border p-4 card-hover cursor-pointer"
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-foreground" />
                  </div>
                  <div>
                    <h3 className="text-foreground font-semibold text-sm mb-1">{category.name}</h3>
                    <div className="flex items-center justify-center space-x-2 text-xs text-foreground">
                      <span>{category.viewerCount} viewers</span>
                      <span>•</span>
                      <span>{category.liveCount} en vivo</span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
};

export default Explorar;
