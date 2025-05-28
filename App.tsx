import React, { useState, useEffect, useCallback } from 'react';
import { WordPair, Question, GameState, FeedbackType } from './types';
import { INITIAL_WORD_PAIRS, NUMBER_OF_OPTIONS, QUESTIONS_PER_GAME, FEEDBACK_DELAY_MS, TIMER_DURATION_SECONDS } from './constants';
import StartScreen from './components/StartScreen';
import EndScreen from './components/EndScreen';
import WordCard from './components/WordCard';
import OptionsList from './components/OptionsList';
import FeedbackMessage from './components/FeedbackMessage';
import TimerBar from './components/TimerBar';

// Helper function to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const generateQuestion = (pair: WordPair, allPossibleWords: string[]): Question => {
  const isEuskaraTarget = Math.random() < 0.5;
  const targetWord = isEuskaraTarget ? pair.euskara : pair.sinonimo;
  const correctSynonym = isEuskaraTarget ? pair.sinonimo : pair.euskara;

  const distractors: string[] = [];
  // Filter out the target word and its correct synonym from the pool of all words
  const potentialDistractors = shuffleArray(
    allPossibleWords.filter(word => word !== targetWord && word !== correctSynonym)
  );
  
  while (distractors.length < NUMBER_OF_OPTIONS - 1 && potentialDistractors.length > 0) {
      const distractor = potentialDistractors.pop();
      // Ensure distractor is not undefined and not already included (though shuffle should make duplicates unlikely as first pick)
      if (distractor && !distractors.includes(distractor)) {
          distractors.push(distractor);
      }
  }
  // If not enough unique distractors, fill with placeholders or allow fewer options (current logic might result in fewer if pool is small)
  // For simplicity, we'll proceed. In a real app, might need more robust distractor generation.

  const options = shuffleArray([correctSynonym, ...distractors]);

  return {
    pairId: pair.id,
    targetWord,
    correctSynonym,
    options,
    isEuskaraTarget,
  };
};


const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.NOT_STARTED);
  const [gameQuestions, setGameQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<FeedbackType>(FeedbackType.NONE);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [remainingTime, setRemainingTime] = useState<number>(TIMER_DURATION_SECONDS);
  
  const maxQuestions = Math.min(QUESTIONS_PER_GAME, INITIAL_WORD_PAIRS.length);
  const allWordsForDistractors = React.useMemo(() => INITIAL_WORD_PAIRS.flatMap(p => [p.euskara, p.sinonimo]), []);


  const startGame = useCallback(() => {
    setScore(0);
    setFeedback(FeedbackType.NONE);
    setSelectedOption(null);

    const shuffledInitialPairs = shuffleArray(INITIAL_WORD_PAIRS);
    const selectedPairsForGame = shuffledInitialPairs.slice(0, maxQuestions);
    
    const questions = selectedPairsForGame.map(pair => generateQuestion(pair, allWordsForDistractors));
    setGameQuestions(questions);
    setCurrentQuestionIndex(0);

    if (questions.length > 0) {
      setCurrentQuestion(questions[0]);
      setRemainingTime(TIMER_DURATION_SECONDS);
      setGameState(GameState.PLAYING);
    } else {
      setGameState(GameState.FINISHED); // No questions to play
    }
  }, [maxQuestions, allWordsForDistractors]);

  const proceedToNext = useCallback(() => {
    setFeedback(FeedbackType.NONE);
    setSelectedOption(null);
    
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < gameQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
      setCurrentQuestion(gameQuestions[nextIndex]);
      setRemainingTime(TIMER_DURATION_SECONDS);
      setGameState(GameState.PLAYING);
    } else {
      setGameState(GameState.FINISHED);
    }
  }, [currentQuestionIndex, gameQuestions]);


  const handleTimeUp = useCallback(() => {
    if (gameState !== GameState.PLAYING) return; // Prevent multiple calls

    setSelectedOption(null); // Mark as no answer due to time out
    setFeedback(FeedbackType.INCORRECT);
    setGameState(GameState.SHOWING_ANSWER);
  }, [gameState]);

  // Timer effect
  useEffect(() => {
    let intervalId: number | undefined = undefined;
    if (gameState === GameState.PLAYING) {
      if (remainingTime > 0) {
        intervalId = window.setInterval(() => {
          setRemainingTime(prevTime => prevTime - 1);
        }, 1000);
      } else if (remainingTime === 0) {
         handleTimeUp();
      }
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [gameState, remainingTime, handleTimeUp]);


  const handleOptionSelect = (option: string) => {
    if (!currentQuestion || gameState === GameState.SHOWING_ANSWER || gameState !== GameState.PLAYING) return;

    // Clear timer implicitly because gameState will change
    setSelectedOption(option);

    if (option === currentQuestion.correctSynonym) {
      setScore(prevScore => prevScore + 1);
      setFeedback(FeedbackType.CORRECT);
    } else {
      setFeedback(FeedbackType.INCORRECT);
    }
    setGameState(GameState.SHOWING_ANSWER);
  };
  
  // Effect to move to next question after feedback
  useEffect(() => {
    if (gameState === GameState.SHOWING_ANSWER) {
      const timerId = window.setTimeout(() => {
        proceedToNext();
      }, FEEDBACK_DELAY_MS);
      return () => clearTimeout(timerId);
    }
  }, [gameState, proceedToNext]);

  const restartGame = () => {
    setGameState(GameState.NOT_STARTED); 
    // startGame will be called by StartScreen, resetting all necessary states
  };


  if (gameState === GameState.NOT_STARTED) {
    return <StartScreen onStart={startGame} />;
  }

  if (gameState === GameState.FINISHED) {
    return <EndScreen score={score} totalQuestions={gameQuestions.length > 0 ? gameQuestions.length : maxQuestions} onRestart={restartGame} />;
  }

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center h-screen text-slate-700 text-2xl">
        Kargatzen...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-200">
      <header className="w-full max-w-2xl mb-6 text-center">
        <h1 className="text-4xl font-bold text-sky-700">Sinonimoak Bilatu!</h1>
        <div className="mt-4 p-3 bg-white shadow-md rounded-lg inline-block">
          <p className="text-xl font-semibold text-slate-700">
            Puntuazioa: <span className="text-sky-600">{score}</span>
          </p>
          <p className="text-md text-slate-500">
            Galdera: {currentQuestionIndex + 1} / {gameQuestions.length}
          </p>
        </div>
      </header>

      <main className="flex flex-col items-center w-full max-w-2xl">
        <TimerBar remainingTime={remainingTime} maxTime={TIMER_DURATION_SECONDS} />
        <WordCard 
          word={currentQuestion.targetWord} 
          label={currentQuestion.isEuskaraTarget ? "Hitz honen sinonimoa:" : "Hitz honen sinonimoa:"}
        />
        
        {(gameState === GameState.PLAYING || gameState === GameState.SHOWING_ANSWER) && (
          <OptionsList
            options={currentQuestion.options}
            onOptionSelect={handleOptionSelect}
            selectedOption={selectedOption}
            correctOption={currentQuestion.correctSynonym}
            feedback={feedback}
            disabled={gameState === GameState.SHOWING_ANSWER || gameState !== GameState.PLAYING}
          />
        )}

        {gameState === GameState.SHOWING_ANSWER && (
          <FeedbackMessage feedback={feedback} correctWord={currentQuestion.correctSynonym}/>
        )}
      </main>

      {gameState === GameState.PLAYING && !selectedOption && (
         <p className="mt-6 text-sm text-slate-500 text-center">Aukeratu erantzun zuzena denbora agortu baino lehen!</p>
      )}

      <footer className="mt-10 text-sm text-slate-500">
        Euskarazko Sinonimo Jokoa
      </footer>
    </div>
  );
};

export default App;