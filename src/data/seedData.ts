import type {
  BrandVoiceConfig,
  ConnectedAccount,
  ContentPillar,
  ContentPost,
  DayKey,
  PerformancePoint,
} from '../types/content';

export interface CalendarDayMeta {
  key: DayKey;
  label: string;
  shortLabel: string;
  isToday?: boolean;
}

export interface MediaAssetOption {
  id: string;
  label: string;
  pillarHint: ContentPillar;
  url: string;
}

export const APANO_MEDIA_ASSETS: MediaAssetOption[] = [
  {
    id: 'cockpit-briefing',
    label: 'Cockpit Instructor Briefing',
    pillarHint: 'Neutral Guidance',
    url: '/src/assets/images/apano_cockpit_briefing_1794833551164.jpg',
  },
  {
    id: 'cpl-cost-logbook',
    label: 'CPL Fee Sheet & Pilot Logbook',
    pillarHint: 'Fee Clarity',
    url: '/src/assets/images/apano_cpl_cost_logbook_1794833553060.jpg',
  },
  {
    id: 'dgca-navigation',
    label: 'DGCA E6B & Navigation Chart',
    pillarHint: 'DGCA Re-Attempt',
    url: '/src/assets/images/apano_dgca_navigation_1794833551656.jpg',
  },
  {
    id: 'gujarat-pilot-reel',
    label: 'Student Pilot Sunset Reel Cover',
    pillarHint: 'Gujarat & Parents',
    url: '/src/assets/images/apano_gujarat_pilot_reel_1794833552944.jpg',
  },
  {
    id: 'fto-hangar-fleet',
    label: 'FTO Hangar & Trainer Fleet',
    pillarHint: 'LinkedIn Authority',
    url: '/src/assets/images/apano_fto_hangar_fleet_1794833552431.jpg',
  },
  {
    id: 'cabin-crew-terminal',
    label: 'Cabin Crew Terminal Briefing',
    pillarHint: 'Fee Clarity',
    url: '/src/assets/images/apano_cabin_crew_terminal_1794833554655.jpg',
  },
];

export const CONTENT_PILLARS: ContentPillar[] = [
  'Neutral Guidance',
  'Fee Clarity',
  'DGCA Re-Attempt',
  'Gujarat & Parents',
  'LinkedIn Authority',
];

export const WEEK_DAYS: CalendarDayMeta[] = [
  { key: '2026-11-16', label: 'Mon 16', shortLabel: 'Mon', isToday: true },
  { key: '2026-11-17', label: 'Tue 17', shortLabel: 'Tue' },
  { key: '2026-11-18', label: 'Wed 18', shortLabel: 'Wed' },
  { key: '2026-11-19', label: 'Thu 19', shortLabel: 'Thu' },
  { key: '2026-11-20', label: 'Fri 20', shortLabel: 'Fri' },
  { key: '2026-11-21', label: 'Sat 21', shortLabel: 'Sat' },
  { key: '2026-11-22', label: 'Sun 22', shortLabel: 'Sun' },
];

export const INITIAL_POSTS: ContentPost[] = [
  {
    id: 'post-1',
    title: 'Why Apano Runs Zero Ground Classes',
    caption:
      "Almost every guidance rival—from The Pilot's Compass (Ground Classes Batch 2) to FMS and Top Crew—upsells its own coaching. Apano stays 100% course-free so every FTO recommendation stays unbiased.",
    platform: 'linkedin',
    dayKey: '2026-11-16',
    time: '09:30 AM',
    status: 'scheduled',
    mediaType: 'image',
    thumbnailUrl: '/src/assets/images/apano_cockpit_briefing_1794833551164.jpg',
    author: 'Apano Research',
    pillar: 'Neutral Guidance',
    competitorAngle: "Counter Pilot's Compass & FMS dual-model bias",
  },
  {
    id: 'post-2',
    title: 'CPL All-In Cost: ₹45L vs ₹65L vs ₹1Cr+',
    caption:
      'Golden Epaulettes quotes ~₹55L while other sites cite ₹45–65L or ₹1Cr+. Here is a sourced side-by-side breakdown covering flying hours, DGCA exams, housing, and conversion fees.',
    platform: 'instagram',
    dayKey: '2026-11-16',
    time: '06:30 PM',
    status: 'scheduled',
    mediaType: 'image',
    thumbnailUrl: '/src/assets/images/apano_cpl_cost_logbook_1794833553060.jpg',
    author: 'Apano Editorial',
    pillar: 'Fee Clarity',
    competitorAngle: 'Resolve Golden Epaulettes & ThePilot.in fee clash',
  },
  {
    id: 'post-3',
    title: 'Free Parent Webinar: FTO & Loan Checklist',
    caption:
      'RSA, AeroMitra, and Wind Chasers offer free career webinars—making ₹99 tickets hard to sell. Join Apano’s free unbiased session for Class 12 parents on verifying DGCA ratings and fleet hours.',
    platform: 'facebook',
    dayKey: '2026-11-17',
    time: '11:00 AM',
    status: 'scheduled',
    mediaType: 'video',
    thumbnailUrl: '/src/assets/images/apano_fto_hangar_fleet_1794833552431.jpg',
    author: 'Apano Counselling',
    pillar: 'Gujarat & Parents',
    competitorAngle: 'Match RSA & Wind Chasers free parent webinar funnel',
  },
  {
    id: 'post-4',
    title: 'Gujarati Reel: Pilot & Cabin Crew After 12th',
    caption:
      'National academies run Hindi/English ads. Our Gujarati CTWA reel brings clarity on DGCA Class 2 medicals, realistic fees, and Ahmedabad options—building on our ₹23–26/chat benchmark.',
    platform: 'instagram',
    dayKey: '2026-11-17',
    time: '07:00 PM',
    status: 'scheduled',
    mediaType: 'video',
    thumbnailUrl: '/src/assets/images/apano_gujarat_pilot_reel_1794833552944.jpg',
    author: 'Gujarat Desk',
    pillar: 'Gujarat & Parents',
    competitorAngle: 'Own Gujarati-language CTWA gap vs national portals',
  },
  {
    id: 'post-5',
    title: 'DGCA Re-Attempt Playbook: Failed Papers',
    caption:
      'Zero competitors in the Oct sweep cover failed DGCA exams. If you stalled on Air Navigation or Meteorology, use this 6-week error-log recovery framework before your next sitting.',
    platform: 'linkedin',
    dayKey: '2026-11-18',
    time: '10:00 AM',
    status: 'scheduled',
    mediaType: 'image',
    thumbnailUrl: '/src/assets/images/apano_dgca_navigation_1794833551656.jpg',
    author: 'Apano Research',
    pillar: 'DGCA Re-Attempt',
    competitorAngle: 'White-space gap: zero rivals serve failed DGCA papers',
  },
  {
    id: 'post-6',
    title: 'Online CPL Classes: 6 Instructor Checks',
    caption:
      'Building on Apano’s /cpl-online citation in Google AI Overview alongside Poetic Pilot (#1): how students can evaluate live mock cadence and airline-pilot faculty before paying fees.',
    platform: 'instagram',
    dayKey: '2026-11-18',
    time: '04:00 PM',
    status: 'scheduled',
    mediaType: 'video',
    thumbnailUrl: '/src/assets/images/apano_cockpit_briefing_1794833551164.jpg',
    author: 'Apano Editorial',
    pillar: 'Neutral Guidance',
    competitorAngle: 'Defend /cpl-online AI Overview win vs Poetic Pilot',
  },
  {
    id: 'post-7',
    title: 'Truth About "₹45,000*" Cabin Crew Ads',
    caption:
      'Frankfinn runs 19+ Meta ads (incl. Rajkot) and Skytech operates in Memnagar, Ahmedabad. We show Class 12 students what airlines actually require before paying ₹1.5L+ for a diploma.',
    platform: 'facebook',
    dayKey: '2026-11-19',
    time: '11:30 AM',
    status: 'pending_review',
    mediaType: 'video',
    thumbnailUrl: '/src/assets/images/apano_cabin_crew_terminal_1794833554655.jpg',
    author: 'Gujarat Desk',
    pillar: 'Fee Clarity',
    competitorAngle: 'Counter Frankfinn Rajkot & Skytech Ahmedabad Meta ads',
  },
  {
    id: 'post-8',
    title: 'India vs USA vs Europe FTO Fee Table',
    caption:
      'Comparing VFTI, Dunes, Redbird, BAA Training, and Florida Flyers on transparent aircraft fleet ratios, DGCA conversion timelines, and verified all-in training budgets.',
    platform: 'linkedin',
    dayKey: '2026-11-19',
    time: '03:00 PM',
    status: 'pending_review',
    mediaType: 'image',
    thumbnailUrl: '/src/assets/images/apano_fto_hangar_fleet_1794833552431.jpg',
    author: 'Apano Research',
    pillar: 'Fee Clarity',
    competitorAngle: 'Outperform Vayupath breadth & clashing FTO directories',
  },
  {
    id: 'post-9',
    title: 'Aviation Courses After 12th: Clear Comparison',
    caption:
      'FMS (#1) and Wing Path (#3) lead search for "aviation courses after 12th". Our visual carousel compares CPL, AME, ATC, and Cabin Crew without steering students into coaching.',
    platform: 'instagram',
    dayKey: '2026-11-20',
    time: '10:00 AM',
    status: 'in_progress',
    mediaType: 'image',
    thumbnailUrl: '/src/assets/images/apano_gujarat_pilot_reel_1794833552944.jpg',
    author: 'Apano Editorial',
    pillar: 'Neutral Guidance',
    competitorAngle: 'Challenge FMS (#1) & Wing Path (#3) search dominance',
  },
  {
    id: 'post-10',
    title: 'Parent Q&A: DGCA Class 2 Medical Steps',
    caption:
      'Answering real Reddit, Quora, and dgcaclass2medical.com parent questions on Class 2 medical timelines, eyesight norms, and when to book before paying FTO deposits.',
    platform: 'facebook',
    dayKey: '2026-11-20',
    time: '04:30 PM',
    status: 'idea',
    mediaType: 'image',
    thumbnailUrl: '/src/assets/images/apano_cpl_cost_logbook_1794833553060.jpg',
    author: 'Apano Counselling',
    pillar: 'Gujarat & Parents',
    competitorAngle: 'Capture forum & Class 2 medical search intent',
  },
  {
    id: 'post-11',
    title: '5 Questions Gujarat Students Asked This Week',
    caption:
      'Summarizing the top questions from our ₹23–26 CTWA Gujarati reels—covering education loans, Memnagar vs national institutes, and DGCA exam attempts.',
    platform: 'instagram',
    dayKey: '2026-11-22',
    time: '06:00 PM',
    status: 'approved',
    mediaType: 'video',
    thumbnailUrl: '/src/assets/images/apano_cabin_crew_terminal_1794833554655.jpg',
    author: 'Gujarat Desk',
    pillar: 'Gujarat & Parents',
    competitorAngle: 'Convert CTWA WhatsApp FAQs into organic reach',
  },
  {
    id: 'post-12',
    title: 'Partnering With Neutral FTO Counselling',
    caption:
      'Built for LinkedIn growth beyond our 56-follower baseline: how verified flying schools in Ring D (India, US, EU) attract informed, pre-qualified students through Apano.',
    platform: 'linkedin',
    dayKey: '2026-11-22',
    time: '11:00 AM',
    status: 'scheduled',
    mediaType: 'image',
    thumbnailUrl: '/src/assets/images/apano_dgca_navigation_1794833551656.jpg',
    author: 'Apano Partnerships',
    pillar: 'LinkedIn Authority',
    competitorAngle: 'Capture quiet LinkedIn channel & Ring D FTO partners',
  },
];

export const CONNECTED_ACCOUNTS: ConnectedAccount[] = [
  {
    id: 'acc-li',
    platform: 'linkedin',
    name: 'LinkedIn Page',
    handle: 'Apano Aviation · 56 followers',
    synced: true,
  },
  {
    id: 'acc-ig',
    platform: 'instagram',
    name: 'Instagram Reels',
    handle: '@apano.aviation · Gujarati & EN',
    synced: true,
  },
  {
    id: 'acc-fb',
    platform: 'facebook',
    name: 'Meta / Facebook',
    handle: 'Apano Aviation · ₹23–26 CTWA',
    synced: true,
  },
];

export const WEEKLY_PERFORMANCE: PerformancePoint[] = [
  { dateLabel: 'Nov 16', reach: 4400, engagement: 1850, clicks: 710 },
  { dateLabel: 'Nov 17', reach: 6300, engagement: 2780, clicks: 980 },
  { dateLabel: 'Nov 18', reach: 6150, engagement: 3040, clicks: 1160 },
  { dateLabel: 'Nov 19', reach: 9200, engagement: 4320, clicks: 1640 },
  { dateLabel: 'Nov 20', reach: 8700, engagement: 4080, clicks: 1520 },
  { dateLabel: 'Nov 21', reach: 12400, engagement: 5350, clicks: 2180 },
  { dateLabel: 'Nov 22', reach: 11100, engagement: 4920, clicks: 1960 },
];

export const MONTHLY_PERFORMANCE: PerformancePoint[] = [
  { dateLabel: 'Wk 1', reach: 28400, engagement: 11200, clicks: 4100 },
  { dateLabel: 'Wk 2', reach: 34100, engagement: 14500, clicks: 5250 },
  { dateLabel: 'Wk 3', reach: 41800, engagement: 18100, clicks: 6900 },
  { dateLabel: 'Wk 4', reach: 49600, engagement: 22400, clicks: 8450 },
];

export const INITIAL_BRAND_VOICE: BrandVoiceConfig = {
  tone: 'Unbiased, transparent, and parent-credible — zero coaching upsells or hype.',
  audience:
    'Class 12 students & Indian parents (especially Gujarat), DGCA re-attempt candidates, and Ring D flying school partners.',
  pillars: [
    'Neutral Guidance (course-free FTO comparisons)',
    'Fee Clarity (sourced ₹45L–₹1Cr+ CPL & cabin crew breakdowns)',
    'DGCA Re-Attempt Recovery (failed paper support)',
    'Gujarat & Parents (Gujarati CTWA reels & free briefings)',
    'LinkedIn Authority (outpacing quiet competitors from 56 followers)',
  ],
  guidelines:
    'State clearly that Apano does not run a flying school or ground batch. Back every fee claim with line items, address parent concerns first, and use Gujarati where national players default to English/Hindi.',
};

export const AI_IDEA_SUGGESTIONS = [
  {
    id: 'idea-1',
    format: 'Carousel',
    mediaType: 'image' as const,
    platform: 'linkedin' as const,
    pillar: 'DGCA Re-Attempt' as const,
    competitorAngle: 'Own failed DGCA papers (0 rivals active)',
    title: 'DGCA Re-Attempt Clinic: Clearing Met & Navigation on Attempt 2',
    caption:
      'None of the major ground-school webinars cover failed DGCA papers. Share a 5-step exam audit and question-bank reset plan for stranded student pilots.',
    thumbnailUrl: '/src/assets/images/apano_dgca_navigation_1794833551656.jpg',
  },
  {
    id: 'idea-2',
    format: 'Reel',
    mediaType: 'video' as const,
    platform: 'instagram' as const,
    pillar: 'Gujarat & Parents' as const,
    competitorAngle: 'Scale Gujarati CTWA (₹23–26/chat)',
    title: '60s Gujarati Reel: How to Check an FTO Before Paying Fees',
    caption:
      'Give Gujarat families a quick 3-point DGCA approval, fleet-to-student ratio, and refund-policy checklist in Gujarati.',
    thumbnailUrl: '/src/assets/images/apano_gujarat_pilot_reel_1794833552944.jpg',
  },
  {
    id: 'idea-3',
    format: 'Reel',
    mediaType: 'video' as const,
    platform: 'facebook' as const,
    pillar: 'Fee Clarity' as const,
    competitorAngle: 'Counter Frankfinn ₹45,000* & Skytech Memnagar',
    title: 'What Cabin Crew Airlines Actually Require vs ₹1.5L Diplomas',
    caption:
      'Break down real airline hiring criteria for Class 12 graduates in Ahmedabad & Rajkot without misleading asterisk pricing.',
    thumbnailUrl: '/src/assets/images/apano_cabin_crew_terminal_1794833554655.jpg',
  },
];
