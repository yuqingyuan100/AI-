"use client";

import { useEffect, useRef } from "react";

function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }

    function initParticles() {
      particles = [];
      const count = Math.floor((canvas!.width * canvas!.height) / 15000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas!.width,
          y: Math.random() * canvas!.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.5 + 0.1,
        });
      }
    }

    function drawGrid() {
      ctx!.strokeStyle = "rgba(0, 212, 255, 0.03)";
      ctx!.lineWidth = 1;
      const step = 60;
      for (let x = 0; x < canvas!.width; x += step) {
        ctx!.beginPath();
        ctx!.moveTo(x, 0);
        ctx!.lineTo(x, canvas!.height);
        ctx!.stroke();
      }
      for (let y = 0; y < canvas!.height; y += step) {
        ctx!.beginPath();
        ctx!.moveTo(0, y);
        ctx!.lineTo(canvas!.width, y);
        ctx!.stroke();
      }
    }

    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      drawGrid();

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas!.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas!.height) p.vy *= -1;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(0, 212, 255, ${p.alpha})`;
        ctx!.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.strokeStyle = `rgba(0, 212, 255, ${0.08 * (1 - dist / 120)})`;
            ctx!.stroke();
          }
        }
      }

      animId = requestAnimationFrame(animate);
    }

    resize();
    initParticles();
    animate();
    window.addEventListener("resize", () => {
      resize();
      initParticles();
    });

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      <GridBackground />

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(0,212,255,0.4) 0%, rgba(123,47,255,0.2) 50%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border-glow bg-surface/50 px-4 py-1.5 text-sm text-text-secondary backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-neon-green animate-pulse" />
          探索 AI 驱动的游戏开发新范式
        </div>

        <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          用{" "}
          <span className="bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent glow-text">
            AI
          </span>{" "}
          赋能游戏
          <br />
          各模块的开发与设计
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-text-secondary sm:text-xl">
          从策划到美术，从关卡到数值，AI 正在重塑游戏开发的每一个环节。
          探索我们如何将前沿 AI 技术融入完整的游戏生产管线。
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#modules"
            className="glow-blue inline-flex items-center gap-2 rounded-xl bg-neon-blue px-8 py-3.5 text-base font-semibold text-deep-space transition-all hover:scale-105 hover:brightness-110"
          >
            探索各模块
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a
            href="#about"
            className="inline-flex items-center gap-2 rounded-xl border border-border-glow bg-surface/50 px-8 py-3.5 text-base font-semibold text-text-primary backdrop-blur-sm transition-all hover:border-neon-blue/30 hover:bg-surface"
          >
            了解更多
          </a>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-deep-space to-transparent" />
    </section>
  );
}
