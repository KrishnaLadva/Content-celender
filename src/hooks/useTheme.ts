import { useCallback, useEffect, useState } from 'react';
import type { ThemeMode } from '../types/content';
import {
  applyThemeToDocument,
  persistTheme,
  resolveInitialTheme,
  toggleThemeValue,
} from '../utils/theme';

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'dark';
    return resolveInitialTheme(window.localStorage, 'dark');
  });

  useEffect(() => {
    applyThemeToDocument(theme, document);
    persistTheme(theme, window.localStorage);
  }, [theme]);

  const setTheme = useCallback((next: ThemeMode) => {
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => toggleThemeValue(prev));
  }, []);

  return { theme, setTheme, toggleTheme };
}
