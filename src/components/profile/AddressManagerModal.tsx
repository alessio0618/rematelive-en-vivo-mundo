
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Plus, Edit, Trash2, Home, Building } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AddressManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddressManagerModal: React.FC<AddressManagerModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [addresses] = useState([
    {
      id: 1,
      type: 'home',
      title: 'Casa',
      street: 'Calle Principal 123',
      city: 'Ciudad de México',
      state: 'CDMX',
      zipCode: '06100',
      isDefault: true
    },
    {
      id: 2,
      type: 'work',
      title: 'Trabajo',
      street: 'Av. Reforma 456',
      city: 'Ciudad de México',
      state: 'CDMX',
      zipCode: '06600',
      isDefault: false
    }
  ]);

  const handleAddAddress = () => {
    toast({
      title: "Próximamente",
      description: "La función para agregar direcciones estará disponible pronto",
    });
  };

  const handleEditAddress = (id: number) => {
    toast({
      title: "Próximamente",
      description: "La función para editar direcciones estará disponible pronto",
    });
  };

  const handleDeleteAddress = (id: number) => {
    toast({
      title: "Próximamente",
      description: "La función para eliminar direcciones estará disponible pronto",
    });
  };

  const getAddressIcon = (type: string) => {
    return type === 'home' ? Home : Building;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Mis Direcciones</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Add New Address */}
          <Button 
            onClick={handleAddAddress}
            className="w-full"
            variant="outline"
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar nueva dirección
          </Button>

          {/* Addresses List */}
          <div className="space-y-3">
            {addresses.map((address) => {
              const IconComponent = getAddressIcon(address.type);
              return (
                <Card key={address.id} className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-foreground" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-foreground font-medium">
                              {address.title}
                            </span>
                            {address.isDefault && (
                              <Badge variant="secondary" className="text-xs">
                                Principal
                              </Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground text-sm">
                            {address.street}
                          </p>
                          <p className="text-muted-foreground text-sm">
                            {address.city}, {address.state} {address.zipCode}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleEditAddress(address.id)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleDeleteAddress(address.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="pt-4 border-t">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleAddAddress}
              className="w-full"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Usar ubicación actual
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddressManagerModal;
