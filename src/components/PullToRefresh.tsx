
import React from 'react';
import { RefreshCw } from 'lucide-react';
import { usePullToRefresh } from '@/hooks/usePullToRefresh';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
}

export const PullToRefresh: React.FC<PullToRefreshProps> = ({ onRefresh, children }) => {
  const { containerRef, isRefreshing, pullDistance, isPulling } = usePullToRefresh({
    onRefresh,
    threshold: 80
  });

  const pullProgress = Math.min(pullDistance / 80, 1);
  const showRefreshIcon = pullDistance > 20;

  return (
    <div ref={containerRef} className="relative">
      {/* Pull indicator */}
      <div 
        className="absolute top-0 left-0 right-0 flex items-center justify-center transition-transform duration-200 z-10"
        style={{
          transform: `translateY(${pullDistance - 60}px)`,
          opacity: showRefreshIcon ? pullProgress : 0
        }}
      >
        <div className="bg-background/90 backdrop-blur-sm rounded-full p-3 shadow-lg border border-border">
          <RefreshCw 
            className={`w-5 h-5 text-foreground transition-transform duration-200 ${
              isRefreshing ? 'animate-spin' : ''
            }`}
            style={{
              transform: `rotate(${pullProgress * 180}deg)`
            }}
          />
        </div>
      </div>

      {/* Content with pull offset */}
      <div 
        className="transition-transform duration-200"
        style={{
          transform: `translateY(${isPulling ? pullDistance * 0.5 : 0}px)`
        }}
      >
        {children}
      </div>
    </div>
  );
};
