import { useState, useEffect, useRef } from 'react';
import { quizQuestions } from '../data/quizQuestions';
import { useAnniversary } from '../context/AnniversaryContext';

const LoveQuiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [customAnswer, setCustomAnswer] = useState<string>('');
  const customInputRef = useRef<HTMLInputElement>(null);
  const { increaseLove } = useAnniversary();
  
  const currentQuestion = quizQuestions[currentQuestionIndex];
  
  const handleOptionClick = (optionIndex: number) => {
    const selectedOption = currentQuestion.options[optionIndex];
    
    // For multiple answers, we check against both answer and otherCorrectAnswer
    let isAnswerCorrect = selectedOption === currentQuestion.answer;
    
    // Check for additional correct answers
    if (!isAnswerCorrect && currentQuestion.multipleAnswers && currentQuestion.otherCorrectAnswer) {
      if (selectedOption === currentQuestion.otherCorrectAnswer) {
        isAnswerCorrect = true;
      }
    }
    
    // Handle "fill your own" option
    if (selectedOption === "Isi sendiri" && customAnswer.trim() !== '') {
      isAnswerCorrect = true;
    }
    
    setSelectedOptionIndex(optionIndex);
    setIsCorrect(isAnswerCorrect);
    setShowResult(true);
    
    if (isAnswerCorrect) {
      setScore(prev => prev + 1);
      increaseLove(2); // Increase love meter for correct answers
    }
    
    setQuestionsAnswered(prev => prev + 1);
  };
  
  const handleNextQuestion = () => {
    const nextIndex = (currentQuestionIndex + 1) % quizQuestions.length;
    setCurrentQuestionIndex(nextIndex);
    setShowResult(false);
    setSelectedOptionIndex(null);
    setCustomAnswer('');
  };
  
  // Progress calculation
  const progress = (questionsAnswered / quizQuestions.length) * 100;
  
  // Confetti effect for perfect score
  useEffect(() => {
    if (score === quizQuestions.length && questionsAnswered === quizQuestions.length) {
      // We would trigger confetti here
      increaseLove(10); // Bonus love for perfect score
    }
  }, [score, questionsAnswered, increaseLove]);
  
  // Get all correct answers for display
  const getAllCorrectAnswers = () => {
    const answers = [currentQuestion.answer];
    if (currentQuestion.multipleAnswers && currentQuestion.otherCorrectAnswer) {
      answers.push(currentQuestion.otherCorrectAnswer);
    }
    return answers;
  };
  
  return (
    <section className="py-20 px-4 bg-secondary/30 dark:bg-darkAccent/20 transition-colors">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl text-center mb-8 text-primary">How Well Do You Know Me?</h2>
        
        {/* Progress and score display */}
        <div className="mb-8 flex justify-between items-center">
          <div className="w-3/4 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mr-4">
            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="text-sm font-medium">
            Score: <span className="text-primary">{score}</span>/<span>{quizQuestions.length}</span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-dark/90 rounded-lg shadow-lg p-6 md:p-8" id="quiz-container">
          <div className="mb-3 text-sm text-gray-500 dark:text-gray-400">
            Question {currentQuestionIndex + 1} of {quizQuestions.length}
          </div>
          
          {!showResult ? (
            <div id="quiz-question" className="mb-8">
              <h3 className="font-medium text-xl mb-4">{currentQuestion.question}</h3>
              
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <div key={index}>
                    <button 
                      className="w-full text-left p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-primary/10 transition-colors quiz-option"
                      onClick={() => handleOptionClick(index)}
                    >
                      {option}
                    </button>
                    
                    {option === "Isi sendiri" && (
                      <div className="mt-2 mb-4 pl-4">
                        <input
                          ref={customInputRef}
                          type="text"
                          className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-primary focus:border-primary"
                          placeholder="Tulis jawabanmu..."
                          value={customAnswer}
                          onChange={(e) => setCustomAnswer(e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div id="quiz-result" className="text-center py-4">
              <div className="text-5xl mb-4" id="result-icon">
                <i className={`fas ${isCorrect ? 'fa-heart text-primary' : 'fa-heart-broken text-gray-400'}`}></i>
              </div>
              <h3 className="font-display text-2xl mb-2" id="result-title">
                {isCorrect ? 'Correct!' : 'Oops!'}
              </h3>
              
              {/* Display all correct answers */}
              <div className="mb-4" id="result-message">
                {isCorrect 
                  ? (
                    <div>
                      <p>You remember our special moments! ❤️</p>
                      <div className="mt-3">
                        <p className="mb-2">Semua jawaban yang benar:</p>
                        <ul className="list-disc list-inside text-left max-w-fit mx-auto">
                          {getAllCorrectAnswers().map((answer, index) => (
                            <li key={index} className="text-primary font-medium">{answer}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )
                  : (
                    <div>
                      <p className="mb-2">Jawaban yang benar:</p>
                      <ul className="list-disc list-inside text-left max-w-fit mx-auto">
                        {getAllCorrectAnswers().map((answer, index) => (
                          <li key={index} className="text-primary font-medium">{answer}</li>
                        ))}
                      </ul>
                    </div>
                  )
                }
              </div>
              
              {questionsAnswered === quizQuestions.length ? (
                <div className="mt-6">
                  <h4 className="text-xl mb-2">Quiz Complete!</h4>
                  <p className="mb-4">
                    You scored {score} out of {quizQuestions.length}
                    {score === quizQuestions.length && ' - Perfect!'}
                  </p>
                  <button 
                    className="bg-primary hover:bg-accent text-white py-2 px-6 rounded-full transition-colors"
                    onClick={() => {
                      setCurrentQuestionIndex(0);
                      setShowResult(false);
                      setScore(0);
                      setQuestionsAnswered(0);
                      setSelectedOptionIndex(null);
                      setCustomAnswer('');
                    }}
                  >
                    Play Again
                  </button>
                </div>
              ) : (
                <button 
                  className="bg-primary hover:bg-accent text-white py-2 px-6 rounded-full transition-colors"
                  id="next-question"
                  onClick={handleNextQuestion}
                >
                  Next Question
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LoveQuiz;
