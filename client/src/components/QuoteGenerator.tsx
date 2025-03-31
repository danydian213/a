import { useState } from 'react';
import { loveQuotes } from '../data/loveQuotes';

const QuoteGenerator: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState(loveQuotes[0]);
  
  const generateRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * loveQuotes.length);
    setCurrentQuote(loveQuotes[randomIndex]);
  };
  
  return (
    <section className="py-20 px-4 bg-secondary/30 dark:bg-darkAccent/20 transition-colors">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl text-center mb-12 text-primary">Love Quotes</h2>
        
        <div className="bg-white dark:bg-dark/90 rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6 text-5xl text-primary">
            <i className="fas fa-quote-left"></i>
          </div>
          
          <blockquote className="text-xl md:text-2xl font-display mb-4" id="quote-text">
            {currentQuote.quote}
          </blockquote>
          
          <cite className="block text-right text-gray-600 dark:text-gray-400 mb-8" id="quote-author">
            - {currentQuote.author}
          </cite>
          
          <button 
            className="bg-gradient-to-r from-primary to-accent text-white py-3 px-8 rounded-full font-medium text-lg shadow-md hover:shadow-lg transition-shadow rainbow-hover"
            id="new-quote-btn"
            onClick={generateRandomQuote}
          >
            Generate New Quote
          </button>
        </div>
      </div>
    </section>
  );
};

export default QuoteGenerator;
