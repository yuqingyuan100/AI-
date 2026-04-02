import { TRIP } from "./travelData";

export default function TravelHero() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute -right-20 top-20 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm backdrop-blur-sm">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-300 font-medium">目的地已确定 · 小管家 miniYQY 为你导航</span>
        </div>

        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          <span className="bg-gradient-to-r from-amber-400 via-emerald-400 to-sky-400 bg-clip-text text-transparent">
            安徽自驾攻略
          </span>
          <br />
          <span className="text-white text-2xl sm:text-3xl lg:text-4xl">
            {TRIP.dateRange}
          </span>
        </h1>

        <div className="mx-auto mb-10 max-w-xl">
          <div className="relative rounded-2xl border border-amber-400/20 bg-amber-500/5 p-5 backdrop-blur-sm">
            <div className="absolute -top-3 left-6 rounded-full bg-amber-500/20 px-3 py-0.5 text-xs font-bold text-amber-300">
              miniYQY
            </div>
            <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
              各位冒险者~  目的地
              <span className="font-bold text-amber-400">安徽</span>
              已锁定！小管家已为你们规划好
              <span className="font-semibold text-emerald-400">3天3夜不走回头路</span>
              的自驾环线。古镇、湖泊、世界遗产、徽州美食统统安排上~
              <br />
              往下看，跟着时间线一步步走！
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: "📅", label: "行程时间", value: "4/3晚 — 4/6午" },
            { icon: "🚙", label: "出行方式", value: TRIP.vehicle },
            { icon: "👥", label: "出行人数", value: `${TRIP.people}人` },
            { icon: "📍", label: "总里程", value: `~${TRIP.totalKm}km` },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              <div className="mb-1 text-2xl">{item.icon}</div>
              <div className="text-xs text-slate-500">{item.label}</div>
              <div className="text-sm font-medium text-slate-200">{item.value}</div>
            </div>
          ))}
        </div>

        {/* Route strip */}
        <div className="mt-10">
          <div className="mx-auto max-w-3xl overflow-x-auto">
            <div className="flex items-center justify-center gap-1 text-xs sm:text-sm whitespace-nowrap pb-2">
              {TRIP.routeSummary.split(" → ").map((stop, i, arr) => (
                <span key={i} className="flex items-center gap-1">
                  <span className="rounded-full bg-amber-500/15 border border-amber-400/20 px-2.5 py-1 text-amber-300 font-medium">
                    {stop}
                  </span>
                  {i < arr.length - 1 && (
                    <svg className="h-3 w-3 text-slate-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-2 text-amber-400/70">
          <span className="text-sm">跟着小管家的时间线往下走~</span>
          <svg className="h-5 w-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
