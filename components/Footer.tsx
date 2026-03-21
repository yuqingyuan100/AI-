import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border-glow bg-deep-space-light">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="text-center md:text-left">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-neon-blue/10 text-neon-blue">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4"
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
              <span className="text-base font-bold text-text-primary">
                AI<span className="text-neon-blue">GameDev</span>
              </span>
            </Link>
            <p className="mt-2 max-w-xs text-sm text-text-muted">
              用 AI 赋能游戏各模块的开发与设计
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-text-secondary">
            <Link href="#planning" className="transition-colors hover:text-neon-blue">AI 策划</Link>
            <Link href="#art" className="transition-colors hover:text-neon-blue">AI 美术</Link>
            <Link href="#level" className="transition-colors hover:text-neon-blue">AI 关卡</Link>
            <Link href="#numeric" className="transition-colors hover:text-neon-blue">AI 数值</Link>
            <Link href="#audio" className="transition-colors hover:text-neon-blue">AI 音频</Link>
            <Link href="#code" className="transition-colors hover:text-neon-blue">AI 编程</Link>
            <Link href="#qa" className="transition-colors hover:text-neon-blue">AI 测试</Link>
            <Link href="#narrative" className="transition-colors hover:text-neon-blue">AI 叙事</Link>
          </div>
        </div>

        <div className="mt-8 border-t border-border-glow pt-8 text-center text-sm text-text-muted">
          &copy; {new Date().getFullYear()} AI GameDev. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
