
import React from 'react';

interface WordCardProps {
  word: string;
  label?: string;
}

const WordCard: React.FC<WordCardProps> = ({ word, label }) => {
  return (
    <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md text-center my-4">
      {label && <p className="text-sm text-slate-500 mb-2 uppercase tracking-wider">{label}</p>}
      <p className="text-4xl font-bold text-sky-700">{word}</p>
    </div>
  );
};

export default WordCard;
