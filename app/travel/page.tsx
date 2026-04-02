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
  TimeSlot,
} from "@/components/travel/travelData";

/* ═══════════════════════════════════════
   Shared primitives
   ═══════════════════════════════════════ */

function ButlerSays({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-5 flex items-start gap-2.5">
      <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-xs">
        🧑‍💼
      </span>
      <p className="rounded-2xl rounded-tl-sm bg-white/[0.04] px-4 py-2.5 text-sm leading-relaxed text-slate-300">
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
      className="flex-shrink-0 rounded-md bg-white/[0.06] px-2.5 py-1 text-[11px] text-slate-500 transition hover:bg-white/10 hover:text-white active:scale-95"
    >
      {ok ? "✓ 已复制" : "复制"}
    </button>
  );
}

const DAY_COLORS = ["#8B5CF6", "#F59E0B", "#10B981", "#3B82F6"];
const DAY_LABELS = ["Night 0", "Day 1", "Day 2", "Day 3"];

/* ═══════════════════════════════════════
   Inline spot card (embedded in timeline)
   ═══════════════════════════════════════ */

function InlineSpot({ spot }: { spot: Spot }) {
  const [img, setImg] = useState(0);
  return (
    <div className="mt-2 mb-1 overflow-hidden rounded-2xl bg-white/[0.03]">
      {/* Hero image */}
      <div className="relative aspect-[16/9] max-h-56 overflow-hidden">
        <img
          src={spot.images[img]}
          alt={spot.name}
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
        {spot.badge && (
          <span className="absolute top-3 left-3 rounded-md bg-black/50 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
            {spot.badge}
          </span>
        )}
        {spot.images.length > 1 && (
          <div className="absolute bottom-3 right-3 flex gap-1.5">
            {spot.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setImg(i)}
                className={`h-1.5 rounded-full transition-all ${i === img ? "w-5 bg-white" : "w-1.5 bg-white/40"}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-4 p-5">
        <p className="text-[13px] leading-relaxed text-slate-400">{spot.desc}</p>

        {/* Tips grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-emerald-500/80">怎么玩</h4>
            <ul className="space-y-1.5">
              {spot.playTips.map((t, i) => (
                <li key={i} className="text-[12px] leading-relaxed text-slate-400">
                  <span className="mr-1.5 text-emerald-600/50">·</span>{t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-sky-500/80">拍什么</h4>
            <ul className="space-y-1.5">
              {spot.photoTips.map((t, i) => (
                <li key={i} className="text-[12px] leading-relaxed text-slate-400">
                  <span className="mr-1.5 text-sky-600/50">·</span>{t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Nav */}
        <div className="flex items-center gap-2 rounded-lg bg-white/[0.03] px-3 py-2">
          <span className="text-[11px] text-slate-600">📍</span>
          <span className="min-w-0 flex-1 truncate text-[11px] text-slate-500">{spot.navAddress}</span>
          <CopyBtn text={spot.navAddress} />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   Prep section (Day 1 only: packing + tips)
   ═══════════════════════════════════════ */

function PrepSection() {
  const [open, setOpen] = useState(true);
  return (
    <div className="mb-8 rounded-2xl bg-amber-500/[0.04] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/15 text-sm">📋</span>
          <span className="text-sm font-semibold text-white">出发前必看</span>
        </div>
        <svg
          className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="space-y-5 border-t border-white/[0.04] px-5 pb-5 pt-4">
          {/* Packing list */}
          <div>
            <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-amber-500/60">行李清单</h4>
            <div className="grid gap-3 sm:grid-cols-2">
              {PACKING_LIST.map((cat) => (
                <div key={cat.category} className="rounded-xl bg-white/[0.03] p-3.5">
                  <div className="mb-2 text-[11px] font-semibold text-slate-300">{cat.icon} {cat.category}</div>
                  <ul className="space-y-1">
                    {cat.items.map((item) => (
                      <li key={item.name} className="flex items-start gap-2 text-[11px]">
                        <span className={`mt-0.5 ${item.required ? "text-amber-400" : "text-slate-700"}`}>
                          {item.required ? "●" : "○"}
                        </span>
                        <span className={item.required ? "text-slate-300" : "text-slate-500"}>{item.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div>
            <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-amber-500/60">出发提醒</h4>
            <div className="space-y-2">
              {TRIP.tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-2.5 text-[12px] text-slate-400">
                  <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded text-[9px] font-bold text-amber-500/60 bg-amber-500/10">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{tip}</span>
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
    <div className="relative ml-3 pl-6 border-l border-white/[0.06]">
      {day.schedule.map((slot, i) => {
        const spot = slot.spotRef ? spotMap.get(slot.spotRef) : null;
        const isSpot = !!spot;
        return (
          <div key={i} className={`relative ${i < day.schedule.length - 1 ? "pb-5" : ""}`}>
            {/* Dot */}
            <span
              className={`absolute -left-[27px] top-[5px] rounded-full border-2 border-slate-900 ${isSpot ? "h-3 w-3" : "h-2 w-2 -left-[25px] top-[7px]"}`}
              style={{ backgroundColor: isSpot ? color : `${color}60` }}
            />

            {/* Time + title row */}
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span className="font-mono text-[11px] font-medium" style={{ color: `${color}B0` }}>
                {slot.time}
              </span>
              <span className={`text-[13px] ${isSpot ? "font-semibold text-white" : "text-slate-300"}`}>
                {slot.icon && <span className="mr-1">{slot.icon}</span>}
                {slot.title}
              </span>
              {slot.duration && slot.duration !== "—" && (
                <span className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] text-slate-500">
                  {slot.duration}
                </span>
              )}
            </div>

            {/* Description */}
            {slot.desc && (
              <p className="mt-0.5 text-[11px] text-slate-600">{slot.desc}</p>
            )}
            {slot.warn && (
              <p className="mt-0.5 text-[11px] text-amber-500/70">{slot.warn}</p>
            )}

            {/* Inline spot card */}
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
      {/* Day header */}
      <div className="mb-2 flex flex-wrap items-center gap-3">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white"
          style={{ backgroundColor: color }}
        >
          {day.day === 0 ? "N0" : `D${day.day}`}
        </span>
        <div>
          <h2 className="text-lg font-bold text-white sm:text-xl">{day.title}</h2>
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span>{day.date} {day.weekday}</span>
            <span>·</span>
            <span>{day.theme}</span>
            <span>·</span>
            <span>{day.weatherIcon} {day.weather}</span>
          </div>
        </div>
      </div>

      <ButlerSays>{day.butlerIntro}</ButlerSays>

      {/* Prep section — Day 1 only */}
      {day.day === 1 && <PrepSection />}

      {/* Merged timeline */}
      <MergedTimeline day={day} color={color} />

      {/* Footer: food + stay */}
      <div className="mt-8 space-y-4">
        {/* Food */}
        {day.foodTips.length > 0 && (
          <div className="rounded-2xl bg-white/[0.03] p-5">
            <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-amber-500/60">美食推荐</h4>
            <ul className="space-y-1.5">
              {day.foodTips.map((t, i) => (
                <li key={i} className="text-[12px] text-slate-400">
                  <span className="mr-1.5 text-amber-600/40">·</span>{t}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Stay */}
        {day.stayArea !== "—" && (
          <div className="rounded-2xl bg-white/[0.03] p-5">
            <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-violet-500/60">今晚住哪</h4>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-violet-500/10 px-2 py-0.5 text-[11px] font-medium text-violet-400">
                {day.stayArea}
              </span>
              <span className={`rounded-md px-2 py-0.5 text-[11px] font-medium ${
                day.stayType === "民宿"
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-sky-500/10 text-sky-400"
              }`}>
                建议{day.stayType}
              </span>
            </div>
            <p className="text-[12px] text-slate-500 leading-relaxed">{day.stayNote}</p>
          </div>
        )}

        {/* End note */}
        {day.endNote && (
          <p className="text-[11px] text-slate-600 leading-relaxed">💡 {day.endNote}</p>
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
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h2 className="mb-1 text-center text-xl font-bold text-white">费用估算</h2>
      <p className="mb-5 text-center text-[12px] text-slate-600">{TRIP.people}人分摊</p>
      <div className="overflow-hidden rounded-2xl bg-white/[0.03]">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-white/[0.04]">
              <th className="px-5 py-3 text-left text-[11px] font-medium text-slate-500">项目</th>
              <th className="px-5 py-3 text-center text-[11px] font-medium text-slate-600">总计</th>
              <th className="px-5 py-3 text-right text-[11px] font-medium text-amber-500/70">人均</th>
            </tr>
          </thead>
          <tbody>
            {TRIP.costs.map((c, i) => (
              <tr key={i} className={i < TRIP.costs.length - 1 ? "border-b border-white/[0.03]" : ""}>
                <td className="px-5 py-2.5 text-slate-400">{c.label}</td>
                <td className="px-5 py-2.5 text-center text-slate-600">{c.total}</td>
                <td className="px-5 py-2.5 text-right font-medium text-amber-400">{c.perPerson}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-amber-500/10 bg-amber-500/[0.04]">
              <td className="px-5 py-3 font-semibold text-white">合计</td>
              <td />
              <td className="px-5 py-3 text-right text-lg font-bold text-amber-400">≈ ￥{total}/人</td>
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
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h2 className="mb-1 text-center text-2xl font-bold text-white">YQY 的靠谱分析</h2>
      <p className="mb-6 text-center text-[13px] text-slate-500">
        小红书 + 抖音热推景点 vs 我们的行程
      </p>

      <ButlerSays>
        翻遍了皖南自驾的热门推荐，{REPORT_DATA.length} 个必去景点我们覆盖了
        <span className="font-semibold text-emerald-400"> {visited.length} 个</span>。
        剩下没去的都有充分理由——跟着小管家走，这趟绝对不亏。
      </ButlerSays>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-3 gap-3">
        {[
          { value: `${visited.length}/${REPORT_DATA.length}`, label: "景点覆盖", color: "emerald" },
          { value: "1/1", label: "世界遗产", color: "amber" },
          { value: "4", label: "抖音爆火", color: "pink" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl bg-white/[0.03] py-4 text-center">
            <div className={`text-2xl font-bold text-${s.color}-400`}>{s.value}</div>
            <div className="text-[11px] text-slate-600">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Visited */}
      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-emerald-500/60">我们去了</h3>
      <div className="mb-8 space-y-2">
        {visited.map((r) => (
          <div key={r.name} className="rounded-xl bg-emerald-500/[0.04] px-4 py-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[13px] font-semibold text-white">{r.name}</span>
              <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-medium text-emerald-400">{r.visitDay}</span>
              <span className="text-[10px] text-amber-400/60">{"★".repeat(r.heat)}{"☆".repeat(5 - r.heat)}</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-500">{r.desc}</p>
          </div>
        ))}
      </div>

      {/* Missed */}
      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-slate-600">没去的（有理由）</h3>
      <div className="mb-8 space-y-2">
        {missed.map((r) => (
          <div key={r.name} className="rounded-xl bg-white/[0.02] px-4 py-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[13px] text-slate-400">{r.name}</span>
              <span className="text-[10px] text-amber-400/30">{"★".repeat(r.heat)}{"☆".repeat(5 - r.heat)}</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-600">{r.desc}</p>
            <p className="mt-0.5 text-[11px] text-red-400/50">→ {r.note}</p>
          </div>
        ))}
      </div>

      {/* Conclusion */}
      <div className="rounded-2xl bg-amber-500/[0.04] p-6 text-center">
        <h3 className="mb-2 text-lg font-bold text-white">小管家的结论</h3>
        <p className="text-[13px] leading-relaxed text-slate-400">
          我们的路线 = <span className="text-emerald-400">皖南川藏线完整版</span> +
          <span className="text-amber-400"> 宏村世界遗产</span> +
          <span className="text-pink-400"> 4个抖音爆火景点</span>。
          自然风光和人文精华都有了，古镇只留最有代表性的，不重复不浪费。
        </p>
        <p className="mt-3 text-sm font-semibold text-white">这一趟，绝对不后悔。</p>
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

      {/* ── Sticky nav ── */}
      <div className="sticky top-0 z-30 border-b border-white/[0.06] bg-slate-900/90 backdrop-blur-lg">
        {/* Main tabs */}
        <div className="mx-auto flex max-w-3xl items-center justify-center gap-1 px-4 py-2">
          {([
            { id: "itinerary" as Tab, label: "行程计划" },
            { id: "report" as Tab, label: "YQY的靠谱分析" },
          ]).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-full px-5 py-1.5 text-[13px] font-medium transition-all ${
                tab === t.id
                  ? "bg-white/10 text-white"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Day sub-tabs */}
        {tab === "itinerary" && (
          <div className="border-t border-white/[0.04]">
            <div className="mx-auto flex max-w-3xl items-center justify-center gap-0.5 overflow-x-auto px-4 py-1.5">
              {TRIP.days.map((day, i) => (
                <button
                  key={day.day}
                  onClick={() => setDayIdx(i)}
                  className={`flex flex-shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium transition-all ${
                    dayIdx === i
                      ? "bg-white/[0.08] text-white"
                      : "text-slate-600 hover:text-slate-400"
                  }`}
                >
                  <span
                    className="flex h-4 w-4 items-center justify-center rounded text-[8px] font-bold text-white"
                    style={{ backgroundColor: DAY_COLORS[i], opacity: dayIdx === i ? 1 : 0.5 }}
                  >
                    {day.day === 0 ? "N" : day.day}
                  </span>
                  <span className="hidden sm:inline">{day.date}</span>
                  <span className="sm:hidden">{DAY_LABELS[i]}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Content ── */}
      {tab === "itinerary" ? (
        <>
          <DayContent day={TRIP.days[dayIdx]} index={dayIdx} />
          <div className="mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          <CostSection />
        </>
      ) : (
        <ReportSection />
      )}

      {/* Footer */}
      <footer className="border-t border-white/[0.04] px-4 py-10 text-center">
        <ButlerSays>攻略就绪！有问题随时找小管家，祝各位冒险者旅途愉快，安徽见 🚗</ButlerSays>
        <p className="text-[11px] text-slate-700">
          miniYQY · {TRIP.dateRange} · 数据来源：小红书 / 抖音 / 各旅游平台
        </p>
      </footer>
    </>
  );
}
