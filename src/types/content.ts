export type ThemeMode = 'dark' | 'light';

export type Platform = 'instagram' | 'facebook' | 'linkedin';

export type PostStatus =
  | 'idea'
  | 'in_progress'
  | 'pending_review'
  | 'approved'
  | 'scheduled';

export type NavSection =
  | 'dashboard'
  | 'competitors'
  | 'planner'
  | 'studio'
  | 'calendar'
  | 'approvals'
  | 'analytics'
  | 'brand_voice'
  | 'settings';

export type DayKey =
  | '2026-11-16'
  | '2026-11-17'
  | '2026-11-18'
  | '2026-11-19'
  | '2026-11-20'
  | '2026-11-21'
  | '2026-11-22';

export type ContentPillar =
  | 'Neutral Guidance'
  | 'Fee Clarity'
  | 'DGCA Re-Attempt'
  | 'Gujarat & Parents'
  | 'LinkedIn Authority';

export interface ContentPost {
  id: string;
  title: string;
  caption: string;
  platform: Platform;
  dayKey: DayKey;
  time: string;
  status: PostStatus;
  mediaType: 'image' | 'video' | 'text';
  thumbnailUrl?: string;
  author: string;
  pillar: ContentPillar;
  competitorAngle: string;
}

export interface ConnectedAccount {
  id: string;
  platform: Platform;
  name: string;
  handle: string;
  synced: boolean;
}

export interface PerformancePoint {
  dateLabel: string;
  reach: number;
  engagement: number;
  clicks: number;
}

export interface BrandVoiceConfig {
  tone: string;
  audience: string;
  pillars: string[];
  guidelines: string;
}
