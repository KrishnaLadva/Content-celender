import type { ContentPost, DayKey, PerformancePoint } from '../types/content';
import { computePipelineCounts, formatMetricCompact } from './contentLogic';

export type DigestActionType = 'review_queue' | 'fill_slot' | 'inspect_post';

export interface DigestTaskItem {
  id: string;
  title: string;
  detail: string;
  priority: 'High' | 'Medium';
  actionLabel: string;
  actionType: DigestActionType;
  targetDay?: DayKey;
  targetPostId?: string;
}

export interface DigestHighlightItem {
  id: string;
  metric: string;
  label: string;
  detail: string;
}

export interface DailyDigestData {
  headline: string;
  generatedAt: string;
  priorityTasks: DigestTaskItem[];
  performanceHighlights: DigestHighlightItem[];
}

export function buildDeterministicDigest(
  posts: ContentPost[],
  performance: PerformancePoint[],
  weekDays: Array<{ key: DayKey; label: string }>,
  now: Date = new Date()
): DailyDigestData {
  const counts = computePipelineCounts(posts);
  const pendingPosts = posts.filter((p) => p.status === 'pending_review');
  const inProgressPosts = posts.filter((p) => p.status === 'in_progress');

  const occupiedDays = new Set(posts.map((p) => p.dayKey));
  const emptyDay = weekDays.find((d) => !occupiedDays.has(d.key));
  const dayLookup = new Map(weekDays.map((d) => [d.key, d.label]));

  const tasks: DigestTaskItem[] = [];

  if (pendingPosts.length > 0) {
    const firstPending = pendingPosts[0];
    const pendingDayLabel =
      dayLookup.get(firstPending.dayKey) ?? firstPending.dayKey;
    tasks.push({
      id: 'task-pending-approvals',
      title: `Approve ${pendingPosts.length} pending ${
        pendingPosts.length === 1 ? 'post' : 'posts'
      } before ${pendingDayLabel}`,
      detail: `Next in queue: "${firstPending.title}" (${firstPending.pillar} · ${firstPending.time}).`,
      priority: 'High',
      actionLabel: 'Review',
      actionType: 'review_queue',
      targetPostId: firstPending.id,
    });
  } else {
    tasks.push({
      id: 'task-queue-clear',
      title: 'Approval queue is clear for this week',
      detail: 'All submitted posts have been reviewed and cleared for publishing.',
      priority: 'Medium',
      actionLabel: 'View Schedule',
      actionType: 'review_queue',
    });
  }

  if (emptyDay) {
    tasks.push({
      id: 'task-fill-open-slot',
      title: `Fill open publishing slot on ${emptyDay.label}`,
      detail:
        'Use this open day for a DGCA re-attempt or Gujarati CTWA post while top 9 LinkedIn rivals stay quiet.',
      priority: 'High',
      actionLabel: 'Add Post',
      actionType: 'fill_slot',
      targetDay: emptyDay.key,
    });
  }

  if (inProgressPosts.length > 0) {
    const draft = inProgressPosts[0];
    tasks.push({
      id: 'task-finalize-draft',
      title: `Finalize "${draft.title}"`,
      detail: `In progress (${draft.pillar}) for ${draft.time}. Verify sourced fee & DGCA figures before review.`,
      priority: 'Medium',
      actionLabel: 'Inspect',
      actionType: 'inspect_post',
      targetPostId: draft.id,
    });
  }

  if (tasks.length < 3) {
    tasks.push({
      id: 'task-scheduled-check',
      title: `Verify ${counts.scheduled} scheduled posts for neutral positioning`,
      detail: 'Confirm course-free messaging and CTWA links across LinkedIn, Instagram, and Meta.',
      priority: 'Medium',
      actionLabel: 'Inspect',
      actionType: 'inspect_post',
      targetPostId: posts[0]?.id,
    });
  }

  const peakPoint = performance.reduce(
    (best, cur) => (cur.reach > best.reach ? cur : best),
    performance[0] ?? {
      dateLabel: 'Nov 21',
      reach: 12400,
      engagement: 5350,
      clicks: 2180,
    }
  );
  const totalEngagement = performance.reduce((sum, p) => sum + p.engagement, 0);
  const totalClicks = performance.reduce((sum, p) => sum + p.clicks, 0);

  const highlights: DigestHighlightItem[] = [
    {
      id: 'hl-peak-reach',
      metric: formatMetricCompact(peakPoint.reach),
      label: `Peak Reach (${peakPoint.dateLabel})`,
      detail: `Weekly reach peaked with ${formatMetricCompact(
        peakPoint.engagement
      )} engagements on ${peakPoint.dateLabel}.`,
    },
    {
      id: 'hl-total-eng',
      metric: formatMetricCompact(totalEngagement),
      label: 'Weekly Engagement',
      detail: `${formatMetricCompact(
        totalClicks
      )} clicks across LinkedIn, Gujarati Reels, and Meta CTWA.`,
    },
    {
      id: 'hl-pipeline',
      metric: `${counts.scheduled + counts.approved}/${posts.length}`,
      label: 'Publish Ready',
      detail: `${counts.pending_review} awaiting sign-off and ${
        counts.in_progress + counts.idea
      } in research drafting.`,
    },
  ];

  const headline =
    pendingPosts.length > 0
      ? `${pendingPosts.length} Apano items need approval and ${
          emptyDay ? `${emptyDay.label} has an open slot` : 'all 7 days are covered'
        } while weekly reach peaks at ${formatMetricCompact(peakPoint.reach)}.`
      : `All Apano approvals are cleared and ${
          counts.scheduled + counts.approved
        } posts are ready, led by ${formatMetricCompact(peakPoint.reach)} peak reach.`;

  return {
    headline,
    generatedAt: now.toISOString(),
    priorityTasks: tasks.slice(0, 3),
    performanceHighlights: highlights,
  };
}

export function mergeAiDigestPayload(
  rawJson: string,
  fallback: DailyDigestData
): DailyDigestData {
  try {
    const parsed = JSON.parse(rawJson) as Partial<{
      headline: string;
      priorityTasks: Array<{ title: string; detail: string; priority?: string }>;
      performanceHighlights: Array<{
        metric: string;
        label: string;
        detail: string;
      }>;
    }>;

    const headline =
      typeof parsed.headline === 'string' && parsed.headline.trim().length > 0
        ? parsed.headline.trim()
        : fallback.headline;

    const priorityTasks = fallback.priorityTasks.map((baseTask, index) => {
      const aiTask = parsed.priorityTasks?.[index];
      if (
        !aiTask ||
        typeof aiTask.title !== 'string' ||
        typeof aiTask.detail !== 'string'
      ) {
        return baseTask;
      }
      return {
        ...baseTask,
        title: aiTask.title.trim() || baseTask.title,
        detail: aiTask.detail.trim() || baseTask.detail,
        priority:
          aiTask.priority === 'High' || aiTask.priority === 'Medium'
            ? aiTask.priority
            : baseTask.priority,
      };
    });

    const performanceHighlights = fallback.performanceHighlights.map(
      (baseHl, index) => {
        const aiHl = parsed.performanceHighlights?.[index];
        if (
          !aiHl ||
          typeof aiHl.label !== 'string' ||
          typeof aiHl.detail !== 'string'
        ) {
          return baseHl;
        }
        return {
          ...baseHl,
          metric:
            typeof aiHl.metric === 'string' && aiHl.metric.trim()
              ? aiHl.metric.trim()
              : baseHl.metric,
          label: aiHl.label.trim() || baseHl.label,
          detail: aiHl.detail.trim() || baseHl.detail,
        };
      }
    );

    return {
      headline,
      generatedAt: new Date().toISOString(),
      priorityTasks,
      performanceHighlights,
    };
  } catch {
    return fallback;
  }
}
