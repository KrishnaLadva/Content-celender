import test from 'node:test';
import assert from 'node:assert/strict';
import { INITIAL_POSTS, WEEK_DAYS, WEEKLY_PERFORMANCE } from '../data/seedData';
import {
  buildDeterministicDigest,
  mergeAiDigestPayload,
} from './digestLogic';

test('buildDeterministicDigest surfaces pending approvals, open slots, and peak reach', () => {
  const digest = buildDeterministicDigest(
    INITIAL_POSTS,
    WEEKLY_PERFORMANCE,
    WEEK_DAYS,
    new Date('2026-11-16T08:00:00Z')
  );

  assert.equal(digest.priorityTasks.length, 3);
  assert.equal(digest.priorityTasks[0].actionType, 'review_queue');
  assert.ok(digest.priorityTasks[0].title.includes('2 pending'));
  assert.equal(digest.priorityTasks[1].actionType, 'fill_slot');
  assert.equal(digest.priorityTasks[1].targetDay, '2026-11-21');
  assert.equal(digest.performanceHighlights[0].metric, '12.4K');
  assert.ok(digest.headline.includes('12.4K'));
});

test('mergeAiDigestPayload preserves interactive action bindings while applying AI copy', () => {
  const fallback = buildDeterministicDigest(
    INITIAL_POSTS,
    WEEKLY_PERFORMANCE,
    WEEK_DAYS
  );
  const aiJson = JSON.stringify({
    headline: 'Two Apano posts await sign-off ahead of Thursday.',
    priorityTasks: [
      {
        title: 'Sign off on Gujarat Cabin Crew & FTO Fee Table',
        detail: 'Clear 2 pending approvals before 11:30 AM Thu 19.',
        priority: 'High',
      },
    ],
    performanceHighlights: [
      {
        metric: '12.4K',
        label: 'Saturday Peak Reach',
        detail: 'Highest reach projected on Nov 21.',
      },
    ],
  });

  const merged = mergeAiDigestPayload(aiJson, fallback);
  assert.equal(
    merged.headline,
    'Two Apano posts await sign-off ahead of Thursday.'
  );
  assert.equal(
    merged.priorityTasks[0].title,
    'Sign off on Gujarat Cabin Crew & FTO Fee Table'
  );
  assert.equal(merged.priorityTasks[0].actionType, 'review_queue');
  assert.equal(merged.performanceHighlights[0].label, 'Saturday Peak Reach');
});

test('mergeAiDigestPayload falls back cleanly on malformed JSON', () => {
  const fallback = buildDeterministicDigest(
    INITIAL_POSTS,
    WEEKLY_PERFORMANCE,
    WEEK_DAYS
  );
  const merged = mergeAiDigestPayload('{invalid json', fallback);
  assert.equal(merged.headline, fallback.headline);
  assert.equal(merged.priorityTasks.length, fallback.priorityTasks.length);
});
