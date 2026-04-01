"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface InvitationPageProps {
  onAccept: () => void;
}

// C-major pentatonic melody loop via Web Audio API
function startBGM(ctx: AudioContext) {
  const notes = [523.25, 587.33, 659.25, 783.99, 880, 783.99, 659.25, 587.33];
  const noteDur = 0.35;
  const loopLen = notes.length * noteDur;
  let startTime = ctx.currentTime + 0.1;

  function scheduleLoop() {
    for (let i = 0; i < notes.length; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = notes[i];
      gain.gain.setValueAtTime(0, startTime + i * noteDur);
      gain.gain.linearRampToValueAtTime(0.08, startTime + i * noteDur + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + (i + 1) * noteDur);
      osc.connect(gain).connect(ctx.destination);
      osc.start(startTime + i * noteDur);
      osc.stop(startTime + (i + 1) * noteDur);
    }

    // sub-bass accompaniment
    const bass = ctx.createOscillator();
    const bassGain = ctx.createGain();
    bass.type = "triangle";
    bass.frequency.value = 261.63;
    bassGain.gain.setValueAtTime(0.04, startTime);
    bassGain.gain.exponentialRampToValueAtTime(0.001, startTime + loopLen);
    bass.connect(bassGain).connect(ctx.destination);
    bass.start(startTime);
    bass.stop(startTime + loopLen);

    startTime += loopLen;
  }

  scheduleLoop();
  const interval = setInterval(() => {
    if (ctx.state === "closed") {
      clearInterval(interval);
      return;
    }
    scheduleLoop();
  }, loopLen * 1000 - 200);

  return interval;
}

function playClickSound(ctx: AudioContext) {
  const t = ctx.currentTime;

  // bright "ding"
  const osc1 = ctx.createOscillator();
  const g1 = ctx.createGain();
  osc1.type = "sine";
  osc1.frequency.value = 1318.5; // E6
  g1.gain.setValueAtTime(0.3, t);
  g1.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
  osc1.connect(g1).connect(ctx.destination);
  osc1.start(t);
  osc1.stop(t + 0.4);

  // harmonic sparkle
  const osc2 = ctx.createOscillator();
  const g2 = ctx.createGain();
  osc2.type = "sine";
  osc2.frequency.value = 1975.5; // B6
  g2.gain.setValueAtTime(0.15, t + 0.05);
  g2.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
  osc2.connect(g2).connect(ctx.destination);
  osc2.start(t + 0.05);
  osc2.stop(t + 0.35);
}

const FLOATING_ITEMS = ["✈️", "🗺️", "🏔️", "🌊", "🌸", "🚗", "⛺", "📸", "🌅", "🍜"];

export default function InvitationPage({ onAccept }: InvitationPageProps) {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [bgmStarted, setBgmStarted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const bgmIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const ensureAudioCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    return audioCtxRef.current;
  }, []);

  const handleInteraction = useCallback(() => {
    if (bgmStarted) return;
    const ctx = ensureAudioCtx();
    bgmIntervalRef.current = startBGM(ctx);
    setBgmStarted(true);
  }, [bgmStarted, ensureAudioCtx]);

  const handleAccept = useCallback(() => {
    const ctx = ensureAudioCtx();
    playClickSound(ctx);

    setFadeOut(true);
    setTimeout(() => {
      if (bgmIntervalRef.current) clearInterval(bgmIntervalRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close();
      }
      setVisible(false);
      onAccept();
    }, 800);
  }, [ensureAudioCtx, onAccept]);

  useEffect(() => {
    return () => {
      if (bgmIntervalRef.current) clearInterval(bgmIntervalRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close();
      }
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden transition-opacity duration-700 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #0f172a 100%)",
      }}
      onClick={handleInteraction}
    >
      {/* Floating decorative elements */}
      {FLOATING_ITEMS.map((item, i) => (
        <span
          key={i}
          className="pointer-events-none absolute select-none text-2xl sm:text-3xl opacity-20"
          style={{
            left: `${8 + (i * 17) % 84}%`,
            top: `${12 + ((i * 23 + 7) % 76)}%`,
            animation: `floatItem ${4 + (i % 3) * 1.5}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.4}s`,
          }}
        >
          {item}
        </span>
      ))}

      {/* Glowing orbs */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-amber-500/15 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-violet-500/15 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-lg px-6 text-center">
        {/* Envelope icon */}
        <div
          className="mb-6 inline-block text-6xl"
          style={{ animation: "bounceIn 0.8s ease-out" }}
        >
          💌
        </div>

        {/* Invitation text — staggered fade-in */}
        <div className="mb-4 space-y-3">
          <h1
            className="text-2xl font-bold text-amber-300 sm:text-3xl"
            style={{ animation: "fadeSlideUp 0.6s ease-out 0.3s both" }}
          >
            恭喜你，幸运的冒险者！
          </h1>

          <p
            className="text-base text-slate-300 sm:text-lg"
            style={{ animation: "fadeSlideUp 0.6s ease-out 0.6s both" }}
          >
            你已获得一封
            <span className="font-semibold text-emerald-400">清明自驾秘境探险</span>
            的邀请函。
          </p>

          <div
            className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
            style={{ animation: "fadeSlideUp 0.6s ease-out 0.9s both" }}
          >
            <p className="mb-2 text-sm leading-relaxed text-slate-400 sm:text-base">
              我是你的专属旅行管家
              <span className="mx-1 rounded-md bg-amber-500/20 px-1.5 py-0.5 font-bold text-amber-300">
                miniYQY
              </span>
              ，
            </p>
            <p className="text-sm leading-relaxed text-slate-400 sm:text-base">
              接下来请跟随我的指引，设定你的出行偏好，
              <br />
              我将为你匹配
              <span className="font-semibold text-sky-400">最心动的路线</span>。
            </p>
          </div>

          <p
            className="text-lg font-medium text-slate-200 sm:text-xl"
            style={{ animation: "fadeSlideUp 0.6s ease-out 1.2s both" }}
          >
            准备好了吗？
          </p>
        </div>

        {/* CTA button */}
        <div style={{ animation: "fadeSlideUp 0.6s ease-out 1.5s both" }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleInteraction();
              handleAccept();
            }}
            className="group relative mt-4 inline-flex items-center gap-2 rounded-2xl bg-amber-400 px-10 py-4 text-lg font-bold text-slate-900 shadow-lg shadow-amber-500/30 transition-all duration-200 hover:bg-amber-300 hover:shadow-xl hover:shadow-amber-500/40 hover:scale-105 active:scale-95"
          >
            <span className="transition-transform duration-200 group-hover:rotate-12">🚀</span>
            接受邀请，我们出发吧！
          </button>
        </div>

        {/* Tap hint */}
        {!bgmStarted && (
          <p
            className="mt-8 text-xs text-slate-600 animate-pulse"
            style={{ animation: "fadeSlideUp 0.6s ease-out 2s both" }}
          >
            点击屏幕任意处开启氛围音乐 🎵
          </p>
        )}
      </div>

      {/* Keyframe animations */}
      <style jsx>{`
        @keyframes floatItem {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-20px) rotate(10deg); }
        }
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.1); }
          70% { transform: scale(0.95); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
