type Track = "invitation" | "main" | null;

let audioCtx: AudioContext | null = null;
let currentTrack: Track = null;
let loopTimeout: ReturnType<typeof setTimeout> | null = null;
let masterGain: GainNode | null = null;

function getCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 1;
    masterGain.connect(audioCtx.destination);
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

function getMaster(): GainNode {
  getCtx();
  return masterGain!;
}

function stopLoop() {
  if (loopTimeout) {
    clearTimeout(loopTimeout);
    loopTimeout = null;
  }
}

// ── Piano note synthesis ──
function pianoNote(
  ctx: AudioContext,
  dest: AudioNode,
  freq: number,
  time: number,
  dur: number,
  vel: number = 0.07
) {
  const partials = [1, 2, 3, 4];
  const amps = [1, 0.35, 0.12, 0.04];

  for (let p = 0; p < partials.length; p++) {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq * partials[p];
    const a = vel * amps[p];
    g.gain.setValueAtTime(0, time);
    g.gain.linearRampToValueAtTime(a, time + 0.008);
    g.gain.setValueAtTime(a * 0.9, time + 0.05);
    g.gain.exponentialRampToValueAtTime(0.0001, time + dur + 0.3);
    osc.connect(g).connect(dest);
    osc.start(time);
    osc.stop(time + dur + 0.35);
  }
}

function pianoChord(
  ctx: AudioContext,
  dest: AudioNode,
  freqs: number[],
  time: number,
  dur: number,
  vel: number = 0.035
) {
  for (let i = 0; i < freqs.length; i++) {
    pianoNote(ctx, dest, freqs[i], time + i * 0.02, dur, vel);
  }
}

// ── Jay Chou "Sunny Day" (晴天) melody in G major ──
// G3=196, A3=220, B3=246.94, C4=261.63, D4=293.66, E4=329.63, F#4=369.99
// G4=392, A4=440, B4=493.88, C5=523.25, D5=587.33, E5=659.25, F#5=739.99, G5=783.99

const G3 = 196, A3 = 220, B3 = 246.94, C4 = 261.63, D4 = 293.66, E4 = 329.63;
const Fs4 = 369.99, G4 = 392, A4 = 440, B4 = 493.88, C5 = 523.25, D5 = 587.33;
const E5 = 659.25, Fs5 = 739.99, G5 = 783.99;
const D3 = 146.83, E3 = 164.81, Fs3 = 185, C3 = 130.81;

// Chords: I(G) - V(D) - vi(Em) - IV(C)
const chordG = [G3, B3, D4];
const chordD = [D3, Fs3, A3];
const chordEm = [E3, G3, B3];
const chordC = [C3, E3, G4 / 2]; // G3

const BPM = 72;
const BEAT = 60 / BPM; // ~0.833s
const E8 = BEAT / 2;   // eighth note

type NoteEvent = [number, number, number]; // [freq, startBeat, durBeats]

// Verse melody: 故事的小黄花 从出生那年就飘着
const verseMelody: NoteEvent[] = [
  [B4, 0, 0.5], [B4, 0.5, 0.5], [B4, 1, 0.5], [B4, 1.5, 0.5],
  [A4, 2, 0.5], [B4, 2.5, 0.5], [D5, 3, 1], [B4, 4, 0.5],
  [B4, 4.5, 0.5], [B4, 5, 0.5], [B4, 5.5, 0.5], [A4, 6, 0.5],
  [G4, 6.5, 1.5],
  // 童年的荡秋千 随记忆一直晃到现在
  [B4, 8, 0.5], [B4, 8.5, 0.5], [B4, 9, 0.5], [B4, 9.5, 0.5],
  [C5, 10, 0.5], [B4, 10.5, 0.5], [A4, 11, 1],
  [G4, 12, 0.5], [G4, 12.5, 0.5], [A4, 13, 0.5], [B4, 13.5, 1.5],
];

// Pre-chorus: 吹着前奏 望着天空
const preChorusMelody: NoteEvent[] = [
  [D5, 0, 0.5], [D5, 0.5, 0.5], [D5, 1, 0.5], [D5, 1.5, 0.5],
  [E5, 2, 0.5], [D5, 2.5, 0.5], [B4, 3, 1],
  [D5, 4, 0.5], [D5, 4.5, 0.5], [D5, 5, 0.5], [D5, 5.5, 0.5],
  [E5, 6, 0.5], [D5, 6.5, 1.5],
];

// Chorus: 刮风这天 我试过握着你手
const chorusMelody: NoteEvent[] = [
  [G5, 0, 0.5], [G5, 0.5, 0.5], [Fs5, 1, 0.5], [E5, 1.5, 0.5],
  [D5, 2, 1], [E5, 3, 0.5], [E5, 3.5, 0.5],
  [D5, 4, 0.5], [B4, 4.5, 0.5], [A4, 5, 1],
  [B4, 6, 0.5], [B4, 6.5, 0.5], [D5, 7, 0.5], [B4, 7.5, 0.5],
  [A4, 8, 0.5], [G4, 8.5, 1.5],
  // 但偏偏 雨渐渐 大到我看你不见
  [G5, 10, 0.5], [G5, 10.5, 0.5], [Fs5, 11, 0.5], [E5, 11.5, 0.5],
  [D5, 12, 1], [E5, 13, 0.5], [E5, 13.5, 0.5],
  [D5, 14, 0.5], [B4, 14.5, 0.5], [A4, 15, 1],
  [G4, 16, 2],
];

// Chord progression for each section
type ChordEvent = [number[], number, number]; // [freqs, startBeat, durBeats]

function makeChords(startBeat: number, bars: number): ChordEvent[] {
  const prog = [chordG, chordD, chordEm, chordC];
  const result: ChordEvent[] = [];
  for (let i = 0; i < bars; i++) {
    result.push([prog[i % 4], startBeat + i * 4, 4]);
  }
  return result;
}

function scheduleSunnyDay(ctx: AudioContext, dest: GainNode, isMain: boolean) {
  const t0 = ctx.currentTime + 0.1;
  const melodyVel = isMain ? 0.055 : 0.065;
  const chordVel = isMain ? 0.025 : 0.03;

  // Section 1: Verse (16 beats = 4 bars)
  const verseStart = 0;
  for (const [freq, beat, dur] of verseMelody) {
    pianoNote(ctx, dest, freq, t0 + (verseStart + beat) * BEAT, dur * BEAT, melodyVel);
  }
  for (const [freqs, beat, dur] of makeChords(verseStart, 4)) {
    pianoChord(ctx, dest, freqs, t0 + beat * BEAT, dur * BEAT, chordVel);
  }

  // Small pause (1 beat)
  const preStart = 16;
  // Section 2: Pre-chorus (8 beats = 2 bars)
  for (const [freq, beat, dur] of preChorusMelody) {
    pianoNote(ctx, dest, freq, t0 + (preStart + beat) * BEAT, dur * BEAT, melodyVel);
  }
  for (const [freqs, beat, dur] of makeChords(preStart, 2)) {
    pianoChord(ctx, dest, freqs, t0 + beat * BEAT, dur * BEAT, chordVel);
  }

  // Section 3: Chorus (18 beats ≈ 4.5 bars)
  const chorusStart = 24;
  const octaveShift = isMain ? 1 : 0.5; // main page plays chorus lower
  for (const [freq, beat, dur] of chorusMelody) {
    pianoNote(ctx, dest, freq * octaveShift, t0 + (chorusStart + beat) * BEAT, dur * BEAT, melodyVel * 1.1);
  }
  for (const [freqs, beat, dur] of makeChords(chorusStart, 5)) {
    pianoChord(ctx, dest, freqs, t0 + beat * BEAT, dur * BEAT, chordVel);
  }

  // Outro - gentle arpeggio (4 beats)
  const outroStart = 44;
  const outroNotes: NoteEvent[] = [
    [G4, 0, 1], [B4, 0.5, 1], [D5, 1, 1], [G5, 1.5, 2],
  ];
  for (const [freq, beat, dur] of outroNotes) {
    pianoNote(ctx, dest, freq, t0 + (outroStart + beat) * BEAT, dur * BEAT, melodyVel * 0.7);
  }
  pianoChord(ctx, dest, chordG, t0 + outroStart * BEAT, 4 * BEAT, chordVel * 0.8);

  const totalBeats = 48;
  const totalDuration = totalBeats * BEAT; // ~40 seconds
  return totalDuration;
}

// ── Auto-start on first interaction ──
let pendingTrack: Track = null;
let autoStartBound = false;

function bindAutoStart() {
  if (autoStartBound || typeof window === "undefined") return;
  autoStartBound = true;
  const events = ["mousemove", "mousedown", "touchstart", "scroll", "keydown"];
  const handler = () => {
    if (pendingTrack) {
      playTrackImmediate(pendingTrack);
      pendingTrack = null;
    }
    events.forEach((e) => window.removeEventListener(e, handler, { capture: true }));
  };
  events.forEach((e) =>
    window.addEventListener(e, handler, { capture: true, once: false, passive: true })
  );
}

function playTrackImmediate(track: Track) {
  if (track === currentTrack) return;
  stopLoop();
  const ctx = getCtx();
  const dest = getMaster();
  currentTrack = track;

  function loop() {
    if (ctx.state === "closed" || currentTrack !== track) return;
    const dur = scheduleSunnyDay(ctx, dest, track === "main");
    loopTimeout = setTimeout(loop, dur * 1000 - 500);
  }
  loop();
}

// ── Public API ──

export function playTrack(track: Track) {
  try {
    const ctx = getCtx();
    if (ctx.state === "suspended") {
      pendingTrack = track;
      bindAutoStart();
      return;
    }
  } catch {
    pendingTrack = track;
    bindAutoStart();
    return;
  }
  playTrackImmediate(track);
}

export function playClickSound() {
  const ctx = getCtx();
  const dest = getMaster();
  const t = ctx.currentTime;

  pianoNote(ctx, dest, 1318.5, t, 0.3, 0.15);
  pianoNote(ctx, dest, 1975.5, t + 0.04, 0.25, 0.08);
}

export function playSliderTick() {
  const ctx = getCtx();
  const dest = getMaster();
  const t = ctx.currentTime;

  pianoNote(ctx, dest, G5, t, 0.08, 0.04);
}

export function playRankChange() {
  const ctx = getCtx();
  const dest = getMaster();
  const t = ctx.currentTime;

  pianoNote(ctx, dest, E5, t, 0.15, 0.06);
  pianoNote(ctx, dest, G5, t + 0.08, 0.15, 0.06);
  pianoNote(ctx, dest, G5 * 1.2599, t + 0.16, 0.25, 0.08); // B5
}

export function stopAll() {
  stopLoop();
  currentTrack = null;
  pendingTrack = null;
  if (audioCtx && audioCtx.state !== "closed") {
    audioCtx.close();
    audioCtx = null;
    masterGain = null;
  }
}

export function isPlaying(): boolean {
  return currentTrack !== null;
}
