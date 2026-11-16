import { ArrowUpRight, RefreshCw, Sparkles } from 'lucide-react';
import type { DailyDigestData, DigestTaskItem } from '../utils/digestLogic';

interface DailyDigestProps {
  digest: DailyDigestData;
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  onTaskAction: (task: DigestTaskItem) => void;
}

export function DailyDigest({
  digest,
  loading,
  error,
  onRefresh,
  onTaskAction,
}: DailyDigestProps) {
  return (
    <section
      aria-label="Daily Digest"
      data-testid="daily-digest"
      className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 dark:border-slate-800/90 dark:bg-[#0C1222]"
    >
      <div className="flex flex-col gap-3 border-b border-slate-200 pb-3.5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800/80">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Sparkles
              className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400"
              aria-hidden="true"
            />
            <h2 className="font-display text-base font-semibold text-slate-900 dark:text-slate-50">
              Daily Digest
            </h2>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              · Automated Briefing
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            {digest.headline}
          </p>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          disabled={loading}
          data-testid="refresh-digest-btn"
          className="inline-flex h-9 shrink-0 items-center gap-1.5 self-start rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 disabled:opacity-60 sm:self-center dark:border-slate-800 dark:bg-[#11182C] dark:text-slate-200 dark:hover:bg-slate-800 whitespace-nowrap"
        >
          <RefreshCw
            className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`}
            aria-hidden="true"
          />
          <span>{loading ? 'Refreshing...' : 'Refresh Briefing'}</span>
        </button>
      </div>

      {error && (
        <div
          role="alert"
          className="mt-3.5 flex items-center justify-between gap-3 rounded-lg border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-xs text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300"
        >
          <span>{error}</span>
          <button
            type="button"
            onClick={onRefresh}
            className="font-semibold underline hover:no-underline shrink-0"
          >
            Retry
          </button>
        </div>
      )}

      <div className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-0 lg:divide-x lg:divide-slate-200 dark:lg:divide-slate-800/80">
          <div className="lg:col-span-7 lg:pr-6">
            <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              High-Priority Tasks
            </h3>
            <ul className="mt-2.5 divide-y divide-slate-200 dark:divide-slate-800/80">
              {digest.priorityTasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-start justify-between gap-3 py-2.5 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[11px] font-semibold ${
                          task.priority === 'High'
                            ? 'text-amber-600 dark:text-amber-400'
                            : 'text-blue-600 dark:text-blue-400'
                        }`}
                      >
                        {task.priority}
                      </span>
                      <span
                        aria-hidden="true"
                        className="text-slate-300 dark:text-slate-700"
                      >
                        ·
                      </span>
                      <p className="truncate text-xs sm:text-sm font-medium text-slate-900 dark:text-slate-100">
                        {task.title}
                      </p>
                    </div>
                    <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                      {task.detail}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onTaskAction(task)}
                    className="inline-flex h-8 shrink-0 items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 text-xs font-medium text-slate-700 transition-colors hover:border-blue-400 hover:text-blue-600 dark:border-slate-800 dark:bg-[#11182C] dark:text-slate-200 dark:hover:border-blue-500/60 dark:hover:text-blue-400 whitespace-nowrap"
                  >
                    <span>{task.actionLabel}</span>
                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-slate-200 pt-4 lg:col-span-5 lg:border-t-0 lg:pl-6 lg:pt-0 dark:border-slate-800/80">
            <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Key Performance Highlights
            </h3>
            <div className="mt-2.5 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {digest.performanceHighlights.map((hl) => (
                <div
                  key={hl.id}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-[#11182C]"
                >
                  <p className="font-mono-num text-lg font-bold text-slate-900 dark:text-slate-50">
                    {hl.metric}
                  </p>
                  <p className="mt-0.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {hl.label}
                  </p>
                  <p className="mt-1 text-[11px] leading-snug text-slate-500 dark:text-slate-400">
                    {hl.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
    </section>
  );
}
