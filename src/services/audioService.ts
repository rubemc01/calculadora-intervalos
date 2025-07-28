// src/services/audioService.ts

import * as Tone from 'tone';

// --- MUDANÇA 1: Configuração do Sampler de Piano ---
// Cria o nosso "player" de piano
const pianoSampler = new Tone.Sampler({
  // Um mapa com as notas e os arquivos de áudio correspondentes
  urls: {
    A0: "A0.mp3", C1: "C1.mp3", "D#1": "Ds1.mp3", "F#1": "Fs1.mp3", A1: "A1.mp3", C2: "C2.mp3", "D#2": "Ds2.mp3", "F#2": "Fs2.mp3", A2: "A2.mp3", C3: "C3.mp3", "D#3": "Ds3.mp3", "F#3": "Fs3.mp3", A3: "A3.mp3", C4: "C4.mp3", "D#4": "Ds4.mp3", "F#4": "Fs4.mp3", A4: "A4.mp3", C5: "C5.mp3", "D#5": "Ds5.mp3", "F#5": "Fs5.mp3", A5: "A5.mp3", C6: "C6.mp3", "D#6": "Ds6.mp3", "F#6": "Fs6.mp3", A6: "A6.mp3", C7: "C7.mp3", "D#7": "Ds7.mp3", "F#7": "Fs7.mp3", A7: "A7.mp3", C8: "C8.mp3"
  },
  // O caminho base para todos os arquivos de áudio acima
  baseUrl: "https://tonejs.github.io/audio/salamander/",
  // Função a ser chamada quando todos os sons forem carregados
  onload: () => {
    console.log('Piano carregado com sucesso!');
  }
}).toDestination();

// Função para saber quando o piano está pronto
export const isPianoReady = () => pianoSampler.loaded;

// --- O resto das nossas funções agora usam o 'pianoSampler' ---
export const startAudioContext = async () => {
  if (Tone.context.state !== 'running') {
    await Tone.start();
  }
};

const getToneNote = (note: string) => {
  let cleanNote = note.split(' ')[0].replace('♯', '#').replace('♭', 'b');
  if (/\d/.test(cleanNote)) {
    return cleanNote;
  } else {
    return `${cleanNote}4`;
  }
};

export const playNote = async (note: string) => {
  await startAudioContext();
  const now = Tone.now();
  pianoSampler.triggerAttackRelease(getToneNote(note), '1s', now);
};

export const playInterval = async (startNote: string, endNote: string | null) => {
  await startAudioContext();
  const now = Tone.now();
  pianoSampler.triggerAttackRelease(getToneNote(startNote), '8n', now);
  if (endNote) {
    pianoSampler.triggerAttackRelease(getToneNote(endNote), '8n', now + 0.5);
  }
};

export const playChord = async (notes: string[]) => {
  await startAudioContext();
  const now = Tone.now();
  const notesWithOctave = notes.map(getToneNote);
  pianoSampler.triggerAttackRelease(notesWithOctave, '1.5s', now);
};