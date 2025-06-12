
import React, { useState } from 'react';
import { Search, Bell, Video } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const TopNavBar = () => {
  const [activeCategory, setActiveCategory] = useState('Para Ti');
  
  const categories = [
    'Para Ti',
    'Cartas',
    'Sneakers', 
    'Moda',
    'Juguetes',
    'Electrónicos',
    'Coleccionables'
  ];

  return (
    <div className="bg-background border-b border-border mobile-header">
      {/* Main search bar with notifications */}
      <div className="flex items-center justify-between p-3">
        <div className="flex-1 max-w-none mx-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Buscar RemateLive"
              className="pl-10 bg-card border-border text-foreground placeholder:text-muted-foreground rounded-full h-10 focus-visible:ring-accent focus-visible:border-accent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-3">
          <Button variant="ghost" size="icon" className="text-foreground h-10 w-10 hover:bg-accent/20">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-foreground h-10 w-10 hover:bg-accent/20">
            <Video className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Category filters with consistent styling */}
      <div className="px-3 pb-2">
        <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`tab-button ${
                activeCategory === category 
                  ? 'tab-button-active' 
                  : 'tab-button-inactive'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;
