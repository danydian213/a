import { useEffect, useRef } from 'react';

const FlowerPetals: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const petalSrcs = [
      '<i class="fas fa-heart text-pink-300"></i>',
      '<i class="fas fa-heart text-red-400"></i>',
      '<i class="fas fa-heart text-pink-400"></i>'
    ];
    
    const petals: HTMLDivElement[] = [];
    
    // Create petal elements
    for (let i = 0; i < 30; i++) {
      const petal = document.createElement('div');
      petal.innerHTML = petalSrcs[Math.floor(Math.random() * petalSrcs.length)];
      petal.style.position = 'absolute';
      petal.style.fontSize = `${Math.random() * 15 + 10}px`;
      petal.style.left = `${Math.random() * 100}%`;
      petal.style.top = `-50px`;
      petal.style.opacity = `${Math.random() + 0.2}`;
      petal.style.pointerEvents = 'none';
      
      container.appendChild(petal);
      petals.push(petal);
      
      // Animate each petal
      const keyframes = [
        { 
          transform: `translateY(0) rotate(0deg)`, 
          opacity: 0.7 
        },
        { 
          transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`, 
          opacity: 0 
        }
      ];
      
      const options = {
        duration: (Math.random() * 5 + 5) * 1000,
        delay: Math.random() * 5000,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        iterations: Infinity
      };
      
      petal.animate(keyframes, options);
    }
    
    // Clean up
    return () => {
      petals.forEach(petal => {
        if (petal.parentNode === container) {
          container.removeChild(petal);
        }
      });
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      id="petals-container" 
      className="fixed w-full h-full top-0 left-0 pointer-events-none z-40"
    />
  );
};

export default FlowerPetals;
