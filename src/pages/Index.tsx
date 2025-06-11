
import React from 'react';
import TopNavBar from '@/components/TopNavBar';
import BottomNavBar from '@/components/BottomNavBar';
import HomeFeed from '@/components/HomeFeed';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNavBar />
      <main className="relative">
        <HomeFeed />
      </main>
      <BottomNavBar />
    </div>
  );
};

export default Index;
