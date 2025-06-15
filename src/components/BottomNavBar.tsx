
import React from 'react';
import { Home, Search, Video, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  route: string;
}

const BottomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems: NavItem[] = [
    { id: 'inicio', label: 'Inicio', icon: Home, route: '/' },
    { id: 'explorar', label: 'Explorar', icon: Search, route: '/explorar' },
    { id: 'subir', label: 'En Vivo', icon: Video, route: '/subir-en-vivo' },
    { id: 'notificaciones', label: 'Notificaciones', icon: Bell, route: '/notificaciones' },
    { id: 'perfil', label: 'Perfil', icon: User, route: '/perfil' },
  ];

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full bg-background border-t border-border z-50 mobile-safe-area">
      <div className="flex items-center justify-around py-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.route;
          return (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => handleNavigation(item.route)}
              className={`flex flex-col items-center space-y-1 h-auto py-2 px-3 min-w-0 flex-1 hover:bg-accent/20 transition-colors ${
                isActive 
                  ? 'text-foreground border-t-2 border-foreground' 
                  : 'text-foreground border-t-2 border-transparent'
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
