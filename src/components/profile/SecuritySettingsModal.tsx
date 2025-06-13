
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Shield, Key, Smartphone, Clock, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SecuritySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SecuritySettingsModal: React.FC<SecuritySettingsModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState('password');
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const securitySections = [
    { id: 'password', label: 'Contraseña', icon: Key },
    { id: 'twoFactor', label: '2FA', icon: Smartphone },
    { id: 'sessions', label: 'Sesiones', icon: Clock },
    { id: 'privacy', label: 'Privacidad', icon: Shield }
  ];

  const handleChangePassword = () => {
    if (!passwordData.current || !passwordData.new || !passwordData.confirm) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos",
        variant: "destructive"
      });
      return;
    }
    
    if (passwordData.new !== passwordData.confirm) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Contraseña actualizada",
      description: "Tu contraseña ha sido cambiada exitosamente",
    });
    
    setPasswordData({ current: '', new: '', confirm: '' });
  };

  const handleToggle2FA = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    toast({
      title: twoFactorEnabled ? "2FA desactivado" : "2FA activado",
      description: twoFactorEnabled ? "Autenticación de dos factores desactivada" : "Autenticación de dos factores activada",
    });
  };

  const activeSessions = [
    { id: 1, device: 'iPhone 13', location: 'Ciudad de México', lastActive: '2 min ago', current: true },
    { id: 2, device: 'Chrome - Windows', location: 'Guadalajara', lastActive: '1 hour ago', current: false },
    { id: 3, device: 'Safari - MacBook', location: 'Monterrey', lastActive: '3 days ago', current: false }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'password':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">Contraseña actual</Label>
              <Input
                id="currentPassword"
                type="password"
                value={passwordData.current}
                onChange={(e) => setPasswordData(prev => ({ ...prev, current: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="newPassword">Nueva contraseña</Label>
              <Input
                id="newPassword"
                type="password"
                value={passwordData.new}
                onChange={(e) => setPasswordData(prev => ({ ...prev, new: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwordData.confirm}
                onChange={(e) => setPasswordData(prev => ({ ...prev, confirm: e.target.value }))}
              />
            </div>
            <Button onClick={handleChangePassword} className="w-full">
              Cambiar contraseña
            </Button>
          </div>
        );
      
      case 'twoFactor':
        return (
          <div className="space-y-4">
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-foreground font-medium">Autenticación de dos factores</h3>
                    <p className="text-muted-foreground text-sm">
                      Agrega una capa extra de seguridad a tu cuenta
                    </p>
                  </div>
                  <Switch
                    checked={twoFactorEnabled}
                    onCheckedChange={handleToggle2FA}
                  />
                </div>
              </CardContent>
            </Card>
            {twoFactorEnabled && (
              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <h3 className="text-foreground font-medium mb-2">Configurar aplicación autenticadora</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Escanea el código QR con tu aplicación autenticadora
                  </p>
                  <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center mb-4">
                    <span className="text-muted-foreground">QR Code</span>
                  </div>
                  <Input placeholder="Código de verificación" />
                </CardContent>
              </Card>
            )}
          </div>
        );
      
      case 'sessions':
        return (
          <div className="space-y-3">
            {activeSessions.map((session) => (
              <Card key={session.id} className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-foreground font-medium text-sm">{session.device}</h3>
                        {session.current && (
                          <span className="text-green-500 text-xs">Actual</span>
                        )}
                      </div>
                      <p className="text-muted-foreground text-xs">{session.location}</p>
                      <p className="text-muted-foreground text-xs">{session.lastActive}</p>
                    </div>
                    {!session.current && (
                      <Button size="sm" variant="outline">
                        Cerrar sesión
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      
      case 'privacy':
        return (
          <div className="space-y-4">
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-foreground font-medium">Perfil público</h3>
                      <p className="text-muted-foreground text-sm">
                        Permitir que otros usuarios vean tu perfil
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-foreground font-medium">Mostrar actividad</h3>
                      <p className="text-muted-foreground text-sm">
                        Mostrar tu actividad reciente en tu perfil
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-foreground font-medium">Permitir mensajes</h3>
                      <p className="text-muted-foreground text-sm">
                        Recibir mensajes de otros usuarios
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                  <div>
                    <h3 className="text-red-800 font-medium">Eliminar cuenta</h3>
                    <p className="text-red-700 text-sm mb-3">
                      Esta acción es permanente y no se puede deshacer
                    </p>
                    <Button variant="destructive" size="sm">
                      Eliminar cuenta
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Configuración de Seguridad</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Custom Navigation */}
          <div className="grid grid-cols-2 gap-2">
            {securitySections.map((section) => {
              const IconComponent = section.icon;
              return (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveSection(section.id)}
                  className="justify-start"
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {section.label}
                </Button>
              );
            })}
          </div>

          {/* Content */}
          <div className="mt-4">
            {renderContent()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SecuritySettingsModal;
