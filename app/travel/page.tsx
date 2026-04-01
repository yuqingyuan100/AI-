"use client";

import { useState, useCallback } from "react";
import TravelHero from "@/components/travel/TravelHero";
import RouteCard from "@/components/travel/RouteCard";
import RadarChart from "@/components/travel/RadarChart";
import WeightSelector, { calcWeightedScore } from "@/components/travel/WeightSelector";
import RouteDetail from "@/components/travel/RouteDetail";
import FinalChoice from "@/components/travel/FinalChoice";
import { ROUTES, DIMENSIONS, RouteScores } from "@/components/travel/travelData";

const DEFAULT_WEIGHTS: Record<keyof RouteScores, number> = {
  crowd: 3,
  scenery: 3,
  convenience: 3,
  weather: 3,
  food: 3,
  photo: 3,
};

export default function TravelPage() {
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  const [detailRouteId, setDetailRouteId] = useState<string | null>(null);
  const [weights, setWeights] = useState<Record<keyof RouteScores, number>>(DEFAULT_WEIGHTS);

  const handleWeightChange = useCallback((key: keyof RouteScores, value: number) => {
    setWeights((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleResetWeights = useCallback(() => {
    setWeights(DEFAULT_WEIGHTS);
  }, []);

  const handleSelect = useCallback((id: string) => {
    setSelectedRouteId((prev) => (prev === id ? null : id));
  }, []);

  const handleViewDetail = useCallback((id: string) => {
    setDetailRouteId(id);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setDetailRouteId(null);
  }, []);

  const handleResetSelection = useCallback(() => {
    setSelectedRouteId(null);
    setWeights(DEFAULT_WEIGHTS);
  }, []);

  const detailRoute = detailRouteId ? ROUTES.find((r) => r.id === detailRouteId) : null;
  const selectedRoute = selectedRouteId ? ROUTES.find((r) => r.id === selectedRouteId) : null;

  const rankedRoutes = [...ROUTES]
    .map((r) => ({ route: r, score: calcWeightedScore(r, weights) }))
    .sort((a, b) => b.score - a.score);

  if (detailRoute) {
    return (
      <RouteDetail
        route={detailRoute}
        onClose={handleCloseDetail}
        onSelect={handleSelect}
        isSelected={selectedRouteId === detailRoute.id}
      />
    );
  }

  return (
    <>
      <TravelHero />

      {/* Route overview cards */}
      <section id="routes" className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-2 text-center text-2xl font-bold text-white sm:text-3xl">
            四条候选线路
          </h2>
          <p className="mb-8 text-center text-slate-400">
            点击「查看详情」了解完整行程，或直接选择心仪的路线
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {rankedRoutes.map(({ route, score }, index) => (
              <RouteCard
                key={route.id}
                route={route}
                rank={index + 1}
                score={score}
                isSelected={selectedRouteId === route.id}
                onSelect={handleSelect}
                onViewDetail={handleViewDetail}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto h-px max-w-4xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Radar chart comparison */}
      <RadarChart routes={ROUTES} selectedRouteId={selectedRouteId ?? undefined} />

      {/* Divider */}
      <div className="mx-auto h-px max-w-4xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Weight selector */}
      <WeightSelector
        weights={weights}
        onWeightChange={handleWeightChange}
        routes={ROUTES}
        onReset={handleResetWeights}
      />

      {/* Final choice */}
      {selectedRoute && (
        <>
          <div className="mx-auto h-px max-w-4xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <FinalChoice
            route={selectedRoute}
            onReset={handleResetSelection}
            onViewDetail={handleViewDetail}
          />
        </>
      )}

      {/* Footer */}
      <footer className="border-t border-white/5 px-4 py-8 text-center">
        <p className="text-sm text-slate-600">
          4月4日~6日旅行提案 · 数据来源：小红书 / 抖音 / 各旅游平台
        </p>
      </footer>
    </>
  );
}
