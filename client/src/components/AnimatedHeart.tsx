import { useState, useEffect } from 'react';

interface AnimatedHeartProps {
  x: number;
  y: number;
  onComplete?: () => void;
}

const AnimatedHeart: React.FC<AnimatedHeartProps> = ({ x, y, onComplete }) => {
  const [style, setStyle] = useState({
    position: 'absolute',
    left: `${x}px`,
    top: `${y}px`,
    fontSize: `${Math.random() * 10 + 20}px`,
    color: '#FF4365',
    opacity: 1,
    pointerEvents: 'none' as const,
    zIndex: 20,
    transform: 'translateY(0) scale(1)',
  });

  useEffect(() => {
    const animation = setTimeout(() => {
      setStyle(prev => ({
        ...prev,
        transform: 'translateY(-100px) scale(0.5)',
        opacity: 0,
      }));
    }, 100);

    const cleanup = setTimeout(() => {
      if (onComplete) onComplete();
    }, 1500);

    return () => {
      clearTimeout(animation);
      clearTimeout(cleanup);
    };
  }, [onComplete]);

  return (
    <div 
      style={{
        ...style,
        transition: 'all 1.5s ease-out'
      }}
    >
      <i className="fas fa-heart"></i>
    </div>
  );
};

export default AnimatedHeart;
