
import React, { useState, useEffect } from 'react';
import { AnimatedComment } from './AnimatedComment';

interface Comment {
  id: number;
  user: string;
  message: string;
  avatar?: string;
  timestamp: number;
}

interface CommentOverlayProps {
  comments: Comment[];
  isVisible: boolean;
}

export const CommentOverlay: React.FC<CommentOverlayProps> = ({ comments, isVisible }) => {
  const [displayComments, setDisplayComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (isVisible) {
      setDisplayComments(comments.slice(-5)); // Show last 5 comments
    }
  }, [comments, isVisible]);

  if (!isVisible || displayComments.length === 0) {
    return null;
  }

  return (
    <div className="absolute bottom-20 left-4 right-16 max-h-64 overflow-hidden pointer-events-none z-40">
      <div className="space-y-1">
        {displayComments.map((comment, index) => (
          <AnimatedComment
            key={comment.id}
            id={comment.id}
            user={comment.user}
            message={comment.message}
            avatar={comment.avatar}
            isNew={index === displayComments.length - 1}
          />
        ))}
      </div>
    </div>
  );
};
