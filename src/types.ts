// src/types.ts

export type GameMode =
  | 'interval'
  | 'nomenclature'
  | 'chordCipher' // Adicionado o novo modo
  | 'earTrainingEasy' | 'earTrainingMedium' | 'earTrainingHard'
  | 'chordEasy' | 'chordMedium' | 'chordHard'
  | 'absolutePitch_L1' | 'absolutePitch_L2' | 'absolutePitch_L3' | 'absolutePitch_L4' | 'absolutePitch_L5';

export type GameSpeed = 'beginner' | 'normal' | 'fast';

// DEFINIÇÃO DE 'Question' QUE ESTAVA FALTANDO
export interface Question {
  type: 'interval' | 'nomenclature' | 'earTraining' | 'chord' | 'absolutePitch' | 'chordCipher';
  questionText: string;
  questionAudio: {
    startNote: string;
    endNote: string | null;
    notes: string[];
  };
  options: string[];
  correctAnswer: string;
}