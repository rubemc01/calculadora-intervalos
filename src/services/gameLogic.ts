// src/services/gameLogic.ts

import { musicData, orderedNotes, intervals } from '../data/musicData';

const nomenclaturasBasicas: { [key: string]: string } = { 'C': 'Dó', 'D': 'Ré', 'E': 'Mi', 'F': 'Fá', 'G': 'Sol', 'A': 'Lá', 'B': 'Si' };
const solfejoCompleto: { [key: string]: string } = { 'C': 'Dó', 'C♯': 'Dó♯', 'D♭': 'Ré♭', 'D': 'Ré', 'D♯': 'Ré♯', 'E♭': 'Mi♭', 'E': 'Mi', 'F': 'Fá', 'F♯': 'Fá♯', 'G♭': 'Sol♭', 'G': 'Sol', 'G♯': 'Sol♯', 'A♭': 'Lá♭', 'A': 'Lá', 'A♯': 'Lá♯', 'B♭': 'Si♭', 'B': 'Si' };
const todosOsSolfejos = Object.values(solfejoCompleto);
const cifrasBasicas = Object.keys(nomenclaturasBasicas);
const solfejoBasico = Object.values(nomenclaturasBasicas);
const chromaticScale: string[] = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];
const noteToIndex = new Map(chromaticScale.map((note, i) => [note, i]));
const chordFormulas: { [key: string]: number[] } = { 'Maior': [0, 4, 7], 'menor': [0, 3, 7], 'diminuto': [0, 3, 6], 'aumentado': [0, 4, 8] };

const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5);

const buildChord = (root: string, type: string): string[] => {
  const rootIndex = noteToIndex.get(root)!;
  const formula = chordFormulas[type];
  return formula.map(interval => chromaticScale[(rootIndex + interval) % 12]);
};

export const generateIntervalQuestion = () => {
  const startNote = orderedNotes[Math.floor(Math.random() * orderedNotes.length)];
  const correctInterval = intervals[Math.floor(Math.random() * intervals.length)];
  const endNote = musicData[startNote][correctInterval];
  const wrongAnswers = intervals.filter(i => i !== correctInterval).sort(() => 0.5 - Math.random()).slice(0, 3);
  const options = shuffleArray([correctInterval, ...wrongAnswers]);
  return {
    type: 'interval',
    questionText: `Qual o intervalo entre ${startNote} e ${endNote}?`,
    questionAudio: { startNote, endNote, notes: [] as string[] },
    options,
    correctAnswer: correctInterval,
  };
};

export const generateNomenclatureQuestion = () => {
  const correctCifra = cifrasBasicas[Math.floor(Math.random() * cifrasBasicas.length)];
  const correctSolfejo = nomenclaturasBasicas[correctCifra];
  const wrongAnswers = solfejoBasico.filter(s => s !== correctSolfejo).sort(() => 0.5 - Math.random()).slice(0, 3);
  const options = shuffleArray([correctSolfejo, ...wrongAnswers]);
  return {
    type: 'nomenclature',
    questionText: `Qual a nota correspondente à cifra "${correctCifra}"?`,
    questionAudio: { startNote: correctCifra, endNote: null, notes: [] as string[] },
    options,
    correctAnswer: correctSolfejo,
  };
};

export const generateEarTrainingQuestion = (difficulty: 'easy' | 'medium' | 'hard') => {
  let notePool: string[];
  let answerPool = todosOsSolfejos;
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
    const randomOctave = octaves[Math.floor(Math.random() * octaves.length)];
    correctNote = `${correctNote}${randomOctave}`;
  }
  const wrongAnswers = answerPool.filter(s => s !== correctAnswer).sort(() => 0.5 - Math.random()).slice(0, 3);
  const options = shuffleArray([correctAnswer, ...wrongAnswers]);
  return {
    type: 'earTraining',
    questionText: 'Que nota é esta?',
    questionAudio: { startNote: correctNote, endNote: null, notes: [] as string[] },
    options,
    correctAnswer,
  };
};

export const generateChordQuestion = (difficulty: 'easy' | 'medium' | 'hard') => {
  let rootPool: string[];
  let typePool: string[];
  switch (difficulty) {
    case 'medium': rootPool = chromaticScale; typePool = ['Maior', 'menor', 'diminuto']; break;
    case 'hard': rootPool = chromaticScale; typePool = ['Maior', 'menor', 'diminuto', 'aumentado']; break;
    case 'easy': default:
      rootPool = ['C', 'D', 'E', 'F', 'G', 'A', 'B']; typePool = ['Maior', 'menor']; break;
  }
  const randomRoot = rootPool[Math.floor(Math.random() * rootPool.length)];
  const randomType = typePool[Math.floor(Math.random() * typePool.length)];
  const chordNotes = buildChord(randomRoot, randomType);
  const correctAnswer = `${solfejoCompleto[randomRoot]} ${randomType}`;
  const wrongAnswers: Set<string> = new Set();
  while (wrongAnswers.size < 3) {
    const wrongRoot = rootPool[Math.floor(Math.random() * rootPool.length)];
    const wrongType = typePool[Math.floor(Math.random() * typePool.length)];
    const wrongAnswer = `${solfejoCompleto[wrongRoot]} ${wrongType}`;
    if (wrongAnswer !== correctAnswer) {
      wrongAnswers.add(wrongAnswer);
    }
  }
  const options = shuffleArray([correctAnswer, ...Array.from(wrongAnswers)]);
  return {
    type: 'chord',
    questionText: 'Que acorde é este?',
    questionAudio: { startNote: '', endNote: null, notes: chordNotes },
    options,
    correctAnswer,
  };
};

export const generateAbsolutePitchQuestion = (level: 1) => {
  let correctNote: string;
  let correctAnswer: 'Sim' | 'Não';
  if (Math.random() < 0.5) {
    correctNote = 'C';
    correctAnswer = 'Sim';
  } else {
    const otherNotes = chromaticScale.filter(n => n !== 'C');
    correctNote = otherNotes[Math.floor(Math.random() * otherNotes.length)];
    correctAnswer = 'Não';
  }
  return {
    type: 'absolutePitch',
    questionText: 'Esta nota é Dó?',
    questionAudio: { startNote: correctNote, endNote: null, notes: [] as string[] },
    options: ['Sim', 'Não'],
    correctAnswer,
  };
};