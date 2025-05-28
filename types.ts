
export interface WordPair {
  id: string; // Unique identifier for the pair
  euskara: string;
  sinonimo: string;
}

export interface Question {
  pairId: string;
  targetWord: string;
  correctSynonym: string;
  options: string[];
  isEuskaraTarget: boolean; // True if targetWord is from euskara column
}

export enum GameState {
  NOT_STARTED = 'NOT_STARTED',
  PLAYING = 'PLAYING',
  SHOWING_ANSWER = 'SHOWING_ANSWER',
  FINISHED = 'FINISHED',
}

export enum FeedbackType {
  NONE = 'NONE',
  CORRECT = 'CORRECT',
  INCORRECT = 'INCORRECT',
}
