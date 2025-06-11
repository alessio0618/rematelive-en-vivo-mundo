
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Logo from './Logo';

const TopNavBar = () => {
  const categories = [
    'Todos',
    'Cartas',
    'Sneakers', 
    'Moda',
    'Juguetes',
    'Electrónicos',
    'Coleccionables'
  ];

  return (
    <div className="bg-background border-b border-border">
      {/* Main search bar */}
      <div className="flex items-center justify-between p-4">
        <Logo size="md" />
        
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Buscar vendedores, productos..."
              className="pl-10 bg-card border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <Button variant="ghost" size="icon" className="text-foreground">
          <Filter className="w-5 h-5" />
        </Button>
      </div>

      {/* Category filters */}
      <div className="px-4 pb-3">
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === 'Todos' ? 'default' : 'secondary'}
              size="sm"
              className="whitespace-nowrap text-sm"
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
