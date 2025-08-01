// src/data/riffsData.ts
import type { RiffQuestion } from '../types';

export const riffsData: RiffQuestion[] = [
  // --- Riffs de Rock ---
  {
    id: 1,
    songTitle: "Smoke on the Water",
    artist: "Deep Purple",
    options: ["Paranoid - Black Sabbath", "Back in Black - AC/DC", "Stairway to Heaven - Led Zeppelin"],
    sequence: [
      { time: "0:0:0", note: "G3", duration: "8n" }, { time: "0:0:2", note: "Bb3", duration: "8n" },
      { time: "0:1:0", note: "C4", duration: "4n" }, { time: "0:2:0", note: "G3", duration: "8n" },
      { time: "0:2:2", note: "Bb3", duration: "8n" }, { time: "0:3:0", note: "Db4", duration: "4n" },
      { time: "0:3:2", note: "C4", duration: "4n" },
    ]
  },
  {
    id: 2,
    songTitle: "(I Can't Get No) Satisfaction",
    artist: "The Rolling Stones",
    options: ["Come As You Are - Nirvana", "Day Tripper - The Beatles", "Another One Bites the Dust - Queen"],
    sequence: [
      { time: "0:0:0", note: "B3", duration: "16n" }, { time: "0:0:1", note: "B3", duration: "16n" },
      { time: "0:0:2", note: "B3", duration: "8n" }, { time: "0:1:0", note: "C#4", duration: "8n" },
      { time: "0:1:2", note: "C#4", duration: "8n" }, { time: "0:2:0", note: "D4", duration: "4n" },
    ]
  },
  {
    id: 3,
    songTitle: "Seven Nation Army",
    artist: "The White Stripes",
    options: ["Crazy Train - Ozzy Osbourne", "Beat It - Michael Jackson", "Billie Jean - Michael Jackson"],
    sequence: [
        { time: "0:0", note: "E3", duration: "4n." }, { time: "0:1:2", note: "E3", duration: "8n" },
        { time: "0:2", note: "G3", duration: "8n" }, { time: "0:2:2", note: "E3", duration: "8n" },
        { time: "0:3", note: "D3", duration: "8n" }, { time: "0:3:2", note: "C3", duration: "2n" },
    ]
  },
  {
    id: 8,
    songTitle: "Iron Man",
    artist: "Black Sabbath",
    options: ["War Pigs - Black Sabbath", "Whole Lotta Love - Led Zeppelin", "Sunshine of Your Love - Cream"],
    sequence: [
        { time: "0:0", note: "B2", duration: "4n" }, { time: "0:1", note: "D3", duration: "8n" },
        { time: "0:1:2", note: "D3", duration: "8n" }, { time: "0:2", note: "E3", duration: "8n" },
        { time: "0:2:2", note: "E3", duration: "8n" }, { time: "0:3", note: "G3", duration: "8n" },
        { time: "0:3:2", note: "F#3", duration: "8n" },
    ]
  },
  {
    id: 11,
    songTitle: "Sweet Child o' Mine",
    artist: "Guns N' Roses",
    options: ["Livin' on a Prayer - Bon Jovi", "Every Breath You Take - The Police", "Hotel California - Eagles"],
    sequence: [
        { time: "0:0", note: "D#5", duration: "8n" }, { time: "0:0:2", note: "G#4", duration: "8n" },
        { time: "0:1", note: "C#5", duration: "8n" }, { time: "0:1:2", note: "G#4", duration: "8n" },
        { time: "0:2", note: "B4", duration: "8n" }, { time: "0:2:2", note: "G#4", duration: "8n" },
        { time: "0:3", note: "C#5", duration: "8n" }, { time: "0:3:2", note: "G#4", duration: "8n" },
    ]
  },
  {
    id: 14,
    songTitle: "Come As You Are",
    artist: "Nirvana",
    options: ["Smells Like Teen Spirit - Nirvana", "Black Hole Sun - Soundgarden", "Enter Sandman - Metallica"],
    sequence: [
        { time: "0:0", note: "E3", duration: "8n" }, { time: "0:0:2", note: "F#3", duration: "8n" },
        { time: "0:1", note: "G3", duration: "8n" }, { time: "0:1:2", note: "F#3", duration: "8n" },
        { time: "0:2", note: "E3", duration: "8n" }, { time: "0:2:2", note: "G3", duration: "8n" },
        { time: "0:3", note: "A3", duration: "4n" },
    ]
  },
  {
    id: 15,
    songTitle: "Sunshine of Your Love",
    artist: "Cream",
    options: ["Purple Haze - Jimi Hendrix", "Light My Fire - The Doors", "White Room - Cream"],
    sequence: [
        { time: "0:0", note: "D4", duration: "8n" }, { time: "0:0:2", note: "D4", duration: "8n" },
        { time: "0:1", note: "C4", duration: "8n" }, { time: "0:1:2", note: "D4", duration: "8n" },
        { time: "0:2", note: "A#3", duration: "4n" }, { time: "0:3", note: "G3", duration: "4n" },
    ]
  },
  {
    id: 16,
    songTitle: "Back in Black",
    artist: "AC/DC",
    options: ["Highway to Hell - AC/DC", "You Shook Me All Night Long - AC/DC", "Welcome to the Jungle - Guns N' Roses"],
    sequence: [
        { time: "0:0", note: "E4", duration: "8n" }, { time: "0:0:2", note: "G4", duration: "8n" },
        { time: "0:1", note: "A4", duration: "8n" }, { time: "0:1:2", note: "G4", duration: "8n" },
        { time: "0:2", note: "A4", duration: "8n" }, { time: "0:2:2", note: "B4", duration: "8n" },
        { time: "0:3", note: "A4", duration: "8n" },
    ]
  },
  {
    id: 17,
    songTitle: "Another One Bites the Dust",
    artist: "Queen",
    options: ["Under Pressure - Queen & David Bowie", "Don't Stop Me Now - Queen", "Good Times - Chic"],
    sequence: [
        { time: "0:0", note: "E3", duration: "8n" }, { time: "0:1", note: "G3", duration: "8n" },
        { time: "0:1:2", note: "E3", duration: "8n" }, { time: "0:2", note: "A3", duration: "8n" },
        { time: "0:2:2", note: "G3", duration: "8n" }, { time: "0:3", note: "E3", duration: "8n" },
    ]
  },
  {
    id: 18,
    songTitle: "Day Tripper",
    artist: "The Beatles",
    options: ["Come Together - The Beatles", "I Feel Fine - The Beatles", "You Really Got Me - The Kinks"],
    sequence: [
        { time: "0:0", note: "E3", duration: "8n" }, { time: "0:0:2", note: "G3", duration: "8n" },
        { time: "0:1", note: "A3", duration: "8n" }, { time: "0:1:2", note: "B3", duration: "8n" },
        { time: "0:2", note: "C#4", duration: "8n" }, { time: "0:2:2", note: "B3", duration: "8n" },
        { time: "0:3", note: "A3", duration: "8n" }, { time: "0:3:2", note: "G3", duration: "8n" },
    ]
  },

  // --- Riffs de Blues ---
  {
    id: 4,
    songTitle: "Mannish Boy",
    artist: "Muddy Waters",
    options: ["Smokestack Lightnin' - Howlin' Wolf", "I'm a Man - Bo Diddley", "Boom Boom - John Lee Hooker"],
    sequence: [ { time: "0:0", note: "A3", duration: "2n." } ]
  },
  {
    id: 5,
    songTitle: "Sweet Home Chicago",
    artist: "Robert Johnson",
    options: ["Cross Road Blues - Robert Johnson", "Dust My Broom - Elmore James", "I Can't Quit You Baby - Otis Rush"],
    sequence: [
      { time: "0:0", note: "B4", duration: "8n" }, { time: "0:0:2", note: "B4", duration: "8n" },
      { time: "0:1", note: "G#4", duration: "8n" }, { time: "0:1:2", note: "G#4", duration: "8n" },
      { time: "0:2", note: "E4", duration: "8n" }, { time: "0:2:2", note: "E4", duration: "8n" },
      { time: "0:3", note: "B3", duration: "4n" },
    ]
  },
  {
    id: 9,
    songTitle: "The Thrill Is Gone",
    artist: "B.B. King",
    options: ["Stormy Monday - T-Bone Walker", "Red House - Jimi Hendrix", "Pride and Joy - Stevie Ray Vaughan"],
    sequence: [
        { time: "0:0", note: "B4", duration: "2n." }, { time: "0:3", note: "F#5", duration: "8n" },
        { time: "0:3:2", note: "E5", duration: "8n" }, { time: "1:0", note: "D5", duration: "4n" },
    ]
  },
  {
    id: 12,
    songTitle: "Hoochie Coochie Man",
    artist: "Muddy Waters",
    options: ["I'm a Man - Bo Diddley", "Spoonful - Willie Dixon", "Little Red Rooster - Howlin' Wolf"],
    sequence: [
        { time: "0:0", note: "A2", duration: "2n" }, { time: "0:2", note: "G3", duration: "8n" },
        { time: "0:2:2", note: "C3", duration: "4n" },
    ]
  },
  {
    id: 19,
    songTitle: "Cross Road Blues",
    artist: "Robert Johnson",
    options: ["Kind Hearted Woman Blues - Robert Johnson", "Statesboro Blues - Blind Willie McTell", "Rollin' and Tumblin' - Muddy Waters"],
    sequence: [
        { time: "0:0", note: "A4", duration: "8n" }, { time: "0:0:2", note: "G4", duration: "8n" },
        { time: "0:1", note: "E4", duration: "8n" }, { time: "0:1:2", note: "C4", duration: "8n" },
        { time: "0:2", note: "A3", duration: "4n" },
    ]
  },
  {
    id: 20,
    songTitle: "Boom Boom",
    artist: "John Lee Hooker",
    options: ["One Bourbon, One Scotch, One Beer - John Lee Hooker", "Smokestack Lightnin' - Howlin' Wolf", "I'm a King Bee - Slim Harpo"],
    sequence: [
        { time: "0:0", note: "E3", duration: "8n" }, { time: "0:0:2", note: "G3", duration: "8n" },
        { time: "0:1", note: "A3", duration: "8n" }, { time: "0:1:2", note: "G3", duration: "8n" },
        { time: "0:2", note: "E3", duration: "4n" },
    ]
  },
  
  // --- Riffs de Jazz e Bossa Nova ---
  {
    id: 6,
    songTitle: "Take Five",
    artist: "The Dave Brubeck Quartet",
    options: ["Blue Rondo à la Turk - Dave Brubeck Quartet", "Watermelon Man - Herbie Hancock", "The Girl from Ipanema - Stan Getz & João Gilberto"],
    sequence: [
      { time: "0:0", note: "Eb4", duration: "4n" }, { time: "0:1", note: "Bb4", duration: "4n" },
      { time: "0:2", note: "Eb4", duration: "4n" }, { time: "0:3", note: "Bb4", duration: "4n" },
      { time: "0:4", note: "Eb4", duration: "4n" },
    ]
  },
  {
    id: 7,
    songTitle: "So What",
    artist: "Miles Davis",
    options: ["Freddie Freeloader - Miles Davis", "Giant Steps - John Coltrane", "Song for My Father - Horace Silver"],
    sequence: [
      { time: "0:0", note: ["E4", "G4", "B4", "D5"], duration: "1n" },
      { time: "1:0", note: ["E4", "G4", "B4", "D5"], duration: "1n" },
    ]
  },
  {
    id: 10,
    songTitle: "Cantaloupe Island",
    artist: "Herbie Hancock",
    options: ["Chameleon - Herbie Hancock", "Watermelon Man - Herbie Hancock", "Mr. PC - John Coltrane"],
    sequence: [
        { time: "0:0:2", note: "F3", duration: "8n" }, { time: "0:1", note: "Ab3", duration: "8n" },
        { time: "0:1:2", note: "F3", duration: "8n" }, { time: "0:2", note: "C4", duration: "8n" },
        { time: "0:2:2", note: "Eb4", duration: "8n" },
    ]
  },
  {
    id: 13,
    songTitle: "Garota de Ipanema",
    artist: "Tom Jobim",
    options: ["Chega de Saudade - João Gilberto", "Mas, que Nada! - Jorge Ben Jor", "Águas de Março - Elis Regina & Tom Jobim"],
    sequence: [
        { time: "0:0", note: "F4", duration: "2n" }, { time: "0:2", note: "G4", duration: "4n" },
        { time: "0:3", note: "A4", duration: "4n" }, { time: "1:0", note: "G4", duration: "2n" },
        { time: "1:2", note: "F4", duration: "4n" },
    ]
  },
  {
    id: 21,
    songTitle: "Blue Monk",
    artist: "Thelonious Monk",
    options: ["'Round Midnight - Thelonious Monk", "Straight, No Chaser - Thelonious Monk", "Autumn Leaves - Joseph Kosma"],
    sequence: [
        { time: "0:0", note: "Bb3", duration: "8n" }, { time: "0:0:2", note: "F4", duration: "8n" },
        { time: "0:1", note: "G4", duration: "8n" }, { time: "0:1:2", note: "Ab4", duration: "8n" },
        { time: "0:2", note: "A4", duration: "8n" }, { time: "0:2:2", note: "G4", duration: "8n" },
        { time: "0:3", note: "F4", duration: "8n" }, { time: "0:3:2", note: "Bb3", duration: "8n" },
    ]
  },
  {
    id: 22,
    songTitle: "Freddie Freeloader",
    artist: "Miles Davis",
    options: ["All Blues - Miles Davis", "Blue in Green - Miles Davis", "Naima - John Coltrane"],
    sequence: [
        { time: "0:0", note: "Bb3", duration: "4n" }, { time: "0:1", note: "A3", duration: "4n" },
        { time: "0:2", note: "G3", duration: "4n" }, { time: "0:3", note: "F3", duration: "4n" },
    ]
  },

  // --- Riffs de Funk e Pop ---
  {
    id: 23,
    songTitle: "Billie Jean",
    artist: "Michael Jackson",
    options: ["Beat It - Michael Jackson", "Thriller - Michael Jackson", "Superstition - Stevie Wonder"],
    sequence: [
        { time: "0:0", note: "F#2", duration: "8n" }, { time: "0:0:2", note: "G#2", duration: "8n" },
        { time: "0:1", note: "A#2", duration: "8n" }, { time: "0:1:2", note: "G#2", duration: "8n" },
        { time: "0:2", note: "A#2", duration: "8n" }, { time: "0:2:2", note: "C#3", duration: "8n" },
        { time: "0:3", note: "B2", duration: "8n" }, { time: "0:3:2", note: "G#2", duration: "8n" },
    ]
  },
  {
    id: 24,
    songTitle: "Superstition",
    artist: "Stevie Wonder",
    options: ["I Wish - Stevie Wonder", "Sir Duke - Stevie Wonder", "Get Lucky - Daft Punk"],
    sequence: [
        { time: "0:0", note: "Eb2", duration: "16n" }, { time: "0:0:1", note: "Gb2", duration: "16n" },
        { time: "0:0:2", note: "Ab2", duration: "16n" }, { time: "0:0:3", note: "Gb2", duration: "16n" },
        { time: "0:1", note: "Eb2", duration: "16n" }, { time: "0:1:1", note: "Gb2", duration: "16n" },
        { time: "0:1:2", note: "Ab2", duration: "16n" }, { time: "0:1:3", note: "Gb2", duration: "16n" },
    ]
  },
  {
    id: 25,
    songTitle: "Crazy Little Thing Called Love",
    artist: "Queen",
    options: ["Bohemian Rhapsody - Queen", "Jailhouse Rock - Elvis Presley", "Great Balls of Fire - Jerry Lee Lewis"],
    sequence: [
        { time: "0:0", note: "D3", duration: "8n" }, { time: "0:0:2", note: "G3", duration: "8n" },
        { time: "0:1", note: "G3", duration: "8n" }, { time: "0:1:2", note: "G3", duration: "8n" },
        { time: "0:2", note: "G3", duration: "8n" }, { time: "0:2:2", note: "A3", duration: "8n" },
        { time: "0:3", note: "G3", duration: "8n" },
    ]
  },
  {
    id: 26,
    songTitle: "Beat It",
    artist: "Michael Jackson",
    options: ["Thriller - Michael Jackson", "Eye of the Tiger - Survivor", "Sweet Dreams - Eurythmics"],
    sequence: [
        { time: "0:0", note: "Eb3", duration: "8n" }, { time: "0:0:2", note: "Gb3", duration: "8n" },
        { time: "0:1", note: "Db3", duration: "8n" }, { time: "0:1:2", note: "B2", duration: "8n" },
        { time: "0:2", note: "Ab2", duration: "8n" }, { time: "0:2:2", note: "B2", duration: "8n" },
    ]
  },
  {
    id: 27,
    songTitle: "Get Lucky",
    artist: "Daft Punk",
    options: ["Uptown Funk - Mark Ronson ft. Bruno Mars", "Good Times - Chic", "September - Earth, Wind & Fire"],
    sequence: [
        { time: "0:0", note: "B2", duration: "8n" }, { time: "0:1", note: "D3", duration: "8n" },
        { time: "0:2", note: "F#3", duration: "8n" }, { time: "0:3", note: "A3", duration: "8n" },
    ]
  },
  {
    id: 28,
    songTitle: "Money",
    artist: "Pink Floyd",
    options: ["Another Brick in the Wall, Pt. 2 - Pink Floyd", "Comfortably Numb - Pink Floyd", "Time - Pink Floyd"],
    sequence: [
        { time: "0:0", note: "B2", duration: "4n" }, { time: "0:1", note: "F#3", duration: "4n" },
        { time: "0:2", note: "B2", duration: "4n" }, { time: "0:3", note: "E3", duration: "4n" },
        { time: "1:0", note: "B2", duration: "4n" },
    ]
  },
  {
    id: 29,
    songTitle: "Enter Sandman",
    artist: "Metallica",
    options: ["Master of Puppets - Metallica", "Smells Like Teen Spirit - Nirvana", "Killing in the Name - Rage Against the Machine"],
    sequence: [
        { time: "0:0", note: "E2", duration: "8n" }, { time: "0:0:2", note: "A#2", duration: "8n" },
        { time: "0:1", note: "A2", duration: "4n" },
    ]
  },
  {
    id: 30,
    songTitle: "Under Pressure",
    artist: "Queen & David Bowie",
    options: ["Another One Bites the Dust - Queen", "Let's Dance - David Bowie", "Ice Ice Baby - Vanilla Ice"],
    sequence: [
        { time: "0:0", note: "D4", duration: "4n" }, { time: "0:1", note: "D4", duration: "4n" },
        { time: "0:2", note: "D4", duration: "8n" }, { time: "0:2:2", note: "E4", duration: "8n" },
        { time: "0:3", note: "D4", duration: "4n" }, { time: "1:0", note: "A3", duration: "4n" },
    ]
  },
];