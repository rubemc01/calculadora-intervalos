// src/types.ts

// Colocamos nossas definições compartilhadas aqui e as exportamos.
export type GameMode = 
  | 'interval' 
  | 'nomenclature' 
  | 'earTrainingEasy' 
  | 'earTrainingMedium' 
  | 'earTrainingHard'
  | 'chordEasy' 
  | 'chordMedium' 
  | 'chordHard'
  | 'absolutePitch_L1' 
  | 'absolutePitch_L2' 
  | 'absolutePitch_L3' 
  | 'absolutePitch_L4' 
  | 'absolutePitch_L5';

export type GameSpeed = 'beginner' | 'normal' | 'fast';