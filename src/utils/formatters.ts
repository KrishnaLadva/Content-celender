import type { Platform, PostStatus } from '../types/content';

export function getPlatformLabel(platform: Platform): string {
  switch (platform) {
    case 'instagram':
      return 'Instagram';
    case 'facebook':
      return 'Facebook';
    case 'linkedin':
      return 'LinkedIn';
  }
}

export function getStatusMeta(status: PostStatus): {
  label: string;
  textClass: string;
} {
  switch (status) {
    case 'scheduled':
      return {
        label: 'Scheduled',
        textClass: 'text-sky-600 dark:text-sky-400',
      };
    case 'approved':
      return {
        label: 'Approved',
        textClass: 'text-emerald-600 dark:text-emerald-400',
      };
    case 'pending_review':
      return {
        label: 'Pending Review',
        textClass: 'text-amber-600 dark:text-amber-400',
      };
    case 'in_progress':
      return {
        label: 'In Progress',
        textClass: 'text-violet-600 dark:text-violet-400',
      };
    case 'idea':
      return {
        label: 'Draft Idea',
        textClass: 'text-slate-600 dark:text-slate-400',
      };
  }
}
