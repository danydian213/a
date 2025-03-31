import React from 'react';

interface DarkModeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ isDarkMode, onToggle }) => {
  return (
    <button 
      className="fixed top-5 right-5 z-40 w-12 h-12 rounded-full bg-white dark:bg-dark shadow-lg flex items-center justify-center transition-colors"
      id="dark-mode-toggle"
      aria-label="Toggle Dark Mode"
      onClick={onToggle}
    >
      <i 
        className={`fas ${isDarkMode ? 'fa-sun text-yellow-400' : 'fa-moon text-dark'}`}
        id={isDarkMode ? 'sun-icon' : 'moon-icon'}
      ></i>
    </button>
  );
};

export default DarkModeToggle;
