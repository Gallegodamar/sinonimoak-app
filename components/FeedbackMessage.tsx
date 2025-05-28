
import React from 'react';
import { FeedbackType } from '../types';

interface FeedbackMessageProps {
  feedback: FeedbackType;
  correctWord?: string;
}

const FeedbackMessage: React.FC<FeedbackMessageProps> = ({ feedback, correctWord }) => {
  if (feedback === FeedbackType.NONE) return null;

  const isCorrect = feedback === FeedbackType.CORRECT;
  const bgColor = isCorrect ? 'bg-green-500' : 'bg-red-500';
  const message = isCorrect ? 'Zuzena!' : 'Okerra!';
  
  return (
    <div className={`mt-6 p-4 rounded-lg text-white text-xl font-semibold text-center shadow-lg ${bgColor} w-full max-w-md`}>
      <p>{message}</p>
      {feedback === FeedbackType.INCORRECT && correctWord && (
        <p className="text-sm mt-1">Erantzun zuzena: <span className="font-bold">{correctWord}</span></p>
      )}
    </div>
  );
};

export default FeedbackMessage;
