
import React, { useState } from 'react';

const CategoryBar = () => {
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
    <div className="bg-background border-b border-border">
      <div className="px-3 pb-2">
        <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap text-sm font-medium hover:bg-accent/20 transition-colors px-3 py-1.5 rounded-md ${
                activeCategory === category 
                  ? 'text-foreground border-b-2 border-foreground' 
                  : 'text-foreground border-b-2 border-transparent'
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

export default CategoryBar;
