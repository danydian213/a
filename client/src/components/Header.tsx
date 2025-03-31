import { useRef } from 'react';
import CountdownTimer from './CountdownTimer';
import { useAnniversary } from '../context/AnniversaryContext';
import useTypingEffect from '../hooks/useTypingEffect';

const Header: React.FC = () => {
  const { personalPhotos } = useAnniversary();
  const text = "To the love of my life, my partner, my best friend.";
  const typedText = useTypingEffect(text, 50);
  const gallerySectionRef = useRef<HTMLElement | null>(null);
  
  const handleStartJourney = () => {
    const gallerySection = document.getElementById('gallery-section');
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <header className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-pink-100/80 to-primary/30 dark:from-darkAccent/50 dark:to-dark/80 z-10"></div>
          <img 
            src={personalPhotos[0]}
            alt="Background image" 
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      
      <div className="relative z-10 text-center">
        <h1 className="font-display text-5xl md:text-7xl font-bold mb-2 text-accent drop-shadow-md">8 Years Together</h1>
        <p className="font-body text-xl md:text-2xl mb-8 overflow-hidden whitespace-nowrap mx-auto max-w-lg" id="main-title-text">
          {typedText}
        </p>
        
        <CountdownTimer />
        
        <button 
          className="mt-8 bg-gradient-to-r from-primary to-accent text-white py-3 px-8 rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-shadow rainbow-hover animate-pulse-slow"
          id="start-journey"
          onClick={handleStartJourney}
        >
          Start Our Journey
        </button>
      </div>
    </header>
  );
};

export default Header;
