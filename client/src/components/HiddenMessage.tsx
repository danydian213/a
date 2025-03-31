import { useState } from 'react';
import { hiddenMessages } from '../data/hiddenMessages';

const HiddenMessage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState({ title: '', message: '' });
  
  const handleCardClick = (message: { title: string; message: string }) => {
    setCurrentMessage(message);
    setIsModalOpen(true);
  };
  
  return (
    <section className="py-20 px-4 bg-white dark:bg-dark transition-colors">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl text-center mb-12 text-primary">Find Hidden Messages</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hiddenMessages.map((message, index) => (
            <div 
              key={index}
              className="bg-primary/10 dark:bg-primary/20 rounded-lg shadow-md p-6 text-center cursor-pointer hover:shadow-lg transition-shadow hidden-message-card"
              onClick={() => handleCardClick(message)}
            >
              <div className="text-3xl mb-4 text-primary">
                <i className={message.icon}></i>
              </div>
              <p className="font-medium">{message.prompt}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Hidden Message Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" 
          id="hidden-message-modal"
        >
          <div className="bg-white dark:bg-dark rounded-lg shadow-xl max-w-md w-full p-6 m-4 animate-float">
            <div className="text-4xl mb-6 text-center text-primary">
              <i className="fas fa-heart"></i>
            </div>
            
            <h3 className="font-display text-2xl text-center mb-4 text-primary" id="modal-title">
              {currentMessage.title}
            </h3>
            
            <p className="text-center mb-6" id="modal-message">
              {currentMessage.message}
            </p>
            
            <div className="text-center">
              <button 
                className="bg-primary hover:bg-accent text-white py-2 px-6 rounded-full transition-colors"
                id="close-modal-btn"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HiddenMessage;
