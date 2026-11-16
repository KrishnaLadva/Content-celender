import { useEffect } from 'react';
import {
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  LayoutDashboard,
  Megaphone,
  Plus,
  Settings,
  Sparkles,
  Target,
  Volume2,
  X,
} from 'lucide-react';
import type { ConnectedAccount, NavSection } from '../types/content';
import { PlatformIcon } from './PlatformBadge';

interface SidebarProps {
  activeNav: NavSection;
  onSelectNav: (section: NavSection) => void;
  pendingApprovalCount: number;
  accounts: ConnectedAccount[];
  creditsUsed: number;
  creditsLimit: number;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  onOpenConnectAccount: () => void;
}

const NAV_ITEMS: Array<{
  id: NavSection;
  label: string;
  icon: typeof LayoutDashboard;
}> = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'competitors', label: 'Competitor Intel', icon: Target },
  { id: 'planner', label: 'Content Planner', icon: Megaphone },
  { id: 'studio', label: 'AI Content Studio', icon: Sparkles },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays },
  { id: 'approvals', label: 'Approvals', icon: ClipboardCheck },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'brand_voice', label: 'Brand Voice', icon: Volume2 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({
  activeNav,
  onSelectNav,
  pendingApprovalCount,
  accounts,
  creditsUsed,
  creditsLimit,
  mobileOpen,
  onCloseMobile,
  onOpenConnectAccount,
}: SidebarProps) {
  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseMobile();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen, onCloseMobile]);

  const creditsPct = Math.min(100, Math.round((creditsUsed / creditsLimit) * 100));

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between bg-white px-3.5 py-5 text-slate-900 border-r border-slate-200 dark:bg-[#0B101E] dark:text-slate-100 dark:border-slate-800/80">
      <div className="space-y-6 overflow-y-auto pr-0.5">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </div>
            <span className="font-display text-base font-bold tracking-tight whitespace-nowrap">
              Apano Aviation
            </span>
          </div>
          <button
            type="button"
            onClick={onCloseMobile}
            aria-label="Close navigation menu"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 lg:hidden dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Primary workspace navigation" className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = activeNav === item.id;
            const showCount = item.id === 'approvals' && pendingApprovalCount > 0;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelectNav(item.id);
                  onCloseMobile();
                }}
                aria-current={active ? 'page' : undefined}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${
                  active
                    ? 'bg-blue-600 text-white dark:bg-gradient-to-r dark:from-blue-600 dark:to-indigo-600 dark:text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-100'
                }`}
              >
                <span className="flex items-center gap-2.5 min-w-0">
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="truncate">{item.label}</span>
                </span>
                {showCount && (
                  <span
                    className={`font-mono-num text-xs font-semibold ${
                      active
                        ? 'text-blue-100'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {pendingApprovalCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-slate-200 pt-4 dark:border-slate-800/80">
          <div className="mb-2.5 flex items-center justify-between px-2">
            <h2 className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Connected Channels
            </h2>
            <button
              type="button"
              onClick={onOpenConnectAccount}
              aria-label="Connect social channel"
              className="inline-flex h-6 w-6 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>

          <ul className="space-y-2 px-1">
            {accounts.map((acc) => (
              <li
                key={acc.id}
                className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <PlatformIcon platform={acc.platform} size="sm" />
                  <div className="min-w-0">
                    <p className="truncate font-medium text-slate-800 dark:text-slate-200">
                      {acc.name}
                    </p>
                    <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
                      {acc.handle}
                    </p>
                  </div>
                </div>
                <CheckCircle2
                  className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400"
                  aria-label="Connected"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-[#11182C]">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-slate-600 dark:text-slate-400">
            AI Credits
          </span>
          <span className="font-mono-num text-[11px] font-semibold text-blue-600 dark:text-blue-400">
            {creditsPct}% used
          </span>
        </div>
        <p className="mt-1.5 font-mono-num text-sm font-semibold text-slate-900 dark:text-slate-100">
          {creditsUsed.toLocaleString()}
          <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
            {' '}
            / {creditsLimit.toLocaleString()}
          </span>
        </p>
        <div
          role="progressbar"
          aria-valuenow={creditsUsed}
          aria-valuemin={0}
          aria-valuemax={creditsLimit}
          aria-label="AI credits used"
          className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-[width] duration-300"
            style={{ width: `${creditsPct}%` }}
          />
        </div>
        <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
          Resets Dec 1, 2026
        </p>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block lg:w-60 lg:shrink-0">
        <div className="sticky top-0 h-screen">{sidebarContent}</div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Workspace navigation">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-[2px]"
            onClick={onCloseMobile}
          />
          <div className="relative z-10 h-full w-72 max-w-[85vw]">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
