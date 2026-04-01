type Track = "invitation" | "main" | null;

let audioCtx: AudioContext | null = null;
let currentTrack: Track = null;
let loopInterval: ReturnType<typeof setInterval> | null = null;
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
  if (loopInterval) {
    clearInterval(loopInterval);
    loopInterval = null;
  }
}

// ── Invitation BGM: bright, festive C-major pentatonic ──
function scheduleInvitation(ctx: AudioContext, dest: GainNode) {
  const melody = [523.25, 659.25, 783.99, 880, 1046.5, 880, 783.99, 659.25];
  const bass =   [261.63, 329.63, 392, 329.63];
  const chime =  [1318.5, 1567.98, 1318.5, 1046.5];
  const noteDur = 0.3;
  const loopLen = melody.length * noteDur;
  let t = ctx.currentTime + 0.05;

  function schedule() {
    for (let i = 0; i < melody.length; i++) {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = melody[i];
      g.gain.setValueAtTime(0, t + i * noteDur);
      g.gain.linearRampToValueAtTime(0.07, t + i * noteDur + 0.04);
      g.gain.exponentialRampToValueAtTime(0.001, t + (i + 1) * noteDur);
      osc.connect(g).connect(dest);
      osc.start(t + i * noteDur);
      osc.stop(t + (i + 1) * noteDur);
    }

    for (let i = 0; i < bass.length; i++) {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = bass[i];
      const bt = t + i * (loopLen / bass.length);
      g.gain.setValueAtTime(0.04, bt);
      g.gain.exponentialRampToValueAtTime(0.001, bt + loopLen / bass.length);
      osc.connect(g).connect(dest);
      osc.start(bt);
      osc.stop(bt + loopLen / bass.length);
    }

    for (let i = 0; i < chime.length; i++) {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = chime[i];
      const ct = t + i * (loopLen / chime.length) + 0.15;
      g.gain.setValueAtTime(0, ct);
      g.gain.linearRampToValueAtTime(0.025, ct + 0.03);
      g.gain.exponentialRampToValueAtTime(0.001, ct + 0.25);
      osc.connect(g).connect(dest);
      osc.start(ct);
      osc.stop(ct + 0.25);
    }

    t += loopLen;
  }

  schedule();
  return setInterval(() => {
    if (ctx.state === "closed") return;
    schedule();
  }, loopLen * 1000 - 150);
}

// ── Main page BGM: calm, exploratory Am pentatonic ──
function scheduleMain(ctx: AudioContext, dest: GainNode) {
  const melody = [440, 523.25, 587.33, 523.25, 440, 392, 349.23, 392];
  const pad =    [220, 261.63, 293.66, 261.63];
  const noteDur = 0.5;
  const loopLen = melody.length * noteDur;
  let t = ctx.currentTime + 0.05;

  function schedule() {
    for (let i = 0; i < melody.length; i++) {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = melody[i];
      g.gain.setValueAtTime(0, t + i * noteDur);
      g.gain.linearRampToValueAtTime(0.05, t + i * noteDur + 0.08);
      g.gain.exponentialRampToValueAtTime(0.001, t + (i + 0.9) * noteDur);
      osc.connect(g).connect(dest);
      osc.start(t + i * noteDur);
      osc.stop(t + (i + 1) * noteDur);
    }

    for (let i = 0; i < pad.length; i++) {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = pad[i];
      const pt = t + i * (loopLen / pad.length);
      g.gain.setValueAtTime(0.03, pt);
      g.gain.linearRampToValueAtTime(0.035, pt + 0.3);
      g.gain.exponentialRampToValueAtTime(0.001, pt + loopLen / pad.length);
      osc.connect(g).connect(dest);
      osc.start(pt);
      osc.stop(pt + loopLen / pad.length);
    }

    // soft high shimmer
    const shimmer = ctx.createOscillator();
    const sg = ctx.createGain();
    shimmer.type = "sine";
    shimmer.frequency.value = 1046.5;
    sg.gain.setValueAtTime(0, t);
    sg.gain.linearRampToValueAtTime(0.015, t + 0.2);
    sg.gain.exponentialRampToValueAtTime(0.001, t + loopLen * 0.8);
    shimmer.connect(sg).connect(dest);
    shimmer.start(t);
    shimmer.stop(t + loopLen);

    t += loopLen;
  }

  schedule();
  return setInterval(() => {
    if (ctx.state === "closed") return;
    schedule();
  }, loopLen * 1000 - 150);
}

// ── Public API ──

export function playTrack(track: Track) {
  if (track === currentTrack) return;
  stopLoop();
  const ctx = getCtx();
  const dest = getMaster();

  if (track === "invitation") {
    loopInterval = scheduleInvitation(ctx, dest);
  } else if (track === "main") {
    loopInterval = scheduleMain(ctx, dest);
  }
  currentTrack = track;
}

export function playClickSound() {
  const ctx = getCtx();
  const dest = getMaster();
  const t = ctx.currentTime;

  const osc1 = ctx.createOscillator();
  const g1 = ctx.createGain();
  osc1.type = "sine";
  osc1.frequency.value = 1318.5;
  g1.gain.setValueAtTime(0.25, t);
  g1.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
  osc1.connect(g1).connect(dest);
  osc1.start(t);
  osc1.stop(t + 0.4);

  const osc2 = ctx.createOscillator();
  const g2 = ctx.createGain();
  osc2.type = "sine";
  osc2.frequency.value = 1975.5;
  g2.gain.setValueAtTime(0.12, t + 0.05);
  g2.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
  osc2.connect(g2).connect(dest);
  osc2.start(t + 0.05);
  osc2.stop(t + 0.35);
}

export function stopAll() {
  stopLoop();
  currentTrack = null;
  if (audioCtx && audioCtx.state !== "closed") {
    audioCtx.close();
    audioCtx = null;
    masterGain = null;
  }
}

export function isPlaying(): boolean {
  return currentTrack !== null;
}
