import { useEffect, useRef } from 'react';

const Confetti: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const colors = ['#FF6B8A', '#F8D0D9', '#FF4365', '#FFD700'];
    const confettiPieces: HTMLDivElement[] = [];
    
    // Create confetti pieces
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      
      // Set confetti style
      confetti.style.position = 'absolute';
      confetti.style.width = `${Math.random() * 10 + 5}px`;
      confetti.style.height = `${Math.random() * 10 + 5}px`;
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.top = `-20px`;
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      confetti.style.opacity = `${Math.random() + 0.5}`;
      confetti.style.pointerEvents = 'none';
      
      // Add to container
      container.appendChild(confetti);
      confettiPieces.push(confetti);
      
      // Animate each piece
      const keyframes = [
        { 
          transform: `translateY(0) rotate(0deg)`, 
          opacity: 1 
        },
        { 
          transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, 
          opacity: 0 
        }
      ];
      
      const options = {
        duration: (Math.random() * 3 + 2) * 1000,
        easing: 'cubic-bezier(0.4, 0, 1, 1)',
        fill: 'forwards' as FillMode
      };
      
      confetti.animate(keyframes, options);
    }
    
    // Clean up
    return () => {
      confettiPieces.forEach(piece => {
        if (piece.parentNode === container) {
          container.removeChild(piece);
        }
      });
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      id="confetti-container" 
      className="fixed w-full h-full top-0 left-0 pointer-events-none z-50"
    />
  );
};

export default Confetti;
