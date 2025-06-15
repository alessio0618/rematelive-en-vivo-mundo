
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatInputProps {
  chatMessage: string;
  setChatMessage: (message: string) => void;
  onSendMessage: () => void;
  onFocus: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  chatMessage,
  setChatMessage,
  onSendMessage,
  onFocus
}) => {
  return (
    <div className="px-4 pb-4 pt-2 mb-16">
      <div className="flex space-x-2">
        <Input
          placeholder="Escribe un mensaje..."
          value={chatMessage}
          onChange={(e) => {
            console.log('Input change:', e.target.value);
            setChatMessage(e.target.value);
          }}
          onKeyDown={(e) => {
            console.log('Key pressed:', e.key);
            if (e.key === 'Enter') {
              e.preventDefault();
              onSendMessage();
            }
          }}
          className="flex-1 bg-card border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-foreground/20"
          onFocus={() => {
            console.log('Input focused');
            onFocus();
          }}
          onBlur={() => {
            console.log('Input blurred');
          }}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          tabIndex={0}
          style={{ 
            touchAction: 'manipulation',
            WebkitUserSelect: 'text',
            userSelect: 'text'
          }}
        />
        <Button 
          size="icon"
          className="bg-background text-foreground hover:bg-accent/20 border border-border flex-shrink-0"
          onClick={(e) => {
            console.log('Send button clicked');
            e.preventDefault();
            onSendMessage();
          }}
          type="button"
        >
          <MessageCircle className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
