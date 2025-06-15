
import React from 'react';

interface NotificationFiltersProps {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const NotificationFilters: React.FC<NotificationFiltersProps> = ({ filters, activeFilter, onFilterChange }) => {
  return (
    <div className="flex space-x-2 mb-6 overflow-x-auto scrollbar-hide">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`whitespace-nowrap text-xs transition-colors px-3 py-1.5 rounded-md hover:bg-accent/20 ${
            activeFilter === filter
              ? 'text-foreground border-b-2 border-foreground bg-muted'
              : 'text-foreground bg-muted border-b-2 border-transparent'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default NotificationFilters;
