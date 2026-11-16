import { useEffect } from 'react';
import { Trash2, X } from 'lucide-react';
import { APANO_MEDIA_ASSETS, WEEK_DAYS } from '../data/seedData';
import type { ContentPost, DayKey, PostStatus } from '../types/content';
import {
  MediaThumbnail,
  PlatformIcon,
  getPlatformLabel,
  getStatusMeta,
} from './PlatformBadge';

interface PostDetailDrawerProps {
  post: ContentPost | null;
  onClose: () => void;
  onUpdateStatus: (postId: string, status: PostStatus) => void;
  onUpdateMedia: (
    postId: string,
    mediaType: 'image' | 'video' | 'text',
    thumbnailUrl?: string
  ) => void;
  onMoveDay: (postId: string, day: DayKey) => void;
  onDeletePost: (postId: string) => void;
}

export function PostDetailDrawer({
  post,
  onClose,
  onUpdateStatus,
  onUpdateMedia,
  onMoveDay,
  onDeletePost,
}: PostDetailDrawerProps) {
  useEffect(() => {
    if (!post) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [post, onClose]);

  if (!post) return null;

  const statusMeta = getStatusMeta(post.status);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="post-detail-title"
    >
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="relative z-10 flex h-full w-full max-w-md flex-col justify-between border-l border-slate-200 bg-white p-5 sm:p-6 dark:border-slate-800 dark:bg-[#0C1222]">
        <div className="space-y-5 overflow-y-auto">
          <div className="flex items-start justify-between gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
            <div className="flex items-center gap-2.5 min-w-0">
              <PlatformIcon platform={post.platform} size="md" />
              <div className="min-w-0">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {getPlatformLabel(post.platform)} ·{' '}
                  <span className="font-mono-num">{post.time}</span>
                </p>
                <p className={`text-xs font-semibold ${statusMeta.textClass}`}>
                  {statusMeta.label}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close post details"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <MediaThumbnail
            src={post.thumbnailUrl}
            alt={post.title}
            mediaType={post.mediaType}
            title={post.title}
            size="lg"
          />

          <div>
            <h2
              id="post-detail-title"
              className="font-display text-lg font-semibold text-slate-900 dark:text-slate-50"
            >
              {post.title}
            </h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {post.author} · {post.pillar}
            </p>
            <p className="mt-1 text-xs font-medium text-blue-600 dark:text-blue-400">
              Target angle: {post.competitorAngle}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {post.caption}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label
                htmlFor="detail-status-select"
                className="block text-xs font-medium text-slate-700 dark:text-slate-300"
              >
                Workflow Status
              </label>
              <select
                id="detail-status-select"
                value={post.status}
                onChange={(e) =>
                  onUpdateStatus(post.id, e.target.value as PostStatus)
                }
                className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 text-xs font-medium text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-[#11182C] dark:text-slate-100"
              >
                <option value="idea">Draft Idea</option>
                <option value="in_progress">In Progress</option>
                <option value="pending_review">Pending Review</option>
                <option value="approved">Approved</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="detail-day-select"
                className="block text-xs font-medium text-slate-700 dark:text-slate-300"
              >
                Scheduled Day
              </label>
              <select
                id="detail-day-select"
                value={post.dayKey}
                onChange={(e) => onMoveDay(post.id, e.target.value as DayKey)}
                className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 text-xs font-medium text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-[#11182C] dark:text-slate-100"
              >
                {WEEK_DAYS.map((day) => (
                  <option key={day.key} value={day.key}>
                    {day.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="detail-media-type-select"
                className="block text-xs font-medium text-slate-700 dark:text-slate-300"
              >
                Post Format
              </label>
              <select
                id="detail-media-type-select"
                value={post.mediaType}
                onChange={(e) => {
                  const nextType = e.target.value as 'image' | 'video' | 'text';
                  onUpdateMedia(
                    post.id,
                    nextType,
                    nextType === 'text'
                      ? undefined
                      : post.thumbnailUrl ?? APANO_MEDIA_ASSETS[0].url
                  );
                }}
                className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 text-xs font-medium text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-[#11182C] dark:text-slate-100"
              >
                <option value="image">Image / Carousel</option>
                <option value="video">Reel / Video</option>
                <option value="text">Text Post</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="detail-cover-select"
                className="block text-xs font-medium text-slate-700 dark:text-slate-300"
              >
                Visual Cover
              </label>
              <select
                id="detail-cover-select"
                value={post.thumbnailUrl ?? APANO_MEDIA_ASSETS[0].url}
                disabled={post.mediaType === 'text'}
                onChange={(e) =>
                  onUpdateMedia(post.id, post.mediaType, e.target.value)
                }
                className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 text-xs font-medium text-slate-900 disabled:opacity-50 focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-[#11182C] dark:text-slate-100"
              >
                {APANO_MEDIA_ASSETS.map((asset) => (
                  <option key={asset.id} value={asset.url}>
                    {asset.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 dark:border-slate-800">
          <button
            type="button"
            onClick={() => {
              onDeletePost(post.id);
              onClose();
            }}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-3 text-xs font-semibold text-rose-700 hover:bg-rose-100 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20"
          >
            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Delete Post</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="h-9 rounded-lg bg-blue-600 px-4 text-xs font-semibold text-white hover:bg-blue-700"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
