"use client";

import { useState, useEffect } from "react";
import InvitationPage from "@/components/travel/InvitationPage";
import { playTrack, stopAll } from "@/components/travel/audioManager";
import TravelHero from "@/components/travel/TravelHero";
import { TRIP, DayPlan } from "@/components/travel/travelData";

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

const DAY_COLORS = ["#8B5CF6", "#F59E0B", "#10B981", "#3B82F6"];
const DAY_BUTLER_INTROS = [
  "今晚的任务就是安全抵达泾县！到了先来碗泾县肉焖面犒劳自己~",
  "今天行程满满！古镇、诗意湖泊、湖光山色一网打尽，出发~",
  "今天是重头戏！两个世界遗产 + 屯溪老街夜游，期待值拉满！",
  "最后一天轻松收尾~ 打卡抖音爆火的西溪南后就回家啦~",
];

function DaySection({ day, index }: { day: DayPlan; index: number }) {
  const color = DAY_COLORS[index % DAY_COLORS.length];

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8" id={`day-${day.day}`}>
      <div className="mx-auto max-w-4xl">
        {/* Day header */}
        <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <div
            className="flex items-center gap-3 rounded-2xl px-5 py-3"
            style={{ backgroundColor: `${color}15`, border: `1px solid ${color}30` }}
          >
            <span
              className="flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold text-white"
              style={{ backgroundColor: color }}
            >
              {day.day === 0 ? "N0" : `D${day.day}`}
            </span>
            <div>
              <div className="text-sm font-bold text-white">
                {day.date} {day.weekday}
              </div>
              <div className="text-xs text-slate-400">{day.theme}</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-lg font-bold text-white sm:text-xl">{day.title}</h2>
            <span className="inline-flex items-center gap-1 rounded-full bg-sky-500/10 border border-sky-400/20 px-3 py-1 text-xs text-sky-300">
              {day.weatherIcon} {day.weather}
            </span>
          </div>
        </div>

        <ButlerSays>{DAY_BUTLER_INTROS[index]}</ButlerSays>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Timeline */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <h3 className="mb-4 text-sm font-medium text-slate-400">📋 时间安排</h3>
              <div className="relative ml-3 border-l-2 pl-6" style={{ borderColor: `${color}40` }}>
                {day.schedule.map((slot, i) => (
                  <div key={i} className="relative mb-5 last:mb-0">
                    <span
                      className="absolute -left-[29px] top-1 h-3 w-3 rounded-full border-2 border-slate-900"
                      style={{ backgroundColor: color }}
                    />
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold" style={{ color }}>
                          {slot.time}
                        </span>
                        {slot.icon && <span className="text-sm">{slot.icon}</span>}
                      </div>
                      <span className="text-sm font-medium text-white">{slot.title}</span>
                      {slot.desc && (
                        <span className="text-xs text-slate-500">{slot.desc}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar: food + stay */}
          <div className="space-y-4">
            {/* Food tips */}
            {day.foodTips.length > 0 && (
              <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
                <h3 className="mb-3 text-sm font-medium text-amber-300">🍽️ 小管家的美食推荐</h3>
                <ul className="space-y-2">
                  {day.foodTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-amber-200/70">
                      <span className="mt-0.5 text-amber-400">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Stay tip */}
            {day.stayTip && (
              <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5">
                <h3 className="mb-2 text-sm font-medium text-violet-300">🏨 住宿推荐</h3>
                <p className="text-xs text-violet-200/70">{day.stayTip}</p>
              </div>
            )}
          </div>
        </div>

        {/* Spot gallery */}
        {day.spots.length > 0 && (
          <div className="mt-6">
            <h3 className="mb-3 text-sm font-medium text-slate-400">📸 景点速览</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {day.spots.map((spot) => (
                <div
                  key={spot.name}
                  className="group overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all hover:border-white/20"
                >
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={spot.image}
                      alt={spot.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                    <div className="absolute bottom-2 left-3 text-sm font-bold text-white">
                      {spot.name}
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-slate-400 leading-relaxed">{spot.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function CostSection() {
  const totalPerPerson = TRIP.costs.reduce((sum, c) => {
    const num = parseInt(c.perPerson.replace(/[^0-9]/g, ""));
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-2 text-center text-2xl font-bold text-white sm:text-3xl">
          💰 费用估算
        </h2>
        <p className="mb-6 text-center text-sm text-slate-400">
          {TRIP.people}人分摊，小管家帮你算好啦
        </p>

        <ButlerSays>
          以下是每人大致花费，实际可能根据餐厅和住宿选择上下浮动。总体来说，人均1500左右就能玩得很好~
        </ButlerSays>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400">项目</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-slate-400">总费用</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-amber-400">人均</th>
              </tr>
            </thead>
            <tbody>
              {TRIP.costs.map((item, i) => (
                <tr key={i} className={i < TRIP.costs.length - 1 ? "border-b border-white/5" : ""}>
                  <td className="px-4 py-3 text-slate-300">{item.label}</td>
                  <td className="px-4 py-3 text-center text-slate-500">{item.total}</td>
                  <td className="px-4 py-3 text-right font-bold text-amber-300">{item.perPerson}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-amber-500/20 bg-amber-500/5">
                <td className="px-4 py-3 font-bold text-white">合计</td>
                <td className="px-4 py-3 text-center text-slate-500">—</td>
                <td className="px-4 py-3 text-right text-lg font-bold text-amber-400">
                  ≈ ￥{totalPerPerson}/人
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
}

function TipsSection() {
  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-2 text-center text-2xl font-bold text-white sm:text-3xl">
          📝 小管家的温馨叮嘱
        </h2>
        <p className="mb-6 text-center text-sm text-slate-400">
          出发前请各位冒险者务必看完~
        </p>

        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6">
          <div className="space-y-3">
            {TRIP.tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-[10px] font-bold text-amber-400">
                  {i + 1}
                </span>
                <p className="text-sm text-amber-200/80 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DayNav() {
  return (
    <div className="sticky top-0 z-30 border-b border-white/10 bg-slate-900/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl items-center gap-1 overflow-x-auto px-4 py-2 sm:justify-center">
        {TRIP.days.map((day, i) => (
          <a
            key={day.day}
            href={`#day-${day.day}`}
            className="flex flex-shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <span
              className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
              style={{ backgroundColor: DAY_COLORS[i % DAY_COLORS.length] }}
            >
              {day.day === 0 ? "N" : day.day}
            </span>
            <span className="hidden sm:inline">{day.date}</span>
            <span className="sm:hidden">{day.day === 0 ? "夜0" : `D${day.day}`}</span>
          </a>
        ))}
        <a
          href="#costs"
          className="flex flex-shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          💰 <span>费用</span>
        </a>
        <a
          href="#tips"
          className="flex flex-shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          📝 <span>贴士</span>
        </a>
      </div>
    </div>
  );
}

export default function TravelPage() {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    if (accepted) {
      playTrack("main");
    }
    return () => {
      if (accepted) stopAll();
    };
  }, [accepted]);

  if (!accepted) {
    return <InvitationPage onAccept={() => setAccepted(true)} />;
  }

  return (
    <>
      <TravelHero />

      <DayNav />

      {TRIP.days.map((day, i) => (
        <div key={day.day}>
          <DaySection day={day} index={i} />
          {i < TRIP.days.length - 1 && (
            <div className="mx-auto h-px max-w-4xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          )}
        </div>
      ))}

      <div className="mx-auto h-px max-w-4xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div id="costs">
        <CostSection />
      </div>

      <div className="mx-auto h-px max-w-4xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div id="tips">
        <TipsSection />
      </div>

      <footer className="border-t border-white/5 px-4 py-8 text-center">
        <ButlerSays>
          攻略已就绪！有问题随时找小管家~ 祝各位冒险者旅途愉快，安徽见！🚗✨
        </ButlerSays>
        <p className="text-sm text-slate-600">
          小管家 miniYQY · {TRIP.dateRange} · 数据来源：小红书 / 抖音 / 各旅游平台
        </p>
        <p className="mt-1 text-xs text-slate-700">
          天气预报为 2026 年 4 月实时数据 · 安全驾驶，快乐出行
        </p>
      </footer>
    </>
  );
}
