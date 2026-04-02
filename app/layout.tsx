import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 游戏开发 — 用 AI 赋能游戏各模块的开发与设计",
  description:
    "探索 AI 如何介入游戏策划、美术、关卡、数值、音频等各模块，通过可交互的 Demo 与案例展示 AI 的实际产出能力。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Noto+Sans+SC:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
