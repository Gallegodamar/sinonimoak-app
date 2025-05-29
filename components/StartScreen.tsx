
import React from 'react';
import Button from './Button';

interface StartScreenProps {
  onStartGame: () => void; // Renamed to reflect it starts the overall game journey
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartGame }) => {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-between p-6 sm:p-8 text-center"
      style={{ backgroundColor: '#FAF0D7' }} // Light yellow background from image
    >
      <div className="flex-grow flex flex-col justify-center items-center w-full">
        {/* Header Text */}
        <div className="my-8 sm:my-12">
          <h1 
            className="text-6xl sm:text-8xl font-extrabold" 
            style={{ color: '#6A994E' }} // Green text from image
          >
            ¡HOLA!
          </h1>
          <p 
            className="text-4xl sm:text-6xl font-bold mt-2" 
            style={{ color: '#6A994E' }} // Green text from image
          >
            BIENVENIDO
          </p>
        </div>

        {/* Illustration Placeholder (using a simple SVG for now) */}
        <div className="my-8 sm:my-10 w-full max-w-xs sm:max-w-sm">
          {/* Simplified clouds */}
          <div className="relative mb-4">
            <div className="absolute top-0 left-1/4 w-16 h-8 sm:w-20 sm:h-10 bg-white rounded-full opacity-80"></div>
            <div className="absolute top-4 left-3/4 w-12 h-6 sm:w-16 sm:h-8 bg-white rounded-full opacity-70 transform -translate-x-1/2"></div>
          </div>
          {/* Dog and landscape - simplified */}
          <svg viewBox="0 0 200 150" className="w-full h-auto">
            {/* Ground */}
            <path d="M0 120 Q50 110 100 120 T200 120 L200 150 L0 150 Z" fill="#A7C957" /> {/* Light green grass */}
            <path d="M0 130 Q60 125 100 130 T200 130 L200 150 L0 150 Z" fill="#87A947" /> {/* Darker green grass patch */}
            
            {/* Tree */}
            <rect x="30" y="70" width="10" height="50" fill="#A0522D" /> {/* Trunk */}
            <circle cx="35" cy="70" r="20" fill="#6A994E" /> {/* Leaves */}

             {/* Bushes */}
            <circle cx="20" cy="125" r="15" fill="#87A947" />
            <circle cx="170" cy="125" r="20" fill="#6A994E" />


            {/* Dog - Simplified representation */}
            <path d="M100 120 
                     C 95 110, 90 90, 100 80 
                     C 110 90, 115 110, 120 120
                     Q 125 125, 135 120 
                     L 130 90 C 130 85, 135 80, 140 80 
                     C 145 80, 150 85, 150 90
                     L 145 110 
                     C 150 115, 155 118, 150 120
                     L 130 125 
                     L 120 130 Z" fill="#F4A261"/> {/* Orange dog body */}
            <path d="M140 80 L 138 70 L 142 70 Z" fill="#F4A261" /> {/* Ear 1 */}
            <path d="M150 80 L 148 70 L 152 70 Z" fill="#F4A261" /> {/* Ear 2 */}
             <circle cx="152" cy="88" r="1.5" fill="#402E32" /> {/* Eye */}

            {/* Tiny grass blades */}
            <path d="M50 118 L52 115 L54 118" stroke="#6A994E" strokeWidth="1" fill="none"/>
            <path d="M150 118 L152 115 L154 118" stroke="#6A994E" strokeWidth="1" fill="none"/>
          </svg>
        </div>
      </div>
      
      <div className="w-full max-w-xs sm:max-w-sm pb-8">
        <Button 
          onClick={onStartGame} 
          className="w-full text-2xl py-4" 
          variant="primary" // Orange button
          aria-label="Comenzar el juego"
          style={{ backgroundColor: '#E76F51', color: '#FFFFFF' }} // Specific orange from image
        >
          COMENZAR
        </Button>
      </div>
      {/* Footer can be added if needed, but not prominent in the image */}
    </div>
  );
};

export default StartScreen;
