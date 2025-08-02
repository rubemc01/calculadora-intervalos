// src/types.ts

export type GameMode =
  | 'interval'
  | 'nomenclature'
  | 'chordCipher'
  | 'riff'
  | 'earTrainingEasy' | 'earTrainingMedium' | 'earTrainingHard'
  | 'chordEasy' | 'chordMedium' | 'chordHard'
  | 'absolutePitch_L1' | 'absolutePitch_L2' | 'absolutePitch_L3' | 'absolutePitch_L4' | 'absolutePitch_L5'
  | 'scaleEasy' | 'scaleMedium' | 'scaleHard'
  | 'chordQualityEasy' | 'chordQualityMedium'
  | 'scaleQualityEasy' | 'scaleQualityMedium' | 'scaleQualityHard';

export type GameSpeed = 'beginner' | 'normal' | 'fast';

export interface Question {
  type: GameMode | 'earTraining' | 'absolutePitch' | 'scale' | 'chord';
  questionText: string;
  questionAudio: {
    startNote: string;
    endNote: string | null;
    notes: string[];
    sequence?: { time: string, note: string | string[], duration: string }[];
  };
  options: string[];
  correctAnswer: string;
  questionId?: number;
}

export interface RiffQuestion {
  id: number;
  songTitle: string;
  artist: string;
  options: string[];
  sequence: { time: string, note: string | string[], duration: string }[];
}