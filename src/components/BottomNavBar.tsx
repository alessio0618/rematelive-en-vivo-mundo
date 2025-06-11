
import React from 'react';
import { Home, Search, Gift, Heart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive?: boolean;
}

const BottomNavBar = () => {
  const navItems: NavItem[] = [
    { id: 'inicio', label: 'Home', icon: Home, isActive: true },
    { id: 'categorias', label: 'Categories', icon: Search },
    { id: 'vendedor', label: 'Seller Hub', icon: Gift },
    { id: 'actividad', label: 'Activity', icon: Heart },
    { id: 'cuenta', label: 'Account', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 mobile-safe-area">
      <div className="flex items-center justify-around py-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={`flex flex-col items-center space-y-1 h-auto py-2 px-3 min-w-0 flex-1 ${
                item.isActive 
                  ? 'text-white border-t-2 border-white' 
                  : 'text-muted-foreground hover:text-white border-t-2 border-transparent'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-medium leading-none">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavBar;
