
import React from 'react';
import SearchBar from '@/components/SearchBar';
import CategoryBar from '@/components/CategoryBar';
import BottomNavBar from '@/components/BottomNavBar';
import HomeFeed from '@/components/HomeFeed';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SearchBar placeholder="Buscar RemateLive" />
      <CategoryBar />
      <main className="relative">
        <HomeFeed />
      </main>
      <BottomNavBar />
    </div>
  );
};

export default Index;
