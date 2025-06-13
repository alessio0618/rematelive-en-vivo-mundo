
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Shield, Key, Smartphone, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SecuritySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SecuritySettingsModal: React.FC<SecuritySettingsModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Contraseña actualizada",
      description: "Tu contraseña ha sido cambiada exitosamente",
    });
    
    setFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleTwoFactorToggle = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    toast({
      title: twoFactorEnabled ? "2FA desactivado" : "2FA activado",
      description: twoFactorEnabled 
        ? "La autenticación de dos factores ha sido desactivada"
        : "La autenticación de dos factores ha sido activada",
    });
  };

  const activeSessions = [
    {
      id: 1,
      device: 'iPhone 13 Pro',
      location: 'Ciudad de México, México',
      lastActive: '2024-11-20 14:30',
      current: true
    },
    {
      id: 2,
      device: 'MacBook Pro',
      location: 'Ciudad de México, México',
      lastActive: '2024-11-19 18:45',
      current: false
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Configuración de Seguridad</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Change Password */}
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-4">
                <Key className="w-5 h-5 text-foreground" />
                <h3 className="text-sm font-medium text-foreground">Cambiar Contraseña</h3>
              </div>
              
              <form onSubmit={handlePasswordChange} className="space-y-3">
                <div>
                  <Label htmlFor="currentPassword">Contraseña actual</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      placeholder="Ingresa tu contraseña actual"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-auto p-1"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="newPassword">Nueva contraseña</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      placeholder="Ingresa tu nueva contraseña"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-auto p-1"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirmar nueva contraseña</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirma tu nueva contraseña"
                  />
                </div>

                <Button type="submit" size="sm" className="w-full">
                  Cambiar Contraseña
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Two-Factor Authentication */}
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Smartphone className="w-5 h-5 text-foreground" />
                  <div>
                    <h3 className="text-sm font-medium text-foreground">Autenticación de dos factores</h3>
                    <p className="text-xs text-muted-foreground">Añade una capa extra de seguridad</p>
                  </div>
                </div>
                <Switch
                  checked={twoFactorEnabled}
                  onCheckedChange={handleTwoFactorToggle}
                />
              </div>
              
              {twoFactorEnabled && (
                <div className="mt-3">
                  <Button variant="outline" size="sm">
                    Configurar aplicación autenticadora
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Active Sessions */}
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="w-5 h-5 text-foreground" />
                <h3 className="text-sm font-medium text-foreground">Sesiones Activas</h3>
              </div>
              
              <div className="space-y-3">
                {activeSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium text-foreground">{session.device}</p>
                        {session.current && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            Actual
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{session.location}</p>
                      <p className="text-xs text-muted-foreground">Última actividad: {session.lastActive}</p>
                    </div>
                    {!session.current && (
                      <Button variant="outline" size="sm">
                        Cerrar
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SecuritySettingsModal;
