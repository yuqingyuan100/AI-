type Track = "invitation" | "main" | null;

let audioCtx: AudioContext | null = null;
let currentTrack: Track = null;
let loopTimeout: ReturnType<typeof setTimeout> | null = null;
let masterGain: GainNode | null = null;

function getCtx(): AudioContext {
  if (!audioCtx) {
    const Ctx =
      typeof window !== "undefined"
        ? window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext
        : AudioContext;
    audioCtx = new Ctx();
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

// ── Piano note synthesis with soft timbre ──
function pianoNote(
  ctx: AudioContext,
  dest: AudioNode,
  freq: number,
  time: number,
  dur: number,
  vel: number = 0.07
) {
  const partials = [1, 2, 3];
  const amps = [1, 0.3, 0.08];

  for (let p = 0; p < partials.length; p++) {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq * partials[p];
    const a = vel * amps[p];
    g.gain.setValueAtTime(0, time);
    g.gain.linearRampToValueAtTime(a, time + 0.005);
    g.gain.setValueAtTime(a * 0.85, time + 0.04);
    g.gain.exponentialRampToValueAtTime(0.0001, time + dur + 0.4);
    osc.connect(g).connect(dest);
    osc.start(time);
    osc.stop(time + dur + 0.45);
  }
}

function pianoChord(
  ctx: AudioContext,
  dest: AudioNode,
  freqs: number[],
  time: number,
  dur: number,
  vel: number = 0.03
) {
  for (let i = 0; i < freqs.length; i++) {
    pianoNote(ctx, dest, freqs[i], time + i * 0.015, dur, vel);
  }
}

// ── Note frequencies ──
const C3 = 130.81, D3 = 146.83, E3 = 164.81, F3 = 174.61, G3 = 196.0, A3 = 220.0, B3 = 246.94;
const C4 = 261.63, D4 = 293.66, E4 = 329.63, F4 = 349.23, G4 = 392.0, A4 = 440.0, B4 = 493.88;
const Cs5 = 554.37, D5 = 587.33, E5 = 659.25, Fs4 = 369.99, Fs5 = 739.99;

type N = [number, number, number]; // [freq, startBeat, durBeats]

// ═════════════════════════════════════════
// Ode to Joy (欢乐颂) — Beethoven — C major
// Invitation page: bright, festive
// ═════════════════════════════════════════
const ODE_BPM = 100;
const ODE_BEAT = 60 / ODE_BPM;

const odeMelody: N[] = [
  // Phrase 1: E E F G | G F E D
  [E4, 0, 1], [E4, 1, 1], [F4, 2, 1], [G4, 3, 1],
  [G4, 4, 1], [F4, 5, 1], [E4, 6, 1], [D4, 7, 1],
  // Phrase 2: C C D E | E. D D
  [C4, 8, 1], [C4, 9, 1], [D4, 10, 1], [E4, 11, 1],
  [E4, 12, 1.5], [D4, 13.5, 0.5], [D4, 14, 2],
  // Phrase 3 (repeat 1): E E F G | G F E D
  [E4, 16, 1], [E4, 17, 1], [F4, 18, 1], [G4, 19, 1],
  [G4, 20, 1], [F4, 21, 1], [E4, 22, 1], [D4, 23, 1],
  // Phrase 4: C C D E | D. C C
  [C4, 24, 1], [C4, 25, 1], [D4, 26, 1], [E4, 27, 1],
  [D4, 28, 1.5], [C4, 29.5, 0.5], [C4, 30, 2],

  // B section: D D E C | D E. F. E C
  [D4, 32, 1], [D4, 33, 1], [E4, 34, 1], [C4, 35, 1],
  [D4, 36, 1], [E4, 37, 0.5], [F4, 37.5, 0.5], [E4, 38, 1], [C4, 39, 1],
  // D E. F. E D | C D G3
  [D4, 40, 1], [E4, 41, 0.5], [F4, 41.5, 0.5], [E4, 42, 1], [D4, 43, 1],
  [C4, 44, 1], [D4, 45, 1], [G3, 46, 2],

  // Final reprise: E E F G | G F E D
  [E4, 48, 1], [E4, 49, 1], [F4, 50, 1], [G4, 51, 1],
  [G4, 52, 1], [F4, 53, 1], [E4, 54, 1], [D4, 55, 1],
  // C C D E | D. C C (held)
  [C4, 56, 1], [C4, 57, 1], [D4, 58, 1], [E4, 59, 1],
  [D4, 60, 1.5], [C4, 61.5, 0.5], [C4, 62, 2],
];

const odeChords: [number[], number, number][] = [
  [[C3, G3], 0, 4], [[G3, D4], 4, 4],
  [[A3, E4], 8, 4], [[G3, D4], 12, 4],
  [[C3, G3], 16, 4], [[G3, D4], 20, 4],
  [[A3, E4], 24, 4], [[G3, C4], 28, 4],
  [[G3, D4], 32, 4], [[C3, G3], 36, 4],
  [[G3, D4], 40, 4], [[C3, G3], 44, 4],
  [[C3, G3], 48, 4], [[G3, D4], 52, 4],
  [[A3, E4], 56, 4], [[G3, C4], 60, 4],
];

function scheduleOdeToJoy(ctx: AudioContext, dest: GainNode) {
  const t0 = ctx.currentTime + 0.15;
  for (const [freq, beat, dur] of odeMelody) {
    pianoNote(ctx, dest, freq, t0 + beat * ODE_BEAT, dur * ODE_BEAT, 0.06);
  }
  for (const [freqs, beat, dur] of odeChords) {
    pianoChord(ctx, dest, freqs, t0 + beat * ODE_BEAT, dur * ODE_BEAT, 0.025);
  }
  return 64 * ODE_BEAT; // ~38 seconds
}

// ═════════════════════════════════════════
// Canon in D (卡农) — Pachelbel — D major
// Main page: gentle, contemplative
// ═════════════════════════════════════════
const CANON_BPM = 60;
const CANON_BEAT = 60 / CANON_BPM;

// D3=146.83 A2=110 Bm:B2=123.47 F#m:F#2=92.50 G2=98 D3 G2 A2
const A2 = 110, B2 = 123.47, Fs2 = 92.5, G2 = 98;
const Fs3 = 185;

const canonMelody: N[] = [
  // First pass: slow, majestic
  [Fs5, 0, 2], [E5, 2, 2], [D5, 4, 2], [Cs5, 6, 2],
  [B4, 8, 2], [A4, 10, 2], [B4, 12, 2], [Cs5, 14, 2],

  // Second pass: flowing eighth notes
  [D5, 16, 1], [Cs5, 17, 1], [D5, 18, 1], [Fs5, 19, 1],
  [A4, 20, 1], [B4, 21, 1], [Fs4, 22, 1], [A4, 23, 1],
  [G4, 24, 1], [Fs4, 25, 1], [G4, 26, 1], [E4, 27, 1],
  [D4, 28, 1], [E4, 29, 1], [D4, 30, 1], [Cs5, 31, 1],

  // Third pass: building melody
  [D5, 32, 1.5], [E5, 33.5, 0.5], [Fs5, 34, 1], [E5, 35, 1],
  [D5, 36, 1], [Cs5, 37, 1], [B4, 38, 1], [A4, 39, 1],
  [G4, 40, 1], [A4, 41, 1], [B4, 42, 1], [A4, 43, 1],
  [G4, 44, 1], [Fs4, 45, 1], [E4, 46, 1], [Fs4, 47, 1],

  // Gentle ending
  [D5, 48, 2], [A4, 50, 1], [D5, 51, 1],
  [Fs5, 52, 2], [D5, 54, 2],
  [D4, 56, 4],
];

const canonChords: [number[], number, number][] = [
  [[D3, A3], 0, 4], [[A2, E3], 4, 4],
  [[B2, Fs3], 8, 4], [[Fs2, Cs5 / 4], 12, 4],
  [[G2, D3], 16, 4], [[D3, A3], 20, 4],
  [[G2, D3], 24, 4], [[A2, E3], 28, 4],
  [[D3, A3], 32, 4], [[A2, E3], 36, 4],
  [[B2, Fs3], 40, 4], [[Fs2, Cs5 / 4], 44, 4],
  [[G2, D3], 48, 4], [[D3, A3], 52, 4],
  [[D3, Fs3, A3], 56, 4],
];

function scheduleCanon(ctx: AudioContext, dest: GainNode) {
  const t0 = ctx.currentTime + 0.15;
  for (const [freq, beat, dur] of canonMelody) {
    pianoNote(ctx, dest, freq, t0 + beat * CANON_BEAT, dur * CANON_BEAT, 0.045);
  }
  for (const [freqs, beat, dur] of canonChords) {
    pianoChord(ctx, dest, freqs, t0 + beat * CANON_BEAT, dur * CANON_BEAT, 0.02);
  }
  return 60 * CANON_BEAT; // 60 seconds
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
    autoStartBound = false;
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
    const dur = track === "invitation" ? scheduleOdeToJoy(ctx, dest) : scheduleCanon(ctx, dest);
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
  try {
    const ctx = getCtx();
    const dest = getMaster();
    const t = ctx.currentTime;
    pianoNote(ctx, dest, 1318.5, t, 0.3, 0.13);
    pianoNote(ctx, dest, 1975.5, t + 0.04, 0.25, 0.07);
  } catch { /* silent fail */ }
}

export function playSliderTick() {
  try {
    const ctx = getCtx();
    if (ctx.state === "suspended") ctx.resume();
    const dest = getMaster();
    const t = ctx.currentTime;
    pianoNote(ctx, dest, 880, t, 0.15, 0.12);
    pianoNote(ctx, dest, 1318.5, t + 0.02, 0.12, 0.06);
  } catch { /* silent fail */ }
}

export function playRankChange() {
  try {
    const ctx = getCtx();
    const dest = getMaster();
    const t = ctx.currentTime;
    pianoNote(ctx, dest, E5, t, 0.2, 0.1);
    pianoNote(ctx, dest, A4 * 2, t + 0.1, 0.2, 0.1);
    pianoNote(ctx, dest, Cs5 * 2, t + 0.2, 0.35, 0.12);
  } catch { /* silent fail */ }
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
