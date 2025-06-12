import React, { useState } from 'react';
import { TrendingUp, Hash, Gamepad2, Shirt, Baby, Laptop, Star, Sofa, Home, ChefHat, Diamond, Dumbbell, Smartphone, Palette, Book, Leaf, Heart, Wrench, Sparkles, Car } from 'lucide-react';
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
      name: 'Mueblería',
      icon: Sofa,
      viewerCount: 756,
      liveCount: 12,
      color: 'bg-muted'
    },
    {
      id: 4,
      name: 'Hogar',
      icon: Home,
      viewerCount: 634,
      liveCount: 18,
      color: 'bg-muted'
    },
    {
      id: 5,
      name: 'Cocina',
      icon: ChefHat,
      viewerCount: 523,
      liveCount: 9,
      color: 'bg-muted'
    },
    {
      id: 6,
      name: 'Joyas',
      icon: Diamond,
      viewerCount: 612,
      liveCount: 14,
      color: 'bg-muted'
    },
    {
      id: 7,
      name: 'Deportes',
      icon: Dumbbell,
      viewerCount: 789,
      liveCount: 21,
      color: 'bg-muted'
    },
    {
      id: 8,
      name: 'Tecnología',
      icon: Smartphone,
      viewerCount: 945,
      liveCount: 17,
      color: 'bg-muted'
    },
    {
      id: 9,
      name: 'Arte y Antigüedades',
      icon: Palette,
      viewerCount: 456,
      liveCount: 8,
      color: 'bg-muted'
    },
    {
      id: 10,
      name: 'Libros',
      icon: Book,
      viewerCount: 334,
      liveCount: 6,
      color: 'bg-muted'
    },
    {
      id: 11,
      name: 'Plantas y Jardín',
      icon: Leaf,
      viewerCount: 298,
      liveCount: 5,
      color: 'bg-muted'
    },
    {
      id: 12,
      name: 'Mascotas',
      icon: Heart,
      viewerCount: 512,
      liveCount: 11,
      color: 'bg-muted'
    },
    {
      id: 13,
      name: 'Herramientas',
      icon: Wrench,
      viewerCount: 423,
      liveCount: 9,
      color: 'bg-muted'
    },
    {
      id: 14,
      name: 'Salud y Belleza',
      icon: Sparkles,
      viewerCount: 667,
      liveCount: 13,
      color: 'bg-muted'
    },
    {
      id: 15,
      name: 'Automotive',
      icon: Car,
      viewerCount: 578,
      liveCount: 10,
      color: 'bg-muted'
    },
    {
      id: 16,
      name: 'Sneakers',
      icon: Shirt,
      viewerCount: 834,
      liveCount: 19,
      color: 'bg-muted'
    },
    {
      id: 17,
      name: 'Moda',
      icon: Shirt,
      viewerCount: 523,
      liveCount: 9,
      color: 'bg-muted'
    },
    {
      id: 18,
      name: 'Juguetes y Juegos',
      icon: Gamepad2,
      viewerCount: 634,
      liveCount: 18,
      color: 'bg-muted'
    },
    {
      id: 19,
      name: 'Bebés y Niños',
      icon: Baby,
      viewerCount: 412,
      liveCount: 7,
      color: 'bg-muted'
    },
    {
      id: 20,
      name: 'Electrónicos',
      icon: Laptop,
      viewerCount: 398,
      liveCount: 11,
      color: 'bg-muted'
    },
    {
      id: 21,
      name: 'Coleccionables',
      icon: Hash,
      viewerCount: 287,
      liveCount: 6,
      color: 'bg-muted'
    }
  ];

  // Sort categories based on active filter
  const sortedCategories = [...categories].sort((a, b) => {
    if (activeFilter === 'Popular') {
      return b.viewerCount - a.viewerCount;
    } else if (activeFilter === 'A-Z') {
      return a.name.localeCompare(b.name);
    }
    // Default 'Recomendado' - keep original order
    return 0;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SearchBar placeholder="Buscar categorías" />
      
      <main className="mobile-padding pb-24">
        {/* Filter tabs with consistent styling */}
        <div className="flex space-x-3 mb-6 mt-4 overflow-x-auto scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`tab-button ${
                activeFilter === filter 
                  ? 'tab-button-active' 
                  : 'tab-button-inactive'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-2 gap-3">
          {sortedCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Card 
                key={category.id}
                className="bg-card border-border p-4 hover:bg-accent/20 transition-colors cursor-pointer"
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
