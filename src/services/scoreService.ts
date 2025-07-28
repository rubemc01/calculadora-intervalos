// src/services/scoreService.ts

// 1. Importa o tipo 'GameMode' principal do App.tsx
import { GameMode } from '../App';

// 2. Define o tipo para o placar como sendo exatamente o mesmo que o GameMode principal
export type GameModeForScore = GameMode;

// O resto do arquivo permanece igual
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