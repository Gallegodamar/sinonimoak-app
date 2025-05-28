
import React from 'react';
import Button from './Button';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-sky-400 to-blue-600 text-white p-8">
      <div className="bg-white/20 backdrop-blur-lg p-10 rounded-xl shadow-2xl text-center">
        <h1 className="text-5xl font-bold mb-4">Sinonimoak!</h1>
        <p className="text-xl mb-8">Probatu zure euskara ezagutza sinonimo joko honekin.</p>
        <Button onClick={onStart} className="text-2xl px-8 py-4" variant="primary">
          Hasi Jokoa
        </Button>
      </div>
      <footer className="absolute bottom-4 text-sm text-white/70">
        Euskarazko Sinonimo Jokoa v1.0
      </footer>
    </div>
  );
};

export default StartScreen;
