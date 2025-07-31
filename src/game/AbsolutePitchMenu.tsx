// src/game/AbsolutePitchMenu.tsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './AbsolutePitchMenu.module.css';
import type { GameMode } from '../types'; // MUDANÇA: Importa de '../types'

const levels: { level: number; title: string; description: string; gameMode: GameMode }[] = [
  { level: 1, title: "A Nota Âncora", description: "Concentre-se em identificar a nota Dó.", gameMode: "absolutePitch_L1" },
  { level: 2, title: "O Contraste Perfeito", description: "Diferencie entre Dó e Sol.", gameMode: "absolutePitch_L2" },
  { level: 3, title: "A Tríade Fundamental", description: "Reconheça Dó, Mi e Sol.", gameMode: "absolutePitch_L3" },
  { level: 4, title: "As Teclas Brancas", description: "Domine as 7 notas naturais.", gameMode: "absolutePitch_L4" },
  { level: 5, title: "O Desafio Cromático", description: "Identifique qualquer uma das 12 notas.", gameMode: "absolutePitch_L5" },
];

const AbsolutePitchMenu: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate('/')}>&larr; Menu Principal</button>
      <h1 className={styles.title}>Treino de Ouvido Absoluto</h1>
      <p className={styles.subtitle}>Comece pelo nível 1 e avance progressivamente para treinar sua percepção.</p>
      
      <div className={styles.levelGrid}>
        {levels.map((level) => (
          <Link to={`/jogo/${level.gameMode}`} key={level.level} className={styles.levelCard}>
            <div className={styles.levelNumber}>Nível {level.level}</div>
            <h2 className={styles.levelTitle}>{level.title}</h2>
            <p className={styles.levelDescription}>{level.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AbsolutePitchMenu;