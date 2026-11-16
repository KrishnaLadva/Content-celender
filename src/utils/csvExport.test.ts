import test from 'node:test';
import assert from 'node:assert/strict';
import type { ContentPost } from '../types/content';
import { buildCsvFilename, serializePostsToCsv } from './csvExport';

const samplePosts: ContentPost[] = [
  {
    id: 'p-2',
    title: 'Launch "Alpha", Phase 1',
    caption: 'Line one\nLine two, with comma',
    platform: 'linkedin',
    dayKey: '2026-11-18',
    time: '10:30 AM',
    status: 'scheduled',
    mediaType: 'image',
    author: 'Apano Research',
    pillar: 'Neutral Guidance',
    competitorAngle: 'Compare India FTOs neutrally',
  },
  {
    id: 'p-1',
    title: '=SUM(A1:A5) Formula Test',
    caption: 'Normal caption',
    platform: 'instagram',
    dayKey: '2026-11-16',
    time: '09:00 AM',
    status: 'pending_review',
    mediaType: 'video',
    author: 'Gujarat Desk',
    pillar: 'Fee Clarity',
    competitorAngle: 'Resolve ₹45L vs ₹65L quotes',
  },
];

test('serializePostsToCsv outputs header row and sorts posts chronologically by dayKey', () => {
  const csv = serializePostsToCsv(samplePosts);
  const lines = csv.split('\r\n');
  assert.equal(
    lines[0],
    'ID,Day,Date,Time,Platform,Status,Pillar,Competitor Angle,Media Type,Title,Caption,Author'
  );
  assert.ok(
    lines[1].startsWith(
      'p-1,Mon 16,2026-11-16,09:00 AM,Instagram,Pending Review,Fee Clarity,Resolve ₹45L vs ₹65L quotes,video,'
    )
  );
});

test('serializePostsToCsv escapes quotes, commas, newlines, and spreadsheet formulas', () => {
  const csv = serializePostsToCsv(samplePosts);
  assert.ok(csv.includes("'=SUM(A1:A5) Formula Test"));
  assert.ok(csv.includes('"Launch ""Alpha"", Phase 1"'));
  assert.ok(csv.includes('"Line one\nLine two, with comma"'));
});

test('serializePostsToCsv returns header-only CSV when posts array is empty', () => {
  const csv = serializePostsToCsv([]);
  assert.equal(
    csv,
    'ID,Day,Date,Time,Platform,Status,Pillar,Competitor Angle,Media Type,Title,Caption,Author'
  );
});

test('buildCsvFilename includes platform filter and ISO date', () => {
  const filename = buildCsvFilename(
    'linkedin',
    new Date('2026-11-16T12:00:00Z')
  );
  assert.equal(filename, 'apano-aviation-calendar-linkedin-2026-11-16.csv');
});
