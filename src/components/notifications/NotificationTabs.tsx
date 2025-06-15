
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface NotificationTabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const NotificationTabs: React.FC<NotificationTabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="border-b border-border mt-4 mb-4">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="w-full justify-start rounded-none bg-transparent p-0 overflow-x-auto scrollbar-hide h-auto -mb-px">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="relative whitespace-nowrap rounded-none border-b-2 border-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-foreground data-[state=active]:text-foreground data-[state=active]:shadow-none hover:bg-transparent hover:text-foreground"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default NotificationTabs;
