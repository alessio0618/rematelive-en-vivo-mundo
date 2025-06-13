
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
    <div className="bg-background border-b border-border">
      <div className="px-3 pb-2">
        <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
          {categories.map((category) => {
            const isActive = location.pathname === category.path;
            return (
              <button
                key={category.name}
                onClick={() => handleCategoryClick(category.path, category.name)}
                className={`nav-button whitespace-nowrap text-sm font-medium transition-colors px-3 py-1.5 rounded-md ${
                  isActive 
                    ? 'nav-button-active bg-muted text-foreground' 
                    : 'nav-button-inactive text-muted-foreground hover:text-foreground'
                }`}
                style={{ minHeight: '44px', minWidth: '60px' }}
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
