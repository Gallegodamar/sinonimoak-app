
import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  variant?: 'primary' | 'option-default' | 'option-correct' | 'option-incorrect' | 'restart' | 'secondary' | 'level-locked';
  selected?: boolean;
  style?: React.CSSProperties; // Allow passing style directly
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className = '', disabled = false, variant = 'primary', selected = false, style }) => {
  const baseStyle = 'py-4 px-6 rounded-xl font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-all duration-150 ease-in-out text-lg w-full';
  
  let variantStyle = '';
  switch (variant) {
    case 'primary': // Main action buttons (e.g., Hasi Ikasten, Comenzar, Siguiente Nivel) - typically orange
      variantStyle = 'bg-orange-500 hover:bg-orange-600 focus:ring-orange-300 text-white';
      break;
    case 'secondary': // Alternative action buttons (e.g., Maila Zaila before, or alternative theme) - can be dark blue or another contrast color
      variantStyle = 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-400 text-white';
      break;
    case 'option-default': // White option button for game
      variantStyle = `bg-white text-slate-700 hover:bg-slate-100 focus:ring-orange-400 border border-slate-300 ${selected ? 'ring-2 ring-orange-500 ring-offset-1' : ''}`;
      break;
    case 'option-correct': // Green correct option
      variantStyle = 'bg-green-500 text-white cursor-default flex items-center justify-center';
      break;
    case 'option-incorrect': // Red incorrect option
      variantStyle = 'bg-red-500 text-white cursor-default';
      break;
    case 'restart': // White button with orange text for EndScreen (or similar "return" actions)
      variantStyle = 'bg-white text-orange-500 hover:bg-orange-100 focus:ring-orange-300 border-2 border-orange-200';
      break;
    case 'level-locked': // For disabled level buttons
      variantStyle = 'bg-gray-300 text-gray-500 cursor-not-allowed';
      break;
  }

  const disabledProcessedStyle = disabled ? 
    (variant === 'option-correct' || variant === 'option-incorrect' ? '' : (variant === 'level-locked' ? variantStyle : 'opacity-60 cursor-not-allowed'))
    : '';


  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variant !== 'level-locked' ? variantStyle : ''} ${disabledProcessedStyle} ${className}`}
      style={style} // Apply direct styles
    >
      {children}
    </button>
  );
};

export default Button;
