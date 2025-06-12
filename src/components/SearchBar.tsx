
import React from 'react';
import { Search, Bell, Video } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  placeholder: string;
}

const SearchBar = ({ placeholder }: SearchBarProps) => {
  return (
    <div className="bg-background border-b border-border mobile-header">
      <div className="flex items-center justify-between p-3">
        <div className="flex-1 max-w-none mx-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground w-4 h-4" />
            <Input 
              placeholder={placeholder}
              className="pl-10 bg-muted border-border text-foreground placeholder:text-foreground/70 rounded-full h-10 focus-visible:ring-accent focus-visible:border-accent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-3">
          <Button variant="ghost" size="icon" className="text-foreground h-10 w-10 hover:bg-accent/30">
            <Bell className="w-5 h-5 text-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="text-foreground h-10 w-10 hover:bg-accent/30">
            <Video className="w-5 h-5 text-foreground" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
