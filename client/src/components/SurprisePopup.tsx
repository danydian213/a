import React from 'react';

interface SurprisePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const SurprisePopup: React.FC<SurprisePopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" 
      id="surprise-popup"
    >
      <div className="bg-white dark:bg-dark rounded-lg shadow-xl max-w-md w-full p-6 m-4 animate-float">
        <div className="text-5xl mb-6 text-center text-primary">
          <i className="fas fa-gift"></i>
        </div>
        
        <h3 className="font-display text-2xl text-center mb-4 text-primary">
          Happy 8 Years, My Love!
        </h3>
        
        <p className="text-center mb-6">
          Thank you for 8 incredible years of love, laughter, and growth. 
          Here's to many more beautiful chapters in our story!
        </p>
        
        <div className="text-center">
          <button 
            className="bg-primary hover:bg-accent text-white py-2 px-6 rounded-full transition-colors"
            id="close-surprise-btn"
            onClick={onClose}
          >
            Continue Our Journey ❤️
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurprisePopup;
