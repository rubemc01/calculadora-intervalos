// src/services/gameLogic.ts

import { musicData, orderedNotes, intervals } from '../data/musicData';
import { riffsData } from '../data/riffsData';
import type { Question } from '../types';

// --- SEÇÃO DE DADOS E FUNÇÕES AUXILIARES ---
const nomenclaturasBasicas: { [key: string]: string } = { 'C': 'Dó', 'D': 'Ré', 'E': 'Mi', 'F': 'Fá', 'G': 'Sol', 'A': 'Lá', 'B': 'Si' };
const solfejoCompleto: { [key: string]: string } = { 'C': 'Dó', 'C♯': 'Dó♯', 'D♭': 'Ré♭', 'D': 'Ré', 'D♯': 'Ré♯', 'E♭': 'Mi♭', 'E': 'Mi', 'F': 'Fá', 'F♯': 'Fá♯', 'G♭': 'Sol♭', 'G': 'Sol', 'G♯': 'Sol♯', 'A♭': 'Lá♭', 'A': 'Lá', 'A♯': 'Lá♯', 'B♭': 'Si♭', 'B': 'Si' };
const todosOsSolfejos = Object.values(solfejoCompleto);
const cifrasBasicas = Object.keys(nomenclaturasBasicas);
const solfejoBasico = Object.values(nomenclaturasBasicas);
const chromaticScale: string[] = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];
const noteToIndex = new Map([
  ...chromaticScale.map((note, i): [string, number] => [note, i]),
  ['D♭', 1], ['E♭', 3], ['G♭', 6], ['A♭', 8], ['B♭', 10]
]);

const chordFormulas: { [key: string]: number[] } = {
  'Maior': [0, 4, 7],
  'menor': [0, 3, 7],
  'diminuto': [0, 3, 6],
  'aumentado': [0, 4, 8],
  '7ª Dominante': [0, 4, 7, 10]
};

const scaleFormulas: { [key: string]: number[] } = {
  'Maior': [0, 2, 4, 5, 7, 9, 11],
  'Menor Natural': [0, 2, 3, 5, 7, 8, 10],
  'Menor Harmônica': [0, 2, 3, 5, 7, 8, 11],
  'Menor Melódica': [0, 2, 3, 5, 7, 9, 11],
  'Pentatônica Maior': [0, 2, 4, 7, 9],
  'Blues': [0, 3, 5, 6, 7, 10],
};

const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5);

const chordCiphers: { [key: string]: string } = {
    'C': 'Dó Maior', 'Cm': 'Dó menor',
    'G': 'Sol Maior', 'Gm': 'Sol menor',
    'D': 'Ré Maior', 'Dm': 'Ré menor',
    'A': 'Lá Maior', 'Am': 'Lá menor',
    'E': 'Mi Maior', 'Em': 'Mi menor',
    'B': 'Si Maior', 'Bm': 'Si menor',
    'F': 'Fá Maior', 'Fm': 'Fá menor',
};
const allChordCiphers = Object.keys(chordCiphers);
const allChordNames = Object.values(chordCiphers);

const buildChord = (root: string, type: string): string[] => {
  const rootIndex = noteToIndex.get(root)!;
  const formula = chordFormulas[type];
  return formula.map(interval => chromaticScale[(rootIndex + interval) % 12]);
};

const buildScale = (root: string, type: string): string[] => {
  const rootIndex = noteToIndex.get(root)!;
  const formula = scaleFormulas[type];
  const scaleNotes = formula.map(interval => chromaticScale[(rootIndex + interval) % 12]);
  return [...scaleNotes, chromaticScale[rootIndex]];
};

// --- FUNÇÕES GERADORAS DE PERGUNTAS ---

export const generateIntervalQuestion = (): Question => {
  const startNote = orderedNotes[Math.floor(Math.random() * orderedNotes.length)];
  const correctInterval = intervals[Math.floor(Math.random() * intervals.length)];
  const endNote = musicData[startNote][correctInterval];
  const wrongAnswers = intervals.filter(i => i !== correctInterval).sort(() => 0.5 - Math.random()).slice(0, 3);
  const options = shuffleArray([correctInterval, ...wrongAnswers]);
  return {
    type: 'interval',
    questionText: `Qual o intervalo entre ${startNote} e ${endNote}?`,
    questionAudio: { startNote, endNote, notes: [] },
    options,
    correctAnswer: correctInterval,
  };
};

export const generateNomenclatureQuestion = (): Question => {
  const correctCifra = cifrasBasicas[Math.floor(Math.random() * cifrasBasicas.length)];
  const correctSolfejo = nomenclaturasBasicas[correctCifra];
  const wrongAnswers = solfejoBasico.filter(s => s !== correctSolfejo).sort(() => 0.5 - Math.random()).slice(0, 3);
  const options = shuffleArray([correctSolfejo, ...wrongAnswers]);
  return {
    type: 'nomenclature',
    questionText: `Qual a nota correspondente à cifra "${correctCifra}"?`,
    questionAudio: { startNote: correctCifra, endNote: null, notes: [] },
    options,
    correctAnswer: correctSolfejo,
  };
};

export const generateChordCipherQuestion = (): Question => {
  const correctCipher = allChordCiphers[Math.floor(Math.random() * allChordCiphers.length)];
  const correctAnswer = chordCiphers[correctCipher];
  let rootNote: string, chordType: string;
  if (correctCipher.endsWith('m')) { chordType = 'menor'; rootNote = correctCipher.slice(0, -1); } 
  else { chordType = 'Maior'; rootNote = correctCipher; }
  const chordNotes = buildChord(rootNote, chordType);
  const wrongAnswers = allChordNames.filter(name => name !== correctAnswer).sort(() => 0.5 - Math.random()).slice(0, 3);
  const options = shuffleArray([correctAnswer, ...wrongAnswers]);
  return {
    type: 'chordCipher',
    questionText: `Qual acorde a cifra "${correctCipher}" representa?`,
    questionAudio: { startNote: '', endNote: null, notes: chordNotes },
    options,
    correctAnswer,
  };
};

export const generateEarTrainingQuestion = (difficulty: 'easy' | 'medium' | 'hard'): Question => {
  let notePool: string[], answerPool = todosOsSolfejos;
  switch (difficulty) {
    case 'medium': notePool = chromaticScale; break;
    case 'hard': notePool = chromaticScale; break;
    case 'easy': default:
      notePool = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
      answerPool = Object.values(nomenclaturasBasicas); break;
  }
  let correctNote = notePool[Math.floor(Math.random() * notePool.length)];
  const correctAnswer = solfejoCompleto[correctNote];
  if (difficulty === 'hard') {
    const octaves = [3, 4, 5];
    correctNote = `${correctNote}${octaves[Math.floor(Math.random() * octaves.length)]}`;
  }
  const wrongAnswers = answerPool.filter(s => s !== correctAnswer).sort(() => 0.5 - Math.random()).slice(0, 3);
  const options = shuffleArray([correctAnswer, ...wrongAnswers]);
  return {
    type: 'earTraining',
    questionText: 'Que nota é esta?',
    questionAudio: { startNote: correctNote, endNote: null, notes: [] },
    options,
    correctAnswer,
  };
};

// --- FUNÇÃO MODIFICADA: Adivinhe o Acorde (agora por QUALIDADE) ---
export const generateChordQuestion = (difficulty: 'easy' | 'medium' | 'hard'): Question => {
  const rootPool = chromaticScale;
  let typePool: string[];

  switch (difficulty) {
    case 'medium':
      typePool = ['Maior', 'menor', 'diminuto', '7ª Dominante'];
      break;
    case 'hard':
      typePool = ['Maior', 'menor', 'diminuto', 'aumentado', '7ª Dominante'];
      break;
    case 'easy':
    default:
      typePool = ['Maior', 'menor'];
      break;
  }
  
  const randomRoot = rootPool[Math.floor(Math.random() * rootPool.length)];
  const randomType = typePool[Math.floor(Math.random() * typePool.length)];

  const chordNotes = buildChord(randomRoot, randomType);
  const correctAnswer = randomType;
  const options = shuffleArray(typePool);

  return {
    type: 'chord',
    questionText: 'Qual a qualidade deste acorde?',
    questionAudio: { startNote: '', endNote: null, notes: chordNotes },
    options,
    correctAnswer,
  };
};

export const generateAbsolutePitchQuestion = (level: number): Question => {
  let notePool: string[], answerPool: string[], questionText = 'Qual nota é esta?', options: string[];
  switch (level) {
    case 1:
      const isNoteC = Math.random() < 0.5;
      const correctNoteL1 = isNoteC ? 'C' : chromaticScale.filter(n => n !== 'C')[Math.floor(Math.random() * 11)];
      return { type: 'absolutePitch', questionText: 'Esta nota é Dó?', questionAudio: { startNote: correctNoteL1, endNote: null, notes: [] }, options: ['Sim', 'Não'], correctAnswer: isNoteC ? 'Sim' : 'Não' };
    case 2: notePool = ['C', 'G']; answerPool = ['Dó', 'Sol']; break;
    case 3: notePool = ['C', 'E', 'G']; answerPool = ['Dó', 'Mi', 'Sol']; break;
    case 4: notePool = ['C', 'D', 'E', 'F', 'G', 'A', 'B']; answerPool = notePool.map(note => solfejoCompleto[note]); break;
    case 5: notePool = chromaticScale; answerPool = notePool.map(note => solfejoCompleto[note]); break;
    default: return generateAbsolutePitchQuestion(1);
  }
  const correctNote = notePool[Math.floor(Math.random() * notePool.length)];
  const correctAnswer = solfejoCompleto[correctNote];
  if (level === 2 || level === 3) {
    options = shuffleArray(answerPool);
  } else {
    const wrongAnswers = answerPool.filter(answer => answer !== correctAnswer).sort(() => 0.5 - Math.random()).slice(0, 3);
    options = shuffleArray([correctAnswer, ...wrongAnswers]);
  }
  return { type: 'absolutePitch', questionText, questionAudio: { startNote: correctNote, endNote: null, notes: [] }, options, correctAnswer };
};

export const generateRiffQuestion = (excludeIds: number[] = []): Question => {
  let availableRiffs = riffsData.filter(riff => riff.sequence.length > 1 && !excludeIds.includes(riff.id));
  if (availableRiffs.length === 0) { availableRiffs = riffsData.filter(riff => riff.sequence.length > 1); }
  const randomRiff = availableRiffs[Math.floor(Math.random() * availableRiffs.length)];
  const correctAnswer = `${randomRiff.songTitle} - ${randomRiff.artist}`;
  const options = shuffleArray([correctAnswer, ...randomRiff.options]);
  return { type: 'riff', questionId: randomRiff.id, questionText: 'Qual é o Riff?', questionAudio: { startNote: '', endNote: null, notes: [], sequence: randomRiff.sequence }, options, correctAnswer };
};

// --- FUNÇÃO MODIFICADA: Identifique a Escala (agora por QUALIDADE) ---
export const generateScaleQuestion = (difficulty: 'easy' | 'medium' | 'hard'): Question => {
  const rootPool: string[] = ['C', 'G', 'D', 'A', 'E', 'F', 'B♭'];
  let typePool: string[];

  switch (difficulty) {
    case 'medium':
      typePool = ['Maior', 'Menor Natural', 'Menor Harmônica'];
      break;
    case 'hard':
      typePool = Object.keys(scaleFormulas);
      break;
    case 'easy':
    default:
      typePool = ['Maior', 'Menor Natural'];
      break;
  }
  
  const randomRoot = rootPool[Math.floor(Math.random() * rootPool.length)];
  const randomType = typePool[Math.floor(Math.random() * typePool.length)];

  const scaleNotes = buildScale(randomRoot, randomType);
  const correctAnswer = randomType;
  const options = shuffleArray(typePool);

  return {
    type: 'scale',
    questionText: 'Qual tipo de escala é esta?',
    questionAudio: { startNote: '', endNote: null, notes: scaleNotes },
    options,
    correctAnswer,
  };
};

// As funções abaixo não são mais usadas diretamente pelo menu, mas são chamadas pelas de cima.
export const generateChordQualityQuestion = (difficulty: 'easy' | 'medium'): Question => { return generateChordQuestion(difficulty); };
export const generateScaleQualityQuestion = (difficulty: 'easy' | 'medium' | 'hard'): Question => { return generateScaleQuestion(difficulty); };