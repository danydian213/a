import { useState, useRef, useEffect } from 'react';
import { useAnniversary } from '../context/AnniversaryContext';
import AnimatedHeart from './AnimatedHeart';

interface HeartPosition {
  x: number;
  y: number;
  id: number;
}

interface LoveAction {
  icon: string;
  text: string;
  value: number;
  cooldown: number; // milliseconds
}

const LoveMeter: React.FC = () => {
  const { lovePercentage, increaseLove } = useAnniversary();
  const [hearts, setHearts] = useState<HeartPosition[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [milestoneReached, setMilestoneReached] = useState<boolean>(false);
  const [buttonCooldowns, setButtonCooldowns] = useState<Record<number, boolean>>({});
  
  const containerRef = useRef<HTMLDivElement>(null);
  const nextHeartId = useRef(0);
  
  const loveActions: LoveAction[] = [
    { icon: "fa-kiss", text: "Kiss", value: 5, cooldown: 3000 },
    { icon: "fa-hand-holding-heart", text: "Hold Hands", value: 3, cooldown: 2000 },
    { icon: "fa-gift", text: "Give Gift", value: 8, cooldown: 5000 },
    { icon: "fa-comment-dots", text: "Say \"I Love You\"", value: 6, cooldown: 4000 },
    { icon: "fa-camera", text: "Take a Selfie", value: 4, cooldown: 3000 },
    { icon: "fa-music", text: "Dance Together", value: 7, cooldown: 4000 }
  ];
  
  // Messages based on love percentage
  const loveMessages = {
    25: "Like a budding flower, our love is just beginning...",
    50: "Growing stronger each day, like our shared journey!",
    75: "Our love shines bright, a beacon in each other's lives!",
    100: "Perfect harmony! Our love has reached its fullness!"
  };
  
  useEffect(() => {
    // Check for milestones
    if (lovePercentage >= 25 && lovePercentage < 50) {
      setMessage(loveMessages[25]);
    } else if (lovePercentage >= 50 && lovePercentage < 75) {
      setMessage(loveMessages[50]);
    } else if (lovePercentage >= 75 && lovePercentage < 100) {
      setMessage(loveMessages[75]);
    } else if (lovePercentage === 100 && !milestoneReached) {
      setMessage(loveMessages[100]);
      setMilestoneReached(true);
      // Could trigger a special effect or animation here
    }
  }, [lovePercentage, milestoneReached]);
  
  const handleLoveAction = (actionIndex: number) => {
    const action = loveActions[actionIndex];
    
    // Check if button is in cooldown
    if (buttonCooldowns[actionIndex]) {
      return;
    }
    
    // Apply the love increase
    increaseLove(action.value);
    
    // Set the button to cooldown
    setButtonCooldowns(prev => ({ ...prev, [actionIndex]: true }));
    
    // Remove cooldown after specified time
    setTimeout(() => {
      setButtonCooldowns(prev => ({ ...prev, [actionIndex]: false }));
    }, action.cooldown);
    
    if (containerRef.current) {
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      
      // Create 1-3 hearts at random positions
      const numHearts = Math.floor(Math.random() * 3) + 1;
      
      for (let i = 0; i < numHearts; i++) {
        // Create random position within the container
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        
        const newId = nextHeartId.current + i;
        setHearts(prev => [...prev, { x, y, id: newId }]);
      }
      nextHeartId.current += numHearts;
    }
  };
  
  const removeHeart = (id: number) => {
    setHearts(prev => prev.filter(heart => heart.id !== id));
  };
  
  // Get color based on percentage
  const getColorClass = (): string => {
    if (lovePercentage < 30) return "from-pink-400 to-pink-600";
    if (lovePercentage < 60) return "from-pink-500 to-rose-500";
    if (lovePercentage < 90) return "from-rose-500 to-red-500";
    return "from-red-500 to-red-600";
  };
  
  return (
    <section className="py-20 px-4 bg-white dark:bg-dark transition-colors">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl text-center mb-12 text-primary">Our Love Meter</h2>
        
        <div 
          ref={containerRef}
          className="bg-white dark:bg-dark/90 rounded-lg shadow-lg p-8 text-center relative overflow-hidden"
        >
          <div className="mb-6">
            <span className="text-6xl text-primary">
              <i className={`fas fa-heart ${lovePercentage === 100 ? 'scale-pulse text-red-500' : 'heartbeat'}`}></i>
            </span>
          </div>
          
          <div className="mb-8">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`love-meter-bar h-full bg-gradient-to-r ${getColorClass()} transition-all duration-500 ease-out`}
                style={{ width: `${lovePercentage}%` }}
              ></div>
            </div>
            
            <div className="mt-3 min-h-[2.5rem]">
              {message && (
                <p className="text-sm text-gray-600 dark:text-gray-400 animate-fade-in">
                  {message} ({lovePercentage}%)
                </p>
              )}
              {!message && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Click the buttons below to show your love! ({lovePercentage}%)
                </p>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {loveActions.map((action, index) => (
              <button 
                key={index}
                className={`love-action py-2 px-4 rounded-lg transition-all ${
                  buttonCooldowns[index] 
                    ? 'bg-gray-200 text-gray-400 dark:bg-gray-700 cursor-not-allowed' 
                    : 'bg-primary/10 hover:bg-primary/20 text-primary'
                }`}
                onClick={() => handleLoveAction(index)}
                disabled={buttonCooldowns[index]}
              >
                <i className={`fas ${action.icon} ${buttonCooldowns[index] ? 'animate-pulse' : ''}`}></i> {action.text}
              </button>
            ))}
          </div>
          
          {/* Special message for full love meter */}
          {lovePercentage === 100 && (
            <div className="mt-8 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800/30">
              <p className="text-red-600 dark:text-red-400 font-medium">
                <i className="fas fa-award mr-2"></i>
                Achievement Unlocked: Perfect Love! Thanks for 8 amazing years!
              </p>
            </div>
          )}
          
          {/* Render floating hearts */}
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
    </section>
  );
};

export default LoveMeter;
