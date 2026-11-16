import test from 'node:test';
import assert from 'node:assert/strict';
import type { ContentPost, DayKey } from '../types/content';
import {
  computePipelineCounts,
  deductCredits,
  filterPosts,
  formatMetricCompact,
  groupPostsByDay,
  movePostToDay,
  pickMediaAssetForPost,
  updatePostMedia,
  updatePostStatus,
} from './contentLogic';

const samplePosts: ContentPost[] = [
  {
    id: 'p1',
    title: 'Why Apano Runs Zero Ground Classes',
    caption: "Counter The Pilot's Compass ground school upsell.",
    platform: 'linkedin',
    dayKey: '2026-11-16',
    time: '09:30 AM',
    status: 'scheduled',
    mediaType: 'image',
    author: 'Apano Research',
    pillar: 'Neutral Guidance',
    competitorAngle: "Counter Pilot's Compass ground classes",
  },
  {
    id: 'p2',
    title: 'Truth About Cabin Crew Ads',
    caption: 'Breaking down Frankfinn Rajkot and Skytech Ahmedabad pricing.',
    platform: 'facebook',
    dayKey: '2026-11-19',
    time: '11:30 AM',
    status: 'pending_review',
    mediaType: 'video',
    author: 'Gujarat Desk',
    pillar: 'Fee Clarity',
    competitorAngle: 'Counter Frankfinn asterisk fees',
  },
  {
    id: 'p3',
    title: 'DGCA Re-Attempt Playbook',
    caption: 'Recovering failed navigation papers.',
    platform: 'linkedin',
    dayKey: '2026-11-19',
    time: '03:00 PM',
    status: 'in_progress',
    mediaType: 'image',
    author: 'Apano Research',
    pillar: 'DGCA Re-Attempt',
    competitorAngle: 'Own failed papers white space',
  },
];

test('filterPosts filters by platform, pillar, and search query accurately', () => {
  assert.equal(filterPosts(samplePosts, 'all').length, 3);
  assert.equal(filterPosts(samplePosts, 'linkedin').length, 2);
  assert.equal(filterPosts(samplePosts, 'all', '', 'Fee Clarity').length, 1);
  assert.equal(filterPosts(samplePosts, 'all', 'frankfinn').length, 1);
  assert.equal(filterPosts(samplePosts, 'instagram', 'frankfinn').length, 0);
});

test('computePipelineCounts and updatePostStatus stay synchronized', () => {
  const initialCounts = computePipelineCounts(samplePosts);
  assert.equal(initialCounts.scheduled, 1);
  assert.equal(initialCounts.pending_review, 1);
  assert.equal(initialCounts.in_progress, 1);

  const approved = updatePostStatus(samplePosts, 'p2', 'scheduled');
  const nextCounts = computePipelineCounts(approved);
  assert.equal(nextCounts.pending_review, 0);
  assert.equal(nextCounts.scheduled, 2);
});

test('groupPostsByDay and movePostToDay organize posts cleanly', () => {
  const days: DayKey[] = ['2026-11-16', '2026-11-19', '2026-11-21'];
  const moved = movePostToDay(samplePosts, 'p1', '2026-11-21');
  const grouped = groupPostsByDay(moved, days);
  assert.equal(grouped['2026-11-16'].length, 0);
  assert.equal(grouped['2026-11-19'].length, 2);
  assert.equal(grouped['2026-11-21'].length, 1);
});

test('pickMediaAssetForPost and updatePostMedia match post topic, pillar, and reel format', () => {
  const crewReel = pickMediaAssetForPost({
    pillar: 'Fee Clarity',
    title: 'Cabin Crew Ads in Rajkot',
    platform: 'facebook',
  });
  assert.equal(crewReel.mediaType, 'video');
  assert.ok(crewReel.thumbnailUrl.includes('apano_cabin_crew_terminal'));

  const dgcaGuide = pickMediaAssetForPost({
    pillar: 'DGCA Re-Attempt',
    title: 'DGCA Failed Paper Recovery',
    platform: 'linkedin',
  });
  assert.equal(dgcaGuide.mediaType, 'image');
  assert.ok(dgcaGuide.thumbnailUrl.includes('apano_dgca_navigation'));

  const updated = updatePostMedia(
    samplePosts,
    'p1',
    'video',
    '/src/assets/images/apano_gujarat_pilot_reel_1794833552944.jpg'
  );
  assert.equal(updated[0].mediaType, 'video');
  assert.ok(updated[0].thumbnailUrl?.includes('apano_gujarat_pilot_reel'));
});

test('deductCredits enforces quota limits and formatMetricCompact formats thousands', () => {
  assert.deepEqual(deductCredits(2450, 5000, 50), {
    nextUsed: 2500,
    allowed: true,
  });
  assert.deepEqual(deductCredits(4980, 5000, 50), {
    nextUsed: 4980,
    allowed: false,
  });
  assert.equal(formatMetricCompact(12400), '12.4K');
  assert.equal(formatMetricCompact(850), '850');
});
