// src/services/audioService.ts

import * as Tone from 'tone';
import { Part } from 'tone';
import type { GameSpeed } from '../types';

const pianoSampler = new Tone.Sampler({
  urls: { A0: "A0.mp3", C1: "C1.mp3", "D#1": "Ds1.mp3", "F#1": "Fs1.mp3", A1: "A1.mp3", C2: "C2.mp3", "D#2": "Ds2.mp3", "F#2": "Fs2.mp3", A2: "A2.mp3", C3: "C3.mp3", "D#3": "Ds3.mp3", "F#3": "Fs3.mp3", A3: "A3.mp3", C4: "C4.mp3", "D#4": "Ds4.mp3", "F#4": "Fs4.mp3", A4: "A4.mp3", C5: "C5.mp3", "D#5": "Ds5.mp3", "F#5": "Fs5.mp3", A5: "A5.mp3", C6: "C6.mp3", "D#6": "Ds6.mp3", "F#6": "Fs6.mp3", A6: "A6.mp3", C7: "C7.mp3", "D#7": "Ds7.mp3", "F#7": "Fs7.mp3", A7: "A7.mp3", C8: "C8.mp3" },
  baseUrl: "https://tonejs.github.io/audio/salamander/",
  onload: () => { console.log('Piano carregado com sucesso!'); }
}).toDestination();

export const isPianoReady = () => pianoSampler.loaded;

export const startAudioContext = async () => {
  if (Tone.context.state !== 'running') { await Tone.start(); }
};

const getToneNote = (note: string) => {
  let cleanNote = note.split(' ')[0].replace('♯', '#').replace('♭', 'b');
  if (/\d/.test(cleanNote)) { return cleanNote; } 
  else { return `${cleanNote}4`; }
};

export const playNote = async (note: string) => {
  await startAudioContext();
  pianoSampler.triggerAttackRelease(getToneNote(note), 1.2, Tone.now());
};

export const playInterval = async (startNote: string, endNote: string | null, gameSpeed: GameSpeed) => {
  await startAudioContext();
  let duration = 0.5, spacing = 0.6;
  switch(gameSpeed) {
    case 'beginner': duration = 0.8; spacing = 0.9; break;
    case 'fast': duration = 0.3; spacing = 0.4; break;
    case 'normal': default: break;
  }
  const now = Tone.now();
  pianoSampler.triggerAttackRelease(getToneNote(startNote), duration, now);
  if (endNote) {
    pianoSampler.triggerAttackRelease(getToneNote(endNote), duration, now + spacing);
  }
};

export const playChord = async (notes: string[]) => {
  await startAudioContext();
  const notesWithOctave = notes.map(getToneNote);
  pianoSampler.triggerAttackRelease(notesWithOctave, 1.2, Tone.now());
};

export const playScale = async (notes: string[]) => {
  await startAudioContext();
  const now = Tone.now();
  
  let currentOctave = 4;
  let lastMidi = 0;

  const scheduledNotes = notes.map(noteName => {
    const currentMidi = Tone.Frequency(getToneNote(noteName)).toMidi();
    if (currentMidi < lastMidi) {
      currentOctave++;
    }
    lastMidi = currentMidi;
    return `${noteName.replace(/♯/g, '#').replace(/♭/g, 'b')}${currentOctave}`;
  });

  scheduledNotes.forEach((note, index) => {
    pianoSampler.triggerAttackRelease(note, "8n", now + index * 0.3);
  });
};

// --- FUNÇÃO MODIFICADA ---
export const playRiff = async (sequence: { time: string, note: string | string[], duration: string }[], gameSpeed: GameSpeed) => {
  await startAudioContext();
  
  // 1. Define o BPM (tempo) da música com base na velocidade do jogo
  switch(gameSpeed) {
    case 'beginner':
      Tone.Transport.bpm.value = 85;
      break;
    case 'fast':
      Tone.Transport.bpm.value = 120;
      break;
    case 'normal':
    default:
      Tone.Transport.bpm.value = 100;
      break;
  }

  // 2. Limpa completamente qualquer coisa que estava agendada antes
  Tone.Transport.cancel(0);
  Tone.Transport.stop();
  
  // Cria a "partitura" do riff
  const part = new Part((time, value) => {
    pianoSampler.triggerAttackRelease(value.note, value.duration, time);
  }, sequence).start(0);

  // 3. Garante que o riff não entre em loop
  part.loop = false;

  // 4. Inicia a música
  Tone.Transport.start();

  // 5. CORREÇÃO: Agenda a parada da música após um tempo seguro (ex: 8 segundos)
  // Isso evita que o "player" continue rodando indefinidamente.
  Tone.Transport.scheduleOnce(() => {
    Tone.Transport.stop();
  }, "+8"); // "+8" significa "daqui a 8 segundos"
};