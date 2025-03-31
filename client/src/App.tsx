import { useRef, useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import Header from "./components/Header";
import MusicPlayer from "./components/MusicPlayer";
import DarkModeToggle from "./components/DarkModeToggle";
import Gallery from "./components/Gallery";
import LoveLetter from "./components/LoveLetter";
import InteractiveCards from "./components/InteractiveCards";
import LoveQuiz from "./components/LoveQuiz";
import LoveMeter from "./components/LoveMeter";
import QuoteGenerator from "./components/QuoteGenerator";
import HiddenMessage from "./components/HiddenMessage";
import VoiceMessage from "./components/VoiceMessage";
import Confetti from "./components/Confetti";
import FlowerPetals from "./components/FlowerPetals";
import SurprisePopup from "./components/SurprisePopup";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);

  // Handle dark mode toggle
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Show surprise popup after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSurprise(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      ref={mainContentRef}
      className={`${isDarkMode ? 'dark' : ''} transition-colors duration-500`}
    >
      {/* Particle effects */}
      <Confetti />
      <FlowerPetals />

      {/* Fixed components */}
      <MusicPlayer />
      <DarkModeToggle isDarkMode={isDarkMode} onToggle={toggleDarkMode} />

      {/* Main content */}
      <Header />
      <Gallery />
      <LoveLetter />
      <InteractiveCards />
      <LoveQuiz />
      <LoveMeter />
      <QuoteGenerator />
      <HiddenMessage />
      <VoiceMessage />

      {/* Footer */}
      <footer className="py-8 bg-primary text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-display text-3xl mb-4">8 Years and Forever</h2>
          <p className="mb-4">Happy Anniversary, My Love!</p>
          
          <div className="mt-8 text-sm opacity-80">
            <p>Made with <i className="fas fa-heart text-accent"></i> for you</p>
          </div>
        </div>
      </footer>

      {/* Surprise popup */}
      <SurprisePopup isOpen={showSurprise} onClose={() => setShowSurprise(false)} />
      
      <Toaster />
    </div>
  );
}

export default App;
