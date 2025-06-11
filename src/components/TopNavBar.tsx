
import React from 'react';
import { Search, Bell, Gift } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Logo from './Logo';

const TopNavBar = () => {
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
              className="pl-10 bg-card border-border text-foreground placeholder:text-muted-foreground rounded-full h-10"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-3">
          <Button variant="ghost" size="icon" className="text-foreground h-10 w-10">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-foreground h-10 w-10">
            <Gift className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Category filters */}
      <div className="px-3 pb-2">
        <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
          {categories.map((category, index) => (
            <Button
              key={category}
              variant={index === 0 ? 'default' : 'ghost'}
              size="sm"
              className={`whitespace-nowrap text-sm font-medium ${
                index === 0 
                  ? 'bg-foreground text-background hover:bg-foreground/90' 
                  : 'text-white hover:text-white/80'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;
