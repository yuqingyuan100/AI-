import { RouteData } from "./travelData";

interface FinalChoiceProps {
  route: RouteData;
  onReset: () => void;
  onViewDetail: (id: string) => void;
}

export default function FinalChoice({ route, onReset, onViewDetail }: FinalChoiceProps) {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <div className="overflow-hidden rounded-2xl border-2 shadow-xl" style={{ borderColor: `${route.color}60` }}>
          {/* Celebration header */}
          <div
            className="px-6 py-8"
            style={{
              background: `linear-gradient(135deg, ${route.color}30, ${route.color}10)`,
            }}
          >
            <div className="mb-4 text-5xl">{route.emoji}</div>
            <h2 className="mb-2 text-2xl font-bold text-white sm:text-3xl">
              目的地已确定！
            </h2>
            <p className="text-lg text-slate-300">
              我们去<span className="font-bold" style={{ color: route.color }}>{route.name}</span>！
            </p>
          </div>

          <div className="bg-white/5 p-6">
            {/* Trip summary */}
            <div className="mb-6 rounded-xl border border-white/10 bg-white/[0.03] p-5 text-left">
              <h3 className="mb-3 text-sm font-medium text-slate-400">行程摘要</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">出发日期</span>
                  <span className="text-slate-200">4月4日(周五)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">返回日期</span>
                  <span className="text-slate-200">4月6日(周日)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">目的地</span>
                  <span className="font-medium" style={{ color: route.color }}>{route.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">自驾距离</span>
                  <span className="text-slate-200">{route.distance}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">预计车程</span>
                  <span className="text-slate-200">{route.duration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">人均预算</span>
                  <span className="text-slate-200">{route.cost}</span>
                </div>
              </div>
            </div>

            {/* Day by day summary */}
            <div className="mb-6 space-y-2 text-left">
              {route.itinerary.map((day) => (
                <div
                  key={day.day}
                  className="rounded-lg border border-white/5 bg-white/[0.03] p-3"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: route.color }}
                    >
                      {day.day}
                    </span>
                    <span className="text-sm font-medium text-slate-200">{day.title}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
              <button
                onClick={() => onViewDetail(route.id)}
                className="rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: route.color }}
              >
                查看完整行程
              </button>
              <button
                onClick={onReset}
                className="rounded-xl border border-white/10 px-6 py-3 text-sm font-medium text-slate-400 transition-colors hover:bg-white/10 hover:text-slate-200"
              >
                重新选择
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
