// src/game/GameOver.tsx

import React, { useState, useEffect } from 'react';
import styles from './GameOver.module.css';
import { getHighScore, setHighScore } from '../services/scoreService';
import { GameMode } from '../App';

interface GameOverProps {
  score: number;
  gameMode: GameMode;
  onReturnToMenu: () => void; // Prop renomeada de onRestart
}

const GameOver: React.FC<GameOverProps> = ({ score, gameMode, onReturnToMenu }) => {
  const [highScore, setHighScoreState] = useState(0);
  const [isNewHighScore, setIsNewHighScore] = useState(false);

  useEffect(() => {
    const newRecord = setHighScore(gameMode, score);
    setIsNewHighScore(newRecord);
    setHighScoreState(getHighScore(gameMode));
  }, [gameMode, score]);

  return (
    <div className={styles.gameOverContainer}>
      <h1 className={styles.title}>Fim de Jogo!</h1>
      
      {isNewHighScore && (
        <p className={styles.newRecord}>🎉 NOVO RECORDE! 🎉</p>
      )}

      <p className={styles.scoreText}>Sua pontuação:</p>
      <p className={styles.finalScore}>{score}</p>
      
      <p className={styles.highScoreText}>Recorde: {highScore}</p>
      
      {/* Botão com texto alterado */}
      <button className={styles.restartButton} onClick={onReturnToMenu}>
        Voltar ao Menu
      </button>
    </div>
  );
};

export default GameOver;