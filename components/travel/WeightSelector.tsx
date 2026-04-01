import { useState, useRef, useEffect, useCallback } from "react";
import { RouteData, DIMENSIONS, RouteScores } from "./travelData";
import { playSliderTick, playRankChange } from "./audioManager";

interface WeightSelectorProps {
  weights: Record<keyof RouteScores, number>;
  onWeightChange: (key: keyof RouteScores, value: number) => void;
  routes: RouteData[];
  onReset: () => void;
}

function calcWeightedScore(
  route: RouteData,
  weights: Record<keyof RouteScores, number>
): number {
  let totalWeight = 0;
  let totalScore = 0;
  for (const dim of DIMENSIONS) {
    totalWeight += weights[dim.key];
    totalScore += route.scores[dim.key] * weights[dim.key];
  }
  return totalWeight > 0 ? totalScore / totalWeight : 0;
}

interface Toast {
  id: number;
  text: string;
  color: string;
}

let toastId = 0;

export default function WeightSelector({
  weights,
  onWeightChange,
  routes,
  onReset,
}: WeightSelectorProps) {
  const rankedRoutes = routes
    .map((r) => ({ route: r, score: calcWeightedScore(r, weights) }))
    .sort((a, b) => b.score - a.score);

  const prevRankRef = useRef<string[]>(rankedRoutes.map((r) => r.route.id));
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const currentRank = rankedRoutes.map((r) => r.route.id);
    const prevRank = prevRankRef.current;

    if (prevRank.length > 0 && prevRank[0] !== currentRank[0]) {
      const newLeader = rankedRoutes[0].route;
      const prevLeader = routes.find((r) => r.id === prevRank[0]);
      if (prevLeader) {
        playRankChange();
        const id = ++toastId;
        setToasts((prev) => [
          ...prev,
          {
            id,
            text: `📢 小管家播报：${newLeader.emoji} ${newLeader.name} 超过 ${prevLeader.name}，暂时领跑！`,
            color: newLeader.color,
          },
        ]);
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
      }
    }

    prevRankRef.current = currentRank;
  }, [rankedRoutes, routes]);

  const handleSliderChange = useCallback(
    (key: keyof RouteScores, value: number) => {
      playSliderTick();
      onWeightChange(key, value);
    },
    [onWeightChange]
  );

  return (
    <>
      {/* Floating toasts — fixed to viewport top-center */}
      <div className="pointer-events-none fixed left-0 right-0 top-6 z-50 flex flex-col items-center gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="animate-toast pointer-events-auto rounded-full px-5 py-2.5 text-sm font-bold text-white shadow-xl backdrop-blur-md"
            style={{ backgroundColor: `${toast.color}DD` }}
          >
            {toast.text}
          </div>
        ))}
      </div>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-2 text-center text-2xl font-bold text-white sm:text-3xl">
            告诉小管家，你最在乎什么？
          </h2>
          <p className="mb-8 text-center text-slate-400">
            拖动滑块告诉我你的偏好，我来帮你实时匹配最佳路线~
          </p>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Weight sliders */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-medium text-slate-300">偏好调节面板</h3>
                <button
                  onClick={onReset}
                  className="text-xs text-slate-500 transition-colors hover:text-slate-300"
                >
                  重置默认
                </button>
              </div>

              <div className="space-y-5">
                {DIMENSIONS.map((dim) => (
                  <div key={dim.key}>
                    <div className="mb-2 flex items-center justify-between">
                      <label className="flex items-center gap-2 text-sm text-slate-300">
                        <span>{dim.icon}</span>
                        <span>{dim.label}</span>
                      </label>
                      <span className="text-sm font-bold text-white">
                        {weights[dim.key]}
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        type="range"
                        min={0}
                        max={5}
                        step={1}
                        value={weights[dim.key]}
                        onChange={(e) =>
                          handleSliderChange(dim.key, parseInt(e.target.value))
                        }
                        className="travel-slider w-full"
                      />
                      <div className="pointer-events-none mt-1 flex justify-between px-0.5 text-[10px] text-slate-600">
                        <span>不重要</span>
                        <span>一般</span>
                        <span>很重要</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ranking results */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-4 text-sm font-medium text-amber-300/80">小管家的实时推荐</h3>
              <div className="space-y-3">
                {rankedRoutes.map(({ route, score }, index) => (
                  <div
                    key={route.id}
                    className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.03] p-4 transition-all duration-500"
                    style={{
                      order: index,
                      borderColor: index === 0 ? `${route.color}40` : undefined,
                      backgroundColor: index === 0 ? `${route.color}08` : undefined,
                    }}
                  >
                    <div
                      className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-lg font-bold ${
                        index === 0 ? "text-white" : "bg-slate-700/50 text-slate-400"
                      }`}
                      style={index === 0 ? { backgroundColor: route.color } : undefined}
                    >
                      {index + 1}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{route.emoji}</span>
                        <span className="font-bold text-white">{route.name}</span>
                        {index === 0 && (
                          <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-400">
                            推荐
                          </span>
                        )}
                      </div>
                      <p className="truncate text-xs text-slate-500">{route.subtitle}</p>
                    </div>

                    <div className="flex-shrink-0 text-right">
                      <div
                        className="text-2xl font-bold"
                        style={{ color: route.color }}
                      >
                        {score.toFixed(1)}
                      </div>
                      <div className="text-[10px] text-slate-500">加权得分</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-lg bg-amber-500/5 border border-amber-400/10 p-3 text-xs text-slate-500">
                💡 <span className="text-amber-300/70">小管家提示</span>：加权得分 = 各维度(评分 × 权重) 之和 ÷ 权重总和。权重拉得越高，那个维度就越能左右结果哦~
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export { calcWeightedScore };
