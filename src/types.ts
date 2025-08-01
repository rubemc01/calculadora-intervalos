// src/types.ts

export type GameMode =
  | 'interval'
  | 'nomenclature'
  | 'chordCipher'
  | 'earTrainingEasy' | 'earTrainingMedium' | 'earTrainingHard'
  | 'chordEasy' | 'chordMedium' | 'chordHard'
  | 'absolutePitch_L1' | 'absolutePitch_L2' | 'absolutePitch_L3' | 'absolutePitch_L4' | 'absolutePitch_L5'
  | 'riff';

export type GameSpeed = 'beginner' | 'normal' | 'fast';

export interface Question {
  type: 'interval' | 'nomenclature' | 'earTraining' | 'chord' | 'absolutePitch' | 'chordCipher' | 'riff';
  questionText: string;
  questionAudio: {
    startNote: string;
    endNote: string | null;
    notes: string[];
    sequence?: { time: string, note: string | string[], duration: string }[]; // A propriedade 'note' foi alterada aqui
  };
  options: string[];
  correctAnswer: string;
}

export interface RiffQuestion {
  id: number;
  songTitle: string;
  artist: string;
  options: string[];
  // MUDANÇA AQUI: A propriedade 'note' agora pode ser uma string OU um array de strings
  sequence: { time: string, note: string | string[], duration: string }[];
}