import type {
  ContentPillar,
  ContentPost,
  DayKey,
  Platform,
  PostStatus,
} from '../types/content';

export interface PipelineCounts {
  idea: number;
  in_progress: number;
  pending_review: number;
  approved: number;
  scheduled: number;
}

const THUMBNAIL_BY_PILLAR: Record<ContentPillar, string> = {
  'Neutral Guidance':
    '/src/assets/images/apano_cockpit_briefing_1794833551164.jpg',
  'Fee Clarity':
    '/src/assets/images/apano_cpl_cost_logbook_1794833553060.jpg',
  'DGCA Re-Attempt':
    '/src/assets/images/apano_dgca_navigation_1794833551656.jpg',
  'Gujarat & Parents':
    '/src/assets/images/apano_gujarat_pilot_reel_1794833552944.jpg',
  'LinkedIn Authority':
    '/src/assets/images/apano_fto_hangar_fleet_1794833552431.jpg',
};

export function pickMediaAssetForPost(input: {
  pillar: ContentPillar;
  title?: string;
  platform?: Platform;
}): { thumbnailUrl: string; mediaType: 'image' | 'video' } {
  const lower = (input.title ?? '').toLowerCase();
  const isReelOrWebinar =
    lower.includes('reel') ||
    lower.includes('webinar') ||
    lower.includes('cabin crew') ||
    lower.includes('briefing') ||
    input.platform === 'instagram';

  if (lower.includes('cabin crew') || lower.includes('skytech') || lower.includes('frankfinn')) {
    return {
      thumbnailUrl:
        '/src/assets/images/apano_cabin_crew_terminal_1794833554655.jpg',
      mediaType: 'video',
    };
  }
  if (lower.includes('fto') || lower.includes('hangar') || lower.includes('fleet')) {
    return {
      thumbnailUrl:
        '/src/assets/images/apano_fto_hangar_fleet_1794833552431.jpg',
      mediaType: lower.includes('webinar') ? 'video' : 'image',
    };
  }
  if (lower.includes('dgca') || lower.includes('navigation') || lower.includes('paper')) {
    return {
      thumbnailUrl:
        '/src/assets/images/apano_dgca_navigation_1794833551656.jpg',
      mediaType: isReelOrWebinar && lower.includes('reel') ? 'video' : 'image',
    };
  }

  return {
    thumbnailUrl: THUMBNAIL_BY_PILLAR[input.pillar],
    mediaType: isReelOrWebinar ? 'video' : 'image',
  };
}

export function filterPosts(
  posts: ContentPost[],
  platformFilter: Platform | 'all',
  searchQuery = '',
  pillarFilter: ContentPillar | 'all' = 'all'
): ContentPost[] {
  const normalized = searchQuery.trim().toLowerCase();
  return posts.filter((post) => {
    const matchesPlatform =
      platformFilter === 'all' || post.platform === platformFilter;
    const matchesPillar =
      pillarFilter === 'all' || post.pillar === pillarFilter;
    const matchesSearch =
      normalized.length === 0 ||
      post.title.toLowerCase().includes(normalized) ||
      post.caption.toLowerCase().includes(normalized) ||
      post.competitorAngle.toLowerCase().includes(normalized);
    return matchesPlatform && matchesPillar && matchesSearch;
  });
}

export function groupPostsByDay(
  posts: ContentPost[],
  days: DayKey[]
): Record<DayKey, ContentPost[]> {
  const grouped = {} as Record<DayKey, ContentPost[]>;
  for (const day of days) {
    grouped[day] = [];
  }
  for (const post of posts) {
    if (grouped[post.dayKey]) {
      grouped[post.dayKey].push(post);
    }
  }
  return grouped;
}

export function computePipelineCounts(posts: ContentPost[]): PipelineCounts {
  const counts: PipelineCounts = {
    idea: 0,
    in_progress: 0,
    pending_review: 0,
    approved: 0,
    scheduled: 0,
  };
  for (const post of posts) {
    counts[post.status] += 1;
  }
  return counts;
}

export function updatePostStatus(
  posts: ContentPost[],
  postId: string,
  nextStatus: PostStatus
): ContentPost[] {
  return posts.map((post) =>
    post.id === postId ? { ...post, status: nextStatus } : post
  );
}

export function updatePostMedia(
  posts: ContentPost[],
  postId: string,
  mediaType: 'image' | 'video' | 'text',
  thumbnailUrl?: string
): ContentPost[] {
  return posts.map((post) =>
    post.id === postId
      ? {
          ...post,
          mediaType,
          thumbnailUrl: mediaType === 'text' ? undefined : thumbnailUrl ?? post.thumbnailUrl,
        }
      : post
  );
}

export function movePostToDay(
  posts: ContentPost[],
  postId: string,
  targetDay: DayKey
): ContentPost[] {
  return posts.map((post) =>
    post.id === postId ? { ...post, dayKey: targetDay } : post
  );
}

export function formatMetricCompact(value: number): string {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  }
  return String(value);
}

export function deductCredits(
  used: number,
  limit: number,
  cost: number
): { nextUsed: number; allowed: boolean } {
  if (cost < 0 || used + cost > limit) {
    return { nextUsed: used, allowed: false };
  }
  return { nextUsed: used + cost, allowed: true };
}
