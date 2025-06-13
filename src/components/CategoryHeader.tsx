
import React from 'react';
import { ArrowLeft, Search, Bell, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CategoryHeaderProps {
  title: string;
}

const CategoryHeader = ({ title }: CategoryHeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="bg-background border-b border-border">
      <div className="flex items-center justify-between p-3 h-14">
        {/* Back button */}
        <button
          onClick={handleBack}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-accent/20 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>

        {/* Category title */}
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>

        {/* Action buttons */}
        <div className="flex items-center space-x-1">
          <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-accent/20 transition-colors">
            <Search className="w-5 h-5 text-foreground" />
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-accent/20 transition-colors">
            <Bell className="w-5 h-5 text-foreground" />
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-accent/20 transition-colors">
            <Video className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryHeader;
