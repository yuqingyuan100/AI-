import { RouteData, DIMENSIONS, RouteScores } from "./travelData";

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

export default function WeightSelector({
  weights,
  onWeightChange,
  routes,
  onReset,
}: WeightSelectorProps) {
  const rankedRoutes = routes
    .map((r) => ({ route: r, score: calcWeightedScore(r, weights) }))
    .sort((a, b) => b.score - a.score);

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-2 text-center text-2xl font-bold text-white sm:text-3xl">
          你最看重什么？
        </h2>
        <p className="mb-8 text-center text-slate-400">
          拖动滑块调整每个维度的权重，系统实时计算最适合你的路线
        </p>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Weight sliders */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-medium text-slate-300">维度权重设置</h3>
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
                        onWeightChange(dim.key, parseInt(e.target.value))
                      }
                      className="travel-slider w-full"
                    />
                    <div className="mt-1 flex justify-between px-0.5 text-[10px] text-slate-600">
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
            <h3 className="mb-4 text-sm font-medium text-slate-300">实时排名</h3>
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
                  {/* Rank number */}
                  <div
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-lg font-bold ${
                      index === 0 ? "text-white" : "bg-slate-700/50 text-slate-400"
                    }`}
                    style={index === 0 ? { backgroundColor: route.color } : undefined}
                  >
                    {index + 1}
                  </div>

                  {/* Route info */}
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

                  {/* Score */}
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

            {/* Score explanation */}
            <div className="mt-4 rounded-lg bg-white/[0.03] p-3 text-xs text-slate-500">
              加权得分 = 各维度(评分 × 权重) 之和 ÷ 权重总和。权重越高的维度对结果影响越大。
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { calcWeightedScore };
