import { useEffect, useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import {
  APANO_MEDIA_ASSETS,
  CONTENT_PILLARS,
  WEEK_DAYS,
} from '../data/seedData';
import type {
  ContentPillar,
  ContentPost,
  DayKey,
  Platform,
  PostStatus,
} from '../types/content';
import { pickMediaAssetForPost } from '../utils/contentLogic';
import type { CounterDraftPrefill } from './CompetitorIntelView';
import { MediaThumbnail } from './PlatformBadge';

interface CreatePostModalProps {
  open: boolean;
  initialDay: DayKey;
  prefill?: CounterDraftPrefill | null;
  onClose: () => void;
  onCreatePost: (post: ContentPost) => void;
  onSpendCredits: (cost: number) => boolean;
}

export function CreatePostModal({
  open,
  initialDay,
  prefill,
  onClose,
  onCreatePost,
  onSpendCredits,
}: CreatePostModalProps) {
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [platform, setPlatform] = useState<Platform>('linkedin');
  const [pillar, setPillar] = useState<ContentPillar>('Neutral Guidance');
  const [competitorAngle, setCompetitorAngle] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video' | 'text'>(
    'image'
  );
  const [thumbnailUrl, setThumbnailUrl] = useState(APANO_MEDIA_ASSETS[0].url);
  const [dayKey, setDayKey] = useState<DayKey>(initialDay);
  const [time, setTime] = useState('10:00 AM');
  const [status, setStatus] = useState<PostStatus>('pending_review');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setDayKey(initialDay);
  }, [initialDay]);

  useEffect(() => {
    if (!open) return;
    if (prefill) {
      setTitle(prefill.title);
      setCaption(prefill.caption);
      setPlatform(prefill.platform);
      setPillar(prefill.pillar);
      setCompetitorAngle(prefill.competitorAngle);
      const matched = pickMediaAssetForPost({
        pillar: prefill.pillar,
        title: prefill.title,
        platform: prefill.platform,
      });
      setMediaType(matched.mediaType);
      setThumbnailUrl(matched.thumbnailUrl);
      setError(null);
    }
  }, [open, prefill]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const handlePillarChange = (nextPillar: ContentPillar) => {
    setPillar(nextPillar);
    const matched = pickMediaAssetForPost({
      pillar: nextPillar,
      title,
      platform,
    });
    setThumbnailUrl(matched.thumbnailUrl);
  };

  const handleAiDraft = () => {
    const allowed = onSpendCredits(20);
    if (!allowed) {
      setError('Insufficient AI credits remaining for this billing period.');
      return;
    }
    setError(null);
    const nextTitle =
      title.trim() ||
      'How to Compare Indian & Abroad FTOs Without Coaching Bias';
    if (!title.trim()) {
      setTitle(nextTitle);
    }
    if (!competitorAngle.trim()) {
      setCompetitorAngle(
        "Differentiate from Pilot's Compass & FMS ground upsells"
      );
    }
    const matched = pickMediaAssetForPost({
      pillar,
      title: nextTitle,
      platform,
    });
    setMediaType(matched.mediaType);
    setThumbnailUrl(matched.thumbnailUrl);
    setCaption(
      'Three checks every Class 12 student and parent should run before paying an FTO deposit: active fleet-to-student ratio, DGCA approval validity, and itemized all-in costs (₹45L–₹65L+).'
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please enter a post title before saving.');
      return;
    }
    if (!caption.trim()) {
      setError('Please enter a post caption before saving.');
      return;
    }
    onCreatePost({
      id: `post-${Date.now()}`,
      title: title.trim(),
      caption: caption.trim(),
      platform,
      dayKey,
      time,
      status,
      mediaType,
      thumbnailUrl: mediaType === 'text' ? undefined : thumbnailUrl,
      author: 'Apano Editorial',
      pillar,
      competitorAngle:
        competitorAngle.trim() || `Aligned to ${pillar} research pillar`,
    });
    setTitle('');
    setCaption('');
    setCompetitorAngle('');
    setError(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-post-heading"
    >
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xl dark:border-slate-800 dark:bg-[#0C1222]">
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-3.5 dark:border-slate-800">
          <h2
            id="create-post-heading"
            className="font-display text-base font-semibold text-slate-900 dark:text-slate-50"
          >
            Create New Post
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close create post modal"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-slate-600 dark:text-slate-400">
              Write manually or populate an Apano research draft.
            </span>
            <button
              type="button"
              onClick={handleAiDraft}
              className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100 dark:border-blue-500/30 dark:bg-blue-500/15 dark:text-blue-300 dark:hover:bg-blue-500/25 whitespace-nowrap"
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Draft with AI (-20 credits)</span>
            </button>
          </div>

          <div>
            <label
              htmlFor="post-title-input"
              className="block text-xs font-medium text-slate-700 dark:text-slate-300"
            >
              Post Title
            </label>
            <input
              id="post-title-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Sourced CPL Fee Breakdown: India vs USA"
              className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-[#11182C] dark:text-slate-100 dark:placeholder:text-slate-500"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label
                htmlFor="post-pillar-select"
                className="block text-xs font-medium text-slate-700 dark:text-slate-300"
              >
                Research Pillar
              </label>
              <select
                id="post-pillar-select"
                value={pillar}
                onChange={(e) =>
                  handlePillarChange(e.target.value as ContentPillar)
                }
                className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 text-xs font-medium text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-[#11182C] dark:text-slate-100"
              >
                {CONTENT_PILLARS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="post-angle-input"
                className="block text-xs font-medium text-slate-700 dark:text-slate-300"
              >
                Competitor Angle
              </label>
              <input
                id="post-angle-input"
                type="text"
                value={competitorAngle}
                onChange={(e) => setCompetitorAngle(e.target.value)}
                placeholder="e.g., Counter #1 Pilot's Compass"
                className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-[#11182C] dark:text-slate-100 dark:placeholder:text-slate-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <label
                htmlFor="post-platform-select"
                className="block text-xs font-medium text-slate-700 dark:text-slate-300"
              >
                Platform
              </label>
              <select
                id="post-platform-select"
                value={platform}
                onChange={(e) => setPlatform(e.target.value as Platform)}
                className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 text-xs font-medium text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-[#11182C] dark:text-slate-100"
              >
                <option value="linkedin">LinkedIn</option>
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="post-day-select"
                className="block text-xs font-medium text-slate-700 dark:text-slate-300"
              >
                Day
              </label>
              <select
                id="post-day-select"
                value={dayKey}
                onChange={(e) => setDayKey(e.target.value as DayKey)}
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
                htmlFor="post-status-select"
                className="block text-xs font-medium text-slate-700 dark:text-slate-300"
              >
                Status
              </label>
              <select
                id="post-status-select"
                value={status}
                onChange={(e) => setStatus(e.target.value as PostStatus)}
                className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 text-xs font-medium text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-[#11182C] dark:text-slate-100"
              >
                <option value="pending_review">Pending Review</option>
                <option value="scheduled">Scheduled</option>
                <option value="in_progress">In Progress</option>
                <option value="idea">Draft Idea</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <label
                htmlFor="post-media-type-select"
                className="block text-xs font-medium text-slate-700 dark:text-slate-300"
              >
                Format
              </label>
              <select
                id="post-media-type-select"
                value={mediaType}
                onChange={(e) =>
                  setMediaType(e.target.value as 'image' | 'video' | 'text')
                }
                className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 text-xs font-medium text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-[#11182C] dark:text-slate-100"
              >
                <option value="image">Image / Carousel</option>
                <option value="video">Reel / Video</option>
                <option value="text">Text Post</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="post-cover-select"
                className="block text-xs font-medium text-slate-700 dark:text-slate-300"
              >
                Visual Cover
              </label>
              <select
                id="post-cover-select"
                value={thumbnailUrl}
                disabled={mediaType === 'text'}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 text-xs font-medium text-slate-900 disabled:opacity-50 focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-[#11182C] dark:text-slate-100"
              >
                {APANO_MEDIA_ASSETS.map((asset) => (
                  <option key={asset.id} value={asset.url}>
                    {asset.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="post-time-input"
                className="block text-xs font-medium text-slate-700 dark:text-slate-300"
              >
                Publish Time
              </label>
              <input
                id="post-time-input"
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 font-mono-num text-xs text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-[#11182C] dark:text-slate-100"
              />
            </div>
          </div>

          <MediaThumbnail
            src={mediaType === 'text' ? undefined : thumbnailUrl}
            alt={title || 'Selected aviation visual cover'}
            mediaType={mediaType}
            title={title || 'Text post preview'}
          />

          <div>
            <label
              htmlFor="post-caption-textarea"
              className="block text-xs font-medium text-slate-700 dark:text-slate-300"
            >
              Caption Copy
            </label>
            <textarea
              id="post-caption-textarea"
              rows={3}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write unbiased copy grounded in Apano's research..."
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-[#11182C] dark:text-slate-100 dark:placeholder:text-slate-500"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300"
            >
              {error}
            </p>
          )}

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="h-10 rounded-lg border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-[#11182C] dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-10 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-5 text-xs font-semibold text-white hover:opacity-95"
            >
              Save to Calendar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
