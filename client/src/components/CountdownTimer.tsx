import { useState, useEffect } from 'react';
import { useAnniversary } from '../context/AnniversaryContext';

interface TimeUnit {
  label: string;
  value: string;
}

const CountdownTimer: React.FC = () => {
  const { anniversaryDate } = useAnniversary();
  const [timeUnits, setTimeUnits] = useState<TimeUnit[]>([
    { label: 'Days', value: '00' },
    { label: 'Hours', value: '00' },
    { label: 'Minutes', value: '00' },
    { label: 'Seconds', value: '00' }
  ]);

  useEffect(() => {
    const updateCountdown = () => {
      const currentDate = new Date();
      const difference = anniversaryDate.getTime() - currentDate.getTime();
      
      if (difference <= 0) {
        setTimeUnits([
          { label: 'Days', value: '00' },
          { label: 'Hours', value: '00' },
          { label: 'Minutes', value: '00' },
          { label: 'Seconds', value: '00' }
        ]);
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeUnits([
        { label: 'Days', value: days.toString().padStart(2, '0') },
        { label: 'Hours', value: hours.toString().padStart(2, '0') },
        { label: 'Minutes', value: minutes.toString().padStart(2, '0') },
        { label: 'Seconds', value: seconds.toString().padStart(2, '0') }
      ]);
    };
    
    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(intervalId);
  }, [anniversaryDate]);

  return (
    <div className="bg-white/80 dark:bg-dark/80 backdrop-blur-sm rounded-xl p-6 shadow-lg my-8">
      <h2 className="font-display text-2xl mb-3 text-primary">Our Anniversary Countdown</h2>
      <div className="flex justify-center space-x-4" id="countdown-container">
        {timeUnits.map((unit, index) => (
          <div className="text-center" key={index}>
            <div 
              className="text-3xl font-bold text-accent" 
              id={unit.label.toLowerCase()}
            >
              {unit.value}
            </div>
            <div className="text-sm uppercase">{unit.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
