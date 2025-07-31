// src/game/GameScreen.tsx

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import styles from './GameScreen.module.css';
import { generateIntervalQuestion, generateNomenclatureQuestion, generateEarTrainingQuestion, generateChordQuestion, generateAbsolutePitchQuestion } from '../services/gameLogic';
import { playInterval, playNote, playChord } from '../services/audioService';
import { GameMode, GameSpeed } from '../App';

interface GameScreenProps {
  gameSpeed: GameSpeed;
  onGameOver: (finalScore: number) => void;
  onReturnToMenu: () => void;
}

type Question = ReturnType<typeof generateIntervalQuestion | typeof generateNomenclatureQuestion | typeof generateEarTrainingQuestion | typeof generateChordQuestion | typeof generateAbsolutePitchQuestion>;

const GameScreen: React.FC<GameScreenProps> = ({ gameSpeed, onGameOver, onReturnToMenu }) => {
  const { gameMode } = useParams<{ gameMode: GameMode }>();

  const getTimeForSpeed = (speed: GameSpeed) => {
    switch (speed) {
      case 'fast': return 8;
      case 'normal': return 15;
      case 'beginner': default: return 25;
    }
  };
  const timePerQuestion = getTimeForSpeed(gameSpeed);
  
  const [question, setQuestion] = useState<Question | null>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | ''>('');
  const [timeLeft, setTimeLeft] = useState(timePerQuestion);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = useCallback(() => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  const triggerGameOver = useCallback(() => {
    clearTimer();
    onGameOver(score);
  }, [onGameOver, score, clearTimer]);

  useEffect(() => { if (lives === 0) triggerGameOver(); }, [lives, triggerGameOver]);

  const handleWrongAnswer = useCallback(() => {
    clearTimer();
    setFeedback('incorrect');
    setLives(prev => prev - 1);
  }, [clearTimer]);

  const nextQuestion = useCallback(() => {
    clearTimer();
    setFeedback('');
    setTimeLeft(timePerQuestion);
    setSelectedAnswer(null);
    let newQuestion: Question;
    switch (gameMode) {
      case 'interval': newQuestion = generateIntervalQuestion(); break;
      case 'nomenclature': newQuestion = generateNomenclatureQuestion(); break;
      case 'earTrainingEasy': newQuestion = generateEarTrainingQuestion('easy'); break;
      case 'earTrainingMedium': newQuestion = generateEarTrainingQuestion('medium'); break;
      case 'earTrainingHard': newQuestion = generateEarTrainingQuestion('hard'); break;
      case 'chordEasy': newQuestion = generateChordQuestion('easy'); break;
      case 'chordMedium': newQuestion = generateChordQuestion('medium'); break;
      case 'chordHard': newQuestion = generateChordQuestion('hard'); break;
      case 'absolutePitch_L1': newQuestion = generateAbsolutePitchQuestion(1); break;
      default: newQuestion = generateIntervalQuestion(); break;
    }
    setQuestion(newQuestion);

    if (newQuestion.type === 'interval') {
      playInterval(newQuestion.questionAudio.startNote, newQuestion.questionAudio.endNote, gameSpeed);
    } else if (newQuestion.type === 'chord') {
      playChord(newQuestion.questionAudio.notes);
    } else {
      playNote(newQuestion.questionAudio.startNote);
    }
  }, [gameMode, clearTimer, timePerQuestion, gameSpeed]);

  const handleAnswer = useCallback((answer: string) => {
    if (feedback) return;
    clearTimer();
    setSelectedAnswer(answer);
    const isCorrect = answer === question?.correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 10 + timeLeft);
      setFeedback('correct');
    } else {
      handleWrongAnswer();
    }
    setTimeout(() => { if (isCorrect || lives > 1) nextQuestion(); }, 1500);
  }, [feedback, question, timeLeft, lives, clearTimer, handleWrongAnswer, nextQuestion]);

  useEffect(() => {
    if (!feedback) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearTimer();
            handleWrongAnswer();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return clearTimer;
  }, [feedback, handleWrongAnswer, clearTimer]);

  useEffect(() => { nextQuestion(); }, [nextQuestion]);

  if (!question) return <div>Carregando...</div>;

  const handleReplayAudio = () => {
    if (!question) return;
    if (question.type === 'interval') {
      playInterval(question.questionAudio.startNote, question.questionAudio.endNote, gameSpeed);
    } else if (question.type === 'chord') {
      playChord(question.questionAudio.notes);
    } else {
      playNote(question.questionAudio.startNote);
    }
  };

  return (
    <div className={styles.gameCard}>
      <div className={styles.hud}>
        <button className={styles.backButton} onClick={onReturnToMenu}>&larr; Menu</button>
        <div className={styles.score}>Pontos: {score}</div>
        <div className={styles.timer}>{timeLeft}s</div>
        <div className={styles.lives}>
          {[...Array(3)].map((_, i) => (
            <span key={i} style={{ fontSize: '1.5rem', marginRight: '5px' }}>
              {i < lives ? '❤️' : '🤍'}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.timerBarContainer}>
        <div className={styles.timerBar} style={{ width: `${(timeLeft / timePerQuestion) * 100}%`, transition: timeLeft === timePerQuestion ? 'none' : 'width 1s linear' }}></div>
      </div>
      <div className={styles.questionBox}>
        <p className={styles.questionText}>{question.questionText}</p>
        <button className={styles.audioButton} onClick={handleReplayAudio}>Ouvir Novamente</button>
      </div>
      <div className={styles.optionsGrid}>
        {question.options.map((option: string, index: number) => (
          <button
            key={index}
            className={`${styles.optionButton} ${feedback && option === question.correctAnswer ? styles.correct : ''} ${feedback === 'incorrect' && option === selectedAnswer ? styles.incorrect : ''}`}
            onClick={() => handleAnswer(option)}
            disabled={!!feedback}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameScreen;