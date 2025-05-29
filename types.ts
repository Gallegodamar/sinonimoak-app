
export interface WordPair {
  id: string; // Unique identifier for the pair
  euskara: string;
  sinonimo: string;
}

export interface MultiSynonymWord {
  id: string;
  euskara: string;
  sinonimoak: string[];
}

export interface Question {
  pairId: string;
  targetWord: string;
  correctSynonym: string; 
  options: string[];
  isEuskaraTarget: boolean; 
  allCorrectSynonyms?: string[]; 
}

export enum GameState {
  NOT_STARTED = 'NOT_STARTED',
  LEVEL_SELECTION = 'LEVEL_SELECTION',
  PLAYING = 'PLAYING',
  SHOWING_ANSWER = 'SHOWING_ANSWER',
  FINISHED_LEVEL = 'FINISHED_LEVEL', // Renamed from FINISHED for clarity
}

export enum FeedbackType {
  NONE = 'NONE',
  CORRECT = 'CORRECT',
  INCORRECT = 'INCORRECT',
}
