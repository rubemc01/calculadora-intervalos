// src/game/GameScreen.tsx

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styles from './GameScreen.module.css';
import { 
  generateIntervalQuestion, 
  generateNomenclatureQuestion, 
  generateEarTrainingQuestion, 
  generateChordQuestion, 
  generateAbsolutePitchQuestion,
  generateChordCipherQuestion,
  generateRiffQuestion,
  generateScaleQuestion,
  generateChordQualityQuestion,
  generateScaleQualityQuestion
} from '../services/gameLogic';
import { playInterval, playNote, playChord, playRiff, playScale } from '../services/audioService';
import type { GameMode, GameSpeed, Question } from '../types';
import { riffsData } from '../data/riffsData';

interface GameScreenProps {
  gameSpeed: GameSpeed;
  onGameOver: (finalScore: number) => void;
  onReturnToMenu: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ gameSpeed, onGameOver, onReturnToMenu }) => {
  const { gameMode } = useParams<{ gameMode: GameMode }>();

  const timePerQuestion = useMemo(() => {
    switch (gameSpeed) {
      case 'fast': return 12;
      case 'normal': return 20;
      case 'beginner': default: return 30;
    }
  }, [gameSpeed]);
  
  const [question, setQuestion] = useState<Question | null>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | ''>('');
  const [timeLeft, setTimeLeft] = useState(timePerQuestion);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [replayCount, setReplayCount] = useState(0);
  const [playedRiffIds, setPlayedRiffIds] = useState<number[]>([]);

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

  const nextQuestion = useCallback((currentPlayedRiffs: number[]) => {
    clearTimer();
    setFeedback('');
    setTimeLeft(timePerQuestion);
    setSelectedAnswer(null);
    setReplayCount(0);
    let newQuestion: Question;

    if (gameMode?.startsWith('absolutePitch_')) {
      const level = parseInt(gameMode.split('_L')[1], 10);
      newQuestion = generateAbsolutePitchQuestion(level);
    } else {
      switch (gameMode) {
        case 'interval': newQuestion = generateIntervalQuestion(); break;
        case 'nomenclature': newQuestion = generateNomenclatureQuestion(); break;
        case 'chordCipher': newQuestion = generateChordCipherQuestion(); break;
        case 'riff': 
          newQuestion = generateRiffQuestion(currentPlayedRiffs); 
          break;
        case 'earTrainingEasy': newQuestion = generateEarTrainingQuestion('easy'); break;
        case 'earTrainingMedium': newQuestion = generateEarTrainingQuestion('medium'); break;
        case 'earTrainingHard': newQuestion = generateEarTrainingQuestion('hard'); break;
        case 'chordEasy': newQuestion = generateChordQuestion('easy'); break;
        case 'chordMedium': newQuestion = generateChordQuestion('medium'); break;
        case 'chordHard': newQuestion = generateChordQuestion('hard'); break;
        case 'scaleEasy': newQuestion = generateScaleQuestion('easy'); break;
        case 'scaleMedium': newQuestion = generateScaleQuestion('medium'); break;
        case 'scaleHard': newQuestion = generateScaleQuestion('hard'); break;
        case 'scaleQualityEasy': newQuestion = generateScaleQualityQuestion('easy'); break;
        case 'scaleQualityMedium': newQuestion = generateScaleQualityQuestion('medium'); break;
        case 'scaleQualityHard': newQuestion = generateScaleQualityQuestion('hard'); break;
        case 'chordQualityEasy': newQuestion = generateChordQualityQuestion('easy'); break;
        case 'chordQualityMedium': newQuestion = generateChordQualityQuestion('medium'); break;
        default: newQuestion = generateIntervalQuestion(); break;
      }
    }
    setQuestion(newQuestion);

    if (newQuestion.type === 'riff' && newQuestion.questionAudio.sequence) {
      playRiff(newQuestion.questionAudio.sequence, gameSpeed);
    } else if (newQuestion.type === 'scale') {
      playScale(newQuestion.questionAudio.notes);
    } else if (newQuestion.type === 'interval') {
      playInterval(newQuestion.questionAudio.startNote, newQuestion.questionAudio.endNote, gameSpeed);
    } else if (newQuestion.type === 'chord' || newQuestion.type === 'chordCipher') {
      playChord(newQuestion.questionAudio.notes);
    } else if (newQuestion.type !== 'nomenclature') {
      playNote(newQuestion.questionAudio.startNote);
    }
  }, [gameMode, timePerQuestion, gameSpeed]);

  const handleAnswer = useCallback((answer: string) => {
    if (feedback) return;
    clearTimer();
    setSelectedAnswer(answer);
    const isCorrect = answer === question?.correctAnswer;

    let nextPlayedRiffs = playedRiffIds;
    if(question?.type === 'riff' && question.questionId) {
      const totalRiffsAvailable = riffsData.filter(r => r.sequence.length > 1).length;
      const updatedIds = [...playedRiffIds, question.questionId];
      if (updatedIds.length >= totalRiffsAvailable) {
        nextPlayedRiffs = [];
      } else {
        nextPlayedRiffs = updatedIds;
      }
      setPlayedRiffIds(nextPlayedRiffs);
    }
    
    if (isCorrect) {
      const penalty = replayCount * 5;
      const pointsWon = Math.max(0, 10 + timeLeft - penalty);
      setScore(prev => prev + pointsWon);
      setFeedback('correct');
    } else {
      handleWrongAnswer();
    }

    setTimeout(() => { 
      if (isCorrect || lives > 1) {
        nextQuestion(nextPlayedRiffs);
      }
    }, 1500);
  }, [feedback, question, timeLeft, lives, replayCount, clearTimer, handleWrongAnswer, nextQuestion, playedRiffIds]);

  useEffect(() => {
    if (!feedback) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev: number) => {
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

  useEffect(() => {
    setPlayedRiffIds([]);
    nextQuestion([]);
  }, [nextQuestion, gameMode]);

  if (!question) return <div>Carregando...</div>;

  const handleReplayAudio = () => {
    if (!question) return;
    setReplayCount(prev => prev + 1);
    if (question.type === 'riff' && question.questionAudio.sequence) {
        playRiff(question.questionAudio.sequence, gameSpeed);
    } else if (question.type === 'scale') {
      playScale(question.questionAudio.notes);
    } else if (question.type === 'interval') {
      playInterval(question.questionAudio.startNote, question.questionAudio.endNote, gameSpeed);
    } else if (question.type === 'chord' || question.type === 'chordCipher') {
      playChord(question.questionAudio.notes);
    } else if (question.type !== 'nomenclature') {
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
        {question.type !== 'nomenclature' && (
          <button className={styles.audioButton} onClick={handleReplayAudio}>
            {replayCount === 0 ? 'Ouvir Novamente' : 'Ouvir de Novo (-5 pts)'}
          </button>
        )}
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