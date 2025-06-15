
```tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, Video } from 'lucide-react';

interface BecomeSellerPromptProps {
  onScheduleShow: () => void;
}

export const BecomeSellerPrompt: React.FC<BecomeSellerPromptProps> = ({ onScheduleShow }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center mt-8">
      <Card className="w-full max-w-md p-6 border-border">
        <CardHeader>
          <Rocket className="w-16 h-16 mx-auto text-primary mb-4" />
          <CardTitle className="text-2xl font-bold">¡Conviértete en Vendedor!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            ¿Tienes productos increíbles para mostrar? ¡Empieza a vender en vivo y llega a miles de compradores!
          </p>
          <p className="text-muted-foreground">
            Programa tu primer show para activar tu panel de vendedor y acceder a todas las herramientas.
          </p>
          <Button
            onClick={onScheduleShow}
            className="w-full mt-4 font-bold [text-shadow:0_0_5px_black,0_0_5px_black]"
            size="lg"
          >
            <Video className="mr-2 h-5 w-5" />
            Programar tu Primer Show
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
```
