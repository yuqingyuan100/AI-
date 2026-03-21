"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_MODULES = [
  { id: "mod-planning", label: "AI 策划", href: "#planning" },
  { id: "mod-art", label: "AI 美术", href: "#art" },
  { id: "mod-level", label: "AI 关卡", href: "#level" },
  { id: "mod-numeric", label: "AI 数值", href: "#numeric" },
  { id: "mod-audio", label: "AI 音频", href: "#audio" },
  { id: "mod-code", label: "AI 编程", href: "#code" },
  { id: "mod-qa", label: "AI 测试", href: "#qa" },
  { id: "mod-narrative", label: "AI 叙事", href: "#narrative" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border-glow bg-deep-space/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neon-blue/10 text-neon-blue">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714a2.25 2.25 0 0 0 .659 1.591L19 14.5m-4.75-11.396c.251.023.501.05.75.082M19 14.5l-2.47 2.47a2.25 2.25 0 0 1-1.59.659H9.06a2.25 2.25 0 0 1-1.591-.659L5 14.5m14 0V5.846a2.25 2.25 0 0 0-1.894-2.222"
              />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight text-text-primary">
            AI<span className="text-neon-blue">GameDev</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_MODULES.map((mod) => (
            <Link
              key={mod.id}
              href={mod.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-surface hover:text-neon-blue"
            >
              {mod.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-surface hover:text-neon-blue lg:hidden"
          aria-label="Toggle menu"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-6 w-6"
            stroke="currentColor"
            strokeWidth={2}
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {mobileOpen && (
        <nav className="border-t border-border-glow bg-deep-space/95 px-4 pb-4 pt-2 backdrop-blur-xl lg:hidden">
          <div className="grid grid-cols-2 gap-1">
            {NAV_MODULES.map((mod) => (
              <Link
                key={mod.id}
                href={mod.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-surface hover:text-neon-blue"
              >
                {mod.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
