import type { ThemeMode } from '../types/content';

export const THEME_STORAGE_KEY = 'orbitflow-theme';

export function isValidTheme(value: unknown): value is ThemeMode {
  return value === 'dark' || value === 'light';
}

export function getStoredTheme(storage?: Pick<Storage, 'getItem'> | null): ThemeMode | null {
  if (!storage) return null;
  try {
    const raw = storage.getItem(THEME_STORAGE_KEY);
    return isValidTheme(raw) ? raw : null;
  } catch {
    return null;
  }
}

export function persistTheme(
  theme: ThemeMode,
  storage?: Pick<Storage, 'setItem'> | null
): boolean {
  if (!storage) return false;
  try {
    storage.setItem(THEME_STORAGE_KEY, theme);
    return true;
  } catch {
    return false;
  }
}

export function resolveInitialTheme(
  storage?: Pick<Storage, 'getItem'> | null,
  fallbackTheme: ThemeMode = 'dark'
): ThemeMode {
  const stored = getStoredTheme(storage);
  if (stored) return stored;
  return fallbackTheme;
}

export function toggleThemeValue(current: ThemeMode): ThemeMode {
  return current === 'dark' ? 'light' : 'dark';
}

export function applyThemeToDocument(
  theme: ThemeMode,
  doc?: Pick<Document, 'documentElement'> | null
): void {
  const targetDoc = doc ?? (typeof document !== 'undefined' ? document : null);
  if (!targetDoc?.documentElement) return;
  const root = targetDoc.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}
