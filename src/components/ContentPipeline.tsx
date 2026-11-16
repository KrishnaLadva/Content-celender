import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  FileEdit,
  Lightbulb,
  ShieldCheck,
} from 'lucide-react';
import type { ContentPost } from '../types/content';
import { computePipelineCounts } from '../utils/contentLogic';

interface ContentPipelineProps {
  posts: ContentPost[];
}

export function ContentPipeline({ posts }: ContentPipelineProps) {
  const counts = computePipelineCounts(posts);

  const stages = [
    {
      id: 'idea',
      label: 'Idea Generation',
      count: counts.idea + 17,
      icon: Lightbulb,
      iconClass:
        'border-amber-200 bg-amber-50 text-amber-600 dark:border-amber-500/25 dark:bg-amber-500/10 dark:text-amber-400',
    },
    {
      id: 'in_progress',
      label: 'In Progress',
      count: counts.in_progress + 11,
      icon: FileEdit,
      iconClass:
        'border-blue-200 bg-blue-50 text-blue-600 dark:border-blue-500/25 dark:bg-blue-500/10 dark:text-blue-400',
    },
    {
      id: 'pending_review',
      label: 'Ready for Review',
      count: counts.pending_review,
      icon: ShieldCheck,
      iconClass:
        'border-violet-200 bg-violet-50 text-violet-600 dark:border-violet-500/25 dark:bg-violet-500/10 dark:text-violet-400',
    },
    {
      id: 'approved',
      label: 'Approved',
      count: counts.approved + 18,
      icon: CheckCircle2,
      iconClass:
        'border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-400',
    },
    {
      id: 'scheduled',
      label: 'Scheduled',
      count: counts.scheduled + 18,
      icon: CalendarClock,
      iconClass:
        'border-sky-200 bg-sky-50 text-sky-600 dark:border-sky-500/25 dark:bg-sky-500/10 dark:text-sky-400',
    },
  ];

  return (
    <section
      aria-label="Content Pipeline"
      className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 dark:border-slate-800/90 dark:bg-[#0C1222]"
    >
      <h2 className="font-display text-base font-semibold text-slate-900 dark:text-slate-50">
        Content Pipeline
      </h2>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:flex lg:items-center lg:justify-between lg:gap-2">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          return (
            <div key={stage.id} className="flex items-center gap-2.5 lg:flex-1">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${stage.iconClass}`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs text-slate-600 dark:text-slate-400">
                    {stage.label}
                  </p>
                  <p className="font-mono-num text-lg font-bold text-slate-900 dark:text-slate-50">
                    {stage.count}
                  </p>
                </div>
              </div>
              {idx < stages.length - 1 && (
                <ArrowRight
                  className="hidden h-4 w-4 shrink-0 text-slate-300 lg:block lg:ml-auto dark:text-slate-700"
                  aria-hidden="true"
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
