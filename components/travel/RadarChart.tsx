import { RouteData, DIMENSIONS } from "./travelData";

interface RadarChartProps {
  routes: RouteData[];
  selectedRouteId?: string;
}

const SIZE = 300;
const CENTER = SIZE / 2;
const RADIUS = 110;
const LEVELS = 5;

function polarToCartesian(angle: number, radius: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
}

function getPolygonPoints(scores: number[], max: number = 10): string {
  const step = 360 / scores.length;
  return scores
    .map((score, i) => {
      const { x, y } = polarToCartesian(i * step, (score / max) * RADIUS);
      return `${x},${y}`;
    })
    .join(" ");
}

export default function RadarChart({ routes, selectedRouteId }: RadarChartProps) {
  const angleStep = 360 / DIMENSIONS.length;

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-2 text-center text-2xl font-bold text-white sm:text-3xl">
          小管家的数据分析室
        </h2>
        <p className="mb-10 text-center text-slate-400">
          我从六个维度帮你打了分，一图胜千言，谁强谁弱一目了然~
        </p>

        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-center">
          {/* SVG Radar */}
          <div className="flex-shrink-0">
            <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-72 w-72 sm:h-80 sm:w-80">
              {/* Grid levels */}
              {Array.from({ length: LEVELS }, (_, i) => {
                const r = (RADIUS / LEVELS) * (i + 1);
                const points = DIMENSIONS.map((_, j) => {
                  const { x, y } = polarToCartesian(j * angleStep, r);
                  return `${x},${y}`;
                }).join(" ");
                return (
                  <polygon
                    key={i}
                    points={points}
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth={1}
                  />
                );
              })}

              {/* Axis lines */}
              {DIMENSIONS.map((_, i) => {
                const { x, y } = polarToCartesian(i * angleStep, RADIUS);
                return (
                  <line
                    key={i}
                    x1={CENTER}
                    y1={CENTER}
                    x2={x}
                    y2={y}
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth={1}
                  />
                );
              })}

              {/* Data polygons */}
              {routes.map((route) => {
                const scores = DIMENSIONS.map((d) => route.scores[d.key]);
                const isHighlighted = !selectedRouteId || route.id === selectedRouteId;
                return (
                  <polygon
                    key={route.id}
                    points={getPolygonPoints(scores)}
                    fill={`${route.color}${isHighlighted ? "30" : "08"}`}
                    stroke={route.color}
                    strokeWidth={isHighlighted ? 2.5 : 1}
                    opacity={isHighlighted ? 1 : 0.3}
                    className="transition-all duration-500"
                  />
                );
              })}

              {/* Axis labels */}
              {DIMENSIONS.map((dim, i) => {
                const { x, y } = polarToCartesian(i * angleStep, RADIUS + 28);
                return (
                  <text
                    key={dim.key}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-slate-400 text-xs"
                    fontSize={11}
                  >
                    {dim.icon} {dim.label}
                  </text>
                );
              })}
            </svg>
          </div>

          {/* Legend + Score table */}
          <div className="w-full max-w-md">
            {/* Legend */}
            <div className="mb-6 flex flex-wrap gap-3">
              {routes.map((route) => (
                <div key={route.id} className="flex items-center gap-2">
                  <span
                    className="inline-block h-3 w-3 rounded-full"
                    style={{ backgroundColor: route.color }}
                  />
                  <span className={`text-sm ${
                    !selectedRouteId || route.id === selectedRouteId
                      ? "text-slate-200"
                      : "text-slate-500"
                  }`}>
                    {route.emoji} {route.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Score table */}
            <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-3 py-2.5 text-left text-xs font-medium text-slate-500">
                      维度
                    </th>
                    {routes.map((r) => (
                      <th
                        key={r.id}
                        className="px-3 py-2.5 text-center text-xs font-medium"
                        style={{ color: r.color }}
                      >
                        {r.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DIMENSIONS.map((dim, i) => (
                    <tr
                      key={dim.key}
                      className={i < DIMENSIONS.length - 1 ? "border-b border-white/5" : ""}
                    >
                      <td className="px-3 py-2 text-slate-400">
                        {dim.icon} {dim.label}
                      </td>
                      {routes.map((r) => {
                        const val = r.scores[dim.key];
                        return (
                          <td key={r.id} className="px-3 py-2 text-center">
                            <span
                              className="inline-flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold"
                              style={{
                                backgroundColor: `${r.color}20`,
                                color: r.color,
                              }}
                            >
                              {val}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
