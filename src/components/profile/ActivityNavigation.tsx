
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Video, Star } from 'lucide-react';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}

interface ActivityNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isMobile?: boolean;
}

const ActivityNavigation: React.FC<ActivityNavigationProps> = ({
  activeSection,
  onSectionChange,
  isMobile = false
}) => {
  const navigationItems: NavigationItem[] = [
    { id: 'purchases', label: 'Compras', icon: ShoppingBag },
    { id: 'sales', label: 'Ventas', icon: ShoppingBag },
    { id: 'streams', label: 'Shows', icon: Video },
    { id: 'reviews', label: 'Reseñas', icon: Star }
  ];

  if (isMobile) {
    return (
      <div className="p-4 border-b border-border bg-background">
        <div className="grid grid-cols-2 gap-2">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeSection === item.id;
            return (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                onClick={() => onSectionChange(item.id)}
                className={`h-12 text-xs ${
                  isActive ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className="flex flex-col items-center space-y-1">
                  <IconComponent className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
              </Button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex space-x-1 bg-muted rounded-lg p-1">
      {navigationItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = activeSection === item.id;
        return (
          <Button
            key={item.id}
            variant="ghost"
            size="sm"
            onClick={() => onSectionChange(item.id)}
            className={`flex-1 text-xs ${
              isActive ? 'bg-background text-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <IconComponent className="w-3 h-3 mr-1" />
            {item.label}
          </Button>
        );
      })}
    </div>
  );
};

export default ActivityNavigation;
