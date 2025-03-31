import { useState, useRef, useEffect } from 'react';
import { useAnniversary } from '../context/AnniversaryContext';
import { musicPlayerContext } from './MusicPlayer';

const VoiceMessage: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { voiceMessagePath } = useAnniversary();
  const [backgroundMusicWasPlaying, setBackgroundMusicWasPlaying] = useState(false);
  
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        // Resume background music if it was playing before
        if (backgroundMusicWasPlaying) {
          musicPlayerContext.play();
        }
      } else {
        // Check if background music is playing and pause it
        setBackgroundMusicWasPlaying(musicPlayerContext.isPlaying);
        musicPlayerContext.pause();
        
        audioRef.current.play().catch(error => {
          console.error("Error playing voice message:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleAudioEnded = () => {
    setIsPlaying(false);
    
    // Resume background music if it was playing before
    if (backgroundMusicWasPlaying) {
      musicPlayerContext.play();
    }
  };
  
  return (
    <section className="py-20 px-4 bg-secondary/30 dark:bg-darkAccent/20 transition-colors">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl text-center mb-12 text-primary">Listen to My Heart</h2>
        
        <div className="bg-white dark:bg-dark/90 rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6 text-5xl text-primary">
            <i className="fas fa-microphone-alt"></i>
          </div>
          
          <p className="mb-6">Click the button below to hear a special message from me.</p>
          
          <button 
            className="bg-gradient-to-r from-primary to-accent text-white py-3 px-8 rounded-full font-medium text-lg shadow-md hover:shadow-lg transition-shadow"
            id="play-voice-btn"
            onClick={togglePlayPause}
          >
            <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'} mr-2`}></i> 
            {isPlaying ? 'Pause' : 'Play Voice Message'}
          </button>
          
          <audio 
            id="voice-message"
            ref={audioRef}
            onEnded={handleAudioEnded}
          >
            <source src={voiceMessagePath} type="audio/ogg" />
          </audio>
        </div>
      </div>
    </section>
  );
};

export default VoiceMessage;
