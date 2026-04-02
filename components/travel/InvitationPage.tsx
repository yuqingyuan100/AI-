"use client";

import { useState, useCallback, useEffect } from "react";
import { playTrack, playClickSound } from "./audioManager";

interface InvitationPageProps {
  onAccept: () => void;
}

const FLOATING_ITEMS = ["✈️", "🗺️", "🏔️", "🏘️", "🌸", "🚗", "⛺", "📸", "🌅", "🍜"];

export default function InvitationPage({ onAccept }: InvitationPageProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    playTrack("invitation");
  }, []);

  const handleAccept = useCallback(() => {
    playClickSound();
    setFadeOut(true);
    setTimeout(() => {
      onAccept();
    }, 800);
  }, [onAccept]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden transition-opacity duration-700 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #0f172a 100%)",
      }}
    >
      {FLOATING_ITEMS.map((item, i) => (
        <span
          key={i}
          className="pointer-events-none absolute select-none text-2xl sm:text-3xl opacity-20"
          style={{
            left: `${8 + (i * 17) % 84}%`,
            top: `${12 + ((i * 23 + 7) % 76)}%`,
            animation: `invFloat ${4 + (i % 3) * 1.5}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.4}s`,
          }}
        >
          {item}
        </span>
      ))}

      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-amber-500/15 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-violet-500/15 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 mx-auto max-w-lg px-6 text-center">
        <div
          className="mb-6 inline-block text-6xl"
          style={{ animation: "invBounce 0.8s ease-out" }}
        >
          🎉
        </div>

        <div className="mb-4 space-y-3">
          <h1
            className="text-2xl font-bold text-amber-300 sm:text-3xl"
            style={{ animation: "invFadeUp 0.6s ease-out 0.3s both" }}
          >
            恭喜你，幸运的冒险者！
          </h1>

          <p
            className="text-base text-slate-300 sm:text-lg"
            style={{ animation: "invFadeUp 0.6s ease-out 0.6s both" }}
          >
            你已获得一封
            <span className="font-semibold text-emerald-400">清明安徽自驾秘境之旅</span>
            的邀请函！
          </p>

          <div
            className="rounded-xl border border-amber-400/20 bg-amber-500/5 p-5 backdrop-blur-sm"
            style={{ animation: "invFadeUp 0.6s ease-out 0.9s both" }}
          >
            <p className="mb-3 text-sm leading-relaxed text-slate-400 sm:text-base">
              我是你的专属旅行小管家
              <span className="mx-1 inline-flex items-center gap-1 rounded-md bg-amber-500/20 px-2 py-0.5 font-bold text-amber-300">
                🧑‍💼 miniYQY
              </span>
            </p>
            <p className="mb-2 text-sm leading-relaxed text-slate-400 sm:text-base">
              目的地已确定 —— <span className="text-amber-400 font-bold">安徽</span>！
              泾县 · 查济 · 桃花潭 · 宏村 · 屯溪老街，
              一条不走回头路的经典环线已为你规划好~
            </p>
            <p className="text-sm leading-relaxed text-slate-400 sm:text-base">
              打开攻略，跟小管家一起出发吧！
            </p>
          </div>

          <p
            className="text-lg font-medium text-slate-200 sm:text-xl"
            style={{ animation: "invFadeUp 0.6s ease-out 1.2s both" }}
          >
            各位冒险者，准备好了吗？
          </p>
        </div>

        <div style={{ animation: "invFadeUp 0.6s ease-out 1.5s both" }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAccept();
            }}
            className="group relative mt-4 inline-flex items-center gap-2 rounded-2xl bg-amber-400 px-10 py-4 text-lg font-bold text-slate-900 shadow-lg shadow-amber-500/30 transition-all duration-200 hover:bg-amber-300 hover:shadow-xl hover:shadow-amber-500/40 hover:scale-105 active:scale-95"
          >
            <span className="transition-transform duration-200 group-hover:rotate-12">🚀</span>
            接受邀请，查看攻略！
          </button>
        </div>
      </div>
    </div>
  );
}
