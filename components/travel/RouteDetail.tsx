import { RouteData, DIMENSIONS } from "./travelData";

interface RouteDetailProps {
  route: RouteData;
  onClose: () => void;
  onSelect: (id: string) => void;
  isSelected: boolean;
}

function ButlerSays({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-start gap-2.5">
      <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-xs">
        🧑‍💼
      </span>
      <p className="rounded-xl rounded-tl-sm border border-amber-400/10 bg-amber-500/5 px-3.5 py-2 text-sm leading-relaxed text-amber-200/80">
        {children}
      </p>
    </div>
  );
}

export default function RouteDetail({
  route,
  onClose,
  onSelect,
  isSelected,
}: RouteDetailProps) {
  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          {/* Header */}
          <div className="relative h-48 sm:h-64">
            <img
              src={route.heroImage}
              alt={route.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
            <button
              onClick={onClose}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="absolute bottom-4 left-6">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{route.emoji}</span>
                <div>
                  <h2 className="text-2xl font-bold text-white sm:text-3xl">{route.name}</h2>
                  <p className="text-slate-300">{route.subtitle}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Butler intro */}
            <ButlerSays>
              来，让小管家带你详细看看{route.name}这条线路。
              我把方方面面都整理好了，你慢慢看~
            </ButlerSays>

            {/* Quick info */}
            <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "距离", value: route.distance },
                { label: "车程", value: route.duration },
                { label: "预算", value: route.cost },
                { label: "天气", value: route.weather.split("｜")[0] },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center"
                >
                  <div className="text-xs text-slate-500">{item.label}</div>
                  <div className="text-sm font-medium text-slate-200">{item.value}</div>
                </div>
              ))}
            </div>

            {/* Score breakdown */}
            <div className="mb-8">
              <h3 className="mb-2 text-lg font-bold text-white">小管家的打分理由</h3>
              <ButlerSays>
                以下是我对{route.name}六个维度的详细评分，每一项都有理有据哦~
              </ButlerSays>
              <div className="grid gap-3 sm:grid-cols-2">
                {DIMENSIONS.map((dim) => (
                  <div
                    key={dim.key}
                    className="rounded-xl border border-white/5 bg-white/[0.03] p-4"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm text-slate-300">
                        {dim.icon} {dim.label}
                      </span>
                      <span
                        className="text-lg font-bold"
                        style={{ color: route.color }}
                      >
                        {route.scores[dim.key]}/10
                      </span>
                    </div>
                    <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-slate-700">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${route.scores[dim.key] * 10}%`,
                          backgroundColor: route.color,
                        }}
                      />
                    </div>
                    <p className="text-xs text-slate-500">
                      {route.scoreReasons[dim.key]}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="mb-8">
              <h3 className="mb-2 text-lg font-bold text-white">小管家的推荐理由</h3>
              <ButlerSays>
                这几个亮点是我觉得最打动人的，也是选它的核心理由！
              </ButlerSays>
              <div className="space-y-2">
                {route.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-lg bg-white/[0.03] p-3"
                  >
                    <span
                      className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: route.color }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm text-slate-300">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social recommendations */}
            <div className="mb-8">
              <h3 className="mb-2 text-lg font-bold text-white">小管家帮你翻了社交媒体</h3>
              <ButlerSays>
                小红书和抖音上大家怎么说的？我帮你挑了最有参考价值的几条~
              </ButlerSays>
              <div className="grid gap-3 sm:grid-cols-2">
                {route.socialRecs.map((rec, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-white/5 bg-white/[0.03] p-4"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <span
                        className={`inline-block h-2 w-2 rounded-full ${
                          rec.platform === "xiaohongshu" ? "bg-red-400" : "bg-sky-400"
                        }`}
                      />
                      <span className="text-xs font-medium text-slate-400">
                        {rec.platform === "xiaohongshu" ? "小红书" : "抖音"}
                      </span>
                    </div>
                    <p className="text-sm italic text-slate-300">{rec.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Itinerary */}
            <div className="mb-8">
              <h3 className="mb-2 text-lg font-bold text-white">小管家的行程安排</h3>
              <ButlerSays>
                三天的行程我已经帮你规划好了，节奏松弛不赶路，走起~
              </ButlerSays>
              <div className="space-y-6">
                {route.itinerary.map((day) => (
                  <div key={day.day}>
                    <div className="mb-3 flex items-center gap-3">
                      <span
                        className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white"
                        style={{ backgroundColor: route.color }}
                      >
                        D{day.day}
                      </span>
                      <h4 className="font-medium text-white">{day.title}</h4>
                    </div>

                    {/* Activities timeline */}
                    <div className="ml-4 border-l-2 border-white/10 pl-6">
                      {day.activities.map((activity, i) => (
                        <div key={i} className="relative mb-3 last:mb-0">
                          <span
                            className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-slate-800"
                            style={{ backgroundColor: route.color }}
                          />
                          <p className="text-sm text-slate-400">{activity}</p>
                        </div>
                      ))}
                    </div>

                    {/* Spot photos */}
                    {day.spots.length > 0 && (
                      <div className="mt-4 ml-4 grid gap-3 sm:grid-cols-2 pl-6">
                        {day.spots.map((spot) => (
                          <div
                            key={spot.name}
                            className="overflow-hidden rounded-xl border border-white/10"
                          >
                            <img
                              src={spot.image}
                              alt={spot.name}
                              className="h-32 w-full object-cover"
                              loading="lazy"
                            />
                            <div className="p-3">
                              <div className="text-sm font-medium text-white">
                                {spot.name}
                              </div>
                              <div className="text-xs text-slate-500">{spot.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="mb-8">
              <h3 className="mb-2 text-lg font-bold text-white">小管家的温馨叮嘱</h3>
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                <ul className="space-y-1.5">
                  {route.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-amber-200/80">
                      <span className="mt-1 text-amber-400">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Weather */}
            <div className="mb-8 rounded-xl border border-sky-500/20 bg-sky-500/5 p-4">
              <div className="mb-1 text-sm font-medium text-sky-300">小管家天气播报</div>
              <p className="text-sm text-sky-200/70">{route.weather}</p>
            </div>

            {/* Action */}
            <ButlerSays>
              看完了？觉得怎么样~ 满意就选它，想对比的话也可以返回看看其他路线哦！
            </ButlerSays>
            <div className="flex justify-center gap-3">
              <button
                onClick={onClose}
                className="rounded-xl border border-white/10 px-6 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10"
              >
                再看看其他的
              </button>
              <button
                onClick={() => onSelect(route.id)}
                className="rounded-xl px-8 py-3 text-sm font-bold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: route.color }}
              >
                {isSelected ? "✓ 已选择此路线" : "就听小管家的，选它！"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
