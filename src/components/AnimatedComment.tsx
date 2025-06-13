
import React from 'react';

interface AnimatedCommentProps {
  id: number;
  user: string;
  message: string;
  avatar?: string;
  isNew?: boolean;
}

export const AnimatedComment: React.FC<AnimatedCommentProps> = ({ 
  user, 
  message, 
  avatar, 
  isNew = false 
}) => {
  return (
    <div 
      className={`flex items-start space-x-2 p-2 rounded-lg bg-black/40 backdrop-blur-sm mb-2 ${
        isNew ? 'animate-slideInFromBottom' : ''
      }`}
    >
      {avatar && (
        <img 
          src={avatar} 
          alt={user}
          className="w-6 h-6 rounded-full flex-shrink-0"
        />
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-1">
          <span className="text-white font-medium text-sm truncate">{user}</span>
        </div>
        <p className="text-white text-sm break-words">{message}</p>
      </div>
    </div>
  );
};
