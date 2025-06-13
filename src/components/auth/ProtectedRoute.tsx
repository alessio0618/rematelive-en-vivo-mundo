
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from './AuthModal';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  fallback 
}) => {
  const { user, isLoading } = useAuth();
  const [showAuthModal, setShowAuthModal] = React.useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-foreground"></div>
      </div>
    );
  }

  if (!user) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Acceso Requerido</h2>
          <p className="text-foreground/70">
            Debes iniciar sesión para acceder a esta página
          </p>
          <button
            onClick={() => setShowAuthModal(true)}
            className="bg-foreground text-background px-6 py-2 rounded-md font-medium hover:bg-foreground/90 transition-colors"
          >
            Iniciar Sesión
          </button>
        </div>
        
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      </div>
    );
  }

  return <>{children}</>;
};
