
import React from 'react';
import { Button } from '@/components/ui/button';

const CategoryBar = () => {
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
    <div className="bg-background border-b border-border">
      <div className="px-3 pb-2">
        <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
          {categories.map((category, index) => (
            <Button
              key={category}
              variant="ghost"
              size="sm"
              className={`whitespace-nowrap text-sm font-medium hover:bg-accent/20 transition-colors ${
                index === 0 
                  ? 'text-foreground border-b-2 border-foreground' 
                  : 'text-foreground border-b-2 border-transparent'
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

export default CategoryBar;
