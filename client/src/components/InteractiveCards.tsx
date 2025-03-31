import React from 'react';
import { journeyCards } from '../data/journeyCards';

const InteractiveCards: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-white dark:bg-dark transition-colors">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl text-center mb-12 text-primary">Our Journey Together</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {journeyCards.map((card, index) => (
            <div className="flip-card" key={index}>
              <div className="flip-card-inner">
                <div className="flip-card-front bg-primary/20 dark:bg-primary/40 p-6 flex items-center justify-center flex-col">
                  <div className="text-3xl mb-3">
                    <i className={card.icon}></i>
                  </div>
                  <h3 className="font-display text-xl">{card.title}</h3>
                  <p className="text-sm mt-2 text-center">Hover to read our story</p>
                </div>
                <div className="flip-card-back bg-accent text-white p-6">
                  <p className="text-center">{card.story}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InteractiveCards;
