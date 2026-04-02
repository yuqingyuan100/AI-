"use client";

import { useState, useEffect, useCallback } from "react";
import InvitationPage from "@/components/travel/InvitationPage";
import { playTrack, stopAll } from "@/components/travel/audioManager";
import TravelHero from "@/components/travel/TravelHero";
import {
  TRIP,
  PACKING_LIST,
  REPORT_DATA,
  DayPlan,
  Spot,
} from "@/components/travel/travelData";

/* ═══════════════════════════════════════
   Shared primitives
   ═══════════════════════════════════════ */

function ButlerSays({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 flex items-start gap-3">
      <span className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-base">
        🧑‍💼
      </span>
      <p className="rounded-2xl rounded-tl-sm border border-amber-400/15 bg-amber-500/5 px-5 py-3.5 text-base leading-relaxed text-amber-200/80">
        {children}
      </p>
    </div>
  );
}

function CopyBtn({ text }: { text: string }) {
  const [ok, setOk] = useState(false);
  const copy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setOk(true);
      setTimeout(() => setOk(false), 2000);
    });
  }, [text]);
  return (
    <button
      onClick={copy}
      className={`flex-shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition-all active:scale-95 ${
        ok
          ? "bg-emerald-500/20 text-emerald-400"
          : "bg-white/[0.08] text-slate-300 hover:bg-white/15 hover:text-white"
      }`}
    >
      {ok ? "✓ 已复制" : "📋 复制导航"}
    </button>
  );
}

const DAY_COLORS = ["#8B5CF6", "#F59E0B", "#10B981", "#3B82F6"];
const DAY_LABELS = ["Night 0", "Day 1", "Day 2", "Day 3"];

const BADGE_STYLES: Record<string, string> = {
  "必去！全网推荐": "bg-red-500/25 text-red-200 border-red-500/40",
  "必去！世界文化遗产": "bg-amber-500/25 text-amber-200 border-amber-500/40",
  "必去！美食圣地": "bg-orange-500/25 text-orange-200 border-orange-500/40",
  "抖音爆火": "bg-pink-500/25 text-pink-200 border-pink-500/40",
  "抖音爆火 · 免费": "bg-pink-500/25 text-pink-200 border-pink-500/40",
  "摄影推荐": "bg-sky-500/25 text-sky-200 border-sky-500/40",
  "经典人文": "bg-violet-500/25 text-violet-200 border-violet-500/40",
  "小众免费": "bg-emerald-500/25 text-emerald-200 border-emerald-500/40",
};

/* ═══════════════════════════════════════
   Inline spot card (embedded in timeline)
   ═══════════════════════════════════════ */

function InlineSpot({ spot }: { spot: Spot }) {
  const [img, setImg] = useState(0);
  const badgeCls = spot.badge ? (BADGE_STYLES[spot.badge] ?? "bg-white/20 text-white border-white/30") : "";

  return (
    <div className="mt-3 mb-2 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
      {/* Hero image */}
      <div className="relative aspect-[16/9] max-h-72 overflow-hidden">
        <img
          src={spot.images[img]}
          alt={spot.name}
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {spot.badge && (
          <span className={`absolute top-3.5 left-3.5 rounded-full border px-3.5 py-1.5 text-sm font-bold backdrop-blur-sm ${badgeCls}`}>
            {spot.badge.includes("必去") && "🔥 "}{spot.badge}
          </span>
        )}

        <div className="absolute bottom-3.5 left-4">
          <h4 className="text-xl font-bold text-white drop-shadow-lg">{spot.name}</h4>
        </div>

        {spot.images.length > 1 && (
          <div className="absolute bottom-4 right-4 flex gap-2">
            {spot.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setImg(i)}
                className={`h-2.5 rounded-full transition-all ${i === img ? "w-6 bg-white" : "w-2.5 bg-white/40"}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="space-y-5 p-6">
        <p className="text-base leading-relaxed text-slate-300">{spot.desc}</p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/15 p-4">
            <h5 className="mb-2.5 text-sm font-bold text-emerald-400">🎮 怎么玩</h5>
            <ul className="space-y-2">
              {spot.playTips.map((t, i) => (
                <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-slate-300">
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-emerald-500/60" />{t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-sky-500/5 border border-sky-500/15 p-4">
            <h5 className="mb-2.5 text-sm font-bold text-sky-400">📸 拍什么</h5>
            <ul className="space-y-2">
              {spot.photoTips.map((t, i) => (
                <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-slate-300">
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-sky-500/60" />{t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-white/[0.05] border border-white/[0.08] px-4 py-3">
          <div className="min-w-0 flex-1">
            <div className="text-xs font-medium text-slate-500 mb-0.5">📍 司机导航定位</div>
            <div className="truncate text-sm font-medium text-slate-300">{spot.navAddress}</div>
          </div>
          <CopyBtn text={spot.navAddress} />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   Prep section (Night 0: packing + tips)
   ═══════════════════════════════════════ */

function PrepSection() {
  const [open, setOpen] = useState(true);
  return (
    <div className="mb-8 rounded-2xl border border-amber-500/20 bg-amber-500/5 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-amber-500/[0.08]"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-lg">🎒</span>
          <span className="text-base font-bold text-amber-300">出发前必看</span>
          <span className="rounded-full bg-red-500/20 border border-red-500/30 px-2.5 py-0.5 text-xs font-bold text-red-400">
            重要
          </span>
        </div>
        <svg
          className={`h-5 w-5 text-amber-400/60 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="space-y-6 border-t border-amber-500/10 px-6 pb-6 pt-5">
          <div>
            <h4 className="mb-3 text-sm font-bold text-amber-300">📦 行李清单</h4>
            <div className="grid gap-3 sm:grid-cols-2">
              {PACKING_LIST.map((cat) => (
                <div key={cat.category} className="rounded-xl bg-white/[0.05] p-4">
                  <div className="mb-3 text-sm font-bold text-slate-200">{cat.icon} {cat.category}</div>
                  <ul className="space-y-2">
                    {cat.items.map((item) => (
                      <li key={item.name} className="flex items-start gap-2.5 text-sm">
                        <span className={`mt-0.5 ${item.required ? "text-amber-400" : "text-slate-600"}`}>
                          {item.required ? "●" : "○"}
                        </span>
                        <span className={item.required ? "font-medium text-slate-200" : "text-slate-400"}>
                          {item.name}
                          {item.required && <span className="ml-1.5 text-xs font-bold text-red-400/70">必带</span>}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold text-amber-300">⚡ 出发提醒</h4>
            <div className="space-y-3">
              {TRIP.tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-amber-500/15 text-xs font-bold text-amber-400">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-slate-300">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════
   Merged timeline (串联式)
   ═══════════════════════════════════════ */

function MergedTimeline({ day, color }: { day: DayPlan; color: string }) {
  const spotMap = new Map<string, Spot>();
  day.spots.forEach((s) => spotMap.set(s.name, s));

  return (
    <div className="relative ml-4 pl-8 border-l-2" style={{ borderColor: `${color}35` }}>
      {day.schedule.map((slot, i) => {
        const spot = slot.spotRef ? spotMap.get(slot.spotRef) : null;
        const isSpot = !!spot;
        return (
          <div key={i} className={`relative ${i < day.schedule.length - 1 ? "pb-7" : ""}`}>
            <span
              className={`absolute rounded-full border-[3px] border-slate-900 ${
                isSpot ? "h-4 w-4 -left-[35px] top-[4px]" : "h-3 w-3 -left-[33px] top-[6px]"
              }`}
              style={{ backgroundColor: isSpot ? color : `${color}50` }}
            />

            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-mono text-sm font-bold" style={{ color }}>
                {slot.time}
              </span>
              <span className={`${isSpot ? "text-lg font-bold text-white" : "text-base font-medium text-slate-200"}`}>
                {slot.icon && <span className="mr-1">{slot.icon}</span>}
                {slot.title}
              </span>
              {slot.duration && slot.duration !== "—" && (
                <span className="rounded-lg bg-white/10 px-2.5 py-1 text-xs font-semibold text-slate-300">
                  ⏱ {slot.duration}
                </span>
              )}
            </div>

            {slot.desc && (
              <p className="mt-1 text-sm text-slate-400">{slot.desc}</p>
            )}
            {slot.warn && (
              <p className="mt-1 text-sm font-medium text-amber-400/90">{slot.warn}</p>
            )}

            {spot && <InlineSpot spot={spot} />}
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════
   Day content
   ═══════════════════════════════════════ */

function DayContent({ day, index }: { day: DayPlan; index: number }) {
  const color = DAY_COLORS[index % DAY_COLORS.length];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <span
          className="flex h-12 w-12 items-center justify-center rounded-xl text-base font-bold text-white"
          style={{ backgroundColor: color }}
        >
          {day.day === 0 ? "N0" : `D${day.day}`}
        </span>
        <div>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">{day.title}</h2>
          <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-slate-400">
            <span className="font-medium">{day.date} {day.weekday}</span>
            <span className="text-slate-600">·</span>
            <span>{day.theme}</span>
            <span className="text-slate-600">·</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-sky-500/10 border border-sky-500/20 px-2.5 py-0.5 font-medium text-sky-300">
              {day.weatherIcon} {day.weather}
            </span>
          </div>
        </div>
      </div>

      <ButlerSays>{day.butlerIntro}</ButlerSays>

      {day.day === 0 && <PrepSection />}

      <MergedTimeline day={day} color={color} />

      <div className="mt-10 space-y-5">
        {day.foodTips.length > 0 && (
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6">
            <h4 className="mb-3 text-sm font-bold text-amber-300">🍽️ 小管家的美食推荐</h4>
            <ul className="space-y-2.5">
              {day.foodTips.map((t, i) => (
                <li key={i} className="flex items-start gap-2.5 text-base text-amber-200/70">
                  <span className="mt-1.5 text-amber-400">•</span>{t}
                </li>
              ))}
            </ul>
          </div>
        )}

        {day.stayArea !== "—" && (
          <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6">
            <h4 className="mb-3 text-sm font-bold text-violet-300">🏨 今晚住哪 · 小管家建议</h4>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-violet-500/20 border border-violet-500/25 px-3.5 py-1 text-sm font-semibold text-violet-300">
                📍 {day.stayArea}
              </span>
              <span className={`rounded-full border px-3.5 py-1 text-sm font-semibold ${
                day.stayType === "民宿"
                  ? "bg-emerald-500/20 border-emerald-500/25 text-emerald-300"
                  : "bg-sky-500/20 border-sky-500/25 text-sky-300"
              }`}>
                建议选 {day.stayType}
              </span>
            </div>
            <p className="text-base text-violet-200/60 leading-relaxed">{day.stayNote}</p>
          </div>
        )}

        {day.endNote && (
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm text-slate-300 leading-relaxed">💡 {day.endNote}</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   Cost section
   ═══════════════════════════════════════ */

function CostSection() {
  const total = TRIP.costs.reduce((s, c) => {
    const n = parseInt(c.perPerson.replace(/[^0-9]/g, ""));
    return s + (isNaN(n) ? 0 : n);
  }, 0);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h2 className="mb-2 text-center text-2xl font-bold text-white">💰 费用估算</h2>
      <p className="mb-6 text-center text-base text-slate-400">{TRIP.people}人分摊，小管家帮你算好啦</p>

      <ButlerSays>人均约 ￥{total}，这条线路性价比非常高~</ButlerSays>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
        <table className="w-full text-base">
          <thead>
            <tr className="border-b border-white/[0.08] bg-white/[0.04]">
              <th className="px-5 py-3.5 text-left text-sm font-semibold text-slate-400">项目</th>
              <th className="px-5 py-3.5 text-center text-sm font-semibold text-slate-500">总费用</th>
              <th className="px-5 py-3.5 text-right text-sm font-semibold text-amber-400">人均</th>
            </tr>
          </thead>
          <tbody>
            {TRIP.costs.map((c, i) => (
              <tr key={i} className={i < TRIP.costs.length - 1 ? "border-b border-white/[0.05]" : ""}>
                <td className="px-5 py-3.5 text-slate-300">{c.label}</td>
                <td className="px-5 py-3.5 text-center text-slate-500">{c.total}</td>
                <td className="px-5 py-3.5 text-right font-bold text-amber-300">{c.perPerson}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-amber-500/20 bg-amber-500/5">
              <td className="px-5 py-4 text-lg font-bold text-white">合计</td>
              <td />
              <td className="px-5 py-4 text-right text-xl font-bold text-amber-400">≈ ￥{total}/人</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   Report tab
   ═══════════════════════════════════════ */

function ReportSection() {
  const visited = REPORT_DATA.filter((r) => r.visited);
  const missed = REPORT_DATA.filter((r) => !r.visited);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h2 className="mb-2 text-center text-2xl font-bold text-white">YQY 的靠谱分析</h2>
      <p className="mb-6 text-center text-base text-slate-400">
        小红书 + 抖音热推景点 vs 我们的行程
      </p>

      <ButlerSays>
        翻遍了皖南自驾的热门推荐，{REPORT_DATA.length} 个必去景点我们覆盖了
        <span className="font-bold text-emerald-400"> {visited.length} 个</span>！
        剩下没去的都有充分理由——跟着小管家走，这趟绝对不亏~
      </ButlerSays>

      <div className="mb-8 grid grid-cols-3 gap-3">
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 py-5 text-center">
          <div className="text-3xl font-bold text-emerald-400">{visited.length}/{REPORT_DATA.length}</div>
          <div className="mt-1 text-sm text-slate-400">景点覆盖</div>
        </div>
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 py-5 text-center">
          <div className="text-3xl font-bold text-amber-400">1/1</div>
          <div className="mt-1 text-sm text-slate-400">世界遗产</div>
        </div>
        <div className="rounded-2xl border border-pink-500/20 bg-pink-500/5 py-5 text-center">
          <div className="text-3xl font-bold text-pink-400">4</div>
          <div className="mt-1 text-sm text-slate-400">抖音爆火</div>
        </div>
      </div>

      <h3 className="mb-4 text-base font-bold text-emerald-400">✅ 我们去了这些</h3>
      <div className="mb-8 space-y-2.5">
        {visited.map((r) => (
          <div key={r.name} className="rounded-xl border border-emerald-500/15 bg-emerald-500/5 px-5 py-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-base font-bold text-white">{r.name}</span>
              <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-300">{r.visitDay}</span>
              <span className="text-sm text-slate-500">{r.platform}</span>
              <span className="text-sm text-amber-400/70">{"★".repeat(r.heat)}{"☆".repeat(5 - r.heat)}</span>
            </div>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">{r.desc}</p>
            <p className="mt-1 text-sm font-medium text-emerald-300/70">→ {r.note}</p>
          </div>
        ))}
      </div>

      <h3 className="mb-4 text-base font-bold text-slate-500">❌ 这次没去的（有充分理由）</h3>
      <div className="mb-8 space-y-2.5">
        {missed.map((r) => (
          <div key={r.name} className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-5 py-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-base font-medium text-slate-300">{r.name}</span>
              <span className="text-sm text-amber-400/40">{"★".repeat(r.heat)}{"☆".repeat(5 - r.heat)}</span>
            </div>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">{r.desc}</p>
            <p className="mt-1 text-sm text-red-400/60">为什么没去：{r.note}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-8 text-center">
        <div className="mb-3 text-4xl">🏆</div>
        <h3 className="mb-3 text-xl font-bold text-white">小管家的结论</h3>
        <p className="text-base leading-relaxed text-amber-200/70">
          我们的路线 = <span className="font-bold text-emerald-400">皖南川藏线完整版</span> +
          <span className="font-bold text-amber-400"> 宏村世界遗产</span> +
          <span className="font-bold text-pink-400"> 4个抖音爆火景点</span>。
          <br className="hidden sm:block" />
          自然风光和人文精华都有了，古镇只留最有代表性的，不重复不浪费。
        </p>
        <p className="mt-4 text-lg font-bold text-white">这一趟，绝对不后悔！</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   Main page
   ═══════════════════════════════════════ */

type Tab = "itinerary" | "report";

export default function TravelPage() {
  const [accepted, setAccepted] = useState(false);
  const [tab, setTab] = useState<Tab>("itinerary");
  const [dayIdx, setDayIdx] = useState(0);

  useEffect(() => {
    if (accepted) playTrack("main");
    return () => { if (accepted) stopAll(); };
  }, [accepted]);

  if (!accepted) return <InvitationPage onAccept={() => setAccepted(true)} />;

  return (
    <>
      <TravelHero />

      <div className="sticky top-0 z-30 border-b border-white/10 bg-slate-900/90 backdrop-blur-lg">
        <div className="mx-auto flex max-w-3xl items-center justify-center gap-1.5 px-4 py-2.5">
          {([
            { id: "itinerary" as Tab, label: "🗺️ 行程计划" },
            { id: "report" as Tab, label: "📊 YQY的靠谱分析" },
          ]).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-full px-6 py-2.5 text-base font-bold transition-all ${
                tab === t.id
                  ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                  : "text-slate-500 hover:bg-white/[0.06] hover:text-slate-300 border border-transparent"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "itinerary" && (
          <div className="border-t border-white/[0.06]">
            <div className="mx-auto flex max-w-3xl items-center justify-center gap-1 overflow-x-auto px-4 py-2">
              {TRIP.days.map((day, i) => (
                <button
                  key={day.day}
                  onClick={() => setDayIdx(i)}
                  className={`flex flex-shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                    dayIdx === i
                      ? "bg-white/10 text-white"
                      : "text-slate-500 hover:bg-white/[0.05] hover:text-slate-300"
                  }`}
                >
                  <span
                    className="flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold text-white"
                    style={{ backgroundColor: DAY_COLORS[i], opacity: dayIdx === i ? 1 : 0.4 }}
                  >
                    {day.day === 0 ? "N" : day.day}
                  </span>
                  <span className="hidden sm:inline">{day.date} {day.weekday}</span>
                  <span className="sm:hidden">{DAY_LABELS[i]}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {tab === "itinerary" ? (
        <>
          <DayContent day={TRIP.days[dayIdx]} index={dayIdx} />
          <div className="mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <CostSection />
        </>
      ) : (
        <ReportSection />
      )}

      <footer className="border-t border-white/[0.08] px-4 py-10 text-center">
        <ButlerSays>攻略已就绪！有问题随时找小管家~ 祝各位冒险者旅途愉快，安徽见！🚗✨</ButlerSays>
        <p className="text-sm text-slate-500">
          小管家 miniYQY · {TRIP.dateRange} · 数据来源：小红书 / 抖音 / 各旅游平台
        </p>
      </footer>
    </>
  );
}
