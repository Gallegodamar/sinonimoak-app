
import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'correct' | 'incorrect' | 'neutral';
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className = '', disabled = false, variant = 'primary' }) => {
  const baseStyle = 'py-3 px-6 rounded-lg font-semibold text-white shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-all duration-150 ease-in-out';
  
  let variantStyle = '';
  switch (variant) {
    case 'primary':
      variantStyle = 'bg-sky-500 hover:bg-sky-600 focus:ring-sky-400';
      break;
    case 'secondary':
      variantStyle = 'bg-slate-500 hover:bg-slate-600 focus:ring-slate-400';
      break;
    case 'correct':
      variantStyle = 'bg-green-500 hover:bg-green-600 focus:ring-green-400 cursor-default';
      break;
    case 'incorrect':
      variantStyle = 'bg-red-500 hover:bg-red-600 focus:ring-red-400 cursor-default';
      break;
    case 'neutral':
      variantStyle = 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 focus:ring-slate-400';
      break;
  }

  const disabledStyle = disabled ? 'opacity-60 cursor-not-allowed' : '';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variantStyle} ${disabledStyle} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
