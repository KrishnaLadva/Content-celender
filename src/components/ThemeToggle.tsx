import { Moon, Sun } from 'lucide-react';
import type { ThemeMode } from '../types/content';

interface ThemeToggleProps {
  theme: ThemeMode;
  onChange: (theme: ThemeMode) => void;
  onToggle: () => void;
  variant?: 'segmented' | 'compact';
}

export function ThemeToggle({
  theme,
  onChange,
  onToggle,
  variant = 'segmented',
}: ThemeToggleProps) {
  if (variant === 'compact') {
    const isDark = theme === 'dark';
    return (
      <button
        type="button"
        onClick={onToggle}
        data-testid="theme-toggle-compact"
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        aria-pressed={isDark}
        className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-slate-800 dark:bg-[#0E1528] dark:text-slate-200 dark:hover:bg-slate-800/80 whitespace-nowrap shrink-0"
      >
        {isDark ? (
          <>
            <Moon className="h-4 w-4 text-blue-400" aria-hidden="true" />
            <span>Dark</span>
          </>
        ) : (
          <>
            <Sun className="h-4 w-4 text-amber-500" aria-hidden="true" />
            <span>Light</span>
          </>
        )}
      </button>
    );
  }

  return (
    <div
      role="group"
      aria-label="Color theme"
      data-testid="theme-toggle"
      className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-100 p-1 dark:border-slate-800 dark:bg-[#0A1020] shrink-0"
    >
      <button
        type="button"
        onClick={() => onChange('light')}
        aria-pressed={theme === 'light'}
        data-testid="theme-light-btn"
        className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-blue-500 ${
          theme === 'light'
            ? 'bg-white text-slate-900 shadow-xs'
            : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
        }`}
      >
        <Sun
          className={`h-3.5 w-3.5 ${
            theme === 'light' ? 'text-amber-500' : 'text-current'
          }`}
          aria-hidden="true"
        />
        <span>Light</span>
      </button>
      <button
        type="button"
        onClick={() => onChange('dark')}
        aria-pressed={theme === 'dark'}
        data-testid="theme-dark-btn"
        className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-blue-500 ${
          theme === 'dark'
            ? 'bg-[#17213B] text-slate-100 shadow-xs'
            : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
        }`}
      >
        <Moon
          className={`h-3.5 w-3.5 ${
            theme === 'dark' ? 'text-blue-400' : 'text-current'
          }`}
          aria-hidden="true"
        />
        <span>Dark</span>
      </button>
    </div>
  );
}
