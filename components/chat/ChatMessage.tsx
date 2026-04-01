interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

export default function ChatMessage({
  role,
  content,
  isStreaming,
}: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 sm:max-w-[70%] ${
          isUser
            ? "bg-neon-blue/15 text-text-primary"
            : "border border-border-glow bg-surface/80 text-text-primary"
        }`}
      >
        {!isUser && (
          <div className="mb-1 text-xs font-medium text-neon-blue">
            AI 策划助手
          </div>
        )}
        <div className="whitespace-pre-wrap text-sm leading-relaxed">
          {content}
          {isStreaming && (
            <span className="ml-1 inline-block h-4 w-1.5 animate-pulse rounded-sm bg-neon-blue" />
          )}
        </div>
      </div>
    </div>
  );
}
