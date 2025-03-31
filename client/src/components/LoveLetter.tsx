import React from 'react';

const LoveLetter: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-secondary/30 dark:bg-darkAccent/20 transition-colors">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl text-center mb-12 text-primary">My Love Letter to You</h2>
        
        <div 
          className="bg-white dark:bg-dark/90 rounded-lg shadow-lg p-8 transition-transform duration-500 hover:scale-105 cursor-pointer"
          id="love-letter"
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 text-primary">
              <i className="fas fa-heart text-5xl heartbeat"></i>
            </div>
          </div>
          
          <p className="font-display text-2xl text-center mb-4 text-primary">My Dearest Love,</p>
          
          <div className="space-y-4 font-medium text-gray-700 dark:text-gray-300">
            <p>Eight years ago, our journey began. In those years, we've created a lifetime of memories that I will forever cherish.</p>
            <p>Through the ups and downs, your love has been my constant. Your smile brightens my darkest days, and your touch calms my restless heart.</p>
            <p>When I think about all we've been through together, I'm amazed at how we've grown – both as individuals and as a couple.</p>
            <p>I promise to keep loving you more and more each day, to stand by you through whatever life brings, and to continue building this beautiful story together.</p>
            <p>Here's to 8 wonderful years and to many, many more.</p>
          </div>
          
          <p className="mt-6 text-right font-display text-xl text-primary">Forever Yours,</p>
          <p className="text-right font-display text-xl text-primary">Me</p>
        </div>
      </div>
    </section>
  );
};

export default LoveLetter;
