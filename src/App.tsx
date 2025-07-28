// src/App.tsx

import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import Menu from './game/Menu';
import GameScreen from './game/GameScreen';
import GameOver from './game/GameOver';
import imagemDeFundo from './assets/fundo-musical.jpg';
import IntervalCalculator from './components/IntervalCalculator'; 
import { isPianoReady } from './services/audioService';

export type GameMode = 
  | 'interval' 
  | 'nomenclature' 
  | 'earTrainingEasy' 
  | 'earTrainingMedium' 
  | 'earTrainingHard'
  | 'chordEasy' 
  | 'chordMedium' 
  | 'chordHard';

// MUDANÇA AQUI: Adiciona a nova velocidade
export type GameSpeed = 'beginner' | 'normal' | 'fast'; 
type AppState = 'menu' | 'playing' | 'gameOver' | 'tool';

function App() {
  const [appState, setAppState] = useState<AppState>('menu');
  const [gameMode, setGameMode] = useState<GameMode>('interval');
  const [finalScore, setFinalScore] = useState(0);
  const [isAudioReady, setIsAudioReady] = useState(false);
  // MUDANÇA AQUI: A velocidade padrão agora é 'beginner'
  const [gameSpeed, setGameSpeed] = useState<GameSpeed>('beginner'); 

  useEffect(() => {
    const readyCheck = setInterval(() => {
      if (isPianoReady()) {
        setIsAudioReady(true);
        clearInterval(readyCheck);
      }
    }, 200);

    return () => clearInterval(readyCheck);
  }, []);

  const handleStartGame = (mode: GameMode) => {
    setGameMode(mode);
    setAppState('playing');
  };

  const handleGameOver = (score: number) => {
    setFinalScore(score);
    setAppState('gameOver');
  };

  const handleReturnToMenu = () => {
    setAppState('menu');
  };

  const handleShowTool = () => {
    setAppState('tool');
  };

  const handleSpeedChange = (newSpeed: GameSpeed) => {
    setGameSpeed(newSpeed);
  };

  const renderAppState = () => {
    switch (appState) {
      case 'playing':
        return <GameScreen gameMode={gameMode} gameSpeed={gameSpeed} onGameOver={handleGameOver} onReturnToMenu={handleReturnToMenu} />;
      case 'gameOver':
        return <GameOver score={finalScore} gameMode={gameMode} onReturnToMenu={handleReturnToMenu} />;
      case 'tool':
        return <IntervalCalculator onReturnToMenu={handleReturnToMenu} />;
      case 'menu':
      default:
        return <Menu onStartGame={handleStartGame} onShowTool={handleShowTool} isAudioReady={isAudioReady} gameSpeed={gameSpeed} onSpeedChange={handleSpeedChange} />;
    }
  };

  return (
    <div className={styles.appContainer} style={{ backgroundImage: `url(${imagemDeFundo})` }}>
      <main className={styles.mainContent}>
        {renderAppState()}
      </main>
    </div>
  );
}

export default App;