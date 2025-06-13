
import React, { useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const CategoryBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, scrollLeft: 0 });
  
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
    // Only navigate if we're not in the middle of a drag
    if (!isDragging) {
      console.log('Category clicked:', categoryName, 'Path:', path);
      navigate(path);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    
    setIsDragging(false); // Reset dragging state
    setDragStart({
      x: e.pageX - scrollContainerRef.current.offsetLeft,
      scrollLeft: scrollContainerRef.current.scrollLeft
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - dragStart.x) * 2; // Multiply by 2 for faster scrolling
    
    // If mouse has moved more than 5px, consider it a drag
    if (Math.abs(walk) > 5) {
      setIsDragging(true);
      scrollContainerRef.current.scrollLeft = dragStart.scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    // Reset drag state after a short delay to prevent click from firing
    setTimeout(() => setIsDragging(false), 100);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="bg-background border-b border-border relative z-20">
      <div className="px-3 pb-2">
        <div 
          ref={scrollContainerRef}
          className="flex flex-nowrap overflow-x-auto scrollbar-hide gap-3 pb-1 cursor-grab active:cursor-grabbing select-none"
          style={{ touchAction: 'pan-x' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {categories.map((category) => {
            const isActive = location.pathname === category.path;
            return (
              <button
                key={category.name}
                onClick={() => handleCategoryClick(category.path, category.name)}
                className={`
                  flex-shrink-0 whitespace-nowrap text-sm font-medium transition-all duration-200
                  px-4 py-2 rounded-md cursor-pointer select-none
                  min-h-[44px] min-w-fit flex items-center justify-center
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
