
import React from 'react';
import Button from './Button';

interface EndScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const EndScreen: React.FC<EndScreenProps> = ({ score, totalQuestions, onRestart }) => {
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  let message = "";
  if (percentage === 100) {
    message = "Primeran! Guztiak asmatu dituzu!";
  } else if (percentage >= 75) {
    message = "Oso Ondo! Ia denak!";
  } else if (percentage >= 50) {
    message = "Ondo! Jarraitu praktikatzen!";
  } else {
    message = "Aupa! Hobetzeko tartea duzu.";
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-teal-400 to-green-600 text-white p-8">
      <div className="bg-white/20 backdrop-blur-lg p-10 rounded-xl shadow-2xl text-center">
        <h2 className="text-4xl font-bold mb-4">Jokoa Amaitu Da!</h2>
        <p className="text-2xl mb-2">Zure Puntuazioa:</p>
        <p className="text-6xl font-bold mb-4">{score} / {totalQuestions}</p>
        <p className="text-xl mb-8">{message} (%{percentage})</p>
        <Button onClick={onRestart} className="text-2xl px-8 py-4" variant="primary">
          Berriro Jokatu
        </Button>
      </div>
       <footer className="absolute bottom-4 text-sm text-white/70">
        Euskarazko Sinonimo Jokoa v1.0
      </footer>
    </div>
  );
};

export default EndScreen;
