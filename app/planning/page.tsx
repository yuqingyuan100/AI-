"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatInput, { type Phase } from "@/components/chat/ChatInput";
import TokenModal from "@/components/chat/TokenModal";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPTS: Record<Phase, string> = {
  ideation: `你是一位资深的 AI 游戏策划助手，当前处于「思路阶段」。
你的任务是帮助用户进行头脑风暴、创意发散、需求拆解和可行性分析。
回复风格：
- 多角度发散，给出多种方案选项
- 用提问引导用户深入思考
- 提供行业案例参考和灵感
- 鼓励大胆创新，先不考虑实现难度
- 适当使用列表和结构化输出`,
  execution: `你是一位资深的 AI 游戏策划助手，当前处于「落地阶段」。
你的任务是帮助用户细化设计方案，输出可执行的具体文档。
回复风格：
- 输出具体的设计文档、数据表格、执行方案
- 明确技术规格、数值参数、流程节点
- 考虑实现成本和优先级
- 结构化、可交付的格式
- 标注风险点和依赖关系`,
};

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content:
    "你好！我是 AI 策划助手，可以帮你进行游戏策划相关的设计工作。\n\n你可以在下方选择当前所处的阶段：\n- **思路阶段**：头脑风暴、创意发散、需求分析\n- **落地阶段**：细化文档、数据表格、执行方案\n\n请告诉我你的策划需求吧！",
};

function TOKEN_KEY() {
  return "ai-gamedev-jwt-token";
}

export default function PlanningPage() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [phase, setPhase] = useState<Phase>("ideation");
  const [isStreaming, setIsStreaming] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [tokenLoaded, setTokenLoaded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(TOKEN_KEY());
    if (saved) {
      setToken(saved);
    } else {
      setShowTokenModal(true);
    }
    setTokenLoaded(true);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  function handleSaveToken(newToken: string) {
    localStorage.setItem(TOKEN_KEY(), newToken);
    setToken(newToken);
    setShowTokenModal(false);
  }

  const handleSend = useCallback(
    async (userText: string) => {
      if (!token || isStreaming) return;

      const userMsg: Message = { role: "user", content: userText };
      const updatedMessages = [...messages, userMsg];
      setMessages([...updatedMessages, { role: "assistant", content: "" }]);
      setIsStreaming(true);

      const apiMessages = [
        { role: "system" as const, content: SYSTEM_PROMPTS[phase] },
        ...updatedMessages
          .filter((m) => m !== WELCOME_MESSAGE)
          .map((m) => ({ role: m.role, content: m.content })),
      ];

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            messages: apiMessages,
            model: "gpt-5-mini",
          }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({ error: "请求失败" }));
          throw new Error(err.error || `HTTP ${res.status}`);
        }

        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let assistantContent = "";

        if (reader) {
          let buffer = "";
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed || !trimmed.startsWith("data: ")) continue;
              const data = trimmed.slice(6);
              if (data === "[DONE]") continue;

              try {
                const json = JSON.parse(data);
                const delta = json.choices?.[0]?.delta?.content;
                if (delta) {
                  assistantContent += delta;
                  setMessages((prev) => {
                    const next = [...prev];
                    next[next.length - 1] = {
                      role: "assistant",
                      content: assistantContent,
                    };
                    return next;
                  });
                }
              } catch {
                // skip malformed JSON chunks
              }
            }
          }
        }

        if (!assistantContent) {
          setMessages((prev) => {
            const next = [...prev];
            next[next.length - 1] = {
              role: "assistant",
              content: "（未收到 AI 回复，请检查 Token 是否有效）",
            };
            return next;
          });
        }
      } catch (err) {
        const errMsg =
          err instanceof Error ? err.message : "未知错误";
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = {
            role: "assistant",
            content: `请求失败：${errMsg}\n\n请检查 Token 是否过期，点击右上角「设置」重新配置。`,
          };
          return next;
        });
      } finally {
        setIsStreaming(false);
      }
    },
    [token, messages, phase, isStreaming]
  );

  if (!tokenLoaded) return null;

  return (
    <div className="flex h-screen flex-col bg-deep-space">
      {/* Header */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-border-glow bg-deep-space/80 px-4 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-surface hover:text-neon-blue"
          >
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          <div>
            <h1 className="text-sm font-bold text-text-primary">
              AI 策划助手
            </h1>
            <p className="text-xs text-text-muted">
              {phase === "ideation" ? "思路阶段" : "落地阶段"} · GPT-5 mini
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowTokenModal(true)}
          className="flex h-8 items-center gap-1.5 rounded-lg border border-border-glow px-3 text-xs text-text-secondary transition-colors hover:border-neon-blue/30 hover:text-neon-blue"
        >
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-3.5 w-3.5"
          >
            <path
              fillRule="evenodd"
              d="M7.84 1.804A1 1 0 0 1 8.82 1h2.36a1 1 0 0 1 .98.804l.331 1.652a6.993 6.993 0 0 1 1.929 1.115l1.598-.54a1 1 0 0 1 1.186.447l1.18 2.044a1 1 0 0 1-.205 1.251l-1.267 1.113a7.047 7.047 0 0 1 0 2.228l1.267 1.113a1 1 0 0 1 .206 1.25l-1.18 2.045a1 1 0 0 1-1.187.447l-1.598-.54a6.993 6.993 0 0 1-1.929 1.115l-.33 1.652a1 1 0 0 1-.98.804H8.82a1 1 0 0 1-.98-.804l-.331-1.652a6.993 6.993 0 0 1-1.929-1.115l-1.598.54a1 1 0 0 1-1.186-.447l-1.18-2.044a1 1 0 0 1 .205-1.251l1.267-1.114a7.05 7.05 0 0 1 0-2.227L1.821 7.773a1 1 0 0 1-.206-1.25l1.18-2.045a1 1 0 0 1 1.187-.447l1.598.54A6.992 6.992 0 0 1 7.51 3.456l.33-1.652ZM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
              clipRule="evenodd"
            />
          </svg>
          设置
        </button>
      </header>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-3xl">
          {messages.map((msg, i) => (
            <ChatMessage
              key={i}
              role={msg.role}
              content={msg.content}
              isStreaming={isStreaming && i === messages.length - 1 && msg.role === "assistant"}
            />
          ))}
        </div>
      </div>

      {/* Input */}
      <ChatInput
        onSend={handleSend}
        phase={phase}
        onPhaseChange={setPhase}
        disabled={isStreaming || !token}
      />

      {/* Token Modal */}
      {showTokenModal && <TokenModal onSave={handleSaveToken} />}
    </div>
  );
}
