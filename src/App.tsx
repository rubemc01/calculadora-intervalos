// src/App.tsx

// A CORREÇÃO ESTÁ NESTA LINHA:
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import styles from './App.module.css';
import Menu from './game/Menu';
import GameScreen from './game/GameScreen';
import GameOver from './game/GameOver';
import imagemDeFundo from './assets/fundo-musical.jpg';
import IntervalCalculator from './components/IntervalCalculator'; 
import { isPianoReady } from './services/audioService';
import AbsolutePitchMenu from './game/AbsolutePitchMenu';

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

function App() {
  const [lastScore, setLastScore] = useState(0);
  const [lastGameMode, setLastGameMode] = useState<GameMode>('interval');
  const [isAudioReady, setIsAudioReady] = useState(false);
  const [gameSpeed, setGameSpeed] = useState<GameSpeed>('beginner');
  const navigate = useNavigate(); 

  useEffect(() => {
    const readyCheck = setInterval(() => {
      if (isPianoReady()) { setIsAudioReady(true); clearInterval(readyCheck); }
    }, 200);
    return () => clearInterval(readyCheck);
  }, []);

  const handleStartGame = (mode: GameMode) => {
    setLastGameMode(mode);
    navigate(`/jogo/${mode}`);
  };

  const handleGameOver = (score: number) => {
    setLastScore(score);
    navigate('/fim-de-jogo');
  };

  const handleReturnToMenu = () => { navigate('/'); };
  const handleShowTool = () => { navigate('/ferramenta'); };
  const handleSpeedChange = (newSpeed: GameSpeed) => { setGameSpeed(newSpeed); };

  return (
    <div className={styles.appContainer} style={{ backgroundImage: `url(${imagemDeFundo})` }}>
      <main className={styles.mainContent}>
        <Routes>
          <Route path="/" element={
            <Menu 
              onStartGame={handleStartGame} 
              onShowTool={handleShowTool} 
              isAudioReady={isAudioReady} 
              gameSpeed={gameSpeed} 
              onSpeedChange={handleSpeedChange} 
            />
          } />
          <Route path="/jogo/:gameMode" element={
            <GameScreen 
              gameSpeed={gameSpeed} 
              onGameOver={handleGameOver} 
              onReturnToMenu={handleReturnToMenu} 
            />
          } />
          <Route path="/ferramenta" element={ <IntervalCalculator onReturnToMenu={handleReturnToMenu} /> } />
          <Route path="/fim-de-jogo" element={
            <GameOver 
              score={lastScore} 
              gameMode={lastGameMode} 
              onReturnToMenu={handleReturnToMenu} 
            />
          } />
          <Route path="/ouvido-absoluto" element={ <AbsolutePitchMenu /> } />
        </Routes>
      </main>
    </div>
  );
}

export default App;