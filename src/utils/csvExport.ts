import { WEEK_DAYS } from '../data/seedData';
import type { ContentPost, Platform } from '../types/content';
import { getPlatformLabel, getStatusMeta } from './formatters';

function escapeCsvCell(value: string): string {
  const formulaSafe = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
  if (/[",\r\n]/.test(formulaSafe)) {
    return `"${formulaSafe.replace(/"/g, '""')}"`;
  }
  return formulaSafe;
}

export function serializePostsToCsv(posts: ContentPost[]): string {
  const headers = [
    'ID',
    'Day',
    'Date',
    'Time',
    'Platform',
    'Status',
    'Pillar',
    'Competitor Angle',
    'Media Type',
    'Title',
    'Caption',
    'Author',
  ];

  const sorted = [...posts].sort((a, b) => {
    if (a.dayKey !== b.dayKey) {
      return a.dayKey.localeCompare(b.dayKey);
    }
    return a.time.localeCompare(b.time);
  });

  const dayLookup = new Map(WEEK_DAYS.map((d) => [d.key, d.label]));

  const rows = sorted.map((post) => {
    const dayLabel = dayLookup.get(post.dayKey) ?? post.dayKey;
    const statusLabel = getStatusMeta(post.status).label;
    const platformLabel = getPlatformLabel(post.platform);
    return [
      post.id,
      dayLabel,
      post.dayKey,
      post.time,
      platformLabel,
      statusLabel,
      post.pillar,
      post.competitorAngle,
      post.mediaType,
      post.title,
      post.caption,
      post.author,
    ]
      .map((cell) => escapeCsvCell(String(cell)))
      .join(',');
  });

  return [headers.join(','), ...rows].join('\r\n');
}

export function buildCsvFilename(
  platformFilter: Platform | 'all',
  date: Date = new Date()
): string {
  const isoDate = date.toISOString().slice(0, 10);
  return `apano-aviation-calendar-${platformFilter}-${isoDate}.csv`;
}

export function downloadCsvFile(filename: string, csvContent: string): void {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
