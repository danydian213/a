import { useState, useEffect } from 'react';

interface Position {
  x: number;
  y: number;
}

export default function useMousePosition() {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  
  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', updatePosition);
    
    return () => {
      window.removeEventListener('mousemove', updatePosition);
    };
  }, []);
  
  return position;
}
