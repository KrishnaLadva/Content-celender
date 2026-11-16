import type { ContentPillar, Platform } from '../types/content';

export interface ApanoBaselineMetric {
  id: string;
  label: string;
  value: string;
  context: string;
}

export interface RankedLinkedInCompetitor {
  rank: number;
  name: string;
  ring: 'A' | 'B' | 'C' | 'D' | 'E';
  linkedInUrl: string;
  organicSignal: string;
  whyTracked: string;
  vulnerability: string;
  counterPillar: ContentPillar;
  recommendedPlatform: Platform;
  counterTitle: string;
  counterCaption: string;
}

export interface CompetitiveRingSummary {
  ring: 'A' | 'B' | 'C' | 'D' | 'E';
  title: string;
  threat: 'High' | 'Medium' | 'Low to Medium';
  examples: string[];
  studentPromise: string;
  apanoCounter: string;
}

export interface OwnableContentGap {
  id: string;
  pillar: ContentPillar;
  title: string;
  finding: string;
  rivalWeakness: string;
  suggestedFormat: string;
  recommendedPlatform: Platform;
  starterTitle: string;
  starterCaption: string;
}

export interface AppendixCategoryCount {
  category: string;
  total: number;
  direct: number;
  overlap: number;
  adjacent: number;
  notableNames: string;
}

export const APANO_REPORT_DATE = '30 Oct 2026';

export const APANO_BASELINE_METRICS: ApanoBaselineMetric[] = [
  {
    id: 'organic',
    label: 'Organic Search',
    value: '3.4K/mo',
    context: '361 ranked keywords · #38 "best flying schools in india"',
  },
  {
    id: 'ai-overview',
    label: 'Google AI Overview',
    value: '/cpl-online',
    context: 'Cited for "cpl ground classes online" alongside Poetic Pilot (#1)',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn Baseline',
    value: '56 followers',
    context: 'Sept baseline · 9 competitor slots available on Premium Page',
  },
  {
    id: 'gujarat-ctwa',
    label: 'Gujarati CTWA Reels',
    value: '₹23–26/chat',
    context: 'Zero national rivals run Gujarati Meta/Instagram campaigns',
  },
];

export const TOP_LINKEDIN_COMPETITORS: RankedLinkedInCompetitor[] = [
  {
    rank: 1,
    name: "The Pilot's Compass",
    ring: 'A',
    linkedInUrl: 'linkedin.com/company/the-pilot-s-compass',
    organicSignal: '#24 "best flying schools in india" · Meta ads (Young Aviators)',
    whyTracked:
      'Closest model to Apano: compares India, USA, and Europe FTOs with DGCA rating, fleet, and counselling.',
    vulnerability:
      'Launched paid DGCA Ground Classes Batch 2, which undercuts its "unbiased guidance" claim.',
    counterPillar: 'Neutral Guidance',
    recommendedPlatform: 'linkedin',
    counterTitle: 'Why Neutral Aviation Guidance Cannot Sell Ground Classes',
    counterCaption:
      'When a directory launches its own paid ground classes, school recommendations carry a conflict of interest. Apano never runs a flying school or ground batch—our comparisons stay 100% independent.',
  },
  {
    rank: 2,
    name: 'Vayupath (Centre for Scientific Outreach)',
    ring: 'A',
    linkedInUrl: 'Search by name on LinkedIn',
    organicSignal: 'New since 5 Oct · 150+ pathways · 36 states/UTs',
    whyTracked:
      'Non-commercial aviation career map offering free counsellor sessions and "List your institute" revenue.',
    vulnerability:
      'Broad scope (drones, ATC, defence) leaves it shallow on DGCA exam rules and real CPL fee totals.',
    counterPillar: 'Fee Clarity',
    recommendedPlatform: 'linkedin',
    counterTitle: 'Beyond Broad Career Maps: Real DGCA Exam & FTO Fee Breakdown',
    counterCaption:
      'Listing 150+ career titles does not prepare a student for DGCA navigation papers or a ₹55L–₹65L investment. Here is our verified checklist for evaluating FTO fleet hours and hidden exam costs.',
  },
  {
    rank: 3,
    name: 'ThePilot.in',
    ring: 'C',
    linkedInUrl: 'linkedin.com/company/thepilot-in',
    organicSignal: '~36K organic visits/mo · Claims 2,005+ students',
    whyTracked:
      'Content-heavy ground school publishing 2026 fee guides and competing directly on student search queries.',
    vulnerability:
      'Fee estimates clash across content-first ground schools (₹45L–₹65L vs ₹55L+), leaving parents unsure what is all-in.',
    counterPillar: 'Fee Clarity',
    recommendedPlatform: 'linkedin',
    counterTitle: 'India vs Abroad CPL Fees: Clearing the ₹40L to ₹1Cr+ Confusion',
    counterCaption:
      'Ground schools quote conflicting totals because medicals, exam fees, accommodation, and type ratings are excluded differently. We built a sourced line-by-line CPL cost table for parents.',
  },
  {
    rank: 4,
    name: 'Right Source Aviation (RSA)',
    ring: 'C',
    linkedInUrl: 'linkedin.com/company/rsa-flight-school',
    organicSignal: 'Free pilot career webinars · Parent-targeted Meta ads',
    whyTracked:
      'Counselling-led funnel running free pilot webinars for students and parents, challenging ₹99 paid webinars.',
    vulnerability:
      'Uses free parent webinars primarily as top-of-funnel acquisition for its own flight training offers.',
    counterPillar: 'Gujarat & Parents',
    recommendedPlatform: 'facebook',
    counterTitle: 'Free Parent Briefing: 5 Questions to Ask Before Paying Any FTO Deposit',
    counterCaption:
      'Parents should never pay for basic career clarity—or sit through a disguised sales pitch. Join Apano’s free unbiased session covering DGCA Class 2 medicals, loan terms, and FTO fleet ratios.',
  },
  {
    rank: 5,
    name: 'Golden Epaulettes Aviation',
    ring: 'C',
    linkedInUrl: 'linkedin.com/company/golden-epaulettes',
    organicSignal: '111 shared keywords · 4.9★ (853 Google reviews)',
    whyTracked:
      'Delhi ground school with an aggressive blog engine ("how to choose a flight school", ~₹55L fee & loan guides).',
    vulnerability:
      'Zero focus on failed DGCA paper recovery or regional Gujarati parent guidance.',
    counterPillar: 'DGCA Re-Attempt',
    recommendedPlatform: 'linkedin',
    counterTitle: 'Cleared 4 DGCA Papers and Stuck on One? Your Re-Attempt Recovery Plan',
    counterCaption:
      'Most coaching blogs only market fresh Batch 1 enrolments. Yet hundreds of student pilots stall on Navigation or Meteorology re-attempts. Here is a structured 6-week recovery schedule.',
  },
  {
    rank: 6,
    name: 'FMS Aviation Academy',
    ring: 'C',
    linkedInUrl: 'Search "FMS Aviation Academy" on LinkedIn',
    organicSignal: '~61K organic visits/mo · #1 "aviation courses after 12th"',
    whyTracked:
      'Shares 108 keywords and runs Meta ads saying "Find Your Perfect Flying School with FMS Aviation"—Apano’s pitch.',
    vulnerability:
      'Acts like a neutral discovery platform in ads before steering leads into its own Delhi ground classes.',
    counterPillar: 'Neutral Guidance',
    recommendedPlatform: 'instagram',
    counterTitle: 'Aviation Courses After 12th: Neutral Roadmap Without Coaching Upsells',
    counterCaption:
      'Before choosing CPL, AME, cabin crew, or BBA Aviation after Class 12, compare eligibility, total cost, and realistic starting salaries side by side—with zero ground-school sales pitch.',
  },
  {
    rank: 7,
    name: 'Poetic Pilot Academy',
    ring: 'C',
    linkedInUrl: 'linkedin.com/company/poetic-pilot-academy',
    organicSignal: '#1 "cpl ground classes online" (AI Overview battleground)',
    whyTracked:
      'Ranks #1 for "cpl ground classes online", the exact query where Apano’s /cpl-online page earns an AI Overview citation.',
    vulnerability:
      'Focuses on live class marketing rather than comparative buyer criteria for evaluating online ground instructors.',
    counterPillar: 'LinkedIn Authority',
    recommendedPlatform: 'linkedin',
    counterTitle: 'How to Evaluate Online CPL Ground Classes Before Paying Tuition',
    counterCaption:
      'Online CPL prep varies wildly in mock-test rigor and instructor airline experience. Use these 6 evaluation criteria—built from Apano’s /cpl-online research—before committing.',
  },
  {
    rank: 8,
    name: 'Skytech Aviation',
    ring: 'E',
    linkedInUrl: 'linkedin.com/company/skytech-aviation-services-pvt-ltd',
    organicSignal: '~46K organic visits/mo · 103 shared keywords · Ahmedabad branch',
    whyTracked:
      'Operates an Ahmedabad (Memnagar) centre targeting the exact Gujarat cabin crew & ground staff audience.',
    vulnerability:
      'National/franchise messaging in English/Hindi misses Gujarati-first parent trust.',
    counterPillar: 'Gujarat & Parents',
    recommendedPlatform: 'instagram',
    counterTitle: 'Ahmedabad Cabin Crew & Ground Staff Fees: What Class 12 Families Must Check',
    counterCaption:
      'Before enrolling at any Memnagar or Rajkot academy, verify whether the institute guarantees interviews vs placement and what the full diploma fee actually covers. Available in Gujarati & English.',
  },
  {
    rank: 9,
    name: 'Frankfinn Institute of Air Hostess Training',
    ring: 'E',
    linkedInUrl: 'linkedin.com/company/frankfinn-aviation-services-pvt-limited',
    organicSignal: '19 Meta ads sampled (incl. Rajkot) · #1 cabin crew query',
    whyTracked:
      'Biggest Meta ad spender sampled; leads with Hinglish price hooks ("12th Ke Baad High-Paying Career", "₹45,000*").',
    vulnerability:
      'Asterisk price ads ("₹45,000*") and high-volume franchise funnels create scepticism among parents.',
    counterPillar: 'Fee Clarity',
    recommendedPlatform: 'facebook',
    counterTitle: 'The Truth Behind "₹45,000*" Cabin Crew Ads in Gujarat',
    counterCaption:
      'Do airlines require a ₹1.5L private diploma to hire cabin crew? We break down actual airline eligibility rules, total academy costs, and free self-prep options for Class 12 graduates.',
  },
];

export const COMPETITIVE_RINGS: CompetitiveRingSummary[] = [
  {
    ring: 'A',
    title: 'Neutral Guides & Directories',
    threat: 'High',
    examples: [
      "The Pilot's Compass",
      'Vayupath',
      'Aviation Path',
      'The Flying Engineer',
    ],
    studentPromise: '"Let us help you choose a flying school"',
    apanoCounter:
      'Stay strictly course-free: Pilot’s Compass now sells ground classes, leaving Apano as the truly independent option.',
  },
  {
    ring: 'B',
    title: 'Big Education Portals',
    threat: 'Medium',
    examples: ['Shiksha', 'Collegedunia (159 shared kw)', 'Careers360 (105 shared kw)', 'Justdial'],
    studentPromise: 'Capture "aviation courses after 12th" traffic & sell leads',
    apanoCounter:
      'Beat generic portals with aviation depth: DGCA re-attempt guides, Class 2 medical steps, and transparent FTO data.',
  },
  {
    ring: 'C',
    title: 'Ground Schools With Content Engines',
    threat: 'High',
    examples: ['FMS (~61K)', 'ThePilot.in (~36K)', 'Golden Epaulettes', 'Poetic Pilot', 'RSA'],
    studentPromise: 'Win students early via free guides & free webinars, then upsell coaching',
    apanoCounter:
      'Publish the sourced side-by-side fee comparison they avoid, and replace paid ₹99 webinars with free parent briefings.',
  },
  {
    ring: 'D',
    title: 'Flying Schools & Abroad Training',
    threat: 'Low to Medium',
    examples: ['VFTI (~97K)', 'Dunes (~64K)', 'Redbird', 'Bombay Flying Club', 'BAA Training'],
    studentPromise: 'Enrol student pilots directly into Indian or US/EU FTOs',
    apanoCounter:
      'Treat Ring D as Apano listing & LinkedIn panel partners rather than pure rivals.',
  },
  {
    ring: 'E',
    title: 'Cabin Crew & Ground Staff Academies',
    threat: 'Medium',
    examples: ['Frankfinn (19 Meta ads)', 'Skytech (Ahmedabad)', 'Aptech Ahmedabad', 'Dfly'],
    studentPromise: 'Target Class 12 students & parents via price-led Meta ads',
    apanoCounter:
      'Win Gujarat in Gujarati (building on ₹23–26/chat CTWA reels) and demystify asterisk pricing.',
  },
];

export const CONTENT_OPPORTUNITY_GAPS: OwnableContentGap[] = [
  {
    id: 'gap-neutral',
    pillar: 'Neutral Guidance',
    title: '1. Be the Only Truly Neutral Guide',
    finding:
      "Almost every guidance rival sells its own training (The Pilot's Compass ground classes, FMS, Top Crew, RSA).",
    rivalWeakness: 'Conflict of interest hidden behind "find your perfect school" ad copy.',
    suggestedFormat: 'LinkedIn Carousel / Founder Note',
    recommendedPlatform: 'linkedin',
    starterTitle: 'Our Conflict-Free Pledge: Why Apano Runs Zero Ground Batches',
    starterCaption:
      'Unlike directories that quietly steer students into their own paid coaching batches, Apano earns nothing from selling ground tuition. Here is how our FTO audit works.',
  },
  {
    id: 'gap-dgca',
    pillar: 'DGCA Re-Attempt',
    title: '2. Own DGCA Re-Attempt Recovery',
    finding:
      'Zero competitors in the 5 Oct webinar sweep ran an event or programme on failed DGCA papers.',
    rivalWeakness: 'Every rival markets only to fresh batch beginners.',
    suggestedFormat: 'LinkedIn Guide + Study Plan',
    recommendedPlatform: 'linkedin',
    starterTitle: 'DGCA Re-Attempt Playbook: Fixing Navigation & Met Failures',
    starterCaption:
      'Failing one DGCA subject sets timelines back months if you repeat the same question bank. Download our subject-wise error-log method built for re-attempt candidates.',
  },
  {
    id: 'gap-fees',
    pillar: 'Fee Clarity',
    title: '3. Publish One Honest Sourced Fee Table',
    finding:
      'Rivals quote clashing totals (₹40L to ₹1Cr+; Golden Epaulettes ~₹55L vs ₹45–65L elsewhere).',
    rivalWeakness: 'Hidden accommodation, conversion, exam, and type-rating line items.',
    suggestedFormat: 'LinkedIn Document / IG Carousel',
    recommendedPlatform: 'instagram',
    starterTitle: '2026 CPL All-In Cost Table: India vs South Africa vs USA',
    starterCaption:
      'Stop guessing between ₹45L and ₹1Cr+ quotes. We itemized flying hours, DGCA exams, visa/living costs, and licence conversion side by side for families.',
  },
  {
    id: 'gap-gujarat',
    pillar: 'Gujarat & Parents',
    title: '4. Dominate Gujarat in Gujarati',
    finding:
      'National players run Hindi/English while Apano’s Gujarati CTWA reels already average ₹23–26 per chat.',
    rivalWeakness: 'National chains lack native Gujarati reassurance for cautious parents.',
    suggestedFormat: 'Gujarati CTWA Reel + Free Parent Live',
    recommendedPlatform: 'instagram',
    starterTitle: 'Gujarati Parent Guide: Pilot & Cabin Crew Career Reality Check',
    starterCaption:
      'ધોરણ 12 પછી પાયલટ કે કેબિન ક્રૂ? ફી, લોન અને DGCA મેડિકલની સાચી માહિતી ગુજરાતીમાં — કોઈ કોચિંગ સેલ્સ પિચ વગર.',
  },
  {
    id: 'gap-linkedin',
    pillar: 'LinkedIn Authority',
    title: '5. Claim LinkedIn While Rivals Are Quiet',
    finding:
      'Apano sits at 56 followers (Sept), yet most competitors’ LinkedIn pages look thin from their websites.',
    rivalWeakness: 'Low posting cadence from top 9 rivals creates cheap organic authority.',
    suggestedFormat: 'LinkedIn Weekly Insights',
    recommendedPlatform: 'linkedin',
    starterTitle: 'Inside India’s 176-Competitor Aviation Education Landscape',
    starterCaption:
      'Students researching flight schools face 40+ FTOs and conflicting fee claims. Why transparency and verified DGCA metrics will define aviation counselling in 2026.',
  },
];

export const COMPETITOR_APPENDIX_CATEGORIES: AppendixCategoryCount[] = [
  {
    category: 'Flying schools',
    total: 41,
    direct: 0,
    overlap: 4,
    adjacent: 37,
    notableNames: 'VFTI (~97K), Dunes (~64K), Redbird, Bombay Flying Club, AAA',
  },
  {
    category: 'Colleges and institutes',
    total: 29,
    direct: 0,
    overlap: 0,
    adjacent: 29,
    notableNames: 'IIAE, Wings Institute, Silver Oak (SOCAT), AME College',
  },
  {
    category: 'Ground schools and DGCA coaching',
    total: 28,
    direct: 1,
    overlap: 13,
    adjacent: 14,
    notableNames: 'FMS (~61K), ThePilot.in (~36K), Golden Epaulettes, Poetic Pilot',
  },
  {
    category: 'Cabin crew and ground staff',
    total: 26,
    direct: 0,
    overlap: 2,
    adjacent: 24,
    notableNames: 'Frankfinn (19 Meta ads), Skytech (Ahmedabad), Aptech Ahmedabad, Dfly',
  },
  {
    category: 'Directories and portals',
    total: 22,
    direct: 8,
    overlap: 0,
    adjacent: 14,
    notableNames: 'Shiksha, Collegedunia, Careers360, The Flying Engineer',
  },
  {
    category: 'Counselling and consultancy',
    total: 16,
    direct: 3,
    overlap: 4,
    adjacent: 9,
    notableNames: "The Pilot's Compass, Vayupath, AeroMitra, Right Source Aviation",
  },
  {
    category: 'Type rating & training abroad',
    total: 6,
    direct: 0,
    overlap: 0,
    adjacent: 6,
    notableNames: 'BAA Training, Flying Academy, International Aero Academy, Florida Flyers',
  },
  {
    category: 'Content and forums',
    total: 6,
    direct: 0,
    overlap: 0,
    adjacent: 6,
    notableNames: 'Quora, Reddit, YouTube, Wikipedia, Scribd, dgcaclass2medical.com',
  },
  {
    category: 'Jobs portals',
    total: 2,
    direct: 0,
    overlap: 0,
    adjacent: 2,
    notableNames: 'Foundit, Aviation Job Search',
  },
];
