import { useState } from 'react';
import { Check, Download, Menu, Sparkles } from 'lucide-react';
import type { NavSection, ThemeMode } from '../types/content';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  activeNav: NavSection;
  theme: ThemeMode;
  onSetTheme: (theme: ThemeMode) => void;
  onToggleTheme: () => void;
  onOpenMobileNav: () => void;
  onOpenCreateModal: () => void;
  onExportCsv: () => void;
}

const SECTION_TITLES: Record<NavSection, { title: string; subtitle: string }> = {
  dashboard: {
    title: 'Apano Aviation · Content Ops',
    subtitle:
      'Weekly calendar grounded in the 176-competitor audit, 5 content gaps, and Gujarat CTWA strategy.',
  },
  competitors: {
    title: 'Competitor Intelligence',
    subtitle:
      'Top 9 LinkedIn targets, 5 competitive rings, and ownable content gaps from the 30 Oct 2026 map.',
  },
  planner: {
    title: 'Content Planner',
    subtitle: 'Organize neutral FTO, fee clarity, and DGCA drafts across channels.',
  },
  studio: {
    title: 'AI Content Studio',
    subtitle: 'Draft unbiased aviation posts aligned with Apano Aviation brand voice.',
  },
  calendar: {
    title: 'Editorial Calendar',
    subtitle: 'Schedule, reschedule, and balance weekly publishing slots.',
  },
  approvals: {
    title: 'Approval Queue',
    subtitle: 'Verify sourced fee figures and claims before scheduled publishing.',
  },
  analytics: {
    title: 'Performance Analytics',
    subtitle: 'Track reach, engagement, and click trends alongside Apano benchmarks.',
  },
  brand_voice: {
    title: 'Brand Voice',
    subtitle: 'Unbiased course-free guidance tone, audience, and editorial guardrails.',
  },
  settings: {
    title: 'Workspace Settings',
    subtitle: 'Manage appearance preferences, channels, and workspace defaults.',
  },
};

export function Header({
  activeNav,
  theme,
  onSetTheme,
  onToggleTheme,
  onOpenMobileNav,
  onOpenCreateModal,
  onExportCsv,
}: HeaderProps) {
  const [exported, setExported] = useState(false);
  const meta = SECTION_TITLES[activeNav];

  const handleExportClick = () => {
    onExportCsv();
    setExported(true);
    window.setTimeout(() => setExported(false), 2000);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-slate-50/90 backdrop-blur-md dark:border-slate-800/80 dark:bg-[#060913]/90">
      <div className="flex items-center justify-between gap-3 px-4 py-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onOpenMobileNav}
            aria-label="Open navigation menu"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 lg:hidden dark:border-slate-800 dark:bg-[#0C1222] dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <Menu className="h-4 w-4" aria-hidden="true" />
          </button>

          <div className="min-w-0">
            <h1 className="font-display truncate text-base font-semibold tracking-tight text-slate-900 sm:text-xl dark:text-slate-50">
              <span className="sm:hidden">
                {activeNav === 'dashboard' ? 'Apano' : meta.title}
              </span>
              <span className="hidden sm:inline">{meta.title}</span>
            </h1>
            <p className="hidden truncate text-xs text-slate-600 sm:block dark:text-slate-400">
              {meta.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <div className="hidden sm:block">
            <ThemeToggle
              theme={theme}
              onChange={onSetTheme}
              onToggle={onToggleTheme}
              variant="segmented"
            />
          </div>
          <div className="sm:hidden">
            <ThemeToggle
              theme={theme}
              onChange={onSetTheme}
              onToggle={onToggleTheme}
              variant="compact"
            />
          </div>

          <button
            type="button"
            onClick={handleExportClick}
            data-testid="export-csv-btn"
            aria-label="Export content calendar as CSV"
            className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-slate-800 dark:bg-[#0E1528] dark:text-slate-200 dark:hover:bg-slate-800/80 whitespace-nowrap shrink-0"
          >
            {exported ? (
              <>
                <Check
                  className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400"
                  aria-hidden="true"
                />
                <span className="hidden sm:inline text-emerald-600 dark:text-emerald-400">
                  Exported
                </span>
              </>
            ) : (
              <>
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="hidden md:inline">Export CSV</span>
                <span className="hidden sm:inline md:hidden">CSV</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenCreateModal}
            className="inline-flex h-10 items-center gap-1.5 sm:gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 sm:px-4 text-xs font-semibold text-white transition-opacity hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 whitespace-nowrap shrink-0"
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="sm:hidden">Create</span>
            <span className="hidden sm:inline">Create with AI</span>
          </button>
        </div>
      </div>
    </header>
  );
}
