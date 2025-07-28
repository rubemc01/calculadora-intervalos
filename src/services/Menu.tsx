// src/game/Menu.tsx

import React from 'react';
import styles from './Menu.module.css';
import { startAudioContext } from '../services/audioService';
import { GameMode } from '../App';

// A correção está nesta interface, que precisa aceitar 'isAudioReady'
interface MenuProps {
  onStartGame: (mode: GameMode) => void;
  onShowTool: () => void;
  isAudioReady: boolean;
}

// E aqui, o componente precisa receber 'isAudioReady'
const Menu: React.FC<MenuProps> = ({ onStartGame, onShowTool, isAudioReady }) => {
  
  const handleModeSelection = async (gameMode: GameMode) => {
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
        <p className={styles.subtitle}>Escolha um modo de jogo ou use a ferramenta</p>
      )}
      
      <div className={styles.buttonContainer}>
        <button className={`${styles.btn} ${styles.btnTool}`} onClick={onShowTool} disabled={!isAudioReady}>
          Solução do Intervalo
        </button>
        <hr className={styles.separator} />
        <button className={`${styles.btn} ${styles.btnInterval}`} onClick={() => handleModeSelection('interval')} disabled={!isAudioReady}>
          Adivinhe o Intervalo
        </button>
        <button className={`${styles.btn} ${styles.btnNomenclature}`} onClick={() => handleModeSelection('nomenclature')} disabled={!isAudioReady}>
          Duelo de Nomenclaturas
        </button>
        <button className={`${styles.btn} ${styles.btnEarEasy}`} onClick={() => handleModeSelection('earTrainingEasy')} disabled={!isAudioReady}>
          Adivinhe a Nota (Fácil)
        </button>
        <button className={`${styles.btn} ${styles.btnEarMedium}`} onClick={() => handleModeSelection('earTrainingMedium')} disabled={!isAudioReady}>
          Adivinhe a Nota (Médio)
        </button>
        <button className={`${styles.btn} ${styles.btnEarHard}`} onClick={() => handleModeSelection('earTrainingHard')} disabled={!isAudioReady}>
          Adivinhe a Nota (Difícil)
        </button>
        <hr className={styles.separator} />
        <button className={`${styles.btn} ${styles.btnChordEasy}`} onClick={() => handleModeSelection('chordEasy')} disabled={!isAudioReady}>
          Adivinhe o Acorde (Fácil)
        </button>
        <button className={`${styles.btn} ${styles.btnChordMedium}`} onClick={() => handleModeSelection('chordMedium')} disabled={!isAudioReady}>
          Adivinhe o Acorde (Médio)
        </button>
        <button className={`${styles.btn} ${styles.btnChordHard}`} onClick={() => handleModeSelection('chordHard')} disabled={!isAudioReady}>
          Adivinhe o Acorde (Difícil)
        </button>
      </div>
    </div>
  );
};

export default Menu;