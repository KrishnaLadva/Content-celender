import { useMemo, useState } from 'react';
import { ExternalLink, Plus, Search, Target } from 'lucide-react';
import {
  APANO_BASELINE_METRICS,
  APANO_REPORT_DATE,
  COMPETITIVE_RINGS,
  COMPETITOR_APPENDIX_CATEGORIES,
  CONTENT_OPPORTUNITY_GAPS,
  TOP_LINKEDIN_COMPETITORS,
} from '../data/competitorResearch';
import type { ContentPillar, Platform } from '../types/content';
import { PlatformIcon, getPlatformLabel } from './PlatformBadge';

export interface CounterDraftPrefill {
  title: string;
  caption: string;
  platform: Platform;
  pillar: ContentPillar;
  competitorAngle: string;
}

interface CompetitorIntelViewProps {
  onStartCounterPost: (prefill: CounterDraftPrefill) => void;
}

export function CompetitorIntelView({
  onStartCounterPost,
}: CompetitorIntelViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [ringFilter, setRingFilter] = useState<'all' | 'A' | 'C' | 'E'>('all');

  const filteredCompetitors = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return TOP_LINKEDIN_COMPETITORS.filter((comp) => {
      const matchesRing = ringFilter === 'all' || comp.ring === ringFilter;
      const matchesQuery =
        q.length === 0 ||
        comp.name.toLowerCase().includes(q) ||
        comp.whyTracked.toLowerCase().includes(q) ||
        comp.vulnerability.toLowerCase().includes(q) ||
        comp.organicSignal.toLowerCase().includes(q);
      return matchesRing && matchesQuery;
    });
  }, [searchQuery, ringFilter]);

  return (
    <div className="space-y-5">
      {/* Baseline Strip */}
      <section
        aria-label="Apano Aviation Search and LinkedIn Baseline"
        className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 dark:border-slate-800/90 dark:bg-[#0C1222]"
      >
        <div className="flex flex-col gap-1 border-b border-slate-200 pb-3.5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800/80">
          <div>
            <h2 className="font-display text-base font-semibold text-slate-900 dark:text-slate-50">
              Apano Aviation Competitive Baseline
            </h2>
            <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
              176 competitors mapped (162 from 5 Oct DataForSEO & Meta Ad Library + 14 added {APANO_REPORT_DATE})
            </p>
          </div>
          <span className="font-mono-num text-xs font-medium text-slate-500 dark:text-slate-400">
            Report date · {APANO_REPORT_DATE}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {APANO_BASELINE_METRICS.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-[#11182C]"
            >
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {item.label}
              </p>
              <p className="mt-1 font-mono-num text-xl font-bold text-slate-900 dark:text-slate-50">
                {item.value}
              </p>
              <p className="mt-1 text-xs leading-snug text-slate-600 dark:text-slate-400">
                {item.context}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Top 9 Ranked LinkedIn Competitors */}
      <section
        aria-label="Top 9 LinkedIn Competitors"
        className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 dark:border-slate-800/90 dark:bg-[#0C1222]"
      >
        <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 lg:flex-row lg:items-center lg:justify-between dark:border-slate-800/80">
          <div>
            <h2 className="font-display text-base font-semibold text-slate-900 dark:text-slate-50">
              Top 9 LinkedIn Competitor Watchlist
            </h2>
            <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
              Ranked for LinkedIn Page Analytics (Premium tracks up to 9 · Free tracks 1: The Pilot’s Compass)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 sm:w-56 sm:flex-none">
              <Search
                className="pointer-events-none absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <label htmlFor="competitor-search" className="sr-only">
                Filter competitors
              </label>
              <input
                id="competitor-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search competitor or keyword..."
                className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pr-3 pl-8 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-[#11182C] dark:text-slate-100"
              />
            </div>

            <div
              role="group"
              aria-label="Filter by competitive ring"
              className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-100 p-0.5 dark:border-slate-800 dark:bg-[#0A1020]"
            >
              {(
                [
                  { id: 'all', label: 'All 9' },
                  { id: 'A', label: 'Ring A · Guides' },
                  { id: 'C', label: 'Ring C · Ground' },
                  { id: 'E', label: 'Ring E · Crew' },
                ] as const
              ).map((opt) => {
                const active = ringFilter === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setRingFilter(opt.id)}
                    aria-pressed={active}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap ${
                      active
                        ? 'bg-white text-slate-900 shadow-xs dark:bg-[#17213B] dark:text-slate-100'
                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {filteredCompetitors.length === 0 ? (
          <div className="mt-4 rounded-lg border border-dashed border-slate-200 bg-slate-50 p-6 text-center dark:border-slate-800 dark:bg-[#11182C]">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              No tracked competitors match "{searchQuery}".
            </p>
          </div>
        ) : (
          <div className="mt-4 divide-y divide-slate-200 dark:divide-slate-800/80">
            {filteredCompetitors.map((comp) => (
              <article
                key={comp.rank}
                className="flex flex-col gap-3 py-3.5 first:pt-0 last:pb-0 lg:flex-row lg:items-center lg:justify-between"
              >
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono-num text-xs font-bold text-blue-600 dark:text-blue-400">
                      #{comp.rank}
                    </span>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {comp.name}
                    </h3>
                    <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">
                      ·
                    </span>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      Ring {comp.ring}
                    </span>
                    <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">
                      ·
                    </span>
                    <span className="font-mono-num text-xs text-slate-500 dark:text-slate-400">
                      {comp.linkedInUrl}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {comp.whyTracked}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                    <span className="font-mono-num text-slate-500 dark:text-slate-400">
                      {comp.organicSignal}
                    </span>
                    <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">
                      ·
                    </span>
                    <span className="text-amber-700 dark:text-amber-400">
                      Gap: {comp.vulnerability}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      onStartCounterPost({
                        title: comp.counterTitle,
                        caption: comp.counterCaption,
                        platform: comp.recommendedPlatform,
                        pillar: comp.counterPillar,
                        competitorAngle: `Counter #${comp.rank} ${comp.name}`,
                      })
                    }
                    className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-700 transition-colors hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:bg-[#11182C] dark:text-slate-200 dark:hover:border-blue-400 dark:hover:text-blue-400 whitespace-nowrap"
                  >
                    <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Draft Counter-Post</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 5 Ownable Content Gaps + 5 Competitive Rings */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        <section
          aria-label="Five Ownable Content Gaps"
          className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 xl:col-span-7 dark:border-slate-800/90 dark:bg-[#0C1222]"
        >
          <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-3.5 dark:border-slate-800/80">
            <div className="flex items-center gap-2">
              <Target
                className="h-4 w-4 text-blue-600 dark:text-blue-400"
                aria-hidden="true"
              />
              <h2 className="font-display text-base font-semibold text-slate-900 dark:text-slate-50">
                5 Ownable Content Gaps (Calendar Pillars)
              </h2>
            </div>
          </div>

          <div className="mt-4 divide-y divide-slate-200 dark:divide-slate-800/80">
            {CONTENT_OPPORTUNITY_GAPS.map((gap) => (
              <div
                key={gap.id}
                className="flex flex-col gap-3 py-3.5 first:pt-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {gap.title}
                    </span>
                    <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">
                      ·
                    </span>
                    <span className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400">
                      <PlatformIcon platform={gap.recommendedPlatform} size="sm" />
                      <span>{getPlatformLabel(gap.recommendedPlatform)}</span>
                    </span>
                    <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">
                      ·
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {gap.suggestedFormat}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    {gap.finding}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Rival weakness: {gap.rivalWeakness}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onStartCounterPost({
                      title: gap.starterTitle,
                      caption: gap.starterCaption,
                      platform: gap.recommendedPlatform,
                      pillar: gap.pillar,
                      competitorAngle: gap.title,
                    })
                  }
                  className="inline-flex h-8 shrink-0 items-center gap-1 rounded-lg bg-blue-600 px-3 text-xs font-semibold text-white transition-colors hover:bg-blue-700 whitespace-nowrap"
                >
                  <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Schedule Gap</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        <div className="space-y-5 xl:col-span-5">
          <section
            aria-label="Five Competitive Rings"
            className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 dark:border-slate-800/90 dark:bg-[#0C1222]"
          >
            <h2 className="font-display text-base font-semibold text-slate-900 dark:text-slate-50">
              Market Shape: 5 Competitive Rings
            </h2>
            <div className="mt-3 divide-y divide-slate-200 dark:divide-slate-800/80">
              {COMPETITIVE_RINGS.map((ring) => (
                <div key={ring.ring} className="py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                      Ring {ring.ring} · {ring.title}
                    </p>
                    <span
                      className={`text-xs font-semibold ${
                        ring.threat === 'High'
                          ? 'text-rose-600 dark:text-rose-400'
                          : ring.threat === 'Medium'
                            ? 'text-amber-600 dark:text-amber-400'
                            : 'text-emerald-600 dark:text-emerald-400'
                      }`}
                    >
                      {ring.threat} Threat
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {ring.examples.join(' · ')}
                  </p>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                    {ring.apanoCounter}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section
            aria-label="176 Competitor Appendix Breakdown"
            className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 dark:border-slate-800/90 dark:bg-[#0C1222]"
          >
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-display text-base font-semibold text-slate-900 dark:text-slate-50">
                176-Competitor Appendix Map
              </h2>
              <span className="inline-flex items-center gap-1 font-mono-num text-xs font-semibold text-slate-500 dark:text-slate-400">
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
                9 sectors
              </span>
            </div>

            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 dark:border-slate-800 dark:text-slate-400">
                    <th className="py-2 font-medium">Category</th>
                    <th className="py-2 text-right font-medium">Total</th>
                    <th className="py-2 text-right font-medium">Direct</th>
                    <th className="py-2 text-right font-medium">Overlap</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80">
                  {COMPETITOR_APPENDIX_CATEGORIES.map((row) => (
                    <tr key={row.category}>
                      <td className="py-2 pr-2">
                        <p className="font-medium text-slate-900 dark:text-slate-100">
                          {row.category}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          {row.notableNames}
                        </p>
                      </td>
                      <td className="py-2 text-right font-mono-num font-semibold text-slate-900 dark:text-slate-100">
                        {row.total}
                      </td>
                      <td className="py-2 text-right font-mono-num text-slate-600 dark:text-slate-300">
                        {row.direct}
                      </td>
                      <td className="py-2 text-right font-mono-num text-slate-600 dark:text-slate-300">
                        {row.overlap}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
