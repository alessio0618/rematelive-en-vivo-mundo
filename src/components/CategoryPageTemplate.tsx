
import React from 'react';
import CategoryHeader from '@/components/CategoryHeader';
import BottomNavBar from '@/components/BottomNavBar';
import LiveChannelCard from '@/components/LiveChannelCard';
import { CategoryData } from '@/data/categoryData';

interface CategoryPageTemplateProps {
  categoryData: CategoryData;
}

const CategoryPageTemplate = ({ categoryData }: CategoryPageTemplateProps) => {
  const { title, description, channels } = categoryData;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CategoryHeader title={title} />
      <div className="p-3 border-b border-border">
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <main className="mobile-padding pb-24">
        <div className="grid grid-cols-2 gap-3 mt-2">
          {channels.map((channel) => (
            <LiveChannelCard
              key={channel.id}
              sellerName={channel.sellerName}
              sellerAvatar={channel.sellerAvatar}
              viewerCount={channel.viewerCount}
              category={channel.category}
              title={channel.title}
              thumbnail={channel.thumbnail}
              isLive={channel.isLive}
            />
          ))}
        </div>
      </main>
      <BottomNavBar />
    </div>
  );
};

export default CategoryPageTemplate;
