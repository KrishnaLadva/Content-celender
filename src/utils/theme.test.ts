import test from 'node:test';
import assert from 'node:assert/strict';
import {
  THEME_STORAGE_KEY,
  applyThemeToDocument,
  getStoredTheme,
  persistTheme,
  resolveInitialTheme,
  toggleThemeValue,
} from './theme';

function createMemoryStorage(initial: Record<string, string> = {}) {
  const map = new Map<string, string>(Object.entries(initial));
  return {
    getItem(key: string) {
      return map.get(key) ?? null;
    },
    setItem(key: string, value: string) {
      map.set(key, value);
    },
  };
}

test('getStoredTheme returns valid persisted themes and ignores invalid values', () => {
  const lightStorage = createMemoryStorage({ [THEME_STORAGE_KEY]: 'light' });
  const invalidStorage = createMemoryStorage({ [THEME_STORAGE_KEY]: 'sepia' });
  const emptyStorage = createMemoryStorage();

  assert.equal(getStoredTheme(lightStorage), 'light');
  assert.equal(getStoredTheme(invalidStorage), null);
  assert.equal(getStoredTheme(emptyStorage), null);
});

test('resolveInitialTheme prioritizes localStorage over fallback default', () => {
  const storedDark = createMemoryStorage({ [THEME_STORAGE_KEY]: 'dark' });
  const empty = createMemoryStorage();

  assert.equal(resolveInitialTheme(storedDark, 'light'), 'dark');
  assert.equal(resolveInitialTheme(empty, 'light'), 'light');
  assert.equal(resolveInitialTheme(empty), 'dark');
});

test('persistTheme stores theme in localStorage and toggleThemeValue flips state', () => {
  const storage = createMemoryStorage();
  const next = toggleThemeValue('dark');
  assert.equal(next, 'light');
  assert.equal(persistTheme(next, storage), true);
  assert.equal(storage.getItem(THEME_STORAGE_KEY), 'light');
  assert.equal(toggleThemeValue('light'), 'dark');
});

test('applyThemeToDocument toggles dark class, data-theme attribute, and colorScheme', () => {
  const classes = new Set<string>(['dark']);
  const mockDoc = {
    documentElement: {
      classList: {
        add(c: string) {
          classes.add(c);
        },
        remove(c: string) {
          classes.delete(c);
        },
      },
      dataset: {} as Record<string, string>,
      style: { colorScheme: '' },
    },
  };

  applyThemeToDocument('light', mockDoc as unknown as Document);
  assert.equal(classes.has('dark'), false);
  assert.equal(mockDoc.documentElement.dataset.theme, 'light');
  assert.equal(mockDoc.documentElement.style.colorScheme, 'light');

  applyThemeToDocument('dark', mockDoc as unknown as Document);
  assert.equal(classes.has('dark'), true);
  assert.equal(mockDoc.documentElement.dataset.theme, 'dark');
  assert.equal(mockDoc.documentElement.style.colorScheme, 'dark');
});
