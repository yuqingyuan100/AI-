"use client";

import { useState, useCallback, useEffect } from "react";
import InvitationPage from "@/components/travel/InvitationPage";
import { playTrack, stopAll } from "@/components/travel/audioManager";
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
  const [accepted, setAccepted] = useState(false);
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

  useEffect(() => {
    if (accepted) {
      playTrack("main");
    }
    return () => {
      if (accepted) stopAll();
    };
  }, [accepted]);

  const detailRoute = detailRouteId ? ROUTES.find((r) => r.id === detailRouteId) : null;
  const selectedRoute = selectedRouteId ? ROUTES.find((r) => r.id === selectedRouteId) : null;

  const rankedRoutes = [...ROUTES]
    .map((r) => ({ route: r, score: calcWeightedScore(r, weights) }))
    .sort((a, b) => b.score - a.score);

  if (!accepted) {
    return <InvitationPage onAccept={() => setAccepted(true)} />;
  }

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

      {/* Weight selector — prioritized as the first interactive step */}
      <WeightSelector
        weights={weights}
        onWeightChange={handleWeightChange}
        routes={ROUTES}
        onReset={handleResetWeights}
      />

      {/* Divider */}
      <div className="mx-auto h-px max-w-4xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Route overview cards */}
      <section id="routes" className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-2 text-center text-2xl font-bold text-white sm:text-3xl">
            小管家精选的四条路线
          </h2>
          <p className="mb-8 text-center text-slate-400">
            每条我都实地调研过啦~ 点「查看详情」让我带你深入了解，或者直接拍板也行！
          </p>
          <div className="grid gap-6 overflow-visible sm:grid-cols-2 lg:grid-cols-4">
            {rankedRoutes.map(({ route, score }, index) => (
              <div key={route.id} className="relative" style={{ zIndex: 10 - index }}>
                <RouteCard
                  route={route}
                  rank={index + 1}
                  score={score}
                  isSelected={selectedRouteId === route.id}
                  onSelect={handleSelect}
                  onViewDetail={handleViewDetail}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto h-px max-w-4xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Radar chart comparison */}
      <RadarChart routes={ROUTES} selectedRouteId={selectedRouteId ?? undefined} />

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
          小管家 miniYQY · 4月4日~6日旅行提案 · 数据来源：小红书 / 抖音 / 各旅游平台
        </p>
        <p className="mt-1 text-xs text-slate-700">
          祝各位冒险者旅途愉快，有问题随时找小管家~
        </p>
      </footer>
    </>
  );
}
