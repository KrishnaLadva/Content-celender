import { useState } from 'react';
import { Check, Moon, Save, Sparkles, Sun, X } from 'lucide-react';
import { CONTENT_PILLARS, WEEK_DAYS } from '../data/seedData';
import type {
  BrandVoiceConfig,
  ContentPillar,
  ContentPost,
  NavSection,
  Platform,
  ThemeMode,
} from '../types/content';
import { THEME_STORAGE_KEY } from '../utils/theme';
import { pickMediaAssetForPost } from '../utils/contentLogic';
import {
  CompetitorIntelView,
  type CounterDraftPrefill,
} from './CompetitorIntelView';
import { PerformanceChart } from './PerformanceChart';
import {
  MediaThumbnail,
  PlatformIcon,
  getPlatformLabel,
  getStatusMeta,
} from './PlatformBadge';
import { ThemeToggle } from './ThemeToggle';

interface SecondaryViewsProps {
  section: Exclude<NavSection, 'dashboard'>;
  posts: ContentPost[];
  theme: ThemeMode;
  onSetTheme: (theme: ThemeMode) => void;
  onToggleTheme: () => void;
  brandVoice: BrandVoiceConfig;
  onSaveBrandVoice: (next: BrandVoiceConfig) => void;
  onApprove: (postId: string) => void;
  onReject: (postId: string) => void;
  onSelectPost: (post: ContentPost) => void;
  onOpenCreate: (prefill?: CounterDraftPrefill) => void;
  onCreatePost: (post: ContentPost) => void;
  onSpendCredits: (cost: number) => boolean;
}

export function SecondaryViews({
  section,
  posts,
  theme,
  onSetTheme,
  onToggleTheme,
  brandVoice,
  onSaveBrandVoice,
  onApprove,
  onReject,
  onSelectPost,
  onOpenCreate,
  onCreatePost,
  onSpendCredits,
}: SecondaryViewsProps) {
  const [studioTopic, setStudioTopic] = useState('');
  const [studioPlatform, setStudioPlatform] = useState<Platform>('linkedin');
  const [studioPillar, setStudioPillar] =
    useState<ContentPillar>('Neutral Guidance');
  const [studioDraft, setStudioDraft] = useState<{
    title: string;
    caption: string;
  } | null>(null);
  const [studioNotice, setStudioNotice] = useState<string | null>(null);

  const [tone, setTone] = useState(brandVoice.tone);
  const [audience, setAudience] = useState(brandVoice.audience);
  const [guidelines, setGuidelines] = useState(brandVoice.guidelines);
  const [voiceSaved, setVoiceSaved] = useState(false);

  if (section === 'competitors') {
    return (
      <CompetitorIntelView
        onStartCounterPost={(prefill) => onOpenCreate(prefill)}
      />
    );
  }

  if (section === 'settings') {
    return (
      <div className="space-y-6">
        <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 dark:border-slate-800/90 dark:bg-[#0C1222]">
          <h2 className="font-display text-base font-semibold text-slate-900 dark:text-slate-50">
            Appearance & Theme Preference
          </h2>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
            Choose between Light and Dark mode. Your selection is saved
            automatically in <code className="font-mono-num">localStorage</code>{' '}
            under <code className="font-mono-num">{THEME_STORAGE_KEY}</code> and
            persists across reloads.
          </p>

          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-[#11182C]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-[#0C1222]">
                {theme === 'dark' ? (
                  <Moon className="h-5 w-5 text-blue-400" aria-hidden="true" />
                ) : (
                  <Sun className="h-5 w-5 text-amber-500" aria-hidden="true" />
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Active Theme: {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Synced with Tailwind <code className="font-mono-num">.dark</code>{' '}
                  root class
                </p>
              </div>
            </div>

            <ThemeToggle
              theme={theme}
              onChange={onSetTheme}
              onToggle={onToggleTheme}
              variant="segmented"
            />
          </div>
        </section>
      </div>
    );
  }

  if (section === 'brand_voice') {
    return (
      <section className="max-w-2xl rounded-xl border border-slate-200 bg-white p-5 sm:p-6 dark:border-slate-800/90 dark:bg-[#0C1222]">
        <h2 className="font-display text-base font-semibold text-slate-900 dark:text-slate-50">
          Brand Voice Configuration
        </h2>
        <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
          All generated drafts and AI suggestions follow these editorial rules.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSaveBrandVoice({
              ...brandVoice,
              tone,
              audience,
              guidelines,
            });
            setVoiceSaved(true);
            setTimeout(() => setVoiceSaved(false), 2500);
          }}
          className="mt-5 space-y-4"
        >
          <div>
            <label
              htmlFor="voice-tone"
              className="block text-xs font-medium text-slate-700 dark:text-slate-300"
            >
              Editorial Tone
            </label>
            <input
              id="voice-tone"
              type="text"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-[#11182C] dark:text-slate-100"
            />
          </div>
          <div>
            <label
              htmlFor="voice-audience"
              className="block text-xs font-medium text-slate-700 dark:text-slate-300"
            >
              Target Audience
            </label>
            <input
              id="voice-audience"
              type="text"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-[#11182C] dark:text-slate-100"
            />
          </div>
          <div>
            <label
              htmlFor="voice-guidelines"
              className="block text-xs font-medium text-slate-700 dark:text-slate-300"
            >
              Writing Guardrails
            </label>
            <textarea
              id="voice-guidelines"
              rows={3}
              value={guidelines}
              onChange={(e) => setGuidelines(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-[#11182C] dark:text-slate-100"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-blue-600 px-4 text-xs font-semibold text-white hover:bg-blue-700"
            >
              <Save className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Save Brand Voice</span>
            </button>
            {voiceSaved && (
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                Preferences updated
              </span>
            )}
          </div>
        </form>
      </section>
    );
  }

  if (section === 'studio') {
    return (
      <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800/90 dark:bg-[#0C1222]">
          <h2 className="font-display text-base font-semibold text-slate-900 dark:text-slate-50">
            Generate Channel-Ready Copy
          </h2>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
            Active tone: {brandVoice.tone}
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!studioTopic.trim()) {
                setStudioNotice('Enter a topic to generate a post draft.');
                return;
              }
              if (!onSpendCredits(20)) {
                setStudioNotice('Monthly credit limit reached.');
                return;
              }
              setStudioDraft({
                title: studioTopic.trim(),
                caption: `Here is a ${getPlatformLabel(
                  studioPlatform
                )} breakdown on "${studioTopic.trim()}" designed for ${
                  brandVoice.audience
                } Focus on one clear takeaway and measurable impact.`,
              });
              setStudioNotice('Draft generated (-20 credits).');
            }}
            className="mt-4 space-y-4"
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="studio-platform"
                  className="block text-xs font-medium text-slate-700 dark:text-slate-300"
                >
                  Target Channel
                </label>
                <select
                  id="studio-platform"
                  value={studioPlatform}
                  onChange={(e) => setStudioPlatform(e.target.value as Platform)}
                  className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs font-medium text-slate-900 dark:border-slate-800 dark:bg-[#11182C] dark:text-slate-100"
                >
                  <option value="linkedin">LinkedIn</option>
                  <option value="instagram">Instagram</option>
                  <option value="facebook">Facebook</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="studio-pillar"
                  className="block text-xs font-medium text-slate-700 dark:text-slate-300"
                >
                  Research Pillar
                </label>
                <select
                  id="studio-pillar"
                  value={studioPillar}
                  onChange={(e) =>
                    setStudioPillar(e.target.value as ContentPillar)
                  }
                  className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs font-medium text-slate-900 dark:border-slate-800 dark:bg-[#11182C] dark:text-slate-100"
                >
                  {CONTENT_PILLARS.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="studio-topic"
                className="block text-xs font-medium text-slate-700 dark:text-slate-300"
              >
                Campaign Topic or Competitor Angle
              </label>
              <textarea
                id="studio-topic"
                rows={3}
                value={studioTopic}
                onChange={(e) => setStudioTopic(e.target.value)}
                placeholder="e.g., India vs USA CPL fee comparison table for Class 12 parents"
                className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-[#11182C] dark:text-slate-100"
              />
            </div>

            <button
              type="submit"
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 text-xs font-semibold text-white hover:opacity-95"
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Generate Draft (-20 credits)</span>
            </button>

            {studioNotice && (
              <p className="text-xs text-blue-600 dark:text-blue-400">
                {studioNotice}
              </p>
            )}
          </form>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800/90 dark:bg-[#0C1222]">
          <h2 className="font-display text-base font-semibold text-slate-900 dark:text-slate-50">
            Live Draft Preview
          </h2>
          {studioDraft ? (
            <div className="mt-4 space-y-4">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-[#11182C]">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <PlatformIcon platform={studioPlatform} size="sm" />
                  <span>{getPlatformLabel(studioPlatform)}</span>
                  <span aria-hidden="true">·</span>
                  <span>Ready for review</span>
                </div>
                <h3 className="mt-2.5 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {studioDraft.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  {studioDraft.caption}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const matched = pickMediaAssetForPost({
                    pillar: studioPillar,
                    title: studioDraft.title,
                    platform: studioPlatform,
                  });
                  onCreatePost({
                    id: `post-${Date.now()}`,
                    title: studioDraft.title,
                    caption: studioDraft.caption,
                    platform: studioPlatform,
                    dayKey: '2026-11-21',
                    time: '02:00 PM',
                    status: 'pending_review',
                    mediaType: matched.mediaType,
                    thumbnailUrl: matched.thumbnailUrl,
                    author: 'Apano Editorial',
                    pillar: studioPillar,
                    competitorAngle: `AI Studio · ${studioPillar}`,
                  });
                  setStudioNotice('Added draft to Sat 21 and Approval Queue.');
                }}
                className="h-10 rounded-lg bg-emerald-600 px-4 text-xs font-semibold text-white hover:bg-emerald-700"
              >
                Send to Approval Queue
              </button>
            </div>
          ) : (
            <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center dark:border-slate-800 dark:bg-[#11182C]">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Enter a topic on the left to preview and queue a new post.
              </p>
            </div>
          )}
        </div>
      </section>
    );
  }

  if (section === 'analytics') {
    return (
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <PerformanceChart />
        <section className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800/90 dark:bg-[#0C1222]">
          <h2 className="font-display text-base font-semibold text-slate-900 dark:text-slate-50">
            Channel Distribution
          </h2>
          <div className="mt-4 divide-y divide-slate-200 dark:divide-slate-800/80">
            {(['linkedin', 'instagram', 'facebook'] as Platform[]).map((p) => {
              const count = posts.filter((item) => item.platform === p).length;
              return (
                <div
                  key={p}
                  className="flex items-center justify-between py-3 text-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <PlatformIcon platform={p} size="sm" />
                    <span className="font-medium text-slate-900 dark:text-slate-100">
                      {getPlatformLabel(p)}
                    </span>
                  </div>
                  <span className="font-mono-num text-xs font-semibold text-slate-600 dark:text-slate-300">
                    {count} posts
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    );
  }

  // planner, calendar, approvals views
  const listPosts =
    section === 'approvals'
      ? posts.filter((p) => p.status === 'pending_review')
      : posts;

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800/90 dark:bg-[#0C1222]">
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
        <h2 className="font-display text-base font-semibold text-slate-900 dark:text-slate-50">
          {section === 'approvals'
            ? 'Pending Approvals'
            : section === 'calendar'
              ? 'Full Schedule'
              : 'All Content Items'}
        </h2>
        <button
          type="button"
          onClick={() => onOpenCreate()}
          className="h-9 rounded-lg bg-blue-600 px-3.5 text-xs font-semibold text-white hover:bg-blue-700"
        >
          New Post
        </button>
      </div>

      {listPosts.length === 0 ? (
        <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center dark:border-slate-800 dark:bg-[#11182C]">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            No posts waiting in this view.
          </p>
        </div>
      ) : (
        <div className="mt-4 divide-y divide-slate-200 dark:divide-slate-800/80">
          {listPosts.map((post) => {
            const statusMeta = getStatusMeta(post.status);
            const dayLabel =
              WEEK_DAYS.find((d) => d.key === post.dayKey)?.label ?? post.dayKey;
            return (
              <div
                key={post.id}
                className="flex flex-col gap-3 py-3.5 sm:flex-row sm:items-center sm:justify-between"
              >
                <button
                  type="button"
                  onClick={() => onSelectPost(post)}
                  className="flex items-center gap-3 text-left min-w-0"
                >
                  <MediaThumbnail
                    src={post.thumbnailUrl}
                    alt={post.title}
                    mediaType={post.mediaType}
                    title={post.title}
                    compact
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {post.title}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {getPlatformLabel(post.platform)} · {dayLabel} ·{' '}
                      <span className="font-mono-num">{post.time}</span> ·{' '}
                      {post.pillar}
                    </p>
                  </div>
                </button>

                <div className="flex items-center gap-2.5 shrink-0">
                  <span className={`text-xs font-semibold ${statusMeta.textClass}`}>
                    {statusMeta.label}
                  </span>
                  {post.status === 'pending_review' && (
                    <>
                      <button
                        type="button"
                        onClick={() => onApprove(post.id)}
                        aria-label={`Approve ${post.title}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400"
                      >
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onReject(post.id)}
                        aria-label={`Return ${post.title} to draft`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-rose-50 hover:text-rose-600 dark:border-slate-700 dark:bg-[#11182C] dark:text-slate-400"
                      >
                        <X className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
