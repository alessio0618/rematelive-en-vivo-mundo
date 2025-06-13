
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const CategoryBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const categories = [
    { name: 'Para Ti', path: '/' },
    { name: 'Cartas', path: '/categoria/cartas' },
    { name: 'Sneakers', path: '/categoria/sneakers' }, 
    { name: 'Moda', path: '/categoria/moda' },
    { name: 'Juguetes', path: '/categoria/juguetes' },
    { name: 'Electrónicos', path: '/categoria/electronicos' },
    { name: 'Coleccionables', path: '/categoria/coleccionables' }
  ];

  const handleCategoryClick = (path: string, categoryName: string) => {
    console.log('Category clicked:', categoryName, 'Path:', path);
    navigate(path);
  };

  return (
    <div className="bg-background border-b border-border relative z-20">
      <div className="px-3 pb-2">
        <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
          {categories.map((category) => {
            const isActive = location.pathname === category.path;
            return (
              <button
                key={category.name}
                onClick={() => handleCategoryClick(category.path, category.name)}
                className={`
                  whitespace-nowrap text-sm font-medium transition-all duration-200
                  px-4 py-2 rounded-md cursor-pointer select-none
                  min-h-[44px] min-w-[44px] flex items-center justify-center
                  ${isActive 
                    ? 'bg-muted text-foreground border-b-2 border-foreground' 
                    : 'text-foreground bg-transparent border-b-2 border-transparent hover:bg-accent hover:text-foreground'
                  }
                `}
                style={{ 
                  pointerEvents: 'auto',
                  touchAction: 'manipulation',
                  userSelect: 'none'
                }}
              >
                {category.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
