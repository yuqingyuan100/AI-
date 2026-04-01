"use client";

import { useState, useRef, useEffect } from "react";

export type Phase = "ideation" | "execution";

interface ChatInputProps {
  onSend: (message: string) => void;
  phase: Phase;
  onPhaseChange: (phase: Phase) => void;
  disabled?: boolean;
}

export default function ChatInput({
  onSend,
  phase,
  onPhaseChange,
  disabled,
}: ChatInputProps) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 160) + "px";
    }
  }, [text]);

  function handleSubmit() {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <div className="border-t border-border-glow bg-deep-space-light/80 px-4 py-3 backdrop-blur-xl">
      <div className="mx-auto max-w-3xl">
        {/* Input row */}
        <div className="flex items-end gap-2">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="请输入你的策划需求..."
            disabled={disabled}
            rows={1}
            className="flex-1 resize-none rounded-xl border border-border-glow bg-surface/60 px-4 py-3 text-sm text-text-primary placeholder-text-muted outline-none transition-colors focus:border-neon-blue/40 disabled:opacity-50"
          />
          <button
            onClick={handleSubmit}
            disabled={disabled || !text.trim()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neon-blue text-deep-space transition-all hover:brightness-110 disabled:opacity-30"
          >
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.155.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.288Z" />
            </svg>
          </button>
        </div>

        {/* Phase selector */}
        <div className="mt-2 flex items-center gap-4">
          <span className="text-xs text-text-muted">方案阶段：</span>
          <label className="flex cursor-pointer items-center gap-1.5">
            <input
              type="radio"
              name="phase"
              checked={phase === "ideation"}
              onChange={() => onPhaseChange("ideation")}
              className="accent-neon-blue"
            />
            <span
              className={`text-xs ${phase === "ideation" ? "text-neon-blue" : "text-text-secondary"}`}
            >
              思路阶段
            </span>
          </label>
          <label className="flex cursor-pointer items-center gap-1.5">
            <input
              type="radio"
              name="phase"
              checked={phase === "execution"}
              onChange={() => onPhaseChange("execution")}
              className="accent-neon-blue"
            />
            <span
              className={`text-xs ${phase === "execution" ? "text-neon-blue" : "text-text-secondary"}`}
            >
              落地阶段
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
