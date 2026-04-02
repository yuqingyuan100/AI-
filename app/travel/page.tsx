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

// ── Shared components ──

function ButlerSays({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-start gap-2.5">
      <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-xs">
        🧑‍💼
      </span>
      <p className="rounded-xl rounded-tl-sm border border-amber-400/10 bg-amber-500/5 px-3.5 py-2 text-sm leading-relaxed text-amber-200/80">
        {children}
      </p>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [text]);
  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-400 transition-all hover:bg-white/10 hover:text-white active:scale-95"
    >
      {copied ? (
        <>
          <svg className="h-3 w-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          <span className="text-emerald-400">已复制</span>
        </>
      ) : (
        <>
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
          复制导航
        </>
      )}
    </button>
  );
}

const DAY_COLORS = ["#8B5CF6", "#F59E0B", "#10B981", "#3B82F6"];
const DAY_LABELS = ["Night 0", "Day 1", "Day 2", "Day 3"];

const BADGE_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  "必去！全网推荐": { bg: "bg-red-500/15", text: "text-red-400", border: "border-red-500/30" },
  "必去！世界文化遗产": { bg: "bg-amber-500/15", text: "text-amber-400", border: "border-amber-500/30" },
  "必去！美食圣地": { bg: "bg-orange-500/15", text: "text-orange-400", border: "border-orange-500/30" },
  "抖音爆火": { bg: "bg-pink-500/15", text: "text-pink-400", border: "border-pink-500/30" },
  "抖音爆火 · 免费": { bg: "bg-pink-500/15", text: "text-pink-400", border: "border-pink-500/30" },
  "摄影推荐": { bg: "bg-sky-500/15", text: "text-sky-400", border: "border-sky-500/30" },
  "经典人文": { bg: "bg-violet-500/15", text: "text-violet-400", border: "border-violet-500/30" },
  "小众免费": { bg: "bg-emerald-500/15", text: "text-emerald-400", border: "border-emerald-500/30" },
};

function BadgeTag({ badge }: { badge: string }) {
  const s = BADGE_STYLES[badge] ?? { bg: "bg-white/10", text: "text-white", border: "border-white/20" };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${s.bg} ${s.text} ${s.border}`}>
      {badge.includes("必去") && <span>🔥</span>}
      {badge}
    </span>
  );
}

// ── Spot card with images, tips, nav ──

function SpotCard({ spot }: { spot: Spot }) {
  const [imgIdx, setImgIdx] = useState(0);
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
      {/* Image carousel */}
      <div className="relative h-44 overflow-hidden sm:h-52">
        <img
          src={spot.images[imgIdx]}
          alt={spot.name}
          className="h-full w-full object-cover transition-all duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
        {spot.images.length > 1 && (
          <div className="absolute bottom-2 right-3 flex gap-1">
            {spot.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setImgIdx(i)}
                className={`h-1.5 rounded-full transition-all ${i === imgIdx ? "w-4 bg-white" : "w-1.5 bg-white/40"}`}
              />
            ))}
          </div>
        )}
        <div className="absolute bottom-2 left-3 flex items-center gap-2">
          <span className="text-base font-bold text-white">{spot.name}</span>
        </div>
        {spot.badge && (
          <div className="absolute top-2 left-2">
            <BadgeTag badge={spot.badge} />
          </div>
        )}
      </div>

      <div className="space-y-3 p-4">
        <p className="text-xs text-slate-400 leading-relaxed">{spot.desc}</p>

        {/* Play tips */}
        <div>
          <h4 className="mb-1.5 text-xs font-bold text-emerald-400">🎮 怎么玩</h4>
          <ul className="space-y-1">
            {spot.playTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-1.5 text-[11px] text-slate-400">
                <span className="mt-0.5 text-emerald-500/60">•</span>{tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Photo tips */}
        <div>
          <h4 className="mb-1.5 text-xs font-bold text-sky-400">📸 拍什么</h4>
          <ul className="space-y-1">
            {spot.photoTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-1.5 text-[11px] text-slate-400">
                <span className="mt-0.5 text-sky-500/60">•</span>{tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Nav address */}
        <div className="flex items-center justify-between gap-2 rounded-lg bg-white/[0.03] border border-white/5 px-3 py-2">
          <div className="min-w-0 flex-1">
            <div className="text-[10px] text-slate-600 mb-0.5">📍 司机导航定位</div>
            <div className="truncate text-[11px] text-slate-400">{spot.navAddress}</div>
          </div>
          <CopyButton text={spot.navAddress} />
        </div>
      </div>
    </div>
  );
}

// ── Packing list (collapsible) ──

function PackingListSection() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-amber-500/5"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">🎒</span>
          <span className="text-sm font-bold text-amber-300">出发必带清单</span>
          <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] font-bold text-red-400">重要</span>
        </div>
        <svg
          className={`h-4 w-4 text-amber-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="border-t border-amber-500/10 px-4 pb-4 pt-2">
          <div className="grid gap-3 sm:grid-cols-2">
            {PACKING_LIST.map((cat) => (
              <div key={cat.category} className="rounded-xl bg-white/[0.03] p-3">
                <h4 className="mb-2 text-xs font-bold text-white">{cat.icon} {cat.category}</h4>
                <ul className="space-y-1">
                  {cat.items.map((item) => (
                    <li key={item.name} className="flex items-start gap-1.5 text-[11px]">
                      <span className={item.required ? "text-red-400" : "text-slate-600"}>
                        {item.required ? "●" : "○"}
                      </span>
                      <span className={item.required ? "text-amber-200/80" : "text-slate-500"}>
                        {item.name}
                        {item.required && <span className="ml-1 text-[9px] text-red-400/70">必带</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Day section ──

function DayContent({ day, index }: { day: DayPlan; index: number }) {
  const color = DAY_COLORS[index % DAY_COLORS.length];

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
      {/* Day header */}
      <div className="mb-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3 rounded-2xl px-4 py-2.5" style={{ backgroundColor: `${color}15`, border: `1px solid ${color}30` }}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: color }}>
            {day.day === 0 ? "N0" : `D${day.day}`}
          </span>
          <div>
            <div className="text-sm font-bold text-white">{day.date} {day.weekday}</div>
            <div className="text-[11px] text-slate-400">{day.theme}</div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-base font-bold text-white sm:text-lg">{day.title}</h2>
          <span className="inline-flex items-center gap-1 rounded-full bg-sky-500/10 border border-sky-400/20 px-2.5 py-0.5 text-[11px] text-sky-300">
            {day.weatherIcon} {day.weather}
          </span>
        </div>
      </div>

      <ButlerSays>{day.butlerIntro}</ButlerSays>

      {/* Packing list (only Day 1) */}
      {day.day === 1 && <PackingListSection />}

      {/* Timeline */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
        <h3 className="mb-4 text-xs font-medium text-slate-500">📋 时间安排</h3>
        <div className="relative ml-2.5 border-l-2 pl-5" style={{ borderColor: `${color}40` }}>
          {day.schedule.map((slot, i) => (
            <div key={i} className="relative mb-4 last:mb-0">
              <span className="absolute -left-[25px] top-1 h-2.5 w-2.5 rounded-full border-2 border-slate-900" style={{ backgroundColor: color }} />
              <div className="flex flex-col gap-0.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono font-bold" style={{ color }}>{slot.time}</span>
                  {slot.icon && <span className="text-sm">{slot.icon}</span>}
                  {slot.duration && slot.duration !== "—" && (
                    <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-medium text-slate-400">
                      ⏱ {slot.duration}
                    </span>
                  )}
                </div>
                <span className="text-sm font-medium text-white">{slot.title}</span>
                {slot.desc && <span className="text-[11px] text-slate-500">{slot.desc}</span>}
                {slot.warn && <span className="text-[11px] text-amber-400/80">{slot.warn}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spots gallery */}
      {day.spots.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-3 text-xs font-medium text-slate-500">📸 景点攻略 · 怎么玩+拍什么+导航</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {day.spots.map((spot) => <SpotCard key={spot.name} spot={spot} />)}
          </div>
        </div>
      )}

      {/* Food tips */}
      {day.foodTips.length > 0 && (
        <div className="mt-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
          <h3 className="mb-2 text-xs font-bold text-amber-300">🍽️ 小管家的美食推荐</h3>
          <ul className="space-y-1.5">
            {day.foodTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-1.5 text-[11px] text-amber-200/70">
                <span className="mt-0.5 text-amber-400">•</span>{tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Stay recommendation */}
      {day.stayArea !== "—" && (
        <div className="mt-4 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-4">
          <h3 className="mb-2 text-xs font-bold text-violet-300">🏨 今晚住哪 · 小管家建议</h3>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="rounded-full bg-violet-500/20 px-2.5 py-0.5 text-[11px] font-bold text-violet-300">
              📍 {day.stayArea}
            </span>
            <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
              day.stayType === "民宿" ? "bg-emerald-500/20 text-emerald-300" : "bg-sky-500/20 text-sky-300"
            }`}>
              建议选 {day.stayType}
            </span>
          </div>
          <p className="text-[11px] text-violet-200/70">{day.stayNote}</p>
        </div>
      )}

      {/* End note */}
      {day.endNote && (
        <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <p className="text-[11px] text-slate-400 leading-relaxed">💡 {day.endNote}</p>
        </div>
      )}
    </div>
  );
}

// ── Cost section ──

function CostSection() {
  const totalPerPerson = TRIP.costs.reduce((sum, c) => {
    const num = parseInt(c.perPerson.replace(/[^0-9]/g, ""));
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h2 className="mb-4 text-center text-xl font-bold text-white">💰 费用估算</h2>
      <ButlerSays>人均约 ￥1200，比最初方案省了近 ￥300！主要是砍掉了重复古镇的门票~</ButlerSays>
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03]">
              <th className="px-4 py-2.5 text-left text-[11px] font-medium text-slate-400">项目</th>
              <th className="px-4 py-2.5 text-center text-[11px] font-medium text-slate-400">总费用</th>
              <th className="px-4 py-2.5 text-right text-[11px] font-medium text-amber-400">人均</th>
            </tr>
          </thead>
          <tbody>
            {TRIP.costs.map((item, i) => (
              <tr key={i} className={i < TRIP.costs.length - 1 ? "border-b border-white/5" : ""}>
                <td className="px-4 py-2.5 text-xs text-slate-300">{item.label}</td>
                <td className="px-4 py-2.5 text-center text-xs text-slate-500">{item.total}</td>
                <td className="px-4 py-2.5 text-right text-xs font-bold text-amber-300">{item.perPerson}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-amber-500/20 bg-amber-500/5">
              <td className="px-4 py-2.5 text-xs font-bold text-white">合计</td>
              <td className="px-4 py-2.5 text-center text-xs text-slate-500">—</td>
              <td className="px-4 py-2.5 text-right text-base font-bold text-amber-400">≈ ￥{totalPerPerson}/人</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

// ── Tips section ──

function TipsSection() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
      <h2 className="mb-4 text-center text-xl font-bold text-white">📝 出发前必看</h2>
      <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
        <div className="space-y-2.5">
          {TRIP.tips.map((tip, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-[9px] font-bold text-amber-400">
                {i + 1}
              </span>
              <p className="text-xs text-amber-200/80 leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Report tab ──

function ReportSection() {
  const visitedCount = REPORT_DATA.filter((r) => r.visited).length;
  const totalCount = REPORT_DATA.length;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <h2 className="mb-2 text-center text-2xl font-bold text-white">YQY 的靠谱分析</h2>
      <p className="mb-6 text-center text-sm text-slate-400">
        小红书 + 抖音热推景点 vs 我们的行程，看看覆盖了多少
      </p>

      <ButlerSays>
        我翻遍了小红书和抖音上皖南自驾的热门推荐，总共 {totalCount} 个必去景点，
        我们这趟覆盖了 <span className="font-bold text-emerald-400">{visitedCount} 个</span>！
        剩下没去的都有充分理由。跟着小管家走，这趟绝对不亏~
      </ButlerSays>

      {/* Summary stats */}
      <div className="mb-6 grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-center">
          <div className="text-2xl font-bold text-emerald-400">{visitedCount}/{totalCount}</div>
          <div className="text-[11px] text-slate-400">景点覆盖</div>
        </div>
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-center">
          <div className="text-2xl font-bold text-amber-400">2/2</div>
          <div className="text-[11px] text-slate-400">世界遗产</div>
        </div>
        <div className="rounded-xl border border-pink-500/20 bg-pink-500/5 p-3 text-center">
          <div className="text-2xl font-bold text-pink-400">4</div>
          <div className="text-[11px] text-slate-400">抖音爆火</div>
        </div>
      </div>

      {/* Visited */}
      <h3 className="mb-3 text-sm font-bold text-emerald-400">✅ 我们去了这些</h3>
      <div className="mb-6 space-y-2">
        {REPORT_DATA.filter((r) => r.visited).map((r) => (
          <div key={r.name} className="flex items-start gap-3 rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-3">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-bold text-white">{r.name}</span>
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300">{r.visitDay}</span>
                <span className="text-[10px] text-slate-500">{r.platform}</span>
                <span className="text-[10px] text-amber-400">{"★".repeat(r.heat)}{"☆".repeat(5 - r.heat)}</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-400">{r.desc}</p>
              <p className="mt-0.5 text-[11px] text-emerald-300/70">→ {r.note}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Not visited */}
      <h3 className="mb-3 text-sm font-bold text-slate-500">❌ 这次没去的（有充分理由）</h3>
      <div className="space-y-2">
        {REPORT_DATA.filter((r) => !r.visited).map((r) => (
          <div key={r.name} className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-slate-400">{r.name}</span>
                <span className="text-[10px] text-slate-600">{r.platform}</span>
                <span className="text-[10px] text-amber-400/50">{"★".repeat(r.heat)}{"☆".repeat(5 - r.heat)}</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-500">{r.desc}</p>
              <p className="mt-0.5 text-[11px] text-red-400/60">为什么没去：{r.note}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Conclusion */}
      <div className="mt-8 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 text-center">
        <div className="mb-2 text-2xl">🏆</div>
        <h3 className="mb-2 text-lg font-bold text-white">小管家的结论</h3>
        <p className="text-sm text-amber-200/80 leading-relaxed">
          我们的路线 = <span className="font-bold text-emerald-400">皖南川藏线完整版</span> +
          <span className="font-bold text-amber-400"> 宏村世界遗产</span> +
          <span className="font-bold text-pink-400"> 4个抖音爆火景点</span>。
          <br />
          自然风光和人文精华都有了，古镇只留最有代表性的，不重复不浪费。
          <br />
          <span className="mt-2 inline-block font-bold text-white">这一趟，绝对不后悔！</span>
        </p>
      </div>
    </div>
  );
}

// ═══ Main page ═══

type MainTab = "itinerary" | "report";

export default function TravelPage() {
  const [accepted, setAccepted] = useState(false);
  const [mainTab, setMainTab] = useState<MainTab>("itinerary");
  const [dayIdx, setDayIdx] = useState(0);

  useEffect(() => {
    if (accepted) playTrack("main");
    return () => { if (accepted) stopAll(); };
  }, [accepted]);

  if (!accepted) {
    return <InvitationPage onAccept={() => setAccepted(true)} />;
  }

  return (
    <>
      <TravelHero />

      {/* ── Main tab bar ── */}
      <div className="sticky top-0 z-30 border-b border-white/10 bg-slate-900/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-center gap-1 px-4 py-2">
          <button
            onClick={() => setMainTab("itinerary")}
            className={`rounded-full px-5 py-2 text-sm font-bold transition-all ${
              mainTab === "itinerary"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                : "text-slate-400 hover:bg-white/10 hover:text-white border border-transparent"
            }`}
          >
            🗺️ 行程计划
          </button>
          <button
            onClick={() => setMainTab("report")}
            className={`rounded-full px-5 py-2 text-sm font-bold transition-all ${
              mainTab === "report"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                : "text-slate-400 hover:bg-white/10 hover:text-white border border-transparent"
            }`}
          >
            📊 YQY的靠谱分析
          </button>
        </div>

        {/* Day sub-tabs (only when itinerary tab is active) */}
        {mainTab === "itinerary" && (
          <div className="border-t border-white/5">
            <div className="mx-auto flex max-w-4xl items-center justify-center gap-1 overflow-x-auto px-4 py-1.5">
              {TRIP.days.map((day, i) => (
                <button
                  key={day.day}
                  onClick={() => setDayIdx(i)}
                  className={`flex flex-shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium transition-all ${
                    dayIdx === i
                      ? "bg-white/10 text-white"
                      : "text-slate-500 hover:bg-white/5 hover:text-slate-300"
                  }`}
                >
                  <span
                    className="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold text-white"
                    style={{ backgroundColor: DAY_COLORS[i % DAY_COLORS.length] }}
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

      {/* ── Tab content ── */}
      {mainTab === "itinerary" ? (
        <>
          <DayContent day={TRIP.days[dayIdx]} index={dayIdx} />

          {/* Cost + Tips at bottom */}
          <div className="mx-auto h-px max-w-4xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <CostSection />
          <div className="mx-auto h-px max-w-4xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <TipsSection />
        </>
      ) : (
        <ReportSection />
      )}

      {/* Footer */}
      <footer className="border-t border-white/5 px-4 py-8 text-center">
        <ButlerSays>攻略已就绪！有问题随时找小管家~ 祝各位冒险者旅途愉快，安徽见！🚗✨</ButlerSays>
        <p className="text-xs text-slate-600">
          小管家 miniYQY · {TRIP.dateRange} · 数据来源：小红书 / 抖音 / 各旅游平台
        </p>
      </footer>
    </>
  );
}
