
import React from 'react';
import Button from './Button';
import { FeedbackType } from '../types';

interface OptionsListProps {
  options: string[];
  onOptionSelect: (option: string) => void;
  selectedOption: string | null;
  correctOption: string;
  feedback: FeedbackType;
  disabled: boolean;
}

const OptionsList: React.FC<OptionsListProps> = ({ options, onOptionSelect, selectedOption, correctOption, feedback, disabled }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl mt-8">
      {options.map((option) => {
        let buttonVariant: 'neutral' | 'correct' | 'incorrect' = 'neutral';
        if (disabled && selectedOption) { // Only show correct/incorrect after selection and feedback state
          if (option === correctOption) {
            buttonVariant = 'correct';
          } else if (option === selectedOption && option !== correctOption) {
            buttonVariant = 'incorrect';
          }
        }

        return (
          <Button
            key={option}
            onClick={() => onOptionSelect(option)}
            disabled={disabled}
            variant={buttonVariant}
            className={`w-full text-xl break-words ${selectedOption === option && !disabled ? 'ring-2 ring-offset-2 ring-sky-500' : ''}`}
          >
            {option}
          </Button>
        );
      })}
    </div>
  );
};

export default OptionsList;
