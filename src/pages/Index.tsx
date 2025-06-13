
import React from 'react';
import SearchBar from '@/components/SearchBar';
import CategoryBar from '@/components/CategoryBar';
import BottomNavBar from '@/components/BottomNavBar';
import HomeFeed from '@/components/HomeFeed';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SearchBar placeholder="Buscar RemateLive" />
      <div className="category-bar relative z-20">
        <CategoryBar />
      </div>
      <main className="relative z-10">
        <HomeFeed />
      </main>
      <BottomNavBar />
    </div>
  );
};

export default Index;
