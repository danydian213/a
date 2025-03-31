import React, { createContext, useContext, useState, ReactNode } from 'react';
import couple1 from '../assets/couple1.jpeg';
import couple2 from '../assets/couple2.jpeg';
import couple3 from '../assets/photos/couple3.jpeg';
import couple4 from '../assets/photos/couple4.jpeg';
import couple5 from '../assets/photos/couple5.jpeg';
import couple6 from '../assets/photos/couple6.jpeg';
import newPhoto1 from '@assets/WhatsApp Image 2025-03-30 at 13.19.32.jpeg';
import newPhoto2 from '@assets/WhatsApp Image 2025-03-30 at 13.19.43.jpeg';
import newPhoto3 from '@assets/WhatsApp Image 2025-03-30 at 16.46.20 (1).jpeg';
import newPhoto4 from '@assets/WhatsApp Image 2025-03-30 at 16.46.20 (2).jpeg';
import newPhoto5 from '@assets/WhatsApp Image 2025-03-30 at 16.46.20.jpeg';
import newPhoto6 from '@assets/WhatsApp Image 2025-03-30 at 16.46.21.jpeg';
import voiceMessageAudio from '@assets/WhatsApp Ptt 2025-03-30 at 16.48.16.ogg';

interface AnniversaryContextType {
  lovePercentage: number;
  increaseLove: (amount: number) => void;
  anniversaryDate: Date;
  personalPhotos: string[];
  currentGalleryIndex: number;
  setCurrentGalleryIndex: (index: number) => void;
  voiceMessagePath: string;
}

const defaultContext: AnniversaryContextType = {
  lovePercentage: 25,
  increaseLove: () => {},
  anniversaryDate: new Date("2025-03-30T00:00:00"), // Set to current date for now
  personalPhotos: [
    couple1,
    couple2,
    couple3,
    couple4,
    couple5,
    couple6,
    newPhoto1,
    newPhoto2,
    newPhoto3,
    newPhoto4,
    newPhoto5,
    newPhoto6
  ],
  currentGalleryIndex: 0,
  setCurrentGalleryIndex: () => {},
  voiceMessagePath: voiceMessageAudio
};

const AnniversaryContext = createContext<AnniversaryContextType>(defaultContext);

export const useAnniversary = () => useContext(AnniversaryContext);

interface AnniversaryProviderProps {
  children: ReactNode;
}

export const AnniversaryProvider: React.FC<AnniversaryProviderProps> = ({ children }) => {
  const [lovePercentage, setLovePercentage] = useState<number>(25);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState<number>(0);
  
  const increaseLove = (amount: number) => {
    setLovePercentage(prev => Math.min(prev + amount, 100));
  };

  const value = {
    lovePercentage,
    increaseLove,
    anniversaryDate: defaultContext.anniversaryDate,
    personalPhotos: defaultContext.personalPhotos,
    currentGalleryIndex,
    setCurrentGalleryIndex,
    voiceMessagePath: defaultContext.voiceMessagePath
  };

  return (
    <AnniversaryContext.Provider value={value}>
      {children}
    </AnniversaryContext.Provider>
  );
};
