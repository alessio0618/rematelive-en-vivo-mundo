
import { useState, useEffect, useRef, useCallback } from 'react';

interface SwipeState {
  startY: number;
  currentY: number;
  isDragging: boolean;
  startTime: number;
}

interface UseSwipeNavigationProps {
  onSwipeUp: () => void;
  onSwipeDown: () => void;
  threshold?: number;
  velocityThreshold?: number;
}

// Helper function to check if an element is interactive
const isInteractiveElement = (element: Element): boolean => {
  const interactiveTags = ['INPUT', 'BUTTON', 'TEXTAREA', 'SELECT', 'A'];
  const interactiveRoles = ['button', 'link', 'textbox'];
  
  // Check if element itself is interactive
  if (interactiveTags.includes(element.tagName)) {
    return true;
  }
  
  // Check for interactive roles
  const role = element.getAttribute('role');
  if (role && interactiveRoles.includes(role)) {
    return true;
  }
  
  // Check if element is contentEditable
  if (element.getAttribute('contenteditable') === 'true') {
    return true;
  }
  
  // Check if element has interactive classes (common patterns)
  const className = element.className;
  if (typeof className === 'string' && 
      (className.includes('button') || 
       className.includes('input') || 
       className.includes('clickable'))) {
    return true;
  }
  
  return false;
};

// Helper function to check if event target or its parents are interactive
const isEventOnInteractiveElement = (target: EventTarget | null): boolean => {
  if (!target || !(target instanceof Element)) {
    return false;
  }
  
  let element: Element | null = target;
  
  // Check up to 5 levels of parents to catch nested interactive elements
  for (let i = 0; i < 5 && element; i++) {
    if (isInteractiveElement(element)) {
      return true;
    }
    element = element.parentElement;
  }
  
  return false;
};

export const useSwipeNavigation = ({
  onSwipeUp,
  onSwipeDown,
  threshold = 50,
  velocityThreshold = 0.3
}: UseSwipeNavigationProps) => {
  const [swipeState, setSwipeState] = useState<SwipeState>({
    startY: 0,
    currentY: 0,
    isDragging: false,
    startTime: 0
  });

  const containerRef = useRef<HTMLDivElement>(null);

  // Touch event handlers
  const handleTouchStart = useCallback((e: TouchEvent) => {
    // Skip if touch started on an interactive element
    if (isEventOnInteractiveElement(e.target)) {
      console.log('Touch start on interactive element, skipping swipe');
      return;
    }
    
    const touch = e.touches[0];
    setSwipeState({
      startY: touch.clientY,
      currentY: touch.clientY,
      isDragging: true,
      startTime: Date.now()
    });
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!swipeState.isDragging) return;
    
    const touch = e.touches[0];
    setSwipeState(prev => ({
      ...prev,
      currentY: touch.clientY
    }));

    // Prevent default scrolling
    e.preventDefault();
  }, [swipeState.isDragging]);

  const handleTouchEnd = useCallback(() => {
    if (!swipeState.isDragging) return;

    const deltaY = swipeState.startY - swipeState.currentY;
    const deltaTime = Date.now() - swipeState.startTime;
    const velocity = Math.abs(deltaY) / deltaTime;

    console.log('Touch swipe detected:', { deltaY, velocity, threshold, velocityThreshold });

    // Check if swipe meets criteria
    if (Math.abs(deltaY) > threshold || velocity > velocityThreshold) {
      if (deltaY > 0) {
        // Swiped up - go to next stream
        console.log('Touch swiping up to next stream');
        onSwipeUp();
      } else {
        // Swiped down - go to previous stream
        console.log('Touch swiping down to previous stream');
        onSwipeDown();
      }
    }

    setSwipeState(prev => ({
      ...prev,
      isDragging: false
    }));
  }, [swipeState.isDragging, swipeState.startY, swipeState.currentY, swipeState.startTime, onSwipeUp, onSwipeDown, threshold, velocityThreshold]);

  // Mouse event handlers (mirroring touch logic)
  const handleMouseDown = useCallback((e: MouseEvent) => {
    // Skip if mouse down started on an interactive element
    if (isEventOnInteractiveElement(e.target)) {
      console.log('Mouse down on interactive element, skipping swipe');
      return;
    }
    
    setSwipeState({
      startY: e.clientY,
      currentY: e.clientY,
      isDragging: true,
      startTime: Date.now()
    });
    
    // Prevent text selection during drag
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!swipeState.isDragging) return;
    
    setSwipeState(prev => ({
      ...prev,
      currentY: e.clientY
    }));

    // Prevent default behaviors during drag
    e.preventDefault();
  }, [swipeState.isDragging]);

  const handleMouseUp = useCallback(() => {
    if (!swipeState.isDragging) return;

    const deltaY = swipeState.startY - swipeState.currentY;
    const deltaTime = Date.now() - swipeState.startTime;
    const velocity = Math.abs(deltaY) / deltaTime;

    console.log('Mouse drag detected:', { deltaY, velocity, threshold, velocityThreshold });

    // Check if drag meets criteria
    if (Math.abs(deltaY) > threshold || velocity > velocityThreshold) {
      if (deltaY > 0) {
        // Dragged up - go to next stream
        console.log('Mouse dragging up to next stream');
        onSwipeUp();
      } else {
        // Dragged down - go to previous stream
        console.log('Mouse dragging down to previous stream');
        onSwipeDown();
      }
    }

    setSwipeState(prev => ({
      ...prev,
      isDragging: false
    }));
  }, [swipeState.isDragging, swipeState.startY, swipeState.currentY, swipeState.startTime, onSwipeUp, onSwipeDown, threshold, velocityThreshold]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Touch event listeners
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: false });

    // Mouse event listeners
    container.addEventListener('mousedown', handleMouseDown, { passive: false });
    container.addEventListener('mousemove', handleMouseMove, { passive: false });
    container.addEventListener('mouseup', handleMouseUp, { passive: false });
    
    // Handle mouse leave to end drag if mouse leaves container
    container.addEventListener('mouseleave', handleMouseUp, { passive: false });

    return () => {
      // Clean up touch listeners
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      
      // Clean up mouse listeners
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd, handleMouseDown, handleMouseMove, handleMouseUp]);

  return { containerRef, isDragging: swipeState.isDragging };
};
