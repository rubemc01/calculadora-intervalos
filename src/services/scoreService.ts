// src/services/scoreService.ts

import type { GameMode } from '../types'; // MUDANÇA: Importa de '../types'

export type GameModeForScore = GameMode;

const getKey = (gameMode: GameModeForScore): string => `highscore_${gameMode}`;

export const getHighScore = (gameMode: GameModeForScore): number => {
  const key = getKey(gameMode);
  const score = localStorage.getItem(key);
  return score ? parseInt(score, 10) : 0;
};

export const setHighScore = (gameMode: GameModeForScore, score: number): boolean => {
  const key = getKey(gameMode);
  const currentHighScore = getHighScore(gameMode);
  if (score > currentHighScore) {
    localStorage.setItem(key, score.toString());
    return true;
  }
  return false;
};