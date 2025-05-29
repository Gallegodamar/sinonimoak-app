import React from 'react';
import Button from './Button';
import { FeedbackType } from '../types';

interface OptionsListProps {
  options: string[];
  onOptionSelect: (option: string) => void;
  selectedOption: string | null;
  correctOption: string; // The main correct answer to be highlighted
  allCorrectSynonyms?: string[]; // All possible correct answers for multi-synonym questions
  feedback: FeedbackType;
  disabled: boolean;
}

const OptionsList: React.FC<OptionsListProps> = ({ 
  options, 
  onOptionSelect, 
  selectedOption, 
  correctOption, 
  allCorrectSynonyms,
  feedback, 
  disabled 
}) => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:gap-4 w-full max-w-md mt-6">
      {options.map((option) => {
        let buttonVariant: 'option-default' | 'option-correct' | 'option-incorrect' = 'option-default';
        let isActuallyCorrect = false;

        if (allCorrectSynonyms && allCorrectSynonyms.length > 0) {
          isActuallyCorrect = allCorrectSynonyms.includes(option);
        } else {
          isActuallyCorrect = (option === correctOption);
        }

        if (disabled && selectedOption) { // Showing feedback
          if (isActuallyCorrect) {
            buttonVariant = 'option-correct';
          } else if (option === selectedOption && !isActuallyCorrect) {
            buttonVariant = 'option-incorrect';
          }
        }
        
        const showAsSelected = selectedOption === option && !disabled && feedback === FeedbackType.NONE;

        return (
          <Button
            key={option}
            onClick={() => onOptionSelect(option)}
            disabled={disabled}
            variant={buttonVariant}
            className="w-full text-lg py-4 sm:py-5 break-words min-h-[70px] sm:min-h-[80px]" // Ensure consistent height
            selected={showAsSelected} // For default state visual cue
          >
            {option}
            {buttonVariant === 'option-correct' && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </Button>
        );
      })}
    </div>
  );
};

export default OptionsList;