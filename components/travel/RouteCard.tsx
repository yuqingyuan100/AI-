import { RouteData, DIMENSIONS } from "./travelData";

interface RouteCardProps {
  route: RouteData;
  rank?: number;
  score?: number;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onViewDetail: (id: string) => void;
}

export default function RouteCard({
  route,
  rank,
  score,
  isSelected,
  onSelect,
  onViewDetail,
}: RouteCardProps) {
  const avgScore =
    score ??
    DIMENSIONS.reduce((sum, d) => sum + route.scores[d.key], 0) / DIMENSIONS.length;

  return (
    <div
      className={`group relative rounded-2xl border transition-all duration-300 ${
        isSelected
          ? "border-white/30 bg-white/10 shadow-lg shadow-white/5 ring-2"
          : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.08]"
      }`}
      style={isSelected ? { ringColor: route.color } as React.CSSProperties : undefined}
    >
      {/* Rank badge */}
      {rank !== undefined && (
        <div
          className="absolute -right-2 -top-3 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white shadow-lg"
          style={{ backgroundColor: route.color }}
        >
          {rank}
        </div>
      )}

      {/* Hero image */}
      <div className="relative h-40 overflow-hidden rounded-t-2xl">
        <img
          src={route.heroImage}
          alt={route.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
        <div className="absolute bottom-3 left-4">
          <span className="text-3xl">{route.emoji}</span>
        </div>
        <div className="absolute bottom-3 right-4 flex items-center gap-1.5">
          <span className="rounded-full bg-black/40 px-2.5 py-0.5 text-xs text-slate-200 backdrop-blur-sm">
            {route.distance}
          </span>
          <span className="rounded-full bg-black/40 px-2.5 py-0.5 text-xs text-slate-200 backdrop-blur-sm">
            {route.duration}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="mb-1 text-xl font-bold text-white">{route.name}</h3>
        <p className="mb-3 text-sm text-slate-400">{route.subtitle}</p>

        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {route.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-2.5 py-0.5 text-xs font-medium"
              style={{
                backgroundColor: `${route.color}20`,
                color: route.color,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Score bar */}
        <div className="mb-4">
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="text-slate-400">综合评分</span>
            <span className="font-bold" style={{ color: route.color }}>
              {avgScore.toFixed(1)}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-700">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${(avgScore / 10) * 100}%`,
                backgroundColor: route.color,
              }}
            />
          </div>
        </div>

        {/* Social proof */}
        <div className="mb-4 flex gap-2 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-400" />
            小红书热推
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-sky-400" />
            抖音推荐
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onViewDetail(route.id)}
            className="flex-1 rounded-lg border border-white/10 px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            查看详情
          </button>
          <button
            onClick={() => onSelect(route.id)}
            className={`flex-1 rounded-lg px-3 py-2 text-sm font-bold transition-all ${
              isSelected
                ? "text-white"
                : "text-white hover:opacity-90"
            }`}
            style={{ backgroundColor: isSelected ? route.color : `${route.color}CC` }}
          >
            {isSelected ? "✓ 已选择" : "选这个"}
          </button>
        </div>
      </div>
    </div>
  );
}
