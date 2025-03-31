import { useState, useRef } from 'react';
import { useAnniversary } from '../context/AnniversaryContext';
import AnimatedHeart from './AnimatedHeart';

interface HeartPosition {
  x: number;
  y: number;
  id: number;
}

const Gallery: React.FC = () => {
  const { personalPhotos, currentGalleryIndex, setCurrentGalleryIndex } = useAnniversary();
  const [hearts, setHearts] = useState<HeartPosition[]>([]);
  const nextHeartId = useRef(0);
  
  const handleSlideChange = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < personalPhotos.length) {
      setCurrentGalleryIndex(newIndex);
    }
  };
  
  const handlePhotoClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setHearts(prev => [...prev, { x, y, id: nextHeartId.current }]);
    nextHeartId.current += 1;
  };
  
  const removeHeart = (id: number) => {
    setHearts(prev => prev.filter(heart => heart.id !== id));
  };
  
  return (
    <section className="py-20 px-4 bg-white dark:bg-dark transition-colors" id="gallery-section">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl text-center mb-12 text-primary">Our Memories</h2>
        
        <div className="relative" id="gallery-container">
          <button 
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 dark:bg-dark/80 shadow-md flex items-center justify-center"
            id="gallery-prev"
            onClick={() => handleSlideChange(currentGalleryIndex - 1)}
            disabled={currentGalleryIndex === 0}
          >
            <i className="fas fa-chevron-left text-primary"></i>
          </button>
          
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500" 
              id="gallery-slider"
              style={{ transform: `translateX(-${currentGalleryIndex * 100}%)` }}
            >
              {personalPhotos.map((photo, index) => (
                <div 
                  key={index}
                  className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 p-2"
                >
                  <div 
                    className="relative overflow-hidden rounded-lg shadow-md group h-80 cursor-pointer"
                    data-photo-id={index + 1}
                    onClick={handlePhotoClick}
                  >
                    <img 
                      src={photo}
                      alt={`Couple photo ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <p className="text-white p-4 font-medium">Memory {index + 1}</p>
                    </div>
                    
                    {/* Render hearts on this photo */}
                    {hearts.map(heart => (
                      <AnimatedHeart 
                        key={heart.id} 
                        x={heart.x} 
                        y={heart.y}
                        onComplete={() => removeHeart(heart.id)} 
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 dark:bg-dark/80 shadow-md flex items-center justify-center"
            id="gallery-next"
            onClick={() => handleSlideChange(currentGalleryIndex + 1)}
            disabled={currentGalleryIndex === personalPhotos.length - 1}
          >
            <i className="fas fa-chevron-right text-primary"></i>
          </button>
        </div>
        
        <div className="flex justify-center mt-6">
          {personalPhotos.map((_, index) => (
            <button 
              key={index}
              className={`w-3 h-3 rounded-full mx-1 ${currentGalleryIndex === index ? 'bg-primary' : 'bg-gray-300'} gallery-dot`}
              data-index={index}
              onClick={() => handleSlideChange(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
