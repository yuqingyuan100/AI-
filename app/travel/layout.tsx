import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "4月4日~6日旅行计划：提案环节",
  description: "5人越野车上海出发，从丽水、台州、皖南、启东四条自驾线中选出最佳目的地。",
};

export default function TravelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      {children}
    </div>
  );
}
