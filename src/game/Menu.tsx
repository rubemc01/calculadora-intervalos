// src/game/Menu.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Menu.module.css';
import { startAudioContext } from '../services/audioService';
import type { GameMode, GameSpeed } from '../types';

interface MenuProps {
  onStartGame: (gameMode: GameMode) => void;
  onShowTool: () => void;
  isAudioReady: boolean;
  gameSpeed: GameSpeed;
  onSpeedChange: (speed: GameSpeed) => void;
}

const Menu: React.FC<MenuProps> = ({ onStartGame, onShowTool, isAudioReady, gameSpeed, onSpeedChange }) => {
  const handleModeSelection = async (gameMode: GameMode) => {
    if (!isAudioReady) return;
    try {
      await startAudioContext();
      onStartGame(gameMode);
    } catch (e) {
      console.error("Erro ao iniciar o áudio.", e);
      onStartGame(gameMode);
    }
  };

  return (
    <div className={styles.menuContainer}>
      <h1 className={styles.title}>Desafio Musical</h1>
      {!isAudioReady ? (
        <p className={styles.loadingText}>Carregando sons do piano...</p>
      ) : (
        <p className={styles.subtitle}>Escolha uma velocidade e um modo de jogo</p>
      )}
      
      <div className={styles.speedSelector}>
        <button className={`${styles.speedButton} ${gameSpeed === 'beginner' ? styles.active : ''}`} onClick={() => onSpeedChange('beginner')} disabled={!isAudioReady}>Iniciante</button>
        <button className={`${styles.speedButton} ${gameSpeed === 'normal' ? styles.active : ''}`} onClick={() => onSpeedChange('normal')} disabled={!isAudioReady}>Normal</button>
        <button className={`${styles.speedButton} ${gameSpeed === 'fast' ? styles.active : ''}`} onClick={() => onSpeedChange('fast')} disabled={!isAudioReady}>Rápido</button>
      </div>

      <div className={styles.buttonContainer}>
        <button className={`${styles.btn} ${styles.btnTool}`} onClick={onShowTool} disabled={!isAudioReady}>
          Solução do Intervalo
        </button>
        <hr className={styles.separator} />
        <button className={`${styles.btn} ${styles.btnInterval}`} onClick={() => handleModeSelection('interval')} disabled={!isAudioReady}>Adivinhe o Intervalo</button>
        <button className={`${styles.btn} ${styles.btnNomenclature}`} onClick={() => handleModeSelection('nomenclature')} disabled={!isAudioReady}>Duelo de Nomenclaturas</button>
        <button className={`${styles.btn} ${styles.btnChordCipher}`} onClick={() => handleModeSelection('chordCipher')} disabled={!isAudioReady}>
          Duelo de Acordes
        </button>
        <button className={`${styles.btn} ${styles.btnEarEasy}`} onClick={() => handleModeSelection('earTrainingEasy')} disabled={!isAudioReady}>Adivinhe a Nota (Fácil)</button>
        <button className={`${styles.btn} ${styles.btnEarMedium}`} onClick={() => handleModeSelection('earTrainingMedium')} disabled={!isAudioReady}>Adivinhe a Nota (Médio)</button>
        <button className={`${styles.btn} ${styles.btnEarHard}`} onClick={() => handleModeSelection('earTrainingHard')} disabled={!isAudioReady}>Adivinhe a Nota (Difícil)</button>
        <hr className={styles.separator} />
        <button className={`${styles.btn} ${styles.btnChordEasy}`} onClick={() => handleModeSelection('chordEasy')} disabled={!isAudioReady}>Adivinhe o Acorde (Fácil)</button>
        <button className={`${styles.btn} ${styles.btnChordMedium}`} onClick={() => handleModeSelection('chordMedium')} disabled={!isAudioReady}>Adivinhe o Acorde (Médio)</button>
        <button className={`${styles.btn} ${styles.btnChordHard}`} onClick={() => handleModeSelection('chordHard')} disabled={!isAudioReady}>Adivinhe o Acorde (Difícil)</button>
        <hr className={styles.separator} />
        <Link to="/ouvido-absoluto" className={`${styles.btn} ${styles.btnAbsolutePitch}`}>
          Treino de Ouvido Absoluto
        </Link>
        <button className={`${styles.btn} ${styles.btnRiff}`} onClick={() => handleModeSelection('riff')} disabled={!isAudioReady}>
          Qual é o Riff?
        </button>
      </div>
    </div>
  );
};

export default Menu;