import { useCallback, useEffect, useState } from 'react';
import { AiAssistantCard } from './components/AiAssistantCard';
import { ApprovalQueue } from './components/ApprovalQueue';
import type { CounterDraftPrefill } from './components/CompetitorIntelView';
import { ContentCalendar } from './components/ContentCalendar';
import { ContentPipeline } from './components/ContentPipeline';
import { CreatePostModal } from './components/CreatePostModal';
import { DailyDigest } from './components/DailyDigest';
import { Header } from './components/Header';
import { KpiStrip } from './components/KpiStrip';
import { PerformanceChart } from './components/PerformanceChart';
import { PostDetailDrawer } from './components/PostDetailDrawer';
import { SecondaryViews } from './components/SecondaryViews';
import { Sidebar } from './components/Sidebar';
import {
  CONNECTED_ACCOUNTS,
  INITIAL_BRAND_VOICE,
  INITIAL_POSTS,
  WEEK_DAYS,
  WEEKLY_PERFORMANCE,
} from './data/seedData';
import { useTheme } from './hooks/useTheme';
import type {
  BrandVoiceConfig,
  ConnectedAccount,
  ContentPillar,
  ContentPost,
  DayKey,
  NavSection,
  Platform,
  PostStatus,
} from './types/content';
import {
  deductCredits,
  filterPosts,
  movePostToDay,
  updatePostMedia,
  updatePostStatus,
} from './utils/contentLogic';
import {
  buildCsvFilename,
  downloadCsvFile,
  serializePostsToCsv,
} from './utils/csvExport';
import {
  buildDeterministicDigest,
  mergeAiDigestPayload,
  type DailyDigestData,
  type DigestTaskItem,
} from './utils/digestLogic';

const CREDITS_LIMIT = 5000;
const OPEN_SLOT_DAY: DayKey = '2026-11-21';

export default function App() {
  const { theme, setTheme, toggleTheme } = useTheme();
  const [activeNav, setActiveNav] = useState<NavSection>('dashboard');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const [posts, setPosts] = useState<ContentPost[]>(INITIAL_POSTS);
  const [accounts, setAccounts] =
    useState<ConnectedAccount[]>(CONNECTED_ACCOUNTS);
  const [creditsUsed, setCreditsUsed] = useState(2450);
  const [brandVoice, setBrandVoice] =
    useState<BrandVoiceConfig>(INITIAL_BRAND_VOICE);

  const [platformFilter, setPlatformFilter] = useState<Platform | 'all'>('all');
  const [pillarFilter, setPillarFilter] = useState<ContentPillar | 'all'>(
    'all'
  );
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createInitialDay, setCreateInitialDay] =
    useState<DayKey>(OPEN_SLOT_DAY);
  const [createPrefill, setCreatePrefill] =
    useState<CounterDraftPrefill | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [digest, setDigest] = useState<DailyDigestData>(() =>
    buildDeterministicDigest(INITIAL_POSTS, WEEKLY_PERFORMANCE, WEEK_DAYS)
  );
  const [digestLoading, setDigestLoading] = useState(false);
  const [digestError, setDigestError] = useState<string | null>(null);

  const selectedPost = posts.find((p) => p.id === selectedPostId) ?? null;
  const pendingApprovalCount = posts.filter(
    (p) => p.status === 'pending_review'
  ).length;

  const handleSpendCredits = (cost: number): boolean => {
    const result = deductCredits(creditsUsed, CREDITS_LIMIT, cost);
    if (!result.allowed) return false;
    setCreditsUsed(result.nextUsed);
    return true;
  };

  const handleApprovePost = (postId: string) => {
    setPosts((prev) => updatePostStatus(prev, postId, 'scheduled'));
  };

  const handleRejectPost = (postId: string) => {
    setPosts((prev) => updatePostStatus(prev, postId, 'in_progress'));
  };

  const handleUpdateStatus = (postId: string, status: PostStatus) => {
    setPosts((prev) => updatePostStatus(prev, postId, status));
  };

  const handleUpdateMedia = (
    postId: string,
    mediaType: 'image' | 'video' | 'text',
    thumbnailUrl?: string
  ) => {
    setPosts((prev) => updatePostMedia(prev, postId, mediaType, thumbnailUrl));
  };

  const handleMovePost = (postId: string, targetDay: DayKey) => {
    setPosts((prev) => movePostToDay(prev, postId, targetDay));
  };

  const handleCreatePost = (newPost: ContentPost) => {
    setPosts((prev) => [...prev, newPost]);
  };

  const handleDeletePost = (postId: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  };

  const handleOpenCreateModal = (
    day: DayKey = OPEN_SLOT_DAY,
    prefill: CounterDraftPrefill | null = null
  ) => {
    setCreateInitialDay(day);
    setCreatePrefill(prefill);
    setCreateModalOpen(true);
  };

  const handleAddDraftFromIdea = (idea: {
    title: string;
    caption: string;
    platform: Platform;
    pillar: ContentPillar;
    competitorAngle: string;
    mediaType: 'image' | 'video';
    thumbnailUrl: string;
  }) => {
    handleCreatePost({
      id: `post-${Date.now()}`,
      title: idea.title,
      caption: idea.caption,
      platform: idea.platform,
      dayKey: OPEN_SLOT_DAY,
      time: '01:00 PM',
      status: 'in_progress',
      mediaType: idea.mediaType,
      thumbnailUrl: idea.thumbnailUrl,
      author: 'Apano Research',
      pillar: idea.pillar,
      competitorAngle: idea.competitorAngle,
    });
  };

  const handleOpenConnectAccount = () => {
    setActiveNav('settings');
    setAccounts((prev) => prev);
  };

  const handleExportCsv = () => {
    const filtered = filterPosts(posts, platformFilter, '', pillarFilter);
    const csv = serializePostsToCsv(filtered);
    const filename = buildCsvFilename(platformFilter);
    downloadCsvFile(filename, csv);
  };

  const refreshDigest = useCallback(
    async (currentPosts: ContentPost[], fetchAi = true) => {
      const deterministic = buildDeterministicDigest(
        currentPosts,
        WEEKLY_PERFORMANCE,
        WEEK_DAYS
      );

      if (!fetchAi) {
        setDigest(deterministic);
        return;
      }

      setDigestLoading(true);
      setDigestError(null);
      try {
        const res = await fetch('/api/digest', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            posts: currentPosts,
            performance: WEEKLY_PERFORMANCE,
          }),
        });
        if (!res.ok) {
          const payload = (await res.json().catch(() => ({}))) as {
            error?: string;
          };
          throw new Error(payload.error || 'Unable to refresh daily digest.');
        }
        const data = (await res.json()) as {
          aiGenerated?: boolean;
          rawJson?: string | null;
        };
        if (data.aiGenerated && data.rawJson) {
          setDigest(mergeAiDigestPayload(data.rawJson, deterministic));
        } else {
          setDigest(deterministic);
        }
      } catch (err) {
        setDigest(deterministic);
        setDigestError(
          err instanceof Error
            ? err.message
            : 'Unable to refresh automated briefing.'
        );
      } finally {
        setDigestLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    refreshDigest(posts, false);
  }, [posts, refreshDigest]);

  useEffect(() => {
    refreshDigest(INITIAL_POSTS, true);
  }, [refreshDigest]);

  const handleDigestTaskAction = (task: DigestTaskItem) => {
    if (task.actionType === 'review_queue') {
      setActiveNav('approvals');
      return;
    }
    if (task.actionType === 'fill_slot') {
      handleOpenCreateModal(task.targetDay ?? OPEN_SLOT_DAY, null);
      return;
    }
    if (task.actionType === 'inspect_post' && task.targetPostId) {
      setSelectedPostId(task.targetPostId);
    }
  };

  return (
    <div
      data-theme={theme}
      className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#060913] dark:text-slate-100"
    >
      <div className="flex min-h-screen">
        <Sidebar
          activeNav={activeNav}
          onSelectNav={setActiveNav}
          pendingApprovalCount={pendingApprovalCount}
          accounts={accounts}
          creditsUsed={creditsUsed}
          creditsLimit={CREDITS_LIMIT}
          mobileOpen={mobileNavOpen}
          onCloseMobile={() => setMobileNavOpen(false)}
          onOpenConnectAccount={handleOpenConnectAccount}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <Header
            activeNav={activeNav}
            theme={theme}
            onSetTheme={setTheme}
            onToggleTheme={toggleTheme}
            onOpenMobileNav={() => setMobileNavOpen(true)}
            onOpenCreateModal={() => handleOpenCreateModal(OPEN_SLOT_DAY, null)}
            onExportCsv={handleExportCsv}
          />

          <main className="mx-auto w-full max-w-[1440px] flex-1 space-y-5 px-4 py-5 sm:px-6 lg:px-8">
            {activeNav === 'dashboard' ? (
              <>
                <KpiStrip posts={posts} creditsUsed={creditsUsed} />

                <DailyDigest
                  digest={digest}
                  loading={digestLoading}
                  error={digestError}
                  onRefresh={() => refreshDigest(posts, true)}
                  onTaskAction={handleDigestTaskAction}
                />

                <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
                  <div className="space-y-5 xl:col-span-8">
                    <ContentCalendar
                      posts={posts}
                      platformFilter={platformFilter}
                      pillarFilter={pillarFilter}
                      onChangePlatformFilter={setPlatformFilter}
                      onChangePillarFilter={setPillarFilter}
                      onSelectPost={(post) => setSelectedPostId(post.id)}
                      onOpenCreateForDay={(day) =>
                        handleOpenCreateModal(day, null)
                      }
                      onMovePost={handleMovePost}
                    />

                    <ContentPipeline posts={posts} />
                  </div>

                  <div className="space-y-5 xl:col-span-4">
                    <PerformanceChart />

                    <AiAssistantCard
                      onAddDraftFromIdea={handleAddDraftFromIdea}
                      onSpendCredits={handleSpendCredits}
                    />

                    <ApprovalQueue
                      posts={posts}
                      onApprove={handleApprovePost}
                      onReject={handleRejectPost}
                      onViewAll={() => setActiveNav('approvals')}
                    />
                  </div>
                </div>
              </>
            ) : (
              <SecondaryViews
                section={activeNav}
                posts={posts}
                theme={theme}
                onSetTheme={setTheme}
                onToggleTheme={toggleTheme}
                brandVoice={brandVoice}
                onSaveBrandVoice={setBrandVoice}
                onApprove={handleApprovePost}
                onReject={handleRejectPost}
                onSelectPost={(post) => setSelectedPostId(post.id)}
                onOpenCreate={(prefill) =>
                  handleOpenCreateModal(OPEN_SLOT_DAY, prefill ?? null)
                }
                onCreatePost={handleCreatePost}
                onSpendCredits={handleSpendCredits}
              />
            )}
          </main>
        </div>
      </div>

      <CreatePostModal
        open={createModalOpen}
        initialDay={createInitialDay}
        prefill={createPrefill}
        onClose={() => {
          setCreateModalOpen(false);
          setCreatePrefill(null);
        }}
        onCreatePost={handleCreatePost}
        onSpendCredits={handleSpendCredits}
      />

      <PostDetailDrawer
        post={selectedPost}
        onClose={() => setSelectedPostId(null)}
        onUpdateStatus={handleUpdateStatus}
        onUpdateMedia={handleUpdateMedia}
        onMoveDay={handleMovePost}
        onDeletePost={handleDeletePost}
      />
    </div>
  );
}
