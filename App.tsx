
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { WordPair, Question, GameState, FeedbackType, MultiSynonymWord } from './types';
import { 
  LEVEL_1_WORDS, LEVEL_2_WORDS, LEVEL_3_WORDS, LEVEL_4_WORDS, 
  NUMBER_OF_OPTIONS, QUESTIONS_PER_GAME, FEEDBACK_DELAY_MS, TIMER_DURATION_SECONDS, SCORE_TO_PASS_LEVEL 
} from './constants';
import StartScreenComponent from './components/StartScreen'; // Updated name
import LevelSelectionScreenComponent from './components/LevelSelectionScreen'; // Updated name
import EndScreenComponent from './components/EndScreen'; // Updated name
import WordCard from './components/WordCard';
import OptionsList from './components/OptionsList';
import FeedbackMessage from './components/FeedbackMessage';
import TimerBar from './components/TimerBar';

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const generateQuestion = (
  pair: WordPair | MultiSynonymWord,
  allPossibleWords: string[],
  currentLevel: number // Changed from difficulty to currentLevel
): Question => {
  const isMultiSynonymLevel = currentLevel >= 3; // Levels 3 and 4 use MultiSynonymWord
  const isEuskaraTarget = Math.random() < 0.5;
  let targetWord: string;
  let correctSynonymOrEuskaraWord: string;
  let allCorrectSynonymsForQuestion: string[] = [];

  if (isMultiSynonymLevel) {
    const currentPair = pair as MultiSynonymWord;
    if (isEuskaraTarget) {
      targetWord = currentPair.euskara;
      allCorrectSynonymsForQuestion = [...currentPair.sinonimoak];
      correctSynonymOrEuskaraWord = currentPair.sinonimoak[Math.floor(Math.random() * currentPair.sinonimoak.length)];
    } else {
      targetWord = currentPair.sinonimoak[Math.floor(Math.random() * currentPair.sinonimoak.length)];
      correctSynonymOrEuskaraWord = currentPair.euskara;
      allCorrectSynonymsForQuestion = [currentPair.euskara];
    }
  } else { // Levels 1 and 2 use WordPair
    const currentPair = pair as WordPair;
    if (isEuskaraTarget) {
      targetWord = currentPair.euskara;
      correctSynonymOrEuskaraWord = currentPair.sinonimo;
    } else {
      targetWord = currentPair.sinonimo;
      correctSynonymOrEuskaraWord = currentPair.euskara;
    }
    allCorrectSynonymsForQuestion = [correctSynonymOrEuskaraWord];
  }

  let potentialDistractorPool = allPossibleWords.filter(
    word => word !== targetWord && !allCorrectSynonymsForQuestion.includes(word)
  );

  // Refine distractor pool for multi-synonym levels when the target is a synonym
  if (isMultiSynonymLevel && !isEuskaraTarget) {
    const currentMultiPair = pair as MultiSynonymWord;
    // Exclude other synonyms of the same Euskara word from distractors
    const otherSynonymsOfTargetGroup = currentMultiPair.sinonimoak.filter(s => s !== targetWord && s !== correctSynonymOrEuskaraWord);
    potentialDistractorPool = potentialDistractorPool.filter(word => !otherSynonymsOfTargetGroup.includes(word));
  }


  const distractors: string[] = [];
  const shuffledDistractors = shuffleArray(potentialDistractorPool);

  while (distractors.length < NUMBER_OF_OPTIONS - 1 && shuffledDistractors.length > 0) {
    const d = shuffledDistractors.pop();
    if (d && !distractors.includes(d)) { // correctSynonymOrEuskaraWord already excluded by allCorrectSynonyms check in pool
        distractors.push(d);
    }
  }
  
  const optionsSet = new Set<string>([correctSynonymOrEuskaraWord, ...distractors]);
  let emergencyDistractors = shuffleArray(allPossibleWords.filter(w => !optionsSet.has(w) && w !== targetWord));
  while(optionsSet.size < NUMBER_OF_OPTIONS && emergencyDistractors.length > 0) {
    const emergencyD = emergencyDistractors.pop();
    if(emergencyD) optionsSet.add(emergencyD);
  }
  
  let options = shuffleArray(Array.from(optionsSet)).slice(0, NUMBER_OF_OPTIONS);
  if (!options.includes(correctSynonymOrEuskaraWord)) {
    if (options.length >= NUMBER_OF_OPTIONS && options.length > 0) {
        options[Math.floor(Math.random() * options.length)] = correctSynonymOrEuskaraWord;
    } else {
        options.push(correctSynonymOrEuskaraWord);
    }
    options = shuffleArray(options);
  }
  // Ensure options are exactly NUMBER_OF_OPTIONS if possible
  while (options.length < NUMBER_OF_OPTIONS && emergencyDistractors.length > 0) {
    const emergencyD = emergencyDistractors.pop();
    if (emergencyD && !options.includes(emergencyD)) options.push(emergencyD);
    options = shuffleArray(options);
  }
   if (options.length > NUMBER_OF_OPTIONS) {
    options = options.slice(0, NUMBER_OF_OPTIONS);
  }


  return {
    pairId: pair.id,
    targetWord,
    correctSynonym: correctSynonymOrEuskaraWord, 
    options,
    isEuskaraTarget,
    allCorrectSynonyms: allCorrectSynonymsForQuestion,
  };
};


const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.NOT_STARTED);
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [unlockedLevel, setUnlockedLevel] = useState<number>(() => {
    const savedLevel = localStorage.getItem('sinonimoakGameUnlockedLevel');
    return savedLevel ? parseInt(savedLevel, 10) : 1;
  });
  
  const [gameQuestions, setGameQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<FeedbackType>(FeedbackType.NONE);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [remainingTime, setRemainingTime] = useState<number>(TIMER_DURATION_SECONDS);

  const wordsForCurrentLevel = useMemo(() => {
    switch (currentLevel) {
      case 1: return LEVEL_1_WORDS;
      case 2: return LEVEL_2_WORDS;
      case 3: return LEVEL_3_WORDS;
      case 4: return LEVEL_4_WORDS;
      default: return LEVEL_1_WORDS;
    }
  }, [currentLevel]);

  const allWordsForDistractors = useMemo(() => {
    const allWords: string[] = [];
    [LEVEL_1_WORDS, LEVEL_2_WORDS].forEach(levelList => 
      levelList.forEach(pair => {
        allWords.push(pair.euskara, pair.sinonimo);
      })
    );
    [LEVEL_3_WORDS, LEVEL_4_WORDS].forEach(levelList =>
      levelList.forEach(pair => {
        allWords.push(pair.euskara, ...pair.sinonimoak);
      })
    );
    return Array.from(new Set(allWords));
  }, []);

  useEffect(() => {
    localStorage.setItem('sinonimoakGameUnlockedLevel', unlockedLevel.toString());
  }, [unlockedLevel]);

  const startLevel = useCallback((level: number) => {
    setCurrentLevel(level);
    setScore(0);
    setFeedback(FeedbackType.NONE);
    setSelectedOption(null);

    const currentLevelWordList = 
      level === 1 ? LEVEL_1_WORDS :
      level === 2 ? LEVEL_2_WORDS :
      level === 3 ? LEVEL_3_WORDS :
      LEVEL_4_WORDS;

    const shuffledPairs = shuffleArray(currentLevelWordList as Array<WordPair | MultiSynonymWord>);
    const maxQuestionsThisLevel = Math.min(QUESTIONS_PER_GAME, currentLevelWordList.length);
    const selectedPairsForGame = shuffledPairs.slice(0, maxQuestionsThisLevel);
    
    const questions = selectedPairsForGame.map(pair => generateQuestion(pair, allWordsForDistractors, level));
    setGameQuestions(questions);
    setCurrentQuestionIndex(0);

    if (questions.length > 0) {
      setCurrentQuestion(questions[0]);
      setRemainingTime(TIMER_DURATION_SECONDS);
      setGameState(GameState.PLAYING);
    } else {
      console.error("No questions generated for level:", level);
      setGameState(GameState.LEVEL_SELECTION);
    }
  }, [allWordsForDistractors]);

  const proceedToNextQuestionOrLevelEnd = useCallback(() => {
    setFeedback(FeedbackType.NONE);
    setSelectedOption(null);
    
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < gameQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
      setCurrentQuestion(gameQuestions[nextIndex]);
      setRemainingTime(TIMER_DURATION_SECONDS);
      setGameState(GameState.PLAYING);
    } else {
      setGameState(GameState.FINISHED_LEVEL); // Level finished, go to EndScreen
    }
  }, [currentQuestionIndex, gameQuestions]);

  const handleTimeUp = useCallback(() => {
    if (gameState !== GameState.PLAYING) return;
    setSelectedOption(null); 
    setFeedback(FeedbackType.INCORRECT);
    setGameState(GameState.SHOWING_ANSWER);
  }, [gameState]);

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
      if (intervalId) clearInterval(intervalId);
    };
  }, [gameState, remainingTime, handleTimeUp]);

  const handleOptionSelect = (option: string) => {
    if (!currentQuestion || gameState !== GameState.PLAYING) return;

    setSelectedOption(option);
    let isCorrect = false;
    if (currentQuestion.allCorrectSynonyms && currentQuestion.allCorrectSynonyms.length > 0) {
        isCorrect = currentQuestion.allCorrectSynonyms.includes(option);
    } else { 
        isCorrect = option === currentQuestion.correctSynonym;
    }

    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
      setFeedback(FeedbackType.CORRECT);
    } else {
      setFeedback(FeedbackType.INCORRECT);
    }
    setGameState(GameState.SHOWING_ANSWER);
  };
  
  useEffect(() => {
    if (gameState === GameState.SHOWING_ANSWER) {
      const timerId = window.setTimeout(() => {
        proceedToNextQuestionOrLevelEnd();
      }, FEEDBACK_DELAY_MS);
      return () => clearTimeout(timerId);
    }
  }, [gameState, proceedToNextQuestionOrLevelEnd]);

  const handleLevelEndActions = () => {
    const passed = score >= SCORE_TO_PASS_LEVEL;
    if (passed && currentLevel < 4 && currentLevel === unlockedLevel) {
      setUnlockedLevel(prev => prev + 1);
    }
    // Always go back to level selection after a level ends
    setGameState(GameState.LEVEL_SELECTION);
  };
  
  const goBackToMainStart = () => {
    setGameState(GameState.NOT_STARTED);
  };
  
  const goBackToLevelSelection = () => {
     setGameState(GameState.LEVEL_SELECTION);
  };


  if (gameState === GameState.NOT_STARTED) {
    return <StartScreenComponent onStartGame={goBackToLevelSelection} />;
  }

  if (gameState === GameState.LEVEL_SELECTION) {
    return <LevelSelectionScreenComponent 
              unlockedLevel={unlockedLevel} 
              onSelectLevel={startLevel} 
              onGoBack={goBackToMainStart} 
           />;
  }

  if (gameState === GameState.FINISHED_LEVEL) {
    return <EndScreenComponent 
              score={score} 
              totalQuestions={gameQuestions.length} 
              onNavigate={handleLevelEndActions} // Unified navigation
              currentLevel={currentLevel}
              unlockedLevel={unlockedLevel}
              didPass={score >= SCORE_TO_PASS_LEVEL}
           />;
  }

  if (!currentQuestion || gameState !== GameState.PLAYING && gameState !== GameState.SHOWING_ANSWER) {
    // This state should ideally not be reached if logic is correct, or show a loader
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-orange-500 text-white">
        <p className="text-2xl">Kargatzen...</p>
      </div>
    );
  }
  
  const wordCardLabel = currentQuestion.isEuskaraTarget 
    ? "Hitz honen sinonimoa:" 
    : "Sinonimo hau, zein hitzena da?";

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 sm:p-6 bg-orange-500 text-white relative">
      <header className="w-full max-w-2xl flex justify-between items-center mb-4 sm:mb-6">
        <button 
            onClick={goBackToLevelSelection} 
            className="text-white text-3xl sm:text-4xl hover:text-orange-200 p-2 z-10"
            aria-label="Atzera maila hautaketara"
        >
          &larr;
        </button>
        <div className="text-right">
          <p className="text-lg sm:text-xl font-semibold text-orange-100">
            Puntuazioa: <span className="text-white font-bold">{score}</span>
          </p>
          <p className="text-sm sm:text-md text-orange-200">
            {currentQuestionIndex + 1} / {gameQuestions.length}
          </p>
        </div>
      </header>

      <main className="flex flex-col items-center w-full max-w-2xl flex-grow justify-center">
        <WordCard 
          word={currentQuestion.targetWord} 
          label={wordCardLabel}
        />
        <TimerBar remainingTime={remainingTime} maxTime={TIMER_DURATION_SECONDS} />
        
        {(gameState === GameState.PLAYING || gameState === GameState.SHOWING_ANSWER) && (
          <OptionsList
            options={currentQuestion.options}
            onOptionSelect={handleOptionSelect}
            selectedOption={selectedOption}
            correctOption={currentQuestion.correctSynonym}
            allCorrectSynonyms={currentQuestion.allCorrectSynonyms}
            feedback={feedback}
            disabled={gameState === GameState.SHOWING_ANSWER}
          />
        )}

        {gameState === GameState.SHOWING_ANSWER && (
          <FeedbackMessage feedback={feedback} correctWord={currentQuestion.correctSynonym}/>
        )}
      </main>

      {(gameState === GameState.PLAYING && !selectedOption && feedback === FeedbackType.NONE) && (
         <p className="my-6 text-sm text-orange-100 text-center h-6">Aukeratu erantzun zuzena!</p>
      )}
      { (gameState === GameState.SHOWING_ANSWER || (gameState === GameState.PLAYING && selectedOption) ) && (
        <div className="my-6 h-6"></div> 
      )}


      <footer className="w-full text-center py-4 text-sm text-orange-200/70">
        Euskarazko Sinonimo Jokoa
      </footer>
    </div>
  );
};

export default App;
