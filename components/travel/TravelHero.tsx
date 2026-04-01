export default function TravelHero() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -right-20 top-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Date badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-500/10 px-4 py-2 text-sm backdrop-blur-sm">
          <span className="inline-block h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-amber-300 font-medium">小管家 miniYQY 提案进行中</span>
        </div>

        {/* Title */}
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          <span className="bg-gradient-to-r from-emerald-400 via-sky-400 to-amber-400 bg-clip-text text-transparent">
            4月4日~6日
          </span>
          <br />
          <span className="text-white">旅行计划：提案环节</span>
        </h1>

        {/* miniYQY chat bubble */}
        <div className="mx-auto mb-10 max-w-xl">
          <div className="relative rounded-2xl border border-amber-400/20 bg-amber-500/5 p-5 backdrop-blur-sm">
            <div className="absolute -top-3 left-6 rounded-full bg-amber-500/20 px-3 py-0.5 text-xs font-bold text-amber-300">
              miniYQY
            </div>
            <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
              各位冒险者好呀~ 我已经帮你们整理好
              <span className="font-semibold text-emerald-400">四条精选自驾路线</span>
              ，从上海出发，5人越野车，3天2晚。
              <br />
              跟着小管家的节奏，一步步找到最适合咱们的目的地吧！
            </p>
          </div>
        </div>

        {/* Info cards */}
        <div className="mx-auto grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: "📅", label: "出发日期", value: "4月4日(周五)" },
            { icon: "🚙", label: "出行方式", value: "越野车自驾" },
            { icon: "👥", label: "出行人数", value: "5人" },
            { icon: "🏕️", label: "行程天数", value: "3天2晚" },
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

        {/* Scroll hint */}
        <div className="mt-12 flex flex-col items-center gap-2 text-amber-400/70">
          <span className="text-sm">跟着小管家往下走~</span>
          <svg className="h-5 w-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
