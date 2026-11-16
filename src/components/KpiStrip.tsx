import { CalendarCheck2, FileText, Target } from 'lucide-react';
import type { ContentPost } from '../types/content';
import { computePipelineCounts } from '../utils/contentLogic';

interface KpiStripProps {
  posts: ContentPost[];
  creditsUsed: number;
}

export function KpiStrip({ posts, creditsUsed }: KpiStripProps) {
  const counts = computePipelineCounts(posts);
  const upcomingCount = counts.scheduled + counts.approved;
  const linkedinPosts = posts.filter((p) => p.platform === 'linkedin').length;
  const engagementTotal = (8.4 + Math.max(0, creditsUsed - 2450) * 0.002).toFixed(1);

  return (
    <section
      aria-label="Key performance metrics"
      className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-4"
    >
      <article className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800/90 dark:bg-[#0C1222]">
        <div>
          <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
            Scheduled & Ready
          </p>
          <p className="mt-1.5 font-mono-num text-2xl font-bold text-slate-900 dark:text-slate-50">
            {upcomingCount}
          </p>
          <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
            {linkedinPosts} LinkedIn authority posts
          </p>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-sky-200 bg-sky-50 text-sky-600 dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-400">
          <CalendarCheck2 className="h-5 w-5" aria-hidden="true" />
        </div>
      </article>

      <article className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800/90 dark:bg-[#0C1222]">
        <div>
          <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
            Weekly Engagement Target
          </p>
          <p className="mt-1.5 font-mono-num text-2xl font-bold text-slate-900 dark:text-slate-50">
            {engagementTotal}K
          </p>
          <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
            56 LinkedIn followers baseline
          </p>
        </div>
        <svg
          viewBox="0 0 72 34"
          className="h-9 w-18 shrink-0"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="kpiSparkFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M2 28 C12 24, 18 16, 26 20 C34 24, 42 10, 50 11 C58 12, 63 17, 70 7 L70 34 L2 34 Z"
            fill="url(#kpiSparkFill)"
          />
          <path
            d="M2 28 C12 24, 18 16, 26 20 C34 24, 42 10, 50 11 C58 12, 63 17, 70 7"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </article>

      <article className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800/90 dark:bg-[#0C1222]">
        <div>
          <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
            Competitors Tracked
          </p>
          <p className="mt-1.5 font-mono-num text-2xl font-bold text-slate-900 dark:text-slate-50">
            176
          </p>
          <p className="mt-1 text-xs text-blue-600 dark:text-blue-400">
            Top 9 ranked on LinkedIn
          </p>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-violet-200 bg-violet-50 text-violet-600 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-400">
          <Target className="h-5 w-5" aria-hidden="true" />
        </div>
      </article>

      <article className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800/90 dark:bg-[#0C1222]">
        <div>
          <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
            Gujarati CTWA Cost
          </p>
          <p className="mt-1.5 font-mono-num text-2xl font-bold text-slate-900 dark:text-slate-50">
            ₹23–26
          </p>
          <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
            Per chat · 3.4K/mo organic
          </p>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-amber-200 bg-amber-50 text-amber-600 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400">
          <FileText className="h-5 w-5" aria-hidden="true" />
        </div>
      </article>
    </section>
  );
}
