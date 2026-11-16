import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { CONTENT_PILLARS, WEEK_DAYS } from '../data/seedData';
import type {
  ContentPillar,
  ContentPost,
  DayKey,
  Platform,
} from '../types/content';
import { filterPosts, groupPostsByDay } from '../utils/contentLogic';
import {
  MediaThumbnail,
  PlatformIcon,
  getPlatformLabel,
  getStatusMeta,
} from './PlatformBadge';

interface ContentCalendarProps {
  posts: ContentPost[];
  platformFilter: Platform | 'all';
  pillarFilter: ContentPillar | 'all';
  onChangePlatformFilter: (platform: Platform | 'all') => void;
  onChangePillarFilter: (pillar: ContentPillar | 'all') => void;
  onSelectPost: (post: ContentPost) => void;
  onOpenCreateForDay: (day: DayKey) => void;
  onMovePost: (postId: string, targetDay: DayKey) => void;
}

const PLATFORM_OPTIONS: Array<{ id: Platform | 'all'; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'facebook', label: 'Facebook' },
];

export function ContentCalendar({
  posts,
  platformFilter,
  pillarFilter,
  onChangePlatformFilter,
  onChangePillarFilter,
  onSelectPost,
  onOpenCreateForDay,
  onMovePost,
}: ContentCalendarProps) {
  const [viewMode, setViewMode] = useState<'week' | 'list'>('week');
  const [selectedDay, setSelectedDay] = useState<DayKey>('2026-11-16');
  const [weekOffset, setWeekOffset] = useState(0);
  const [draggedPostId, setDraggedPostId] = useState<string | null>(null);
  const [dropTargetDay, setDropTargetDay] = useState<DayKey | null>(null);

  const visiblePosts = filterPosts(posts, platformFilter, '', pillarFilter);
  const grouped = groupPostsByDay(
    visiblePosts,
    WEEK_DAYS.map((d) => d.key)
  );

  const weekRangeLabel =
    weekOffset === 0
      ? 'Nov 16 – Nov 22, 2026'
      : weekOffset < 0
        ? 'Nov 9 – Nov 15, 2026'
        : 'Nov 23 – Nov 29, 2026';

  const selectedDayMeta =
    WEEK_DAYS.find((d) => d.key === selectedDay) ?? WEEK_DAYS[0];

  return (
    <section
      aria-label="Content Calendar"
      className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 dark:border-slate-800/90 dark:bg-[#0C1222]"
    >
      <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 dark:border-slate-800/80">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-display text-sm font-semibold text-slate-900 dark:text-slate-50 whitespace-nowrap">
              Content Calendar
            </h2>

            <div className="inline-flex items-center gap-0.5 rounded-lg border border-slate-200 bg-slate-50 px-1 py-0.5 dark:border-slate-800 dark:bg-[#11182C]">
              <button
                type="button"
                onClick={() => setWeekOffset((w) => Math.max(-1, w - 1))}
                aria-label="Previous week"
                className="inline-flex h-7 w-6 items-center justify-center rounded-md text-slate-600 hover:bg-white hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
              >
                <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <span className="px-1 text-[11px] font-medium text-slate-700 dark:text-slate-200 whitespace-nowrap">
                {weekRangeLabel}
              </span>
              <button
                type="button"
                onClick={() => setWeekOffset((w) => Math.min(1, w + 1))}
                aria-label="Next week"
                className="inline-flex h-7 w-6 items-center justify-center rounded-md text-slate-600 hover:bg-white hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
              >
                <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                setWeekOffset(0);
                setSelectedDay('2026-11-16');
              }}
              className="h-8 rounded-lg border border-slate-200 bg-white px-2.5 text-[11px] font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-[#11182C] dark:text-slate-200 dark:hover:bg-slate-800 whitespace-nowrap"
            >
              Today
            </button>
          </div>

          <div
            role="group"
            aria-label="Calendar view mode"
            className="hidden md:inline-flex items-center rounded-lg border border-slate-200 bg-slate-100 p-0.5 dark:border-slate-800 dark:bg-[#0A1020]"
          >
            <button
              type="button"
              onClick={() => setViewMode('week')}
              aria-pressed={viewMode === 'week'}
              className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors whitespace-nowrap ${
                viewMode === 'week'
                  ? 'bg-white text-slate-900 shadow-xs dark:bg-[#17213B] dark:text-slate-100'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
              }`}
            >
              Week
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              aria-pressed={viewMode === 'list'}
              className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors whitespace-nowrap ${
                viewMode === 'list'
                  ? 'bg-white text-slate-900 shadow-xs dark:bg-[#17213B] dark:text-slate-100'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
              }`}
            >
              List
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div
            role="group"
            aria-label="Filter by platform"
            className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-100 p-0.5 dark:border-slate-800 dark:bg-[#0A1020]"
          >
            {PLATFORM_OPTIONS.map((opt) => {
              const active = platformFilter === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onChangePlatformFilter(opt.id)}
                  aria-pressed={active}
                  className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors whitespace-nowrap ${
                    active
                      ? 'bg-white text-slate-900 shadow-xs dark:bg-[#17213B] dark:text-slate-100'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="calendar-pillar-filter" className="sr-only">
              Filter by research pillar
            </label>
            <select
              id="calendar-pillar-filter"
              value={pillarFilter}
              onChange={(e) =>
                onChangePillarFilter(e.target.value as ContentPillar | 'all')
              }
              aria-label="Filter by research pillar"
              className="h-8 rounded-lg border border-slate-200 bg-slate-50 px-2.5 text-[11px] font-medium text-slate-700 focus-visible:outline-2 focus-visible:outline-blue-500 dark:border-slate-800 dark:bg-[#11182C] dark:text-slate-200"
            >
              <option value="all">All Pillars</option>
              {CONTENT_PILLARS.map((pillar) => (
                <option key={pillar} value={pillar}>
                  {pillar}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Day Strip + Agenda List (< md) */}
      <div className="mt-4 md:hidden">
        <div
          role="tablist"
          aria-label="Select day"
          className="flex gap-1.5 overflow-x-auto pb-2"
        >
          {WEEK_DAYS.map((day) => {
            const isSelected = selectedDay === day.key;
            const count = grouped[day.key].length;
            return (
              <button
                key={day.key}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedDay(day.key)}
                className={`flex shrink-0 flex-col items-center rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-500/80 dark:bg-blue-500/15 dark:text-blue-300'
                    : 'border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-[#11182C] dark:text-slate-400'
                }`}
              >
                <span className="whitespace-nowrap">{day.label}</span>
                <span className="mt-0.5 font-mono-num text-[11px] opacity-75">
                  {count} {count === 1 ? 'post' : 'posts'}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-3 space-y-2.5">
          {grouped[selectedDayMeta.key].length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-center dark:border-slate-800 dark:bg-[#0A1020]">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                No posts scheduled for {selectedDayMeta.label}
              </p>
              <button
                type="button"
                onClick={() => onOpenCreateForDay(selectedDayMeta.key)}
                className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-blue-700"
              >
                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Schedule Post</span>
              </button>
            </div>
          ) : (
            grouped[selectedDayMeta.key].map((post) => {
              const statusMeta = getStatusMeta(post.status);
              return (
                <button
                  key={post.id}
                  type="button"
                  onClick={() => onSelectPost(post)}
                  className="flex w-full items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-left transition-colors hover:border-blue-400 dark:border-slate-800 dark:bg-[#11182C] dark:hover:border-blue-500/60"
                >
                  <MediaThumbnail
                    src={post.thumbnailUrl}
                    alt={post.title}
                    mediaType={post.mediaType}
                    title={post.title}
                    compact
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <PlatformIcon platform={post.platform} size="sm" />
                      <span>{getPlatformLabel(post.platform)}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-num">{post.time}</span>
                      <span aria-hidden="true">·</span>
                      <span>{post.pillar}</span>
                    </div>
                    <p className="mt-1 truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {post.title}
                    </p>
                    <p className={`mt-0.5 text-xs font-medium ${statusMeta.textClass}`}>
                      {statusMeta.label}
                    </p>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Desktop Week Matrix or List View (>= md) */}
      <div className="mt-4 hidden md:block">
        {viewMode === 'list' ? (
          <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 dark:divide-slate-800/80 dark:border-slate-800">
            {visiblePosts.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  No posts match the selected filter.
                </p>
              </div>
            ) : (
              visiblePosts.map((post) => {
                const statusMeta = getStatusMeta(post.status);
                const dayLabel =
                  WEEK_DAYS.find((d) => d.key === post.dayKey)?.label ?? post.dayKey;
                return (
                  <button
                    key={post.id}
                    type="button"
                    onClick={() => onSelectPost(post)}
                    className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition-colors hover:bg-slate-50 dark:hover:bg-[#11182C]"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <PlatformIcon platform={post.platform} size="sm" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">
                          {post.title}
                        </p>
                        <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                          {dayLabel} · <span className="font-mono-num">{post.time}</span> ·{' '}
                          {post.pillar} · {post.competitorAngle}
                        </p>
                      </div>
                    </div>
                    <span className={`text-xs font-semibold shrink-0 ${statusMeta.textClass}`}>
                      {statusMeta.label}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        ) : (
          <div className="grid grid-cols-7 gap-2.5">
            {WEEK_DAYS.map((day) => {
              const dayPosts = grouped[day.key];
              const isDropActive = dropTargetDay === day.key;
              return (
                <div
                  key={day.key}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDropTargetDay(day.key);
                  }}
                  onDragLeave={() => {
                    if (dropTargetDay === day.key) setDropTargetDay(null);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (draggedPostId) {
                      onMovePost(draggedPostId, day.key);
                    }
                    setDraggedPostId(null);
                    setDropTargetDay(null);
                  }}
                  className={`flex min-h-[300px] flex-col rounded-xl border p-2 transition-colors ${
                    isDropActive
                      ? 'border-blue-500 bg-blue-50/70 dark:border-blue-400 dark:bg-blue-500/15'
                      : day.isToday
                        ? 'border-blue-500/70 bg-blue-50/50 dark:border-blue-500/60 dark:bg-blue-500/[0.06]'
                        : 'border-slate-200 bg-slate-50/70 dark:border-slate-800/80 dark:bg-[#090E1B]'
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between px-1">
                    <span
                      className={`text-xs font-semibold ${
                        day.isToday
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {day.label}
                    </span>
                    <button
                      type="button"
                      onClick={() => onOpenCreateForDay(day.key)}
                      aria-label={`Add post on ${day.label}`}
                      className="inline-flex h-5 w-5 items-center justify-center rounded text-slate-400 hover:bg-slate-200/70 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                    >
                      <Plus className="h-3 w-3" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="flex flex-1 flex-col gap-2">
                    {dayPosts.length === 0 ? (
                      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-slate-200 p-2 text-center dark:border-slate-800/80">
                        <span className="text-[11px] text-slate-400 dark:text-slate-500">
                          Open slot
                        </span>
                      </div>
                    ) : (
                      dayPosts.map((post) => {
                        const statusMeta = getStatusMeta(post.status);
                        return (
                          <button
                            key={post.id}
                            type="button"
                            draggable
                            onDragStart={() => setDraggedPostId(post.id)}
                            onDragEnd={() => {
                              setDraggedPostId(null);
                              setDropTargetDay(null);
                            }}
                            onClick={() => onSelectPost(post)}
                            className="group flex flex-col gap-1.5 rounded-lg border border-slate-200 bg-white p-1.5 text-left transition-colors hover:border-blue-400 focus-visible:outline-2 focus-visible:outline-blue-500 dark:border-slate-800 dark:bg-[#121A2F] dark:hover:border-blue-500/70"
                          >
                            <div className="flex items-center justify-between gap-1">
                              <PlatformIcon platform={post.platform} size="sm" />
                              <span className="font-mono-num text-[10px] text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                {post.time}
                              </span>
                            </div>

                            <MediaThumbnail
                              src={post.thumbnailUrl}
                              alt={post.title}
                              mediaType={post.mediaType}
                              title={post.title}
                            />

                            <p className="line-clamp-2 text-xs font-medium leading-snug text-slate-900 dark:text-slate-100">
                              {post.title}
                            </p>

                            <p className="truncate text-[10px] text-slate-500 dark:text-slate-400">
                              {post.pillar}
                            </p>

                            <span
                              className={`text-[11px] font-semibold ${statusMeta.textClass}`}
                            >
                              {statusMeta.label}
                            </span>
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-center">
        <button
          type="button"
          onClick={() => onOpenCreateForDay('2026-11-21')}
          className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-4 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-800 dark:bg-[#121A2F] dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Add Content</span>
        </button>
      </div>
    </section>
  );
}
