import { useState, useRef, useEffect } from 'react';
import ourSongPath from '@assets/ssstik.io_1743058456140.mp3';

// Create a global audio context to manage audio playback across components
export const musicPlayerContext = {
  pause: () => {},
  play: () => {},
  isPlaying: false
};

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true); // Start with playing true
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error("Error playing audio:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  // Auto-play when component mounts
  useEffect(() => {
    if (audioRef.current) {
      // Delay auto-play to avoid browser restrictions
      const playPromise = setTimeout(() => {
        audioRef.current?.play().catch(error => {
          console.error("Auto-play failed:", error);
          setIsPlaying(false);
        });
      }, 1000);
      
      return () => clearTimeout(playPromise);
    }
  }, []);
  
  // Update progress bar
  useEffect(() => {
    const updateProgress = () => {
      if (audioRef.current) {
        const { currentTime, duration } = audioRef.current;
        const progressPercent = (currentTime / duration) * 100;
        setProgress(progressPercent || 0);
      }
    };
    
    const interval = setInterval(updateProgress, 1000);
    return () => clearInterval(interval);
  }, []);
  
  // Set up the music player context
  useEffect(() => {
    musicPlayerContext.pause = () => {
      if (audioRef.current && isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };
    
    musicPlayerContext.play = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().catch(console.error);
        setIsPlaying(true);
      }
    };
    
    musicPlayerContext.isPlaying = isPlaying;
  }, [isPlaying]);
  
  // Handle volume button click
  const handleVolumeClick = () => {
    // Cycle through 3 volume levels: mute (0) -> low (0.3) -> high (0.7)
    const newVolume = volume === 0 ? 0.3 : volume === 0.3 ? 0.7 : 0;
    setVolume(newVolume);
    
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Set initial volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, []);

  // Handle audio ended event
  const handleAudioEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };
  
  // Get volume icon based on current volume level
  const getVolumeIcon = () => {
    if (volume === 0) return "fa-volume-mute";
    if (volume < 0.5) return "fa-volume-down";
    return "fa-volume-up";
  };
  
  return (
    <div 
      className="fixed bottom-5 right-5 z-40 bg-white/80 dark:bg-dark/80 backdrop-blur-md rounded-full shadow-lg p-3 flex items-center"
      id="music-player"
    >
      <button 
        id="play-pause-btn"
        className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-accent transition-colors"
        onClick={togglePlayPause}
      >
        <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
      </button>
      
      <div className="mx-3 text-sm">
        <p className="font-medium">Our Song</p>
        <div className="w-32 h-1 bg-gray-200 rounded-full mt-1">
          <div 
            className="h-1 bg-primary rounded-full" 
            id="music-progress" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      <button 
        className="text-primary hover:text-accent transition-colors w-8 h-8 flex items-center justify-center" 
        id="volume-btn"
        onClick={handleVolumeClick}
        aria-label="Adjust volume"
      >
        <i className={`fas ${getVolumeIcon()}`}></i>
      </button>
      
      <audio 
        id="background-music" 
        ref={audioRef}
        onEnded={handleAudioEnded}
        loop
      >
        <source src={ourSongPath} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default MusicPlayer;
