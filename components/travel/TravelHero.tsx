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
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur-sm">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300">提案进行中</span>
        </div>

        {/* Title */}
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          <span className="bg-gradient-to-r from-emerald-400 via-sky-400 to-amber-400 bg-clip-text text-transparent">
            4月4日~6日
          </span>
          <br />
          <span className="text-white">旅行计划：提案环节</span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-400">
          从上海出发，5人越野车，3天2晚。从四条精选自驾线路中，
          按照你的偏好一步步选出最佳目的地。
        </p>

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
        <div className="mt-12 flex flex-col items-center gap-2 text-slate-500">
          <span className="text-sm">向下滑动开始选择</span>
          <svg className="h-5 w-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
