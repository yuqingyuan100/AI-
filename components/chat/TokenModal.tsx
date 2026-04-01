"use client";

import { useState } from "react";

interface TokenModalProps {
  onSave: (token: string) => void;
}

export default function TokenModal({ onSave }: TokenModalProps) {
  const [token, setToken] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = token.trim();
    if (!trimmed) return;
    onSave(trimmed);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-lg rounded-2xl border border-border-glow bg-deep-space-light p-6 shadow-2xl">
        <h2 className="mb-2 text-lg font-bold text-text-primary">
          配置 AI 连接
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-text-secondary">
          需要你的 JWT Token 来连接内部 AI 服务。获取方式：
        </p>
        <ol className="mb-4 space-y-1 text-sm text-text-secondary">
          <li>
            1. 打开{" "}
            <a
              href="https://chat.ingarena.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon-blue underline"
            >
              chat.ingarena.net
            </a>{" "}
            并登录
          </li>
          <li>2. 按 F12 打开开发者工具</li>
          <li>
            3. 切到 Application &rarr; Local Storage &rarr; 找到{" "}
            <code className="rounded bg-surface px-1 text-neon-blue">
              token
            </code>{" "}
            字段
          </li>
          <li>4. 复制 token 的值粘贴到下方</li>
        </ol>

        <form onSubmit={handleSubmit}>
          <textarea
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="粘贴你的 JWT Token（eyJ... 开头的字符串）"
            rows={3}
            className="mb-4 w-full resize-none rounded-xl border border-border-glow bg-surface/60 px-4 py-3 text-sm text-text-primary placeholder-text-muted outline-none transition-colors focus:border-neon-blue/40"
          />
          <button
            type="submit"
            disabled={!token.trim()}
            className="w-full rounded-xl bg-neon-blue py-3 text-sm font-semibold text-deep-space transition-all hover:brightness-110 disabled:opacity-30"
          >
            保存并开始
          </button>
        </form>
      </div>
    </div>
  );
}
