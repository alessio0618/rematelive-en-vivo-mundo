
import React from 'react';
import { Home, Compass, Video, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive?: boolean;
}

const BottomNavBar = () => {
  const navItems: NavItem[] = [
    { id: 'inicio', label: 'Inicio', icon: Home, isActive: true },
    { id: 'explorar', label: 'Explorar', icon: Compass },
    { id: 'subir', label: 'Subir en Vivo', icon: Video },
    { id: 'notificaciones', label: 'Notificaciones', icon: Bell },
    { id: 'perfil', label: 'Perfil', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={`flex flex-col items-center space-y-1 h-auto py-2 px-3 ${
                item.isActive 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavBar;
