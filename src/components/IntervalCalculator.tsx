// src/components/IntervalCalculator.tsx

import React, { useState, useMemo } from 'react';
import { musicData, orderedNotes, intervals } from '../data/musicData';
import styles from './IntervalCalculator.module.css';

// VERIFIQUE: Esta linha importa a imagem da pasta assets.
import imagemDeFundo from '../assets/fundo-musical.jpg';

const IntervalCalculator: React.FC = () => {
  const [selectedNote, setSelectedNote] = useState<string>(orderedNotes[0]);
  const [selectedInterval, setSelectedInterval] = useState<string>(intervals[0]);

  const handleNoteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedNote(event.target.value);
  };

  const handleIntervalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedInterval(event.target.value);
  };

  const resultingNote = useMemo(() => {
    return musicData[selectedNote]?.[selectedInterval] || 'N/A';
  }, [selectedNote, selectedInterval]);

  return (
    // VERIFIQUE: Este 'style' aplica a imagem importada ao fundo do div.
    <div 
      className={styles.container} 
      style={{ backgroundImage: `url(${imagemDeFundo})` }}
    >
      <div className={styles.card}>
        <h1 className={styles.title}>Solução do Desafio Intervalo</h1>
        
        <div className={styles.controlGroup}>
          <label htmlFor="note-select" className={styles.label}>Nota Inicial:</label>
          <select id="note-select" value={selectedNote} onChange={handleNoteChange} className={styles.select}>
            {orderedNotes.map(note => (
              <option key={note} value={note}>{note}</option>
            ))}
          </select>
        </div>

        <div className={styles.controlGroup}>
          <label htmlFor="interval-select" className={styles.label}>Intervalo:</label>
          <select id="interval-select" value={selectedInterval} onChange={handleIntervalChange} className={styles.select}>
            {intervals.map(interval => (
              <option key={interval} value={interval}>{interval}</option>
            ))}
          </select>
        </div>
        
        <div className={styles.resultContainer}>
          <h2 className={styles.resultTitle}>Nota Resultado:</h2>
          <p className={styles.resultNote}>{resultingNote}</p>
        </div>
      </div>
    </div>
  );
};

export default IntervalCalculator;