import { Check, CheckCheck, X } from 'lucide-react';
import type { ContentPost } from '../types/content';
import { MediaThumbnail, getPlatformLabel } from './PlatformBadge';

interface ApprovalQueueProps {
  posts: ContentPost[];
  onApprove: (postId: string) => void;
  onReject: (postId: string) => void;
  onViewAll: () => void;
}

export function ApprovalQueue({
  posts,
  onApprove,
  onReject,
  onViewAll,
}: ApprovalQueueProps) {
  const pending = posts.filter((p) => p.status === 'pending_review');

  return (
    <section
      aria-label="Approval Queue"
      className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 dark:border-slate-800/90 dark:bg-[#0C1222]"
    >
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-display text-base font-semibold text-slate-900 dark:text-slate-50">
          Approval Queue
        </h2>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          View all
        </button>
      </div>

      {pending.length === 0 ? (
        <div className="mt-3 flex flex-col items-center rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center dark:border-slate-800 dark:bg-[#11182C]">
          <CheckCheck
            className="h-5 w-5 text-emerald-600 dark:text-emerald-400"
            aria-hidden="true"
          />
          <p className="mt-2 text-xs font-medium text-slate-700 dark:text-slate-300">
            All posts reviewed
          </p>
          <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
            New drafts submitted for approval will appear here.
          </p>
        </div>
      ) : (
        <ul className="mt-3 space-y-2.5">
          {pending.slice(0, 3).map((post) => (
            <li
              key={post.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-2.5 dark:border-slate-800 dark:bg-[#11182C]"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <MediaThumbnail
                  src={post.thumbnailUrl}
                  alt={post.title}
                  mediaType={post.mediaType}
                  title={post.title}
                  compact
                />
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-slate-900 dark:text-slate-100">
                    {post.title}
                  </p>
                  <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
                    {getPlatformLabel(post.platform)} · {post.time}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => onApprove(post.id)}
                  aria-label={`Approve ${post.title}`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 transition-colors hover:bg-emerald-100 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20"
                >
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => onReject(post.id)}
                  aria-label={`Return ${post.title} to draft`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-rose-50 hover:text-rose-600 dark:border-slate-700 dark:bg-[#0C1222] dark:text-slate-400 dark:hover:bg-rose-500/15 dark:hover:text-rose-400"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
